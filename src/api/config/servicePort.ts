import { getEnvMode } from '@/utils/env'
let environment = '' //uniapp环境
let BASEURL1: any = {}
/********* 微信小程序服务端地址 **********/
// #ifdef MP-WEIXIN
const {
  miniProgram: { envVersion, appId }
} = uni.getAccountInfoSync()
environment = envVersion
BASEURL1 = {
  develop: 'https://xxxxxxx', //开发版
  trial: 'https://xxxxxxx', //体验版
  release: 'https://xxxxxxx' //正式版
}
// #endif
/********* h5服务端地址 **********/
// #ifdef H5
environment = getEnvMode()
// * 后端接口请求地址1
BASEURL1 = {
  dev: '/nethos', //开发版
  test: 'https://xxxxxxx', //测试版
  prod: 'https://xxxxxxx' //正式版
}
// #endif
export const PORT1 = BASEURL1[environment]
