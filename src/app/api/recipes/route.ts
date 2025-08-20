import { NextRequest } from "next/server";
import { createRecipeAndIngredients } from "@/db/create";
import { zodValidateDataBeforeAddThemToDatabase } from "@/app/services/services";
import { sendError, sendSuccess } from "../utils/responses";

export const POST = async (req: NextRequest) => {
    try {
        const request = await req.json();
        const { validatedRecipe, validatedRecipeAddedIngredients } = zodValidateDataBeforeAddThemToDatabase(request);
        if (validatedRecipe && validatedRecipeAddedIngredients) {
            
            const res = await createRecipeAndIngredients(validatedRecipe, validatedRecipeAddedIngredients);

            if (res) {
               return sendSuccess("Recipe succesfully created!", 201)
            }
        } else {
            return sendError("Invalid Data.", 404)
        }
    } catch (err) {
       return sendError(`Oops, something went wrong on our side, ${err}`, 500)
    }
};

