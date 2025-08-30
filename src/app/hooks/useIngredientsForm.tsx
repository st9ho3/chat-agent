"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Unit, Ingredient, IngredientSchema } from '@/shemas/recipe';
import { normalizePrice, transformIngredientToDB } from '@/app/services/helpers';
import { sendIngredient, updateIngredient } from '../services/services';
import useHelpers from './useHelpers';
import { NotificationType } from '@/types/context';

type IngredientErrors = string[];

type UseIngredientFormProps = {
  mode: 'create' | 'edit';
  ingredient: Ingredient | undefined;
};

export const useIngredientForm = ({ mode, ingredient }: UseIngredientFormProps) => {
  const [quantity, setQuantity] = useState<number>(
    mode === 'edit' && ingredient ? ingredient.quantity : 0
  );
  const [name, setName] = useState<string>(
    mode === 'edit' && ingredient ? ingredient.name : ''
  );
  const [unit, setUnit] = useState<Unit>(
    mode === 'edit' && ingredient ? ingredient.unit as Unit : ''
  );
  const [price, setPrice] = useState<string>(
    mode === 'edit' && ingredient ? ingredient.unitPrice.toString() : '0'
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errors, setErrors] = useState<IngredientErrors>([]);
  
  const router =  useRouter()
  const { raiseNotification } =  useHelpers() 

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // For create mode, convert to lowercase; for edit mode, keep as is
    setName(mode === 'create' ? value.toLowerCase() : value);
    setErrors([]);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
    setErrors([]);
  };

  const handleFocus = () => setIsEditing(true);
  const handleBlur = () => setIsEditing(false);

  // Logic to show an empty input when editing and the price is "0"
  const displayedPrice = isEditing && price === "0" ? "" : price;

  const handleUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === 'g' || value === 'ml' || value === 'kg' || value === 'L' || value === "piece") {
      setUnit(value as Unit);
      setErrors([]);
    }
  };

  const resetForm = () => {
    setQuantity(0);
    setName('');
    setUnit('');
    setPrice("0");
    setErrors([]);
    setIsEditing(false);
  };

  const addIngredient = async (
    e: React.MouseEvent<HTMLButtonElement> | 
    React.KeyboardEvent<HTMLInputElement> | 
    React.KeyboardEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();

    if (mode === 'create') {
      // Create mode logic
      const id = uuidv4();
      const normalizedUnitPrice = normalizePrice(price, unit, quantity);
      
      const ingredientPrototype: Ingredient = {
        id: id,
        icon: '🥑',
        name: name,
        unit: unit === "g" || unit === "kg" ? "g" : unit === "L" || unit === "ml" ? "ml" : "piece",
        unitPrice: normalizedUnitPrice,
        quantity: quantity,
        usage: "0"
      };

      const validatedIngredient = IngredientSchema.safeParse(ingredientPrototype);
      
      if (!validatedIngredient.success) {
        setErrors([]);
        const zodErrors = validatedIngredient.error.errors;
        zodErrors.forEach((error) => setErrors(prev => [...prev, error.message]));
      } else {
        await sendIngredient(validatedIngredient.data);
        if (raiseNotification) {
          raiseNotification("Ingredient added successfully", NotificationType.Success);
        }
        resetForm();
        if (router) {
          router.replace("/ingredients");
        }
      }
    } else if (mode === 'edit' && ingredient) {

      const normalizedUnitPrice = normalizePrice(price, unit, quantity);

      // Edit mode logic
      const updatedIngredient: Ingredient = {
        id: ingredient.id,
        icon: ingredient.icon || '🥑',
        name: name,
        unit: unit as Unit,
        unitPrice: normalizedUnitPrice,
        quantity: quantity,
        usage: ingredient.usage || "0"
      };

      const validatedIngredient = IngredientSchema.safeParse(updatedIngredient);
      console.log("Validated ingredient on the form: ", validatedIngredient);
      
      if (!validatedIngredient.success) {
        setErrors([]);
        const zodErrors = validatedIngredient.error.errors;
        zodErrors.forEach((error) => setErrors(prev => [...prev, error.message]));
      } else {
        await updateIngredient(validatedIngredient.data);
        if (raiseNotification) {
          raiseNotification("Ingredient updated successfully", NotificationType.Success);
        }
        if (router) {
          router.replace("/ingredients");
        }
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement> | 
    React.KeyboardEvent<HTMLSelectElement>
  ) => {
    if (e.key === "Enter") {
      addIngredient(e);
    }
  };

  // Return all the state and functions the component will need
  return {
    quantity,
    name,
    unit,
    price,
    displayedPrice,
    errors,
    setQuantity,
    setErrors,
    handleName,
    handlePrice,
    handleFocus,
    handleBlur,
    handleUnit,
    addIngredient,
    handleKeyDown,
  };
};