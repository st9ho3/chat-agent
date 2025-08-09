import { Euro, Percent } from 'lucide-react';
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormFields } from './recipeForm';

// Define props for the component
type PricingCostsProps = {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  children: React.ReactNode;
};

const Pricing: React.FC<PricingCostsProps> = ({ children, register, errors }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
        <div className="flex flex-col items-center gap-2  w-full flex-grow">
          <div className="flex items-center justify-start w-full border border-dashed border-gray-300 rounded-2xl flex-grow p-2">
            <input type="radio" name="selected_pricing" className='mx-2'/>
            <div className='w-fit mx-2'>
              My price is: 
            </div>
            <Euro className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
            <input
              type="number"
              step="0.01"
              {...register('sellingPrice', { valueAsNumber: true })}
              onKeyDown={handleKeyDown}
              className="px-3 placeholder:text-gray-500  text-md focus:outline-none flex-grow"
              placeholder="Selling price"
            />
          </div>
          <div className="flex items-center justify-start w-full border border-dashed border-gray-300 rounded-2xl flex-grow p-2">
            <input type="radio" name="selected_pricing" className='mx-2'/>
            <div className='w-fit mx-2'>
              My profit margin is:  
            </div>
            <Percent className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <input
              type="number"
              step="0.01"
              {...register('profitMargin', { valueAsNumber: true })}
              onKeyDown={handleKeyDown}
              className="px-3 placeholder:text-gray-500 text-md focus:outline-none flex-grow"
              placeholder="Profit margin"
            />
          </div>
          <div className="flex items-center justify-between w-full border border-dashed border-gray-300 rounded-lg flex-grow px-1">
            My additional tax is: 
            {children}
               <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors w-full sm:w-auto flex-shrink-0"
        >
          <span className="sm:inline">Calculate</span>
        </button>
          </div>
          
         
        </div>
        
      </div>
      {(errors.sellingPrice || errors.profitMargin) && (
        <div className="flex gap-x-4 ml-2">
            {errors.sellingPrice && <p className="text-red-500 text-sm">{errors.sellingPrice.message}</p>}
            {errors.profitMargin && <p className="text-red-500 text-sm">{errors.profitMargin.message}</p>}
        </div>
      )}
    </div>
  );
};

export default Pricing;