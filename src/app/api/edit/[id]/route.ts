// src/app/api/edit/[id]/route.ts
import { getRecipeById } from "@/db/read";
import { updateRecipe } from "@/db/update";
import { NextRequest, NextResponse } from "next/server";

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

    try {
        const response = await updateRecipe(id, recipe)

        if (ingredients) {
          console.log("got the ingredient")
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