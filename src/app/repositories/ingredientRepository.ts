import { DBIngredient, Ingredient } from "@/shemas/recipe";
import { IIngredientRepository } from "@/types/repositories";
import { db } from "@/db/db";
import { Database, ingredientsTable } from "@/db/schema";
import { transformIngredientFromDB, transformIngredientToDB } from "../services/helpers";
import { eq, sql } from "drizzle-orm";

export class IngredientRepository implements IIngredientRepository {

    async findAll(): Promise<Ingredient[] | undefined> {
        try {
            const dbIngredients = await db
                .select()
                .from(ingredientsTable);

            const ingredients = dbIngredients.map((dbIngredient) => transformIngredientFromDB(dbIngredient))
            return ingredients
        } catch (err) {
            console.error("Failed to fetch ingredients:", err);
            return undefined; // Return empty array on error
        }
    }

    async findById(id: string): Promise<Ingredient | undefined> {
        try {
            const [dbIngredient] = await db
                .select()
                .from(ingredientsTable)
                .where(eq(ingredientsTable.id, id));
            const ingredient = transformIngredientFromDB(dbIngredient);
            return ingredient
        } catch (err) {
            console.error("An error occured", err);
            return
        }
    }

    async create(ingredient: DBIngredient): Promise<{ ingredientId: string } | undefined> {
        
            try {
                const [ingredientID] = await db
                    .insert(ingredientsTable)
                    .values(ingredient)
                    .returning({
                        ingredientId: ingredientsTable.id
                    });

                return ingredientID
            } catch (err) {
                console.log(err)
                return
            }
    }

    async update( ingredient: DBIngredient ): Promise<{ ingredientId: string } | undefined> {
        try {
            const [ingredientId] = await db
                .update(ingredientsTable)
                .set(ingredient)
                .where(eq(ingredientsTable.id, ingredient.id))
                .returning({
                    ingredientId: ingredientsTable.id
                });
            console.log("This is the response from the db", ingredientId);
            return ingredientId;
        } catch (err) {
            console.error("Failed to update ingredient:", err);
            return;
        }
    }

    async delete(id: string): Promise<{ ingredientId: string } | undefined> {
        try {
            const [ingredientId] = await db
                .delete(ingredientsTable)
                .where(eq(ingredientsTable.id, id))
                .returning({
                    ingredientId: ingredientsTable.id
                });
            
            return ingredientId
        } catch (err) {
            throw Error("Failed to delete ingredient from database")
            
        }
    }

    async updateUsage(id: string, tx: Database, action: "+" | "-"): Promise<undefined> {
        try {
            await tx
                .update(ingredientsTable)
                .set({
                    usage: action === "+" ? sql`${ingredientsTable.usage} + 1` : sql`${ingredientsTable.usage} - 1`
                })
                .where(eq(ingredientsTable.id, id))
        } catch (err) {
            console.log("Something happened on our behalf: ", err, id)
        }
    }
}