import { Loader2 } from "lucide-react"

export default function PublicLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-10 w-10 animate-spin text-primary/50" />
        </div>
    )
}
