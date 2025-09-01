import RecipeForm from '@/app/components/recipes/recipeForm/recipeForm'
import { IngredientService } from '@/app/services/ingredientService'
import { RecipeIngredients } from '@/shemas/recipe'
import React from 'react'

const page = async () => {

  const service = new IngredientService()

  const rawIngredients = await service.findAll()
  
  const ingredients = rawIngredients ? rawIngredients.map((ingredient) => {return {...ingredient, unitPrice: Number(ingredient.unitPrice), quantity: Number(ingredient.quantity)}}) : []
  const recipeIngredients: RecipeIngredients[] = []
 
  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className={`relative w-full max-w-fit p-9 mx-4 transform transition-all duration-300 bg-white rounded-2xl shadow-xl`}>
        <RecipeForm mode='create' recipeIngredients={recipeIngredients} ingredients={ingredients} />
      </div>
    </div>
  )
}

export default page
