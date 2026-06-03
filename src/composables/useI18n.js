import { ref, computed } from 'vue'

// 语言数据
const translations = {
  zh: {
    nav: {
      home: '首页',
      about: '关于我',
      experience: '工作经历',
      projects: '项目展示',
      skills: '技能专长',
      journey: '我的历程',
      contact: '联系方式'
    },
    hero: {
      title: '罗洋洋',
      nickname: 'giluoo',
      realNameLabel: '本名',
      realName: '罗力广',
      subtitle: '服装跟单 · 供应链数字化',
      description: '在服装供应链一线做了 2 年+跟单，服务 200+ 客户，将订单返工率降低 15%。同时借助 AI 自学开发，独立搭建了 AI 知识库、素材管理平台和订单自动化脚本——把一线真实问题快速变成能用的工具。',
      cta: '了解我',
      cta2: '查看项目',
      cta3: '30秒认识我',
      quickIntro: {
        text: '一个会写代码的服装跟单 —— 2 年以上一线经验让我知道问题在哪，自学开发让我能亲手解决它。',
        label1: '经验',
        value1: '2 年以上服装跟单，独立服务 200+ 客户',
        label2: '成果',
        value2: '订单返工率降低 15%，自研 3 款内部工具',
        label3: '我能带来',
        value3: '懂打样到出货全流程，又能用 AI / 代码把流程问题变成可用工具'
      }
    },
    about: {
      title: '关于我',
      description: '拥有 2 年+服装跟单经验，服务 200+ 客户，将订单返工率降低 15%。在一线工作中发现了大量可以用工具解决的低效环节，于是借助 AI 自学开发，为团队搭建了 AI 问答知识库、实拍素材管理平台和订单自动化脚本。现在，我既能独立负责客户从打样到出货的完整流程，也能持续用技术手段优化流程本身。',
      skills: '核心技能',
      skillTags: ['服装跟单', '客户沟通', '生产协调', 'Vue.js', 'Node.js', 'WPS脚本']
    },
    experience: {
      title: '工作经历',
      achievements: '核心成就',
      achievementItems: [
        '累计服务 200+ 客户，多数形成长期复购合作关系',
        '通过优化下单流程与校验规范，将订单返工率降低约 15%',
        '独立开发 3 款内部工具，覆盖素材管理、AI 问答和订单自动化',
        '协助团队将客户满意度持续维持在 90% 以上'
      ]
    },
    projects: {
      title: '项目展示',
      subtitle: '将一线工作中发现的真实问题，转化为可落地的技术解决方案。',
      workProjects: '工作项目',
      personalProjects: '个人项目',
      allProjects: '全部项目',
      status: {
        completed: '已完成',
        inProgress: '进行中',
        planning: '规划中'
      }
    },
    skills: {
      title: '技能专长',
      categories: {
        apparel: '服装业务技能',
        communication: '客户沟通与管理',
        technical: '技术能力',
        productivity: '效率工具与自动化'
      }
    },
    journey: {
      title: '我的历程',
      milestones: [
        {
          title: '加入服装行业实习',
          description: '毕业后加入双月数码印花实习，学习数码印花生产工艺与客户跟单核心流程。',
          status: '已完成'
        },
        {
          title: '转正，正式成为跟单',
          description: '通过转正考核，独立承接客户订单，全面负责从打样到出货的完整流程。',
          status: '已完成'
        },
        {
          title: '用技术解决工作问题',
          description: '自学前端与 Node.js，陆续开发 AI 知识库、素材管理平台和订单自动化脚本，直接用于日常工作。',
          status: '已完成'
        },
        {
          title: '持续成长',
          description: '深化供应链数字化实践，探索更多将技术能力与服装行业经验结合的可能性。',
          status: '进行中'
        }
      ]
    },
    contact: {
      title: '联系方式',
      subtitle: '微信同号，欢迎发消息，通常 24 小时内回复。',
      email: '邮箱',
      phone: '电话',
      location: '位置',
      github: 'GitHub'
    },
    footer: {
      quote: '想太多便会丢失开始出发的勇气。',
      copyright: '© 2025 罗洋洋. All Rights Reserved.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      journey: 'Journey',
      contact: 'Contact'
    },
    hero: {
      title: 'Luo Yangyang',
      nickname: 'giluoo',
      realNameLabel: 'Real name',
      realName: 'Luo Liguang',
      subtitle: 'Garment Merchandiser · Supply Chain Digitalization',
      description: '2+ years on the frontline of apparel supply-chain merchandising — 200+ clients served, rework rate cut by 15%. Using AI to teach myself development, I independently built practical tools: an AI knowledge base, a material photo platform, and order automation scripts that turn real frontline problems into working solutions.',
      cta: 'About Me',
      cta2: 'View Projects',
      cta3: 'Know Me in 30 Seconds',
      quickIntro: {
        text: 'A garment merchandiser who codes — 2+ years on the frontline tells me where the problems are, and self-taught development lets me fix them myself.',
        label1: 'Experience',
        value1: '2+ years merchandising, 200+ clients served independently',
        label2: 'Impact',
        value2: 'Cut order rework rate by 15%, built 3 internal tools in-house',
        label3: 'What I Bring',
        value3: 'Full sampling-to-shipment expertise, plus turning process problems into working tools with AI / code'
      }
    },
    about: {
      title: 'About Me',
      description: '2 years of hands-on garment merchandising, serving 200+ clients and cutting order rework rates by 15%. I kept running into repetitive bottlenecks on the job — so I used AI to teach myself development, then built an AI knowledge base, a material photo management platform, and order automation scripts for my own team. Today I can run the full order cycle independently while continuously improving the workflows behind it.',
      skills: 'Core Skills',
      skillTags: ['Garment Merchandising', 'Client Communication', 'Production Coordination', 'Vue.js', 'Node.js', 'WPS Scripting']
    },
    experience: {
      title: 'Work Experience',
      achievements: 'Key Achievements',
      achievementItems: [
        'Managed 200+ client accounts, most developing into long-term repeat relationships',
        'Reduced order rework rate by ~15% through optimized ordering workflows and validation standards',
        'Independently built 3 internal tools covering material management, AI Q&A, and order automation',
        'Contributed to sustaining team customer satisfaction above 90% consistently'
      ]
    },
    projects: {
      title: 'Projects',
      subtitle: 'Real problems found on the frontline, turned into practical technical solutions.',
      workProjects: 'Work Projects',
      personalProjects: 'Personal Projects',
      allProjects: 'All Projects',
      status: {
        completed: 'Completed',
        inProgress: 'In Progress',
        planning: 'Planning'
      }
    },
    skills: {
      title: 'Skills & Expertise',
      categories: {
        apparel: 'Apparel Business Skills',
        communication: 'Client Communication & Management',
        technical: 'Technical Capabilities',
        productivity: 'Productivity & Automation'
      }
    },
    journey: {
      title: 'My Journey',
      milestones: [
        {
          title: 'Joined Apparel Industry as Intern',
          description: 'Joined Shuangyue Digital Printing as an intern after graduation, learning digital printing production and core merchandising workflows.',
          status: 'Completed'
        },
        {
          title: 'Promoted to Full Merchandiser',
          description: 'Passed probation and began independently managing client orders, taking full ownership of the order cycle from sampling to shipment.',
          status: 'Completed'
        },
        {
          title: 'Built Tools to Fix Real Problems',
          description: 'Taught myself frontend and Node.js, then shipped an AI knowledge base, a material management platform, and order automation scripts — all actively used in daily work.',
          status: 'Completed'
        },
        {
          title: 'Continuous Growth',
          description: 'Deepening supply chain digitalization practices and exploring more ways to combine technical skills with apparel industry expertise.',
          status: 'In Progress'
        }
      ]
    },
    contact: {
      title: 'Contact',
      subtitle: 'WeChat ID: giluoo. Welcome to send messages, usually reply within 24 hours.',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      github: 'GitHub'
    },
    footer: {
      quote: 'Thinking too much will lose the courage to start.',
      copyright: '© 2025 Luo Yangyang. All Rights Reserved.'
    }
  }
}

const currentLanguage = ref('zh')

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('language', currentLanguage.value)
}

const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
  }
}

const t = (key) => {
  const keys = key.split('.')
  let value = translations[currentLanguage.value]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

const initLanguage = () => {
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage.value = savedLanguage
  }
}

const isChinese = computed(() => currentLanguage.value === 'zh')
const isEnglish = computed(() => currentLanguage.value === 'en')

export {
  currentLanguage,
  toggleLanguage,
  setLanguage,
  t,
  initLanguage,
  isChinese,
  isEnglish
}
