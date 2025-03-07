import { request } from '@/api'
import { PORT1 } from '@/api/config/servicePort'
import { ResultData } from '@/api/interface'

/**
 *  登录
 */
export function autoLoginById(params: any) {
  return request.post<ResultData>(PORT1 + '/login/loginAuth', params, {
    custom: {
      auth: false
    }
  })
}
