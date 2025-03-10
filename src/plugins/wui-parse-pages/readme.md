# wui-parse-pages

#### 介绍

读取 uni-app 项目 pages.json 中的配置，转换为 wui-mini-router 的路由表结构

````
## 使用
读取`pages.json`文件生成`wui-mini-router`的路由表。在`router`配置文件中增加已下配置：

```ts
// router.ts

// 导入pages.json
import pagesJson from '../pages.json'
// 引入wui-parse-pages
import pagesJsonToRoutes from 'wui-parse-pages'
// 生成路由表
const routes = pagesJsonToRoutes(pagesJson)
````
