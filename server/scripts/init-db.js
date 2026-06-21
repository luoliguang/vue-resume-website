import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'
import dotenv from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env') })

const BASE = {
  host:     process.env.DB_HOST     || '127.0.0.1',
  port:     Number(process.env.DB_PORT) || 5432,
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '',
}
const DB_NAME = process.env.DB_NAME || 'resume_cms'

// ── Step 1: ensure database exists ──────────────────────────
console.log(`Connecting to postgres@ ${BASE.host}:${BASE.port}…`)
const adminPool = new pg.Pool({ ...BASE, database: 'postgres' })
const adminClient = await adminPool.connect()
try {
  const { rows } = await adminClient.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`, [DB_NAME]
  )
  if (rows.length === 0) {
    await adminClient.query(`CREATE DATABASE "${DB_NAME}"`)
    console.log(`  Created database: ${DB_NAME}`)
  } else {
    console.log(`  Database already exists: ${DB_NAME}`)
  }
} finally {
  adminClient.release()
  await adminPool.end()
}

// ── Step 2: run init.sql in resume_cms ──────────────────────
console.log(`Running init.sql in ${DB_NAME}…`)
const appPool = new pg.Pool({ ...BASE, database: DB_NAME })
const client = await appPool.connect()

const sql = readFileSync(join(__dirname, '../sql/init.sql'), 'utf8')
const statements = sql.split(';').map(s => s.trim()).filter(Boolean)

try {
  for (const stmt of statements) {
    if (!stmt.trim()) continue
    try {
      const result = await client.query(stmt)
      if (result.rows?.length) {
        const cols = Object.keys(result.rows[0])
        const widths = cols.map(c => Math.max(c.length, ...result.rows.map(r => String(r[c]).length)))
        const row = r => cols.map((c, i) => String(r[c]).padEnd(widths[i])).join('  ')
        console.log('\n' + cols.map((c, i) => c.padEnd(widths[i])).join('  '))
        console.log(widths.map(w => '-'.repeat(w)).join('  '))
        result.rows.forEach(r => console.log(row(r)))
      } else if (result.command) {
        console.log(`  ${result.command}${result.rowCount != null ? ` (${result.rowCount})` : ''}`)
      }
    } catch (err) {
      console.error(`\nFailed:\n${stmt}\n\nError: ${err.message}\n`)
      process.exit(1)
    }
  }
  console.log('\nDatabase initialized successfully.')
} finally {
  client.release()
  await appPool.end()
}
