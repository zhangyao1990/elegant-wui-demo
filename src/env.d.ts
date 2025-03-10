/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_ENV: string
  readonly VITE_APP_MODE: string
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_PROXY: any
  readonly VITE_OPEN_PROXY: boolean
  readonly VITE_APP_CACHE_PREFIX: string
  readonly VITE_APP_DEBUG_TOOL: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
