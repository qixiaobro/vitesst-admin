import http from '../http'

/**
 * @description: 获取客户列表
 * @return {*}
 */
export const getClientList = (params?: object): Promise<any> => {
  return http.get('/customer/customer', params)
}

/**
 * @description: 余额变更记录
 * @return {*}
 */
export const getBalanceChangeList = (params?: object): Promise<any> => {
  return http.get('/user/balance', params)
}

/**
 * @description: 编辑客户信息
 * @return {*}
 */
export const editClientApi = (params: { id: number; [key: string]: any }): Promise<any> => {
  return http.put(`/customer/customer/${params.id}`, params)
}

/**
 * @description: 获取客户数据统计
 * @return {*}
 */
export const getClientStatistics = (params?: object): Promise<any> => {
  return http.get('/customer/statistics', params)
}