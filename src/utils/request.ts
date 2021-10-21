import type { IAny, IResponseData } from '@/types'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { CancelToken } from '.'
// import type { Result } from './type'
// import { getToken, removeToken } from '/@/utils/auth'
// import router from '@/router'

const message = (window as any).$message

class HttpRequest {
  private instance: AxiosInstance
  private static ins: HttpRequest

  private constructor() {
    this.instance = axios.create({
      baseURL: process.env.NODE_ENV === 'development' ? `/api` : '',
      timeout: 50000
    })
    this.instance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded'
    this.init()
  }

  static getInstance() {
    if (!HttpRequest.ins) {
      HttpRequest.ins = new HttpRequest()
    }

    return HttpRequest.ins
  }

  private init() {
    this._initRequest()
    this._initResponse()
  }

  private _initRequest() {
    this.instance.interceptors.request.use(
      (config) => {
        CancelToken.removePending(config)
        CancelToken.addPending(config)
        const token = 'getToken()'
        if (token && config.headers) {
          config.headers.Authorization = token
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  private _initResponse() {
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data as IResponseData
        if (res.status !== 200) {
          message.error('网络错误')
          return Promise.reject(res)
        }
        // // 未登录
        // if (data.code === 600) {
        //   message.error(data.message)
        //   //   router.push({
        //   //     path: '/login',
        //   //     query: {
        //   //       fromurl: window.location.href
        //   //     }
        //   //   })
        //   return Promise.reject(res)
        // }
        // if (data.code !== 200) {
        //   return Promise.reject(res)
        // }
        return Promise.resolve(res)
      },
      (error) => {
        const { data, status } = error.response
        switch (status) {
          case 401:
            message.warning('请先登录后操作')
            // todo
            break
          case 403:
            message.warning('登录过期，请重新登录')
            // todo
            break
          case 404:
            message.error('网络请求不存在')
            // todo
            break
          case 500:
            message.error('服务器内部错误')
            // todo
            break
          default:
            message.error(data?.msg || '未知错误')
        }
        return Promise.reject(error)
      }
    )
  }

  get(url: string, params: IAny) {
    this.instance.get(url, { params })
  }
  delete(url: string, params: IAny) {
    this.instance.delete(url, { params })
  }
  post(url: string, data: IAny, config: AxiosRequestConfig) {
    this.instance.post(url, data, config)
  }
  put(url: string, data: IAny, config: AxiosRequestConfig) {
    this.instance.put(url, data, config)
  }
}

export const http = HttpRequest.getInstance()
