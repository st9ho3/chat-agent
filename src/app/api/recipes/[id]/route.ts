// src/app/api/edit/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { zodValidateDataBeforeAddThemToDatabase } from "@/app/services/services";
import {  RecipeUpdatePayload } from "@/types/context";
import { sendError, sendSuccess } from "../../utils/responses";
import { RecipeService } from "@/app/services/recipeService";


const service = new RecipeService()

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const recipe = await service.findById(id)

  return sendSuccess("Recipe fetched succesfully",recipe, 200)
}

export const PATCH = async (req: NextRequest, context: {params: Promise<{id: string}>}) => {

  
  try {
    
    const request: RecipeUpdatePayload = await req.json();
    const {id} = await context.params
    
    const { validatedRecipe, validatedRecipeAddedIngredients, validatedRecipeRemovedIngredients } = zodValidateDataBeforeAddThemToDatabase(request);
    console.log("PATCH",id)
    const response = await service.update(id, validatedRecipe, validatedRecipeRemovedIngredients, validatedRecipeAddedIngredients)

    if (response) {
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
    await service.delete(id)
    return sendSuccess("Recipe succesfully deleted", 200)
};