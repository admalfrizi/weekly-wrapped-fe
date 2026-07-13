import { CONFIG } from "@/config";
import { AUTH_PATH } from "@/constant/services";
import { RegisterData } from "@/lib/validation";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = RegisterData.safeParse(body);
    
        if (!validatedData.success) {
            return NextResponse.json({ error: 'Invalid payload format' }, { status: 400 })
        }
    
        const res = await fetch(CONFIG.serverApiUrl + AUTH_PATH.REGISTER_URL, {
            method: 'POST',
            body: JSON.stringify(validatedData.data),
            headers: { 'Content-Type': 'application/json' },
        })

        return NextResponse.json({ 
            success: res.ok ? true : false
        })

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' }, 
            { status: 500 }
        )
    }
}