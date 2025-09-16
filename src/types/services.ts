import { Recipe, Ingredient, RecipeIngredients, DBRecipe, DBIngredient } from '@/shemas/recipe';
import { RecipeWithQuery } from './specialTypes';
import { Database } from '@/db/schema';
import { RecipeAnalytics } from './repositories';

export interface CreateResponse {
    recipe: string | undefined;
    }

export interface CreateRequest {
    recipe: Recipe,
    addedIngredients: RecipeIngredients[]
}

export interface IRecipeService {
    findAll(userId: string): Promise<Recipe[] | undefined>
    findById(id: string): Promise< RecipeWithQuery | undefined>
    create(request: CreateRequest): Promise<CreateResponse | undefined>
    update(id: string, recipe: Recipe, removedIngredients: RecipeIngredients[] | undefined, addedIngredients: RecipeIngredients[] | undefined): Promise<{id: string} | undefined>
    delete(id: string): Promise<{id: string} | undefined>

    updateRecipeAfterIngredientsChange(recipe: DBRecipe, dbIngredient: DBIngredient, tx?: Database): Promise<void>

    getRecipesAnalytics(userId: string): Promise<RecipeAnalytics | undefined>;
}

export interface IIngredientService {
    findAll(userId: string): Promise<Ingredient[] | undefined>
    findById(id: string): Promise<Ingredient | undefined>
    create(ingredient: Ingredient): Promise<{ingredientId: string} | undefined>
    update(ingredient: Ingredient): Promise<{ingredientId: string} | undefined>
    delete(id: string): Promise<void>
}