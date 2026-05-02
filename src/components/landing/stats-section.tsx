export function StatsSection() {
  const stats = [
    { value: "100", suffix: "+", label: "ATS Keywords Matched", color: "#3a6b60", suffixColor: "#c97b4b" },
    { value: "99.9", suffix: "%", label: "Format Accuracy", color: "#c97b4b", suffixColor: "#8a4e2a" },
    { value: "2", suffix: " min", label: "Result Turnaround", color: "#c97b4b", suffixColor: "#8a4e2a" },
    { value: "11", suffix: "s", label: "Sample Collection", color: "#c97b4b", suffixColor: "#8a4e2a" },
  ]

  return (
    <section className="border-t border-b border-[#d4d0c8]">
      <div className="max-w-6xl mx-auto px-6 py-12 sm:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 sm:gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center lg:items-start gap-1 sm:gap-2 text-center lg:text-left">
              <div className="flex items-end leading-none" style={{ color: stat.color }}>
                <span className="text-[42px] sm:text-[64px] md:text-[72px] font-bold tracking-tight leading-none">{stat.value}</span>
                <span className="text-[20px] sm:text-[32px] md:text-[36px] font-bold mb-1" style={{ color: stat.suffixColor }}>{stat.suffix}</span>
              </div>
              <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#6b6560]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
