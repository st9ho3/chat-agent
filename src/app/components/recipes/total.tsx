import React from 'react';

const OrderTotal = ({ingredients}: {ingredients: IngredientItemProps[]}) => {
  
  const totalPrice = ingredients.reduce((sum, item) => {
    return sum + item.unitPrice * item.quantity;
  }, 0);

  const ingredientCount = ingredients.length;

  return (
    <div className="mt-6 border-t border-dashed border-gray-300 flex items-center justify-between p-3">
    
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