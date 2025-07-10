import { NextRequest, NextResponse } from "next/server";
import { RecipeSchema } from "@/shemas/recipe";
import { date, string } from "zod/v4-mini";

export const POST = async(req: NextRequest) => {

    try {
        const request = await req.json();

        if (typeof request.dateCreated === 'string') {
            request.dateCreated = new Date(request.dateCreated);
        }

        const validatedRequest = RecipeSchema.parse(request);

        if (validatedRequest) {
            if (validatedRequest.title === "cake") {
                console.log('Thank you for the cake');
                return NextResponse.json({
                    message: "You sent cake to the server",
                    status: 201
                });
            } else {
                return NextResponse.json({
                    message: "You didn't send cake to the server",
                    status: 400
                });
            }
        } else {
            return NextResponse.json({
                error: "Ivalid Data. You need to send something",
                status: 422
            });
        }
    } catch(err) {
        return NextResponse.json({
            error: `Oops, something went wrong on our side, ${err}`,
            status: 500
        });
    }

}; 

export const GET = async() => {
    
}