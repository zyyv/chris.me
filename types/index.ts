export interface User {
  login: string
  id: number
  node_id: string
  name: string
  avatar_url: string
  bio: string
  location: string
  company: string
  email: string
  blog: string

  url: string
  html_url: string

  public_repos: number
  public_gists: number
  followers: number
  following: number

  created_at: string
  updated_at: string
}

export interface Repo{
  id: number
  node_id: string
  name: string
  description: string
  default_branch: string
  created_at: string
  updated_at: string
  forks_count: number
  stargazers_count: number
  url: string
  html_url: string
  disabled: boolean
  is_template: false
  language: string
  fork: boolean
  archived: false
  private: boolean
}

export interface ICursorStyle {
  dot: Record<string, number | string>
  cursor: Record<string, number | string>
  circle: Record<string, number | string>
}
