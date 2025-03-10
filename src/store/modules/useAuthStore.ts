import { ResultData } from '@/api/interface'
import { getCache, setCache, removeCache } from '@/utils/cache'
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
const useAuthStore = defineStore(
  // 唯一ID
  'auth',
  () => {
    const token = ref<string | null | undefined>(getCache(TOKEN_KEY) || '')
    const userInfo = ref<ResultData | null>(getCache(USER_INFO_KEY) || null)
    const isLogin = computed(() => {
      return !!token.value
    })
    // 登录
    async function login(data: any) {
      return new Promise((resolve, reject) => {
        console.log('data', data)
        try {
          const res = {
            code: 200,
            data: {
              token: '1111111111'
            }
          }
          if (res.code === 200) {
            setCache(TOKEN_KEY, res.data.token || '')
            token.value = res.data.token
            resolve(res)
          }
        } catch (e: any) {
          reject(e)
        }
      }).catch((e) => {})
    }
    // 获取用户信息
    async function getUserInfo() {
      const res: any = {
        code: 200,
        data: {
          name: 'admin',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          id: 10086,
          userId: '1'
        }
      }
      if (!res) {
        throw new Error('error') // 由于mockjs 不支持自定义状态码只能这样hack
      }
      setCache(USER_INFO_KEY, res.data)
      userInfo.value = res.data
      return res
    }
    /**
     * @description 登出
     */
    function loginOut() {
      return new Promise((resolve, reject) => {
        removeCache(TOKEN_KEY) //清除缓存token
        removeCache(USER_INFO_KEY) //清除缓存用户信息
        token.value = ''
        resolve(true)
      })
    }
    return {
      token,
      userInfo,
      isLogin,
      login,
      getUserInfo,
      loginOut
    }
  }
)

export default useAuthStore
