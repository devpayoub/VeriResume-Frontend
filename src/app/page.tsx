import Link from 'next/link'
import {
    FileText, Shield, Target,
    CheckCircle, ArrowRight, Sparkles,
    TrendingUp, Lock, Star, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
            {/* ── Navbar ── */}
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

            <main className="flex-1">
                {/* ══════════════════════════════
            HERO
        ══════════════════════════════ */}
                <section className="relative pt-24 pb-20 overflow-hidden">
                    {/* Subtle Background Elements */}
                    <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                    <div className="relative max-w-5xl mx-auto px-6 text-center">
                        {/* Badge */}
                        <Badge variant="secondary" className="mb-8 py-1.5 px-4 rounded-full text-sm font-medium border-primary/20 text-primary">
                            <Zap className="w-4 h-4 mr-2" />
                            AI Resume Optimizer · Honest · ATS-Ready
                        </Badge>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-[72px] font-black tracking-tight leading-[1.06] mb-6">
                            Land More Interviews.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600">
                                Without the Lies.
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            VeriResume uses AI to rewrite your resume for any job — pulling only from your real experience. Every change is traced, transparent, and truthful.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Button size="lg" asChild className="rounded-2xl h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all">
                                <Link href="/signup">
                                    Start Free — 5 Credits Included
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="rounded-2xl h-14 px-8 text-base">
                                <Link href="/pricing">See Pricing</Link>
                            </Button>
                        </div>

                        {/* Trust pills */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { icon: CheckCircle, text: 'No credit card required' },
                                { icon: Lock, text: '100% private & secure' },
                                { icon: Star, text: 'Trusted by 2,000+ job seekers' },
                            ].map(({ icon: Icon, text }) => (
                                <span
                                    key={text}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted-foreground bg-muted/50 rounded-full"
                                >
                                    <Icon className="w-4 h-4 text-primary" />
                                    {text}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
            FEATURES
        ══════════════════════════════ */}
                <section className="py-24 bg-muted/30">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Why VeriResume</p>
                            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                                Smarter. Faster. <span className="text-primary">Honest.</span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-xl mx-auto font-medium">
                                Every feature is built around one principle: only say what's true.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Shield,
                                    title: 'Honest Optimization',
                                    description: 'We only surface skills and experience that actually exist in your resume. Zero fabrication, ever.',
                                    tag: 'Integrity-first',
                                },
                                {
                                    icon: Target,
                                    title: 'ATS-Ready Output',
                                    description: 'Our AI knows what Applicant Tracking Systems look for and writes to pass — truthfully.',
                                    tag: 'Beat the bots',
                                },
                                {
                                    icon: FileText,
                                    title: 'Full Audit Trail',
                                    description: 'See a side-by-side diff of every change. Know exactly what was rewritten and why.',
                                    tag: 'Transparent',
                                },
                            ].map(({ icon: Icon, title, description, tag }) => (
                                <Card key={title} className="border-none shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="p-8">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <Badge variant="secondary" className="mb-4">{tag}</Badge>
                                        <h3 className="text-xl font-bold mb-3">{title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Stats row */}
                        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { value: '2,000+', label: 'Resumes optimized' },
                                { value: '3×', label: 'More callbacks' },
                                { value: '<60s', label: 'Avg. time' },
                                { value: '100%', label: 'Truthful rewrites' },
                            ].map(({ value, label }) => (
                                <Card key={label} className="text-center p-6 border-none text-card-foreground bg-card shadow-sm">
                                    <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600 mb-2">{value}</p>
                                    <p className="text-sm text-muted-foreground font-medium">{label}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
            HOW IT WORKS
        ══════════════════════════════ */}
                <section className="py-24">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">How it works</p>
                            <h2 className="text-4xl md:text-5xl font-black">
                                Three steps to your <span className="text-primary">best resume</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 relative">
                            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
                            {[
                                {
                                    step: '01',
                                    icon: FileText,
                                    title: 'Upload Your Resume',
                                    body: 'Paste your existing resume or upload a PDF. We parse every skill and bullet point.',
                                },
                                {
                                    step: '02',
                                    icon: Target,
                                    title: 'Paste the Job Description',
                                    body: 'Drop in the job posting. Our AI maps your real experience to what the employer needs.',
                                },
                                {
                                    step: '03',
                                    icon: TrendingUp,
                                    title: 'Get an Optimized Resume',
                                    body: 'Download your rewritten resume with a full audit trail — ready to apply in seconds.',
                                },
                            ].map(({ step, icon: Icon, title, body }) => (
                                <div key={step} className="text-center z-10">
                                    <div className="relative inline-flex">
                                        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-6 mx-auto shadow-xl shadow-primary/20">
                                            <Icon className="w-8 h-8 text-primary-foreground" />
                                        </div>
                                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-primary text-primary text-[10px] font-black flex items-center justify-center">
                                            {step}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
            CTA BANNER
        ══════════════════════════════ */}
                <section className="py-24 bg-muted/30">
                    <div className="max-w-4xl mx-auto px-6">
                        <Card className="rounded-3xl p-12 text-center text-white border-none overflow-hidden relative" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #7c3aed 100%)' }}>
                            <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-white/10" />
                            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/10" />

                            <div className="relative z-10">
                                <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/80 mb-3">Get started today</p>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    Your Dream Job Is<br />One Resume Away.
                                </h2>
                                <p className="text-primary-foreground/90 text-lg mb-10 max-w-xl mx-auto font-medium">
                                    Join 2,000+ job seekers getting more callbacks with an honest, AI-optimized resume.
                                </p>
                                <Button size="lg" variant="secondary" asChild className="rounded-2xl h-14 px-10 text-primary font-bold shadow-xl hover:-translate-y-1 transition-all">
                                    <Link href="/signup">
                                        Claim Your 5 Free Credits
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className="border-t bg-muted/10 py-8 mt-auto">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-primary-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2026 <strong className="text-foreground">VeriResume</strong> — All rewrites traced to your real experience.
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
