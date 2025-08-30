import { useState } from 'react';
import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { FormFields } from '@/app/components/recipes/recipeForm/recipeForm';

export type PricingMethod = "price" | "profit" | "";

export const usePricing = (
  setValue: UseFormSetValue<FormFields>,
  getValues: UseFormGetValues<FormFields>
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

  return {
    selectedPricingMethod,
    handlePricingMethodChange,
    handleInputFocus,
    isFieldDisabled,
    getFieldClasses,
  };
};