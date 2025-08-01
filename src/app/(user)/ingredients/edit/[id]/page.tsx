import EditIngredientForm from '@/app/components/ingredients/editIngredientForm'
import { getIngredientById } from '@/db/read'
import { Ingredient } from '@/shemas/recipe'
import React from 'react'

const IngredientEditPage = async ({params}: {params: Promise<{id: string}>} ) => {
    const {id} = await params

    const ingredients = await getIngredientById(id)
    const ingredient = ingredients ? ingredients[0] : undefined

    if (!ingredient) {
    return <div>Igredient not found</div>
  }

    const ingredientToEdit = {
      ...ingredient,
      unitPrice: Number(ingredient?.unitPrice),
      quantity: Number(ingredient?.quantity)
    }

    
  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className={`relative w-full max-w-fit p-9 mx-4 transform transition-all duration-300 bg-white rounded-2xl shadow-xl`}>
        <EditIngredientForm onAddIngredient={console.log("ingredient added")} ingredient={ingredientToEdit}  />
      </div>
    </div>
  )
}

export default IngredientEditPage
