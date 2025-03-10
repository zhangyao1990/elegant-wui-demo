import App from './App.vue'
import 'uno.css'
import { createSSRApp } from 'vue'
import router from './router'
//Pinia
import { setupStore } from '@/store'
// #ifdef H5
const VITE_APP_DEBUG_TOOL = import.meta.env.VITE_APP_DEBUG_TOOL
if (VITE_APP_DEBUG_TOOL) {
  import('vconsole').then((module: any) => {
    new module.default()
  })
}
// #endif

export function createApp() {
  const app = createSSRApp(App)
  app.config.warnHandler = () => null
  setupStore(app)
  app.use(router)
  return {
    app
  }
}
