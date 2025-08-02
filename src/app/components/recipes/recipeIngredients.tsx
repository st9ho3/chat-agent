"use client"

import { Ingredient, RecipeIngredients, RecipeIngredientsSchema, Unit } from '@/shemas/recipe'
import React, { useState } from 'react'
import Incremental from '../shared/incremental';
import { Carrot, PlusCircle, Scale } from 'lucide-react';

type IngredientErrors = string[]

interface formProps {
  recipeId: string,
  ingredients: Ingredient[],
  onAddIngredient: (ing: RecipeIngredients) => void
}

const RecipeIngredientForm = ({ recipeId, ingredients, onAddIngredient }: formProps) => {
  const [quantity, setQuantity] = useState<number>(0); // Default to 1 instead of 0
  const [selectedIngredient, setSelectedIngredient] = useState<string>('');
  const [unit, setUnit] = useState<Unit>('');
  const [errors, setErrors] = useState<IngredientErrors>([]);

  const resetForm = () => {
    setErrors([]);
    setSelectedIngredient('');
    setUnit('');
    setQuantity(1);
  };

  const addIngredient = () => {
    

    const ingredient = ingredients.find((ing) => ing.name === selectedIngredient);

    // This should technically not happen if selectedIngredient is set, but it's a good safeguard.
    if (!ingredient) {
      setErrors(["Could not find the selected ingredient."]);
      return;
    }
    
    const recipeIngredient: RecipeIngredients = {
      name: selectedIngredient,
      unit: unit,
      unitPrice: ingredient.unitPrice,
      quantity: quantity,
      recipeId: recipeId,
      ingredientId: ingredient.id,
      iconBgColor: "bg-yellow-100"
    };

    const validationResult = RecipeIngredientsSchema.safeParse(recipeIngredient);
    
    if (!validationResult.success) {
      // More efficient way to set Zod errors
      const zodErrors = validationResult.error.errors.map(err => err.message);
      setErrors(zodErrors);
    } else {
      onAddIngredient(validationResult.data);
      resetForm();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      addIngredient();
    }
  };

  const handleUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    // FIX 4: Add "piece" to the list of valid units.
    if (value === 'g' || value === 'ml' || value === 'kg' || value === 'L' || value === 'piece') {
      setUnit(value as Unit);
      setErrors([]);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        {/* Input Group */}
        <div className="flex items-center gap-3 rounded-lg border border-dashed border-gray-300 p-2 w-full flex-grow">
          <Carrot className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <select 
            value={selectedIngredient} 
            onChange={(e) => setSelectedIngredient(e.target.value)}
            className="w-full md:w-37 p-2 bg-transparent focus:outline-none appearance-none" 
            onKeyDown={handleKeyDown}
          >
            <option value="" disabled>Select ingredient...</option>
            {ingredients.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.name}>
                {ingredient.name}
              </option>
            ))}
          </select>
          {/* Unit */}
          <div className='flex items-center p-1 space-x-2 border-l border-dashed border-gray-300'>
            <Scale className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
            <select
              name="unit"
              id="unit"
              value={unit}
              className="block w-24 p-2 text-sm bg-transparent focus:outline-none"
              onChange={handleUnit}
              onKeyDown={handleKeyDown}
            >
              <option value="" disabled>Unit</option>
              <option value="kg">kg</option>
              <option value="L">L</option>
              <option value="g">g</option>
              <option value="ml">ml</option>
              <option value="piece">piece</option>
            </select>
          </div>
          {/* Quantity */}
          <div className="border-l border-dashed border-gray-300 pl-2">
            <Incremental 
              onChange={setQuantity} 
              count={quantity} 
              onKeyDown={() => {}}
              setErrors={() => {}}
            />
          </div>
        </div>
        
        <button
          type='button'
          onClick={addIngredient}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors w-full sm:w-auto flex-shrink-0"
        >
          <PlusCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
      {/* Error messages */}
      <div className="mt-2 text-center h-5">
        {errors.length > 0 && <p className='text-red-500 text-sm'> {errors[0]} </p>}
      </div>
    </div>
  )
}

export default RecipeIngredientForm;