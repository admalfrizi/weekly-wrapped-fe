import { getProfile } from "@/features/dashboard/hooks/prefetchProfile"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const data = await getProfile(token)
        return NextResponse.json(data)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
    }
}