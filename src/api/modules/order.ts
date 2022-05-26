import http from '../http'

/**
 * @description: 获取订单记录
 * @return {*}
 */
export const getOrderList = (params?: object): Promise<any> => {
  return http.get('/user/recharge', params)
}
