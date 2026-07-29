import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Deteksi apakah koneksi mengarah ke Supabase / Production
const isProduction = process.env.NODE_ENV === 'production' || process.env.DATABASE_URL?.includes('supabase');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false, // Wajib untuk Supabase
});

export default pool;
