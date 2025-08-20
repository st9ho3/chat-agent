import { zodValidateIngredientBeforeAddItToDatabase } from "@/app/services/services";
import { createIngredientsToDatabase } from "@/db/create";
import { NextRequest, NextResponse } from "next/server";
import { sendError, sendSuccess } from "../utils/responses";

export const POST = async (req: NextRequest) => {
    const request = await req.json()
    const validatedIngredient = await zodValidateIngredientBeforeAddItToDatabase(request)
    console.log("validated ingredient in the POST",validatedIngredient)

    try{
        const response = await createIngredientsToDatabase(request)
        if (!response) {
           return sendError("Something wrong with the request", 404)
        }
       return sendSuccess("Ingredient successfully created", response, 201)
    }catch(err) {
       return sendError(`Error creating ingredinet: ${err}`, 500)
    }
}



