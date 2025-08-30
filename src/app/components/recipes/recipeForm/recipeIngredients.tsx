"use client"

import { Ingredient, RecipeIngredients, RecipeIngredientsSchema, Unit } from '@/shemas/recipe'
import React, { useState, useEffect } from 'react' // 1. Import useEffect
import Incremental from '../../shared/incremental';
import { Carrot, PlusCircle, Scale } from 'lucide-react';

type IngredientErrors = string[]

interface formProps {
  recipeId: string,
  ingredients: Ingredient[],
  onAddIngredient: (ing: RecipeIngredients) => void,
  tempIngredients: RecipeIngredients[]
}

const RecipeIngredientForm = ({ recipeId, ingredients, onAddIngredient, tempIngredients }: formProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedIngredient, setSelectedIngredient] = useState<string>('');
  const [unit, setUnit] = useState<Unit>('');
  const [errors, setErrors] = useState<IngredientErrors>([]);
  
  // 2. Add state to hold the list of units compatible with the selected ingredient.
  const [availableUnits, setAvailableUnits] = useState<Unit[]>([]);

  // 3. Use useEffect to update available units when the selected ingredient changes.
  useEffect(() => {
    
    // Find the full ingredient object from the master list.
    const ingredient: Ingredient | undefined = ingredients.find((ing) => ing.name === selectedIngredient) 

    if (ingredient) {
      const baseUnit = ingredient.unit
      let compatibleUnits: Unit[] = [];

      // Determine the compatible units based on the ingredient's base unit.
      if (baseUnit === 'g' || baseUnit === 'kg') {
        compatibleUnits = ['g', 'kg'];
      } else if (baseUnit === 'ml' || baseUnit === 'L') {
        compatibleUnits = ['ml', 'L'];
      } else if (baseUnit === 'piece') {
        compatibleUnits = ['piece'];
      }
      
      setAvailableUnits(compatibleUnits);
      // Automatically set the unit to the ingredient's default unit for better UX.
      if (baseUnit === "g" || baseUnit === "kg" || baseUnit === "L" || baseUnit === "ml" || baseUnit === "piece") {
        setUnit(baseUnit);
      } 
    } else {
      // If no ingredient is selected, clear the available units.
      setAvailableUnits([]);
      setUnit('');
    }
  }, [selectedIngredient, ingredients]); // This effect runs when selectedIngredient or ingredients change.


  const resetForm = () => {
    setErrors([]);
    setSelectedIngredient('');
    setUnit('');
    setQuantity(0);
  };

  const addIngredient = () => {
    
    const ingredient = ingredients.find((ing) => ing.name === selectedIngredient);
    const foundIngredient = tempIngredients.find((ing) => ing.name === selectedIngredient);
    
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
      const zodErrors = validationResult.error.errors.map(err => err.message);
      setErrors(zodErrors);
    } else {
      if (!foundIngredient) {
        onAddIngredient(validationResult.data);
        resetForm();
      } else {
        setErrors(["Can't add duplicate ingredients"])
      }
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
    // Type assertion is safe here because the availableUnits logic controls the options.
    setUnit(value as Unit);
    setErrors([]);
  };

  return (
    <div className='flex flex-col '>
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        {/* Input Group */}
        <div className="flex items-center gap-3 rounded-lg border border-dashed border-gray-300 p-1 w-full flex-grow">
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
            {/* 4. Update the select to use the `availableUnits` state and disable it when no ingredient is chosen */}
            <select
              name="unit"
              id="unit"
              value={unit}
              className="block w-24 p-2 text-sm bg-transparent focus:outline-none"
              onChange={handleUnit}
              onKeyDown={handleKeyDown}
              disabled={!selectedIngredient} // Better UX: disable until an ingredient is selected
            >
              <option value="" disabled>Unit</option>
              {/* Render options from the dynamic list of available units */}
              {availableUnits.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          {/* Quantity */}
          <div className="border-l border-dashed border-gray-300 pl-2">
            <Incremental 
              onChange={setQuantity} 
              count={quantity} 
              onKeyDown={handleKeyDown}
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
