import { IIngredientService } from "@/types/services";
import { IngredientRepository } from "../repositories/ingredientRepository";
import { Ingredient } from "@/shemas/recipe";
import { checkIfIngredientExists } from "@/db/helpers";
import { zodValidateIngredientBeforeAddItToDatabase } from "./services";
import { RecipeRepository } from "../repositories/recipeRepository";
import { transformIngredientToDB } from "./helpers";
import { RecipeService } from "./recipeService";
import { db } from "@/db/db";
import { Database } from "@/db/schema";


export class IngredientService implements IIngredientService {

    private ingredientRepository: IngredientRepository
    private recipeRepository: RecipeRepository
    private recipeService: RecipeService
    

    constructor() {
        this.ingredientRepository = new IngredientRepository()
        this.recipeRepository = new RecipeRepository()
        this.recipeService = new RecipeService()
    }

    async findAll(userId: string): Promise<Ingredient[] | undefined> {
      
      try {
        const ingredients = await this.ingredientRepository.findAll(userId)
        return ingredients
      }catch (err) {

        throw new Error(`${err}`) 
      }
    }

    async findById(id: string): Promise<Ingredient | undefined> {
      const ingredient = await this.ingredientRepository.findById(id)
     
      return ingredient
    }

    async create(ingredient: Ingredient): Promise<{ ingredientId: string; } | undefined> {
          
          const ingredientExists = await checkIfIngredientExists(ingredient.name, ingredient.userId);
          const validatedIngredient = await zodValidateIngredientBeforeAddItToDatabase(ingredient)
          const DBIngredient = validatedIngredient ? transformIngredientToDB(validatedIngredient) : undefined
        
          if (!ingredientExists && DBIngredient) {
            const ingredientId = this.ingredientRepository.create(DBIngredient)
            return ingredientId
          } else {
            console.log("Ingredient already exists or is not validated")
            throw Error("Ingredient already exists or is not validated")
          }
    }

    async update(ingredient: Ingredient): Promise<{ ingredientId: string; } | undefined> {
  const validatedIngredient = await zodValidateIngredientBeforeAddItToDatabase(ingredient);
  const DBIngredient = validatedIngredient ? transformIngredientToDB(validatedIngredient) : undefined;
      console.log("DBIngredient",DBIngredient)
  try {
    const transactionResponse = await db.transaction(async (tx: Database) => {
      const ingredientId = DBIngredient ? await this.ingredientRepository.update(DBIngredient, tx) : undefined;
      console.log("ingredientID: ", ingredientId)
      const recipes = ingredientId ? await this.recipeRepository.findAllByIngredientId(ingredientId?.ingredientId) : [];
      console.log("recipes: ", recipes)
      if (recipes) {
        for (const dbRecipe of recipes) {
          if (DBIngredient) {
              await this.recipeService.updateRecipeAfterIngredientsChange(dbRecipe, DBIngredient, tx);

          }
        }
      }
      return ingredientId;
    });
    return transactionResponse;
  } catch (err) {
    console.log(err);
  }
}

    async delete(id: string): Promise<void> {

      await this.ingredientRepository.delete(id)

    }

}