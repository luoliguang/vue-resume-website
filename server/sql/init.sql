-- ============================================================
-- Resume Admin — 数据库初始化
-- 在 pgAdmin Query Tool 里直接粘贴执行即可
-- ============================================================

-- 强制清理旧表（忽略依赖，彻底删除）
DROP TABLE IF EXISTS hero              CASCADE;
DROP TABLE IF EXISTS about             CASCADE;
DROP TABLE IF EXISTS abouts            CASCADE;
DROP TABLE IF EXISTS skill_categories  CASCADE;
DROP TABLE IF EXISTS journey_milestones CASCADE;
DROP TABLE IF EXISTS projects          CASCADE;

-- ── Hero（单条，id 固定 1）──────────────────────────────────
CREATE TABLE hero (
  id                      SERIAL PRIMARY KEY,
  title_zh                TEXT,
  title_en                TEXT,
  nickname                TEXT,
  real_name_zh            TEXT,
  real_name_en            TEXT,
  subtitle_zh             TEXT,
  subtitle_en             TEXT,
  description_zh          TEXT,
  description_en          TEXT,
  quick_intro_text_zh     TEXT,
  quick_intro_text_en     TEXT,
  quick_intro_label1_zh   TEXT,
  quick_intro_label1_en   TEXT,
  quick_intro_value1_zh   TEXT,
  quick_intro_value1_en   TEXT,
  quick_intro_label2_zh   TEXT,
  quick_intro_label2_en   TEXT,
  quick_intro_value2_zh   TEXT,
  quick_intro_value2_en   TEXT,
  quick_intro_label3_zh   TEXT,
  quick_intro_label3_en   TEXT,
  quick_intro_value3_zh   TEXT,
  quick_intro_value3_en   TEXT,
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ── About（单条，id 固定 1）────────────────────────────────
CREATE TABLE about (
  id              SERIAL PRIMARY KEY,
  description_zh  TEXT,
  description_en  TEXT,
  skill_tags_zh   JSONB DEFAULT '[]',
  skill_tags_en   JSONB DEFAULT '[]',
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Skill Categories ────────────────────────────────────────
CREATE TABLE skill_categories (
  id            SERIAL PRIMARY KEY,
  category_id   TEXT UNIQUE NOT NULL,
  name_zh       TEXT,
  name_en       TEXT,
  sort_order    INT DEFAULT 0,
  skills        JSONB DEFAULT '[]',
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Journey Milestones ──────────────────────────────────────
CREATE TABLE journey_milestones (
  id                SERIAL PRIMARY KEY,
  year              TEXT NOT NULL,
  title_zh          TEXT,
  title_en          TEXT,
  description_zh    TEXT,
  description_en    TEXT,
  icon              TEXT DEFAULT 'code',
  milestone_status  TEXT DEFAULT 'completed',
  sort_order        INT DEFAULT 0,
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── Projects ────────────────────────────────────────────────
CREATE TABLE projects (
  id              SERIAL PRIMARY KEY,
  title_zh        TEXT NOT NULL,
  title_en        TEXT,
  description_zh  TEXT,
  description_en  TEXT,
  image           TEXT,
  detail_images   JSONB DEFAULT '[]',
  technologies    JSONB DEFAULT '[]',
  category        TEXT DEFAULT 'personal',
  type            TEXT,
  demo_type       TEXT DEFAULT 'link',
  link            TEXT,
  status          TEXT DEFAULT 'completed',
  image_ratio     TEXT DEFAULT '16/9',
  media_type      TEXT,
  preview_gif     TEXT,
  challenge_zh    TEXT,
  challenge_en    TEXT,
  solution_zh     TEXT,
  solution_en     TEXT,
  result_zh       TEXT,
  result_en       TEXT,
  before_zh       TEXT,
  before_en       TEXT,
  after_zh        TEXT,
  after_en        TEXT,
  sort_order      INT DEFAULT 0,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── 预置技能分类（4 个固定，skills 先为空）──────────────────
INSERT INTO skill_categories (category_id, name_zh, name_en, sort_order, skills) VALUES
  ('apparel',       '服装业务技能',     'Apparel Business Skills',           1, '[]'),
  ('communication', '客户沟通与管理',   'Client Communication & Management', 2, '[]'),
  ('technical',     '技术能力',         'Technical Capabilities',            3, '[]'),
  ('productivity',  '效率工具与自动化', 'Productivity & Automation',         4, '[]')
ON CONFLICT (category_id) DO NOTHING;

-- ── 验证 ────────────────────────────────────────────────────
SELECT table_name,
       (SELECT COUNT(*) FROM information_schema.columns
        WHERE table_name = t.table_name AND table_schema = 'public') AS col_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN ('hero','about','skill_categories','journey_milestones','projects')
ORDER BY table_name;
