import type { Endpoints } from '@octokit/types'

export type Repo = Endpoints['GET /user/repos']['response']['data'][number]
export type User = Endpoints['GET /user']['response']['data']

export interface ICursorStyle {
  dot: Record<string, number | string>
  cursor: Record<string, number | string>
  circle: Record<string, number | string>
}

export interface Article {
  _id: string
  _draft: boolean
  _empty: boolean
  _extension: string
  _file: string
  _path: string
  _source: string
  _type: string

  id: number
  uid?: number
  mtime: string
  mtimeMs: number
  ctime: string
  ctimeMs: number
  slug: string
  title: string
  draft: boolean
}
