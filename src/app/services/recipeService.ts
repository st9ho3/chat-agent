import { DBRecipe, Recipe, RecipeIngredients } from "@/shemas/recipe";
import { CreateRequest, CreateResponse, IRecipeService } from "@/types/services";
import { db } from "@/db/db";
import { RecipeIngredientsRepository, RecipeRepository } from "../repositories/recipeRepository";
import { IngredientRepository } from "../repositories/ingredientRepository";
import { zodValidateDataBeforeAddThemToDatabase } from "./services";
import { RecipeUpdatePayload } from "@/types/context";
import { RecipeWithQuery } from "@/types/specialTypes";
import { calculateProfitMargin, getTotalPrice, transformRecipeFromDB, transformRecipeIngredentFromDB } from "./helpers";


export class RecipeService implements IRecipeService {

    private recipeRepository: RecipeRepository
    private recipeIngredientsRepository: RecipeIngredientsRepository
    private ingredientRepository: IngredientRepository

    constructor() {
        this.recipeRepository = new RecipeRepository()
        this.recipeIngredientsRepository = new RecipeIngredientsRepository()
        this.ingredientRepository = new IngredientRepository()
    }

    async findAll(): Promise<Recipe[] | undefined> {
        const recipes = await this.recipeRepository.findAll()
        return recipes
    }

    async findById(id: string): Promise< RecipeWithQuery | undefined> {
        
        try {
            const recipe = await this.recipeRepository.findById(id)
            return recipe
        }catch(err) {
            
            throw new Error(`${err}`) 
        }
    }

    async create(requestData: CreateRequest): Promise<CreateResponse | undefined> {
        
        const { validatedRecipe, validatedRecipeAddedIngredients } = zodValidateDataBeforeAddThemToDatabase(requestData)
        
        if (validatedRecipeAddedIngredients.length === 0) {
            throw Error("Ingredients required in order to create a recipe.")
        }
        
        
        try {
            const transactionResponse = await db.transaction(async (tx) => {

                const recipeResponse = await this.recipeRepository.create(validatedRecipe, tx);

                    await Promise.all(
                    validatedRecipeAddedIngredients.map(async (ingredient) => {
                        const newIngredient = await this.recipeIngredientsRepository.create(ingredient, tx);
                        await this.ingredientRepository.updateUsage(ingredient.ingredientId, tx, "+");
                        return newIngredient;
                    })
                );
                

                return {
                    recipe: recipeResponse,
                };
            });
            
            return transactionResponse;

        } catch (err) {
            console.error(`Transaction failed in RecipeService.create: ${err}`);
  
        }
    }

    async update(id: string, recipe: Recipe, removedIngredients: RecipeIngredients[] , addedIngredients: RecipeIngredients[]): Promise<{ id: string; } | undefined> {
        const request: RecipeUpdatePayload = {
            recipe: recipe,
            removedIngredients: removedIngredients,
            addedIngredients: addedIngredients
        }
        const {validatedRecipe, validatedRecipeAddedIngredients, validatedRecipeRemovedIngredients} = zodValidateDataBeforeAddThemToDatabase(request)

            const updateResponse = await db
            .transaction(async (tx) => {
                const updateRecipeResponse = await this.recipeRepository.update(id, validatedRecipe)
        
                    if (validatedRecipeRemovedIngredients && validatedRecipeRemovedIngredients.length > 0) {
                        await Promise.all(validatedRecipeRemovedIngredients.map(async (ingredient: RecipeIngredients) => await this.recipeIngredientsRepository.delete(ingredient.recipeId, ingredient.ingredientId, tx)));
                    }
        
                    if (validatedRecipeAddedIngredients && validatedRecipeAddedIngredients.length > 0) {
                        await Promise.all(validatedRecipeAddedIngredients.map(async (ingredient: RecipeIngredients) => await this.recipeIngredientsRepository.create(ingredient, tx)));
                    }
                    return updateRecipeResponse
                    }) 
                    
                    return updateResponse
    }

    async delete(id: string): Promise<{ id: string; } | undefined> {
      const deleteResponse = this.recipeRepository.delete(id)
      return deleteResponse
    }

    async updateRecipeAfterIngredientsChange(dbRecipe: DBRecipe): Promise<void> {
        
        const queredRecipe = await this.recipeRepository.findById(dbRecipe.id)
        const dbIngredients = queredRecipe?.recipeIngredients.map((ingredient) => ingredient)
        const ingredients = dbIngredients?.map((ing) => transformRecipeIngredentFromDB(ing))
        const recipe = transformRecipeFromDB(dbRecipe)
        const cost = ingredients ? getTotalPrice(ingredients) : 0
        const tax = recipe.tax
        const price =recipe.sellingPrice ? recipe.sellingPrice : 1
        const margin = calculateProfitMargin(cost, price, tax)

        const updatedRecipe = 
        {
            ...recipe,
            totalCost: cost,
            profitMargin: margin 
        }
        this.recipeRepository.update(recipe.id, updatedRecipe)
    }
}




