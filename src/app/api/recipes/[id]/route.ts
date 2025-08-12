// src/app/api/edit/[id]/route.ts
import { getRecipeById } from "@/db/read";
import {  updateRecipeAndIngredients } from "@/db/update";
import { NextRequest, NextResponse } from "next/server";
import { zodValidateDataBeforeAddThemToDatabase } from "@/app/services/services";
import {  RecipeUpdatePayload } from "@/types/context";
import { deleteRecipe } from "@/db/delete";


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

export const PATCH = async (req: NextRequest, context: {params: Promise<{id: string}>}) => {
  
  try {
    
    const request: RecipeUpdatePayload = await req.json();
    const {id} = await context.params
    
    const { validatedRecipe, validatedRecipeAddedIngredients, validatedRecipeRemovedIngredients } = zodValidateDataBeforeAddThemToDatabase(request);
  
    const response = await updateRecipeAndIngredients(id, validatedRecipe, validatedRecipeRemovedIngredients, validatedRecipeAddedIngredients)

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

export const DELETE = async (req: NextRequest, context: {params: Promise<{id: string}>}) => {

    const {id} = await context.params
    await deleteRecipe(id);
    return NextResponse.json({ status: 200, message: "Recipe succesfully deleted" });
};