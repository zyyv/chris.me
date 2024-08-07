// import { OctokitCtx } from '../constants'

import type { User } from '~/types'

export default defineEventHandler(async () => {
  // const {
  //   data,
  // } = await OctokitCtx.rest.users.getAuthenticated()

  // return data

  if (import.meta.dev)
    return (await import('~/mock/user.json')).default as User

  return $fetch<User>('https://api.github.com/users/zyyv')
})
