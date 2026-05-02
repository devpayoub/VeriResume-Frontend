import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function CtaSection() {
  return (
    <section className="py-20 sm:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <Card
          className="rounded-3xl p-8 sm:p-12 text-center text-white border-none overflow-hidden relative"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)) 0%, #7c3aed 100%)",
          }}
        >
          <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/10" />

          <div className="relative z-10">
            <p className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-primary-foreground/80 mb-3">
              Get started today
            </p>
            <h2 className="text-[28px] sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
              Your Dream Job Is
              <br />
              One Resume Away.
            </h2>
            <p className="text-primary-foreground/90 text-[15px] sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto font-medium leading-relaxed">
              Join 2,000+ job seekers getting more callbacks with an honest,
              AI-optimized resume.
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="rounded-2xl h-12 sm:h-14 px-8 sm:px-10 text-primary font-bold shadow-xl hover:-translate-y-1 transition-all text-sm"
            >
              <Link href="/signup">
                Claim Your 5 Free Credits
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
