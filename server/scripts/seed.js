/**
 * 将前端静态数据导入数据库
 * 使用 UPSERT，可安全重复执行（已有数据不会覆盖修改过的内容）
 * 运行：npm run db:seed
 */
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'
import dotenv from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env') })

// ── 直接 import 前端数据文件 ──────────────────────────────────
import { aboutData }       from '../../src/data/about.js'
import { skillCategories } from '../../src/data/skills.js'
import { journeyMilestones } from '../../src/data/journey.js'
import { projectShowcase }  from '../../src/data/projectShowcase.js'

// ── Hero 数据（来自 useI18n.js，因依赖 Vue 无法直接 import）────
const heroSeed = {
  title_zh:             '罗洋洋',
  title_en:             'Luo Yangyang',
  nickname:             'giluoo',
  real_name_zh:         '罗力广',
  real_name_en:         'Luo Liguang',
  subtitle_zh:          '服装行业从业者｜AI 应用实践者｜流程优化爱好者',
  subtitle_en:          'Apparel Professional · AI Practitioner · Process Optimizer',
  description_zh:       '在服装供应链一线做了 2 年+跟单，服务 200+ 客户，将订单返工率降低 15%。同时借助 AI 自学开发，独立搭建了 AI 知识库、素材管理平台和订单自动化脚本——把一线真实问题快速变成能用的工具。',
  description_en:       '2+ years on the frontline of apparel supply-chain merchandising — 200+ clients served, rework rate cut by 15%. Using AI to teach myself development, I independently built practical tools: an AI knowledge base, a material photo platform, and order automation scripts that turn real frontline problems into working solutions.',
  quick_intro_text_zh:  '一个会写代码的服装跟单 —— 2 年以上一线经验让我知道问题在哪，自学开发让我能亲手解决它。',
  quick_intro_text_en:  'A garment merchandiser who codes — 2+ years on the frontline tells me where the problems are, and self-taught development lets me fix them myself.',
  quick_intro_label1_zh: '经验',
  quick_intro_label1_en: 'Experience',
  quick_intro_value1_zh: '2 年以上服装跟单，独立服务 200+ 客户',
  quick_intro_value1_en: '2+ years merchandising, 200+ clients served independently',
  quick_intro_label2_zh: '成果',
  quick_intro_label2_en: 'Impact',
  quick_intro_value2_zh: '订单返工率降低 15%，自研 3 款内部工具',
  quick_intro_value2_en: 'Cut order rework rate by 15%, built 3 internal tools in-house',
  quick_intro_label3_zh: '我能带来',
  quick_intro_label3_en: 'What I Bring',
  quick_intro_value3_zh: '懂打样到出货全流程，又能用 AI / 代码把流程问题变成可用工具',
  quick_intro_value3_en: 'Full sampling-to-shipment expertise, plus turning process problems into working tools with AI / code',
}

// ── DB ────────────────────────────────────────────────────────
const pool = new pg.Pool({
  host:     process.env.DB_HOST     || '127.0.0.1',
  port:     Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'resume_cms',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '',
})

const client = await pool.connect()

