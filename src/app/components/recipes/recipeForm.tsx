import React from 'react'
import Ingredient from './ingredient'
import { Check, NotepadText } from 'lucide-react'
import DisplayedIngredientItem from './displayedIngredient'
import { ingredientsData } from '@/app/constants/data'
import OrderTotal from './total'
import Button from '../shared/sharedButton'




const RecipeForm = () => {
  return (
    <div className='w-70 h-120 md:w-200 md:h-130 md:flex '>
      <form className='border-1 border-gray-300 rounded-lg flex flex-col'>
        <div className='flex items-center p-2 '>
          <NotepadText color='gray'/>
          <input id='title' type="text" className=' p-4 placeholder:text-gray-500 text-2xl focus:outline-none ' placeholder="Recipe's name" required />
        </div>
        <Ingredient />
      </form>
      <div className='flex flex-col border-1 border-gray-300 rounded-lg w-full p-2 ml-1'>

        {ingredientsData.map((ing) => 
          <DisplayedIngredientItem 
            key={ing.id}
            id={ing.id}
            icon={ing.icon} 
            iconBgColor={ing.iconBgColor}
            name={ing.name}
            unitPrice={ing.unitPrice}
            quantity={ing.quantity}
            />
         )}
        
          <OrderTotal 
            ingredients={ingredientsData}
          />
          <div className='flex items-center p-2 '>
            <Check />
            <Button text='Confirm recipe' action={() => console.log('Recipe added')} />
          </div>
        
      </div>
    </div>
  )
}

export default RecipeForm