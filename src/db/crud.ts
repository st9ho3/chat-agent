import { drizzle } from 'drizzle-orm/neon-http';
import { ingredientsTable, recipeIngredientsTable, recipesTable } from '../db/schema';
import { Recipe, RecipeIngredients } from '../shemas/recipe';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const db = drizzle(process.env.DATABASE_URL!);

/**
 * Inserts a new recipe into the database.
 * @param r The recipe object to insert.
 * @returns The ID of the newly created recipe.
 */
const createRecipeToDatabase = async(r: Recipe) => {

  const recipe = await db
    .insert(recipesTable)
    .values({
      id: r.id,
      title: r.title,
      totalCost: r.totalCost.toString(),
      createdBy: r.createdBy,
      dateCreated: r.dateCreated.toISOString().split('T')[0],
      category: r.category,
      imgPath: r.imgPath,
    })
    .returning({
      returnedId: recipesTable.id
    });

    console.log('recipe pushed')
  return recipe[0].returnedId;

};

/**
 * Inserts a new ingredient into the database.
 * @param ingredient The ingredient object to insert.
 * @returns The ID of the newly created ingredient.
 */
const createIngredientsToDatabase = async(ingredient: RecipeIngredients) => {
  const ing = await db
    .insert(ingredientsTable)
    .values({
      id: ingredient.ingredientId,
      icon: '',
      name: ingredient.name,
      unit: ingredient.unit,
      unitPrice: ingredient.unitPrice?.toString()
    })
    .returning({
      ingredientId: ingredientsTable.id
    });

    console.log('Ingredients pushed')

  return ing[0].ingredientId;
};

/**
 * Inserts a new recipe-ingredient relationship into the database.
 * @param recipeIngredient The recipe ingredient object to insert.
 * @returns The ID of the newly created recipe ingredient.
 */
const createRecipeIngredientsToDatabase = async(recipeIngredient: RecipeIngredients) => {
  const ingredient = await db
    .insert(recipeIngredientsTable)
    .values({
      recipeId: recipeIngredient.recipeId,
      ingredientId: recipeIngredient.ingredientId,
      quantity: recipeIngredient.quantity.toString()
    })
    .returning({
      ingredientId: recipeIngredientsTable.ingredientId
    });

    console.log('RecipeIngredients pushed')
  return ingredient[0].ingredientId;
};

/**
 * Creates a new recipe and its associated ingredients in the database.
 * @param r The recipe object.
 * @param recipeIngredients An array of recipe ingredient objects.
 * @returns An object containing the response from creating the recipe and the first recipe ingredient, or undefined if an error occurs.
 */
export const createRecipeAndIngredients = async(r: Recipe, recipeIngredients: RecipeIngredients[]) => {

    try {
        const recipeResponse = await createRecipeToDatabase(r)

        const ingredientsResponses = await Promise.all(recipeIngredients.map(async(ingredient) => await createIngredientsToDatabase(ingredient))) 

        const recipeIngredientsResponses = await Promise.all(recipeIngredients.map(async(ingredient) => await createRecipeIngredientsToDatabase(ingredient)))
        
        console.log('This is the response from ingredient', ingredientsResponses)

        const responses = {
        recipeResponse: recipeResponse,
        ingredientsResponse: recipeIngredientsResponses[0]
    }
        return responses
    } catch(err) {
        console.log(`There was an error adding your data: ${err}`)
        return
    }
    
};