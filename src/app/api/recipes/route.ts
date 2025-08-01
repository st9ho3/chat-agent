import { NextRequest, NextResponse } from "next/server";
import { createRecipeAndIngredients } from "@/db/create";
import { zodValidateDataBeforeAddThemToDatabase } from "@/app/services/services";
import { getRecipes } from "@/db/read";
import { deleteRecipe } from "@/db/delete";

export const POST = async (req: NextRequest) => {
    try {
        const request = await req.json();
        const { validatedRecipe, validatedRecipeIngredients } = await zodValidateDataBeforeAddThemToDatabase(request);

        if (validatedRecipe && validatedRecipeIngredients) {
            const res = await createRecipeAndIngredients(validatedRecipe, validatedRecipeIngredients);

            if (res) {
                return NextResponse.json({
                    message: "Recipe succesfully created!",
                    status: 201
                });
            }
        } else {
            return NextResponse.json({
                error: "Invalid Data.",
                status: 422
            });
        }
    } catch (err) {
        return NextResponse.json({
            error: `Oops, something went wrong on our side, ${err}`,
            status: 500
        });
    }
};

export const GET = async () => {
    const recipes = await getRecipes();
    // Correctly return a JSON response with the recipes array and a 200 status.
    return NextResponse.json({ status: 200, body: recipes });
};

export const DELETE = async (req: NextRequest) => {
    const recipeId = await req.json();
    await deleteRecipe(recipeId);
    return NextResponse.json({ status: 200, message: "Recipe succesfully deleted" });
};