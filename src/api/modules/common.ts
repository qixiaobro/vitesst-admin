import http from '../http'

/**
 * @description: 获取上传文件token
 * @return {*}
 */
export const getUploadFileToken = () => {
  return http.get('user/get_upload_key')
}
