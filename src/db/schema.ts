import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const RecipesTable = pgTable("recipes", {
    id: varchar().primaryKey(),
    title: varchar({length: 300}).notNull(),
    
})