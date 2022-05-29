import http from '../http'

/**
 * @description: 获取公司列表
 * @return {*}
 */
export const getCompanyList = (params?: object): Promise<any> => {
  return http.get('/company/company', params)
}

/**
 * @description: 修改申报状态
 * @return {*}
 */
export const changeDeclareStatus = (params: { id: number; status: number; [key: string]: any }): Promise<any> => {
  return http.put(`/company/set_status/${params.id}/${params.status}`)
}

/**
 * @description: 删除公司
 * @return {*}
 */
export const deleteCompany = (params: { id: number }): Promise<any> => {
  return http.delete(`/company/company/${params.id}`)
}

/**
 * @description: 新增公司
 * @return {*}
 */
export const addCompany = (params: Company): Promise<any> => {
  return http.post('/company/company', params)
}

/**
 * @description: 修改公司
 * @return {*}
 */
export const editCompany = (params: Company): Promise<any> => {
  return http.put(`/company/company/${params.id}`, params)
}

/**
 * @description: 获取公司统计信息
 * @return {*}
 */
export const getCompanyStatistics = (params?: object): Promise<any> => {
  return http.get('/company/statistics', params)
}

/**
 * @description: 导入公司
 * @return {*}
 */
export const importCompany = (params: FormData | File): Promise<any> => {
  return http.upload('/company/import', params)
}
