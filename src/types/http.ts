export type msgType = 'success'| 'warning' | 'error' | 'info'

export type Message = {
  [key in msgType]: (msg: string) => void | Promise<void>
}

export interface ConfigBase<T = Message> {
  baseURL?: string
  timeout?: number
  message?: T
}

export interface UserConfig<T = Message> extends ConfigBase<T>{}

export interface ErrorIns {
  code: number
  msg: string
  type: msgType
}
