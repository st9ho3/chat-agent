/**
 * @fileoverview Recipe Repositories - Data access layer for recipe and recipe-ingredient management
 * 
 * This module contains two repository classes that handle database operations for recipes and 
 * recipe-ingredient relationships:
 * 
 * RecipeRepository:
 * - Provides CRUD operations for recipes
 * - Handles recipe analytics and statistics
 * - Supports user-scoped recipe queries
 * - Manages recipe relationships with ingredients
 * 
 * RecipeIngredientsRepository:
 * - Manages many-to-many relationships between recipes and ingredients
 * - Handles ingredient assignment and validation
 * - Supports transactional operations for data consistency
 * 
 * Features:
 * - Full CRUD operations with transaction support
 * - Recipe analytics including profit margins and food costs
 * - Complex queries with nested ingredient relationships
 * - Ingredient existence validation and smart assignment
 * - Comprehensive error handling with proper error propagation
 */

import { DBRecipe, Recipe, RecipeIngredients } from "@/shemas/recipe";
import { IRecipeIngredientsRepository, IRecipeRepository, RecipeAnalytics } from "@/types/repositories";
import { db } from "@/db/db";
import { eq, and, avg, countDistinct } from "drizzle-orm";
import { Database, recipesTable, recipeIngredientsTable } from "@/db/schema";
import { transformRecipeFromDB } from "../services/helpers";
import { checkIfRecipeExists } from "@/db/helpers";
import { transformRecipeToDB } from "../services/helpers";
import { revalidatePath } from "next/cache";
import { checkIfIngredientExists } from "@/db/helpers";
import { RecipeWithQuery } from "@/types/specialTypes";

export class RecipeRepository implements IRecipeRepository {

    /**
     * Finds a recipe by its ID with nested ingredient relationships
     * @param {string} id - The ID of the recipe to fetch
     * @returns {Promise<RecipeWithQuery | undefined>} Recipe with nested ingredients or undefined if not found
     * @throws {Error} When database operation fails
     */
    async findById(id: string): Promise<RecipeWithQuery | undefined> {
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
            });

            return recipe;
        } catch (err) {
            console.error("Failed to fetch recipe by ID:", err);
            throw new Error(`RecipeRepository.findById: Failed to fetch recipe with ID ${id}: ${err}`);
        }
    }

    /**
     * Finds all recipes that contain a specific ingredient
     * @param {string} id - The ID of the ingredient to search for
     * @returns {Promise<DBRecipe[] | undefined>} Array of recipes containing the ingredient
     * @throws {Error} When database operation fails
     */
    async findAllByIngredientId(id: string): Promise<DBRecipe[] | undefined> {
        try {
            const recipes = await db
                .select()
                .from(recipesTable)
                .innerJoin(recipeIngredientsTable, eq(recipesTable.id, recipeIngredientsTable.recipeId))
                .where(eq(recipeIngredientsTable.ingredientId, id));

            return recipes.map((recipe) => recipe.recipes);
        } catch (err) {
            console.error("Failed to fetch recipes by ingredient ID:", err);
            throw new Error(`RecipeRepository.findAllByIngredientId: Failed to fetch recipes for ingredient ${id}: ${err}`);
        }
    }

    /**
     * Retrieves all recipes for a specific user
     * @param {string} userId - The ID of the user whose recipes to fetch
     * @returns {Promise<Recipe[] | undefined>} Array of user's recipes or empty array on error
     * @throws {Error} When database operation fails
     */
    async findAll(userId: string): Promise<Recipe[] | undefined> {
        try {
            const dbRecipes = await db
                .select()
                .from(recipesTable)
                .where(eq(recipesTable.userId, userId));

            const recipes = dbRecipes.map((dbRecipe) => transformRecipeFromDB(dbRecipe));
            return recipes;
        } catch (err) {
            console.error("Failed to fetch recipes:", err);
            throw new Error(`RecipeRepository.findAll: Failed to fetch recipes for user ${userId}: ${err}`);
        }
    }

    /**
     * Creates a new recipe if it doesn't already exist
     * @param {Recipe} recipe - The recipe data to create
     * @param {Database} tx - Transaction object for atomic operations
     * @returns {Promise<string | undefined>} The created recipe's ID or undefined if already exists/error
     * @throws {Error} When database operation fails
     */
    async create(recipe: Recipe, tx: Database): Promise<string | undefined> {
        try {
            const foundRecipe = await checkIfRecipeExists(recipe.title, recipe.userId);
            
            if (foundRecipe) {
                if (foundRecipe.length === 0) {
                    const transformedRecipe = transformRecipeToDB(recipe);
                    const [recipeReceipt] = await tx
                        .insert(recipesTable)
                        .values(transformedRecipe)
                        .returning({
                            returnedId: recipesTable.id
                        });

                    return recipeReceipt.returnedId;
                } else {
                    console.log("Recipe already exists with title:", recipe.title);
                    return undefined;
                }
            }
        } catch (err) {
            console.error("Failed to create recipe:", err);
            throw new Error(`RecipeRepository.create: Failed to create recipe '${recipe.title}': ${err}`);
        }
    }

    /**
     * Updates an existing recipe
     * @param {string} id - The ID of the recipe to update
     * @param {Recipe} recipe - The updated recipe data
     * @param {Database} [tx] - Optional transaction object for atomic operations
     * @returns {Promise<{id: string} | undefined>} The updated recipe's ID or undefined on error
     * @throws {Error} When database operation fails
     */
    async update(id: string, recipe: Recipe, tx?: Database): Promise<{id: string} | undefined> {
        const dbConnection = tx || db;
        const recipeToDB = transformRecipeToDB(recipe);

        try {
            const [response] = await dbConnection
                .update(recipesTable)
                .set(recipeToDB)
                .where(eq(recipesTable.id, id))
                .returning({
                    id: recipesTable.id
                });

            return response;
        } catch (err) {
            console.error("Failed to update recipe:", err);
            throw new Error(`RecipeRepository.update: Failed to update recipe with ID ${id}: ${err}`);
        }
    }

    /**
     * Deletes a recipe from the database
     * @param {string} id - The ID of the recipe to delete
     * @param {Database} tx - Transaction object for atomic operations
     * @returns {Promise<{id: string} | undefined>} The deleted recipe's ID or undefined on error
     * @throws {Error} When database operation fails
     */
    async delete(id: string, tx: Database): Promise<{id: string} | undefined> {
        try {
            const [deleteReceipt] = await tx
                .delete(recipesTable)
                .where(eq(recipesTable.id, id))
                .returning({
                    id: recipesTable.id
                });

            revalidatePath('/recipes');
            return deleteReceipt;
        } catch (err) {
            console.error("Failed to delete recipe:", err);
            throw new Error(`RecipeRepository.delete: Failed to delete recipe with ID ${id}: ${err}`);
        }
    }

    /**
     * Retrieves analytics data for recipes belonging to a specific user
     * @param {string} userId - The ID of the user to get analytics for
     * @returns {Promise<RecipeAnalytics | undefined>} Analytics data including averages and counts
     * @throws {Error} When database operation fails
     */
    async getRecipesAnalytics(userId: string): Promise<RecipeAnalytics | undefined> {
        try {
            const [recipeAnalytics] = await db 
                .select({
                    avgProfitMargin: avg(recipesTable.profitMargin),
                    avgFoodCost: avg(recipesTable.foodCost),
                    totalRecipes: countDistinct(recipesTable.id)
                })
                .from(recipesTable)
                .where(eq(recipesTable.userId, userId));

            return recipeAnalytics;
        } catch (err) {
            console.error("Failed to get recipe analytics:", err);
            throw new Error(`RecipeRepository.getRecipesAnalytics: Failed to get analytics for user ${userId}: ${err}`);
        }
    }
}

