import IngredientsTable from '@/app/components/ingredients/ingredientsTable'
import Header from '@/app/components/recipes/header'
import Pagination from '@/app/components/recipes/pagination'
import { getIngredients } from '@/db/read'
import React from 'react'

const ingredientsPage = async() => {

  const rawIngredients = await getIngredients()
  const ingredients = rawIngredients.map((ingredient) => {
    return {
      ...ingredient,
      unitPrice: Number(ingredient.unitPrice),
      quantity: Number(ingredient.quantity)
    }
  })


  return (
    <div className='relative w-full h-screen px-2 md:px-5 bg-white'>
      <Header />
      <IngredientsTable items={ingredients} />
      <Pagination items={ingredients} />
    </div>
  )
}

export default ingredientsPage
