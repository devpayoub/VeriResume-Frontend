"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    FileText,
    Wand2,
    History,
    CreditCard,
    Settings,
    LogOut,
} from "lucide-react"
import { Logo } from "@/components/logo"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const navItems = [
    { href: "/dashboard", title: "Home", icon: LayoutDashboard },
    { href: "/dashboard/resumes", title: "My Resumes", icon: FileText },
    { href: "/dashboard/optimize/new", title: "New Optimization", icon: Wand2 },
    { href: "/dashboard/history", title: "History", icon: History },
    { href: "/dashboard/credits", title: "Credits", icon: CreditCard },
    { href: "/dashboard/settings", title: "Settings", icon: Settings },
]

export function AppSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const [email, setEmail] = React.useState<string | null>(null)

    React.useEffect(() => {
        supabase.auth.getUser().then(({ data }: { data: { user: { email?: string } | null } }) => {
            if (data?.user?.email) setEmail(data.user.email)
        })
    }, [supabase])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/login")
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b border-sidebar-border h-16 flex items-center px-4">
                <div className="mt-2">
                    <Logo size="sm" />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="mt-4 px-2 space-y-1">
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/dashboard" && pathname.startsWith(item.href))
                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                                    <Link href={item.href}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t border-sidebar-border p-4">
                <div className="flex flex-col gap-4">
                    {email && (
                        <span className="text-xs text-muted-foreground truncate font-medium px-2">
                            {email}
                        </span>
                    )}
                    <SidebarMenuButton
                        onClick={handleLogout}
                        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                        <LogOut />
                        <span>Sign Out</span>
                    </SidebarMenuButton>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