export class RecipeIngredientsRepository implements IRecipeIngredientsRepository {

    /**
     * Creates a recipe-ingredient relationship with smart ingredient assignment
     * @param {RecipeIngredients} recipeIngredient - The recipe-ingredient data to create
     * @param {string} userId - The ID of the user creating the relationship
     * @param {Database} tx - Transaction object for atomic operations
     * @returns {Promise<{id: string | null}>} The assigned ingredient ID
     * @throws {Error} When database operation fails
     */
    async create(recipeIngredient: RecipeIngredients, userId: string, tx: Database): Promise<{id: string | null}> {
        try {
            const foundIngredient = await checkIfIngredientExists(recipeIngredient.name, userId);
            let assignedId;

            if (foundIngredient && foundIngredient.name === recipeIngredient.name) {
                assignedId = foundIngredient.id;
            } else {
                assignedId = recipeIngredient.ingredientId;
            }

            const dbConnection = tx || db;

            const [ingredient] = await dbConnection
                .insert(recipeIngredientsTable)
                .values({
                    recipeId: recipeIngredient.recipeId,
                    ingredientId: assignedId,
                    quantity: recipeIngredient.quantity.toString()
                })
                .returning({
                    ingredientId: recipeIngredientsTable.ingredientId
                });

            return { id: ingredient.ingredientId };
        } catch (err) {
            console.error("Failed to create recipe-ingredient relationship:", err);
            throw new Error(`RecipeIngredientsRepository.create: Failed to create relationship for recipe ${recipeIngredient.recipeId}: ${err}`);
        }
    }

    /**
     * Deletes a recipe-ingredient relationship
     * @param {string} recipeId - The ID of the recipe
     * @param {string} ingredientId - The ID of the ingredient
     * @param {Database} [tx] - Optional transaction object for atomic operations
     * @returns {Promise<{ ingredientId: string | null } | undefined>} The removed ingredient ID or undefined on error
     * @throws {Error} When database operation fails
     */
    async delete(recipeId: string, ingredientId: string, tx?: Database): Promise<{ ingredientId: string | null } | undefined> {
        const dbConnection = tx || db;

        try {
            const [removedIngredient] = await dbConnection
                .delete(recipeIngredientsTable)
                .where(
                    and(
                        eq(recipeIngredientsTable.recipeId, recipeId),
                        eq(recipeIngredientsTable.ingredientId, ingredientId)
                    )
                )
                .returning();

            return {
                ingredientId: removedIngredient.ingredientId
            };
        } catch (err) {
            console.error("Failed to delete ingredient from recipe:", err);
            throw new Error(`RecipeIngredientsRepository.delete: Failed to remove ingredient ${ingredientId} from recipe ${recipeId}: ${err}`);
        }
    }
}