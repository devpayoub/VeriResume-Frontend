import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export async function PublicNavbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <header className="w-full max-w-5xl bg-[#e8e4dc]/40 backdrop-blur-2xl border border-white/20 rounded-full py-2.5 px-5 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.05)] pointer-events-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#1a1916]">
            <path d="M12 2C8 2 5 5.5 5 9c0 2.5 1.2 4.7 3 6.1V18h8v-2.9c1.8-1.4 3-3.6 3-6.1C19 5.5 16 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M9 18v2a3 3 0 006 0v-2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <span className="text-[15px] font-semibold tracking-tight text-[#1a1916]">
            VeriResume
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-9 text-[13px] font-medium text-[#6b6560]">
          <Link href="#how-it-works" className="hover:text-[#1a1916] transition-colors">How It Works</Link>
          <Link href="#features" className="hover:text-[#1a1916] transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-[#1a1916] transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-[#1a1916] transition-colors">FAQ</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <button className="text-[#6b6560] hover:text-[#1a1916] transition-colors hidden sm:block">
            <Moon className="w-4 h-4" />
          </button>
          {user ? (
            <Button asChild className="rounded-full px-5 h-9 bg-[#3a6b60] hover:bg-[#2e554c] text-white font-semibold text-[13px] shadow-none border-0">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild className="rounded-full px-5 h-9 bg-[#c97b4b] hover:bg-[#b56a3a] text-white font-semibold text-[13px] shadow-none border-0">
              <Link href="/signup">Get Started</Link>
            </Button>
          )}
        </div>
      </header>
    </div>
  )
}
