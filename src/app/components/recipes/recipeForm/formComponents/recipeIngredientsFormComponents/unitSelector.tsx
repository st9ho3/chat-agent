import React, { memo } from 'react';
import { Scale } from 'lucide-react';
import { Unit } from '@/shemas/recipe';

interface UnitSelectorProps {
  unit: Unit;
  availableUnits: Unit[];
  selectedIngredient: string;
  onUnitChange: (value: Unit) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLSelectElement>) => void;
}

const UnitSelector = memo(({
  unit,
  availableUnits,
  selectedIngredient,
  onUnitChange,
  onKeyDown,
}: UnitSelectorProps) => {
  return (
    <div className="flex items-center p-1 space-x-2 border-l border-dashed border-gray-300">
      <Scale className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
      <select
        name="unit"
        id="unit"
        value={unit}
        className="block w-24 p-2 text-sm bg-transparent focus:outline-none"
        onChange={(e) => onUnitChange(e.target.value as Unit)}
        onKeyDown={onKeyDown}
        disabled={!selectedIngredient}
      >
        <option value="" disabled>
          Unit
        </option>
        {availableUnits.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>
    </div>
  );
});

export default UnitSelector

UnitSelector.displayName = "UnitSelector"