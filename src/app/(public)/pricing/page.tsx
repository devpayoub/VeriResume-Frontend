import Link from "next/link"
import { CheckCircle, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-muted/20 flex flex-col">
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-primary text-primary-foreground">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight">
                            Veri<span className="text-primary">Resume</span>
                        </span>
                    </Link>

                    <nav className="flex items-center gap-4">
                        <Button variant="ghost" asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                        <Button asChild className="rounded-xl">
                            <Link href="/signup">Get Started Free</Link>
                        </Button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Simple Pricing</h1>
                        <p className="text-xl text-muted-foreground font-medium">
                            No subscriptions. Just credits when you need them.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <Card className="flex flex-col relative overflow-hidden border-primary/50 shadow-lg">
                            <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
                            <CardHeader>
                                <CardTitle className="text-2xl">Start for Free</CardTitle>
                                <CardDescription>Perfect to try out the AI optimization</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-5xl font-black">5</span>
                                    <span className="text-muted-foreground font-medium uppercase tracking-widest text-sm">Credits</span>
                                </div>

                                <ul className="space-y-4">
                                    {[
                                        "Resume parsing and storage",
                                        "Job description analysis",
                                        "Honest optimization",
                                        "Full audit trail",
                                        "DOCX download",
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-sm font-medium">
                                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full h-12 text-base">
                                    <Link href="/signup">Claim Free Credits</Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="flex flex-col bg-muted/50 border-dashed">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-2xl text-muted-foreground">Pro</CardTitle>
                                    <Badge variant="secondary">Coming Soon</Badge>
                                </div>
                                <CardDescription>For serious job seekers applying heavily</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex items-baseline gap-2 mb-8 opacity-50">
                                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600">50</span>
                                    <span className="text-muted-foreground font-medium uppercase tracking-widest text-sm">Credits</span>
                                </div>

                                <ul className="space-y-4 opacity-70">
                                    {[
                                        "Everything in Free",
                                        "Priority AI processing",
                                        "Multi-job targeting",
                                        "LinkedIn profile optimization",
                                        "Cover letter generation",
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-sm font-medium">
                                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button variant="secondary" disabled className="w-full h-12 text-base">
                                    Notify Me When Live
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="text-center mt-12 bg-muted/40 rounded-2xl p-6 max-w-2xl mx-auto pb-6 border">
                        <p className="text-muted-foreground mb-1 font-medium">
                            Need more credits today?
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Contact the administrator from your dashboard to request a refill. Each AI optimization strictly deducts 1 credit.
                        </p>
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="border-t bg-muted/30 py-8">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-primary-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2026 <strong className="text-foreground">VeriResume</strong>
                        </p>
                    </div>
                    <div className="flex gap-6 text-sm font-semibold text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link href="/" className="hover:text-primary transition-colors">Terms</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
