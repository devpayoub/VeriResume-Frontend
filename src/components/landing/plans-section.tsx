import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    tag: "FOR INDIVIDUALS",
    badge: null,
    title: "VeriResume · Solo",
    description: (
      <>
        AI-powered resume optimization from a single{" "}
        <span className="text-[#c97b4b]">job description paste</span>.
      </>
    ),
    cta: "Get Started · Free Trial",
    features: [
      "Upload PDF or Word resume",
      "Unlimited job description pastes",
      "Harvard OCS format output",
      "ATS keyword injection",
      "Instant PDF export",
      "Secure personal dashboard",
    ],
    borderColor: "#c97b4b",
    tagColor: "#c97b4b",
  },
  {
    tag: "FOR TEAMS",
    badge: "MOST POPULAR",
    title: "VeriResume · Teams",
    description: (
      <>
        The same optimization engine,{" "}
        <span className="text-[#3a6b60]">tuned for team workflows</span> and bulk processing.
      </>
    ),
    cta: "Reserve Access",
    features: [
      "Everything in Solo",
      "Multi-member access",
      "Bulk resume processing",
      "Team analytics dashboard",
      "Priority processing queue",
      "Shareable PDF reports",
    ],
    borderColor: "#3a6b60",
    tagColor: "#3a6b60",
  },
]

export function PlansSection() {
  return (
    <section id="plans" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-10 bg-[#3a6b60]" />
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#3a6b60]">
            Reserve Early Access
          </span>
          <div className="h-px w-10 bg-[#c97b4b]" />
        </div>

        <h2 className="text-center text-[44px] md:text-[56px] font-bold tracking-tight text-[#1a1916] mb-4">
          Built for two goals.
        </h2>
        <p className="text-center text-[17px] text-[#6b6560] mb-16 max-w-lg mx-auto leading-relaxed">
          One AI engine, two career applications. Reserve your spot before public launch.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="bg-[#f0ece3] border border-[#d4d0c8] rounded-2xl p-8 flex flex-col gap-6"
              style={{ borderTop: `2px solid ${plan.borderColor}` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: plan.tagColor }} />
                  <span className="text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: plan.tagColor }}>
                    {plan.tag}
                  </span>
                </div>
                {plan.badge && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c97b4b]" />
                    <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#c97b4b]">
                      {plan.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Title + description */}
              <div>
                <h3 className="text-[28px] font-bold text-[#1a1916] mb-2">{plan.title}</h3>
                <p className="text-[14px] text-[#6b6560] leading-relaxed">{plan.description}</p>
              </div>

              {/* Feature list */}
              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: plan.tagColor }} />
                    <span className="text-[13px] text-[#6b6560]">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                className="mt-auto w-full rounded-full h-11 font-semibold text-[13px] text-white shadow-none border-0"
                style={{ background: plan.borderColor }}
              >
                <Link href="/signup">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
