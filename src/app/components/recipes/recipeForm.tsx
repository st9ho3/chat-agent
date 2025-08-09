"use client"
import React, { useState } from 'react';
import { Check, NotepadText, File, X, DollarSign, Percent } from 'lucide-react';
import DisplayedIngredientItem from './displayedIngredient';
import OrderTotal from './total';
import { useForm } from 'react-hook-form';
import { RecipeSchema, RecipeCategory, RecipeIngredients, Ingredient } from '@/shemas/recipe';
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
import UseHelpers from '@/app/hooks/useHelpers';
import { NotificationType } from '@/types/context';
import Pricing from './pricing';
import { z } from 'zod';

// Use the Zod schema as the single source of truth for the form's type
export type FormFields = z.infer<typeof RecipeSchema>;


const RecipeForm = ({ingredients}: {ingredients: Ingredient[]}) => {
  const [newId, setNewId] = useState<string>(() => uuidv4());
  const [tempIngredients, setTempIngredients] = useState<RecipeIngredients[]>([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const { state, dispatch } = useHomeContext()
  const router = useRouter()
  const { handleFileUpload, error } = useFileUpload();
  const {raiseNotification} = UseHelpers()

  const { register, handleSubmit, setValue, reset, formState, getValues } = useForm<FormFields>({
  defaultValues: {
    id: newId,
    title: '',
    totalCost: 0, 
    category: 'starter',
    createdBy: 'User',
    dateCreated: new Date(),
    tax: 0,
    sellingPrice: 0, 
    profitMargin: 0, 
    imgPath: undefined, 
  },
  resolver: zodResolver(RecipeSchema)
});

  const { errors, isSubmitting } = formState;

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
      if (state.file) {
        const url = await handleFileUpload(state.file)
        const updatedData = { ...data, id: newId, imgPath: url, profitMargin: data.profitMargin ? data.profitMargin/100 : 0 };
        if (tempIngredients.length > 0) {
          await sendRecipe(updatedData, tempIngredients);
        }
      } else {
        const updatedData = { ...data, id: newId, profitMargin: data.profitMargin ? data.profitMargin/100 : 0 };
        if (tempIngredients.length > 0) {
          await sendRecipe(updatedData, tempIngredients);
        }
      }
    } catch (error) {
      raiseNotification(String(error), NotificationType.Failure)
    } finally {
      reset();
      setTempIngredients([]);
      const nextRecipeId = uuidv4();
      setNewId(nextRecipeId);
      raiseNotification("Recipe added succesfully", NotificationType.Success)
      dispatch({ type: "RESET_FILE" })
      setValue("id", nextRecipeId);
      router.replace("/recipes")
    }
  }

  return (
    <>
  {/* Main container */}
  <div className='w-full md:w-250 md:h-130 md:flex'>

    <button
      onClick={() => router.back()}
      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-offset-2 transition-colors"
      aria-label="Close modal"
    >
      <X />
    </button>

    {/* Form Section (Left) */}
    <form onSubmit={handleSubmit(onSubmit)} className='border-1 border-gray-300 border-dashed p-2 rounded-lg flex flex-col gap-y-2'>
      <div className='flex items-center border-1 border-gray-300 border-dashed rounded-lg p-1'>
        <NotepadText color='gray' />
        <input {...register('title')} id='title' type="text" className='p-4 placeholder:text-gray-500 text-2xl focus:outline-none w-full' placeholder="Recipe's name" required />
      </div>
      {errors.title && <p className='text-red-500 ml-3'> {errors.title?.message} </p>}

      <UploadFiles />
      
      <RecipeIngredient ingredients={ingredients} recipeId={newId} onAddIngredient={handleAddIngredient} tempIngredients={tempIngredients} />

      {/* The Pricing component now handles its own inputs */}
      <Pricing register={register} errors={errors} setValue={setValue} getValues={getValues}>
        <AdditionalCosts register={register} errors={errors} />
      </Pricing>

      {error && <p className='text-red-500 ml-3'> {error} </p>}

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
        <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors w-full sm:w-auto flex-shrink-0" >
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