import { Database } from '@/db/schema';
import { Recipe, Ingredient, RecipeIngredients } from '@/shemas/recipe';

export interface createResponse {
    recipe: string | undefined;
    recipeIngredients: {
        id: string | null;
}[]}

export interface IRecipeService {
    create(recipe: Recipe, recipeIngredients: RecipeIngredients[]): Promise<createResponse | undefined>
}