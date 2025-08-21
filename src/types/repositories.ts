
import { Database } from '@/db/schema';
import { Recipe, Ingredient, RecipeIngredients } from '@/shemas/recipe';

export interface IRecipeRepository {
  findById(id: string): Promise<Recipe | undefined>;
  findAll(): Promise<Recipe[] | undefined>;
  create(recipe: Recipe, tx: Database): Promise<string | undefined>;
  update(id: string, recipe: Recipe): Promise<{id: string} | []>;
  delete(id: string): Promise<{id: string} | undefined>;
  
}
export interface IRecipeIngredientsRepository {
  create(recipeIngredient: RecipeIngredients, tx: Database): Promise<{id: string | null} >;  
}

export interface IIngredientRepository {
  findById(id: string): Promise<Ingredient | undefined>;
  findAll(): Promise<Ingredient[]>;
  create(ingredient: Ingredient): Promise<{ingredientId: string} | undefined>;
  update(id: string, ingredient: Ingredient): Promise<{ingredientId: string} | undefined>;
  delete(id: string): Promise<{ingredientId: string} | undefined>;
  updateUsage(id: string, tx: Database, action: "+" | "-"): Promise<undefined>
  
}