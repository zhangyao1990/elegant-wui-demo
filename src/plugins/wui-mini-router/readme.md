# 介绍

`wui-mini-router`是一个基于`vue3`和`uni-app`框架的轻量级路由库，它提供了类似`Vue Router`的 API 和功能，可以帮助开发者实现在 uni-app 中进行路由跳转、传参、拦截等常用操作。

`wui-mini-router`支持多种跳转方式，包括普通跳转、重定向、切换 TabBar 页面等。它也提供了一些高级特性，如路由拦截、编程式导航等。

总之，如果你在`uni-app`开发过程中需要使用到路由功能，可以考虑使用`wui-mini-router`来简化你的开发工作。

## ✨ 特性

- 🚀 支持 APP、H5、微信小程序 等平台.
- 💪 支持全局前置导航守卫 beforeEach 和全局后置导航守卫 afterEach.
- 💪 使用 Typescript 构建，提供良好的组件类型系统.

# 快速上手

本节介绍如何在`uni-app`项目中配置并使用 `Wui Mini Router`。

## 配置路由

项目 src 目录下创建 router 文件夹，并在该文件夹创建`index.ts`。

```ts
import { createRouter } from 'wui-parse-pages'
// 导入pages.json
import pagesJson from '../pages.json'
// 引入uni-parse-pages
import pagesJsonToRoutes from 'wui-parse-pages'
// 生成路由表
const routes = pagesJsonToRoutes(pagesJson)
const router = createRouter({
  routes: [...routes] // 路由表信息
})
export default router
```

## 配置 pages.json

在 pages.json 中为页面路由指定`name`字段后，即可以使用`name`跳转

> 注意：此处定义的`name`字段必须全局唯一。

```json
//  pages.json
{
  "pages": [
    {
      "path": "pages/index/index",
      "name": "home", // 路由 name 用于命名路由的跳转
      "style": {
        "mp-alipay": {
          "allowsBounceVertical": "NO"
        },
        "navigationBarTitleText": "首页"
      }
    },
    {
      "path": "pages/login/index",
      "name": "login",
      "style": {
        "mp-alipay": {
          "allowsBounceVertical": "NO"
        },
        "navigationBarTitleText": ""
      }
    },
    {
      "path": "pages/mine/index",
      "name": "mine",
      "style": {
        "navigationBarTitleText": "",
        "navigationBarBackgroundColor": "#E7F0FF"
      }
    }
  ],
  "tabBar": {
    "color": "#bfbfbf",
    "selectedColor": "#0165FF",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "",
        "selectedIconPath": "",
        "text": "首页"
      },
      {
        "pagePath": "pages/mine/index",
        "iconPath": "",
        "selectedIconPath": "",
        "text": "个人中心"
      }
    ]
  },
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarBackgroundColor": "#FFF",
    "backgroundColor": "#F8F8F8"
  }
}
```

## 配置自动按需导入（可选）

[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)：是一个为 `Vite`、`Webpack`、`Rollup` 和 `esbuild` 按需自动导入 API，支持 `TypeScript`的插件，我们基于此插件实现自动按需导入。

不使用按需导入，则需要手动`import`

```ts
import { useRouter } from 'wui-mini-router'
const router = useRouter()
router.push('/')
```

使用按需导入后

```ts
const router = useRouter()
router.push('/')
```

### 安装`unplugin-auto-import`

```sh
yarn add uni-mini-router -D
```

### 配置`unplugin-auto-import`

详细配置方案见[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)，这里给出支持`uni-mini-router`的简易配置

```ts
//vite.config.ts
import { defineConfig } from 'vite'
import TransformPages from 'uni-read-pages-vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
  base: './',
  plugins: [
    uni(),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        'pinia',
        {
          from: '@/plugins/wui-mini-router',
          imports: ['createRouter', 'useRouter', 'useRoute']
        }
      ],
      dts: 'src/auto-imports.d.ts', // 这里src目录必须是已存在的，如果是HbuilderX创建的项目是没有src目录的，可以配置为 dts: 'auto-imports.d.ts'
      vueTemplate: true,
      eslintrc: {
        enabled: true,
        globalsPropValue: true
      }
    })
  ]
})
```

# 入门

## 编程式导航

> 注意：这里`name` 和 `params`搭配使用，而`path` 可以与 `query` 一起使用。

### 基础用法

```ts
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'uni-mini-router'
import { getCurrentInstance } from 'vue'

// 使用hooks（推荐）
let router = useRouter()

// 或者 使用全局挂载的router
router = instence?.appContext.config.globalProperties.$Router

// 字符串路径
router.push('/user')

// 带有路径的对象
router.push({ path: '/user' })

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })

// 带查询参数，结果是 /user?username=eduardo
router.push({ path: '/user', query: { username: 'eduardo' } })

</script>
```

在 user.vue 接收传入的对象参数

```ts
<script setup lang="ts">
onLoad((option) => {
  if (option && option.username) {
    const username = option.username
  }
})
</script>
```

### 传递对象参数

url 有长度限制，太长的字符串会传递失败，可改用[窗体通信](https://uniapp.dcloud.net.cn/tutorial/page.html#%E9%A1%B5%E9%9D%A2%E9%80%9A%E8%AE%AF)、[全局变量](https://ask.dcloud.net.cn/article/35021)，另外参数中出现空格等特殊字符时需要对参数进行编码，如下为使用 encodeURIComponent 对参数进行编码的示例。

```ts
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'uni-mini-router'
import { getCurrentInstance } from 'vue'

let router = useRouter()

const user = {
  name:'小星星',
  label:"小熊熊"
}

// 命名的路由，传递对象参数
router.push({ name: 'user', params: { user: encodeURIComponent(JSON.stringify(user)) } })

// path+query，传递对象参数
router.push({ path: '/user', query: { user: encodeURIComponent(JSON.stringify(user)) } })

</script>
```

在 user.vue 接收传入的对象参数

```ts
<script setup lang="ts">
onLoad((option) => {
  if (option && option.user) {
    const user = JSON.parse(decodeURIComponent(option.user))
  }
})

// 返回
function back() {
  router.back()
}
</script>
```

## 导航守卫

`uni-mini-router`支持`全局前置导航守卫 beforeEach`和`全局后置导航守卫 afterEach`，主要用来通过跳转或取消的方式守卫导航。

#### 全局前置守卫 beforeEach

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```ts
const router = createRouter({ ... })

router.beforeEach((to, from, next) => {
  // next入参 false 以取消导航
  next(false)
})
```

##### `beforeEach`守卫方法接收三个参数：

- `to`: 即将要进入的目标
- `from`: 当前导航正要离开的路由
- `next`: 用于 reslove `beforeEach`钩子，需要确保 `next` 在导航守卫中都被严格调用一次-
  - `next()`: 执行默认路由跳转逻辑
  - `next(false)`: 终止跳转逻辑
  - `next({ path: '/' })`: 跳转到不同的页面
  - `next({ path: '/', navType: 'replaceAll' })`: 改变当前跳转类型并跳转到不同的页面，可以通过`navType`指定新的跳转类型。（实例为中断当前导航，改用`replaceAll`方法跳转到新的页面）

### 全局后置钩子 afterEach

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身

```ts
const router = createRouter({ ... })

router.afterEach((to, from) => {
  console.log(to)
  console.log(from)
})
```
