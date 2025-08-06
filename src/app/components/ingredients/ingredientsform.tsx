"use client"
import React from 'react'
import AddIngredient from './ingredient'
import { Ingredient } from '@/shemas/recipe'
import { sendIngredient } from '@/app/services/services'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

const IngredientsForm = () => {

  const router = useRouter()

  const addIngredient = async (ingredient: Ingredient) => {
    console.log("addIngredient: ", ingredient)
    await sendIngredient(ingredient)
    router.replace("/ingredients")
  }

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-offset-2 transition-colors"
        aria-label="Close modal" >
        <X />
      </button>

      <AddIngredient onAddIngredient={addIngredient} />
    </div>
  )
}

export default IngredientsForm
