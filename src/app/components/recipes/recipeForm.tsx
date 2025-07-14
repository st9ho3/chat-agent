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

      setValue("id", nextRecipeId);
    }
  }

  return (
    <div className='w-70 h-120 md:w-210 md:h-130 md:flex '>
      <form onSubmit={handleSubmit(onSubmit)} className='border-1 border-gray-300 border-dashed p-2 rounded-lg flex flex-col'>
        <div className='flex items-center border-1 border-gray-300 border-dashed rounded-lg p-1 '>
          <NotepadText color='gray' />
          <input {...register('title')} id='title' type="text" className=' p-4 placeholder:text-gray-500 text-2xl focus:outline-none ' placeholder="Recipe's name" required />
        </div>
        <p className='text-red-500 ml-3'> {errors.title?.message} </p>
        <AddIngredient onAddIngredient={handleAddIngredient} recipesId={newId} />


        <UploadFiles />

        <div className='flex items-center justify-evenly border border-gray-400 rounded-2xl w-30 p-1 hover:bg-green-50 transition-colors duration-200 '>
          <Check />
          <button type='submit'>Add recipe</button>
        </div>
      </form>
      <div className='flex flex-col items-center border-1 border-gray-300 border-dashed rounded-lg w-full p-2 ml-1'>

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
          ) : <h3>Empty</h3>}
        </div>

        <OrderTotal
          ingredients={tempIngredients}
        />

      </div>
    </div>
  )
}

export default RecipeForm;