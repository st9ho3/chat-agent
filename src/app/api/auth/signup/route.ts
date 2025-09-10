import { AuthService } from "@/app/services/authservice";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    const service = new AuthService()

    const params = await req.json()
    const res = await service.create(params.email, params.password)
    
    return NextResponse.json(res)
}