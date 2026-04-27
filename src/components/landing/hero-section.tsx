import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Eyebrow label with flanking rules — exact CeruLabs style
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-5">
      <div className="h-px w-8 bg-[#c97b4b]" />
      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#c97b4b]">
        {children}
      </span>
      <div className="h-px w-8 bg-[#c97b4b]" />
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* Vertical grid background — exact CeruLabs style */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-[#1a1916]/[0.04]"
            style={{ left: `${(i + 1) * (100 / 13)}%` }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-[#c97b4b]" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#c97b4b]">
                Introducing VeriResume
              </span>
            </div>

            <h1 className="text-[64px] md:text-[76px] leading-[1.05] font-bold mb-6 tracking-tight">
              <span className="text-[#1a1916]">The smartest</span>
              <br />
              <span className="text-[#6b6560] font-bold">resume engine.</span>
            </h1>

            <p className="text-[15px] text-[#6b6560] leading-relaxed mb-10 max-w-md">
              AI-driven rewriting of{" "}
              <strong className="text-[#1a1916] font-semibold">99+ job keywords</strong>{" "}
              from a single job description. ATS-compliant results in{" "}
              <strong className="text-[#1a1916] font-semibold">2 minutes</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
              <Button
                asChild
                size="lg"
                className="rounded-full px-7 h-12 bg-[#c97b4b] hover:bg-[#b56a3a] text-white font-semibold text-[14px] gap-2 shadow-none border-0"
              >
                <Link href="/signup">
                  Optimize Now <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Link
                href="#how-it-works"
                className="flex items-center gap-1.5 text-[14px] font-medium text-[#6b6560] hover:text-[#1a1916] transition-colors"
              >
                How it works ↗
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {[
                { label: "ATS-Certified Format", color: "#c97b4b" },
                { label: "Published AI Engine", color: "#3a6b60" },
                { label: "2-Min Turnaround", color: "#c97b4b" },
                { label: "Non-Invasive Editing", color: "#3a6b60" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: item.color }}>
                    • {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — Resume Audit card */}
          <div className="relative">
            <div className="bg-[#f0ece3] border border-[#d4d0c8] rounded-2xl overflow-hidden shadow-sm">
              {/* Card header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#d4d0c8]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3a6b60]" />
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#6b6560]">
                    Resume Audit · Job #0001
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#6b6560]">LIVE</span>
              </div>

              {/* Document Analysis view */}
              <div className="px-5 pt-5 pb-5 bg-[#f5f1e8] flex gap-4 h-[200px] overflow-hidden">
                {/* Original Document abstract */}
                <div className="flex-1 flex flex-col gap-2.5 opacity-40 relative pt-2">
                   <div className="w-1/2 h-2.5 bg-[#6b6560] rounded-sm" />
                   <div className="w-full h-1.5 bg-[#d4d0c8] rounded-sm mt-1" />
                   <div className="w-3/4 h-1.5 bg-[#d4d0c8] rounded-sm" />
                   <div className="w-full h-1.5 bg-[#d4d0c8] rounded-sm mt-3" />
                   <div className="w-5/6 h-1.5 bg-[#d4d0c8] rounded-sm" />
                   <div className="w-2/3 h-1.5 bg-[#d4d0c8] rounded-sm" />
                   <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#f5f1e8] to-transparent" />
                </div>
                
                {/* Optimized Document abstract */}
                <div className="flex-[1.5] border border-[#c97b4b]/20 bg-white rounded-lg p-3.5 flex flex-col gap-3 relative shadow-sm">
                   <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3a6b60] animate-pulse" />
                      <span className="text-[7px] font-bold tracking-widest text-[#3a6b60] uppercase">Optimized</span>
                   </div>

                   <div className="w-1/3 h-2.5 bg-[#1a1916] rounded-sm" />
                   
                   {/* paragraph with highlighted 'keywords' */}
                   <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <div className="w-12 h-1.5 bg-[#d4d0c8] rounded-sm" />
                      <div className="px-1.5 py-0.5 bg-[#c97b4b]/10 text-[#c97b4b] text-[7px] font-bold rounded">TYPESCRIPT</div>
                      <div className="w-16 h-1.5 bg-[#d4d0c8] rounded-sm" />
                      <div className="w-8 h-1.5 bg-[#d4d0c8] rounded-sm" />
                      <div className="px-1.5 py-0.5 bg-[#3a6b60]/10 text-[#3a6b60] text-[7px] font-bold rounded">REACT.JS</div>
                      <div className="w-14 h-1.5 bg-[#d4d0c8] rounded-sm" />
                   </div>
                   
                   <div className="flex flex-wrap items-center gap-1.5">
                      <div className="px-1.5 py-0.5 bg-[#5c6b4a]/10 text-[#5c6b4a] text-[7px] font-bold rounded">SYSTEM ARCHITECTURE</div>
                      <div className="w-10 h-1.5 bg-[#d4d0c8] rounded-sm" />
                      <div className="w-14 h-1.5 bg-[#d4d0c8] rounded-sm" />
                      <div className="w-8 h-1.5 bg-[#d4d0c8] rounded-sm" />
                   </div>
                   
                   <div className="w-full h-[1px] bg-[#d4d0c8]/50 my-1" />
                   
                   <div className="w-2/5 h-2.5 bg-[#1a1916] rounded-sm" />
                   <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <div className="w-14 h-1.5 bg-[#d4d0c8] rounded-sm" />
                      <div className="px-1.5 py-0.5 bg-[#c97b4b]/10 text-[#c97b4b] text-[7px] font-bold rounded">NODE.JS</div>
                      <div className="w-10 h-1.5 bg-[#d4d0c8] rounded-sm" />
                      <div className="px-1.5 py-0.5 bg-[#3a6b60]/10 text-[#3a6b60] text-[7px] font-bold rounded">AWS</div>
                   </div>
                   <div className="flex flex-wrap items-center gap-1.5">
                      <div className="w-20 h-1.5 bg-[#d4d0c8] rounded-sm" />
                      <div className="px-1.5 py-0.5 bg-[#5c6b4a]/10 text-[#5c6b4a] text-[7px] font-bold rounded">GRAPHQL</div>
                   </div>
                </div>
              </div>

              {/* Card footer stats */}
              <div className="grid grid-cols-3 divide-x divide-[#d4d0c8] border-t border-[#d4d0c8]">
                {[
                  { value: "99", label: "KEYWORDS" },
                  { value: "2:14", label: "PROCESSING" },
                  { value: "03", label: "SECTIONS MATCHED" },
                ].map((stat) => (
                  <div key={stat.label} className="px-5 py-4">
                    <div className="text-[22px] font-bold text-[#1a1916]">{stat.value}</div>
                    <div className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#6b6560]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
