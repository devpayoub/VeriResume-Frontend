"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

export function DashboardHeader() {
    const pathname = usePathname()

    // Create breadcrumb segments based on path structure
    const segments = pathname.split('/').filter(Boolean)
    // E.g. ['dashboard', 'resumes']

    return (
        <header className="flex h-16 shrink-0 items-center gap-4 border-b px-6 bg-background/80 backdrop-blur-xl sticky top-0 z-30 shadow-sm transition-all duration-200">
            <SidebarTrigger className="hover:bg-primary/10 transition-colors" />
            <Separator orientation="vertical" className="h-6" />

            <Breadcrumb>
                <BreadcrumbList>
                    {segments.map((segment, index) => {
                        const isLast = index === segments.length - 1
                        const title = segment.charAt(0).toUpperCase() + segment.slice(1)
                        const href = `/${segments.slice(0, index + 1).join("/")}`

                        if (segment === "dashboard" && isLast) {
                            return (
                                <BreadcrumbItem key={href}>
                                    <BreadcrumbPage className="font-semibold">{title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            )
                        }

                        return (
                            <React.Fragment key={href}>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage className="font-semibold text-primary">{title}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={href} className="hover:text-foreground transition-colors">
                                            {title}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator />}
                            </React.Fragment>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    )
}
