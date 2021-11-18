import axios, { AxiosRequestConfig, Canceler } from 'axios'

export class CancelToken {
  // 声明一个 Map 用于存储每个请求的标识 和 取消函数
  private static pending: Map<string, Canceler> = new Map()
  // 白名单, 写入接口名称
  private static whiteRequest: string[] = []

  /**
   * 得到该格式的url
   * @param config
   * @returns
   */
  private static getUrl(config: AxiosRequestConfig) {
    return [config.method, config.url].join('&')
  }

  /**
   * 添加请求
   * @param {Object} config
   */
  public static addPending(config: AxiosRequestConfig) {
    const url = this.getUrl(config)
    config.cancelToken = new axios.CancelToken((cancel) => {
      if (!this.pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        this.pending.set(url, cancel)
      }
    })
  }

  /**
   * 移除请求
   */
  public static removePending(config: AxiosRequestConfig) {
    const url = this.getUrl(config)
    const method = url.split('&')[1]
    if (this.pending.has(url) && !this.whiteRequest.includes(method)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = this.pending.get(url)
      cancel!(url)
      this.pending.delete(url)
    }
  }

  /**
   * 清空 pending 中的请求（在路由跳转时调用）
   */
  public static clearPending() {
    for (const [url, cancel] of this.pending)
      cancel(url)

    this.pending.clear()
  }
}
