import { USER_PATH } from "@/constant/services"
import { fetchWithAuth } from "@/lib/fetch"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const result = await fetchWithAuth<Activity>(USER_PATH.PROFILE, {
            cache: 'no-store',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
        return NextResponse.json(result)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
    }
}