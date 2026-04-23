"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { uploadResume } from "@/lib/api/resumes"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Trash2, FileText, Upload, Clock, Search, MoreVertical, Activity } from "lucide-react"
import { HarvardResumeViewer } from "@/components/harvard-resume-viewer"

interface Resume {
    id: string
    filename: string
    word_count: number
    created_at: string
    parsed_text: string
}

export default function ResumesPage() {
    const supabase = createClient()
    const [resumes, setResumes] = React.useState<Resume[]>([])
    const [loading, setLoading] = React.useState(true)
    const [uploading, setUploading] = React.useState(false)
    const [selectedResumeId, setSelectedResumeId] = React.useState<string | null>(
        null
    )
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const fetchResumes = React.useCallback(async () => {
        setLoading(true)
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        const { data } = await supabase
            .from("resumes")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })

        setResumes(data || [])
        if (data && data.length > 0 && !selectedResumeId) {
            setSelectedResumeId(data[0].id)
        }
        setLoading(false)
    }, [supabase, selectedResumeId])

    React.useEffect(() => {
        fetchResumes()
    }, [fetchResumes])

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setUploading(true)
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (!user) throw new Error("Not authenticated")

            const { data: profileData } = await supabase
                .from("profiles")
                .select("credits_remaining")
                .eq("id", user.id)
                .single()

            if (!profileData || profileData.credits_remaining < 1) {
                alert("Insufficient credits to upload a new resume.")
                return
            }

            await uploadResume(file)
            await fetchResumes()
        } catch (error: any) {
            alert(error.message || "Upload failed")
        } finally {
            setUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ""
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this resume?")) return

        const { error } = await supabase.from("resumes").delete().eq("id", id)
        if (error) {
            alert("Failed to delete resume")
            return
        }

        if (selectedResumeId === id) {
            setSelectedResumeId(null)
        }
        await fetchResumes()
    }

    const selectedResume = resumes.find((r) => r.id === selectedResumeId)

    return (
        <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Upload Zone */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-card/60 backdrop-blur-xl border border-primary/10 p-8 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 text-center md:text-left w-full md:w-auto">
                    <h1 className="text-3xl font-extrabold tracking-tight">My Resumes</h1>
                    <p className="text-muted-foreground mt-2 max-w-sm">
                        Manage your base resumes. Upload your latest CVs in PDF or Word format to be optimized against job descriptions.
                    </p>
                </div>

                <div className="relative z-10 w-full md:w-auto">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleUpload}
                        className="hidden"
                    />
                    <div
                        onClick={() => !uploading && fileInputRef.current?.click()}
                        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all cursor-pointer bg-background/50 hover:bg-primary/5 hover:border-primary/50 group ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                            {uploading ? (
                                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                            ) : (
                                <Upload className="w-6 h-6 text-primary" />
                            )}
                        </div>
                        <p className="font-semibold text-sm">Drop resume here or click</p>
                        <p className="text-xs text-muted-foreground mt-1 text-center">PDF, DOCX up to 5MB</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* List Pane */}
                <div className="lg:col-span-4 flex flex-col h-[600px] bg-card/50 backdrop-blur-sm border rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b bg-muted/20">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Library <span className="text-muted-foreground font-normal text-sm ml-auto">{resumes.length} total</span>
                        </h2>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
                            </div>
                        ) : resumes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-6 mt-10">
                                <Search className="w-10 h-10 mb-4 text-muted-foreground/30" />
                                <p className="font-medium text-muted-foreground">Upload your first resume</p>
                                <p className="text-xs text-muted-foreground/70 mt-1">Files appear here automatically</p>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-3">
                                {resumes.map((resume) => {
                                    const isSelected = selectedResumeId === resume.id
                                    return (
                                        <div
                                            key={resume.id}
                                            onClick={() => setSelectedResumeId(resume.id)}
                                            className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${isSelected
                                                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]"
                                                : "bg-background hover:bg-muted/80 border-transparent hover:border-border"
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="overflow-hidden pr-2">
                                                    <h3 className={`font-semibold text-sm truncate ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>
                                                        {resume.filename}
                                                    </h3>
                                                    <div className={`flex items-center gap-3 mt-2 text-xs ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {new Date(resume.created_at).toLocaleDateString()}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Activity className="w-3 h-3" />
                                                            {resume.word_count} words
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </ScrollArea>
                </div>

                {/* Preview Pane */}
                <div className="lg:col-span-8 h-[600px] flex flex-col">
                    {selectedResume ? (
                        <div className="flex-1 flex flex-col h-full overflow-hidden space-y-4">
                            <div className="flex items-center justify-between px-2 pt-1">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {selectedResume.filename}
                                    </h3>
                                </div>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(selectedResume.id)}
                                    className="rounded-lg shadow-none"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Resume
                                </Button>
                            </div>
                            <div className="flex-1 overflow-hidden min-h-0 [&>div]:h-full border border-border/50 rounded-3xl">
                                <HarvardResumeViewer content={selectedResume.parsed_text} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-card/30 backdrop-blur-sm border border-dashed rounded-3xl">
                            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                                <Search className="w-10 h-10 text-muted-foreground/30" />
                            </div>
                            <h3 className="text-xl font-bold">No Resume Selected</h3>
                            <p className="text-muted-foreground mt-2 max-w-sm text-center">
                                Click on a resume from your library on the left to view its parsed contents.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
