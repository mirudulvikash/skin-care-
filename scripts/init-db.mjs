import pg from 'pg';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const connectionString = process.env.AIVEN_DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
  connectionString: connectionString || '',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});

const schemaPath = path.resolve(__dirname, '../lib/db/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

async function run() {
  if (!connectionString || connectionString.includes('<PASSWORD>')) {
    console.warn('[WARN] Valid AIVEN_DATABASE_URL not found; skipping remote DB execution.');
    return;
  }
  let client;
  try {
    client = await pool.connect();
    await client.query(schema);
    console.log('[SUCCESS] Aiven PostgreSQL table "scans" initialized and verified.');
  } catch (err) {
    if (err instanceof Error) {
      console.warn('[DB WARNING] Could not run live migration on Aiven:', err.message);
    }
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

run();
