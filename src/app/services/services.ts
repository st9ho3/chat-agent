import { uid } from "uid";
import { FormFields } from "../components/recipes/recipeForm";

import { Ingredient, Recipe, RecipeIngredients } from "@/shemas/recipe";
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

export const createRecipe = async (data: FormFields, ing: RecipeIngredients[]) => {
  
    const dataToSend = {recipe: data, ingredient: ing}
    
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

    console.log(response);
}; 

