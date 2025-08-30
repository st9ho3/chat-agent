"use client"

import React, { useState } from 'react';
import { RecipeIngredients } from '@/shemas/recipe';
import { getTotalPrice } from '@/app/services/helpers';
import { CircleDollarSign, ShoppingBasket, Coins } from 'lucide-react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FormFields } from './recipeForm';

const OrderTotal = ({ ingredients, getValues, setValue }: { ingredients: RecipeIngredients[], getValues: UseFormGetValues<FormFields> , setValue: UseFormSetValue<FormFields>}) => {

  const totalCost = getTotalPrice(ingredients);
  const sellingprice = getValues('sellingPrice')
  const ingredientCount = ingredients.length;
  

  

  return (
    <div className="mt-1 p-2 w-full border-t border-dashed border-gray-300 flex flex-col items-center justify-between ">
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center'>
          <CircleDollarSign className='mr-2' color='gray' />
          <p className="text-lg font-semibold text-gray-900">
            Cost of goods
          </p>
          
        </div>

        <p className="text-2xl font-bold text-gray-900">
          €{totalCost.toFixed(2)}
        </p>
      </div>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center'>
          <Coins className='mr-2' color='gray' />
          <p className="text-lg font-semibold text-gray-900">
            Selling price
          </p>
          
        </div>

        <p className="text-2xl font-bold text-gray-900">
         € {sellingprice}
        </p>
      </div>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center'>
          <Coins className='mr-2' color='gray' />
          <p className="text-lg font-semibold text-gray-900">
            Profit margin
          </p>
          
        </div>

        <p className="text-2xl font-bold text-gray-900">
         {} %
        </p>
      </div>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center'>
          <Coins className='mr-2' color='gray' />
          <p className="text-lg font-semibold text-gray-900">
            Food Cost
          </p>
          
        </div>

        <p className="text-2xl font-bold text-gray-900">
         {} %
        </p>
      </div>

      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center'>
          <ShoppingBasket className='mr-2' color='gray' />
        <p className="text-lg font-semibold text-gray-900">
          Items
        </p>
        
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {ingredientCount}
        </p>
      </div>
    </div>
  );
};

export default OrderTotal;
