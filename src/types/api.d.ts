import type { IAny } from '.'

export interface IResponseData extends IAny {
  code: number
  data?: unknown
  message: string
}
