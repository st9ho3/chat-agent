
import React from 'react'
import { transformIngredientFromDB } from '@/app/services/helpers'
import { IngredientModal } from '@/app/constants/components'
import { IngredientService } from '@/app/services/ingredientService'
import { RecipeRepository } from '@/app/repositories/recipeRepository'

const IngredientEditPage = async ({params}: {params: Promise<{id: string}>} ) => {

  const service = new IngredientService()
  const repository = new RecipeRepository()
    const {id} = await params

    
  const ingredient = await service.findById(id)

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className={`relative w-full max-w-fit p-9 mx-4 transform transition-all duration-300 bg-white rounded-2xl shadow-xl`}>
        <IngredientModal mode='edit' ingredient={ingredient} />
      </div>
    </div>
  )
}

export default IngredientEditPage
