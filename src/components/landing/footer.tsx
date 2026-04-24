import Link from "next/link"
import { Sparkles } from "lucide-react"

interface FooterProps {
  tagline?: string
}

export function Footer({
  tagline = "All rewrites traced to your real experience.",
}: FooterProps) {
  return (
    <footer className="border-t bg-muted/10 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-primary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <strong className="text-foreground">VeriResume</strong>
            {tagline && ` — ${tagline}`}
          </p>
        </div>
        <div className="flex gap-6 text-sm font-semibold text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
