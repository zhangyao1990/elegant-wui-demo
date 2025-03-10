import type { Route, Router } from '../interfaces'
import { inject, reactive, watch } from 'vue'
import { routeKey, routerKey } from '../symbols'
/**
 * 返回router实例，在template的仍然可以使用$Router方法
 */
export function useRouter(): Router {
  const router = inject(routerKey)
  if (router) {
    return router
  } else {
    throw new Error('useRouter 只可以在 Vue 上下文中使用，请确保你已经正确地注册了 "wui-mini-router" 并且当前正处于 Vue 上下文中')
    // throw new Error(
    //   'Error: useRouter can only be used within a Vue component context. Make sure you have registered the "wui-mini-router" correctly and it is being used inside a Vue component'
    // )
  }
}

/**
 * 返回当前页面路由信息route，在template的仍然可以使用$Route方法
 */
export function useRoute(): Route {
  const currentRoute = inject(routeKey)
  if (currentRoute) {
    const route = reactive(currentRoute.value)
    watch(currentRoute, (to) => {
      Object.assign(route, to)
    })
    return route
  } else {
    throw new Error('useRoute 只可以在 Vue 上下文中使用，请确保你已经正确地注册了 "wui-mini-router" 并且当前正处于 Vue 上下文中')
    // throw new Error(
    //   'Error: useRoute can only be used within a Vue component context. Make sure you have registered the "wui-mini-router" correctly and it is being used inside a Vue component'
    // )
  }
}
