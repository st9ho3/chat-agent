"use client"
import React from 'react'
import AddIngredient from './ingredient'
import { Ingredient } from '@/shemas/recipe'
import { sendIngredient } from '@/app/services/services'
import { useRouter } from 'next/navigation'

const IngredientsForm = () => {

  const router = useRouter()

    const addIngredient = async (ingredient: Ingredient) => {
      await sendIngredient(ingredient)
      router.replace("/ingredients")
    }

  return (
    <form>
      <AddIngredient onAddIngredient={addIngredient}/>
    </form>
  )
}

export default IngredientsForm
