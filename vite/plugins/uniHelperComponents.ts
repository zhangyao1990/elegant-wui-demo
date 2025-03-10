import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
export default function createComponents() {
  return UniHelperComponents({
    deep: true,
    dts: 'src/components.d.ts',
    dirs: ['src/components', 'elegant-wui-uni/components'],
    resolvers: [
      {
        type: 'component',
        resolve: (name: string) => {
          if (name.match(/^(Wui[A-Z]|wui-[a-z])/)) {
            const cName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
            const component = `elegant-wui-uni/components/${cName}/${cName}.vue`
            return {
              name,
              from: component
            }
          }
        }
      }
    ]
  })
}
