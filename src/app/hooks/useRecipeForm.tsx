import { useState } from 'react';
import { RecipeIngredients, RecipeSchema } from '@/shemas/recipe';
import { v4 as uuidv4 } from "uuid";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTotalPrice } from '@/app/services/helpers';
import { sendRecipe } from '@/app/services/services';
import { useHomeContext } from '../context/homeContext/homeContext';
import { useRouter } from 'next/navigation';
import { useFileUpload } from './useFileUpload';
import { NotificationType } from '@/types/context';
import useHelpers from './useHelpers';
import { defaultValues } from '../constants/recipeFormDefaultValues';

export type FormFields = z.infer<typeof RecipeSchema>;

const useRecipeForm = () => {
  const [newId, setNewId] = useState<string>(() => uuidv4());
  const [tempIngredients, setTempIngredients] = useState<RecipeIngredients[]>([]);

  const { state, dispatch } = useHomeContext();
  const router = useRouter();
  const { handleFileUpload, error } = useFileUpload();
  const { raiseNotification } = useHelpers();
  const { register, handleSubmit, setValue, reset, formState, getValues } = useForm<FormFields>({
    defaultValues: {
      ...defaultValues,
      id: newId
    },
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
  };

  const resetForm = () => {
    reset();
    setTempIngredients([]);
    const nextRecipeId = uuidv4();
    setNewId(nextRecipeId);
    raiseNotification("Recipe added succesfully", NotificationType.Success);
    dispatch({ type: "RESET_FILE" });
    setValue("id", nextRecipeId);
    router.replace("/recipes");
  }; 


  const onSubmit = async (data: FormFields) => {
    try {
      if (state.file) {
        const url = await handleFileUpload(state.file);
        if (url) {
          const updatedData = { ...data, id: newId, imgPath: url, profitMargin: data.profitMargin ? data.profitMargin/100 : 0 };
          if (tempIngredients.length > 0) {
            await sendRecipe(updatedData, tempIngredients);
          }
        }
      } else {
        const updatedData = { ...data, id: newId, profitMargin: data.profitMargin ? data.profitMargin/100 : 0 };
        if (tempIngredients.length > 0) {
          await sendRecipe(updatedData, tempIngredients);
        }
      }
    } catch (error) {
      raiseNotification(String(error), NotificationType.Failure);
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
    errors,
    isSubmitting,
    handleAddIngredient,
    handleRemoveIngredient,
    onSubmit,
    error,
    tempIngredients,
    state
  };
};

export default useRecipeForm;