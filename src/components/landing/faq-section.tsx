import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

const faqs = [
  {
    question: "How does the AI optimize my resume?",
    answer:
      "Our engine analyzes your target job description and rewrites your experience to highlight matching skills — while preserving the authenticity of your career history.",
  },
  {
    question: "Is the Harvard OCS format really ATS-compliant?",
    answer:
      "Yes. The Harvard OCS format is a plain-text, single-column standard widely recognized as the most reliable layout for parsing by Applicant Tracking Systems.",
  },
  {
    question: "What keywords do you analyze?",
    answer:
      "We extract 99+ technical and soft-skill keywords from the job description and align them against your experience to maximize match rates.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. We use bank-grade encryption and Supabase Auth to keep your data private. We never sell your resume data to third parties.",
  },
  {
    question: "How should I interpret my results?",
    answer:
      "Your optimized resume arrives with a keyword match score and a side-by-side audit view showing exactly what the AI changed and why.",
  },
  {
    question: "Is this an automated process?",
    answer:
      "Yes — fully automated. The AI processes your resume and job description and generates the optimized PDF in under 2 minutes.",
  },
  {
    question: "How accurate is the optimization engine?",
    answer:
      "Our engine achieves a 99.9% format accuracy rate and consistently scores above 90% on ATS keyword match benchmarks.",
  },
  {
    question: "Why use AI instead of doing it manually?",
    answer:
      "Manual tailoring takes hours per application. Our engine does it in minutes while ensuring you never miss a critical keyword or formatting requirement.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-32 bg-[#e8e4dc]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-10 bg-[#c97b4b]" />
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#c97b4b]">
            Product FAQ
          </span>
          <div className="h-px w-10 bg-[#c97b4b]" />
        </div>

        <h2 className="text-center text-[44px] md:text-[52px] font-bold tracking-tight text-[#1a1916] mb-4">
          Everything you might wonder.
        </h2>
        <p className="text-center text-[17px] text-[#6b6560] mb-16 leading-relaxed">
          Real answers about the AI, the privacy, and the process.
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-t border-[#d4d0c8] border-b-0 last:border-b last:border-[#d4d0c8]"
            >
              <AccordionTrigger className="text-left text-[15px] font-semibold text-[#1a1916] hover:no-underline py-5 hover:text-[#c97b4b] transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[14px] text-[#6b6560] pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-[13px] text-[#6b6560] mb-2">Still curious?</p>
          <Link
            href="mailto:support@verireume.com"
            className="text-[13px] font-semibold text-[#c97b4b] hover:underline underline-offset-4"
          >
            Contact our team →
          </Link>
        </div>
      </div>
    </section>
  )
}
