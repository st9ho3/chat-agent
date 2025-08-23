import { Recipe, RecipeIngredients } from "@/shemas/recipe";
import { CreateRequest, CreateResponse, IRecipeService } from "@/types/services";
import { db } from "@/db/db";
import { RecipeIngredientsRepository, RecipeRepository } from "../repositories/recipeRepository";
import { IngredientRepository } from "../repositories/ingredientRepository";
import { zodValidateDataBeforeAddThemToDatabase } from "./services";

export class RecipeService implements IRecipeService {

    private recipeRepository: RecipeRepository
    private recipeIngredientsRepository: RecipeIngredientsRepository
    private ingredientRepository: IngredientRepository

    constructor() {
        this.recipeRepository = new RecipeRepository()
        this.recipeIngredientsRepository = new RecipeIngredientsRepository()
        this.ingredientRepository = new IngredientRepository()
    }
    

    async create(requestData: CreateRequest): Promise<CreateResponse | undefined> {
        const { validatedRecipe, validatedRecipeAddedIngredients } = zodValidateDataBeforeAddThemToDatabase(requestData)

        if (!validatedRecipe || !validatedRecipeAddedIngredients) {
          throw Error("A problem with validation")
        }

        try {
            const transactionResponse = await db.transaction(async (tx) => {

                const recipeResponse = await this.recipeRepository.create(validatedRecipe, tx);
                
                const recipeIngredientsResponse = await Promise.all(
                    validatedRecipeAddedIngredients.map(async (ingredient) => {
                        const newIngredient = await this.recipeIngredientsRepository.create(ingredient, tx);
                        await this.ingredientRepository.updateUsage(ingredient.ingredientId, tx, "+");
                        return newIngredient;
                    })
                );

                return {
                    recipe: recipeResponse,
                    recipeIngredients: recipeIngredientsResponse
                };
            });

            return transactionResponse;

        } catch (err) {
            console.error(`Transaction failed in RecipeService.create: ${err}`);
  
        }
    }

    async update(id: string, recipe: Recipe, removedIngredients: RecipeIngredients[] | undefined, addedIngredients: RecipeIngredients[] | undefined): Promise<{ id: string; } | undefined> {
        console.log("id: ", id, "recipe: ", recipe, "removedIngredients: ", removedIngredients, "addedIngredients: ", addedIngredients)
            const updateResponse = await db
            .transaction(async (tx) => {
                const updateRecipeResponse = await this.recipeRepository.update(id, recipe)
        
                    if (removedIngredients && removedIngredients.length > 0) {
                        const ingredientsThatRemoved = await Promise.all(removedIngredients.map(async (ingredient: RecipeIngredients) => await this.recipeIngredientsRepository.delete(ingredient.recipeId, ingredient.ingredientId, tx)));
                    }
        
                    if (addedIngredients && addedIngredients.length > 0) {
                        const ingredientsThatAdded = await Promise.all(addedIngredients.map(async (ingredient: RecipeIngredients) => await this.recipeIngredientsRepository.create(ingredient, tx)));
                    }
                    return updateRecipeResponse
                    }) 
                    
                    return updateResponse
    }

    async delete(id: string): Promise<{ id: string; } | undefined> {
      const deleteResponse = this.recipeRepository.delete(id)
      return deleteResponse
    }
}




