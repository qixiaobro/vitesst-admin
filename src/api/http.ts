import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import showCodeMessage from './code'
import type { instanceObject } from '~/composables'
import { formatJsonToUrlParams } from '~/composables'

const BASE_PREFIX = import.meta.env.VITE_API_BASEURL

// 创建实例
const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // TODO 在这里可以加上想要在请求发送前处理的逻辑
    // TODO 比如 loading 等
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      if (response.request.responseType === 'blob')
        return response.data
      else if (response.data.status === 200)
        return Promise.resolve(response.data)
      else
        return Promise.reject(response.data)
    }

    ElMessage.info(JSON.stringify(response.status))
    return Promise.reject(response)
  },
  (error: AxiosError) => {
    const { response } = error
    if (response) {
      ElMessage.error(showCodeMessage(response.status))
      return Promise.reject(response.data)
    }
    ElMessage.warning('网络连接异常,请稍后再试!')
    return Promise.reject(error)
  },
)
const service = {
  get<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.get(url, { params: data })
  },
  getBlob<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.get(url, { params: data, responseType: 'blob' })
  },

  // post<T = any>(url: string, data?: object): Promise<T> {
  //   return axiosInstance.post(url, data)
  // },

  post<T>(url: string, params?: object, _object = {}): Promise<T> {
    return axiosInstance.post(url, params, _object)
  },

  put<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.put(url, data)
  },

  delete<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.delete(url, data)
  },

  upload: (url: string, file: FormData | File) =>
    axiosInstance.post(url, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  download: (url: string, data: instanceObject) => {
    window.location.href = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(data)}`
  },
}

export default service
