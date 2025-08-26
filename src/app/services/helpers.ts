import { DBIngredient, DBRecipe, Ingredient, Recipe, RecipeIngredients, Unit, DBRecipeIngredients } from "@/shemas/recipe";
import { RecipeIngredientFromDB } from "@/types/specialTypes";

export const paginate = <T>(itemsPerPage: number, page: number, items: T[] ): T[]=> {
    if (items.length === 0) {
      console.log('No items to display')
      return []
    }
    const indexOfFirstItem = itemsPerPage * (page - 1) 
    const indexOfLastItem = itemsPerPage * page - 1 
    
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem + 1)
    return currentItems
  } 

  export const paginationPages = (items: Recipe[] | Ingredient[], itemsPerPage: number ) => {
   
  const pages = Math.ceil(items.length / itemsPerPage);
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);
  return pageNumbers

}

export const getTotalPrice = (ingredients: RecipeIngredients[]) => {
  return ingredients.reduce((sum, item) => {
    return sum + item.unitPrice * item.quantity;
  }, 0);

}

export const normalizePrice = (price: string, unit: Unit, quantity: number): number => {
  const numericPrice = parseFloat(price);
  console.log(price)
  console.log(numericPrice)
  // Guard against invalid numbers or a quantity of 0 to prevent division by zero.
  if (isNaN(numericPrice) || quantity === 0) {
    return 0;
  }

  // Calculate the price based on the unit.
  switch (unit) {
    case 'kg':
      // For kilograms, convert to grams (1kg = 1000g) and find the price per gram.
      return numericPrice / (quantity * 1000);
    case 'g':
      // For grams, calculate the price per gram directly.
      return numericPrice / quantity;
    case 'L':
      // For liters, convert to milliliters (1L = 1000ml) and find the price per ml.
      return numericPrice / (quantity * 1000);
    case 'ml':
      // For milliliters, calculate the price per ml directly.
      return numericPrice / quantity;
    case 'piece':
      // For pieces, calculate the price per piece.
      return numericPrice / quantity;
    default:
      // If the unit is not recognized, return 0.
      return 0;
  }
};

export const transformRecipeFromDB = (recipeFromDb: DBRecipe): Recipe => ({
  ...recipeFromDb,
    totalCost: Number(recipeFromDb.totalCost),
    tax: Number(recipeFromDb.tax),
    sellingPrice: Number(recipeFromDb.sellingPrice),
    profitMargin: Number(recipeFromDb.profitMargin),
    dateCreated: new Date(recipeFromDb.dateCreated),
    imgPath: recipeFromDb.imgPath,
}) 

export const transformRecipeToDB = (recipe: Recipe): DBRecipe => ({
          ...recipe,
          totalCost: recipe.totalCost.toString(),
          dateCreated: recipe.dateCreated.toISOString().split('T')[0],
          tax: recipe.tax.toString(),
          sellingPrice: recipe.sellingPrice.toString(),
          profitMargin: recipe.profitMargin.toString()
}) 

export const transformIngredientFromDB = (ingredient: DBIngredient): Ingredient => ({
  ...ingredient,
  unitPrice: Number(ingredient.unitPrice),
  quantity: Number(ingredient.quantity)
})

export const transformIngredientToDB = (ingredient: Ingredient): DBIngredient => ({
  ...ingredient,
  unitPrice: ingredient.unitPrice.toString(),
  quantity: ingredient.quantity.toString()
})

export const transformRecipeIngredentFromDB = (
  ingredient: RecipeIngredientFromDB
): RecipeIngredients => {
  return {
    name: ingredient.ingredients.name,
    unit: ingredient.ingredients.unit,
    unitPrice: parseFloat(ingredient.ingredients.unitPrice),
    quantity: parseFloat(ingredient.quantity),
    recipeId: ingredient.recipeId,
    ingredientId: ingredient.ingredientId,
  };
};




