"use client"

import { useState } from "react"
import Link from "next/link"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, MailCheck } from "lucide-react"
import { Logo } from "@/components/logo"

export default function SignupPage() {
    const router = useRouter()
    const supabase = createClient()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
            return
        }

        // Check if confirmation is required (Supabase returns a session if auto-confirm is on)
        if (data?.session) {
            router.push("/dashboard")
            router.refresh()
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    const handleGoogleSignup = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback?next=/dashboard`,
            },
        })
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
                <Card className="w-full max-w-md text-center p-6 bg-background/60 backdrop-blur-xl border-primary/20 shadow-2xl">
                    <CardHeader>
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MailCheck className="w-8 h-8 text-primary animate-pulse" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Please Verify Your Email</CardTitle>
                        <CardDescription className="text-base text-balance mt-2">
                            A confirmation link has been sent to <span className="font-semibold text-foreground">{email}</span>. Please click the link to activate your account.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col gap-4">
                        <Link href="/login" className="w-full">
                            <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5 transition-colors">
                                Back to login
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
            <div className="w-full max-w-md flex flex-col items-center">
                <div className="mb-8">
                    <Logo />
                </div>

                <Card className="w-full">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Sign up today and get 5 free credits
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignup} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Account
                            </Button>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            type="button"
                            className="w-full"
                            onClick={handleGoogleSignup}
                        >
                            Google
                        </Button>
                    </CardContent>
                    <CardFooter className="flex justify-center bg-muted/10 py-4 border-t">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-medium text-primary hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
