import { FileText, Target, TrendingUp } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            Three steps to your{" "}
            <span className="text-primary">best resume</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          {[
            {
              step: "01",
              icon: FileText,
              title: "Upload Your Resume",
              body: "Paste your existing resume or upload a PDF. We parse every skill and bullet point.",
            },
            {
              step: "02",
              icon: Target,
              title: "Paste the Job Description",
              body: "Drop in the job posting. Our AI maps your real experience to what the employer needs.",
            },
            {
              step: "03",
              icon: TrendingUp,
              title: "Get an Optimized Resume",
              body: "Download your rewritten resume with a full audit trail — ready to apply in seconds.",
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
              <p className="text-muted-foreground text-sm leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
