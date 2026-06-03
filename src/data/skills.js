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
        highlight: { zh: '全流程独立负责', en: 'End-to-end ownership' },
        description: { zh: '独立负责从接单到出货的全流程，同期并行管理多个客户订单', en: 'Independently manage full order cycles for multiple clients simultaneously, from intake to final shipment' }
      },
      {
        name: { zh: '生产协调', en: 'Production Coordination' },
        highlight: { zh: '95%+ 准时交付', en: '95%+ on-time delivery' },
        description: { zh: '协调工厂内部资源与排期，将按时交付率维持在 95% 以上', en: 'Coordinate internal factory resources and scheduling, maintaining on-time delivery rate above 95%' }
      },
      {
        name: { zh: '打样沟通', en: 'Sample Confirmation' },
        highlight: { zh: '打样精准确认', en: 'Spec-accurate samples' },
        description: { zh: '精准确认客户样品细节，将因打样偏差导致的返工降至最低', en: 'Precisely confirm client sample specifications, minimizing rework caused by sampling discrepancies' }
      },
      {
        name: { zh: '面料工艺', en: 'Fabric & Process Knowledge' },
        highlight: { zh: '涤纶 · 数码印花', en: 'Polyester · Digital print' },
        description: { zh: '熟悉涤纶面料特性及数码印花适配工艺要求', en: 'Familiar with polyester fabric properties and their digital printing compatibility requirements' }
      }
    ]
  },
  {
    id: 'communication',
    name: {
      zh: '客户沟通与管理',
      en: 'Client Communication & Management'
    },
    skills: [
      {
        name: { zh: '需求分析', en: 'Requirement Analysis' },
        highlight: { zh: '需求 → 可执行规格', en: 'Vague needs → specs' },
        description: { zh: '将客户模糊的款式描述转化为可执行的生产规格，减少反复确认成本', en: 'Translate vague client style descriptions into actionable production specs, reducing back-and-forth confirmation costs' }
      },
      {
        name: { zh: '异常处理', en: 'Issue Resolution' },
        highlight: { zh: '异常快速响应', en: 'Rapid issue response' },
        description: { zh: '快速响应生产异常与客户投诉，确保订单不因突发问题停摆', en: 'Respond quickly to production anomalies and client complaints, ensuring orders stay on track despite disruptions' }
      },
      {
        name: { zh: '客户关系维护', en: 'Client Relationship Management' },
        highlight: { zh: '200+ 客户复购', en: '200+ repeat clients' },
        description: { zh: '服务 200+ 客户，多数形成长期稳定的复购合作关系', en: 'Served 200+ clients, with the majority developing into long-term repeat relationships' }
      },
      {
        name: { zh: '多任务并行管理', en: 'Multi-order Management' },
        highlight: { zh: '多订单并行跟进', en: 'Parallel order tracking' },
        description: { zh: '同时并行跟进多个客户的不同订单与优先级，保持信息准确同步', en: 'Concurrently track multiple client orders with different priorities, maintaining accurate and synchronized information' }
      }
    ]
  },
  {
    id: 'technical',
    name: {
      zh: '技术能力',
      en: 'Technical Capabilities'
    },
    skills: [
      {
        name: { zh: 'Vue.js / Node.js', en: 'Vue.js / Node.js' },
        highlight: { zh: '2 款应用已上线', en: '2 apps shipped' },
        description: { zh: '自学全栈开发，已独立上线 AI 知识库与素材管理平台两款完整应用', en: 'Self-taught full-stack development; independently shipped two complete apps: an AI knowledge base and a material management platform' }
      },
      {
        name: { zh: 'WPS 宏脚本', en: 'WPS Macro Scripting' },
        highlight: { zh: '出错明显减少', en: 'Far fewer errors' },
        description: { zh: '编写订单处理宏脚本做格式校验与数据汇总，以前手工处理常出错，用脚本后几乎不再出错', en: 'Built order-processing macros for format validation and data aggregation — manual handling used to be error-prone, now mistakes are rare' }
      },
      {
        name: { zh: '服务器部署', en: 'Server Deployment' },
        highlight: { zh: '自建系统已上线', en: 'Systems live in production' },
        description: { zh: '借助 AI 教程，使用阿里云 + Docker 完成自建系统的部署、上线与日常维护', en: 'With the help of AI-guided tutorials, deployed and maintained self-built systems in production on Alibaba Cloud with Docker' }
      },
      {
        name: { zh: 'Git 版本控制', en: 'Git Version Control' },
        highlight: { zh: 'GitHub 持续迭代', en: 'GitHub iteration' },
        description: { zh: '使用 Git 管理项目代码版本，通过 GitHub 进行持续迭代', en: 'Use Git for project version management and GitHub for continuous iteration and deployment' }
      }
    ]
  },
  {
    id: 'productivity',
    name: {
      zh: '效率工具与自动化',
      en: 'Productivity & Automation'
    },
    skills: [
      {
        name: { zh: '订单数据整理', en: 'Order Data Organization' },
        highlight: { zh: '多订单准确记录', en: 'Accurate order records' },
        description: { zh: '用表格对订单进行登记、整理与跟踪，保持多个订单的信息准确、及时同步', en: 'Use spreadsheets to log, organize, and track orders, keeping information across multiple orders accurate and up to date' }
      },
      {
        name: { zh: '流程 SOP 设计', en: 'SOP Design & Documentation' },
        highlight: { zh: '跟单 SOP 文档化', en: 'Documented SOPs' },
        description: { zh: '梳理跟单标准流程并形成文档，降低因沟通不畅造成的返工损耗', en: 'Mapped and documented merchandising SOPs to reduce rework caused by communication breakdowns' }
      },
      {
        name: { zh: 'AI 工具应用', en: 'AI Tool Application' },
        highlight: { zh: 'AI 知识库已落地', en: 'AI KB in production' },
        description: { zh: '将 AI 问答能力落地为知识库产品，服务于日常客户沟通与内部培训', en: 'Deployed AI Q&A capabilities into a working knowledge base product used for daily client support and internal training' }
      },
      {
        name: { zh: '数字化方案设计', en: 'Digitalization Planning' },
        highlight: { zh: '低效环节 → 数字化', en: 'Inefficiency → digital' },
        description: { zh: '识别传统流程中的低效环节，设计并推动可落地的数字化改进方案', en: 'Identify inefficiencies in traditional workflows and design practical digitalization improvements that can actually be implemented' }
      }
    ]
  }
]
