import { uid } from "uid";
import { FormFields } from "../components/recipes/recipeForm";

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

export const createRecipe = async(data: FormFields) => {

  const res = await fetch("server/API/recipes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      console.log('Error 400, Please check your data')
    }
    const response = await res.json()

    console.log(response)
}