import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM journey_milestones ORDER BY sort_order, id')
    res.json({ data: rows })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/', requireAuth, async (req, res) => {
  const { year, title_zh, title_en, description_zh, description_en, icon, milestone_status, sort_order } = req.body
  try {
    const { rows } = await query(`
      INSERT INTO journey_milestones
        (year, title_zh, title_en, description_zh, description_en, icon, milestone_status, sort_order)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
    `, [year, title_zh, title_en ?? title_zh, description_zh, description_en ?? description_zh,
        icon ?? 'code', milestone_status ?? 'completed', sort_order ?? 0])
    res.status(201).json({ data: rows[0] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const { year, title_zh, title_en, description_zh, description_en, icon, milestone_status, sort_order } = req.body
  try {
    const { rows } = await query(`
      UPDATE journey_milestones
      SET year=$1, title_zh=$2, title_en=$3, description_zh=$4, description_en=$5,
          icon=$6, milestone_status=$7, sort_order=$8, updated_at=NOW()
      WHERE id=$9
      RETURNING *
    `, [year, title_zh, title_en ?? title_zh, description_zh, description_en ?? description_zh,
        icon ?? 'code', milestone_status ?? 'completed', sort_order ?? 0, id])
    if (!rows.length) return res.status(404).json({ error: '里程碑不存在' })
    res.json({ data: rows[0] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await query('DELETE FROM journey_milestones WHERE id=$1', [req.params.id])
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
