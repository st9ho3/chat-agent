"use client"
import React from 'react';
import { BanknoteX } from "lucide-react";
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormFields } from './recipeForm'; // Import your FormFields type

// Define props for the component
type AdditionalCostsProps = {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
}

const AdditionalCosts: React.FC<AdditionalCostsProps> = ({ register, errors}) => {
  return (
    <div>
      <div className="flex flex-col justify-evenly md:flex-row items-center rounded-lg space-x-2 p-2">
        <div className='flex items-center space-x-3'>
          <div className='flex items-center border-1 border-gray-300 border-dashed rounded-lg space-x-3 p-1'>
            <BanknoteX />
            <select
              {...register('tax', { valueAsNumber: true })}
              className="block w-20 p-2 text-lg focus:outline-none bg-white text-gray-800"
              name="tax"
              id="tax"
              
            >
              <option value={0}>ΦΠΑ</option>
              <option value={0.13}>13%</option>
              <option value={0.24}>24%</option>
            </select>
          </div>
        </div>
      </div>
      {errors.tax && <p className='text-red-500 ml-3'>{errors.tax.message}</p>}
    </div>
  )
}

export default AdditionalCosts;