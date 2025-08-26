"use client"
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Unit, Ingredient, IngredientSchema } from '@/shemas/recipe';
import { normalizePrice } from '@/app/services/helpers';

type IngredientErrors = string[];

type UseIngredientFormProps = {
  onAddIngredient: (value: Ingredient) => void;
  mode: 'create' | 'edit'
  ingredient: Ingredient
};

export const useIngredientForm = ({ onAddIngredient, mode, ingredient }: UseIngredientFormProps) => {

  const [quantity, setQuantity] = useState<number>( mode === 'create' ? 0 : ingredient.quantity);
  const [name, setName] = useState<string>(mode === 'create' ? '' : ingredient.name);
  const [unit, setUnit] = useState<Unit>(mode === 'create' ? '' : ingredient.unit as Unit);
  const [price, setPrice] = useState<string>( mode === 'create' ? "0" : ingredient.unitPrice.toString());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errors, setErrors] = useState<IngredientErrors>([]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value.toLowerCase());
    setErrors([]);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === '' || /^(\d*\.?\d*)$/.test(value)) {
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

  const addIngredient = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const id = uuidv4();
    const normalizedUnitPrice = normalizePrice(price, unit, quantity);

    const ingredient: Ingredient = {
      id: id,
      icon: '🥑',
      name: name,
      unit: unit === "g" || unit === "kg" ? "g" : unit === "L" || unit === "ml" ? "ml" : "piece",
      unitPrice: normalizedUnitPrice,
      quantity: quantity,
      usage: "0"
    };

    const validatedIngredient = IngredientSchema.safeParse(ingredient);
    
    if (!validatedIngredient.success) {
      setErrors([]);
      const zodErrors = validatedIngredient.error.errors;
      zodErrors.forEach((error) => setErrors(prev => [...prev, error.message]));
    } else {
      await onAddIngredient(validatedIngredient.data);
      resetForm();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSelectElement>) => {
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