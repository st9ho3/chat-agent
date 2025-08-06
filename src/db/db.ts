// db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Make sure your DATABASE_URL from Neon is the "Pooled" connection string
// It should look like: postgresql://user:pass@host/db?sslmode=require
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

// This driver supports transactions
export const db = drizzle(pool, { schema });