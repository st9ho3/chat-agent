import { eq, and } from "drizzle-orm";
import { db } from "./db";
import { ingredientsTable, recipeIngredientsTable, recipesTable } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteRecipe = async (recipeId: string) => {
    try {
        await db
            .delete(recipesTable)
            .where(eq(recipesTable.id, recipeId))
            .returning();

        revalidatePath("/recipes");
    } catch (err) {
        console.error("Failed to delete recipe:", err);
    }
};

export const deleteIngredientsFromRecipe = async (recipeId: string, ingredientId: string) => {
    try {
        await db
            .delete(recipeIngredientsTable)
            .where(
                and(
                    eq(recipeIngredientsTable.recipeId, recipeId),
                    eq(recipeIngredientsTable.ingredientId, ingredientId)
                )
            )
            .returning();
    } catch (err) {
        console.error("Failed to delete ingredient from recipe:", err);
    }
};

export const deleteIngredient = async (id: string) => {
    try {
        await db
            .delete(ingredientsTable)
            .where(eq(ingredientsTable.id, id))
            .returning();

        revalidatePath("/ingredients");
    } catch (err) {
        console.error("Failed to delete ingredient:", err);
    }
};