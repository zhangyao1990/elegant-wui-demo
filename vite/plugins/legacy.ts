import legacy from '@vitejs/plugin-legacy'
export default function createLegacy() {
  const options = {
    modernPolyfills: true,
    // 为打包后的文件提供传统浏览器兼容性支持
    renderLegacyChunks: true,
    targets: ['defaults', 'chrome 52', 'not IE 11'], // 需要兼容的目标列表，可以设置多个
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
  }
  return legacy(options)
}
