import { Package, Inbox, BarChart2 } from "lucide-react"

const steps = [
  {
    number: "01",
    numberColor: "#c97b4b",
    borderColor: "#c97b4b",
    icon: <Package className="w-5 h-5" style={{ color: "#c97b4b" }} />,
    title: "Upload Resume",
    description:
      "Upload your current resume in PDF or Word format. Our parser extracts your full work history with precision.",
    tag: "PDF & DOCX SUPPORTED",
  },
  {
    number: "02",
    numberColor: "#3a6b60",
    borderColor: "#3a6b60",
    icon: <Inbox className="w-5 h-5" style={{ color: "#3a6b60" }} />,
    title: "Paste Job Description",
    description:
      "Drop in the job posting you're targeting. Our AI dissects the requirements and extracts key technical signals.",
    tag: "ANY JOB BOARD SUPPORTED",
  },
  {
    number: "03",
    numberColor: "#5c6b4a",
    borderColor: "#5c6b4a",
    icon: <BarChart2 className="w-5 h-5" style={{ color: "#5c6b4a" }} />,
    title: "Download Optimized PDF",
    description:
      "Receive a Harvard OCS formatted resume rewritten to match the job — ready for submission.",
    tag: "WITHIN 2 MINUTES",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-10 bg-[#c97b4b]" />
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#c97b4b]">
            How It Works
          </span>
          <div className="h-px w-10 bg-[#c97b4b]" />
        </div>

        <h2 className="text-center text-[44px] md:text-[52px] font-bold tracking-tight text-[#1a1916] mb-4">
          Three steps from draft to dream job.
        </h2>
        <p className="text-center text-[17px] text-[#6b6560] mb-16 max-w-xl mx-auto leading-relaxed">
          No recruiters, no guesswork, no waiting.{" "}
          <span className="text-[#3a6b60]">Just precision AI and clarity.</span>
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#f0ece3] border border-[#d4d0c8] rounded-2xl p-7 flex flex-col gap-5"
              style={{ borderTop: `2px solid ${step.borderColor}` }}
            >
              <div className="flex items-start justify-between">
                <span
                  className="text-[56px] font-bold leading-none"
                  style={{ color: step.numberColor }}
                >
                  {step.number}
                </span>
                {step.icon}
              </div>

              <div>
                <h3 className="text-[19px] font-bold text-[#1a1916] mb-2">{step.title}</h3>
                <p className="text-[14px] text-[#6b6560] leading-relaxed">{step.description}</p>
              </div>

              <div className="mt-auto pt-5 border-t border-[#d4d0c8]">
                <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#6b6560]">
                  • {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
