"use client"
import React from 'react'
import { Ingredient } from '@/shemas/recipe'
import { sendIngredient } from '@/app/services/services'
import { useRouter } from 'next/navigation'
import { ExitButton, IngredientForm } from '@/app/constants/components'

interface Props {
  mode: 'create' | 'edit'
  ingredient: Ingredient
}

const IngredientModal = ({ingredient, mode}: Props) => {

  const router = useRouter()

  const addIngredient = async (ingredient: Ingredient) => {
    console.log("addIngredient: ", ingredient)
    await sendIngredient(ingredient)
    router.replace("/ingredients")
  }

  return (
    <div>
      <ExitButton />
      <IngredientForm mode={mode} ingredient={ingredient} onAddIngredient={addIngredient} />
    </div>
  )
}

export default IngredientModal
