import { IIngredientService } from "@/types/services";
import { IngredientRepository } from "../repositories/ingredientRepository";
import { Ingredient } from "@/shemas/recipe";
import { checkIfIngredientExists } from "@/db/helpers";
import { transformIngredientToDB } from "./helpers";
import { zodValidateIngredientBeforeAddItToDatabase } from "./services";

export class IngredientService implements IIngredientService {

    private ingredientRepository: IngredientRepository
    private ingredient: Ingredient

    constructor(ingredient: Ingredient) {
        this.ingredientRepository = new IngredientRepository()
        this.ingredient = ingredient
    }

    

    async create(ingredient: Ingredient): Promise<{ ingredientId: string; } | undefined> {
          
          const ingredientExists = await checkIfIngredientExists(ingredient.name);
          const validatedIngredient = await zodValidateIngredientBeforeAddItToDatabase(this.ingredient)
          const DBIngredient = validatedIngredient ? transformIngredientToDB(validatedIngredient) : undefined

          if (!ingredientExists && DBIngredient) {
            const ingredientId = this.ingredientRepository.create(DBIngredient)
            return ingredientId
          } else {
            console.log("Ingredient already exists or is not validated")
          }
    }
}