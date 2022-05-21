import type { Repo } from '~~/types'

const baseUrl = 'https://api.github.com'
const user = 'chris-zhu'
const url = `${baseUrl}/users/${user}/repos`

export default async() => {
  let repos: Repo[] = await $fetch(url)
  repos = repos
    .filter(i => !i.disabled && !i.fork && !i.archived && !i.private)
    .sort((a, b) => {
      const v = b.stargazers_count - a.stargazers_count
      if (v === 0)
        return b.forks_count - a.forks_count
      return v
    })

  return {
    ps: repos.filter(i => !i.is_template),
    templates: repos.filter(i => i.is_template),
  }
}
