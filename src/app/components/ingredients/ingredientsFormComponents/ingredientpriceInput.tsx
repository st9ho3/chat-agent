import { Euro } from 'lucide-react';
import { memo } from 'react';

type IngredientPriceInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
};

const IngredientPriceInput = memo(({ value, onChange, onKeyDown, onFocus, onBlur }: IngredientPriceInputProps) => {
  console.log("IngredientPriceInput")
  return (
  <div className='flex items-center p-1 space-x-3 border-dashed rounded-lg border-1 border-gray-300'>
    <Euro />
    <input
      name='price'
      type="text"
      value={value}
      className="p-1 text-lg placeholder:text-gray-500 w-20 focus:outline-none"
      placeholder="Price"
      onKeyDown={onKeyDown}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      pattern="[0-9]*[.]?[0-9]*"
    />
  </div>
)});

IngredientPriceInput.displayName = "IngredientPriceInput"

export default IngredientPriceInput