
import { NextRequest} from "next/server";
import { sendError, sendSuccess } from "../utils/responses";
import { IngredientService } from "@/app/services/ingredientService";
import { Ingredient } from "@/shemas/recipe";

export const POST = async (req: NextRequest) => {


   const ingredient: Ingredient = await req.json()

   const service = new IngredientService()

    try{
        const response = await service.create(ingredient)
        
        if (!response) {
           return sendError("Something wrong with the request", 404)
        }
       return sendSuccess("Ingredient successfully created", response, 201)
    }catch(err) {
       return sendError(`Error creating ingredinet: ${err}`, 500)
    }
}



