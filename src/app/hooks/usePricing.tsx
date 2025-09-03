import { useState } from 'react';
import { UseFormSetValue, UseFormGetValues, UseFormWatch } from 'react-hook-form';
import { FormFields } from '@/app/components/recipes/recipeForm/recipeForm';
import { getTotalPrice } from '../services/helpers';
import { RecipeIngredients } from '@/shemas/recipe';
import { calculateProfitMargin, calculateSellingPrice } from '../services/helpers';

export type PricingMethod = "price" | "profit" | "";

export const usePricing = (
  setValue: UseFormSetValue<FormFields>,
  getValues: UseFormGetValues<FormFields>,
  ingredients: RecipeIngredients[],
  
) => {
  const [selectedPricingMethod, setSelectedPricingMethod] = useState<PricingMethod>("");

  const handlePricingMethodChange = (method: PricingMethod) => {
    setSelectedPricingMethod(method);
    // Reset both values when switching methods
    setValue("profitMargin", 0);
    setValue("sellingPrice", 0);
  };

  const handleInputFocus = (fieldName: "sellingPrice" | "profitMargin") => {
    const currentValue = getValues(fieldName);
    if (currentValue === 0) {
      setValue(fieldName, undefined, { shouldValidate: true });
    }
  };

  const isFieldDisabled = (fieldType: "price" | "profit"): boolean => {
    if (!selectedPricingMethod) return true;
    return fieldType !== selectedPricingMethod;
  };

  const getFieldClasses = (fieldType: "price" | "profit"): string => {
    const baseClasses = "px-3 placeholder:text-gray-500 text-md focus:outline-none flex-grow";
    const disabledClasses = "rounded-lg disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200";
    
    return isFieldDisabled(fieldType) ? `${baseClasses} ${disabledClasses}` : baseClasses;
  };

  // Manual calculate function (still useful for the calculate button)
  const calculate = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  const tax = getValues('tax');
  const cost = getTotalPrice(ingredients);
  const initialPrice = getValues('sellingPrice');
  const initialProfitMargin = getValues('profitMargin');

  if (selectedPricingMethod === "price" && initialPrice && initialPrice > 0) {
    const profit = calculateProfitMargin(cost, initialPrice, tax);
    setValue('profitMargin', profit ? Number(profit.toFixed(2)) : 0);
  } else if (selectedPricingMethod === "profit" && initialProfitMargin && initialProfitMargin > 0) {
    const price = calculateSellingPrice(cost, initialProfitMargin, tax);
    setValue('sellingPrice', price ? Number(price.toFixed(2)) : 0);
  } else {
    if (initialPrice && initialProfitMargin) {
      const profit = calculateProfitMargin(cost, initialPrice, tax);
      setValue('profitMargin', profit ? Number(profit.toFixed(2)) : 0);
    }
  }
};

  return {
    selectedPricingMethod,
    handlePricingMethodChange,
    handleInputFocus,
    isFieldDisabled,
    getFieldClasses,
    calculate
  };
};