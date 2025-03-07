import type { PluginOption } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import createAutoImport from './autoImport'
import createLegacy from './legacy'
import createComponents from './uniHelperComponents'
import createCompression from './compression'

export default function createVitePlugins() {
  const vitePlugins: (PluginOption | PluginOption[])[] = [Uni(), Unocss()]
  vitePlugins.push(createComponents())
  vitePlugins.push(createLegacy())
  vitePlugins.push(createAutoImport())
  // #ifdef H5
  vitePlugins.push(createCompression())
  // #endif
  return vitePlugins
}
