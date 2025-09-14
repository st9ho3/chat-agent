"use client"
import React from 'react'
import { Ingredient } from '@/shemas/recipe'
import { ExitButton, IngredientForm } from '@/app/constants/components'

interface Props {
  mode: 'create' | 'edit'
  ingredient: Ingredient | undefined
  userId: string
}

const IngredientModal = ({ingredient, mode, userId}: Props) => {

  return (
    <div>
      <ExitButton />
      <IngredientForm mode={mode} ingredient={ingredient} userId={userId} />
    </div>
  )
}

export default IngredientModal
