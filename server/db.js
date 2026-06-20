import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

const pool = new Pool({
  host:     process.env.DB_HOST || '127.0.0.1',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'resume_cms',
  user:     process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
})

pool.on('error', (err) => console.error('PostgreSQL pool error:', err))

export const query = (sql, params) => pool.query(sql, params)
