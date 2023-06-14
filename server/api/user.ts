// import { OctokitCtx } from '../constants'
import type { User } from '~/types'

export default defineEventHandler(async () => {
  // const {
  //   data,
  // } = await OctokitCtx.rest.users.getAuthenticated()

  // return data
  return $fetch<User>('https://api.github.com/users/zyyv')
})
