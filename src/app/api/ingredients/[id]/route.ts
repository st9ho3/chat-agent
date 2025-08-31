import { updateIngredient } from "@/db/update";
import { NextRequest, NextResponse } from "next/server";
import { deleteIngredient } from "@/db/delete";
import { sendError, sendSuccess } from "../../utils/responses";
import { IngredientService } from "@/app/services/ingredientService";
import { Ingredient } from "@/shemas/recipe";

const service = new IngredientService()

export const PATCH = async (req: NextRequest) => {

     const ingredient: Ingredient = await req.json();

     
    
    try {
        const res = await service.update(ingredient)
        
        if (!res) {
           return sendError("InvalidData, sorry", 404)
        } else {
          return sendSuccess("Ingrediend updated succesflly", res, 201)
        }
    } catch(err) {
        // Log the actual error on the server for debugging
        console.error("Error updating ingredient:", err);

       return sendError("An unexpected error occurred on the server.", 500)
    }
}

export const DELETE = async (req: NextRequest, context: {params: Promise<{id: string}>}) => {

    try {

        const {id} = await context.params

        await service.delete(id)

       return sendSuccess("Recipe succesfully deleted", 201)

    }catch(err) {
        console.log(err)
        return sendError("An error occured on our side", 500)
    }

}