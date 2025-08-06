"use client"
import React, { useState } from 'react'
import Incremental from '../shared/incremental'
import { Carrot, Plus, Scale, Euro } from 'lucide-react'
import { Unit, Ingredient, IngredientSchema } from '@/shemas/recipe'
import { v4 as uuidv4 } from 'uuid';
import { normalizePrice } from '@/app/services/helpers'

type IngredientErrors = string[]

type AddIngredientProps = {
  onAddIngredient: (value: Ingredient) => void,
}

const AddIngredient = ({ onAddIngredient }: AddIngredientProps) => {

  const [quantity, setQuantity] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [unit, setUnit] = useState<Unit>('')
  const [price, setPrice] = useState<string>("0")

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [errors, setErrors] = useState<IngredientErrors>([])


  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName(value.toLowerCase())
    setErrors([])
  }

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '' || /^(\d*\.?\d*)$/.test(value)) {
      setPrice(value)
    }
    setErrors([])
  }

  const handleFocus = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  // Fixed displayedPrice logic - show empty string when editing and price is "0"
  const displayedPrice = isEditing && price === "0" ? "" : price

  const handleUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    if (value === 'g' || value === 'ml' || value === 'kg' || value === 'L' || value === "piece") {
      setUnit(value)
      setErrors([])
    }
  }

  const addIngredient = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSelectElement>) => {
    e.preventDefault()

    const id = uuidv4()

    const normalizedUnitPrice = normalizePrice(price, unit, quantity)
    console.log(normalizedUnitPrice)

    const ingredient: Ingredient = {
      id: id,
      icon: '🥑',
      name: name,
      unit: unit === "g" || unit === "kg"
        ? "g"
        : unit === "L" || unit === "ml"
          ? "ml"
          : "piece",
      unitPrice: normalizedUnitPrice,
      quantity: quantity,
      usage: "0"
    }
    const validatedIngredient = IngredientSchema.safeParse(ingredient)
    console.log("Validated ingredient on the form: ", validatedIngredient)
    if (!validatedIngredient.success) {

      setErrors([])
      const zodErrors = validatedIngredient.error.errors
      zodErrors.forEach((error) => setErrors(prev => [...prev, error.message]))

    } else {
      await onAddIngredient(validatedIngredient.data)

      setQuantity(0)
      setName('')
      setUnit('')
      setPrice("0") // Fixed: should be string "0", not number 0
      setErrors([])
      setIsEditing(false) // Reset editing state
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === "Enter") {
      addIngredient(e)
    }
  }

  return (
    <form className="p-2">

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
            type="text"
            value={displayedPrice}
            className="p-1 text-lg placeholder:text-gray-500 w-20 focus:outline-none"
            placeholder="Price"
            onKeyDown={handleKeyDown}
            onChange={handlePrice}
            onFocus={handleFocus}
            onBlur={handleBlur}
            pattern="[0-9]*[.]?[0-9]*"
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
            <option value="piece">piece</option>
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

      <div className="w-full rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 mt-3 text-center text-gray-600">
        <p className="text-lg">
          {quantity} {unit} of <span className="font-semibold text-gray-800">{name}</span> cost <span className="font-semibold text-red-500">{price}€</span>
        </p>
      </div>


      {/* Error messages */}
      <div className="mt-2 text-center">
        {errors.length > 0 && errors.map((err) => <p key={err} className='text-red-500'> {err} </p>)}
      </div>

    </form>
  )
}
export default AddIngredient
