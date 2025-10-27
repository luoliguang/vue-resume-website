// 项目数据配置 - 统一管理所有项目
// 支持多种项目类型：网站、脚本工具、系统等

export const projects = [
  // ========== 网站项目（可在线访问）==========
  {
    id: 1,
    type: 'website', // 网站项目
    title: {
      zh: '实拍图素材网站',
      en: 'Real Photo Material Website'
    },
    description: {
      zh: '基于Vue3构建的现代化实拍图素材网站，展示专业技能和工作经历',
      en: 'Modern real photo material website built with Vue3, showcasing professional skills and work experience'
    },
    details: [
      {
        label: { zh: '挑战', en: 'Challenge' },
        text: { 
          zh: '图片文件分散、难以查找、管理不便', 
          en: 'Scattered image files, difficult to search and manage' 
        }
      },
      {
        label: { zh: '方案', en: 'Solution' },
        text: { 
          zh: '开发Vue3 + Node.js全栈网站，集成上传、搜索、分类、标签管理', 
          en: 'Developed Vue3 + Node.js full-stack website with upload, search, classification, and tag management' 
        }
      },
      {
        label: { zh: '成果', en: 'Result' },
        text: { 
          zh: '图片管理效率提升80%，查找速度提升90%', 
          en: 'Image management efficiency improved by 80%, search speed improved by 90%' 
        }
      }
    ],
    tech: ['Vue3', 'Node.js', '阿里云', 'GitHub Actions'],
    media: {
      type: 'image',
      src: '/images/projects/realPhotoMaterial-preview.png'
    },
    link: 'https://material.fangdutex.cn/',
    category: 'personal',
    status: 'completed'
  },
  {
    id: 2,
    type: 'website',
    title: {
      zh: 'AI知识库系统',
      en: 'AI Knowledge Base System'
    },
    description: {
      zh: '为服装行业客户开发的AI知识库系统，快速获取面料和服装行业基础知识',
      en: 'AI knowledge base system developed for apparel industry customers to quickly access fabric and apparel industry knowledge'
    },
    details: [
      {
        label: { zh: '挑战', en: 'Challenge' },
        text: { 
          zh: '客户需要快速获取最新信息、面料知识，传统沟通方式效率低', 
          en: 'Customers need quick access to latest information and fabric knowledge, traditional communication methods are inefficient' 
        }
      },
      {
        label: { zh: '方案', en: 'Solution' },
        text: { 
          zh: '开发AI驱动的知识库系统，支持智能问答、知识更新、Docker部署', 
          en: 'Developed AI-driven knowledge base system with smart Q&A, knowledge updates, and Docker deployment' 
        }
      },
      {
        label: { zh: '成果', en: 'Result' },
        text: { 
          zh: '信息获取效率提升90%，客户满意度95%+', 
          en: 'Information retrieval efficiency improved by 90%, customer satisfaction 95%+' 
        }
      }
    ],
    tech: ['知识库', 'AI', 'Docker'],
    media: {
      type: 'image',
      src: '/images/projects/knowledgeBase-preview.png'
    },
    link: 'https://fangdutex.cn/',
    category: 'personal',
    status: 'completed'
  },

  // ========== 脚本工具项目（WPS宏、自动化工具）==========
  {
    id: 3,
    type: 'script', // 脚本工具
    title: {
      zh: '订单处理自动化防错脚本',
      en: 'Order Processing Automation Script'
    },
    description: {
      zh: '基于WPS脚本开发的订单处理自动化工具，显著提升工作效率',
      en: 'Order processing automation tool developed with WPS scripting, significantly improving work efficiency'
    },
    details: [
      {
        label: { zh: '挑战', en: 'Challenge' },
        text: { 
          zh: '手工处理订单时容易出现数据录入错误，导致生产延误和客户投诉', 
          en: 'Manual order processing prone to data entry errors, causing production delays and customer complaints' 
        }
      },
      {
        label: { zh: '方案', en: 'Solution' },
        text: { 
          zh: '开发WPS脚本自动化工具，集成数据验证、重复检查、格式标准化功能', 
          en: 'Developed WPS script automation tool with data validation, duplicate checking, and format standardization' 
        }
      },
      {
        label: { zh: '成果', en: 'Result' },
        text: { 
          zh: '订单处理效率提升60%，错误率降低至0.1%以下，客户满意度显著提升', 
          en: 'Order processing efficiency improved by 60%, error rate reduced to below 0.1%, customer satisfaction significantly increased' 
        }
      }
    ],
    tech: ['WPS脚本', 'Vue.js', '数据验证'],
    media: {
      type: 'gif', // 可以是静态图、GIF或视频
      src: '/images/projects/automation-script-demo.gif' // 演示动画
    },
    category: 'personal',
    status: 'completed'
  },
  {
    id: 4,
    type: 'script',
    title: {
      zh: '订单执行流程防漏单监控脚本',
      en: 'Order Execution Monitoring Script'
    },
    description: {
      zh: '构建实时监控系统，通过Node.js后端服务监控订单状态变化，防止漏单',
      en: 'Built real-time monitoring system to track order status changes through Node.js backend service, preventing missed orders'
    },
    details: [
      {
        label: { zh: '挑战', en: 'Challenge' },
        text: { 
          zh: '复杂的订单执行流程中，容易出现漏单、重复下单等问题', 
          en: 'In complex order execution processes, missed orders and duplicate orders are common issues' 
        }
      },
      {
        label: { zh: '方案', en: 'Solution' },
        text: { 
          zh: '构建实时监控系统，通过Node.js后端服务监控订单状态变化', 
          en: 'Built real-time monitoring system to track order status through Node.js backend service' 
        }
      },
      {
        label: { zh: '成果', en: 'Result' },
        text: { 
          zh: '实现100%订单流程覆盖，漏单率降至0，系统响应时间<2秒', 
          en: 'Achieved 100% order process coverage, reduced missed order rate to 0, system response time < 2 seconds' 
        }
      }
    ],
    tech: ['Node.js', '实时监控', '自动化'],
    media: {
      type: 'video', // 视频演示
      src: '/videos/order-monitoring-demo.mp4'
    },
    category: 'work',
    status: 'completed'
  },

  // ========== 内部系统项目（公司内部使用）==========
  {
    id: 5,
    type: 'system',
    title: {
      zh: '服装面料查询平台',
      en: 'Fabric Query Platform'
    },
    description: {
      zh: '为服装行业开发的数字化面料查询平台，集成实拍图和款式图',
      en: 'Digital fabric query platform developed for the apparel industry, integrating real photos and style images'
    },
    details: [
      {
        label: { zh: '挑战', en: 'Challenge' },
        text: { 
          zh: '客户和采购人员需要快速查询面料以及实物图信息，传统文件沟通发送效率低', 
          en: 'Customers and buyers need quick access to fabric and product images, traditional file communication is inefficient' 
        }
      },
      {
        label: { zh: '方案', en: 'Solution' },
        text: { 
          zh: '开发web网站，集成面料实拍图、款式图，实现快速搜索响应', 
          en: 'Developed web platform integrating fabric real photos and style images with fast search response' 
        }
      },
      {
        label: { zh: '成果', en: 'Result' },
        text: { 
          zh: '获取实拍图效率提升80%，用户满意度95%+', 
          en: 'Real photo retrieval efficiency improved by 80%, user satisfaction 95%+' 
        }
      }
    ],
    tech: ['Vue.js', 'Node.js', '图片处理'],
    media: {
      type: 'video',
      src: '/videos/webVideo.mp4'
    },
    category: 'work',
    status: 'completed'
  }
]

// 项目类型定义
export const projectTypes = {
  website: { zh: '网站项目', en: 'Website' },
  script: { zh: '脚本工具', en: 'Script Tool' },
  system: { zh: '系统项目', en: 'System' }
}

// 项目分类
export const projectCategories = [
  { 
    id: 'all', 
    name: { zh: '全部项目', en: 'All Projects' }, 
    count: projects.length 
  },
  { 
    id: 'work', 
    name: { zh: '工作项目', en: 'Work Projects' }, 
    count: projects.filter(p => p.category === 'work').length 
  },
  { 
    id: 'personal', 
    name: { zh: '个人项目', en: 'Personal Projects' }, 
    count: projects.filter(p => p.category === 'personal').length 
  }
]
