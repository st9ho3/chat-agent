import { zodValidateIngredientBeforeAddItToDatabase } from "@/app/services/services";
import { createIngredientsToDatabase } from "@/db/create";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const request = await req.json()
    const validatedIngredient = await zodValidateIngredientBeforeAddItToDatabase(request)
    console.log("validated ingredient in the POST",validatedIngredient)

    try{
        const response = await createIngredientsToDatabase(request)
        if (!response) {
            return NextResponse.json({
                status: 404,
                message: "Something wrong with the request"
            })
        }
        return NextResponse.json({
            status: 201,
            message: "Ingredient successfully created",
            ingredient: response
        })
    }catch(err) {
        return NextResponse.json({
            status: 500,
            message: `Error creating ingredinet: ${err}`
        })
    }
}



