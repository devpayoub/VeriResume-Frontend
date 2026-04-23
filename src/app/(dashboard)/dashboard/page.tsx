import Link from "next/link"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, FileText, ArrowRight, Activity, Cpu } from "lucide-react"

export default async function DashboardPage() {
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

    if (!user) {
        return null // Layout handles redirect
    }

    const [profileRes, sessionsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase
            .from("sessions")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5),
    ])

    const profile = profileRes.data
    const sessions = sessionsRes.data || []

    // Derived Analytics
    const successSessions = sessions.filter(s => s.status === 'completed')

    return (
        <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-card/50 backdrop-blur-xl border p-6 rounded-2xl shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-muted-foreground mt-1">Here's your active resume optimization overview.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl" asChild>
                        <Link href="/dashboard/resumes">
                            <FileText className="w-4 h-4 mr-2 text-primary" />
                            My Resumes
                        </Link>
                    </Button>
                    <Button className="rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow" asChild>
                        <Link href="/dashboard/optimize/new">
                            <Sparkles className="w-4 h-4 mr-2" />
                            New Optimization
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Metric Cards Area */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="rounded-2xl border-primary/20 bg-gradient-to-b from-card to-primary/5 shadow-sm overflow-hidden group">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 bg-primary/5 border-b border-primary/10">
                        <CardTitle className="text-sm font-medium text-primary">Credits Remaining</CardTitle>
                        <Sparkles className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="text-4xl font-extrabold tracking-tighter text-primary">
                            {profile?.credits_remaining ?? 0}
                        </div>
                        <p className="text-xs text-primary/70 font-medium mt-1 uppercase tracking-wider">Available Tokens</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm overflow-hidden group hover:border-foreground/20 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/30 border-b">
                        <CardTitle className="text-sm font-medium">Subscription Tier</CardTitle>
                        <Activity className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold capitalize">
                                {profile?.subscription_tier ?? "Free"}
                            </span>
                            {profile?.subscription_tier === 'pro' && (
                                <Badge className="bg-gradient-to-r from-amber-500 to-orange-400">PRO</Badge>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Current billing cycle</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm overflow-hidden group hover:border-foreground/20 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/30 border-b">
                        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                        <Cpu className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="text-3xl font-bold">{sessions.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {successSessions.length} successful optimizations
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* List Table Replaced with sleek Feed */}
            <Card className="rounded-2xl border-none shadow-sm shadow-black/5 bg-card/60 backdrop-blur-xl">
                <CardHeader className="px-6 pt-6 border-b">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Recent Optimizations</CardTitle>
                            <CardDescription>Your latest resume optimization sessions.</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="hidden sm:flex text-primary" asChild>
                            <Link href="/dashboard/history">
                                View All History <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {sessions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8 text-primary/40" />
                            </div>
                            <p className="text-foreground font-medium">No optimizations yet</p>
                            <p className="text-muted-foreground text-sm max-w-[250px] mt-1">
                                Start by uploading your target job and base resume to optimize.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {sessions.map((session) => (
                                <div key={session.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${session.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                                session.status === 'failed' ? 'bg-red-500/10 text-red-500' :
                                                    'bg-primary/10 text-primary animate-pulse'
                                            }`}>
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                                {session.target_job_title || "Optimization Session"}
                                            </h4>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {new Date(session.created_at).toLocaleDateString('en-US', {
                                                    month: 'short', day: 'numeric', year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge
                                            variant={session.status === "completed" ? "default" : "secondary"}
                                            className={session.status === "failed" ? "bg-red-500 text-white" : ""}
                                        >
                                            {session.status}
                                        </Badge>
                                        <Button variant="ghost" size="sm" asChild className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/dashboard/audit/${session.id}`}>
                                                Audit
                                                <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
