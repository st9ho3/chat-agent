"use client"
import React, { useState } from 'react'
import Incremental from '../shared/incremental'
import { Carrot, Plus, Scale, Euro } from 'lucide-react'
import { Unit, RecipeIngredients, RecipeIngredientsSchema } from '@/shemas/recipe'
import { v4 as uuidv4 } from 'uuid';

type IngredientErrors = string[]

type AddIngredientProps = {
  onAddIngredient: (value: RecipeIngredients) => void,
  recipesId: string
}

const AddIngredient = ({onAddIngredient, recipesId}: AddIngredientProps) => {

  const [quantity, setQuantity] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [unit, setUnit] = useState<Unit>('')
  const [price, setPrice] = useState<number>(0)

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [errors, setErrors] = useState<IngredientErrors>([])


  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setName(value)
    setErrors([])
  }
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setPrice(Number(value))
    setErrors([])
  }

  const handleFocus = () => {
    setIsEditing(true)
  }
  const handleBlur = () => {
    if (price === 0) {
      setIsEditing(false)
    }
  }
  const displayedPrice = isEditing && price === 0 ? " " : price

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
      unitPrice: price,
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
      setPrice(0)
      setErrors([])
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === "Enter") {
      addIngredient(e)
    }
  }

  return (
    <div className="p-2">
      {/* Container for all inputs on one line */}
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg">
        
        {/* Ingredient Name */}
        <div className='flex items-center p-1 space-x-3 border-dashed rounded-lg border-1 border-gray-300' >
          <Carrot />
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleName}
            onKeyDown={handleKeyDown}
            className="p-1 text-lg placeholder:text-gray-500 w-36 focus:outline-none"
            placeholder="Ingredient Name"
          />
        </div>

        {/* Price */}
        <div className='flex items-center p-1 space-x-3 border-dashed rounded-lg border-1 border-gray-300' >
          <Euro />
          <input
            name='price'
            type='number'
            value={displayedPrice}
            className="p-1 text-lg placeholder:text-gray-500 w-20 focus:outline-none"
            placeholder="Price"
            onChange={handlePrice}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        
        {/* Quantity */}
        <Incremental onChange={setQuantity} count={quantity} onKeyDown={handleKeyDown} setErrors={setErrors} />

        {/* Unit */}
        <div className='flex items-center p-1 space-x-3 border-dashed rounded-lg border-1 border-gray-300'>
          <Scale />
          <select
            name="unit"
            id="unit"
            value={unit}
            className="block w-20 p-2 text-lg bg-white text-gray-800 focus:outline-none"
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

      </div>

      {/* Add Ingredient Button on its own line */}
      <div className="flex justify-center mt-4">
        <button 
          type='button' 
          onClick={addIngredient} 
          className='flex items-center gap-2 px-4 py-2 transition-colors duration-200 border border-gray-400 border-dashed rounded-md bg-green-100 w-fit hover:bg-green-50'
        >
          <Plus size={20} /> Add Ingredient
        </button>
      </div>

      {/* Error messages */}
      <div className="mt-2 text-center">
        {errors.length > 0 && errors.map((err) => <p key={err} className='text-red-500'> {err} </p> )}
      </div>

    </div>
  )
}
export default AddIngredient
