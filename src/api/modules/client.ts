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
