"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Coins, Receipt, Send, Zap } from "lucide-react"

interface Transaction {
    id: string
    amount: number
    reason: string
    admin_note: string
    created_at: string
}

export default function CreditsPage() {
    const supabase = createClient()
    const [balance, setBalance] = React.useState(0)
    const [transactions, setTransactions] = React.useState<Transaction[]>([])
    const [loading, setLoading] = React.useState(true)
    const [requesting, setRequesting] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [sent, setSent] = React.useState(false)

    // Simulate a total quota for UI purposes since it's an internal tool beta
    const totalQuota = 100
    const usedPercentage = Math.min(100, Math.max(0, ((totalQuota - balance) / totalQuota) * 100))

    React.useEffect(() => {
        const fetchData = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (!user) return

            const [profileRes, transactionsRes] = await Promise.all([
                supabase
                    .from("profiles")
                    .select("credits_remaining")
                    .eq("id", user.id)
                    .single(),
                supabase
                    .from("credit_transactions")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false })
                    .limit(20),
            ])

            setBalance(profileRes.data?.credits_remaining ?? 0)
            setTransactions(transactionsRes.data || [])
            setLoading(false)
        }

        fetchData()
    }, [supabase])

    const handleRequest = async () => {
        setRequesting(true)
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase.from("credit_requests").insert({
            user_id: user.id,
            message: message,
        })

        if (!error) {
            setSent(true)
        }
        setRequesting(false)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-primary/50" />
            </div>
        )
    }

    return (
        <div className="flex flex-col space-y-10 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Credits & Billing</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your request balance and view optimization history.
                </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                <Card className="md:col-span-5 flex flex-col bg-card/60 backdrop-blur border-primary/10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full blur-2xl pointer-events-none" />

                    <CardHeader className="relative z-10 pb-2">
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-primary" fill="currentColor" />
                            Current Balance
                        </CardTitle>
                        <CardDescription>Available credits for AI optimizations</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col justify-center relative z-10">
                        <div className="py-6">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-6xl font-extrabold tracking-tighter text-foreground drop-shadow-sm">
                                    {balance}
                                </span>
                                <span className="text-muted-foreground font-semibold">/ {totalQuota}</span>
                            </div>

                            <div className="space-y-3 mt-6">
                                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    <span>Quota Used</span>
                                    <span>{usedPercentage.toFixed(0)}%</span>
                                </div>
                                <div className="h-3 w-full bg-muted/50 rounded-full overflow-hidden border border-border/20 shadow-inner">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${usedPercentage}%` }}
                                    />
                                </div>
                                <p className="text-sm text-muted-foreground mt-2 font-medium">
                                    Most optimizations cost 1 credit.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-7 flex flex-col shadow-sm border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Request Quota Increase</CardTitle>
                        <CardDescription>
                            Submit a request to the administrator to refill your account balance for more optimizations.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-center">
                        {sent ? (
                            <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-8 rounded-2xl text-center flex flex-col items-center gap-3 border border-emerald-500/20">
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                    <Send className="h-6 w-6 text-emerald-600 dark:text-emerald-400 ml-1" />
                                </div>
                                <p className="font-bold text-lg">Request Sent Successfully</p>
                                <p className="text-sm opacity-80 max-w-sm">
                                    The admin will review your message shortly and allocate additional credits to your account.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Add an optional message (e.g., Working on a new batch of 5 resumes...)"
                                    className="resize-none h-32 rounded-xl bg-background/50 focus-visible:bg-background transition-colors"
                                />
                            </div>
                        )}
                    </CardContent>
                    {!sent && (
                        <CardFooter className="pt-2">
                            <Button
                                onClick={handleRequest}
                                disabled={requesting}
                                className="w-full h-12 rounded-xl font-semibold shadow-md hover:shadow-primary/20"
                            >
                                {requesting ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : null}
                                {requesting ? "Sending Request..." : "Request More Credits"}
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4 mt-6">
                    <div className="flex items-center gap-2">
                        <Receipt className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold">Transaction Ledger</h2>
                    </div>
                </div>

                <Card className="rounded-2xl overflow-hidden shadow-sm border-border/50">
                    <CardContent className="p-0">
                        {transactions.length === 0 ? (
                            <div className="p-16 text-center text-muted-foreground flex flex-col items-center">
                                <Receipt className="w-12 h-12 text-muted-foreground/30 mb-4" />
                                <p>No transaction history found.</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader className="bg-muted/30">
                                    <TableRow>
                                        <TableHead className="font-semibold px-6">Amount</TableHead>
                                        <TableHead className="font-semibold">Reason</TableHead>
                                        <TableHead className="font-semibold">Note</TableHead>
                                        <TableHead className="text-right font-semibold px-6">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((tx) => (
                                        <TableRow key={tx.id} className="hover:bg-muted/30 transition-colors">
                                            <TableCell className="px-6 py-4">
                                                <div className={`inline-flex items-center justify-center font-bold px-3 py-1 rounded-full text-xs
                                                    ${tx.amount < 0
                                                        ? "bg-destructive/10 text-destructive"
                                                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                    }`}
                                                >
                                                    {tx.amount > 0 ? "+" : ""}
                                                    {tx.amount}
                                                </div>
                                            </TableCell>
                                            <TableCell className="capitalize font-medium text-sm">
                                                {tx.reason.replace(/_/g, " ")}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                                                {tx.admin_note || <span className="opacity-50 italic">None</span>}
                                            </TableCell>
                                            <TableCell className="text-right text-sm text-muted-foreground px-6 py-4">
                                                {new Date(tx.created_at).toLocaleString(undefined, {
                                                    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
