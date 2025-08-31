"use client"

import React, { useState } from 'react';
import { RecipeIngredients } from '@/shemas/recipe';
import { getTotalPrice } from '@/app/services/helpers';
import { CircleDollarSign, ShoppingBasket, Coins } from 'lucide-react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FormFields } from '../../recipeForm';
import StatItem from './statItem';

const OrderTotal = ({ ingredients, getValues }: { ingredients: RecipeIngredients[], getValues: UseFormGetValues<FormFields> , setValue: UseFormSetValue<FormFields>}) => {

  const totalCost = getTotalPrice(ingredients);
  const sellingPrice = getValues('sellingPrice');
  const profitMargin = getValues('profitMargin');
  const foodCost = sellingPrice ? (totalCost / sellingPrice) * 100 : 0;
  const ingredientCount = ingredients.length;

  return (
    <div className="mt-1 p-2 w-full border-t border-dashed border-gray-300 flex flex-col justify-between ">
      <StatItem 
        icon={CircleDollarSign}
        label="Cost of goods"
        value={totalCost.toFixed(2)}
        unit="€"
      />
      <StatItem 
        icon={Coins}
        label="Selling price"
        value={sellingPrice}
        unit="€"
      />
      <StatItem 
        icon={Coins}
        label="Profit margin"
        value={profitMargin}
        unit="%"
      />
      <StatItem 
        icon={Coins}
        label="Food Cost"
        value={foodCost?.toFixed(2)}
        unit="%"
      />
      <StatItem 
        icon={ShoppingBasket}
        label="Items"
        value={ingredientCount}
      />
    </div>
  );
};

export default OrderTotal;