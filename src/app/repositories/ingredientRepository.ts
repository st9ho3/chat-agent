import { Ingredient } from "@/shemas/recipe";
import { IIngredientRepository } from "@/types/repositories";
import { db } from "@/db/db";
import { Database, ingredientsTable } from "@/db/schema";
import { transformIngredientFromDB, transformIngredientToDB } from "../services/helpers";
import { eq, sql } from "drizzle-orm";
import { checkIfIngredientExists } from "@/db/helpers";
import { revalidatePath } from "next/cache";

export class IngredientRepository implements IIngredientRepository {

    async findAll(): Promise<Ingredient[]> {
        try {
                const dbIngredients = await db
                    .select()
                    .from(ingredientsTable);
                
                    const ingredients = dbIngredients.map((dbIngredient) => transformIngredientFromDB(dbIngredient))
                    return ingredients
            } catch (err) {
                console.error("Failed to fetch ingredients:", err);
                return []; // Return empty array on error
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

    async create(ingredient: Ingredient): Promise<{ingredientId: string} | undefined> {

        const foundIngredient = await checkIfIngredientExists(ingredient.name);
          
          if (!foundIngredient) {
            try {
                const [ingredientID] = await db
              .insert(ingredientsTable)
              .values({
                id: ingredient.id,
                icon: ingredient.icon,
                name: ingredient.name,
                unit: ingredient.unit,
                unitPrice: ingredient.unitPrice.toString(),
                quantity: ingredient.quantity.toString(),
                usage: ingredient.usage
              })
              .returning({
                ingredientId: ingredientsTable.id
              });
        
            return ingredientID

            }catch(err) {
                console.log(err)
                return
            }
          }
    }

    async update(id: string, ingredient: Ingredient): Promise<{ingredientId: string} | undefined> {
        const ingredientForDB = transformIngredientToDB(ingredient)
        try {
        const [ingredientId] = await db
            .update(ingredientsTable)
            .set(ingredientForDB)
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

    async delete(id: string): Promise<{ingredientId: string} | undefined> {
        try {
                const [ingredientId] = await db
                    .delete(ingredientsTable)
                    .where(eq(ingredientsTable.id, id))
                    .returning({
                        ingredientId: ingredientsTable.id
                    });
                    revalidatePath("/ingredients");
                    return ingredientId
            } catch (err) {
                console.error("Failed to delete ingredient:", err);
                return
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
            }catch(err) {
                console.log("Something happened on our behalf: ",err, id )
            }
    }
}