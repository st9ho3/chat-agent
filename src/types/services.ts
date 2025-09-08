import { Recipe, Ingredient, RecipeIngredients, DBRecipe, DBIngredient } from '@/shemas/recipe';
import { RecipeWithQuery } from './specialTypes';
import { Database } from '@/db/schema';

export interface CreateResponse {
    recipe: string | undefined;
    }

export interface CreateRequest {
    recipe: Recipe,
    addedIngredients: RecipeIngredients[]
}

export interface IRecipeService {
    findAll(): Promise<Recipe[] | undefined>
    findById(id: string): Promise< RecipeWithQuery | undefined>
    create(request: CreateRequest): Promise<CreateResponse | undefined>
    update(id: string, recipe: Recipe, removedIngredients: RecipeIngredients[] | undefined, addedIngredients: RecipeIngredients[] | undefined): Promise<{id: string} | undefined>
    delete(id: string): Promise<{id: string} | undefined>

    updateRecipeAfterIngredientsChange(recipe: DBRecipe, dbIngredient: DBIngredient, tx?: Database): Promise<void>
}

export interface IIngredientService {
    findAll(): Promise<Ingredient[] | undefined>
    findById(id: string): Promise<Ingredient | undefined>
    create(ingredient: Ingredient): Promise<{ingredientId: string} | undefined>
    update(ingredient: Ingredient): Promise<{ingredientId: string} | undefined>
    delete(id: string): Promise<void>
}