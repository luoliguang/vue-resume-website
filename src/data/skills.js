// 技能数据配置
export const skillCategories = [
  {
    id: 'apparel',
    name: {
      zh: '服装业务技能',
      en: 'Apparel Business Skills'
    },
    skills: [
      { 
        name: { zh: '跟单流程', en: 'Merchandising Process' }, 
        level: 90, 
        description: { zh: '熟悉从接单到出货的全流程管理', en: 'Familiar with full-process management from order receipt to shipment' }
      },
      { 
        name: { zh: '生产协调', en: 'Production Coordination' }, 
        level: 85, 
        description: { zh: '协调内部资源，确保按时交付', en: 'Coordinate internal resources to ensure on-time delivery' }
      },
      { 
        name: { zh: '打样沟通', en: 'Sample Communication' }, 
        level: 88, 
        description: { zh: '与客户确认样品细节，确保准确性', en: 'Confirm sample details with customers to ensure accuracy' }
      },
      { 
        name: { zh: '面料知识', en: 'Fabric Knowledge' }, 
        level: 70, 
        description: { zh: '了解各种面料特性和加工工艺', en: 'Understanding various fabric characteristics and processing techniques' }
      }
    ]
  },
  {
    id: 'communication',
    name: {
      zh: '客户沟通',
      en: 'Client Communication'
    },
    skills: [
      { 
        name: { zh: '需求分析', en: 'Requirement Analysis' }, 
        level: 92, 
        description: { zh: '快速理解客户需求，提供专业建议', en: 'Quickly understand customer needs and provide professional advice' }
      },
      { 
        name: { zh: '问题解决', en: 'Problem Solving' }, 
        level: 87, 
        description: { zh: '高效处理客户问题和投诉', en: 'Efficiently handle customer issues and complaints' }
      },
      { 
        name: { zh: '关系维护', en: 'Relationship Maintenance' }, 
        level: 90, 
        description: { zh: '建立长期稳定的客户关系', en: 'Build long-term stable customer relationships' }
      },
      { 
        name: { zh: '跨文化沟通', en: 'Cross-cultural Communication' }, 
        level: 70, 
        description: { zh: '与不同文化背景的客户有效沟通', en: 'Effective communication with customers from different cultural backgrounds' }
      }
    ]
  },
  {
    id: 'technical',
    name: {
      zh: '技术能力',
      en: 'Technical Ability'
    },
    skills: [
      { 
        name: { zh: 'Vue.js', en: 'Vue.js' }, 
        level: 50, 
        description: { zh: '前端框架开发，组件化思维', en: 'Frontend framework development with component-based thinking' }
      },
      { 
        name: { zh: 'Node.js', en: 'Node.js' }, 
        level: 50, 
        description: { zh: '后端服务开发，API设计', en: 'Backend service development and API design' }
      },
      { 
        name: { zh: 'WPS脚本', en: 'WPS Scripting' }, 
        level: 60, 
        description: { zh: '办公自动化，提升工作效率', en: 'Office automation to improve work efficiency' }
      },
      { 
        name: { zh: 'Git版本控制', en: 'Git Version Control' }, 
        level: 70, 
        description: { zh: '代码版本管理和团队协作', en: 'Code version management and team collaboration' }
      }
    ]
  },
  {
    id: 'design',
    name: {
      zh: '设计理解',
      en: 'Design Understanding'
    },
    skills: [
      { 
        name: { zh: 'UI/UX设计', en: 'UI/UX Design' }, 
        level: 70, 
        description: { zh: '理解用户体验设计原则', en: 'Understanding user experience design principles' }
      },
      { 
        name: { zh: '视觉设计', en: 'Visual Design' }, 
        level: 65, 
        description: { zh: '具备基本的设计审美能力', en: 'Basic design aesthetic capabilities' }
      },
      { 
        name: { zh: '原型设计', en: 'Prototype Design' }, 
        level: 75, 
        description: { zh: '能够制作简单的产品原型', en: 'Able to create simple product prototypes' }
      },
      { 
        name: { zh: '设计工具', en: 'Design Tools' }, 
        level: 60, 
        description: { zh: '熟练使用Figma等设计工具', en: 'Proficient in using design tools like Figma' }
      }
    ]
  }
]
