import { IIngredientService } from "@/types/services";
import { IngredientRepository } from "../repositories/ingredientRepository";
import { Ingredient } from "@/shemas/recipe";
import { checkIfIngredientExists } from "@/db/helpers";
import { transformIngredientToDB } from "./helpers";
import { zodValidateIngredientBeforeAddItToDatabase } from "./services";

export class IngredientService implements IIngredientService {

    private ingredientRepository: IngredientRepository
    

    constructor() {
        this.ingredientRepository = new IngredientRepository()
    }

    async create(ingredient: Ingredient): Promise<{ ingredientId: string; } | undefined> {
          
          const ingredientExists = await checkIfIngredientExists(ingredient.name);
          const validatedIngredient = await zodValidateIngredientBeforeAddItToDatabase(ingredient)
          const DBIngredient = validatedIngredient ? transformIngredientToDB(validatedIngredient) : undefined

          if (!ingredientExists && DBIngredient) {
            const ingredientId = this.ingredientRepository.create(DBIngredient)
            return ingredientId
          } else {
            console.log("Ingredient already exists or is not validated")
          }
    }

    async update(ingredient: Ingredient): Promise<{ ingredientId: string; } | undefined> {

        const validatedIngredient = await zodValidateIngredientBeforeAddItToDatabase(ingredient)
        const DBIngredient =  validatedIngredient ?  transformIngredientToDB(validatedIngredient) : undefined

        try {

          const ingredientId = DBIngredient ? await this.ingredientRepository.update(DBIngredient) : undefined
            return ingredientId
        } catch(err) {
            console.log(err)
        }
    }

    async delete(id: string): Promise<void> {

      await this.ingredientRepository.delete(id)

    }

}