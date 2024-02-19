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
