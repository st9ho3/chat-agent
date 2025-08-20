import { Recipe } from "@/shemas/recipe";
import { IRecipeRepository } from "@/types/repositories";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { Database, recipesTable } from "@/db/schema";
import { transformRecipeFromDB } from "../services/helpers";
import { checkIfRecipeExists } from "@/db/helpers";
import { transformRecipeToDB } from "../services/helpers";
import { revalidatePath } from "next/cache";


export class RecipeRepository implements IRecipeRepository {

    async findById(id: string): Promise<Recipe | undefined> {
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
                return 
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

    async update(id: string, recipe: Recipe): Promise<{id: string} | []> {
        try {
        const response = await db
            .update(recipesTable)
            .set({
                title: recipe.title,
                totalCost: String(recipe.totalCost),
                imgPath: recipe.imgPath,
                tax: recipe.tax.toString()
            })
            .where(eq(recipesTable.id, id))
            .returning({
                id: recipesTable.id
            });

        return response[0];
    } catch (err) {
        console.error("Failed to update recipe:", err);
        return [];
    }
    }

    async delete(id: string): Promise<{id: string} | undefined> {
         try {
                const deletereceipt = await db
                    .delete(recipesTable)
                    .where(eq(recipesTable.id, id))
                    .returning({
                        id: recipesTable.id
                    });
                revalidatePath('/recipes')
                return deletereceipt[0]
                
            } catch (err) {
                console.error("Failed to delete recipe:", err);
            }
    }

}