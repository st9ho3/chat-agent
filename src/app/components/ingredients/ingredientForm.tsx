"use client"
import React from 'react';
import { IngredientNameInput, IngredientPriceInput, IngredientSummary, IngredientUnitSelect, AddIngredientButton, FormErrors } from '../../constants/components';
import Incremental from '../shared/incremental';
import { Ingredient } from '@/shemas/recipe';
import { useIngredientForm } from '../../hooks/useIngredientsForm'; // Adjust path


type AddIngredientProps = {
  ingredient: Ingredient | undefined
  mode: 'create' | 'edit'
  
};

const IngredientForm = ({ ingredient, mode }: AddIngredientProps) => {
  const {
    quantity, name, unit, price, displayedPrice, errors,
    setQuantity, setErrors, handleName, handlePrice, handleFocus,
    handleBlur, handleUnit, addIngredient, handleKeyDown,
  } = useIngredientForm({ ingredient, mode });

  return (
    <form className="p-2">
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg">
        <IngredientNameInput value={name} onChange={handleName} onKeyDown={handleKeyDown} />
        <IngredientPriceInput
          value={displayedPrice}
          onChange={handlePrice}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Incremental onChange={setQuantity} count={quantity} onKeyDown={handleKeyDown} setErrors={setErrors} />
        <IngredientUnitSelect value={unit} onChange={handleUnit} onKeyDown={handleKeyDown} />
      </div>

      <AddIngredientButton onClick={addIngredient} mode={mode} />
      <IngredientSummary quantity={quantity} unit={unit} name={name} price={price} />
      <FormErrors errors={errors} />
    </form>
  );
};

export default IngredientForm;
