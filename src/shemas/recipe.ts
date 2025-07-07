import {z} from 'zod'

const ingredientSchema = z.object({
    id: z.string(),
    title: z.string(),
    price: z.number().min(0, "Price can't be negative"),
    unitMeasure: z.union([z.literal('g'), z.literal('ml'), z.literal('kg'), z.literal('L')])
})

export const recipeSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    totalCost: z.number().min(0,'Cannot be negative'),
    ingredients: z.array(ingredientSchema),
    createdBy: z.string(),
    dateCreated: z.date(),
    category: z.union([z.literal('starter'),z.literal('main'),z.literal('dessert')]),
    imgPath: z.string().optional()
})

export const addIngredientSchema = z.object({
    id: z.string(),
    title: z.string(),
    price: z.number().min(0, "Price can't be negative"),
    unitMeasure: z.union([z.literal('g'), z.literal('ml'), z.literal('kg'), z.literal('L')]),
    quantity: z.number().min(1, "Can't be 0")
})