/* import { eq } from 'drizzle-orm';
import { db } from './db';
import { recipesTable } from './schema';
import { Recipe } from '@/shemas/recipe';

const updateRecipe = async (id: string, recipe: Recipe) => {
    
    await db
    .update(recipesTable)
    .set({})
    .where(eq(recipesTable.id, id))
} */