import pkg from '../../../package.json'

/**
 * @description: 根据版本生成缓存键
 */
export function getPkgVersion() {
  return `${`__${pkg.version}`}__`.toUpperCase()
}

/**
 * @description: 开发模式
 */
export const devMode = 'dev'

/**
 * @description: 生产环境
 */
export const prodMode = 'prod'

/**
 * @description: 获取环境模式
 * @returns:
 * @example:
 */
export function getEnvMode(): string {
  return getEnvValue('VITE_APP_MODE')
}

/**
 * @description: 获取环境变量
 * @returns:
 * @example:
 */
export function getEnvValue<T = string>(key: keyof ImportMetaEnv): T {
  return import.meta.env[key] as unknown as T
}

/**
 * @description: 是否开发环境
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return getEnvMode() === devMode
}

/**
 * @description: 是否生产环境
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return getEnvMode() === prodMode
}

/**
 * @description: 获取环境VITE BASE URL值
 * @returns:
 * @example:
 */
export function getBaseUrl(): string {
  return getEnvValue<string>('VITE_BASE_URL')
}
