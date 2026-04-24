import Link from "next/link"
import {
  CheckCircle,
  ArrowRight,
  Zap,
  Lock,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <Badge
          variant="secondary"
          className="mb-8 py-1.5 px-4 rounded-full text-sm font-medium border-primary/20 text-primary"
        >
          <Zap className="w-4 h-4 mr-2" />
          AI Resume Optimizer · Honest · ATS-Ready
        </Badge>

        <h1 className="text-5xl md:text-[72px] font-black tracking-tight leading-[1.06] mb-6">
          Land More Interviews.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600">
            Without the Lies.
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          VeriResume uses AI to rewrite your resume for any job — pulling only
          from your real experience. Every change is traced, transparent, and
          truthful.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            asChild
            className="rounded-2xl h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/signup">
              Start Free — 5 Credits Included
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="rounded-2xl h-14 px-8 text-base"
          >
            <Link href="/pricing">See Pricing</Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            { icon: CheckCircle, text: "No credit card required" },
            { icon: Lock, text: "100% private & secure" },
            { icon: Star, text: "Trusted by 2,000+ job seekers" },
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
  )
}
