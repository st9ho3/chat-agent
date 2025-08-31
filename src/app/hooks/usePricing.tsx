import { useState } from 'react';
import { UseFormSetValue, UseFormGetValues, UseFormWatch } from 'react-hook-form';
import { FormFields } from '@/app/components/recipes/recipeForm/recipeForm';
import { getTotalPrice } from '../services/helpers';
import { RecipeIngredients } from '@/shemas/recipe';

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

  const calculateSellingPrice = (cost: number, profitMargin: number, tax: number): number | undefined => {
  const denominator = (1 - tax) - (profitMargin / 100);
  if (denominator > 0) {
    return cost / denominator;
  }
  return undefined;
};

const calculateProfitMargin = (cost: number, sellingPrice: number, tax: number): number | undefined => {
  if (sellingPrice > 0) {
    console.log(sellingPrice)
    console.log(sellingPrice*tax)
    console.log(cost)
    console.log(sellingPrice - (sellingPrice * tax) - cost)
    console.log(((sellingPrice - (sellingPrice * tax) - cost) / sellingPrice))
    return ((sellingPrice - (sellingPrice * tax) - cost) / sellingPrice) * 100;
    
  }
  console.error("Selling price must be greater than zero to calculate profit margin.");
  return undefined;
};

  // Manual calculate function (still useful for the calculate button)
  const calculate = (e: React.MouseEvent<HTMLButtonElement>)=> {
    e.preventDefault()
    const tax = getValues('tax')
    const cost = getTotalPrice(ingredients)
    const initialPrice = getValues('sellingPrice')
    const initialProfitMargin = getValues('profitMargin')
    if (initialPrice && initialPrice > 0 ) {
     let profit = calculateProfitMargin(cost, initialPrice, tax)
     console.log(profit)
     console.log(initialProfitMargin)
      setValue('profitMargin',profit)
    }
    if (initialProfitMargin && initialProfitMargin > 0 ) {
     let price = calculateSellingPrice(cost, initialProfitMargin, tax)
      setValue('profitMargin', Number(price?.toFixed(2)))
    }
  }

  return {
    selectedPricingMethod,
    handlePricingMethodChange,
    handleInputFocus,
    isFieldDisabled,
    getFieldClasses,
    calculate
  };
};