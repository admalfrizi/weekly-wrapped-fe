import { fetchWithAuth } from "@/lib/fetch";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if(!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const result = await fetchWithAuth<Activity>(`/activity?page=${page}&limit=${limit}`, {
            cache: 'no-store',
            headers: {
            "Authorization": `Bearer ${token}`
            }
        });

        return NextResponse.json(result);
    } catch(error) {
        return NextResponse.json({
            error: error
        }, {
            status: 500
        });
    }
}