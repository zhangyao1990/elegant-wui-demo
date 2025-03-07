import CryptoJS from 'crypto-js'
// #ifdef MP-WEIXIN || APP-PLUS
import JSEncrypt from 'jsencrypt'
// #endif

export const CryptoSecret = '__CryptoJS_Secret__'

/**
 * 加密数据
 * @param data - 数据
 */
export function encrypto(data: any) {
  const newData = JSON.stringify(data)
  return CryptoJS.AES.encrypt(newData, CryptoSecret).toString()
}

/**
 * 解密数据
 * @param cipherText - 密文
 */
export function decrypto(cipherText: string) {
  const bytes = CryptoJS.AES.decrypt(cipherText, CryptoSecret)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  if (originalText) {
    return JSON.parse(originalText)
  }
  return null
}

/* 常用加解密 */
// MD5加密
export function MD5(data: any) {
  return CryptoJS.MD5(data).toString()
}
// BASE64加密
export function BASE64Encrypt(data: any) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
}
// BASE64解密
export function BASE64Decrypt(cipher: any) {
  return CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8)
}

// AES ECB模式加密，没有iv
export function AesEncrypt(message: any, key: any) {
  const keyHex = CryptoJS.enc.Utf8.parse(key) //
  const messageHex = CryptoJS.enc.Utf8.parse(message)
  const encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString() // base64结果
}
// AES ECB模式解密
export function AesDecrypt(messageBase64: any, key: any) {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const decrypt = CryptoJS.AES.decrypt(messageBase64, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// RSA加密 支付宝不支持JSEncrypt
export function RsaEncrypt(data: any, key: any) {
  // #ifdef MP-WEIXIN || APP-PLUS
  const crypt = new JSEncrypt()
  crypt.setPublicKey(key)
  return crypt.encrypt(data)
  // #endif
}
