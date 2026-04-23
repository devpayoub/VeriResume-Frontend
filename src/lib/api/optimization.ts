import { fetchApi } from "./client"

export async function retryOptimization(sessionId: string) {
    const response = await fetchApi(`/api/v1/optimize/${sessionId}/retry/`, {
        method: "POST",
    })

    let data
    const text = await response.text()
    try {
        data = JSON.parse(text)
    } catch {
        throw new Error(`Server returned ${response.status}: ${text.substring(0, 200)}`)
    }

    if (!response.ok) {
        throw new Error(data.error || "Reload failed")
    }

    return data
}
