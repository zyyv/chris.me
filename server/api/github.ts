const baseUrl = 'https://api.github.com'
const user = 'chris-zhu'
const url = `${baseUrl}/users/${user}/repos`

interface Repo{
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
  disabled: boolean
  is_template: false
  language: string
  fork: boolean
  archived: false
}

export default async() => {
  let repos: Repo[] = await $fetch(url)
  repos = repos.filter(i => !i.disabled).filter(i => !i.fork).filter(i => !i.archived)

  return {
    ps: repos.filter(i => !i.is_template),
    templates: repos.filter(i => i.is_template),
  }
}
