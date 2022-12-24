import { OctokitCtx } from '../constants'

export default defineEventHandler(async() => {
  const {
    data,
  } = await OctokitCtx.rest.users.getAuthenticated()

  return data
})
