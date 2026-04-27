import Link from "next/link"
import { Sparkles } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md"
  asLink?: boolean
}

export function Logo({ size = "md", asLink = true }: LogoProps) {
  const textSize = size === "sm" ? "text-xl" : "text-2xl"

  const content = (
    <span className="flex items-center gap-2">
      <span className={`${textSize} font-medium tracking-tight text-foreground`}>
        Veri<span className="text-primary">Resume</span>
      </span>
    </span>
  )

  if (!asLink) return content

  return (
    <Link href="/" className="flex items-center gap-2">
      {content}
    </Link>
  )
}
