import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM about WHERE id = 1')
    res.json({ data: rows[0] ?? null })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.put('/', requireAuth, async (req, res) => {
  const { description_zh, description_en, skill_tags_zh, skill_tags_en } = req.body
  try {
    await query(`
      INSERT INTO about (id, description_zh, description_en, skill_tags_zh, skill_tags_en, updated_at)
      VALUES (1, $1, $2, $3::jsonb, $4::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET
        description_zh=$1, description_en=$2,
        skill_tags_zh=$3::jsonb, skill_tags_en=$4::jsonb,
        updated_at=NOW()
    `, [
      description_zh, description_en,
      JSON.stringify(skill_tags_zh ?? []),
      JSON.stringify(skill_tags_en ?? []),
    ])
    const { rows } = await query('SELECT * FROM about WHERE id = 1')
    res.json({ data: rows[0] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
