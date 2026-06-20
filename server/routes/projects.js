import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM projects ORDER BY sort_order, id')
    res.json({ data: rows })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/', requireAuth, async (req, res) => {
  const b = req.body
  try {
    const { rows } = await query(`
      INSERT INTO projects
        (title_zh, title_en, description_zh, description_en, image, detail_images, technologies,
         category, type, demo_type, link, status, image_ratio, media_type, preview_gif,
         challenge_zh, challenge_en, solution_zh, solution_en, result_zh, result_en,
         before_zh, before_en, after_zh, after_en, sort_order)
      VALUES ($1,$2,$3,$4,$5,$6::jsonb,$7::jsonb,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)
      RETURNING *
    `, [
      b.title_zh, b.title_en, b.description_zh, b.description_en,
      b.image, JSON.stringify(b.detail_images ?? []), JSON.stringify(b.technologies ?? []),
      b.category ?? 'personal', b.type, b.demo_type ?? 'link', b.link,
      b.status ?? 'completed', b.image_ratio ?? '16/9', b.media_type, b.preview_gif,
      b.challenge_zh, b.challenge_en, b.solution_zh, b.solution_en,
      b.result_zh, b.result_en, b.before_zh, b.before_en, b.after_zh, b.after_en,
      b.sort_order ?? 0,
    ])
    res.status(201).json({ data: rows[0] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.put('/:id', requireAuth, async (req, res) => {
  const b = req.body
  const { id } = req.params
  try {
    const { rows } = await query(`
      UPDATE projects SET
        title_zh=$1, title_en=$2, description_zh=$3, description_en=$4, image=$5,
        detail_images=$6::jsonb, technologies=$7::jsonb, category=$8, type=$9,
        demo_type=$10, link=$11, status=$12, image_ratio=$13, media_type=$14, preview_gif=$15,
        challenge_zh=$16, challenge_en=$17, solution_zh=$18, solution_en=$19,
        result_zh=$20, result_en=$21, before_zh=$22, before_en=$23, after_zh=$24, after_en=$25,
        sort_order=$26, updated_at=NOW()
      WHERE id=$27
      RETURNING *
    `, [
      b.title_zh, b.title_en, b.description_zh, b.description_en,
      b.image, JSON.stringify(b.detail_images ?? []), JSON.stringify(b.technologies ?? []),
      b.category ?? 'personal', b.type, b.demo_type ?? 'link', b.link,
      b.status ?? 'completed', b.image_ratio ?? '16/9', b.media_type, b.preview_gif,
      b.challenge_zh, b.challenge_en, b.solution_zh, b.solution_en,
      b.result_zh, b.result_en, b.before_zh, b.before_en, b.after_zh, b.after_en,
      b.sort_order ?? 0, id,
    ])
    if (!rows.length) return res.status(404).json({ error: '项目不存在' })
    res.json({ data: rows[0] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await query('DELETE FROM projects WHERE id=$1', [req.params.id])
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
