import Request from 'luch-request'
import { getBaseUrl } from '@/utils/env'
import useAuthStore from '@/store/modules/useAuthStore'
import { ResultEnum } from '@/enums/httpEnum'

const HEADER = {
  'Content-Type': 'application/json;charset=UTF-8;',
  Accept: 'application/json, text/plain, */*'
}
function createRequest() {
  return new Request({
    // baseURL: getBaseUrl(),
    header: HEADER,
    custom: {
      auth: true
    }
  })
}

const request = createRequest()
/**
 * 请求拦截器
 */
request.interceptors.request.use(
  async (options: any) => {
    if (options.custom?.auth) {
      const authStore = useAuthStore()
      console.log('authStore.token', authStore.token)
      if (authStore.token) {
        options.header = Object.assign(options.header, {
          token: `${authStore.token}`
        })
      }
    }
    options.header = Object.assign(options.header, {
      source: 1
    })
    return options
  },
  (error) => {
    // 请求错误，可在此进行统一错误处理
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  async (response: any) => {
    const { data: resData } = response
    const { code, message } = resData
    if (code === ResultEnum.SUCCESS) {
      return resData as any
    }
    // Toast(message)
    return Promise.reject(resData)
  },
  async (error: any) => {
    console.log('error', error)
    if (error?.data?.code == ResultEnum.CODE) {
      const router = useRouter()
      //未登录时清空缓存跳转
      return
    }

    if (error && error.statusCode) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.statusCode) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '登录失效'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.statusCode}`
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes('timeout')) {
        error.message = '服务器响应超时'
      } else {
        error.message = '连接服务器失败'
      }
    }
    if (error && error.statusCode !== 401) {
      // Toast(error.message)
    }
    // 请求错误做点什么。可以使用async await 做异步操作
    // error('Request Error!');
    return Promise.reject(error)
  }
)

export { request }
