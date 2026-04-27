import { Sparkles, FileText, Shield, Zap, Search, Layout } from "lucide-react"

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    iconColor: "#3a6b60",
    borderColor: "#3a6b60",
    title: "AI Optimization",
    description: "Intelligent rewriting that blends your real experience with targeted job requirements.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    iconColor: "#c97b4b",
    borderColor: "#c97b4b",
    title: "Harvard OCS Format",
    description: "Industry-standard templates that ensure 100% compatibility with applicant tracking systems.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    iconColor: "#5c6b4a",
    borderColor: "#5c6b4a",
    title: "Private & Secure",
    description: "Your resume data is encrypted and never sold. HIPAA-grade security standards.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    iconColor: "#c97b4b",
    borderColor: "#c97b4b",
    title: "Instant Export",
    description: "High-fidelity PDF generation that preserves every font metric and layout perfectly.",
  },
  {
    icon: <Search className="w-6 h-6" />,
    iconColor: "#3a6b60",
    borderColor: "#3a6b60",
    title: "30 Second Upload",
    description: "Quick and easy resume import — PDF, Word, or plain text. Any format accepted.",
  },
  {
    icon: <Layout className="w-6 h-6" />,
    iconColor: "#5c6b4a",
    borderColor: "#5c6b4a",
    title: "ATS Certified",
    description: "Processed through our certified optimization pipeline for maximum parsing accuracy.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 bg-[#e8e4dc]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-10 bg-[#c97b4b]" />
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#c97b4b]">
            Why VeriResume
          </span>
          <div className="h-px w-10 bg-[#c97b4b]" />
        </div>

        <h2 className="text-center text-[44px] md:text-[52px] font-bold tracking-tight text-[#1a1916] mb-4">
          Built for your career.
        </h2>
        <p className="text-center text-[17px] text-[#6b6560] mb-16 max-w-xl mx-auto leading-relaxed">
          Advanced AI insights —{" "}
          <span className="text-[#3a6b60]">simple</span>,{" "}
          <span className="text-[#c97b4b]">secure</span>, and accessible.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#f0ece3] border border-[#d4d0c8] rounded-2xl p-7 flex flex-col gap-5"
              style={{ borderTop: `2px solid ${feature.borderColor}` }}
            >
              <div style={{ color: feature.iconColor }}>{feature.icon}</div>
              <div>
                <h3 className="text-[18px] font-bold text-[#1a1916] mb-2">{feature.title}</h3>
                <p className="text-[14px] text-[#6b6560] leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
