
import { RecipeForm } from '@/app/constants/components'
import { transformIngredientFromDB, transformRecipeFromDB, transformRecipeIngredentFromDB } from '@/app/services/helpers'
import { IngredientService } from '@/app/services/ingredientService'
import { RecipeService } from '@/app/services/recipeService'
import { Recipe } from '@/shemas/recipe'
import { RecipeIngredientFromDB } from '@/types/specialTypes'
import React from 'react'

interface Params {
  params: Promise<{
    id: string
  }>
}
const EditPage = async ({params}: Params ) => {
  
  const recipeService = new RecipeService()
  const ingredientService = new IngredientService()
    
  const { id } = await params;
  
  const dbRecipe = await recipeService.findById(id)

  if (!dbRecipe) {
    throw new Error('recipe not found')
  }

  const {recipeIngredients, ...rawRecipe} = dbRecipe
  const recIngredients = recipeIngredients.map((ing: RecipeIngredientFromDB) => transformRecipeIngredentFromDB(ing))
  const recipe = transformRecipeFromDB(rawRecipe)

  const rawIngredients = await ingredientService.findAll()
  const ingredients = rawIngredients ? rawIngredients : []
 
  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className={`relative w-full max-w-fit p-9 mx-4 transform transition-all duration-300 bg-white rounded-2xl shadow-xl`}>
        
        <RecipeForm mode='edit' recipe={recipe} recipeIngredients={recIngredients} ingredients={ingredients} />
      </div>
    </div>
  )
}

export default EditPage