import React, { useState, useEffect } from 'react'
import Incremental from '../shared/incremental'
import { Plus } from 'lucide-react'
import { IngredientItemProps, Unit, IngredientErrors } from '@/shemas/recipe'
import { uid } from 'uid'

const Ingredient = ({onAddIngredient}: {onAddIngredient: (value: IngredientItemProps) => void} ) => {

  const [quantity, setQuantity] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [unit, setUnit] = useState<Unit>('')
  const [errors, setErrors] = useState<IngredientErrors>({})


  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setName(value)
    setErrors(prevErrors => ({...prevErrors, nameError: '' }))
  }
  const handleUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target
    if (value === 'g' || value ==='ml' ||value ==='kg' ||value === 'L' ) {
      setUnit(value)
      setErrors(prevErrors => ({...prevErrors, unitError: '' }))
    }
  }

  const addIngredient = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSelectElement>) => {
    e.preventDefault()
     if (!name.trim()) {
      const titleError = "Ingredient must have a title"
      setErrors(prevErrors => ({...prevErrors, nameError: titleError }))
      return
    }
    
    if (quantity < 1) {
      const quantityError = "Quantity can't be 0"
      setErrors(prevErrors => ({...prevErrors, quantityError: quantityError }))
      return
    }
    const units = ['g', 'ml', 'kg', 'L']
    if (!units.includes(unit)) {
      const unitError = "Please pick a unit measure"
      setErrors(prevErrors => ({...prevErrors, unitError: unitError }))
      return
    }
    const id = uid()
    const ingredient: IngredientItemProps = {
      id: id,
      iconBgColor: 'bg-yellow-100',
      name: name,
      unit: unit,
      quantity: quantity
    }
    onAddIngredient(ingredient)

    setQuantity(0)
    setName('')
    setUnit('')
    setErrors({})
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === "Enter") {
      addIngredient(e)
    }
  }

  return (
    <div>
     <div className="flex flex-col md:flex-row items-center space-x-3 p-2">
        <div className='flex items-center space-x-3 p-2' >

          <Incremental onChange={setQuantity} count={quantity} onKeyDown={handleKeyDown} setErrors={setErrors} />

          <select
            name="unit"
            id="unit"
            value={unit}
            className="block w-20 h-10 px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white text-gray-800"
            onChange={handleUnit}
            onKeyDown={handleKeyDown}
          >
            <option value="">Unit</option>
            <option value="kg">kg</option>
            <option value="L">L</option>
            <option value="g">g</option>
            <option value="ml">ml</option>
          </select>
 
          
        </div >
        <div className='flex items-center space-x-3 p-2' >
          {/* Ingredient Name Input */}
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleName}
            onKeyDown={handleKeyDown}
            className="w-30 p-2 text-lg placeholder:text-gray-500 border-b-1 border-gray-300 focus:outline-none"
            placeholder="Ingredient"
          />
        <button type='button' onClick={addIngredient} className='border-gray-400 rounded-md w-fit p-1 hover:bg-green-50 transition-colors duration-200'><Plus /></button>
        </div>
         
    </div>
    <p className='text-red-500 ml-3'> {errors?.nameError} </p>
    <p className='text-red-500 ml-3'> {errors?.unitError} </p>
    <p className='text-red-500 ml-3'> {errors?.quantityError} </p>
    
  </div>
  )
}

export default Ingredient
