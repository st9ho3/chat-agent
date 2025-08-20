
import { Database } from '@/db/schema';
import { Recipe, Ingredient } from '@/shemas/recipe';

export interface IRecipeRepository {
  findById(id: string): Promise<Recipe | undefined>;
  findAll(): Promise<Recipe[] | undefined>;
  create(recipe: Recipe, tx: Database): Promise<string | undefined>;
  update(id: string, recipe: Recipe): Promise<{id: string} | []>;
  delete(id: string): Promise<{id: string} | undefined>;
  
}

export interface IIngredientRepository {
  findById(id: string): Promise<Ingredient | null>;
  findAll(limit?: number, offset?: number): Promise<Ingredient[]>;
  findByName(name: string): Promise<Ingredient[]>;
  create(ingredient: Ingredient): Promise<Ingredient>;
  update(id: string, ingredient: Ingredient): Promise<Ingredient | null>;
  delete(id: string): Promise<boolean>;
  
}