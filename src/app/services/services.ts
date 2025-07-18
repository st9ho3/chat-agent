import { uid } from "uid";
import { FormFields } from "../components/recipes/recipeForm";
import { RecipeIngredients, RecipeIngredientsSchema, RecipeSchema  } from "@/shemas/recipe";
import { NextRequest } from "next/server";
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
  
    const dataToSend = {recipe: data, ingredients: ing}
    
    const res = await fetch("server/API/recipes", {
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

    return response

};

export const getRecipesFromServer = async () => {
  const response = await fetch("http://localhost:3000/server/API/recipes")
  const recipes = await response.json()
  console.log("recipes in client", recipes.body)
  return recipes.body
}

export const deleteRecipesFromServer = async (recipeId: string) => {
  const response = await fetch("server/API/recipes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(recipeId)
  })
  
  const resMessage = response.json()
  const message = await resMessage
  console.log(message.message)
}

export const zodValidateDataBeforeAddThemToDatabase = async(request: NextRequest) => {
  const {recipe, ingredients} = await request.json();

  if (typeof recipe.dateCreated === 'string') {
      recipe.dateCreated = new Date(recipe.dateCreated);
  }

  const validatedRecipe = RecipeSchema.parse(recipe);

  const validatedRecipeIngredients = ingredients.map((ingredient: RecipeIngredients) => {
      const validatedIngredient = RecipeIngredientsSchema.parse(ingredient)
      return validatedIngredient
  });

  return {
    validatedRecipe: validatedRecipe,
    validatedRecipeIngredients: validatedRecipeIngredients
  }
}