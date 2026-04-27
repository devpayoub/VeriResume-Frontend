import { PublicNavbar } from "@/components/public-navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { StatsSection } from "@/components/landing/stats-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { PlansSection } from "@/components/landing/plans-section"
import { FaqSection } from "@/components/landing/faq-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#e8e4dc] overflow-x-hidden flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PlansSection />
        <FaqSection />
      </main>
      <Footer tagline="A new way to land your dream job — without hours of manual rewriting." />
    </div>
  )
}
