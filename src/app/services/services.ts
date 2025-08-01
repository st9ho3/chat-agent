import { uid } from "uid";
import { FormFields } from "../components/recipes/recipeForm";
import { Ingredient, IngredientSchema, Recipe, RecipeIngredients, RecipeIngredientsSchema, RecipeSchema } from "@/shemas/recipe";
import { IngredientEditAction, RecipeUpdatePayload } from "@/types/context";

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

export const sendRecipe = async (data: Recipe, ing: RecipeIngredients[]) => {
  const dataToSend = { recipe: data, ingredients: ing };
  const res = await fetch("/api/recipes", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  });

  if (!res.ok) {
    // You might want to throw an error here or return something to indicate failure
    // For example: throw new Error('Failed to create recipe');
  }

  const response = await res.json();
  return response;
};

export const sendRecipeToUpdate = async (data: FormFields, ing: RecipeIngredients[] | undefined, action: IngredientEditAction) => {
  const dataToSend = { recipe: data, ingredients: ing, action: action };
  const res = await fetch(`/api/edit/${data.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  });

  if (!res.ok) {
     // You might want to throw an error here or return something to indicate failure
    // For example: throw new Error('Failed to update recipe');
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

export const sendIngredient = async (ingredient: Ingredient) => {
  const res = await fetch("/api/ingredients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ingredient)
  })
  const response = await res.json()
  console.log("This is the respons on the sendIngredient",response)
}

export const updateIngredient = async (ingredient: Ingredient) => {
  const res = await fetch(`/api/ingredients/edit/${ingredient.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ingredient)
  })

  if (!res.ok) {
    console.log("An error occured, ", res.status, res.statusText);
    
  } else {
    const response = await res.json()
    console.log("The response from updating the ingredient on the client, ", response)
    return response
  }
}

export const deleteIngredient = async (id: string) => {
  console.log(id)
  await fetch("/api/ingredients", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  })
}

export const zodValidateDataBeforeAddThemToDatabase = async (request: RecipeUpdatePayload) => {
  const { recipe, ingredients } = await request;

  if (typeof recipe.dateCreated === 'string') {
    recipe.dateCreated = new Date(recipe.dateCreated);
  }

  const validatedRecipe = RecipeSchema.parse(recipe);
  let validatedIngredients;

  if (ingredients) {
    const validatedRecipeIngredients = ingredients.map((ingredient: RecipeIngredients) => {
      const validatedIngredient = RecipeIngredientsSchema.parse(ingredient);
      return validatedIngredient;
    });
    validatedIngredients = validatedRecipeIngredients;
  }

  return {
    validatedRecipe: validatedRecipe,
    validatedRecipeIngredients: validatedIngredients
  };
};

export const zodValidateIngredientBeforeAddItToDatabase = async (request: Ingredient) => {
  const ingredient = await request

  if (ingredient) {
      const validatedIngredient = IngredientSchema.parse(ingredient)
      console.log("Zod validated ingredient: ",validatedIngredient)
      return validatedIngredient;
    }
};