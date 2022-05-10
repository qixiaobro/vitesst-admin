import http from '../http'

/**
 * @description: 获取blob图形验证码
 * @param {*}
 * @return {*}
 */
export const getBlobCaptcha = () => {
  return http.getBlob('/captcha')
}

/**
 * @description: 登录
 * @param {string} url
 * @param {object} data
 * @return {*}
 */
export const userLogin = (params?: object): Promise<any> => {
  return http.post('/login', params)
}

