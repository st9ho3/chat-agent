import { date, numeric, pgEnum, uuid, pgTable, varchar } from "drizzle-orm/pg-core";

// Defines an enum for recipe categories.
export const recipeCategoryEnum = pgEnum("recipe_category", ["starter", "main", "dessert"])

// Defines the 'recipes' table schema.
export const recipesTable = pgTable("recipes", {
  id: uuid("id").primaryKey(),
  title: varchar("name", {length: 200}).notNull().unique(),
  totalCost: numeric("total_cost").notNull(),
  createdBy: varchar("created_by").notNull(),
  dateCreated: date("date").notNull(),
  category: recipeCategoryEnum("category").notNull(),
  imgPath: varchar("img_path")
});

// Defines the 'ingredients' table schema for individual ingredients.
export const ingredientsTable = pgTable('ingredients', {
  id: uuid('id').primaryKey(), 
  icon: varchar('icon'), 
  name: varchar('name', { length: 255 }).notNull(), 
  unit: varchar('unit', { length: 50 }).notNull(), 
  unitPrice: numeric('unit_price', { precision: 10, scale: 2 }), 
});

// Defines the 'recipeIngredients' table schema, linking recipes and ingredients.
export const recipeIngredientsTable = pgTable("recipeIngredients", {
recipeId: uuid("recipe_id").references(() =>  recipesTable.id, {onDelete: 'cascade'}),
ingredientId: uuid("ingredient_id").references(() =>  ingredientsTable.id),
quantity: numeric("quantity").notNull()
});