import { Shield, Target, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
            Why VeriResume
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Smarter. Faster. <span className="text-primary">Honest.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-medium">
            Every feature is built around one principle: only say what&apos;s
            true.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: "Honest Optimization",
              description:
                "We only surface skills and experience that actually exist in your resume. Zero fabrication, ever.",
              tag: "Integrity-first",
            },
            {
              icon: Target,
              title: "ATS-Ready Output",
              description:
                "Our AI knows what Applicant Tracking Systems look for and writes to pass — truthfully.",
              tag: "Beat the bots",
            },
            {
              icon: FileText,
              title: "Full Audit Trail",
              description:
                "See a side-by-side diff of every change. Know exactly what was rewritten and why.",
              tag: "Transparent",
            },
          ].map(({ icon: Icon, title, description, tag }) => (
            <Card
              key={title}
              className="border-none shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary" className="mb-4">
                  {tag}
                </Badge>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "2,000+", label: "Resumes optimized" },
            { value: "3×", label: "More callbacks" },
            { value: "<60s", label: "Avg. time" },
            { value: "100%", label: "Truthful rewrites" },
          ].map(({ value, label }) => (
            <Card
              key={label}
              className="text-center p-6 border-none text-card-foreground bg-card shadow-sm"
            >
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600 mb-2">
                {value}
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                {label}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
