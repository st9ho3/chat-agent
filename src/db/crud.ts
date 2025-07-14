import { drizzle } from 'drizzle-orm/neon-http';
import { ingredientsTable, recipesTable } from '../db/schema';
import { Recipe, Ingredient } from '../shemas/recipe';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const db = drizzle(process.env.DATABASE_URL!);


export const createRecipeToDatabase = async(r: Recipe) => {
    console.log('recipe is been creating')
  const rec = await db.insert(recipesTable).values({
  id: r.id,
  title: r.title,
  totalCost: r.totalCost.toString(),
  createdBy: r.createdBy,
  dateCreated: r.dateCreated.toISOString().split('T')[0],
  category: r.category,
  imgPath: r.imgPath,
 }).returning({
    returnedId: recipesTable.id
 })

}

export const createIngredientsToDatabase = async(ingredient: Ingredient) => {
    const ing = db.insert(ingredientsTable).values({
        ...ingredient,
        unitPrice: ingredient.unitPrice?.toString()
    })
}
