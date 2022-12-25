// import { OctokitCtx } from '../constants'
import type { Repo } from '~/types'

export default defineEventHandler(async() => {
  // const { data } = await OctokitCtx.rest.repos.listForAuthenticatedUser({
  //   per_page: 100,
  //   type: 'owner',
  //   sort: 'updated',
  // })
  const data = await $fetch<Repo[]>('https://api.github.com/users/zyyv/repos?per_page=100&type=owner&sort=updated')

  const publicRepos = data.filter(repo => !repo.private && !repo.archived)
  const publicAndNotForkRepos = publicRepos.filter(repo => !repo.fork)

  const repoGroups: Record<string, Repo[]> = {
    'Vite Ecosystem': publicAndNotForkRepos.filter(repo => repo.topics && repo.topics.includes('vite')),
    'Plugins': publicAndNotForkRepos.filter(repo => repo.topics && repo.topics.includes('plugin')),
    'Presets': publicAndNotForkRepos.filter(repo => repo.topics && repo.topics.includes('preset')),
    'Utils': publicAndNotForkRepos.filter(repo => repo.topics && repo.topics.includes('util')),
    'UnoCSS': publicRepos.filter(repo => repo.topics && repo.topics.includes('unocss')),
    'Onu-UI': publicRepos.filter(repo => repo.topics && repo.topics.includes('onu')),
    'Config': publicAndNotForkRepos.filter(repo => repo.topics && repo.topics.includes('config')),
    'Component': publicAndNotForkRepos.filter(repo => repo.topics && repo.topics.includes('component')),
    'Templates': publicAndNotForkRepos.filter(repo => repo.topics && repo.topics.includes('template')),
    'Games': publicAndNotForkRepos.filter(repo => repo.topics && repo.topics.includes('game')),
    'All': publicAndNotForkRepos,
  }

  return repoGroups
})
