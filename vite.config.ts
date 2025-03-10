// Vite中文网：https://vitejs.cn/config/
import { resolve } from 'node:path'
import process from 'node:process'
import type { ConfigEnv } from 'vite'
import { createProxy } from './vite/proxy'
import { wrapperEnv } from './vite/utils'
import { loadEnv } from 'vite'

import createVitePlugins from './vite/plugins'

export default async ({ mode }: ConfigEnv, command = 'serve') => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PROXY, VITE_OPEN_PROXY, VITE_APP_MODE } = viteEnv
  const isBuild = command === 'build'
  const uniPlatform: string | undefined = process.env.UNI_PLATFORM
  return {
    base: VITE_APP_MODE === 'prod' ? './' : VITE_APP_MODE === 'test' ? './' : './',
    // 设置路径别名
    resolve: {
      alias: {
        '@': resolve('./src')
      },
      extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    // 自定义全局变量
    define: {
      'process.env': {}
    },
    // 开发服务器配置
    server: {
      host: true,
      open: false,
      port: 9000,
      proxy: VITE_APP_MODE == 'dev' ? createProxy(VITE_PROXY, VITE_OPEN_PROXY) : {}
    },
    // 构建配置
    build: {
      outDir: 'dist',
      // 注意：通常不需要在这里设置target，除非您有特定需求,h5不设置target
      target: uniPlatform === 'H5' ? 'es2015' : 'esnext',
      cssCodeSplit: false,
      minify: VITE_APP_MODE === 'dev' ? 'esbuild' : 'terser', // 混淆器，terser 构建后文件体积更小，'terser' | 'esbuild'
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小.默认500
      chunkSizeWarningLimit: 4000
    },
    esbuild: {
      // 清除全局的console.log和debug
      drop: isBuild ? ['console', 'debugger'] : []
    },
    plugins: createVitePlugins(uniPlatform) as any // 插件
  }
}
