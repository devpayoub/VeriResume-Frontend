import { fetchApi } from "./client"

export async function uploadResume(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetchApi("/api/v1/resumes/", {
        method: "POST",
        body: formData,
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || "Failed to upload resume")
    }

    return response.json()
}
