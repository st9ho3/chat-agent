import { eq } from 'drizzle-orm';
import { db } from './db';
import { ingredientsTable, recipesTable } from './schema';
import { Ingredient, Recipe } from '@/shemas/recipe';

export const updateRecipe = async (id: string, recipe: Recipe) => {
    try {
        const response = await db
            .update(recipesTable)
            .set({
                title: recipe.title,
                totalCost: String(recipe.totalCost)
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
export const updateIngredientsUsage = async (id: string) => {

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