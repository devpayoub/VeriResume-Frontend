"use client"

import React, { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Loader2, Lightbulb } from "lucide-react"
import { toast } from "sonner"

/**
 * Harvard OCS Resume Viewer + PDF Export
 *
 * Parses the structured plain-text output from the AI (which uses the
 * Harvard OCS format defined in ai_service.py) and renders it as a
 * pixel-perfect A4 resume card with clean typography.
 */

interface HarvardResumeViewerProps {
    content: string
}

// ── Section types ──────────────────────────────────────────────────────────
type SectionType = "header" | "section" | "entry" | "bullet" | "blank"

interface Block {
    type: SectionType
    text: string
    subText?: string
    date?: string
}

// ── Parser ─────────────────────────────────────────────────────────────────
function parseResume(raw: string): Block[] {
    const lines = raw.split(/\r?\n/)
    const blocks: Block[] = []
    let headerDone = false
    let i = 0

    while (i < lines.length) {
        const line = lines[i]
        const trimmed = line.trim()

        // Blank line
        if (!trimmed) {
            blocks.push({ type: "blank", text: "" })
            i++
            continue
        }

        // Divider line (------) – skip silently
        if (/^[-─]{3,}$/.test(trimmed)) {
            i++
            continue
        }

        // Bullet
        if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
            blocks.push({ type: "bullet", text: trimmed.replace(/^[•\-]\s*/, "") })
            i++
            continue
        }

        // Section header: ALL CAPS line (4+ chars) and no lowercase
        const isAllCaps = trimmed === trimmed.toUpperCase() && /[A-Z]{3,}/.test(trimmed)
        if (isAllCaps && trimmed.length >= 4) {
            headerDone = true
            blocks.push({ type: "section", text: trimmed })
            i++
            continue
        }

        // First non-blank lines before any section = header (name + contact)
        if (!headerDone) {
            blocks.push({ type: "header", text: trimmed })
            i++
            continue
        }

        // Entry line: text with right-aligned date (lots of spaces or | separator)
        const dateMatch = trimmed.match(/^(.+?)\s{3,}(\d{4}.*|\w{3}\s+\d{4}.*)$/)
        if (dateMatch) {
            // Next line might be the job title
            const nextTrimmed = lines[i + 1]?.trim() || ""
            const isNextBullet = nextTrimmed.startsWith("•") || nextTrimmed.startsWith("-")
            const isNextBlank = !nextTrimmed
            if (!isNextBullet && !isNextBlank && nextTrimmed && !isAllCaps) {
                blocks.push({ type: "entry", text: dateMatch[1].trim(), date: dateMatch[2].trim(), subText: nextTrimmed })
                i += 2
            } else {
                blocks.push({ type: "entry", text: dateMatch[1].trim(), date: dateMatch[2].trim() })
                i++
            }
            continue
        }

        // Fallback: treat as entry without date
        blocks.push({ type: "entry", text: trimmed })
        i++
    }

    return blocks
}

// ── Renderer ───────────────────────────────────────────────────────────────
function ResumeContent({ blocks }: { blocks: Block[] }) {
    let firstHeader = true

    return (
        <div style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: "11pt", color: "#000", lineHeight: "1.4" }}>
            {blocks.map((block, idx) => {
                switch (block.type) {
                    case "header": {
                        const isName = firstHeader
                        if (firstHeader) firstHeader = false
                        return (
                            <div key={idx} style={{
                                textAlign: "center",
                                fontWeight: isName ? "bold" : "normal",
                                fontSize: isName ? "16pt" : "10pt",
                                marginBottom: isName ? "2pt" : "0",
                                letterSpacing: isName ? "0.03em" : "normal",
                            }}>
                                {block.text}
                            </div>
                        )
                    }

                    case "section":
                        return (
                            <div key={idx} style={{ marginTop: "12pt" }}>
                                <div style={{
                                    fontWeight: "bold",
                                    fontSize: "11pt",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    paddingBottom: "2pt",
                                    borderBottom: "1.5px solid #000",
                                    marginBottom: "5pt",
                                }}>
                                    {block.text}
                                </div>
                            </div>
                        )

                    case "entry":
                        return (
                            <div key={idx} style={{ marginTop: "5pt" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <span style={{ fontWeight: "bold", fontSize: "11pt" }}>{block.text}</span>
                                    {block.date && <span style={{ fontWeight: "bold", fontSize: "10.5pt", whiteSpace: "nowrap", marginLeft: "8pt" }}>{block.date}</span>}
                                </div>
                                {block.subText && (
                                    <div style={{ fontStyle: "italic", fontSize: "10.5pt", marginTop: "1pt" }}>{block.subText}</div>
                                )}
                            </div>
                        )

                    case "bullet":
                        return (
                            <div key={idx} style={{ display: "flex", gap: "5pt", paddingLeft: "14pt", marginTop: "2pt" }}>
                                <span style={{ minWidth: "8pt", flexShrink: 0 }}>•</span>
                                <span style={{ fontSize: "10.5pt" }}>{block.text}</span>
                            </div>
                        )

                    case "blank":
                        return <div key={idx} style={{ height: "3pt" }} />

                    default:
                        return null
                }
            })}
        </div>
    )
}

