import { Trash2 } from 'lucide-react';
import React from 'react';

const DisplayedIngredientItem = ({
  id,
  icon,
  iconBgColor,
  name,
  unitPrice,
  quantity,
}: IngredientItemProps) => {

  const totalPrice = unitPrice * quantity;

  return (
    <div className="flex w-full items-center py-3">
      <div
        className={`flex h-9 w-9 mx-1 flex-shrink-0 items-center justify-center rounded-full ${iconBgColor}`}
      >
        <span className="text-2xl">{icon}</span>
      </div>

      <div className="flex-grow  w-9">
        <p className="font-semibold text-sm text-gray-700">{name}</p>
      </div>

      <div className="w-22  px-3">
        <p className="text-sm text-gray-600">
          ${unitPrice.toFixed(2)} x{quantity}
        </p>
      </div>

      <div className="w-13  text-left">
        <p className="font-semibold text-gray-900">€{totalPrice.toFixed(2)}</p>
      </div>
      <Trash2 size="18px" className=' transition-colors duration-200 hover:text-red-500 '/>
    </div>
  );
};

export default DisplayedIngredientItem;