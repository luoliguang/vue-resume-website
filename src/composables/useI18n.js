import { ref, computed } from 'vue'

// 语言数据
const translations = {
  zh: {
    // 导航栏
    nav: {
      home: '首页',
      about: '关于我',
      experience: '工作经历',
      projects: '项目展示',
      skills: '技能专长',
      journey: '我的历程',
      contact: '联系方式'
    },
    // 首页
    hero: {
      title: '罗洋洋',
      nickname: 'giluoo',
      subtitle: '懂服装供应链的流程优化者',
      description: '我是一名来自供应商的一线服装客服跟单，有2年以上经验。熟悉客户沟通、面料印花、生产跟进等全流程工作，持续学习前端和数码印花技术，探索传统工厂与数字化的结合。',
      cta: '了解我',
      cta2: '查看项目',
      cta3: '15秒熟悉我'
    },
    // 关于我
    about: {
      title: '关于我',
      description: '我是一名专业的服装跟单，同时也在学习前端开发技术。我热爱将传统行业与现代技术相结合，通过数字化手段提升工作效率。',
      skills: '核心技能',
      skillTags: ['服装跟单', '客户沟通', '生产协调', 'Vue.js', 'Node.js', 'WPS脚本']
    },
    // 工作经历
    experience: {
      title: '工作经历',
      achievements: '主要成就',
      achievementItems: [
        '成功管理超过50个服装订单项目',
        '客户满意度保持在95%以上',
        '优化生产流程，提升效率20%',
        '建立完善的客户沟通体系'
      ]
    },
    // 项目展示
    projects: {
      title: '项目展示',
      subtitle: '将复杂的工作问题转化为可量化的技术解决方案，探索传统行业与数字化的结合。',
      workProjects: '工作项目',
      personalProjects: '个人项目',
      allProjects: '全部项目',
      status: {
        completed: '已完成',
        inProgress: '进行中',
        planning: '规划中'
      }
    },
    // 技能专长
    skills: {
      title: '技能专长',
      categories: {
        apparel: '服装业务技能',
        communication: '客户沟通与管理',
        technical: '技术能力',
        design: '设计理解与工具'
      }
    },
    // 我的历程
    journey: {
      title: '我的历程',
      milestones: [
        {
          title: '初入服装行业',
          description: '学习服装生产技术与客服跟单核心流程，为后续职业发展奠定基础。',
          status: '已完成'
        },
        {
          title: '成为服装跟单',
          description: '正式成为服装跟单，全面掌握客户需求与国际出货流程，开始独立负责项目。',
          status: '已完成'
        },
        {
          title: '数字化转型',
          description: '系统学习 Vue 和 Node.js，成功独立开发并上线个人网站，探索技术与传统行业的结合。',
          status: '进行中'
        },
        {
          title: '展望未来',
          description: '规划与探索智能化工厂信息系统 (MES/ERP) 的构建，持续学习新技术。',
          status: '未开始'
        }
      ]
    },
    // 联系方式
    contact: {
      title: '联系方式',
      subtitle: '期待与您合作',
      email: '邮箱',
      phone: '电话',
      location: '位置',
      github: 'GitHub'
    },
    // 底部
    footer: {
      quote: '比别人慢一点没关系，但我从不停止改进。',
      copyright: '© 2025 Luoyangyang. All Rights Reserved.'
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      journey: 'Journey',
      contact: 'Contact'
    },
    // Hero Section
    hero: {
      title: 'Luo Yangyang',
      nickname: 'giluoo',
      subtitle: 'Garment Merchandiser',
      description: 'I am a first-line garment customer service merchandiser from a supplier with more than 2 years of experience. Familiar with customer communication, fabric printing, production follow-up and other full-process work, continuously learning frontend and digital printing technology, exploring the combination of traditional factories and digitalization.',
      cta: 'About Me',
      cta2: 'View Projects',
      cta3: '15 Seconds to Get to Know Me'
    },
    // About Section
    about: {
      title: 'About Me',
      description: 'I am a professional garment merchandiser who is also learning frontend development technologies. I love combining traditional industries with modern technology to improve work efficiency through digital means.',
      skills: 'Core Skills',
      skillTags: ['Garment Merchandising', 'Client Communication', 'Production Coordination', 'Vue.js', 'Node.js', 'WPS Scripting']
    },
    // Experience Section
    experience: {
      title: 'Work Experience',
      subtitle: 'Work Experience',
      achievements: 'Key Achievements',
      achievementItems: [
        'Successfully managed over 50 garment order projects',
        'Maintained customer satisfaction above 95%',
        'Optimized production processes, improving efficiency by 20%',
        'Established comprehensive customer communication system'
      ]
    },
    // Projects Section
    projects: {
      title: 'Learning & Projects',
      subtitle: 'Transforming complex work problems into quantifiable technical solutions',
      workProjects: 'Work Projects',
      personalProjects: 'Personal Projects',
      allProjects: 'All Projects',
      status: {
        completed: 'Completed',
        inProgress: 'In Progress',
        planning: 'Planning'
      }
    },
    // Skills Section
    skills: {
      title: 'Skills & Expertise',
      subtitle: 'Skills & Expertise',
      categories: {
        apparel: 'Apparel Business Skills',
        communication: 'Client Communication & Management',
        technical: 'Technical Capabilities',
        design: 'Design Understanding & Tools'
      }
    },
    // Journey Section
    journey: {
      title: 'My Journey',
      subtitle: 'My Journey',
      milestones: [
        {
          title: 'Entered Apparel Industry',
          description: 'Learned garment production technology and core processes of customer service and merchandising, laying the foundation for subsequent career development.',
          status: 'Completed'
        },
        {
          title: 'Became Garment Merchandiser',
          description: 'Officially became a garment merchandiser, fully mastering customer needs and international shipping processes, and began to independently manage projects.',
          status: 'Completed'
        },
        {
          title: 'Digital Transformation',
          description: 'Systematically learned Vue and Node.js, successfully developed and launched a personal website, exploring the combination of technology and traditional industries.',
          status: 'In Progress'
        },
        {
          title: 'Looking Forward',
          description: 'Planning and exploring the construction of intelligent factory information systems (MES/ERP), continuously learning new technologies.',
          status: 'Not Started'
        }
      ]
    },
    // Contact Section
    contact: {
      title: 'Contact',
      subtitle: 'Looking Forward to Working with You',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      github: 'GitHub'
    },
    // Footer
    footer: {
      quote: 'It\'s okay to be a little slower than others, but I never stop improving.',
      copyright: '© 2025 Luoyangyang. All Rights Reserved.'
    }
  }
}

// 当前语言状态
const currentLanguage = ref('zh')

// 切换语言
const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('language', currentLanguage.value)
}

// 设置语言
const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
  }
}

// 获取翻译
const t = (key) => {
  const keys = key.split('.')
  let value = translations[currentLanguage.value]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

// 初始化语言
const initLanguage = () => {
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage.value = savedLanguage
  }
}

// 计算属性
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
