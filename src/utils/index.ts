import { isObject } from '@/utils/test'

/**
 * 深度合并
 * @param src
 * @param target
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}
/**
 * 格式化价格数额为字符串
 * 可对小数部分进行填充，默认不填充
 * @param price 价格数额，以分为单位!
 * @param fill 是否填充小数部分 0-不填充 1-填充第一位小数 2-填充两位小数
 */
export function priceFormat(price: number, fill = 0) {
  if (isNaN(price) || price === null || price === Infinity) {
    return price
  }

  let priceFormatValue: string | number = Math.round(parseFloat(`${price}`) * 10 ** 8) / 10 ** 8 // 恢复精度丢失
  priceFormatValue = `${Math.ceil(priceFormatValue) / 100}` // 向上取整，单位转换为元，转换为字符串
  if (fill > 0) {
    // 补充小数位数
    if (priceFormatValue.indexOf('.') === -1) {
      priceFormatValue = `${priceFormatValue}.`
    }
    const n = fill - priceFormatValue.split('.')[1]?.length
    for (let i = 0; i < n; i++) {
      priceFormatValue = `${priceFormatValue}0`
    }
  }
  return priceFormatValue
}

let systemWidth = 0
/**
 * 获取系统宽度
 * 如果系统宽度已经缓存，则直接返回缓存的值
 * 否则，尝试获取系统信息中的屏幕宽度
 * 如果获取失败，例如因为系统不支持或发生错误，则将系统宽度设置为0
 * @returns {number} 系统宽度，如果无法获取则为0
 */
export const loadSystemWidth = () => {
  // 检查是否已经缓存了系统宽度
  if (systemWidth) {
    return systemWidth
  }
  try {
    // 尝试获取系统信息并设置系统宽度
    systemWidth = uni.getSystemInfoSync().screenWidth
  } catch (e) {
    // 如果发生错误，将系统宽度设置为0
    systemWidth = 0
  }
  // 返回系统宽度
  return systemWidth
}

/**
 * 将rpx值转换为px值
 *
 * @param rpx 要转换的rpx值
 * @param round 是否需要对结果进行向下取整，默认为false
 * @returns 转换后的px值如果round为true，则返回取整后的px值
 */
const rpx2px = (rpx: number, round = false) => {
  // 加载系统宽度，用于后续的px与rpx的转换计算
  loadSystemWidth()
  // 根据rpx和系统宽度计算px值
  // px / systemWidth = rpx / 750
  const result = (rpx * systemWidth) / 750

  // 如果需要对结果进行向下取整，则执行Math.floor方法
  if (round) {
    return Math.floor(result)
  }
  // 返回计算结果
  return result
}

/**
 * 对电话号码进行加密处理，隐藏中间四位数字。
 * 该函数用于保护用户隐私，仅显示电话号码的前三位和后四位数字，中间部分用星号（*）代替。
 *
 * @param phone - 需要加密的电话号码字符串。
 * @returns 加密后的电话号码字符串，格式为：前三位 + **** + 后四位。
 */
const phoneEncryption = (phone: string) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
/**
 * 获取URL中的参数
 *
 * 该函数用于从URL中提取查询参数可以根据指定的键名获取对应的值，或者返回所有键值对
 *
 * @param key 可选参数，指定要获取的查询参数的键名如果未提供，则返回所有键值对
 * @param url 可选参数，指定要解析的URL字符串默认为当前窗口的位置URL
 * @returns 如果提供了键名，则返回对应的值如果值不存在，则返回null如果未提供键名，则返回包含所有查询参数的键值对对象
 */
export function getUrlParams(key?: string, url: string = window.location.href): string | Record<string, string> | null {
  // 创建一个空对象来存储查询参数键值对
  const params: Record<string, string> = {}
  // 分割URL以获取查询字符串部分
  const queryString = url.split('?')[1]
  // 如果没有查询字符串，根据是否提供了键名返回null或者空对象
  if (!queryString) return key ? null : params
  // 遍历查询字符串中的每个参数
  queryString.split('&').forEach((param) => {
    // 分割参数以获取键名和值，并进行URL解码
    const [k, v] = param.split('=')
    // 如果键名存在，将其添加到参数对象中
    if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '')
  })
  // 根据是否提供了键名，返回对应的值或者整个参数对象
  return key ? params[key] || null : params
}
