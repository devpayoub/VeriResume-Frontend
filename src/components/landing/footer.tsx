import Link from "next/link"
import { AlertCircle } from "lucide-react"

const footerLinks = {
  PRODUCT: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  COMPANY: [
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],
  LEGAL: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "DMCA", href: "/dmca" },
  ],
  SUPPORT: [
    { label: "Contact Us", href: "/contact" },
    { label: "support@verireume.com", href: "mailto:support@veriresume.com" },
  ],
}

export function Footer({ tagline }: { tagline?: string }) {
  return (
    <footer className="bg-white border-t border-[#d4d0c8]">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#1a1916]">
                <path d="M12 2C8 2 5 5.5 5 9c0 2.5 1.2 4.7 3 6.1V18h8v-2.9c1.8-1.4 3-3.6 3-6.1C19 5.5 16 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M9 18v2a3 3 0 006 0v-2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <span className="text-[15px] font-semibold text-[#1a1916]">VeriResume</span>
            </div>
            <p className="text-[13px] text-[#6b6560] leading-relaxed mb-5 max-w-[200px]">
              {tagline || "A new way to land your dream job — without spending hours rewriting your resume."}
            </p>
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#6b6560]">
              · © {new Date().getFullYear()} VeriResume · All rights reserved
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#1a1916] mb-5">
                {section}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#6b6560] hover:text-[#c97b4b] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#d4d0c8] mb-8" />

        {/* Important Notice box — exact CeruLabs style */}
        <div className="border border-[#d4d0c8] rounded-2xl p-6 bg-[#ebe7de] mb-8" style={{ borderLeft: "3px solid #c97b4b" }}>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-[#c97b4b] shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#c97b4b] mb-2">
                Important Notice
              </p>
              <p className="text-[12px] text-[#6b6560] leading-relaxed">
                VeriResume is an AI-powered career tool.{" "}
                <strong className="text-[#1a1916] font-semibold">AI-generated content should always be reviewed</strong>{" "}
                for accuracy before submission. Results may vary based on job posting specificity and applicant tracking
                system configurations. We are not responsible for employment outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom legal */}
        <p className="text-center text-[10px] font-bold tracking-[0.14em] uppercase text-[#6b6560]">
          AI output is for informational purposes · Individual results may vary
        </p>
      </div>
    </footer>
  )
}
