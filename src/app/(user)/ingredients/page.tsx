import IngredientsTable from '@/app/components/ingredients/ingredientsTable'

import Pagination from '@/app/components/recipes/pagination'
import { IngredientService } from '@/app/services/ingredientService'
import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
export const dynamic = "force-dynamic"

const ingredientsPage = async() => {

  const session = await auth()
    
    if (!session?.user) {
      redirect("/signin")
    }

  const service = new IngredientService()

  const rawIngredients = session.user.id && await service.findAll(session.user.id)
  const ingredients = rawIngredients ? rawIngredients.map((ingredient) => {
    return ingredient
  }) : []


  return (
    <div className='relative w-full h-screen px-2 md:px-5 bg-white'>
      
      <IngredientsTable items={ingredients} />
      <Pagination items={ingredients} />
    </div>
  )
}

export default ingredientsPage
