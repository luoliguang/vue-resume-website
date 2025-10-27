/**
 * 简单的加密解密工具
 * 用于在前端保护敏感信息（如电话号码）
 * 注意：这只是基础防护，不能完全防止恶意用户
 */

// 密钥 - 可以自定义
const SECRET_KEY = 'my-phone-number'

/**
 * 简单的字符串加密
 * @param {string} text - 要加密的文本
 * @returns {string} - 加密后的文本
 */
export function encrypt(text) {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i)
    const keyChar = SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
    const encryptedChar = String.fromCharCode(charCode ^ keyChar)
    result += encryptedChar
  }
  // 转换为 base64，避免显示乱码
  return btoa(result)
}

/**
 * 简单的字符串解密
 * @param {string} encryptedText - 加密后的文本
 * @returns {string} - 解密后的文本
 */
export function decrypt(encryptedText) {
  try {
    // 从 base64 解码
    const decodedText = atob(encryptedText)
    let result = ''
    for (let i = 0; i < decodedText.length; i++) {
      const charCode = decodedText.charCodeAt(i)
      const keyChar = SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
      const decryptedChar = String.fromCharCode(charCode ^ keyChar)
      result += decryptedChar
    }
    return result
  } catch (e) {
    console.error('Decryption failed:', e)
    return encryptedText // 解密失败返回原文
  }
}

/**
 * 混淆电话号码
 * 将电话号码转换为混淆后的字符串
 */
export function obfuscatePhone(phone) {
  // 移除空格和特殊字符
  const cleaned = phone.replace(/\s|\+86|\(|\)|-/g, '')
  return encrypt(cleaned)
}

/**
 * 反混淆电话号码
 * 将混淆后的字符串转换回电话号码
 */
export function deobfuscatePhone(encryptedPhone) {
  const decrypted = decrypt(encryptedPhone)
  // 还原电话号码格式
  if (decrypted.startsWith('1') && decrypted.length === 11) {
    return `+86 ${decrypted.slice(0, 3)} ${decrypted.slice(3, 7)} ${decrypted.slice(7)}`
  }
  return `+86 ${decrypted}`
}

