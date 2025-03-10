import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  // https://github.com/antfu/unplugin-auto-import
  return autoImport({
    imports: [
      'vue',
      'uni-app',
      'pinia',
      {
        from: '@/plugins/wui-mini-router',
        imports: ['createRouter', 'useRouter', 'useRoute']
      }
    ],
    dts: 'src/auto-imports.d.ts',
    dirs: ['src/hooks'],
    vueTemplate: true,
    eslintrc: {
      enabled: true,
      globalsPropValue: true
    }
  })
}
