
import { Database } from '@/db/schema';
import { Recipe, Ingredient, RecipeIngredients, DBIngredient, DBRecipe } from '@/shemas/recipe';
import { RecipeWithQuery } from './specialTypes';

export interface IRecipeRepository {
  findById(id: string): Promise<RecipeWithQuery | undefined>;
  findAllByIngredientId(id: string): Promise<DBRecipe[] | undefined>;
  findAll(userId: string): Promise<Recipe[] | undefined>;
  create(recipe: Recipe, tx: Database): Promise<string | undefined>;
  update(id: string, recipe: Recipe, tx?: Database): Promise<{id: string} | undefined>;
  delete(id: string, tx: Database): Promise<{id: string} | undefined>;
  
}
export interface IRecipeIngredientsRepository {

  create(recipeIngredient: RecipeIngredients, userId: string, tx: Database): Promise<{id: string | null} >;
  delete(recipeId: string, ingredientId: string, tx?: Database): Promise<{ingredientId: string | null} | undefined>  
}

export interface IIngredientRepository {
  findById(id: string): Promise<Ingredient | undefined>;
  findAll(userId: string): Promise<Ingredient[] | undefined>;
  create(ingredient: DBIngredient): Promise<{ingredientId: string} | undefined>;
  update(ingredient: DBIngredient, tx?: Database): Promise<{ingredientId: string} | undefined>;
  delete(id: string): Promise<{ingredientId: string} | undefined>;
  updateUsage(id: string, tx: Database, action: "+" | "-"): Promise<undefined>
  
}