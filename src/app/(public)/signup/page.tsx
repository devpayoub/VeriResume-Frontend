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
import { Loader2, Sparkles } from "lucide-react"

export default function SignupPage() {
    const router = useRouter()
    const supabase = createClient()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
            return
        }

        router.push("/dashboard")
        router.refresh()
    }

    const handleGoogleSignup = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/dashboard`,
            },
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
            <div className="w-full max-w-md flex flex-col items-center">
                <Link href="/" className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-primary text-primary-foreground">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight">
                        Veri<span className="text-primary">Resume</span>
                    </span>
                </Link>

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
