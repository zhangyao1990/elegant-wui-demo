import { request } from '@/api'
import { PORT1 } from '@/api/config/servicePort'
import { ResultData } from '@/api/interface'

/**
 *  登录
 */
export function loginAuthApi(params: any) {
  return request.post<ResultData>(PORT1 + '/patientApi/patient/login/loginAuth', params, {
    custom: {
      auth: false
    }
  })
}
/**
 *  获取用户信息
 */
export function getUserInfoApi(params: any) {
  return request.get<ResultData>(PORT1 + '/patientApi/patient/patientUser/info', params)
}
