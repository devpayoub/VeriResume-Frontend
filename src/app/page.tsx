import { PublicNavbar } from "@/components/public-navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { CtaSection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
            <PublicNavbar />
            <main className="flex-1">
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <CtaSection />
            </main>
            <Footer tagline="All rewrites traced to your real experience." />
        </div>
    )
}
