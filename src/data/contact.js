import { deobfuscatePhone } from '../utils/crypto.js'

// 联系信息配置
export const contactInfo = {
  email: {
    label: {
      zh: '邮箱',
      en: 'Email'
    },
    value: 'giluo@vip.qq.com',
    icon: 'Mail',
    link: 'mailto:giluo@vip.qq.com',
    color: '#667eea'
  },
  phone: {
    label: {
      zh: '电话',
      en: 'Phone'
    },
    // 使用加密的电话号码（加密字符串）
    value: 'XE4aSFtcVlMZXEA=',
    // 存储原始链接（用于点击拨打）
    rawLink: 'tel:+8617783386425',
    icon: 'Phone',
    link: null,
    color: '#48bb78',
    // 标记为加密字段
    encrypted: true
  },
  location: {
    label: {
      zh: '地址',
      en: 'Location'
    },
    value: {
      zh: '广东省惠州市',
      en: 'Huizhou, Guangdong Province'
    },
    icon: 'MapPin',
    link: null,
    color: '#ed8936'
  }
}
