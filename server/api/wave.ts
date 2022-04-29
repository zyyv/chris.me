import { useBody } from 'h3'

export default defineEventHandler(async({ req }) => {
  const { url } = await useBody(req)
  const { data } = await $fetch(url)
  return data
})
