import { ingredientsTable, recipeIngredientsTable, recipesTable } from './schema';
import { Ingredient, Recipe, RecipeIngredients } from '../shemas/recipe';
import { db } from './db';
import { checkIfIngredientExists, checkIfRecipeExists } from '@/db/helpers';
import { Database } from './schema';
import { updateIngredientsUsage } from './update';
import { transformRecipeToDB } from '@/app/services/helpers';


/**
 * Inserts a new recipe into the database.
 * @param r The recipe object to insert.
 * @returns The ID of the newly created recipe.
 */
const createRecipeToDatabase = async (r: Recipe, tx: Database ) => {
  const foundRecipe = await checkIfRecipeExists(r.title);
  if (foundRecipe) {
    if (foundRecipe.length === 0) {
      const transformedRecipe = transformRecipeToDB(r)
      const recipe = await tx
        .insert(recipesTable)
        .values(transformedRecipe)
        .returning({
          returnedId: recipesTable.id
        });

      return recipe[0].returnedId;
    } else {
      console.log("Recipe already exists");
      return;
    }
  }
};

/**
 * Inserts a new ingredient into the database.
 * @param ingredient The ingredient object to insert.
 * @returns The ID of the newly created ingredient.
 */
export const createIngredientsToDatabase = async (ingredient: Ingredient) => {
  const foundIngredient = await checkIfIngredientExists(ingredient.name);
  
  if (!foundIngredient) {
    const ing = await db
      .insert(ingredientsTable)
      .values({
        id: ingredient.id,
        icon: ingredient.icon,
        name: ingredient.name,
        unit: ingredient.unit,
        unitPrice: ingredient.unitPrice.toString(),
        quantity: ingredient.quantity.toString(),
        usage: ingredient.usage
      })
      .returning({
        ingredientId: ingredientsTable.id
      });

    return ing[0].ingredientId;
  }
};

/**
 * Inserts a new recipe-ingredient relationship into the database.
 * @param recipeIngredient The recipe ingredient object to insert.
 * @returns The ID of the newly created recipe ingredient.
 */
export const createRecipeIngredientsToDatabase = async (recipeIngredient: RecipeIngredients, tx?: Database ) => {
  
  const foundIngredient = await checkIfIngredientExists(recipeIngredient.name);
  let assignedId;

  if (foundIngredient && foundIngredient.name === recipeIngredient.name) {
    assignedId = foundIngredient.id;
  } else {
    assignedId = recipeIngredient.ingredientId;
  }
  
  const dbConnection = tx || db

  const ingredient = await dbConnection
    .insert(recipeIngredientsTable)
    .values({
      recipeId: recipeIngredient.recipeId,
      ingredientId: assignedId,
      quantity: recipeIngredient.quantity.toString()
    })
    .returning({
      ingredientId: recipeIngredientsTable.ingredientId
    });

  return ingredient[0].ingredientId;
};

/**
 * Creates a new recipe and its associated ingredients in the database.
 * @param r The recipe object.
 * @param recipeIngredients An array of recipe ingredient objects.
 * @returns An object containing the response from creating the recipe and the first recipe ingredient, or undefined if an error occurs.
 */
export const createRecipeAndIngredients = async (r: Recipe, recipeIngredients: RecipeIngredients[]) => {
  try {
    const transactionResponse = await db

    .transaction(async (tx) => {
      
      const recipeResponse = await createRecipeToDatabase(r,tx)
      console.log("This is the recipe response: ", recipeResponse)
      const recipeIngredientsResponse = await Promise.all(recipeIngredients.map(async (ingredient) => {

        const ingredients = await createRecipeIngredientsToDatabase(ingredient, tx)

        await updateIngredientsUsage(ingredient.ingredientId, tx, "+")
        return ingredients
      }));
      console.log("This is the ingredients response: ", recipeIngredientsResponse)
      return {
        recipe: recipeResponse,
        recipeIngredients: recipeIngredientsResponse
      }
      });
      console.log(transactionResponse)
      return transactionResponse
      
    } catch (err) {
    console.log(`There was an error adding your data: ${err}`);
    return;
  }
};