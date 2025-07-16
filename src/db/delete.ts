import { eq } from "drizzle-orm";
import { db } from "./db";
import { recipesTable } from "./schema";



export const deleteRecipe = async (recipeId: string) => {
    
    await db
    .delete(recipesTable)
    .where(eq(recipesTable.id, recipeId))
    .returning()

}