"use client"
import React, { useState } from 'react';
import AddIngredient from './ingredient';
import { Check, NotepadText } from 'lucide-react';
import DisplayedIngredientItem from './displayedIngredient';
import OrderTotal from './total';
import { useForm } from 'react-hook-form';
import { RecipeSchema, RecipeCategory, RecipeIngredients } from '@/shemas/recipe';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from "uuid";
import { getTotalPrice } from '@/app/services/helpers';
import UploadFiles from '../shared/uploadFiles';
import { sendRecipe } from '@/app/services/services';
import { useHomeContext } from '@/app/context/homeContext/homeContext';
import { useRouter } from 'next/navigation';
 

export type FormFields = {
  id: string;
  title: string;
  totalCost: number;
  category: RecipeCategory;
  createdBy: string;
  dateCreated: Date;
}

const RecipeForm = () => {

  const [newId, setNewId] = useState<string>(() => uuidv4());
  const [tempIngredients, setTempIngredients] = useState<RecipeIngredients[]>([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const { dispatch} = useHomeContext()
  const router = useRouter()
  
  const { register, handleSubmit, setValue, reset, formState } = useForm<FormFields>({
    defaultValues: {
      id: newId,
      title: '',
      category: 'starter',
      createdBy: 'User',
      dateCreated: new Date()
    },
    resolver: zodResolver(RecipeSchema)
  });

  console.log(tempIngredients)
  const { errors } = formState;

  const handleAddIngredient = (ing: RecipeIngredients) => {
    const newIngredients = [...tempIngredients, ing];
    const totalPrice = getTotalPrice(newIngredients);
    setTempIngredients(newIngredients);
    setValue("totalCost", totalPrice);
  }

  const handleRemoveIngredient = (id: string) => {
    const newIngredients = tempIngredients.filter((ing) => ing.ingredientId !== id);
    setTempIngredients(newIngredients);
  }

  const onSubmit = async (data: FormFields) => {
    try {
      const updatedData = { ...data, id: newId };

      if (tempIngredients.length > 0) {
        await sendRecipe(updatedData, tempIngredients);
      }
      

    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setTempIngredients([]);

      const nextRecipeId = uuidv4();
      setNewId(nextRecipeId);
      dispatch({type: "OPEN_NOTIFICATION", payload: "Recipe added succesfully"})
      setValue("id", nextRecipeId);
      router.replace("/recipes")
    }
  }
  
  return (
     <>
    {/* Main container */}
    <div className='w-full md:w-210 md:h-130 md:flex'>

      {/* Form Section (Left) */}
      <form onSubmit={handleSubmit(onSubmit)} className='border-1 border-gray-300 border-dashed p-2 rounded-lg flex flex-col gap-y-4'>
        <div className='flex items-center border-1 border-gray-300 border-dashed rounded-lg p-1'>
          <NotepadText color='gray' />
          <input {...register('title')} id='title' type="text" className='p-4 placeholder:text-gray-500 text-2xl focus:outline-none w-full' placeholder="Recipe's name" required />
        </div>
        <p className='text-red-500 ml-3'> {errors.title?.message} </p>

        <AddIngredient onAddIngredient={handleAddIngredient} recipesId={newId} />

        <UploadFiles />

        {/* --- Button to show ingredients on mobile --- */}
        <button
          type='button'
          onClick={() => setIsListVisible(true)}
          className='md:hidden border border-gray-400 rounded-lg p-2 text-center hover:bg-gray-100 transition-colors duration-200'
        >
          View Ingredients ({tempIngredients.length})
        </button>

        <div className='flex items-center justify-evenly border border-gray-400 rounded-2xl w-30 p-1 hover:bg-green-50 transition-colors duration-200 '>
          <Check />
          <button type='submit'>Add recipe</button>
        </div>
      </form>

      {/* Displayed Ingredients Section (Right side, hidden on mobile) */}
      <div className='hidden md:flex flex-col items-center border-1 border-gray-300 border-dashed rounded-lg w-full p-2 md:ml-1 mt-4 md:mt-0'>
        <div className='w-full h-2/3 overflow-auto'>
          {tempIngredients.length > 0 ? tempIngredients.map((ing) =>
            <DisplayedIngredientItem
              key={ing.ingredientId}
              onRemove={handleRemoveIngredient}
              id={ing.ingredientId}
              iconBgColor={ing.iconBgColor}
              name={ing.name}
              unit={ing.unit}
              unitPrice={10}
              quantity={ing.quantity}
            />
          ) : <h3 className='text-center text-gray-500'>Empty</h3>}
        </div>
        <OrderTotal ingredients={tempIngredients} />
      </div>
    </div>

    {/* --- Full-screen ingredient list for mobile --- */}
    {isListVisible && (
      <div className="fixed inset-0 bg-white z-50 p-4 flex flex-col md:hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <button onClick={() => setIsListVisible(false)} className="text-2xl font-bold">&times;</button>
        </div>

        <div className='flex-grow w-full h-2/3 overflow-auto mb-4'>
          {tempIngredients.length > 0 ? tempIngredients.map((ing) =>
            <DisplayedIngredientItem
              key={ing.ingredientId}
              onRemove={handleRemoveIngredient}
              id={ing.ingredientId}
              iconBgColor={ing.iconBgColor}
              name={ing.name}
              unit={ing.unit}
              unitPrice={10}
              quantity={ing.quantity}
            />
          ) : <h3 className='text-center text-gray-500'>Empty</h3>}
        </div>

        <OrderTotal ingredients={tempIngredients} />
      </div>
    )}
  </>
  )
}

export default RecipeForm;