
import { Database } from '@/db/schema';
import { Recipe, Ingredient, RecipeIngredients, DBIngredient } from '@/shemas/recipe';

export interface IRecipeRepository {
  findById(id: string): Promise<Recipe | undefined>;
  findAll(): Promise<Recipe[] | undefined>;
  create(recipe: Recipe, tx: Database): Promise<string | undefined>;
  update(id: string, recipe: Recipe): Promise<{id: string} | undefined>;
  delete(id: string): Promise<{id: string} | undefined>;
  
}
export interface IRecipeIngredientsRepository {
  create(recipeIngredient: RecipeIngredients, tx: Database): Promise<{id: string | null} >;
  delete(recipeId: string, ingredientId: string, tx?: Database): Promise<{ingredientId: string | null} | undefined>  
}

export interface IIngredientRepository {
  findById(id: string): Promise<Ingredient | undefined>;
  findAll(): Promise<Ingredient[]>;
  create(ingredient: DBIngredient): Promise<{ingredientId: string} | undefined>;
  update(ingredient: DBIngredient): Promise<{ingredientId: string} | undefined>;
  delete(id: string): Promise<{ingredientId: string} | undefined>;
  updateUsage(id: string, tx: Database, action: "+" | "-"): Promise<undefined>
  
}