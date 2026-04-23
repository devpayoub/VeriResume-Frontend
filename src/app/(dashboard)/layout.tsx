import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { createServerClient } from "@supabase/ssr"
import { DashboardHeader } from "@/components/dashboard-header"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll() {
                    // Do nothing in layout contexts
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Guard against unauthenticated users here too (although middleware also does this)
    if (!user) {
        redirect("/login")
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex w-full flex-col h-screen overflow-hidden bg-muted/20">
                <DashboardHeader />
                <div className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}