// ── Pagination Logic ────────────────────────────────────────────────────────
function estimateBlockHeight(block: Block): number {
    switch (block.type) {
        case "header": return 25; // Header text + margins
        case "section": return 42; // Section label + border + margins
        case "entry": {
            let h = 27; // Margin + Title/Date
            if (block.subText) {
                const lines = Math.ceil(block.subText.length / 95);
                h += 1.5 + (lines * 19.6); // 19.6px per line
            }
            return h;
        }
        case "bullet": {
            const lines = Math.ceil(block.text.length / 95);
            return 3 + (lines * 19.6); // margin-top + line height
        }
        case "blank": return 4;
        default: return 0;
    }
}

function paginateBlocks(blocks: Block[]): Block[][] {
    const pages: Block[][] = []
    let currentPage: Block[] = []
    let currentHeight = 0
    // 297mm (1122.5px) minus top/bottom padding (136px) = 986px.
    // 970 leaves a conservative 16px buffer to strictly prevent page stretching.
    const MAX_HEIGHT = 970

    for (const block of blocks) {
        const h = estimateBlockHeight(block)

        if (currentHeight + h > MAX_HEIGHT && currentPage.length > 0) {
            pages.push(currentPage)
            currentPage = [block]
            currentHeight = h
        } else {
            currentPage.push(block)
            currentHeight += h
        }
    }
    if (currentPage.length > 0) pages.push(currentPage)

    // Quick pass to avoid orphaned section headers
    for (let i = 0; i < pages.length - 1; i++) {
        const page = pages[i]
        if (page[page.length - 1].type === "section") {
            const sec = page.pop()!
            pages[i + 1].unshift(sec)
        }
    }

    return pages.length > 0 ? pages : [[]]
}

// ── Main export ────────────────────────────────────────────────────────────
export function HarvardResumeViewer({ content }: HarvardResumeViewerProps) {
    const pageRefs = useRef<(HTMLDivElement | null)[]>([])
    const [downloading, setDownloading] = useState(false)

    const blocks = content ? parseResume(content) : []
    const pages = paginateBlocks(blocks)

    const handleDownloadPdf = async () => {
        if (pageRefs.current.every(ref => !ref) || !content) return
        setDownloading(true)
        try {
            const { toJpeg } = await import("html-to-image")
            const { default: jsPDF } = await import("jspdf")

            const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
            const pdfW = pdf.internal.pageSize.getWidth()
            // 297mm height standard
            const pdfH = pdf.internal.pageSize.getHeight()

            let pageCount = 0
            for (let i = 0; i < pages.length; i++) {
                const el = pageRefs.current[i]
                if (!el) continue

                const dataUrl = await toJpeg(el, {
                    quality: 0.97,
                    backgroundColor: "#ffffff",
                    pixelRatio: 3
                })

                if (pageCount > 0) pdf.addPage()

                // Calculate proportional height to prevent squishing
                const canvasHeight = el.offsetHeight * 3
                const canvasWidth = el.offsetWidth * 3
                const printH = (canvasHeight * pdfW) / canvasWidth

                // Print the image, starting from top left
                pdf.addImage(dataUrl, "JPEG", 0, 0, pdfW, printH)
                pageCount++
            }

            pdf.save("Harvard_Resume.pdf")
        } catch (err) {
            console.error("PDF export failed", err)
            toast.error("Export failed. Please try again.")
        } finally {
            setDownloading(false)
        }
    }

    return (
        <div className="flex flex-col rounded-3xl border border-border/50 shadow-sm overflow-hidden bg-card">
            {/* ── Toolbar ── */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-muted/20 border-b">
                <div className="flex items-center gap-3">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Harvard OCS Resume</span>
                </div>
                <Button
                    onClick={handleDownloadPdf}
                    disabled={downloading || !content}
                    size="sm"
                    className="rounded-xl shadow-md shadow-primary/15"
                >
                    {downloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                    Export PDF
                </Button>
            </div>

            {/* ── Paper canvas ── */}
            <div className="bg-neutral-200 dark:bg-neutral-800 w-full overflow-y-auto flex flex-col items-center gap-8 py-10" style={{ maxHeight: "860px" }}>
                {pages.map((pageBlocks, pageIdx) => (
                    <div
                        key={pageIdx}
                        ref={(el) => {
                            pageRefs.current[pageIdx] = el
                        }}
                        className="bg-white shadow-xl flex-shrink-0"
                        style={{
                            width: "210mm",
                            minHeight: "297mm",
                            height: "max-content",
                            padding: "18mm 20mm",
                            boxSizing: "border-box",
                        }}
                    >
                        {content
                            ? <ResumeContent blocks={pageBlocks} />
                            : <div style={{ textAlign: "center", color: "#aaa", paddingTop: "80px", fontSize: "13pt", fontFamily: "'Times New Roman', serif" }}>
                                No resume content to display yet.
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}
