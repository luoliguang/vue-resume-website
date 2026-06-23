import express from 'express'
import { requireAuth } from '../auth.js'

const router = express.Router()

const SYSTEM_PROMPT = `You are a professional English copywriter helping translate Chinese resume content into natural English.
Rules:
- Write in natural, professional English suitable for a personal resume/portfolio website
- Do NOT translate literally word-for-word — rephrase to sound natural in English
- Keep industry terms accurate: 跟单=Merchandiser/Merchandising, 数码印花=Digital Printing, 打样=Sampling, 出货=Shipment/Delivery
- For skill tags: output a short English label only (2-4 words max)
- For descriptions: keep the same meaning but use fluent English resume language
- Never add explanations, quotation marks, or extra commentary — output the translation only`

router.post('/', requireAuth, async (req, res) => {
  const { text, fieldType } = req.body
  if (!text?.trim()) return res.status(400).json({ error: '缺少文本' })

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) return res.status(500).json({ error: '服务器未配置 DEEPSEEK_API_KEY' })

  const userPrompt = fieldType === 'tag'
    ? `Translate this skill tag to English (short label only): ${text}`
    : `Translate this resume content to English:\n${text}`

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 600,
        temperature: 0.3,
      }),
    })

    const json = await response.json()
    if (!response.ok) throw new Error(json.error?.message || 'DeepSeek API 错误')

    const translated = json.choices?.[0]?.message?.content?.trim()
    if (!translated) throw new Error('翻译结果为空')

    res.json({ translated })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
