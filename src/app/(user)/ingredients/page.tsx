import IngredientsTable from '@/app/components/ingredients/ingredientsTable'
import Header from '@/app/components/recipes/header'
import Pagination from '@/app/components/recipes/pagination'
import { IngredientService } from '@/app/services/ingredientService'
import React from 'react'

const ingredientsPage = async() => {

  const service = new IngredientService()

  const rawIngredients = await service.findAll()
  const ingredients = rawIngredients ? rawIngredients.map((ingredient) => {
    return ingredient
  }) : []


  return (
    <div className='relative w-full h-screen px-2 md:px-5 bg-white'>
      <Header />
      <IngredientsTable items={ingredients} />
      <Pagination items={ingredients} />
    </div>
  )
}

export default ingredientsPage
