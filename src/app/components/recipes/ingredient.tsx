import React, { useState, useEffect } from 'react'
import Incremental from '../shared/incremental'
import { Carrot, Plus, Ruler } from 'lucide-react'
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
    if (value === 'g' || value ==='ml' || value ==='kg' || value === 'L' ) {
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
     <div className="flex flex-col md:flex-row items-center border-1 border-gray-300 border-dashed rounded-lg space-x-3 p-2 my-2">
        <div className='flex items-center space-x-3 p-2' >

          <Incremental onChange={setQuantity} count={quantity} onKeyDown={handleKeyDown} setErrors={setErrors} />
          <div className='flex items-center border-1 border-gray-300 border-dashed rounded-lg  space-x-3 p-1'> 
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
        <div className='flex items-center border-1 border-gray-300 border-dashed rounded-lg  space-x-3 p-1' >
          
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
    <p className='text-red-500 ml-3'> {errors?.nameError} </p>
    <p className='text-red-500 ml-3'> {errors?.unitError} </p>
    <p className='text-red-500 ml-3'> {errors?.quantityError} </p>
    
  </div>
  )
}

export default Ingredient
