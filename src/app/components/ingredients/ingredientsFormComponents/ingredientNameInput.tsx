import { Carrot } from 'lucide-react';
import React, { memo } from 'react';

type IngredientNameInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const IngredientNameInput = memo(({ value, onChange, onKeyDown }: IngredientNameInputProps) => {
  
  console.log("IngredientNameInput")
  
  return (
  <div className='flex items-center p-1 space-x-3 border-dashed rounded-lg border-1 border-gray-300'>
    <Carrot />
    <input
      name="name"
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="p-1 text-lg placeholder:text-gray-500 w-36 focus:outline-none"
      placeholder="Ingredient Name"
    />
  </div>
)});

IngredientNameInput.displayName = "IngredientName"

export default IngredientNameInput