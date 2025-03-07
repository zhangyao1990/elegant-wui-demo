import type { App } from 'vue'
import { createPinia } from 'pinia'
import { persistPlugin } from '@/store/persist'

const pinia = createPinia()
pinia.use(persistPlugin)
export function setupStore(app: App<Element>) {
  app.use(pinia)
}
export { pinia }
