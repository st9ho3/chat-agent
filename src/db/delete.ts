import { eq, and } from "drizzle-orm";
import { db } from "./db";
import { recipeIngredientsTable, recipesTable } from "./schema";
import { revalidatePath } from "next/cache";



export const deleteRecipe = async (recipeId: string) => {
    
    await db
    .delete(recipesTable)
    .where(eq(recipesTable.id, recipeId))
    .returning()

    revalidatePath("/recipes")

}

export const deleteIngredientsFromRecipe = async (recipeId: string, ingredientId: string) => {
    await db
    .delete(recipeIngredientsTable)
    .where(
        and(
            eq(recipeIngredientsTable.recipeId, recipeId),
            eq(recipeIngredientsTable.ingredientId, ingredientId)
        )
    )
    .returning()
}

