import { Recipe, RecipeIngredients } from "@/shemas/recipe";
import { IRecipeIngredientsRepository, IRecipeRepository } from "@/types/repositories";
import { db } from "@/db/db";
import { eq, and } from "drizzle-orm";
import { Database, recipesTable, recipeIngredientsTable } from "@/db/schema";
import { transformRecipeFromDB } from "../services/helpers";
import { checkIfRecipeExists } from "@/db/helpers";
import { transformRecipeToDB } from "../services/helpers";
import { revalidatePath } from "next/cache";
import { checkIfIngredientExists } from "@/db/helpers";
import { RecipeWithQuery } from "@/types/specialTypes";


export class RecipeRepository implements IRecipeRepository {

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
                // Need to define the type for the return type: Recipe with nested {ingredients}
                return recipe
            } catch (err) {
                console.log("Error fetching recipe ------->", err);
            }
    }

    async findAll(): Promise<Recipe[] | undefined> {
        try {
        const dbRecipes = await db
            .select()
            .from(recipesTable);

        const recipes =  dbRecipes.map((dbRecipe) => transformRecipeFromDB(dbRecipe))
        return recipes
    } catch (err) {
        console.error("Failed to fetch recipes:", err);
        return [];
    }
    }

    async create(recipe: Recipe, tx: Database): Promise<string | undefined> {
        const foundRecipe = await checkIfRecipeExists(recipe.title);
          if (foundRecipe) {
            if (foundRecipe.length === 0) {
              const transformedRecipe = transformRecipeToDB(recipe)
              const recipereceipt = await tx
                .insert(recipesTable)
                .values(transformedRecipe)
                .returning({
                  returnedId: recipesTable.id
                });
        
              return recipereceipt[0].returnedId;
            } else {
              console.log("Recipe already exists");
              return;
            }
          }
    }

    async update(id: string, recipe: Recipe): Promise<{id: string} | undefined> {
      const recipeToDB = transformRecipeToDB(recipe)
        try {
        const [response] = await db
            .update(recipesTable)
            .set(recipeToDB)
            .where(eq(recipesTable.id, id))
            .returning({
                id: recipesTable.id
            });

        return response;
    } catch (err) {
        console.error("Failed to update recipe:", err);
        return
    }
    }

    async delete(id: string): Promise<{id: string} | undefined> {
         try {
                const [deletereceipt] = await db
                    .delete(recipesTable)
                    .where(eq(recipesTable.id, id))
                    .returning({
                        id: recipesTable.id
                    });
                revalidatePath('/recipes')
                return deletereceipt
                
            } catch (err) {
                console.error("Failed to delete recipe:", err);
            }
    }

}

export class RecipeIngredientsRepository implements IRecipeIngredientsRepository {

    async create(recipeIngredient: RecipeIngredients, tx: Database): Promise<{id: string | null}> {
        const foundIngredient = await checkIfIngredientExists(recipeIngredient.name);
          let assignedId;
        
          if (foundIngredient && foundIngredient.name === recipeIngredient.name) {
            assignedId = foundIngredient.id;
          } else {
            assignedId = recipeIngredient.ingredientId;
          }
          
          const dbConnection = tx || db
        
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
        
          return {id: ingredient.ingredientId}
    }

    async delete(recipeId: string, ingredientId: string, tx?: Database): Promise<{ ingredientId: string | null } | undefined> {
      const dbConnection = tx || db
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
                  }
          } catch (err) {
              console.error("Failed to delete ingredient from recipe:", err);
              return
          }
    }
}

