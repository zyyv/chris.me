import type { Repo } from '~/types'
import { useOctokit } from '../utils/github'

export default defineEventHandler(async () => {
  const { data } = await useOctokit().request('GET /user/repos', {
    per_page: 100,
    type: 'owner',
    sort: 'updated',
  })

  const publicRepos = data.filter(repo => !repo.private && !repo.archived)
  const publicAndNotForkRepos = publicRepos.filter(repo => !repo.fork)

  const repoGroups: Record<string, Repo[]> = {
    'Vite Ecosystem': filterRepos(publicAndNotForkRepos, 'vite'),
    'Plugins': filterRepos(publicAndNotForkRepos, 'plugin'),
    'Presets': filterRepos(publicAndNotForkRepos, 'preset'),
    'Utils': filterRepos(publicAndNotForkRepos, 'util'),
    'UnoCSS': filterRepos(publicRepos, 'unocss'),
    'UI': filterRepos(publicRepos, 'ui'),
    'Config': filterRepos(publicAndNotForkRepos, 'config'),
    'Component': filterRepos(publicAndNotForkRepos, 'component'),
    'Templates': filterRepos(publicAndNotForkRepos, 'template'),
    'Games': filterRepos(publicAndNotForkRepos, 'game'),
    'All': publicAndNotForkRepos,
  }

  return repoGroups
})

function filterRepos(repos: Repo[], key: string) {
  return repos.filter(repo => repo.topics && repo.topics.includes(key))
}
