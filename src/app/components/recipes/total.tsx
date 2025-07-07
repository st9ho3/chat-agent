import React from 'react';
import { IngredientItemProps } from '@/shemas/recipe';

const OrderTotal = ({ingredients}: {ingredients: IngredientItemProps[]}) => {
  
  const totalPrice = ingredients.reduce((sum, item) => {
    return sum + /* item.unitPrice */ 10 * item.quantity;
  }, 0);

  const ingredientCount = ingredients.length;

  return (
    <div className="mt-1 p-2 w-full border-t border-dashed border-gray-300 flex items-center justify-between ">
    
      <p className="text-lg font-semibold text-gray-900">
        Total
        <span className="ml-2 font-normal text-gray-500">
          
        </span>
      </p>

      <p className="text-2xl font-bold text-gray-900">
        €{totalPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default OrderTotal;