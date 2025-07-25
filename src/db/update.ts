import { eq } from 'drizzle-orm';
import { db } from './db';
import { recipesTable } from './schema';
import { Recipe } from '@/shemas/recipe';



export const updateRecipe = async (id: string, recipe: Recipe) => {
        
   const response = await db
    .update(recipesTable)
    .set({
        title: recipe.title,
        totalCost: String(recipe.totalCost)
    })
    .where(eq(recipesTable.id, id))
    .returning({
        id: recipesTable.id
    })

    return response
}