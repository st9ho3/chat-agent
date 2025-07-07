import React, { useState } from 'react'
import Incremental from '../shared/incremental'
import { Plus } from 'lucide-react'
import { uid } from 'uid'
import { IngredientItemProps, Unit } from '@/shemas/recipe'


const Ingredient = ({onAddIngredient}: {onAddIngredient: (value: IngredientItemProps) => void} ) => {

  const [quantity, setQuantity] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [unit, setUnit] = useState<Unit> ('g')

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setName(value)
  }
  const handleUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target
    if (value === 'g' || value ==='ml' ||value ==='kg' ||value === 'L' ) {
      setUnit(value)
    }
  }

  const addIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const id = uid()
    const ingredient: IngredientItemProps = {
      id: id,
      iconBgColor: 'bg-yellow-100',
      name: name,
      unit: unit,
      quantity: quantity
    }
    onAddIngredient(ingredient)
  }

  return (
     <div className="flex flex-col md:flex-row items-center space-x-3 p-2">
        <div className='flex items-center space-x-3 p-2' >

          <Incremental onChange={setQuantity} count={quantity} />

          <select
            name="unit"
            id="unit"
            className="block w-20 h-10 px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white text-gray-800"
            onChange={handleUnit}
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
            className="w-30 p-2 text-lg placeholder:text-gray-500 border-b-1 border-gray-300 focus:outline-none"
            placeholder="Ingredient"
          />
        <button onClick={addIngredient} className='border-gray-400 rounded-md w-fit p-1 hover:bg-green-50 transition-colors duration-200'><Plus /></button>
        </div>
        
    </div>
  )
}

export default Ingredient
