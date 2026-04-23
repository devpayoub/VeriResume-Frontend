"use client"

import * as React from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { retryOptimization } from "@/lib/api/optimization"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, Clock, CheckCircle2, XCircle, ArrowRight, FileText, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Session {
  id: string
  target_job_title: string
  status: string
  credits_deducted: boolean
  created_at: string
  completed_at: string | null
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "completed":
      return {
        icon: CheckCircle2,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        label: "Completed"
      }
    case "failed":
      return {
        icon: XCircle,
        color: "text-destructive",
        bg: "bg-destructive/10",
        border: "border-destructive/20",
        label: "Failed"
      }
    default:
      return {
        icon: Loader2,
        color: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/20",
        label: "Processing",
        spin: true
      }
  }
}

export default function HistoryPage() {
  const supabase = createClient()
  const [sessions, setSessions] = React.useState<Session[]>([])
  const [loading, setLoading] = React.useState(true)
  const [reloadingIds, setReloadingIds] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    const fetchSessions = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from("sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setSessions(data || [])
      setLoading(false)
    }

    fetchSessions()

    // Setup realtime listener for session updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'sessions',
        },
        (payload) => {
          setSessions((prev) =>
            prev.map((s) => (s.id === payload.new.id ? { ...s, status: payload.new.status, completed_at: payload.new.completed_at } : s))
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const handleReload = async (sessionId: string) => {
    try {
      setReloadingIds((prev) => ({ ...prev, [sessionId]: true }))

      const data = await retryOptimization(sessionId)

      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId ? { ...s, status: data.status || "completed" } : s
        )
      )
      toast.success("Optimization request sent! Check the status for updates.")
    } catch (err: any) {
      toast.error(`Error: ${err.message}`)
    } finally {
      setReloadingIds((prev) => ({ ...prev, [sessionId]: false }))
    }
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Optimization History</h1>
        <p className="text-muted-foreground mt-1">
          Review your previous sessions, track their progress, and view completed audits.
        </p>
      </div>

      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-border/50">
              <Loader2 className="h-10 w-10 animate-spin text-primary/50 mb-4" />
              <p className="text-muted-foreground font-medium">Loading history...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-card rounded-3xl border border-dashed text-muted-foreground">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No optimizations yet</h2>
              <p className="max-w-xs mb-6">You haven't run any resume optimizations. Your history will appear here.</p>
              <Button asChild className="rounded-xl shadow-lg shadow-primary/20">
                <Link href="/dashboard/optimize/new">Start your first optimization</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {sessions.map((session) => {
                const isReloading = reloadingIds[session.id]
                const config = getStatusConfig(session.status)
                const Icon = config.icon

                return (
                  <Card key={session.id} className={`flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 hover:border-primary/20 ${session.status === 'completed' ? 'bg-card' : 'bg-muted/10'}`}>
                    <div className="p-5 flex flex-col h-full gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 shrink-0 ${config.border} ${config.bg}`}>
                          <Icon className={`w-5 h-5 ${config.color} ${config.spin ? 'animate-spin' : ''}`} />
                        </div>
                        <Badge variant="outline" className={`${config.color} ${config.bg} border-transparent flex gap-1.5 whitespace-nowrap`}>
                          <Icon className={`w-3 h-3 ${config.spin ? 'animate-spin' : ''}`} />
                          {config.label}
                        </Badge>
                      </div>

                      <div className="space-y-1.5 flex-1 mt-2">
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                          {session.target_job_title || "General Optimization"}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 shrink-0" />
                          <time dateTime={session.created_at}>{formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}</time>
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <FileText className="w-4 h-4 shrink-0" />
                          {session.credits_deducted ? "1 Credit Used" : "Free Preview"}
                        </p>
                      </div>

                      <div className="pt-4 border-t mt-auto flex items-center justify-end">
                        {session.status === "completed" && (
                          <Button asChild className="w-full rounded-xl shadow-sm hover:shadow-primary/20 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
                            <Link href={`/dashboard/audit/${session.id}`}>
                              View Audit <ArrowRight className="w-4 h-4 ml-1.5" />
                            </Link>
                          </Button>
                        )}

                        {(session.status === "failed" || session.status === "pending") && (
                          <Button
                            variant="outline"
                            disabled={isReloading}
                            className="w-full rounded-xl"
                            onClick={() => handleReload(session.id)}
                          >
                            {isReloading ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <RefreshCw className="h-4 w-4 mr-2" />
                            )}
                            Retry Optimization
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
