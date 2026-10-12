import { Pool } from 'pg';

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    const connectionString = process.env.AIVEN_DATABASE_URL;
    if (!connectionString) {
      console.warn('AIVEN_DATABASE_URL is not set in environment variables. Database operations may fail.');
    }
    pool = new Pool({
      connectionString: connectionString || '',
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }
  return pool;
}

export async function query(text: string, params?: any[]) {
  const db = getDbPool();
  return db.query(text, params);
}
