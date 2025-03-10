import type { PluginOption } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import createAutoImport from './autoImport'
import createLegacy from './legacy'
import createComponents from './uniHelperComponents'
import createCompression from './compression'
export default function createVitePlugins(uniPlatform: string | undefined) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // createComponents要在Uni()之前,否则小程序不生效，坑死了。https://github.com/dcloudio/uni-app/issues/3057
    createComponents(),
    Unocss(),
    Uni()
  ]
  vitePlugins.push(createAutoImport())
  if (uniPlatform === 'H5') {
    vitePlugins.push(createLegacy())
    vitePlugins.push(createCompression())
  }
  return vitePlugins
}
