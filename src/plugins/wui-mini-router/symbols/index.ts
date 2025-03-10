import type { InjectionKey, Ref } from 'vue'
import type { Route, Router } from '../interfaces'

/**
 * useRouter 用到的key
 *
 * @internal
 */
export const routerKey = Symbol('__ROUTER__') as InjectionKey<Router>

/**
 * useRoute 用到的key
 *
 * @internal
 */
export const routeKey = Symbol('__ROUTE__') as InjectionKey<Ref<Route>>
