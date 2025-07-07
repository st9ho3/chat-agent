import React, { useState } from 'react'
import Ingredient from './ingredient'
import { Check, NotepadText } from 'lucide-react'
import DisplayedIngredientItem from './displayedIngredient'
import { ingredientsData } from '@/app/constants/data'
import OrderTotal from './total'
import { useForm } from 'react-hook-form'
import { IngredientItemProps } from '@/shemas/recipe'

type FormFields = {
  id: string; 
  title: string;
  totalCost: number;
  ingredients: Array<IngredientItemProps>;
  createdBy: string;
  dateCreated: Date;
}

const RecipeForm = () => {

  const {register, handleSubmit} = useForm<FormFields>()

  const [tempIngredients, setTempIngredients] = useState<IngredientItemProps[]>([])

  const handleAddIngredient = ( ing: IngredientItemProps) => {

    setTempIngredients([...tempIngredients, ing ])
  }
  const handleRemoveIngredient = (e: React.MouseEvent<HTMLButtonElement>,id: string) => {
    e.preventDefault()
    setTempIngredients(tempIngredients.filter((ing) => ing.id !== id ))
  }

  const onSubmit = (data: FormFields) => {
    console.log(data)
  }

  const unitPrice = 10
  return (
    <div className='w-70 h-120 md:w-210 md:h-130 md:flex '>
      <form onSubmit={handleSubmit(onSubmit)} className='border-1 border-gray-300 rounded-lg flex flex-col'>
        <div className='flex items-center p-2 '>
          <NotepadText color='gray'/>
          <input {...register('title')} id='title' type="text" className=' p-4 placeholder:text-gray-500 text-2xl focus:outline-none ' placeholder="Recipe's name" required />
        </div>
        <Ingredient onAddIngredient={handleAddIngredient}  />
        <div className='flex items-center justify-evenly border border-gray-400 rounded-2xl w-30 p-1 hover:bg-green-50 transition-colors duration-200 '>
            <Check />
            <button type='submit' onClick={() => console.log('recipe added')}>Add recipe</button>
          </div>
      </form>
      <div className='flex flex-col items-center border-1 border-gray-300 rounded-lg w-full p-2 ml-1'>

      <div className='w-full h-2/3 overflow-auto'>
        {tempIngredients.length > 0 ? tempIngredients.map((ing) => 
          <DisplayedIngredientItem 
            key={ing.id}
            id={ing.id}
            icon={ing.icon} 
            iconBgColor={ing.iconBgColor}
            name={ing.name}
            unit={ing.unit}
            unitPrice={unitPrice}
            quantity={ing.quantity}
            />
         ) : <h3>Empty</h3> }
      </div>
        
        <OrderTotal 
            ingredients={ingredientsData}
          />
        
          
          
        
      </div>
    </div>
  )
}

export default RecipeForm