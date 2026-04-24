import Link from "next/link"
import { Sparkles } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md"
  asLink?: boolean
}

export function Logo({ size = "md", asLink = true }: LogoProps) {
  const iconSize = size === "sm" ? "w-6 h-6" : "w-8 h-8"
  const iconInner = size === "sm" ? "w-3 h-3" : "w-4 h-4"
  const textSize = size === "sm" ? "text-xl" : "text-2xl"

  const content = (
    <span className="flex items-center gap-2">
      <span
        className={`${iconSize} rounded-xl flex items-center justify-center bg-primary text-primary-foreground`}
      >
        <Sparkles className={iconInner} />
      </span>
      <span className={`${textSize} font-extrabold tracking-tight`}>
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
