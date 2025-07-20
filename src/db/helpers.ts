import { db } from './db';
import { eq } from 'drizzle-orm';
import { ingredientsTable, recipesTable } from './schema';


export const checkIfRecipeExists = async (title: string) => {
  const recipes = await db
    .select({ recipe: recipesTable.title })
    .from(recipesTable)
    .where(eq(recipesTable.title, title));

  return recipes;
};

export const checkIfIngredientExists = async (title: string) => {
  const ingredients = await db
    .select()
    .from(ingredientsTable)
    .where(eq(ingredientsTable.name, title));

  return ingredients[0];
};