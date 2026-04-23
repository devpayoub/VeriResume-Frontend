import { createClient } from '@/lib/supabase/client'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

/**
 * A tiny wrapper around native fetch that automatically securely injects
 * the Supabase user's JWT so your Django backend can authorize the request.
 */
export async function fetchApi(endpoint: string, options: RequestInit = {}) {
    const supabase = createClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const headers = new Headers(options.headers)

    // Attach the JWT to the Authorization header if available
    if (session?.access_token) {
        headers.set('Authorization', `Bearer ${session.access_token}`)
    }

    // Set default JSON content-type if not already specified, and NOT a formData upload
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json')
    }

    const url = `${BASE_URL}${endpoint}`
    const response = await fetch(url, { ...options, headers })

    return response
}
