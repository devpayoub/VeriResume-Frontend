import { Loader2 } from "lucide-react"

export default function DashboardLoading() {
    return (
        <div className="flex items-center justify-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-primary/50" />
        </div>
    )
}
