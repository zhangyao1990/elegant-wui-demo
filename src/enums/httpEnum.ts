/**
 * @description: 请求结果设置
 */
export enum ResultEnum {
  SUCCESS = 200,
  FAIL = 10001,
  ERROR = 1,
  TIMEOUT = 401,
  CODE = 104,
  TYPE = 'success'
}

/**
 * @description: contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
