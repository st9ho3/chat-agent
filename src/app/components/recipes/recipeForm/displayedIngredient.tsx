import { Apple, Trash2 } from 'lucide-react';
import React from 'react';

const DisplayedIngredientItem = ({
  id,
  name,
  unit,
  unitPrice,
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

  const totalPrice = unit === "kg" || unit === "L" ? unitPrice * quantity*1000 : unitPrice* quantity
  
  return (
    <div className="flex w-full items-center p-1">
      <div
        className={`flex h-7 w-7 mr-2 flex-shrink-0 items-center justify-center rounded-full bg-red-50 `}
      >
        <Apple size={16} />
      </div>

      <div className="min-w-fit w-26 flex-grow">
        <p className="font-semibold text-sm text-gray-700">{name}</p>
      </div>

      <div className="w-26  px-2">
        <p className="text-sm font-bold text-gray-500">
          {quantity} {unit}
        </p>
      </div>

      <div className="w-15  text-left">
        <p className="font-semibold text-gray-900">€{totalPrice.toFixed(2)}</p>
      </div>
      <Trash2 onClick={() => onRemove(id)} size="18px" className=' transition-colors duration-200 hover:text-red-500 ml-3'/>
    </div>
  );
};

export default DisplayedIngredientItem;