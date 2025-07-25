import { uid } from "uid";
import { FormFields } from "../components/recipes/recipeForm";
import { RecipeIngredients, RecipeIngredientsSchema, RecipeSchema } from "@/shemas/recipe";
import { NextRequest } from "next/server";
import { IngredientEditAction } from "@/types/context";
import { getTotalPrice } from "./helpers";

export const createMessage = (text: string, user: string) => {
  const message = {
    id: uid(),
    message: text,
    sender: user,
    timestamp: new Date().toISOString(),
  };

  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));

  return message;
};

export const sendRecipe = async (data: FormFields, ing: RecipeIngredients[]) => {
  const dataToSend = { recipe: data, ingredients: ing };
  console.log(dataToSend)
  const res = await fetch("/api/recipes", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  });

  if (!res.ok) {
    console.log('Error 400, Please check your data');
    // You might want to throw an error here or return something to indicate failure
    // For example: throw new Error('Failed to create recipe');
  }

  const response = await res.json();

  return response;
};
export const sendRecipeToUpdate = async (data: FormFields, ing: RecipeIngredients[] | undefined, action: IngredientEditAction) => {
  
  const dataToSend = { recipe: data, ingredients: ing, action: action } ;

  console.log("data to update", dataToSend)
  const res = await fetch(`/api/edit/${data.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  });

  if (!res.ok) {
    console.log('Error 400, Please check your data');
    // You might want to throw an error here or return something to indicate failure
    // For example: throw new Error('Failed to create recipe');
  }

  const response = await res.json();

  return response;
};


export const getRecipesFromServer = async () => {
  const response = await fetch("http://localhost:3000/api/recipes");
  const recipes = await response.json();
  return recipes.body;
};

export const getRecipeFromServer = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/edit/${id}`);
  const recipe = await response.json();
  return recipe;
};


export const deleteRecipesFromServer = async (recipeId: string) => {
   await fetch("api/recipes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(recipeId)
  });
   
};

export const zodValidateDataBeforeAddThemToDatabase = async (request: any) => {
  const { recipe, ingredients } = await request
  console.log(ingredients)
  if (typeof recipe.dateCreated === 'string') {
    recipe.dateCreated = new Date(recipe.dateCreated);
  }

  const validatedRecipe = RecipeSchema.parse(recipe);
  let validatedIngredients
  if (ingredients) {
    const validatedRecipeIngredients = ingredients.map((ingredient: RecipeIngredients) => {
    const validatedIngredient = RecipeIngredientsSchema.parse(ingredient);
    return validatedIngredient;
  });
  validatedIngredients = validatedRecipeIngredients
  }
  

  return {
    validatedRecipe: validatedRecipe,
    validatedRecipeIngredients: validatedIngredients
  };
};
