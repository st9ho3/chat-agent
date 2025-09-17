/**
 * API route for handling GET, PATCH, and DELETE requests for a single recipe.
 * This route manages the retrieval, update, and deletion of a specific recipe using its ID.
 *
 * - `GET` handler: Fetches a recipe by its ID from the URL parameters. It uses `RecipeService` to find the recipe and returns a success response with the recipe data.
 *
 * - `PATCH` handler: Updates an existing recipe. It expects a JSON payload containing the updated recipe data, new ingredients to be added, and existing ingredients to be removed.
 *    It uses `zodValidateDataBeforeAddThemToDatabase` for data validation before calling the `RecipeService` to perform the update. 
 *    It returns a success response upon a successful update or an error response if the data is invalid or the update fails.
 *
 * - `DELETE` handler: Deletes a recipe by its ID from the URL parameters. It calls the `delete` method of `RecipeService` and returns a success response upon successful deletion.
 */
import { NextRequest } from "next/server";
import { zodValidateDataBeforeAddThemToDatabase } from "@/app/services/services";
import { RecipeUpdatePayload } from "@/types/context";
import { sendError, sendSuccess } from "../../utils/responses";
import { RecipeService } from "@/app/services/recipeService";

const service = new RecipeService();

export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = await context.params;
    const recipe = await service.findById(id);

    return sendSuccess("Recipe fetched succesfully", recipe, 200);
}

export const PATCH = async (req: NextRequest, context: { params: { id: string } }) => {
    try {
        const request: RecipeUpdatePayload = await req.json();
        const { id } = await context.params;

        const { validatedRecipe, validatedRecipeAddedIngredients, validatedRecipeRemovedIngredients } = zodValidateDataBeforeAddThemToDatabase(request);
        console.log("PATCH", id);
        const response = await service.update(id, validatedRecipe, validatedRecipeRemovedIngredients, validatedRecipeAddedIngredients);

        if (response) {
            return sendSuccess("Recipe updated succesfully", null, 201);
        } else {
            return sendError("Something went wrong with the data or recipe not found", 404);
        }
    } catch (err) {
        console.error("UPDATE error: ", err);
        return sendError(`An internal server error occurred, ${err}`, 500);
    }
};

export const DELETE = async (req: NextRequest, context: { params: { id: string } }) => {
    const { id } = await context.params;
    await service.delete(id);
    return sendSuccess("Recipe succesfully deleted", null, 200);
};