import express from 'express'
import { query } from '../db.js'
import { requireAuth } from '../auth.js'

const router = express.Router()

// 首次使用时自动建表（不需要手动跑迁移）
await query(`
  CREATE TABLE IF NOT EXISTS settings (
    key        VARCHAR(100) PRIMARY KEY,
    value      TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )
`)

// GET /api/settings — 返回所有配置（敏感字段脱敏）
router.get('/', requireAuth, async (req, res) => {
  const { rows } = await query('SELECT key, value, updated_at FROM settings')
  const data = {}
  for (const row of rows) {
    // API Key 只返回后 4 位用于展示
    if (row.key.includes('api_key') && row.value) {
      data[row.key] = { masked: '••••••••' + row.value.slice(-4), set: true }
    } else {
      data[row.key] = row.value
    }
  }
  res.json({ data })
})

// PUT /api/settings — 更新单个配置项
router.put('/', requireAuth, async (req, res) => {
  const { key, value } = req.body
  if (!key) return res.status(400).json({ error: '缺少 key' })
  await query(`
    INSERT INTO settings (key, value, updated_at)
    VALUES ($1, $2, NOW())
    ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()
  `, [key, value])
  res.json({ ok: true })
})

// 供其他模块读取原始值（内部使用）
export async function getSetting(key) {
  const { rows } = await query('SELECT value FROM settings WHERE key = $1', [key])
  return rows[0]?.value ?? null
}

export default router
