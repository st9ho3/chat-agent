import { ingredientsTable, recipeIngredientsTable, recipesTable } from './schema';
import { Ingredient, Recipe, RecipeIngredients } from '../shemas/recipe';
import { db } from './db';
import { eq } from 'drizzle-orm';

const checkIfRecipeExists = async (title: string) => {
  const recipes = await db
    .select({ recipe: recipesTable.title })
    .from(recipesTable)
    .where(eq(recipesTable.title, title));

  return recipes;
};

const checkIfIngredientExists = async (title: string) => {
  const ingredients = await db
    .select()
    .from(ingredientsTable)
    .where(eq(ingredientsTable.name, title));

  return ingredients[0];
};

/**
 * Inserts a new recipe into the database.
 * @param r The recipe object to insert.
 * @returns The ID of the newly created recipe.
 */
const createRecipeToDatabase = async (r: Recipe) => {
  const foundRecipe = await checkIfRecipeExists(r.title);
  if (foundRecipe) {
    if (foundRecipe.length === 0) {
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
const createIngredientsToDatabase = async (ingredient: RecipeIngredients) => {
  const foundIngredient = await checkIfIngredientExists(ingredient.name);
  if (!foundIngredient) {
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
  }
};

/**
 * Inserts a new recipe-ingredient relationship into the database.
 * @param recipeIngredient The recipe ingredient object to insert.
 * @returns The ID of the newly created recipe ingredient.
 */
const createRecipeIngredientsToDatabase = async (recipeIngredient: RecipeIngredients) => {
  const foundIngredient = await checkIfIngredientExists(recipeIngredient.name);
  let assignedId;

  if (foundIngredient && foundIngredient.name === recipeIngredient.name) {
    assignedId = foundIngredient.id;
  } else {
    assignedId = recipeIngredient.ingredientId;
  }

  const ingredient = await db
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
    const recipeResponse = await createRecipeToDatabase(r);
    if (recipeResponse) {
      await Promise.all(recipeIngredients.map(async (ingredient) => await createIngredientsToDatabase(ingredient)));
      const recipeIngredientsResponses = await Promise.all(recipeIngredients.map(async (ingredient) => await createRecipeIngredientsToDatabase(ingredient)));

      const responses = {
        recipeResponse: recipeResponse,
        ingredientsResponse: recipeIngredientsResponses[0]
      };
      return responses;
    }
  } catch (err) {
    console.log(`There was an error adding your data: ${err}`);
    return;
  }
};