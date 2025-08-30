"use client"

import React from 'react';
import { Ingredient, RecipeIngredients } from '@/shemas/recipe';
import Incremental from '../../shared/incremental';
import { useRecipeIngredientsForm } from '@/app/hooks/useRecipeIngredientsForm';
import { 
    IngredientSelector,
    UnitSelector,
    AddIngredientButton,
    ErrorDisplay
 } from '@/app/constants/components';


interface FormProps {
  recipeId: string;
  ingredients: Ingredient[];
  onAddIngredient: (ing: RecipeIngredients) => void;
  tempIngredients: RecipeIngredients[];
}

const RecipeIngredientForm: React.FC<FormProps> = ({
  recipeId,
  ingredients,
  onAddIngredient,
  tempIngredients,
}) => {
  const {
    quantity,
    selectedIngredient,
    unit,
    errors,
    availableUnits,
    addIngredient,
    handleIngredientChange,
    handleUnitChange,
    handleQuantityChange,
    handleKeyDown,
  } = useRecipeIngredientsForm({
    recipeId,
    ingredients,
    tempIngredients,
    onAddIngredient,
  });

  return (
    <div className="flex flex-col">
      <div className="flex sm:flex-row gap-3 w-full">
        {/* Input Group */}
        <div className="flex items-center gap-3 rounded-lg border border-dashed border-gray-300 p-1 w-full flex-grow">
          <IngredientSelector
            ingredients={ingredients}
            selectedIngredient={selectedIngredient}
            onIngredientChange={handleIngredientChange}
            onKeyDown={handleKeyDown}
          />
          
          <UnitSelector
            unit={unit}
            availableUnits={availableUnits}
            selectedIngredient={selectedIngredient}
            onUnitChange={handleUnitChange}
            onKeyDown={handleKeyDown}
          />

          {/* Quantity */}
          <div className="border-l border-dashed border-gray-300 pl-2">
            <Incremental
              onChange={handleQuantityChange}
              count={quantity}
              onKeyDown={handleKeyDown}
              setErrors={() => {}}
            />
          </div>
        </div>

        <AddIngredientButton onClick={addIngredient} />
      </div>

      <ErrorDisplay errors={errors} error='' pricingErrors={{}}/>
    </div>
  );
};

export default RecipeIngredientForm;