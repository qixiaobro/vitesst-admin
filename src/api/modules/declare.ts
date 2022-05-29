import http from '../http'

/**
 * @description: 待申报列表 / 导出
 * @return {*}
 */
export const getDeclareList = (params?: object): Promise<any> => {
  return http.get('/user/pending_declare', params)
}

/**
 * @description: 停止申报列表 / 导出
 * @return {*}
 */
export const getStopDeclareList = (params?: object): Promise<any> => {
  return http.get('/user/stop_declare', params)
}

/**
 * @description: 新增申报列表 / 导出
 * @return {*}
 */
export const getNewDeclareList = (params?: object): Promise<any> => {
  return http.get('/user/new_declare', params)
}

/**
 * @description: 申报记录
 * @return {*}
 */
export const getDeclareRecord = (params?: object): Promise<any> => {
  return http.get('/user/declaration', params)
}

/**
 * @description: 申报
 * @return {*}
 */
export const declare = (params?: object): Promise<any> => {
  return http.post('/user/declare', params)
}
