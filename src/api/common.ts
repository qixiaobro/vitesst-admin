/**
 * @description: 获取上传文件token
 * @return {*}
 */
export const getUploadFileTokenApi = () => {
  return useRequest.get('user/get_upload_key')
}
