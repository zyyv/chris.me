import type { App } from 'vue'

export interface IAny {
  [x: string]: any
}

export interface ICursorStyle {
  dot: object
  cursor: object
  circle: object
}

export type UserModule = (ctx: App) => void

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

export interface IResponseData<T> {
  code: number
  data?: T
  msg: string
}
