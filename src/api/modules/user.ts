import http from '../http'

export const userLogin = (url: string, data?: object): Promise<any> => {
  return http.post('/login', { params: data })
}
