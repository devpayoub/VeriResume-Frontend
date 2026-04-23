"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, LogOut, UserMinus, ShieldAlert, User } from "lucide-react"

export default function SettingsPage() {
    const router = useRouter()
    const supabase = createClient()
    const [fullName, setFullName] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [message, setMessage] = React.useState({ text: "", type: "" })

    React.useEffect(() => {
        const fetchProfile = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (!user) return

            const { data } = await supabase
                .from("profiles")
                .select("full_name")
                .eq("id", user.id)
                .single()

            if (data) {
                setFullName(data.full_name || "")
            }
            setLoading(false)
        }

        fetchProfile()
    }, [supabase])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage({ text: "", type: "" })

        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase
            .from("profiles")
            .update({
                full_name: fullName,
            })
            .eq("id", user.id)

        if (error) {
            setMessage({ text: "Failed to save profile.", type: "error" })
        } else {
            setMessage({ text: "Profile settings saved successfully.", type: "success" })
        }
        setSaving(false)

        // Clear success message after 3 seconds
        setTimeout(() => setMessage({ text: "", type: "" }), 3000)
    }

    const handleDeleteAccount = async () => {
        if (
            !confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
            )
        ) {
            return
        }

        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        await supabase.from("profiles").delete().eq("id", user.id)
        await supabase.auth.signOut()
        router.push("/")
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/login")
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-primary/50" />
            </div>
        )
    }

    return (
        <div className="flex flex-col space-y-10 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your identity, security, and account preferences.
                </p>
            </div>

            <Card className="rounded-3xl shadow-sm border-border/50 overflow-hidden">
                <form onSubmit={handleSave}>
                    <CardHeader className="bg-muted/10 pb-6 border-b border-border/50">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <User className="h-5 w-5 text-primary" /> Profile Identity
                        </CardTitle>
                        <CardDescription>
                            Update your personal information to be displayed on reports and UI.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-3 max-w-md">
                            <Label htmlFor="fullName" className="font-semibold text-foreground/80">Full Name</Label>
                            <Input
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="e.g. Jane Doe"
                                className="h-12 px-4 rounded-xl shadow-inner bg-background/50 focus-visible:bg-background"
                            />
                        </div>
                        {message.text && (
                            <div
                                className={`text-sm font-medium p-3 px-4 rounded-lg inline-block w-full max-w-md border ${message.type === "success"
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                    : "bg-destructive/10 text-destructive border-destructive/20"
                                    }`}
                            >
                                {message.text}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="bg-muted/10 px-8 py-4 border-t border-border/50">
                        <Button type="submit" disabled={saving} className="rounded-xl h-10 px-6 font-semibold shadow-sm ml-auto">
                            {saving ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            {saving ? "Saving Changes..." : "Save Changes"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <Card className="border border-destructive/30 shadow-none bg-red-500/5 dark:bg-red-500/[0.02] rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 blur-sm pointer-events-none">
                    <ShieldAlert className="w-48 h-48 text-destructive" />
                </div>

                <CardHeader className="border-b border-destructive/10 pb-6 bg-destructive/5 relative z-10">
                    <CardTitle className="text-destructive flex items-center gap-2 text-xl">
                        <ShieldAlert className="h-5 w-5" /> Danger Zone
                    </CardTitle>
                    <CardDescription className="text-destructive/80">
                        Irreversible and destructive actions for your account data and identity.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6 relative z-10">
                    {/* Log Out */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-4 rounded-2xl bg-background/50 border border-border/50 hover:border-border transition-colors">
                        <div>
                            <p className="font-semibold text-foreground">Sign Out</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                End your secure session on this device and securely clear cookies.
                            </p>
                        </div>
                        <Button variant="outline" onClick={handleLogout} className="rounded-xl font-medium min-w-32 bg-background hover:bg-muted">
                            <LogOut className="mr-2 h-4 w-4 text-muted-foreground" />
                            Sign Out
                        </Button>
                    </div>

                    {/* Delete Account */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-4 rounded-2xl bg-destructive/5 border border-destructive/20 hover:border-destructive/30 transition-colors">
                        <div>
                            <p className="font-semibold text-destructive">Delete Account</p>
                            <p className="text-sm text-destructive/80 mt-1 max-w-sm">
                                Permanently delete all personal data, resumes, optimizations, and transaction history. This action cannot be reversed.
                            </p>
                        </div>
                        <Button variant="destructive" onClick={handleDeleteAccount} className="rounded-xl font-medium min-w-36 shadow-sm shadow-destructive/20">
                            <UserMinus className="mr-2 h-4 w-4" />
                            Delete Account
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
