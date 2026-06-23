import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import authRouter    from './routes/auth.js'
import heroRouter    from './routes/hero.js'
import aboutRouter   from './routes/about.js'
import skillsRouter  from './routes/skills.js'
import journeyRouter from './routes/journey.js'
import projectsRouter from './routes/projects.js'
import uploadRouter    from './routes/upload.js'
import translateRouter from './routes/translate.js'
import settingsRouter  from './routes/settings.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(cors())
app.use(express.json({ limit: '2mb' }))

// 静态文件
app.use('/admin',   express.static(join(__dirname, '../admin')))
app.use('/uploads', express.static(join(__dirname, '../uploads')))

// API 路由
app.use('/api/admin',    authRouter)
app.use('/api/upload',   uploadRouter)
app.use('/api/hero',     heroRouter)
app.use('/api/about',    aboutRouter)
app.use('/api/skills',   skillsRouter)
app.use('/api/journey',  journeyRouter)
app.use('/api/projects',  projectsRouter)
app.use('/api/translate', translateRouter)
app.use('/api/settings',  settingsRouter)

// 健康检查
app.get('/api/ping', (_, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 3025
app.listen(PORT, () => {
  console.log(`\n🚀 Resume 管理服务已启动`)
  console.log(`   API:   http://localhost:${PORT}/api`)
  console.log(`   后台:  http://localhost:${PORT}/admin\n`)
})
