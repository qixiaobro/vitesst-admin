/**
 * @description: 获取blob图形验证码
 * @param {*}
 * @return {*}
 */
export const getBlobCaptchaApi = () => {
  return useRequest.get('/captcha', {}, { responseType: 'blob' })
}

/**
 * @description: 登录
 * @param {string} url
 * @param {object} data
 * @return {*}
 */
export const userLoginApi = (params?: object): Promise<any> => {
  return useRequest.post('/login', params)
}

/**
 * @description: 获取用户信息
 * @param {*}
 * @return {*}
 */

export const userInfoApi = (): Promise<any> => {
  return useRequest.get('/setting/info')
}
