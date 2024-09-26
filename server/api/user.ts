import { useOctokit } from '../utils/github'

export default defineEventHandler(async () => {
  const { data } = await useOctokit().request('GET /user')
  return data
})
