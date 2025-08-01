"use client"
import React, { useState } from 'react';
import AddIngredient from '../ingredients/ingredient';
import { Check, NotepadText, File, X } from 'lucide-react';
import DisplayedIngredientItem from './displayedIngredient';
import OrderTotal from './total';
import { useForm } from 'react-hook-form';
import { RecipeSchema, RecipeCategory, RecipeIngredients } from '@/shemas/recipe';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from "uuid";
import { getTotalPrice } from '@/app/services/helpers';
import { sendRecipe } from '@/app/services/services';
import { useHomeContext } from '@/app/context/homeContext/homeContext';
import { useRouter } from 'next/navigation';
import { useFileUpload } from '@/app/hooks/useFileUpload';
import AdditionalCosts from './additionalCosts';
import UploadFiles from '../shared/uploadFiles';
import RecipeIngredient from './recipeIngredients';
import Link from 'next/link';



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
  const { state, dispatch } = useHomeContext()
  const router = useRouter()
  const { uploadFile, error } = useFileUpload();

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

  const { errors, isSubmitting, isSubmitted } = formState;

  const handleAddIngredient = (ing: RecipeIngredients) => {
    const newIngredients = [...tempIngredients, ing];
    const totalPrice = getTotalPrice(newIngredients);
    setTempIngredients(newIngredients);
    setValue("totalCost", totalPrice);
  }
  console.log(tempIngredients)

  const handleRemoveIngredient = (id: string) => {
    const newIngredients = tempIngredients.filter((ing) => ing.ingredientId !== id);
    setTempIngredients(newIngredients);
  }

  const handleFileUpload = async (file: File) => {
    if (file) {
      try {
        const url = await uploadFile(file)
        return url
      } catch (err) {
        console.log("An error occured while uploading the file:", err)
        console.log("Error message:", error)
      }
    }
  }

  const onSubmit = async (data: FormFields) => {
    try {
      if (state.file) {
        const url = await handleFileUpload(state.file)
        const updatedData = { ...data, id: newId, imgPath: url };
        if (tempIngredients.length > 0) {
          await sendRecipe(updatedData, tempIngredients);
        }
      } else {
        const updatedData = { ...data, id: newId };
        if (tempIngredients.length > 0) {
          await sendRecipe(updatedData, tempIngredients);
        }
      }
      console.log(isSubmitted)
    } catch (error) {
      console.log(error);
    } finally {
      console.log(isSubmitted)
      reset();
      setTempIngredients([]);
      const nextRecipeId = uuidv4();
      setNewId(nextRecipeId);
      dispatch({ type: "OPEN_NOTIFICATION", payload: "Recipe added succesfully" })
      dispatch({ type: "RESET_FILE" })
      setValue("id", nextRecipeId);
      router.replace("/recipes")
    }
  }
  console.log(state.file)

  return (
    <>
      {/* Main container */}
      <div className='w-full md:w-210 md:h-130 md:flex'>

      
              <button
              onClick={() => router.back()}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-offset-2 transition-colors"
                aria-label="Close modal" >
                <X />
              </button>
            

        {/* Form Section (Left) */}
        <form onSubmit={handleSubmit(onSubmit)} className='border-1 border-gray-300 border-dashed p-2 rounded-lg flex flex-col  gap-y-2'>
          <div className='flex items-center border-1 border-gray-300 border-dashed rounded-lg p-1'>
            <NotepadText color='gray' />
            <input {...register('title')} id='title' type="text" className='p-4 placeholder:text-gray-500 text-2xl focus:outline-none w-full' placeholder="Recipe's name" required />
          </div>
          <p className='text-red-500 ml-3'> {errors.title?.message} </p>

          <RecipeIngredient />

          <AdditionalCosts />

          <UploadFiles />


          {/* --- Button to show ingredients on mobile --- */}
          <button
            type='button'
            onClick={() => setIsListVisible(true)}
            className='md:hidden border border-gray-400 rounded-lg p-2 text-center hover:bg-gray-100 transition-colors duration-200'
          >
            View Ingredients ({tempIngredients.length})
          </button>

          {state.file && (
            <div className="flex items-center justify-between w-1/2 py-1.5 px-2 group">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <File size={18} className="text-slate-400" />
                <span className="truncate">{state.file?.name}</span>
              </div>
              <button
                onClick={() => dispatch({ type: "RESET_FILE" })}
                className="p-1 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-opacity"
                aria-label="Remove file"
              >
                <X size={18} />
              </button>
            </div>
          )}
          <div className='flex justify-center'>
            <div className='flex items-center justify-evenly border border-gray-400 rounded-2xl w-30 p-1 hover:bg-green-50 transition-colors duration-200 ' >
              {!isSubmitting && <Check />}
              <button type='submit' disabled={isSubmitting}  > {isSubmitting ? "Submitting..." : "Add recipe"}</button>
            </div>
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
                unitPrice={ing.unitPrice}
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