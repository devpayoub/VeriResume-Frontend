"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Wand2, FileText, Target, FileSearch } from "lucide-react"

interface Resume {
    id: string
    filename: string
    word_count: number
}

export default function NewOptimizationPage() {
    const router = useRouter()
    const supabase = createClient()
    const [resumes, setResumes] = React.useState<Resume[]>([])
    const [selectedResume, setSelectedResume] = React.useState<string>("")
    const [jobDescription, setJobDescription] = React.useState("")
    const [targetJobTitle, setTargetJobTitle] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const [submitting, setSubmitting] = React.useState(false)
    const [error, setError] = React.useState("")

    React.useEffect(() => {
        const fetchResumes = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (!user) return

            const { data } = await supabase
                .from("resumes")
                .select("id, filename, word_count")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })

            setResumes(data || [])
            if (data?.length) {
                setSelectedResume(data[0].id)
            }
            setLoading(false)
        }

        fetchResumes()
    }, [supabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedResume || !jobDescription) {
            setError("Please select a resume and enter a target job description.")
            return
        }

        setSubmitting(true)
        setError("")

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (!user) throw new Error("Not authenticated")

            // The backend endpoint handles all credit checking, session creation, 
            // credit deduction, and triggering the synchronous AI generation.
            const response = await fetch("/api/v1/optimize/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
                },
                body: JSON.stringify({
                    resume_id: selectedResume,
                    job_description_text: jobDescription,
                    target_job_title: targetJobTitle,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => null)
                throw new Error(errorData?.error || "Failed to start optimization")
            }

            const session = await response.json()
            // Redirect directly to the audit page of the newly completed session
            router.push(`/dashboard/audit/${session.id}`)
        } catch (err: any) {
            setError(err.message || "Failed to start optimization")
            setSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-card/60 backdrop-blur-xl border border-primary/10 p-8 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 text-center md:text-left w-full md:w-auto">
                    <h1 className="text-3xl font-extrabold tracking-tight">New Optimization</h1>
                    <p className="text-muted-foreground mt-2 max-w-lg">
                        Tailor your resume for a specific job application. We map your experiences directly against ATS requirements without hallucinations.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 bg-card/30 rounded-3xl border border-dashed">
                    <Loader2 className="w-10 h-10 animate-spin text-primary/50 mb-4" />
                    <p className="text-muted-foreground font-medium">Loading your resumes...</p>
                </div>
            ) : resumes.length === 0 ? (
                <Card className="border-dashed bg-card/30 backdrop-blur border-2 rounded-3xl shadow-sm shadow-black/5">
                    <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <FileText className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No Resumes Found</h2>
                        <p className="text-muted-foreground mb-8 max-w-md">
                            You need a base resume to start an optimization session. Upload one in PDF or Word format from your library to begin.
                        </p>
                        <Button className="rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 h-12 px-8" asChild>
                            <Link href="/dashboard/resumes">Go to My Resumes Library</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <form onSubmit={handleSubmit} className="relative z-10 bg-card shadow-sm border rounded-3xl overflow-hidden flex flex-col">
                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm font-medium p-4 mx-8 mt-8 rounded-xl border border-destructive/20">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row flex-1 divide-y lg:divide-y-0 lg:divide-x p-1 md:p-4">
                        {/* Left Column: Context Configuration */}
                        <div className="lg:w-5/12 flex flex-col space-y-8 p-6 md:p-8">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <FileSearch className="w-5 h-5 text-primary" /> Step 1: Base Context
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">Select the raw resume to draw experiences from.</p>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="resume" className="text-sm font-semibold text-foreground/80">Select Base Resume</Label>
                                <Select
                                    value={selectedResume}
                                    onValueChange={setSelectedResume}
                                >
                                    <SelectTrigger id="resume" className="h-12 rounded-xl bg-muted/20 border-border/50">
                                        <SelectValue placeholder="Choose a resume" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {resumes.map((resume) => (
                                            <SelectItem key={resume.id} value={resume.id}>
                                                {resume.filename} <span className="text-muted-foreground ml-2">({resume.word_count} words)</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="title" className="text-sm font-semibold text-foreground/80">Target Job Title <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                <div className="relative">
                                    <Target className="absolute left-3.5 top-3.5 w-5 h-5 text-muted-foreground/50" />
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="e.g. Senior Software Engineer"
                                        className="h-12 pl-10 rounded-xl bg-muted/20 border-border/50"
                                        value={targetJobTitle}
                                        onChange={(e) => setTargetJobTitle(e.target.value)}
                                    />
                                </div>
                                <p className="text-[0.8rem] text-muted-foreground bg-muted/30 p-3 rounded-lg">
                                    Providing the exact job title allows the AI engine to specifically map your keywords and emphasize relevant seniority.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Job Description Area */}
                        <div className="lg:w-7/12 flex flex-col space-y-4 p-6 md:p-8 bg-muted/5">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Target className="w-5 h-5 text-primary" /> Step 2: Target Description
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">Paste the exact job description from the application page.</p>
                            </div>

                            <div className="flex-1 flex flex-col pt-2">
                                <Textarea
                                    id="description"
                                    placeholder="Paste the full job description here... (Responsibilities, Requirements, Tech Stack)"
                                    className="flex-1 min-h-[350px] resize-none rounded-xl bg-background/50 border-border/50 p-6 leading-relaxed shadow-inner"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/5 p-6 md:px-10 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            This action will deduct 1 credit from your balance.
                        </p>
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full sm:w-auto h-12 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 font-semibold"
                        >
                            {submitting ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Wand2 className="mr-2 h-5 w-5" />
                            )}
                            {submitting ? "Optimizing..." : "Start Optimization"}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    )
}
