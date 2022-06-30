/**
 * @description: 获取客户列表
 * @return {*}
 */
export const getClientListApi = (params?: object): Promise<any> => {
  return useRequest.get('/customer/customer', params)
}

/**
 * @description: 余额变更记录
 * @return {*}
 */
export const getBalanceChangeListApi = (params?: object): Promise<any> => {
  return useRequest.get('/user/balance', params)
}

/**
 * @description: 编辑客户信息
 * @return {*}
 */
export const editClientApi = (params: { id: number; [key: string]: any }): Promise<any> => {
  return useRequest.put(`/customer/customer/${params.id}`, params)
}

/**
 * @description: 获取客户数据统计
 * @return {*}
 */
export const getClientStatisticsApi = (params?: object): Promise<any> => {
  return useRequest.get('/customer/statistics', params)
}

/**
 * @description: 客户余额充值
 * @return {*}
 */
export const rechargeClientBalanceApi = (params?: object): Promise<any> => {
  return useRequest.post('/user/backstage_recharge', params)
}

/**
 * @description: 获取赠送金额
 * @return {*}
 */
export const getGiveBalanceApi = (params?: object): Promise<any> => {
  return useRequest.get('/user/price_select', params)
}
