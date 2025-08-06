import { eq, sql } from 'drizzle-orm';
import { db } from './db';
import { ingredientsTable, recipesTable } from './schema';
import { Ingredient, Recipe, RecipeIngredients } from '@/shemas/recipe';
import { Database } from './schema';
import { deleteIngredientsFromRecipe } from './delete';
import { createRecipeIngredientsToDatabase } from './create';

export const updateRecipe = async (id: string, recipe: Recipe) => {
    try {
        const response = await db
            .update(recipesTable)
            .set({
                title: recipe.title,
                totalCost: String(recipe.totalCost),
                imgPath: recipe.imgPath
            })
            .where(eq(recipesTable.id, id))
            .returning({
                id: recipesTable.id
            });

        return response;
    } catch (err) {
        console.error("Failed to update recipe:", err);
        return [];
    }
};

// This function is a placeholder, no changes needed yet.
export const updateIngredientsUsage = async (id: string, tx: Database, action: "+" | "-" ) => {
    
    try {
        const response = await tx
        .update(ingredientsTable)
        .set({
            usage: action === "+" ? sql`${ingredientsTable.usage} + 1` : sql`${ingredientsTable.usage} - 1`
        }) 
        .where(eq(ingredientsTable.id, id))
    }catch(err) {
        console.log("Something happened on our behalf: ",err, id )
    }
};

export const updateIngredient = async (ingredient: Ingredient) => {
    try {
        console.log("Got the ingredient before the db", ingredient);
        const response = await db
            .update(ingredientsTable)
            .set({
                name: ingredient.name,
                unit: ingredient.unit,
                unitPrice: String(ingredient.unitPrice),
                quantity: String(ingredient.quantity)
            })
            .where(eq(ingredientsTable.id, ingredient.id))
            .returning({
                id: ingredientsTable.id
            });
        console.log("This is the response from the db", response);
        return response;
    } catch (err) {
        console.error("Failed to update ingredient:", err);
        return [];
    }
};

export const updateRecipeAndIngredients = async (id: string, recipe: Recipe, removedIngredients: RecipeIngredients[] | undefined, addedIngredients: RecipeIngredients[] | undefined) => {
    console.log("id: ", id, "recipe: ", recipe, "removedIngredients: ", removedIngredients, "addedIngredients: ", addedIngredients)
    const updateResponse = await db
    .transaction(async (tx) => {
        const updateRecipeResponse = await updateRecipe(id, recipe)

            if (removedIngredients && removedIngredients.length > 0) {
                const ingredientsThatRemoved = await Promise.all(removedIngredients.map(async (ingredient: RecipeIngredients) => await deleteIngredientsFromRecipe(ingredient.recipeId, ingredient.ingredientId, tx)));
            }

            if (addedIngredients && addedIngredients.length > 0) {
                const ingredientsThatAdded = await Promise.all(addedIngredients.map(async (ingredient: RecipeIngredients) => await createRecipeIngredientsToDatabase(ingredient, tx)));
            }
            return updateRecipeResponse
            }) 
            
            return updateResponse
        
} 

