import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
import { transformerAttributify } from 'unocss-applet'
import { presetUni } from '@uni-helper/unocss-preset-uni'
export default defineConfig({
  presets: [
    presetUni({
      remRpx: {
        mode: 'rem2rpx'
      },
      attributify: { prefix: 'un-', prefixedOnly: true }
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    // Don't change the following order
    transformerAttributify({
      // 解决与第三方框架样式冲突问题
      prefixedOnly: true,
      prefix: 'fg'
    })
  ],
  rules: [
    [
      'p-safe',
      {
        padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
      }
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }]
  ]
})
