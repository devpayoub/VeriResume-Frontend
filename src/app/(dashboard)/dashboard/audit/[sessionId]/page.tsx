import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Link from "next/link"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { HarvardResumeViewer } from "@/components/harvard-resume-viewer"
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, FileDiff, FileCheck } from "lucide-react"

export default async function AuditPage(props: {
    params: Promise<{ sessionId: string }>
}) {
    const { sessionId } = await props.params

    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    // Fetch session
    const { data: session } = await supabase
        .from("sessions")
        .select("*")
        .eq("id", sessionId)
        .eq("user_id", user.id)
        .single()

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="w-8 h-8 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold">Session not found</h1>
                <p className="text-muted-foreground mt-2 max-w-sm">
                    This optimization session does not exist or you don't have access to view it.
                </p>
                <Link href="/dashboard/history" className="mt-8 text-primary hover:underline font-medium">
                    &larr; Back to History
                </Link>
            </div>
        )
    }

    // Fetch result and audit trails if completed
    let result = null
    let auditTrails: any[] = []

    if (session.status === "completed") {
        const { data: resultData } = await supabase
            .from("optimized_results")
            .select("*")
            .eq("session_id", sessionId)
            .single()

        if (resultData) {
            result = resultData

            const { data: auditData } = await supabase
                .from("audit_trails")
                .select("*")
                .eq("optimized_result_id", result.id)

            auditTrails = auditData || []
        }
    }

    return (
        <div className="flex flex-col space-y-8 w-full xl:pl-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <Link
                    href="/dashboard/history"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6 bg-muted/30 hover:bg-muted/50 px-3 py-1.5 rounded-full"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to History
                </Link>
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold tracking-tight">Audit Trail</h1>
                            <Badge
                                className={
                                    session.status === "completed"
                                        ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20"
                                        : session.status === "failed"
                                            ? "bg-destructive/15 text-destructive hover:bg-destructive/25 border-destructive/20"
                                            : "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                                }
                                variant="outline"
                            >
                                {session.status.toUpperCase()}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            Verification report for: <strong className="text-foreground font-medium">{session.target_job_title || "General Optimization"}</strong>
                        </p>
                    </div>
                    <div className="text-sm text-right text-muted-foreground bg-muted/10 border p-3 rounded-xl">
                        <div className="font-medium text-foreground mb-1">Session Date</div>
                        {new Date(session.created_at).toLocaleString()}
                    </div>
                </div>
            </div>

            {session.status !== "completed" ? (
                <Card className="border-dashed bg-card/30 backdrop-blur border-2 rounded-3xl shadow-none">
                    <CardContent className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                            <FileDiff className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Process Not Finished</h2>
                        <p className="max-w-md">
                            This optimization is currently{" "}
                            <span className="font-medium text-primary">
                                {session.status}
                            </span>
                            . You will be able to view the AI edits and original traceability
                            once it finishes successfully.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid xl:grid-cols-[1fr_minmax(0,1050px)] gap-10 items-start">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <FileDiff className="w-5 h-5 text-primary" /> Changes Overview
                            </h2>
                        </div>
                        <p className="text-muted-foreground mb-6 max-w-xl">
                            Detailed tracking of how the AI altered your original content.
                            Honesty checks ensure no fabricated experience is injected into your resume.
                        </p>

                        {auditTrails.length === 0 ? (
                            <Card className="border-dashed bg-muted/10 rounded-2xl">
                                <CardContent className="py-12 text-center text-muted-foreground">
                                    No changes were made or audit trail was not generated.
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-6">
                                {auditTrails.map((entry, index) => (
                                    <div key={entry.id} className="group relative">
                                        <div className="absolute -left-3 top-6 bottom-6 w-0.5 bg-border group-hover:bg-primary/30 transition-colors rounded-full" />
                                        <Card className="rounded-2xl overflow-hidden border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20">

                                            {/* Top Bar with Badges */}
                                            <div className="bg-muted/30 px-5 py-3 border-b border-border/50 flex flex-wrap items-center justify-between gap-4 text-sm">
                                                <div className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">
                                                    Section Edit #{index + 1}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-muted-foreground">Confidence:</span>
                                                        <span className="font-bold">
                                                            {entry.confidence_score !== null
                                                                ? `${(entry.confidence_score * 100).toFixed(0)}%`
                                                                : "-"}
                                                        </span>
                                                    </div>
                                                    <Separator orientation="vertical" className="h-4 bg-border/50" />
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-muted-foreground">Honesty Check:</span>
                                                        <Badge
                                                            variant="outline"
                                                            className={entry.is_honest
                                                                ? "bg-emerald-500/10 text-emerald-600 border-transparent shadow-none"
                                                                : "bg-destructive/10 text-destructive border-transparent shadow-none"
                                                            }
                                                        >
                                                            {entry.is_honest ? (
                                                                <><CheckCircle2 className="w-3 h-3 mr-1" /> Passed</>
                                                            ) : (
                                                                <><AlertTriangle className="w-3 h-3 mr-1" /> Flagged</>
                                                            )}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Side-by-Side Content */}
                                            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border/50">
                                                {/* Original */}
                                                <div className="p-5 md:p-6 bg-red-500/5 dark:bg-red-500-[0.02] relative">
                                                    <div className="text-xs font-semibold text-red-500 mb-3 flex items-center gap-2 uppercase tracking-wide">
                                                        <span className="w-2 h-2 rounded-full bg-red-500" />
                                                        Original Text
                                                    </div>
                                                    <p className="text-sm md:text-base leading-relaxed line-through decoration-red-500/30 text-muted-foreground break-words whitespace-pre-wrap">
                                                        {entry.original_sentence || <span className="italic opacity-50">Empty</span>}
                                                    </p>
                                                </div>

                                                {/* Optimized */}
                                                <div className="p-5 md:p-6 bg-emerald-500/5 dark:bg-emerald-500-[0.02] relative">
                                                    <div className="text-xs font-semibold text-emerald-600 mb-3 flex items-center gap-2 uppercase tracking-wide">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                                        Optimized Text
                                                    </div>
                                                    <p className="text-sm md:text-base leading-relaxed text-foreground font-medium break-words whitespace-pre-wrap">
                                                        {entry.optimized_sentence}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="xl:sticky xl:top-6 min-w-0">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FileCheck className="w-6 h-6 text-primary" /> Final ATS-Optimized Resume
                        </h2>
                        <HarvardResumeViewer content={result?.rewritten_text || ""} />
                    </div>
                </div>
            )}
        </div>
    )
}
