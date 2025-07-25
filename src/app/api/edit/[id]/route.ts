// src/app/api/edit/[id]/route.ts
import { getRecipeById } from "@/db/read";
import { updateRecipe } from "@/db/update";
import { NextRequest, NextResponse } from "next/server";
import { zodValidateDataBeforeAddThemToDatabase } from "@/app/services/services";
import { RecipeIngredients } from "@/shemas/recipe";
import { createIngredientsToDatabase, createRecipeIngredientsToDatabase } from "@/db/create";
import { IngredientEditAction, RecipeUpdatePayload } from "@/types/context";
import { deleteIngredientsFromRecipe } from "@/db/delete";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const recipe = await getRecipeById(id);

  // return the raw recipe as JSON, with status 200
  return NextResponse.json(
    recipe, {
      status: 200
    }
  );
}

export const PATCH = async (req: NextRequest) => {
  try {
    const request: RecipeUpdatePayload = await req.json();
    const id = request.recipe.id;
    const ingredients = request.ingredients;
    const action = request.action;
    console.log(request)
    const { validatedRecipe, validatedRecipeIngredients } = await zodValidateDataBeforeAddThemToDatabase(request);
    const response = await updateRecipe(id, validatedRecipe);

    if (ingredients && validatedRecipeIngredients) {
      if (action === IngredientEditAction.Add) {
        await Promise.all(validatedRecipeIngredients.map(async (ingredient: RecipeIngredients) => await createIngredientsToDatabase(ingredient)));
        await Promise.all(validatedRecipeIngredients.map(async (ingredient: RecipeIngredients) => await createRecipeIngredientsToDatabase(ingredient)));
      }
      if (action === IngredientEditAction.Delete) {
        await Promise.all(validatedRecipeIngredients.map(async (ingredient: RecipeIngredients) => await deleteIngredientsFromRecipe(ingredient.recipeId, ingredient.ingredientId)));
      }
    }

    if (response.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "Recipe updated succesfully"
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Something went wrong with the data or recipe not found"
      });
    }
  } catch (err) {
    console.error("UPDATE error: ", err);
    return NextResponse.json({
        status: 500,
        message: "An internal server error occurred"
    });
  }
};