// 项目展示数据配置
// 支持多种展示方式：网站链接、图片、GIF、视频
//
// 数据结构说明：
// - type: 'website' | 'script' | 'system' - 项目类型
// - demoType: 'link' | 'media' - 演示方式
//   - 'link': 网站项目，可以直接点击访问
//   - 'media': 使用图片/GIF/视频展示
// - mediaType: 'image' | 'gif' | 'video' - 媒体类型（当demoType为media时）
// - image: 主要展示图片（所有项目都需要）
// - videoSrc: 可选的视频源（当mediaType为video时）
//
// 使用建议：
// 1. 网站项目（有可直接访问的链接）: demoType='link'
// 2. WPS脚本等工具: demoType='media', mediaType='gif'/'image'
// 3. 系统演示: demoType='media', mediaType='video'
export const projectShowcase = [
  {
    id: 1,
    type: 'website', // 网站项目 - 可访问
    title: {
      zh: '实拍图素材网站',
      en: 'Real Photo Material Website'
    },
    description: {
      zh: '因客户经常需要一些实拍图，但有时不能够及时响应并且难以搜寻，因此开发了实拍图素材网站，可以方便客户获取所需信息，并且可以随时更新素材库。',
      en: 'Because customers often need some real photos, but sometimes they cannot respond in time and it is difficult to search, therefore a real photo material website was developed to help customers easily obtain the information they need, and the material library can be updated at any time .'
    },
    image: '/images/projects/realPhotoMaterial-preview.png',
    technologies: ['Vue3', 'Node.js', '阿里云', 'GitHub Actions'],
    // 三段式：痛点 → 解决方案 → 成果
    challenge: {
      zh: '图片文件分散、难以查找、管理不便，客户需求响应慢',
      en: 'Scattered image files, difficult to search and manage, slow customer response'
    },
    solution: {
      zh: '开发Vue3 + Node.js全栈网站，集成图片上传、智能搜索、分类标签管理功能',
      en: 'Developed Vue3 + Node.js full-stack website with image upload, intelligent search, and category tag management'
    },
    result: {
      zh: '客户能够快速搜寻到自己想要的素材，并且可以随时反馈，极高提升了服务质量',
      en: 'Customers can quickly search for the materials they want and provide feedback at any time, greatly improving service quality'
    },
    status: 'completed',
    link: 'https://material.fangdutex.cn/',
    category: 'personal',
    // 网站项目支持的可选字段
    demoType: 'link' // link: 可以直接访问的链接
  },
  {
    id: 2,
    type: 'website',
    title: {
      zh: 'AI智能问答知识库系统',
      en: 'AI Intelligent Question and Answer Knowledge Base System'
    },
    description: {
      zh: '因客户需要获取最新信息、面料、已经一些服装行业的基础知识。因此部署了AI知识库系统，可以方便客户获取所需信息，并且可以随时更新知识库。',
      en: 'Because customers need to obtain the latest information, fabrics, and basic knowledge of the clothing industry. Therefore, an AI knowledge base system was deployed to help customers easily obtain the information they need, and the knowledge base can be updated at any time .'
    },
    image: '/images/projects/knowledgeBase-preview.png',
    technologies: ['知识库', 'AI', 'Docker'],
    challenge: {
      zh: '客户需要快速获取最新信息、面料知识，传统沟通方式效率低，客服工作时间受限',
      en: 'Customers need quick access to latest information and fabric knowledge, traditional communication methods are inefficient, customer service hours are limited'
    },
    solution: {
      zh: '部署AI驱动的知识库系统，支持7×24小时智能问答，可随时更新知识库内容',
      en: 'Deployed AI-driven knowledge base system with 24/7 intelligent Q&A, knowledge base can be updated anytime'
    },
    result: {
      zh: '客户能够在客服未上班时快速获取想要的信息，信息获取效率提升90%',
      en: 'Customers can quickly obtain the information they want when customer service is offline, information retrieval efficiency improved by 90%'
    },
    status: 'completed',
    link: 'https://fangdutex.cn/',
    category: 'personal',
    demoType: 'link'
  },
  {
    id: 3,
    type: 'script', // 脚本项目 - 需要演示
    title: {
      zh: 'WPS脚本自动化工具',
      en: 'WPS Script Automation Tool'
    },
    description: {
      zh: '基于WPS脚本开发的自动化工具，显著提升工作效率，并且降低错误率',
      en: 'Automation tool developed with WPS scripting, significantly improving work efficiency, and reducing error rate'
    },
    // 工具类项目需要展示的媒体
    image: '/images/projects/wps-script-demo.gif', // 封面使用GIF第一帧
    previewGif: '/images/projects/wps-script-demo.gif', // GIF预览
    mediaType: 'gif', // image | gif | video
    technologies: ['WPS脚本', '数据验证', '自动化'],
    // 工具类项目的对比数据
    before: {
      zh: '手工处理，每单2-3分钟，错误率15%，易漏单',
      en: 'Manual processing, 2-3 minutes per order, 15% error rate, easy to miss orders'
    },
    after: {
      zh: '自动化处理，每单15秒，错误率<0.1%，漏单几率趋近于0',
      en: 'Automated processing, 15 seconds per order, <0.1% error rate, zero missed orders'
    },
    // 三段式展示
    challenge: {
      zh: '手工处理订单容易出现数据录入错误，导致生产延误和客户投诉',
      en: 'Manual order processing prone to data entry errors, causing production delays and customer complaints'
    },
    solution: {
      zh: '开发WPS脚本自动化工具，集成数据验证、重复检查、格式标准化功能',
      en: 'Developed WPS script automation tool with data validation, duplicate checking, and format standardization'
    },
    result: {
      zh: '订单处理效率提升90%，错误率从15%降至0.1%以下，漏单几率趋近于0',
      en: 'Order processing efficiency improved by 90%, error rate reduced from 15% to below 0.1%, missed order probability趋近于0'
    },
    status: 'completed',
    link: '#', // 模态框演示项目不需要外部链接
    category: 'personal',
    demoType: 'media', // media: 使用模态框展示
    modalContent: {
      type: 'gif', // 模态框内容类型
      src: '/images/projects/wps-script-demo.gif' // 要展示的内容
    }
  }
]

// 项目分类
export const projectCategories = [
  { 
    id: 'all', 
    name: { zh: '全部项目', en: 'All Projects' }, 
    count: projectShowcase.length 
  },
  { 
    id: 'work', 
    name: { zh: '工作项目', en: 'Work Projects' }, 
    count: projectShowcase.filter(p => p.category === 'work').length 
  },
  { 
    id: 'personal', 
    name: { zh: '个人项目', en: 'Personal Projects' }, 
    count: projectShowcase.filter(p => p.category === 'personal').length 
  }
]
