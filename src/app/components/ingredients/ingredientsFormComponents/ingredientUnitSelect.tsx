import { Scale } from 'lucide-react';

type IngredientUnitSelectProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLSelectElement>) => void;
};

const IngredientUnitSelect = ({ value, onChange, onKeyDown }: IngredientUnitSelectProps) => (
  <div className='flex items-center p-1 space-x-3 border-dashed rounded-lg border-1 border-gray-300'>
    <Scale />
    <select
      name="unit"
      id="unit"
      value={value}
      className="block w-20 p-2 text-lg bg-white text-gray-800 focus:outline-none"
      onChange={onChange}
      onKeyDown={onKeyDown}
    >
      <option value="">Unit</option>
      <option value="kg">kg</option>
      <option value="L">L</option>
      <option value="g">g</option>
      <option value="ml">ml</option>
      <option value="piece">piece</option>
    </select>
  </div>
);

export default IngredientUnitSelect