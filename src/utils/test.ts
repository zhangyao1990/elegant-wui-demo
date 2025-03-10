/**
 * 验证电子邮箱格式
 */
export function isEmail(value: any) {
  return /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value)
}

/**
 * 验证手机格式
 */
export function isMobile(value: any) {
  return /^1[2-9]\d{9}$/.test(value)
}

/**
 * 验证日期格式
 */
export function isDate(value: any) {
  return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 验证十进制数字
 */
export function isNumber(value: any) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
}

/**
 * 验证整数
 */
export function isDigits(value: any) {
  return /^\d+$/.test(value)
}

/**
 * 金额,只允许2位小数
 */
export function amount(value: any) {
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(?:,\d{3})*(?:\.\d{1,2})?$|^0\.\d{1,2}$/.test(value)
}

/**
 * 只能输入字母
 */
export function letter(value: any) {
  return /^[a-z]*$/i.test(value)
}

/**
 * 只能是字母或者数字
 */
export function enOrNum(value: any) {
  // 英文或者数字
  const reg = /^[0-9a-z]*$/gi
  return reg.test(value)
}

/**
 * 验证是否包含某个值
 */
export function contains(value: any, param: any) {
  return value.includes(param)
}

/**
 * 验证一个值范围[min, max]
 */
export function range(value: any, param: any) {
  return value >= param[0] && value <= param[1]
}

/**
 * 验证一个长度范围[min, max]
 */
export function rangeLength(value: any, param: any) {
  return value.length >= param[0] && value.length <= param[1]
}

/**
 * 是否是undefined
 */
export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}
/**
 判断是否为null
 *
 */
export function isNull(val: unknown): val is null {
  return val === null
}
/**
 * 是否非undefined
 */
export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}
/**
 判断是否为undefined且null
 *
 */
export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

/**
 判断是否为undefined或null
 *
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}
/**
 * 判断是否为空
 */
export function isEmpty(value: any) {
  switch (typeof value) {
    case 'undefined':
      return true
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true
      break
    case 'boolean':
      if (!value) return true
      break
    case 'number':
      if (value === 0 || Number.isNaN(value)) return true
      break
    case 'object':
      if (value === null || value.length === 0) return true
      for (const i in value) {
        if (Object.prototype.hasOwnProperty.call(value, i)) {
          return false
        }
      }
      return true
  }
  return false
}

/**
 * 是否json字符串
 */
export function isJsonString(value: any) {
  if (typeof value == 'string') {
    try {
      const obj = JSON.parse(value)
      return !!(typeof obj == 'object' && obj)
    } catch (e: any) {
      console.log('e', e)
      return false
    }
  }
  return false
}

/**
 * 是否数组
 */
export function isArray(value: any) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === '[object Array]'
  }
}

/**
 * 是否对象
 */
export function isObject(value: any) {
  return Object.prototype.toString.call(value) === '[object Object]'
}
