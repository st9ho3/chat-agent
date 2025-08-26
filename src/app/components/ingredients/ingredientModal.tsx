"use client"
import React from 'react'
import { Ingredient } from '@/shemas/recipe'
import { sendIngredient } from '@/app/services/services'
import { useRouter } from 'next/navigation'
import { ExitButton, IngredientForm } from '@/app/constants/components'

interface Props {
  mode: 'create' | 'edit'
  ingredient: Ingredient | undefined
}

const IngredientModal = ({ingredient, mode}: Props) => {

  return (
    <div>
      <ExitButton />
      <IngredientForm mode={mode} ingredient={ingredient}  />
    </div>
  )
}

export default IngredientModal
