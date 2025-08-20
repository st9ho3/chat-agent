// src/app/api/edit/[id]/route.ts
import { getRecipeById } from "@/db/read";
import {  updateRecipeAndIngredients } from "@/db/update";
import { NextRequest, NextResponse } from "next/server";
import { zodValidateDataBeforeAddThemToDatabase } from "@/app/services/services";
import {  RecipeUpdatePayload } from "@/types/context";
import { deleteRecipe } from "@/db/delete";
import { sendError, sendSuccess } from "../../utils/responses";


export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const recipe = await getRecipeById(id);

return sendSuccess("Ingredients fetched succesfully", 200)
}

export const PATCH = async (req: NextRequest, context: {params: Promise<{id: string}>}) => {
  
  try {
    
    const request: RecipeUpdatePayload = await req.json();
    const {id} = await context.params
    
    const { validatedRecipe, validatedRecipeAddedIngredients, validatedRecipeRemovedIngredients } = zodValidateDataBeforeAddThemToDatabase(request);
  
    const response = await updateRecipeAndIngredients(id, validatedRecipe, validatedRecipeRemovedIngredients, validatedRecipeAddedIngredients)

    if (response.length > 0) {
      return sendSuccess("Recipe updated succesfully", 201)
    } else {
      return sendError("Something went wrong with the data or recipe not found", 404)
    }
  } catch (err) {
    console.error("UPDATE error: ", err);
    return sendError(`An internal server error occurred, ${err}`, 500)
  }
};

export const DELETE = async (req: NextRequest, context: {params: Promise<{id: string}>}) => {

    const {id} = await context.params
    await deleteRecipe(id);
    return sendSuccess("Recipe succesfully deleted", 200)
};