import { ResultData } from '@/api/interface'
import { getCache } from '@/utils/cache'
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'

const useAuthStore = defineStore(
  // 唯一ID
  'auth',
  () => {
    const token = ref<string | null | undefined>(getCache(TOKEN_KEY) ?? '')
    const userInfo = ref<ResultData | null>(getCache(USER_INFO_KEY) || null)
    const isLogin = computed(() => {
      return !!token.value
    })

    // 登录
    async function login(data: any) {
      return new Promise((resolve, reject) => {
        // let params = {
        //   loginPassword: data.loginPassword,
        //   loginVale: data.loginVale,
        //   captcha: data.captcha,
        //   id: data.id,
        // }
        // loginApi(params).then((res: any) => {
        //   if (res.code === 200) {
        //     setLocal('token', res.data?.token)
        //     setLocal('refresh_token', res.data.refreshToken)
        //     token.value = res.data.token
        //     refreshToken.value = res.data.refreshToken
        //   }
        //   resolve(res)
        // }).catch((error) => {
        //   reject(error)
        // })
      })
    }
    function getUserInfo() {
      return new Promise((resolve, reject) => {
        // getUserInfoApi()
        //   .then(async (res: any) => {
        //     if (!res) {
        //       // 由于mockjs 不支持自定义状态码只能这样hack
        //       reject(new Error('error'))
        //     }
        //     // 储存用户信息
        //     setLocal('account', res.data.name)
        //     setLocal('avatar', res.data.imagesUrl)
        //     setLocal('userInfo', res.data)
        //     account.value = res.data.name
        //     avatar.value = res.data.imagesUrl
        //     userInfo.value = res.data
        //     resolve(res)
        //   })
        //   .catch((error: any) => {
        //     reject(error)
        //   })
      })
    }
    return {
      token,
      userInfo,
      isLogin,
      login,
      getUserInfo
    }
  }
)

export default useAuthStore
