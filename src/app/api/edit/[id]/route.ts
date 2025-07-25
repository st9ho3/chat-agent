// src/app/api/edit/[id]/route.ts
import { getRecipeById } from "@/db/read";
import { updateRecipe } from "@/db/update";
import { IngredientEditAction } from "@/types/context";
import { NextRequest, NextResponse } from "next/server";
import { zodValidateDataBeforeAddThemToDatabase } from "@/app/services/services";
import { RecipeIngredients } from "@/shemas/recipe";
import { createIngredientsToDatabase, createRecipeIngredientsToDatabase } from "@/db/create";


export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  
  const recipe = await getRecipeById(id);
  console.log("Fetched recipe:", recipe);
  
  // return the raw recipe as JSON, with status 200
  return NextResponse.json(
    recipe,
    { status: 200 }
  );
}

export const PATCH = async(req: NextRequest) => {

    const request = await req.json()
    const id = request.recipe.id
    const recipe = request.recipe
    const ingredients = request.ingredients
    const action = request.action
    console.log("ingredients before zod",ingredients)
    console.log(request)

    try {
        const { validatedRecipe, validatedRecipeIngredients } = await zodValidateDataBeforeAddThemToDatabase(request);
        console.log("Recipe after zod",validatedRecipe)
        const response = await updateRecipe(id, validatedRecipe)
        console.log("Ingredients after zod",validatedRecipeIngredients)

        if (ingredients) {
          console.log("ingredients update")
          if (action === "add") {
            const id = await Promise.all(validatedRecipeIngredients.map(async (ingredient: RecipeIngredients) => await createIngredientsToDatabase(ingredient)));
            const recId = await Promise.all(validatedRecipeIngredients.map(async (ingredient: RecipeIngredients) => await createRecipeIngredientsToDatabase(ingredient)));
            console.log("ID is ", id, "and RecId is ", recId)
          }
        }


    if (response.length > 0) {
      return NextResponse.json(
      {
        status: 200,
        message: "Recipe updated succesfully"
      }
    )
    } else {
      return NextResponse.json(
        {status: 404,
          message: "somwthing went wrong with the data"
        }
      )
    }
    } catch(err) {
      console.log("this is the UPDATE error: ", err)
    }

    
    

    /* const updatedRecipe = await updateRecipe() */
}