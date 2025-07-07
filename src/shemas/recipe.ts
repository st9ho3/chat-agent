// src/schemas/appSchemas.ts
import { z } from 'zod';

// -----------------------------------------------------------------------------
// 1. Unit (type Unit = 'g' | 'ml' | 'kg' | 'L')
// -----------------------------------------------------------------------------
export const UnitSchema = z.union([
  z.literal('g'),
  z.literal('ml'),
  z.literal('kg'),
  z.literal('L')
], {
  errorMap: (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_union) {
      return { message: "Invalid unit. Must be 'g', 'ml', 'kg', or 'L'." };
    }
    return { message: ctx.defaultError };
  }
});

export type Unit = z.infer<typeof UnitSchema>; // Inferred Type: 'g' | 'ml' | 'kg' | 'L'

// -----------------------------------------------------------------------------
// 2. Ingredient (interface Ingredient) - Represents a master ingredient
// -----------------------------------------------------------------------------
export const IngredientSchema = z.object({
  id: z.string().uuid("Invalid ingredient ID format"), // Assuming UUID for IDs
  title: z.string().min(1, "Ingredient title is required"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  unitMeasure: UnitSchema, // Reusing the UnitSchema
});

export type Ingredient = z.infer<typeof IngredientSchema>; // Inferred Type: Ingredient


// -----------------------------------------------------------------------------
// 3. Recipe's Nested Ingredient (part of Recipe interface)
//    Note: This is distinct from the top-level Ingredient schema
// -----------------------------------------------------------------------------
export const RecipeIngredientSchema = z.object({
  ingredient: z.string().min(1, "Ingredient name is required"), // This is the ingredient's name/title
  quantity: z.number().min(0.01, "Quantity must be positive"),
  unit: UnitSchema, // Reusing the UnitSchema
});

export type RecipeIngredient = z.infer<typeof RecipeIngredientSchema>; // Inferred Type for nested ingredient


// -----------------------------------------------------------------------------
// 4. Recipe (interface Recipe)
// -----------------------------------------------------------------------------
export const RecipeCategorySchema = z.union([
  z.literal('starter'),
  z.literal('main'),
  z.literal('dessert')
], {
  errorMap: (issue, ctx) => ({ message: "Invalid category. Must be 'starter', 'main', or 'dessert'." })
});

export const RecipeSchema = z.object({
  id: z.string().uuid("Invalid recipe ID format"),
  title: z.string().min(3, "Recipe title must be at least 3 characters").max(200, "Title cannot exceed 200 characters"),
  totalCost: z.number().min(0, "Total cost cannot be negative"),
  ingredients: z.array(RecipeIngredientSchema).min(1, "Recipe must have at least one ingredient"),
  createdBy: z.string().min(1, "Creator ID is required"),
  // dateCreated: Date; - Zod requires a specific type, preprocess helps parse various inputs to a Date object
  dateCreated: z.date(),
  category: RecipeCategorySchema, // Reusing the category schema
  imgPath: z.string().url("Image path must be a valid URL").optional(), // Assuming it might be optional or can be an empty string if allowed as input
});

export type Recipe = z.infer<typeof RecipeSchema>; // Inferred Type: Recipe


// -----------------------------------------------------------------------------
// 5. Column (interface Column)
// -----------------------------------------------------------------------------
export const ColumnSchema = z.object({
  header: z.string().min(1, "Column header is required"),
  accessor: z.string().min(1, "Column accessor is required"),
  className: z.string().optional(), // className is optional
});

export type Column = z.infer<typeof ColumnSchema>; // Inferred Type: Column


// -----------------------------------------------------------------------------
// 6. IngredientItemProps (interface IngredientItemProps)
//    Note: React.ReactNode is a UI concept, Zod validates data.
//    Representing `icon` as `z.any().optional()` as Zod won't validate a JSX element.
// -----------------------------------------------------------------------------
export const IngredientItemPropsSchema = z.object({
  id: z.string().uuid("Invalid ID for ingredient item props"),
  icon: z.any().optional(), // For React.ReactNode, Zod just checks its presence/type at a basic level
  iconBgColor: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  unit: z.string().min(1, "Unit is required"), // Assuming this is the string representation, not necessarily constrained by `UnitSchema` here
  unitPrice: z.number().nonnegative("Unit price must be non-negative").optional(),
  quantity: z.number().min(0, "Quantity must be non-negative"),
});

export type IngredientItemProps = z.infer<typeof IngredientItemPropsSchema>; // Inferred Type: IngredientItemProps