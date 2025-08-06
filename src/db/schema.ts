import { relations } from "drizzle-orm";
import { date, numeric, pgEnum, uuid, pgTable, varchar, serial } from "drizzle-orm/pg-core";
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgTransaction } from 'drizzle-orm/pg-core';
import * as schema from './schema';


type Schema = typeof import('./schema');
export type Database = NodePgDatabase<typeof schema>;
export type Transaction = PgTransaction<any, typeof schema, any>;

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
  imgPath: varchar("img_path"),
  tax: numeric("tax").notNull()
});

// Defines the 'ingredients' table schema for individual ingredients.
export const ingredientsTable = pgTable('ingredients', {
  id: uuid('id').primaryKey(), 
  icon: varchar('icon'), 
  name: varchar('name', { length: 255 }).notNull(), 
  unit: varchar('unit', { length: 50 }).notNull(), 
  unitPrice: numeric('unit_price', { precision: 10, scale: 5 }).notNull(),
  quantity: numeric('quantity').notNull(),
  usage: numeric('usage').notNull().default('1') 
});

// Defines the 'recipeIngredients' table schema, linking recipes and ingredients.
export const recipeIngredientsTable = pgTable("recipeIngredients", {
id: serial("id").unique(),  
recipeId: uuid("recipe_id").references(() =>  recipesTable.id, {onDelete: 'cascade'}),
ingredientId: uuid("ingredient_id").references(() =>  ingredientsTable.id),
quantity: numeric("quantity").notNull()
});

export const recipeRelations = relations(recipesTable,({many}) => ({
  recipeIngredients: many(recipeIngredientsTable)
}))

export const ingredientRelations = relations(ingredientsTable, ({many}) => ({
  recipeIngredients: many(recipeIngredientsTable)
}))

export const recipeIngredientsRelations = relations(recipeIngredientsTable, ({one}) => ({
  recipes: one(recipesTable, {
    fields: [recipeIngredientsTable.recipeId],
    references: [recipesTable.id]
  }),
  ingredients: one(ingredientsTable, {
    fields: [recipeIngredientsTable.ingredientId],
    references: [ingredientsTable.id]
  })
}))