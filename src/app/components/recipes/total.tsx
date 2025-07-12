import React from 'react';
import { RecipeIngredients } from '@/shemas/recipe';
import { getTotalPrice } from '@/app/services/helpers';
import { CircleDollarSign, ShoppingBasket } from 'lucide-react';

const OrderTotal = ({ ingredients }: { ingredients: RecipeIngredients[] }) => {

  const totalPrice = getTotalPrice(ingredients);
  const ingredientCount = ingredients.length;

  return (
    <div className="mt-1 p-2 w-full border-t border-dashed border-gray-300 flex flex-col items-center justify-between ">
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center'>
          <CircleDollarSign className='mr-2' color='gray' />
          <p className="text-lg font-semibold text-gray-900">
            Total
          </p>
          
        </div>

        <p className="text-2xl font-bold text-gray-900">
          €{totalPrice.toFixed(2)}
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
