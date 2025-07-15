import { db } from "./db"
import { ingredientsTable, recipeIngredientsTable, recipesTable } from "./schema"
import { eq } from "drizzle-orm"

export const getRecipes = async () => {
    const recipes = await db
    .select()
    .from(recipesTable)
    
    
    
    console.log("recipes from DB",recipes)

    return recipes
}

