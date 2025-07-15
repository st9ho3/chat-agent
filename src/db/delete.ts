import { eq } from "drizzle-orm";
import { db } from "./db";
import { recipesTable } from "./schema";
import { redirect } from "next/navigation";



export const deleteRecipe = async (recipeId: string) => {
    
    await db
    .delete(recipesTable)
    .where(eq(recipesTable.id, recipeId))
    .returning()

}