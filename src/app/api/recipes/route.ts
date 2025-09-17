/**
 * API route for creating a new recipe.
 * This route handles POST requests, expecting the new recipe's data in the request body.
 * It utilizes the `RecipeService` to handle the creation logic.
 * Upon a successful creation, it returns a success response with a 201 status code.
 * If the provided data is invalid or an error occurs during the process, it returns an appropriate error response with a 404 or 500 status code.
 */
import { NextRequest } from "next/server";
import { sendError, sendSuccess } from "../utils/responses";
import { RecipeService } from "@/app/services/recipeService";
import { auth } from "@/auth";

export const POST = async (req: NextRequest) => {
    const session = await auth()
    
    const service = new RecipeService();


    try {
        if(!session?.user) {
        throw new Error("Can't take an action if not validated")
        }
        const request = await req.json();

        const res = await service.create(request);

        if (res) {
            return sendSuccess("Recipe successfully created!", null, 201);
        } else {
            return sendError("Invalid Data.", 404);
        }
    } catch (err) {
        return sendError(`${err}`, 500);
    }
};