import { drizzle } from 'drizzle-orm/neon-http';
import { ingredientsTable, recipeIngredientsTable, recipesTable } from '../db/schema';
import { Recipe, Ingredient, RecipeIngredients } from '../shemas/recipe';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const db = drizzle(process.env.DATABASE_URL!);

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

  return recipe[0].returnedId;

};

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

  return ing[0].ingredientId;
};

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

  return ingredient[0].ingredientId;
};

export const createRecipeAndIngredients = async(r: Recipe, recipeIngredients: RecipeIngredients[]) => {

    try {
        const recipeResponse = await createRecipeToDatabase(r)

        const ingredientsResponses = recipeIngredients.map(async(ingredient) => await createIngredientsToDatabase(ingredient))

        const recipeIngredientsResponses = recipeIngredients.map(async(ingredient) => await createRecipeIngredientsToDatabase(ingredient))
        
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