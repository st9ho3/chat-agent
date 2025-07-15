import { Trash2 } from 'lucide-react';
import React from 'react';

const DisplayedIngredientItem = ({
  id,
  name,
  unit,
  unitPrice=10,
  quantity,
  onRemove
}: {
  id:string
  icon?:string
  iconBgColor?:string
  name:string
  unit:string
  unitPrice:number
  quantity:number
  onRemove: (value: string) => void
}) => {

  const totalPrice = unitPrice * quantity;

  return (
    <div className="flex w-full items-center p-2">
      {/* <div
        className={`flex h-9 w-9 mx-1 flex-shrink-0 items-center justify-center rounded-full ${iconBgColor}`}
      >
        <span className="text-2xl">{icon}</span>
      </div> */}

      <div className="min-w-fit flex-grow">
        <p className="font-semibold text-sm text-gray-700">{name}</p>
      </div>

      <div className="w-30  px-3">
        <p className="text-sm text-gray-600">
          ${unitPrice.toFixed(2)} x{quantity}{unit}
        </p>
      </div>

      <div className="w-19  text-left">
        <p className="font-semibold text-gray-900">€{totalPrice.toFixed(2)}</p>
      </div>
      <Trash2 onClick={() => onRemove(id)} size="18px" className=' transition-colors duration-200 hover:text-red-500 mr-1'/>
    </div>
  );
};

export default DisplayedIngredientItem;