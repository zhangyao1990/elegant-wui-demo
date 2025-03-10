export const globalConfig: any = {
  appId: 'wx459779f15f66a411',
  orgId: 'ISDM'
}
export const specUrlObj = {
  ISDM: 'https://isdm-public.oss-cn-hangzhou.aliyuncs.com'
}
export function getSpecImgUrl(path: string, width: number = 750) {
  return `${specUrlObj[globalConfig.orgId]}/isdm-patient/${path}?x-oss-process=image/auto-orient,1/resize,m_lfit,w_${width}/quality,q_100`
}
