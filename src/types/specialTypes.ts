export type RecipeIngredientFromDB = {
  id: number;
  quantity: string;
  recipeId: string;
  ingredientId: string;
  ingredients: {
    id: string;
    icon: string | null;
    name: string;
    unit: string;
    unitPrice: string;
    quantity: string;
    usage: string;
  };
};