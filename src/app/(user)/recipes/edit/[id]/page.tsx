
import { RecipeForm } from '@/app/constants/components'
import { transformRecipeFromDB, transformRecipeIngredentFromDB } from '@/app/services/helpers'
import { IngredientService } from '@/app/services/ingredientService'
import { RecipeService } from '@/app/services/recipeService'
import { RecipeIngredientFromDB } from '@/types/specialTypes'
import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
interface Params {
  params: Promise<{
    id: string
  }>
}
const EditPage = async ({params}: Params ) => {

  const session = await auth()
    
    if (!session?.user) {
      redirect("/signin")
    }
  
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

  const rawIngredients = session.user.id && await ingredientService.findAll(session.user.id)
  const ingredients = rawIngredients ? rawIngredients : []
 
  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className={`relative w-full max-w-fit p-9 mx-4 transform transition-all duration-300 bg-white rounded-2xl shadow-xl`}>
        
        { session.user.id && <RecipeForm mode='edit' recipe={recipe} recipeIngredients={recIngredients} ingredients={ingredients} userId={session.user.id} />}
        
      </div>
    </div>
  )
}

export default EditPage