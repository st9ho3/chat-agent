import { describe, test, expect } from '@jest/globals';
import { getTotalPrice, normalizePrice } from "./helpers";
import { RecipeIngredients } from "@/shemas/recipe";

export const mockIngredients: RecipeIngredients[] = [
  {
    recipeId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    ingredientId: "12345678-90ab-cdef-1234-567890abcdef",
    name: "Flour",
    iconBgColor: "#f5f5dc",
    unit: "g",
    unitPrice: 1,
    quantity: 500,
  },
  {
    recipeId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    ingredientId: "98765432-10ab-cdef-1234-567890abcdef",
    name: "Sugar",
    iconBgColor: "#ffffff",
    unit: "g",
    unitPrice: 1,
    quantity: 100,
  },
  {
    recipeId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    ingredientId: "567890ab-cdef-1234-5678-90abcdef1234",
    name: "Eggs",
    iconBgColor: "#fdfd96",
    unit: "pcs",
    unitPrice: 1,
    quantity: 300,
  },
  {
    recipeId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    ingredientId: "abcdef12-3456-7890-abcd-ef1234567890",
    name: "Milk",
    iconBgColor: "#add8e6",
    unit: "ml",
    unitPrice: 1,
    quantity: 200,
  },
];

describe("getTotalPrice", () => {

    test("Gets an array of ingredient objects and returns the total cost", () => {

        const totalPrice = getTotalPrice(mockIngredients)

        expect(totalPrice).toBe(1100)
    })
})

describe("normalizePrice", () => {

    test("normalizes the price based on kg", () => {

        const price = "10"
        const unit = "kg"
        const quantity = 4

        const result = normalizePrice(price, unit, quantity)

        expect(result).toBe(0.0025)
    })

    test("normalizes the price based on g", () => {

        const price = "10"
        const unit = "g"
        const quantity = 4

        const result = normalizePrice(price, unit, quantity)

        expect(result).toBe(2.5)
    })

    test("normalizes the price based on L", () => {

        const price = "10"
        const unit = "L"
        const quantity = 4

        const result = normalizePrice(price, unit, quantity)

        expect(result).toBe(0.0025)
    })

    test("normalizes the price based on ml", () => {

        const price = "10"
        const unit = "ml"
        const quantity = 4

        const result = normalizePrice(price, unit, quantity)

        expect(result).toBe(2.5)
    })

    test("Should return 0 if price not Numeric", () => {

        const price = "not Numeric"
        const unit = "kg"
        const quantity = 4

        const result = normalizePrice(price, unit, quantity)

        expect(result).toBe(0)
    })

    test("Should return 0 if quantity is 0", () => {

        const price = "10"
        const unit = "kg"
        const quantity = 0

        const result = normalizePrice(price, unit, quantity)

        expect(result).toBe(0)
    })

    test("Should return 0 if the unit is not recognised", () => {

        const price = "10"
        const unit = "piece"
        const quantity = 0

        const result = normalizePrice(price, unit, quantity)

        expect(result).toBe(0)
    })

    
})