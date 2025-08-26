import EditForm from '@/app/components/recipes/recipeForm/editForm'
import { RecipeForm } from '@/app/constants/components'
import { transformIngredientFromDB, transformRecipeFromDB, transformRecipeIngredentFromDB } from '@/app/services/helpers'
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
  const recipe: Recipe = transformRecipeFromDB(recipeRaw)

  const recipeIngredients = recipeRaw.recipeIngredients?.map((ingredient) => (transformRecipeIngredentFromDB(ingredient))) || []

  const ingredients = rawIngredients.map((ingredient) => (transformIngredientFromDB(ingredient)))

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className={`relative w-full max-w-fit p-9 mx-4 transform transition-all duration-300 bg-white rounded-2xl shadow-xl`}>
        {/* <EditForm recipe={recipe} recipeIngredients={recipeIngredients} ingredients={ingredients} /> */}
        <RecipeForm mode='edit' recipe={recipe} recipeIngredients={recipeIngredients} ingredients={ingredients} />
      </div>
    </div>
  )
}

export default EditPage