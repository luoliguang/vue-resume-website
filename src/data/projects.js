// 项目数据配置
export const projects = [
  {
    id: 1,
    title: '订单处理自动化防错脚本',
    details: [
      {
        label: '挑战',
        text: '手工处理订单时容易出现数据录入错误，导致生产延误和客户投诉。'
      },
      {
        label: '方案',
        text: '开发WPS脚本自动化工具，集成数据验证、重复检查、格式标准化功能。'
      },
      {
        label: '成果',
        text: '订单处理效率提升60%，错误率降低至0.1%以下，客户满意度显著提升。'
      }
    ],
    tech: ['WPS脚本', 'Vue.js', '数据验证'],
    media: {
      type: 'image', // 或 'video'
      src: '/images/onlineWebsite.png' // 替换为实际图片路径
    }
  },
  {
    id: 2,
    title: '订单执行流程防漏单监控脚本',
    details: [
      {
        label: '挑战',
        text: '复杂的订单执行流程中，容易出现漏单、重复下单等问题。'
      },
      {
        label: '方案',
        text: '构建实时监控系统，通过Node.js后端服务监控订单状态变化。'
      },
      {
        label: '成果',
        text: '实现100%订单流程覆盖，漏单率降至0，系统响应时间<2秒。'
      }
    ],
    tech: ['Node.js', 'React', '实时监控'],
    media: {
      type: 'video',
      src: '/videos/project-2.mp4' // 替换为实际视频路径
    }
  },
  {
    id: 3,
    title: '服装款式面料数字化查询平台',
    details: [
      {
        label: '挑战',
        text: '客户和采购人员需要快速查询面料以及实物图信息，传统文件沟通发送效率低。'
      },
      {
        label: '方案',
        text: '开发web网站，集成面料实拍图、款式图，实现快速搜索响应。'
      },
      {
        label: '成果',
        text: '获取实拍图效率提升80%，用户满意度95%+。'
      }
    ],
    tech: ['实拍图', '款式图', 'web网站'],
    media: {
      type: 'video',
      src: '/videos/webVideo.mp4' // 替换为实际图片路径
    }
  }
]

