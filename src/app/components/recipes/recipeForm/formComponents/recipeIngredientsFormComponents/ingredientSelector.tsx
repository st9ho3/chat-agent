import React from 'react';
import { Carrot } from 'lucide-react';
import { Ingredient } from '@/shemas/recipe';

interface IngredientSelectorProps {
  ingredients: Ingredient[];
  selectedIngredient: string;
  onIngredientChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLSelectElement>) => void;
}

export const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  ingredients,
  selectedIngredient,
  onIngredientChange,
  onKeyDown,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Carrot className="h-5 w-5 text-gray-400 flex-shrink-0" />
      <select
        value={selectedIngredient}
        onChange={(e) => onIngredientChange(e.target.value)}
        className="w-full md:w-37 p-2 bg-transparent focus:outline-none appearance-none"
        onKeyDown={onKeyDown}
      >
        <option value="" disabled>
          Select ingredient...
        </option>
        {ingredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.name}>
            {ingredient.name}
          </option>
        ))}
      </select>
    </div>
  );
};