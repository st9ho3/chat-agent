import { Ingredient } from "@/shemas/recipe";
import { IIngredientRepository } from "@/types/repositories";
import { db } from "@/db/db";
import { ingredientsTable } from "@/db/schema";

export class IngredientRepository implements IIngredientRepository {
    async findAll(): Promise<Ingredient[]> {
        try {
                const ingredients = await db
                    .select()
                    .from(ingredientsTable);
        
                return ingredients;
            } catch (err) {
                console.error("Failed to fetch ingredients:", err);
                return []; // Return empty array on error
            }
    }
}