import { db } from './db';
import { and, eq } from 'drizzle-orm';
import { ingredientsTable, recipesTable } from './schema';


export const checkIfRecipeExists = async (title: string, userId: string) => {
  const recipes = await db
    .select({ recipe: recipesTable.title })
    .from(recipesTable)
    .where(and(eq(recipesTable.title, title), eq(recipesTable.userId, userId)));

  return recipes;
};

export const checkIfIngredientExists = async (title: string, userId: string) => {
  const [ingredients] = await db
    .select()
    .from(ingredientsTable)
    .where(and(eq(ingredientsTable.name, title), eq(ingredientsTable.userId, userId)))
    

  return ingredients;
};

