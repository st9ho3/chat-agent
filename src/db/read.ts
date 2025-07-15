import { db } from "./db"
import { recipesTable } from "./schema"

export const getRecipes = async () => {
    const recipes = await db
    .select()
    .from(recipesTable)

    return recipes
}

