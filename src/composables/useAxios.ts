import type { AxiosInstance, AxiosRequestConfig, Canceler } from 'axios'
import type { ConfigBase, ErrorIns, IResponseData, UserConfig } from '@/types'

const errorList: ErrorIns[] = [
  { code: 401, type: 'warning', msg: '请先登录后操作' },
  { code: 403, type: 'warning', msg: '登录过期，请重新登录' },
  { code: 404, type: 'error', msg: '网络请求不存在' },
  { code: 500, type: 'error', msg: '服务器内部错误' }
]

class CancelToken {
  private pending: Map<string, Canceler> = new Map()
  private whiteRequest: string[] = []

  private getUrl(config: AxiosRequestConfig) {
    return [config.method, config.url].join('&')
  }

  public addPending(config: AxiosRequestConfig) {
    const url = this.getUrl(config)

    config.cancelToken = new axios.CancelToken((cancel) => {
      if (!this.pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        this.pending.set(url, cancel)
      }
    })
  }

  public removePending(config: AxiosRequestConfig) {
    const url = this.getUrl(config)
    const method = url.split('&')[1]

    if (this.pending.has(url) && !this.whiteRequest.includes(method)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = this.pending.get(url)
      cancel!(url)
      this.pending.delete(url)
    }
  }

  public clearPending() {
    for (const [url, cancel] of this.pending)
      cancel(url)

    this.pending.clear()
  }
}

export const cancelTokenIns = new CancelToken()

export class HttpRequest {
  private _ins: AxiosInstance
  private config: ConfigBase
  private static instance: HttpRequest

  private constructor(userConfig: UserConfig) {
    const defaults: ConfigBase = {
      baseURL: '/api',
      timeout: 5000
    }

    this.config = Object.assign({}, defaults, userConfig)
    this._ins = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout
    })
    this._ins.defaults.headers.post['Content-Type']
      = 'application/x-www-form-urlencoded'

    this._init()
  }

  private _init() {
    this._initRequest()
    this._initResponse()
  }

  private _initRequest() {
    this._ins.interceptors.request.use(
      (config) => {
        cancelTokenIns.removePending(config)
        cancelTokenIns.addPending(config)
        const token = 'getToken()'
        if (token && config.headers)
          config.headers.Authorization = token

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  private _initResponse() {
    this._ins.interceptors.response.use(
      (res) => {
        // const data = res.data as IResponseData
        if (res.status !== 200) {
          this.config.message?.error('网络错误')
          return Promise.reject(res)
        }

        // you need custom your success response return

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
        return Promise.resolve(res.data!)
      },
      (error) => {
        const { data, status } = error.response
        const errIns = errorList.find(e => e.code === status)
        if (errIns && this.config.message)
          this.config.message[errIns.type](errIns.msg)
        else
          this.config.message?.error(data?.msg || '未知错误')

        return Promise.reject(error)
      }
    )
  }

  $get<T>(url: string, params?: Record<string, any>) {
    return this._ins.get<IResponseData<T>>(url, { params })
  }

  $delete<T>(url: string, params?: Record<string, any>) {
    return this._ins.delete<IResponseData<T>>(url, { params })
  }

  $post<T>(url: string, data: Record<string, any>, config: AxiosRequestConfig) {
    return this._ins.post<IResponseData<T>>(url, data, config)
  }

  $put<T>(url: string, data: Record<string, any>, config: AxiosRequestConfig) {
    return this._ins.put<IResponseData<T>>(url, data, config)
  }

  static getInstance(config: UserConfig): HttpRequest {
    if (!HttpRequest.instance)
      HttpRequest.instance = new HttpRequest(config)

    return HttpRequest.instance
  }
}
