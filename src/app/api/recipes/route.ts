import { NextRequest, NextResponse } from "next/server";
import { createRecipeAndIngredients } from "@/db/create";
import { zodValidateDataBeforeAddThemToDatabase } from "@/app/services/services";
import { getRecipes } from "@/db/read";

export const POST = async (req: NextRequest) => {
    try {
        const request = await req.json();
        const { validatedRecipe, validatedRecipeAddedIngredients } = zodValidateDataBeforeAddThemToDatabase(request);
        if (validatedRecipe && validatedRecipeAddedIngredients) {
            
            const res = await createRecipeAndIngredients(validatedRecipe, validatedRecipeAddedIngredients);

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

