import { eq } from "drizzle-orm";
import { db } from "./db";
import { ingredientsTable, recipeIngredientsTable, recipesTable } from "./schema";
import { Ingredient } from "@/shemas/recipe";


export const getRecipes = async () => {
    try {
        const recipes = await db
            .select()
            .from(recipesTable);

        return recipes;
    } catch (err) {
        console.error("Failed to fetch recipes:", err);
        return []; // Return empty array on error
    }
};

export const getIngredients = async () => {
    try {
        const ingredients = await db
            .select()
            .from(ingredientsTable);

        return ingredients;
    } catch (err) {
        console.error("Failed to fetch ingredients:", err);
        return []; // Return empty array on error
    }
};

export const getRecipeByIdBetter = async (id: string) => {
    console.log("id that fetches the db is", id);
    try {
        const recipe = await db
            .select()
            .from(recipesTable)
            .leftJoin(recipeIngredientsTable, eq(recipesTable.id, recipeIngredientsTable.recipeId))
            .leftJoin(ingredientsTable, eq(recipeIngredientsTable.ingredientId, ingredientsTable.id))
            .where(eq(recipesTable.id, id));
        return recipe;
    } catch (err) {
        console.log("error on fetching the recipe", err);
    }
};

export const getRecipeById = async (id: string) => {
    try {
        const recipe = await db.query.recipesTable.findFirst({
            where: eq(recipesTable.id, id),
            with: {
                recipeIngredients: {
                    with: {
                        ingredients: true
                    }
                }
                }
            })
            return recipe;
        }
        
     catch (err) {
        console.log("Error fetching recipe ------->", err);
    }
};

export const getIngredientById = async (id: string) => {
    try {
        const ingredient = await db
            .select()
            .from(ingredientsTable)
            .where(eq(ingredientsTable.id, id));
        return ingredient;
    } catch (err) {
        console.error("An error occured", err);
    }
};