import { getEnvValue, getPkgVersion, isDevMode } from '@/utils/env'

// 系统默认的缓存时间，单位为秒
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7
const PREFIX = getEnvValue<string>('VITE_APP_CACHE_PREFIX') || 'UNI_APP_VUE3_TS'
export const DEFAULT_PREFIX_KEY = `${PREFIX}${getPkgVersion()}`

// Aes加密密钥
export const cacheCipher = {
  key: 'aQ0{gD1@c_0@oH5:',
  iv: 'aF0#gC_$hE1$eA1!'
}

// 是否使用aes加密系统缓存
export const enableStorageEncryption = !isDevMode()
