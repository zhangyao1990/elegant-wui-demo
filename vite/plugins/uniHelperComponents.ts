import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
export default function createComponents() {
  return UniHelperComponents({
    dts: 'src/components.d.ts',
    resolvers: [
      {
        type: 'component',
        resolve: (name: string) => {
          let isH5: boolean = false
          // #ifdef H5
          isH5 = true
          // #endif
          if (name.match(/^(Wui[A-Z]|wui-[a-z])/)) {
            const cName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
            const component = `elegant-wui-uni/components/${cName}/${cName}.vue`
            return {
              name,
              from: component,
              sideEffects: isH5 ? '' : ''
            }
          }
        }
      }
    ]
  })
}
