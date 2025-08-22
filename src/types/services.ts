import { Database } from '@/db/schema';
import { Recipe, Ingredient, RecipeIngredients, DBIngredient } from '@/shemas/recipe';

export interface CreateResponse {
    recipe: string | undefined;
    recipeIngredients: {
        id: string | null;
}[]}

export interface CreateRequest {
    recipe: Recipe,
    addedIngredients: RecipeIngredients[]
}

export interface IRecipeService {
    create(request: CreateRequest): Promise<CreateResponse | undefined>
    update(id: string, recipe: Recipe, removedIngredients: RecipeIngredients[] | undefined, addedIngredients: RecipeIngredients[] | undefined): Promise<{id: string} | undefined>
    delete(id: string): Promise<{id: string} | undefined>
}

export interface IIngredientService {
    create(ingredient: Ingredient): Promise<{ingredientId: string} | undefined>
    update(ingredient: Ingredient): Promise<{ingredientId: string} | undefined>
    delete(id: string): Promise<void>
}