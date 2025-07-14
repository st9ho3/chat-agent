"use client"
import React, { useState } from 'react'
import Incremental from '../shared/incremental'
import { Carrot, Plus, Ruler } from 'lucide-react'
import { Unit, IngredientErrors, RecipeIngredients, RecipeIngredientsSchema } from '@/shemas/recipe'
import { v4 as uuidv4 } from 'uuid';

type AddIngredientProps = {
  onAddIngredient: (value: RecipeIngredients) => void,
  recipesId: string
}

const AddIngredient = ({onAddIngredient, recipesId}: AddIngredientProps) => {

  const [quantity, setQuantity] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [unit, setUnit] = useState<Unit>('')
  const [errors, setErrors] = useState<IngredientErrors>([])


  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setName(value)
    setErrors([])
  }
  const handleUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target
    if (value === 'g' || value ==='ml' || value ==='kg' || value === 'L' ) {
      setUnit(value)
      setErrors([])
    }
  }

  const addIngredient = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSelectElement>) => {
    e.preventDefault()

    const id = uuidv4()

    const ingredient: RecipeIngredients = {
      recipeId: recipesId.toString(),
      ingredientId: id,
      iconBgColor: 'bg-yellow-100',
      name: name,
      unit: unit,
      quantity: quantity
    }
    const validatedIngredient = RecipeIngredientsSchema.safeParse(ingredient)
    
    if (!validatedIngredient.success) {

      setErrors([])
      const zodErrors = validatedIngredient.error.errors
      zodErrors.forEach((error) => setErrors(prev => [...prev, error.message]))

    } else {
      
      onAddIngredient(validatedIngredient.data)

      setQuantity(0)
      setName('')
      setUnit('')
      setErrors([])
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === "Enter") {
      addIngredient(e)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center border-1 border-gray-300 border-dashed rounded-lg space-x-3 p-2 my-2">
        <div className='flex items-center space-x-3 p-2' >

          <Incremental onChange={setQuantity} count={quantity} onKeyDown={handleKeyDown} setErrors={setErrors} />
          <div className='flex items-center border-1 border-gray-300 border-dashed rounded-lg space-x-3 p-1'>
            <Ruler />
            <select
              name="unit"
              id="unit"
              value={unit}
              className="block w-20 p-2 text-lg focus:outline-none bg-white text-gray-800"
              onChange={handleUnit}
              onKeyDown={handleKeyDown}
            >
              <option value="">Unit</option>
              <option value="kg">kg</option>
              <option value="L">L</option>
              <option value="g">g</option>
              <option value="ml">ml</option>
            </select>
          </div>
        </div >
        <div className='flex items-center border-1 border-gray-300 border-dashed rounded-lg space-x-3 p-1' >
          <Carrot />
          {/* Ingredient Name Input */}
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleName}
            onKeyDown={handleKeyDown}
            className="w-30 p-1 text-lg placeholder:text-gray-500 focus:outline-none"
            placeholder="Ingredient"
          />
        </div>
        <button type='button' onClick={addIngredient} className='border border-gray-400 border-dashed rounded-md w-fit p-2 hover:bg-green-50 transition-colors duration-200'><Plus /></button>
      </div>

      {errors.length > 0 && errors.map((err) => <p key={err} className='text-red-500 ml-3'> {err} </p> )}
    </div>
  )
}

export default AddIngredient
