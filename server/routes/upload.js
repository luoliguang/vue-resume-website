import express from 'express'
import multer from 'multer'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync, existsSync, statSync } from 'fs'
import { requireAuth } from '../auth.js'

const router = express.Router()
const __dirname = dirname(fileURLToPath(import.meta.url))
const UPLOAD_DIR = join(__dirname, '../../uploads')

mkdirSync(UPLOAD_DIR, { recursive: true })

// ── Image upload (随机文件名) ──────────────────────
const imageStorage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) => {
    const ext = extname(file.originalname).toLowerCase()
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`)
  },
})

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    allowed.includes(extname(file.originalname).toLowerCase())
      ? cb(null, true)
      : cb(new Error('仅支持 jpg / png / gif / webp'))
  },
})

router.post('/', requireAuth, uploadImage.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: '未收到文件' })
  res.json({ url: `/api/uploads/${req.file.filename}` })
})

// ── Resume PDF upload (固定文件名 resume.pdf) ──────
const resumeStorage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, __, cb) => cb(null, 'resume.pdf'),
})

const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    extname(file.originalname).toLowerCase() === '.pdf'
      ? cb(null, true)
      : cb(new Error('仅支持 PDF 格式'))
  },
})

router.post('/resume', requireAuth, uploadResume.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: '未收到文件' })
  res.json({ url: '/api/uploads/resume.pdf', message: '简历已更新' })
})

router.get('/resume', requireAuth, (req, res) => {
  const filePath = join(UPLOAD_DIR, 'resume.pdf')
  if (!existsSync(filePath)) return res.json({ exists: false })
  const stat = statSync(filePath)
  res.json({ exists: true, url: '/api/uploads/resume.pdf', updatedAt: stat.mtime })
})

export default router
