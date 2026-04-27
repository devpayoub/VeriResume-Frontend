"use client"

import * as React from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { retryOptimization } from "@/lib/api/optimization"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Loader2,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  FileText,
  Calendar,
  Trash2,
  Plus,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Session } from "@/types"

// Uses CSS vars so it adapts to dark/light dashboard theme
const getStatusConfig = (status: string) => {
  switch (status) {
    case "completed":
      return {
        icon: CheckCircle2,
        colorClass: "text-emerald-500",
        bgClass: "bg-emerald-500/10",
        borderTop: "border-t-emerald-500/60",
        label: "Completed",
        spin: false,
      }
    case "failed":
      return {
        icon: XCircle,
        colorClass: "text-destructive",
        bgClass: "bg-destructive/10",
        borderTop: "border-t-destructive/60",
        label: "Failed",
        spin: false,
      }
    default:
      return {
        icon: Loader2,
        colorClass: "text-primary",
        bgClass: "bg-primary/10",
        borderTop: "border-t-primary/60",
        label: "Processing",
        spin: true,
      }
  }
}

export default function HistoryPage() {
  const supabase = createClient()
  const [sessions, setSessions] = React.useState<Session[]>([])
  const [loading, setLoading] = React.useState(true)
  const [reloadingIds, setReloadingIds] = React.useState<Record<string, boolean>>({})
  const [deletingIds, setDeletingIds] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    let userId: string | null = null
    let pollInterval: ReturnType<typeof setInterval> | null = null

    const fetchSessions = async (uid: string) => {
      const { data } = await supabase
        .from("sessions")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
      return data || []
    }

    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      userId = user.id
      const data = await fetchSessions(userId!)
      setSessions(data)
      setLoading(false)
      const hasPending = data.some((s: Session) => s.status !== "completed" && s.status !== "failed")
      if (hasPending) startPolling(userId!)
    }

    const startPolling = (uid: string) => {
      if (pollInterval) return
      pollInterval = setInterval(async () => {
        const data = await fetchSessions(uid)
        setSessions(data)
        const stillPending = data.some((s: Session) => s.status !== "completed" && s.status !== "failed")
        if (!stillPending && pollInterval) {
          clearInterval(pollInterval)
          pollInterval = null
        }
      }, 3000)
    }

    init()

    const channel = supabase
      .channel("sessions-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "sessions" },
        (payload: { new: { id: string; status: string; completed_at: string | null } }) => {
          setSessions((prev) =>
            prev.map((s) =>
              s.id === payload.new.id
                ? { ...s, status: payload.new.status, completed_at: payload.new.completed_at }
                : s
            )
          )
        }
      )
      .subscribe()

    return () => {
      if (pollInterval) clearInterval(pollInterval)
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const handleReload = async (sessionId: string) => {
    try {
      setReloadingIds((prev) => ({ ...prev, [sessionId]: true }))
      const data = await retryOptimization(sessionId)
      setSessions((prev) =>
        prev.map((s) => s.id === sessionId ? { ...s, status: data.status || "completed" } : s)
      )
      toast.success("Optimization re-queued. Status will update shortly.")
    } catch (err: unknown) {
      toast.error(`Error: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setReloadingIds((prev) => ({ ...prev, [sessionId]: false }))
    }
  }

  const handleDelete = async (sessionId: string) => {
    try {
      setDeletingIds((prev) => ({ ...prev, [sessionId]: true }))
      const { error } = await supabase.from("sessions").delete().eq("id", sessionId)
      if (error) throw error
      setSessions((prev) => prev.filter((s) => s.id !== sessionId))
      toast.success("Session deleted.")
    } catch (err: unknown) {
      toast.error(`Error: ${err instanceof Error ? err.message : "Failed to delete"}`)
    } finally {
      setDeletingIds((prev) => ({ ...prev, [sessionId]: false }))
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Optimization History</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Review your previous sessions, track their progress, and view completed audits.
          </p>
        </div>
        <Button asChild className="rounded-xl shadow-lg shadow-primary/20 gap-2">
          <Link href="/dashboard/optimize/new">
            <Plus className="w-4 h-4" />
            New Optimization
          </Link>
        </Button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-card rounded-2xl border border-border/50">
          <Loader2 className="h-8 w-8 animate-spin text-primary/60 mb-4" />
          <p className="text-sm font-medium text-muted-foreground">Loading your history…</p>
        </div>

      /* Empty state */
      ) : sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 text-center bg-card rounded-2xl border border-dashed border-border">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Clock className="w-7 h-7 text-primary/60" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">No optimizations yet</h2>
          <p className="text-sm text-muted-foreground max-w-xs mb-8">
            Your history will appear here once you run your first resume optimization.
          </p>
          <Button asChild className="rounded-xl shadow-lg shadow-primary/20">
            <Link href="/dashboard/optimize/new">Start your first optimization</Link>
          </Button>
        </div>

      /* Grid */
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {sessions.map((session) => {
            const isReloading = reloadingIds[session.id]
            const isDeleting = deletingIds[session.id]
            const config = getStatusConfig(session.status)
            const Icon = config.icon

            return (
              <div
                key={session.id}
                className={`bg-card border border-border/50 rounded-2xl flex flex-col overflow-hidden
                  transition-all duration-200 hover:shadow-lg hover:border-border
                  border-t-2 ${config.borderTop}`}
              >
                {/* Top row: status badge + delete */}
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${config.colorClass} ${config.bgClass}`}>
                    <Icon className={`w-3 h-3 ${config.spin ? "animate-spin" : ""}`} />
                    {config.label}
                  </div>

                  {/* Delete button + confirmation */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this session?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the optimization session and all associated audit data. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(session.id)}
                          className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {/* Content */}
                <div className="px-4 pb-3 flex-1 flex flex-col gap-2">
                  <h3 className="text-[15px] font-semibold text-foreground leading-snug line-clamp-2 mt-2">
                    {session.target_job_title || "General Optimization"}
                  </h3>
                  <div className="flex flex-col gap-1 mt-1">
                    <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <time dateTime={session.created_at}>
                        {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                      </time>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      {session.credits_deducted ? "1 Credit Used" : "Free Preview"}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px mx-4 bg-border/50" />

                {/* Action */}
                <div className="px-4 py-3">
                  {session.status === "completed" && (
                    <Button
                      asChild
                      size="sm"
                      className="w-full rounded-xl shadow-sm hover:shadow-primary/20 gap-1.5"
                    >
                      <Link href={`/dashboard/audit/${session.id}`}>
                        View Audit <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  )}

                  {(session.status === "failed" || session.status === "pending") && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isReloading}
                      className="w-full rounded-xl gap-1.5"
                      onClick={() => handleReload(session.id)}
                    >
                      {isReloading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3.5 w-3.5" />
                      )}
                      Retry Optimization
                    </Button>
                  )}

                  {session.status === "processing" && (
                    <div className="flex items-center justify-center gap-2 py-1">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                      <span className="text-[12px] font-medium text-primary">Optimizing…</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
