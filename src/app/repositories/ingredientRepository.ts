/**
 * @fileoverview IngredientRepository - Data access layer for ingredient management
 * 
 * This repository class provides CRUD operations and analytics for ingredients in the recipe system.
 * It implements the IIngredientRepository interface and handles all database interactions
 * for ingredient-related operations including creation, retrieval, updates, deletion,
 * usage tracking, and analytics generation.
 * 
 * Features:
 * - Full CRUD operations for ingredients
 * - User-scoped ingredient queries
 * - Usage tracking with increment/decrement operations
 * - Ingredient analytics and statistics
 * - Transaction support for atomic operations
 * - Comprehensive error handling with proper error propagation
 */

import { DBIngredient, Ingredient } from "@/shemas/recipe";
import { IIngredientRepository, IngredientAnalytics } from "@/types/repositories";
import { db } from "@/db/db";
import { Database, ingredientsTable } from "@/db/schema";
import { transformIngredientFromDB } from "../services/helpers";
import { countDistinct, eq, sql } from "drizzle-orm";

export class IngredientRepository implements IIngredientRepository {

    /**
     * Retrieves all ingredients for a specific user
     * @param {string} userId - The ID of the user whose ingredients to fetch
     * @returns {Promise<Ingredient[] | undefined>} Array of ingredients or undefined on error
     * @throws {Error} When database operation fails
     */
    async findAll(userId: string): Promise<Ingredient[] | undefined> {
        try {
            const dbIngredients = await db
                .select()
                .from(ingredientsTable)
                .where(eq(ingredientsTable.userId, userId));

            const ingredients = dbIngredients.map((dbIngredient) => transformIngredientFromDB(dbIngredient));
            return ingredients;
        } catch (err) {
            console.error("Failed to fetch ingredients:", err);
            throw new Error(`IngredientRepository.findAll: Failed to fetch ingredients for user ${userId}: ${err}`);
        }
    }

    /**
     * Retrieves a single ingredient by its ID
     * @param {string} id - The ID of the ingredient to fetch
     * @returns {Promise<Ingredient | undefined>} The ingredient or undefined if not found/error
     * @throws {Error} When database operation fails
     */
    async findById(id: string): Promise<Ingredient | undefined> {
        try {
            const [dbIngredient] = await db
                .select()
                .from(ingredientsTable)
                .where(eq(ingredientsTable.id, id));

            if (!dbIngredient) {
                return undefined;
            }

            const ingredient = transformIngredientFromDB(dbIngredient);
            return ingredient;
        } catch (err) {
            console.error("Failed to fetch ingredient by ID:", err);
            throw new Error(`IngredientRepository.findById: Failed to fetch ingredient with ID ${id}: ${err}`);
        }
    }

    /**
     * Creates a new ingredient in the database
     * @param {DBIngredient} ingredient - The ingredient data to insert
     * @returns {Promise<{ ingredientId: string } | undefined>} The created ingredient's ID or undefined on error
     * @throws {Error} When database operation fails
     */
    async create(ingredient: DBIngredient): Promise<{ ingredientId: string } | undefined> {
        try {
            const [ingredientID] = await db
                .insert(ingredientsTable)
                .values(ingredient)
                .returning({
                    ingredientId: ingredientsTable.id
                });

            return ingredientID;
        } catch (err) {
            console.error("Failed to create ingredient:", err);
            throw new Error(`IngredientRepository.create: Failed to create ingredient: ${err}`);
        }
    }

    /**
     * Updates an existing ingredient in the database
     * @param {DBIngredient} ingredient - The ingredient data to update
     * @param {Database} [tx] - Optional transaction object for atomic operations
     * @returns {Promise<{ ingredientId: string } | undefined>} The updated ingredient's ID or undefined on error
     * @throws {Error} When database operation fails
     */
    async update(ingredient: DBIngredient, tx?: Database): Promise<{ ingredientId: string } | undefined> {
        const dbConnection = tx || db;

        try {
            const [ingredientId] = await dbConnection
                .update(ingredientsTable)
                .set(ingredient)
                .where(eq(ingredientsTable.id, ingredient.id))
                .returning({
                    ingredientId: ingredientsTable.id
                });

            console.log("Updated ingredient ID:", ingredientId);
            return ingredientId;
        } catch (err) {
            console.error("Failed to update ingredient:", err);
            throw new Error(`IngredientRepository.update: Failed to update ingredient with ID ${ingredient.id}: ${err}`);
        }
    }

    /**
     * Deletes an ingredient from the database
     * @param {string} id - The ID of the ingredient to delete
     * @returns {Promise<{ ingredientId: string } | undefined>} The deleted ingredient's ID or undefined on error
     * @throws {Error} When database operation fails
     */
    async delete(id: string): Promise<{ ingredientId: string } | undefined> {
        try {
            const [ingredientId] = await db
                .delete(ingredientsTable)
                .where(eq(ingredientsTable.id, id))
                .returning({
                    ingredientId: ingredientsTable.id
                });

            return ingredientId;
        } catch (err) {
            console.error("Failed to delete ingredient:", err);
            throw new Error(`IngredientRepository.delete: Failed to delete ingredient with ID ${id}: ${err}`);
        }
    }

    /**
     * Updates the usage count of an ingredient (increment or decrement)
     * @param {string} id - The ID of the ingredient to update usage for
     * @param {Database} tx - Transaction object for atomic operations
     * @param {"+" | "-"} action - Whether to increment (+) or decrement (-) the usage count
     * @returns {Promise<undefined>} Nothing returned, operation is fire-and-forget
     * @throws {Error} When database operation fails
     */
    async updateUsage(id: string, tx: Database, action: "+" | "-"): Promise<undefined> {
        try {
            await tx
                .update(ingredientsTable)
                .set({
                    usage: action === "+" ? sql`${ingredientsTable.usage} + 1` : sql`${ingredientsTable.usage} - 1`
                })
                .where(eq(ingredientsTable.id, id));
        } catch (err) {
            console.error("Failed to update ingredient usage:", err);
            throw new Error(`IngredientRepository.updateUsage: Failed to update usage for ingredient ${id}: ${err}`);
        }
    }

    /**
     * Retrieves analytics data for ingredients belonging to a specific user
     * @param {string} userId - The ID of the user to get analytics for
     * @returns {Promise<IngredientAnalytics | undefined>} Analytics data or undefined on error
     * @throws {Error} When database operation fails
     */
    async getIngredientAnalytics(userId: string): Promise<IngredientAnalytics | undefined> {
        try {
            const [ingredientAnalytics] = await db
                .select({
                    totalIngredients: countDistinct(ingredientsTable.id)
                })
                .from(ingredientsTable)
                .where(eq(ingredientsTable.userId, userId));

            return ingredientAnalytics;
        } catch (err) {
            console.error("Failed to get ingredient analytics:", err);
            throw new Error(`IngredientRepository.getIngredientAnalytics: Failed to get analytics for user ${userId}: ${err}`);
        }
    }
}