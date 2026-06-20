import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM skill_categories ORDER BY sort_order')
    res.json({ data: rows })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const { name_zh, name_en, sort_order, skills } = req.body
  try {
    const { rows } = await query(`
      UPDATE skill_categories
      SET name_zh=$1, name_en=$2, sort_order=$3, skills=$4::jsonb, updated_at=NOW()
      WHERE id=$5
      RETURNING *
    `, [name_zh, name_en, sort_order ?? 0, JSON.stringify(skills ?? []), id])
    if (!rows.length) return res.status(404).json({ error: '分类不存在' })
    res.json({ data: rows[0] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
