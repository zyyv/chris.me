const startAt = Date.now()
let count = 0

export default () => ({
  pageview: count++,
  startAt,
})

// export default defineEventHandler((event) => {
//   return {
//     api: 'works',
//   }
// })
