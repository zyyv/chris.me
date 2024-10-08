import type { Endpoints } from '@octokit/types'

export * from './article'
export * from './gc'

export type Repo = Endpoints['GET /user/repos']['response']['data'][number]
export type User = Endpoints['GET /user']['response']['data']

export interface ICursorStyle {
  dot: Record<string, number | string>
  cursor: Record<string, number | string>
  circle: Record<string, number | string>
}
