import EditForm from '@/app/components/recipes/recipeForm/editForm'
import { getIngredients, getRecipeById } from '@/db/read'
import { Recipe } from '@/shemas/recipe'
import React from 'react'

interface Params {
  params: Promise<{
    id: string
  }>
}

// Correctly type and destructure the params prop
const EditPage = async ({params}: Params ) => {
  // Directly access the id from the destructured params
  
    const { id } = await params;
  
  
  const recipeRaw = await getRecipeById(id)
  const rawIngredients = await getIngredients()

  if (!recipeRaw) {
    return <div>Recipe not found</div>
  }

  // Create the recipe object without recipeIngredients
  const recipe: Recipe = {
    category: recipeRaw.category,
    createdBy: recipeRaw.createdBy,
    dateCreated: new Date(recipeRaw.dateCreated),
    id: recipeRaw.id,
    imgPath: recipeRaw.imgPath ?? undefined,
    title: recipeRaw.title,
    totalCost: Number(recipeRaw.totalCost),
    tax: Number(recipeRaw.tax)
  }

  const recipeIngredients = recipeRaw.recipeIngredients?.map((ingredient) => ({
    ingredientId: ingredient.ingredientId || '',
    name: ingredient.ingredients?.name || 'Unknown Ingredient',
    unit: ingredient.ingredients?.unit || 'unit',
    unitPrice: Number(ingredient.ingredients?.unitPrice),
    quantity: Number(ingredient.quantity) || 0,
    iconBgColor: '',
    recipeId: ingredient.recipeId || '',
    
  })) || []

  const ingredients = rawIngredients.map((ingredient) => ({
    ...ingredient,
    unitPrice: Number(ingredient.unitPrice),
    quantity: Number(ingredient.quantity)
  }))

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className={`relative w-full max-w-fit p-9 mx-4 transform transition-all duration-300 bg-white rounded-2xl shadow-xl`}>
        <EditForm recipe={recipe} recipeIngredients={recipeIngredients} ingredients={ingredients} />
      </div>
    </div>
  )
}

export default EditPage