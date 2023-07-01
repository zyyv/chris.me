import type { ContributeData } from 'types'

export default defineEventHandler(async (event) => {
  if (import.meta.env.NODE_ENV === 'development')
    return (await import('~/data/contributions.json')).default as ContributeData

  const { name, year } = getQuery(event)
  const API = `https://github-contributions-api.jogruber.de/v4/${name}?y=${year}`
  return $fetch<ContributeData>(API)
})
