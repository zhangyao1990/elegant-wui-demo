import { PiniaPluginContext } from 'pinia'
import { deepClone } from 'elegant-wui-uni/components/common/util'

/**
 *
 * @param param
 * @param excludedIds // 持久化排除的key
 * @returns
 */
function persist({ store }: PiniaPluginContext, excludedIds: string[]) {
  // 检查当前store的id是否在排除列表中
  const isExcluded = excludedIds.includes(store.$id)

  // 如果当前store的id在排除列表中，则不进行持久化
  if (isExcluded) {
    return
  }

  // 暂存State
  let persistState = deepClone(store.$state)
  // 从缓存中读取
  const storageState = uni.getStorageSync(store.$id)
  if (storageState) {
    persistState = storageState
  }
  store.$state = persistState
  store.$subscribe(() => {
    // 在存储变化的时候将store缓存
    uni.setStorageSync(store.$id, deepClone(store.$state))
  })
}

export const persistPlugin = (context: PiniaPluginContext) => {
  // 调用persist函数，并传入排除列表
  persist(context, ['tabbar'])
}