try {
  // ── Hero ────────────────────────────────────────────────────
  await client.query(`
    INSERT INTO hero (id,
      title_zh, title_en, nickname, real_name_zh, real_name_en,
      subtitle_zh, subtitle_en, description_zh, description_en,
      quick_intro_text_zh, quick_intro_text_en,
      quick_intro_label1_zh, quick_intro_label1_en, quick_intro_value1_zh, quick_intro_value1_en,
      quick_intro_label2_zh, quick_intro_label2_en, quick_intro_value2_zh, quick_intro_value2_en,
      quick_intro_label3_zh, quick_intro_label3_en, quick_intro_value3_zh, quick_intro_value3_en
    ) VALUES (1, $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)
    ON CONFLICT (id) DO NOTHING
  `, [
    heroSeed.title_zh, heroSeed.title_en, heroSeed.nickname,
    heroSeed.real_name_zh, heroSeed.real_name_en,
    heroSeed.subtitle_zh, heroSeed.subtitle_en,
    heroSeed.description_zh, heroSeed.description_en,
    heroSeed.quick_intro_text_zh, heroSeed.quick_intro_text_en,
    heroSeed.quick_intro_label1_zh, heroSeed.quick_intro_label1_en,
    heroSeed.quick_intro_value1_zh, heroSeed.quick_intro_value1_en,
    heroSeed.quick_intro_label2_zh, heroSeed.quick_intro_label2_en,
    heroSeed.quick_intro_value2_zh, heroSeed.quick_intro_value2_en,
    heroSeed.quick_intro_label3_zh, heroSeed.quick_intro_label3_en,
    heroSeed.quick_intro_value3_zh, heroSeed.quick_intro_value3_en,
  ])
  console.log('  hero — seeded')

  // ── About ───────────────────────────────────────────────────
  const tagsZh = aboutData.skillTags.map(t => t.zh)
  const tagsEn = aboutData.skillTags.map(t => t.en)
  await client.query(`
    INSERT INTO about (id, description_zh, description_en, skill_tags_zh, skill_tags_en)
    VALUES (1, $1, $2, $3::jsonb, $4::jsonb)
    ON CONFLICT (id) DO NOTHING
  `, [
    aboutData.description.zh,
    aboutData.description.en,
    JSON.stringify(tagsZh),
    JSON.stringify(tagsEn),
  ])
  console.log('  about — seeded')

  // ── Skill Categories ────────────────────────────────────────
  for (const [i, cat] of skillCategories.entries()) {
    const skills = cat.skills.map(s => ({
      name_zh:        s.name.zh,
      name_en:        s.name.en,
      highlight_zh:   s.highlight.zh,
      highlight_en:   s.highlight.en,
      description_zh: s.description.zh,
      description_en: s.description.en,
    }))
    await client.query(`
      INSERT INTO skill_categories (category_id, name_zh, name_en, sort_order, skills)
      VALUES ($1, $2, $3, $4, $5::jsonb)
      ON CONFLICT (category_id) DO UPDATE SET
        name_zh = EXCLUDED.name_zh,
        name_en = EXCLUDED.name_en,
        sort_order = EXCLUDED.sort_order,
        skills = EXCLUDED.skills
    `, [cat.id, cat.name.zh, cat.name.en, i + 1, JSON.stringify(skills)])
  }
  console.log(`  skill_categories — seeded ${skillCategories.length} categories`)

  // ── Journey Milestones ──────────────────────────────────────
  for (const [i, m] of journeyMilestones.entries()) {
    // frontend uses 'in-progress', DB uses 'in_progress'
    const status = (m.status ?? 'completed').replace('-', '_')
    await client.query(`
      INSERT INTO journey_milestones
        (year, title_zh, title_en, description_zh, description_en, icon, milestone_status, sort_order)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    `, [
      m.year,
      m.title.zh, m.title.en,
      m.description.zh, m.description.en,
      m.icon ?? 'code',
      status,
      i,
    ])
  }
  console.log(`  journey_milestones — seeded ${journeyMilestones.length} milestones`)

  // ── Projects ────────────────────────────────────────────────
  for (const [i, p] of projectShowcase.entries()) {
    const detailImages = p.detailImages ?? []
    const technologies = p.technologies ?? []
    await client.query(`
      INSERT INTO projects (
        title_zh, title_en, description_zh, description_en,
        image, detail_images, technologies,
        category, type, demo_type, link, status,
        image_ratio, media_type, preview_gif,
        challenge_zh, challenge_en,
        solution_zh, solution_en,
        result_zh, result_en,
        before_zh, before_en,
        after_zh, after_en,
        sort_order
      ) VALUES (
        $1,$2,$3,$4,
        $5,$6::jsonb,$7::jsonb,
        $8,$9,$10,$11,$12,
        $13,$14,$15,
        $16,$17,
        $18,$19,
        $20,$21,
        $22,$23,
        $24,$25,
        $26
      )
    `, [
      p.title.zh, p.title.en,
      p.description.zh, p.description.en,
      p.image ?? null,
      JSON.stringify(detailImages),
      JSON.stringify(technologies),
      p.category ?? 'personal',
      p.type ?? null,
      p.demoType ?? 'link',
      p.link ?? null,
      p.status ?? 'completed',
      p.imageRatio ?? '16/9',
      p.mediaType ?? null,
      p.previewGif ?? null,
      p.challenge?.zh ?? null, p.challenge?.en ?? null,
      p.solution?.zh ?? null,  p.solution?.en ?? null,
      p.result?.zh ?? null,    p.result?.en ?? null,
      p.before?.zh ?? null,    p.before?.en ?? null,
      p.after?.zh ?? null,     p.after?.en ?? null,
      i,
    ])
  }
  console.log(`  projects — seeded ${projectShowcase.length} projects`)

  console.log('\nSeed complete.')

} catch (err) {
  console.error('\nSeed failed:', err.message)
  process.exit(1)
} finally {
  client.release()
  await pool.end()
}
