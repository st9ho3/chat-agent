/**
 * @fileoverview This custom React hook manages the state and logic for a recipe form.
 * It handles both creating a new recipe and editing an existing one, including form validation
 * with Zod, managing temporary ingredients, calculating pricing details, and handling
 * form submission, including file uploads and API calls.
 * * @description
 * The `useRecipeForm` hook orchestrates the entire lifecycle of a recipe form. It leverages
 * `react-hook-form` for efficient form management and validation. The hook dynamically
 * handles form initialization based on the `mode` prop (create or edit). It also
 * provides functions for adding and removing ingredients, recalculating total costs,
 * and performing complex pricing calculations (profit margin, selling price) before
 * submitting data to the appropriate backend service. It uses a separate `useFileUpload`
 * hook and a context (`useHomeContext`) to manage file upload state and notifications.
 */
/**
*/
import { useState } from 'react';
import { RecipeIngredients, RecipeSchema } from '@/shemas/recipe';
import { v4 as uuidv4 } from "uuid";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { calculateRecipeData, getTotalPrice } from '@/app/services/helpers';
import { sendRecipe, sendRecipeToUpdate } from '@/app/services/services';
import { useHomeContext } from '../context/homeContext/homeContext';
import { useRouter } from 'next/navigation';
import { useFileUpload } from './useFileUpload';
import useHelpers from './useHelpers';
import { defaultValues } from '../constants/recipeFormDefaultValues';
import { RecipeFormProps } from '../components/recipes/recipeForm/recipeForm';

export type FormFields = z.infer<typeof RecipeSchema>;

const useRecipeForm = ({mode, recipe, recipeIngredients, userId}: RecipeFormProps) => {
  const [newId, setNewId] = useState<string>(() => uuidv4());
  const [tempIngredients, setTempIngredients] = useState<RecipeIngredients[]>(mode === 'edit' && recipeIngredients ? recipeIngredients : []);

  const { state, dispatch } = useHomeContext();
  const router = useRouter();
  const { handleFileUpload, error } = useFileUpload();
  const { raiseNotification } = useHelpers();
  
  const { register, handleSubmit, setValue, reset, formState, getValues, watch } = useForm<FormFields>({
    defaultValues: mode === "create" ? {
      ...defaultValues,
      id: newId
    } : recipe,
    resolver: zodResolver(RecipeSchema)
  });

  const { errors, isSubmitting } = formState;

  const handleAddIngredient = (ing: RecipeIngredients) => {
    const newIngredients = [...tempIngredients, ing];
    const totalPrice = getTotalPrice(newIngredients);
    setTempIngredients(newIngredients);
    setValue("totalCost", totalPrice);
  };

  const handleRemoveIngredient = (id: string) => {
    const newIngredients = tempIngredients.filter((ing) => ing.ingredientId !== id);
    setTempIngredients(newIngredients);
    setValue("totalCost", getTotalPrice(newIngredients));
  };

  const resetForm = () => {
    if (mode === 'create') {
      const nextRecipeId = uuidv4();
      setNewId(nextRecipeId);
      setValue("id", nextRecipeId);
    }
    setTimeout(() => {
      dispatch({ type: "RESET_FILE" });
      reset();
      setTempIngredients([]);
    }, 1000);
    router.replace("/recipes");
  }; 

  const onSubmit = async (data: FormFields) => {

  
  const {newCost, newMargin, newPrice, foodCost} = calculateRecipeData(data, recipe, tempIngredients)
  
  const addedIngredients: RecipeIngredients[] = tempIngredients.filter(
    (tempIngredient) => !recipeIngredients.includes(tempIngredient)
  );
  const removedIngredients: RecipeIngredients[] = recipeIngredients.filter(
    (recipeIngredient) => !tempIngredients.includes(recipeIngredient)
  );

  try {

    let url: string | undefined;

    if (state.file) {
      url = await handleFileUpload(state.file);
    }

    if (mode === 'edit') {

      const recipeToUpdate = { 
        ...data, 
        userId: userId,
        totalCost: newCost,
        imgPath: url || data.imgPath,
        profitMargin: newMargin,
        sellingPrice: newPrice,
        foodCost: foodCost
      };
        

      const response = await sendRecipeToUpdate(recipeToUpdate, addedIngredients, removedIngredients);
      raiseNotification(response);
    
    } else {
      const updatedData = {
        ...data,
        id: newId,
        userId: userId,
        imgPath: url || data.imgPath,
        profitMargin: data.profitMargin ? data.profitMargin : 0,
        foodCost: foodCost * 100
      };
      if (tempIngredients.length > 0) {
        const response = await sendRecipe(updatedData, tempIngredients);
        raiseNotification(response);
      }
    }
  } catch (error) {
    raiseNotification({
      success: false,
      message: 'An unexpected error occurred.',
      error: { message: `${error}` },
    });
  } finally {
    resetForm();
  }

};

  return {
    newId,
    register,
    handleSubmit,
    setValue,
    reset,
    formState,
    getValues,
    watch, 
    errors,
    isSubmitting,
    handleAddIngredient,
    handleRemoveIngredient,
    onSubmit,
    error,
    tempIngredients,
    state
    
}
}
export default useRecipeForm;