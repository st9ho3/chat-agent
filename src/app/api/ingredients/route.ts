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
            sendError("Something wrong with the request", 404)
        }
        sendSuccess("Ingredient successfully created", response, 201)
    }catch(err) {
        sendError(`Error creating ingredinet: ${err}`, 500)
    }
}



