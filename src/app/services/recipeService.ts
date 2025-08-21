import { Recipe, RecipeIngredients } from "@/shemas/recipe";
import { createResponse, IRecipeService } from "@/types/services";
import { db } from "@/db/db";
import { RecipeIngredientsRepository, RecipeRepository } from "../repositories/recipeRepository";
import { IngredientRepository } from "../repositories/ingredientRepository";

export class RecipeService implements IRecipeService {

    private recipeRepository: RecipeRepository
    private recipeIngredientsRepository: RecipeIngredientsRepository
    private ingredientRepository: IngredientRepository

    constructor() {
        this.recipeRepository = new RecipeRepository()
        this.recipeIngredientsRepository = new RecipeIngredientsRepository()
        this.ingredientRepository = new IngredientRepository()
    }
    

    async create(recipe: Recipe, recipeIngredients: RecipeIngredients[]): Promise<createResponse | undefined> {
        try {
    const transactionResponse = await db

    .transaction(async (tx) => {
      
      const recipeResponse = await this.recipeRepository.create(recipe, tx)
      console.log("This is the recipe response: ", recipeResponse)
      const recipeIngredientsResponse = await Promise.all(recipeIngredients.map(async (ingredient) => {

        const ingredients = await this.recipeIngredientsRepository.create(ingredient, tx)

        await this.ingredientRepository.updateUsage(ingredient.ingredientId, tx, "+")
        return ingredients
      }));
      return {
        recipe: recipeResponse,
        recipeIngredients: recipeIngredientsResponse
      }
      });
      console.log(transactionResponse)
      return transactionResponse
      
    } catch (err) {
    console.log(`There was an error adding your data: ${err}`);
    return;
  }
    }
}




