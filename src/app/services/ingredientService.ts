import { IIngredientService } from "@/types/services";
import { IngredientRepository } from "../repositories/ingredientRepository";
import { Ingredient } from "@/shemas/recipe";
import { checkIfIngredientExists } from "@/db/helpers";
import { transformIngredientToDB } from "./helpers";
import { zodValidateIngredientBeforeAddItToDatabase } from "./services";
import { RecipeRepository } from "../repositories/recipeRepository";

export class IngredientService implements IIngredientService {

    private ingredientRepository: IngredientRepository
    private recipeRepository: RecipeRepository
    

    constructor() {
        this.ingredientRepository = new IngredientRepository()
        this.recipeRepository = new RecipeRepository()
    }

    async findAll(): Promise<Ingredient[] | undefined> {
      
      try {
        const ingredients = await this.ingredientRepository.findAll()
        return ingredients
      }catch (err) {
        return 
      }
    }

    async findById(id: string): Promise<Ingredient | undefined> {
      const ingredient = await this.ingredientRepository.findById(id)
     
      return ingredient
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
          const recipes = ingredientId ? await this.recipeRepository.findAllByIngredientId(ingredientId?.ingredientId) : []

          console.log(recipes)
          return ingredientId
        } catch(err) {
            console.log(err)
        }
    }

    async delete(id: string): Promise<void> {

      await this.ingredientRepository.delete(id)

    }

}