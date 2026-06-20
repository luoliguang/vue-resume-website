import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM hero WHERE id = 1')
    res.json({ data: rows[0] ?? null })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.put('/', requireAuth, async (req, res) => {
  const b = req.body
  try {
    await query(`
      INSERT INTO hero (id,
        title_zh, title_en, nickname, real_name_zh, real_name_en,
        subtitle_zh, subtitle_en, description_zh, description_en,
        quick_intro_text_zh, quick_intro_text_en,
        quick_intro_label1_zh, quick_intro_label1_en, quick_intro_value1_zh, quick_intro_value1_en,
        quick_intro_label2_zh, quick_intro_label2_en, quick_intro_value2_zh, quick_intro_value2_en,
        quick_intro_label3_zh, quick_intro_label3_en, quick_intro_value3_zh, quick_intro_value3_en,
        updated_at)
      VALUES (1,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,NOW())
      ON CONFLICT (id) DO UPDATE SET
        title_zh=$1, title_en=$2, nickname=$3, real_name_zh=$4, real_name_en=$5,
        subtitle_zh=$6, subtitle_en=$7, description_zh=$8, description_en=$9,
        quick_intro_text_zh=$10, quick_intro_text_en=$11,
        quick_intro_label1_zh=$12, quick_intro_label1_en=$13, quick_intro_value1_zh=$14, quick_intro_value1_en=$15,
        quick_intro_label2_zh=$16, quick_intro_label2_en=$17, quick_intro_value2_zh=$18, quick_intro_value2_en=$19,
        quick_intro_label3_zh=$20, quick_intro_label3_en=$21, quick_intro_value3_zh=$22, quick_intro_value3_en=$23,
        updated_at=NOW()
    `, [
      b.title_zh, b.title_en, b.nickname, b.real_name_zh, b.real_name_en,
      b.subtitle_zh, b.subtitle_en, b.description_zh, b.description_en,
      b.quick_intro_text_zh, b.quick_intro_text_en,
      b.quick_intro_label1_zh, b.quick_intro_label1_en, b.quick_intro_value1_zh, b.quick_intro_value1_en,
      b.quick_intro_label2_zh, b.quick_intro_label2_en, b.quick_intro_value2_zh, b.quick_intro_value2_en,
      b.quick_intro_label3_zh, b.quick_intro_label3_en, b.quick_intro_value3_zh, b.quick_intro_value3_en,
    ])
    const { rows } = await query('SELECT * FROM hero WHERE id = 1')
    res.json({ data: rows[0] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
