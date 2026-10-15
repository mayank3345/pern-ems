import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon serverless Postgres
  },
});

pool.on('connect', () => {
  console.log('✅ Connected to Neon Serverless PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
});

export const query = (text, params) => pool.query(text, params);