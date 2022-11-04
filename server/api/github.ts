import path from 'path'
import fs from 'fs-extra'
import type { Repo } from '~/types'

const baseUrl = 'https://api.github.com'
const user = 'zyyv'
const url = `${baseUrl}/users/${user}/repos`

const fileUrl = import.meta.url
const __dirname = path.dirname(fileUrl.slice(7))

export default defineEventHandler(async() => {
  let repos: Repo[] = await $fetch(url)

  // console.log(path.resolve(__dirname, '../../data/repos.json'))

  await fs.writeJSON(path.resolve(__dirname, '../../data/repos.json'), repos)

  repos = repos
    .filter(i => !i.disabled && !i.fork && !i.archived && !i.private)

  return {
    ps: repos.filter(i => !i.is_template),
    templates: repos.filter(i => i.is_template),
  }
})
