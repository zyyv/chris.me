// import type { Repo } from '~~/types'

// const baseUrl = 'https://api.github.com'
// const user = 'chris-zhu'

// function generateUrl(type: 'users' | 'orgs', name: string) {
//   return `${baseUrl}/${type}/${name}`
// }

// const displays = [
//   {
//     title: 'Latest',
//     repos: ['chris.me', 'utils', 'unocss-docs-cn', 'unocss'],
//   },
//   {
//     title: 'Plugin',
//     repos: ['unplugin-vue-image', 'unocss-preset-useful'],
//   },
//   {
//     title: 'UI Framework',
//     repos: ['onu-ui/onu-ui'],
//   },
//   {
//     title: 'Template',
//     repos: ['vitesse', 'starter-ts'],
//   },
//   {
//     title: 'Config',
//     repos: ['eslint-config'],
//   },
//   {
//     title: 'Contribute',
//     repos: ['unocss/unocss', 'vitejs/vite', 'nuxt/framework', 'element-plus/element-plus'],
//   },
// ]

// export default async() => {
//   const res = await Promise.all(
//     displays.map((i) => {
//       return Promise.all(i.repos.map((j) => {
//         if (j.includes('/')) {
//           const [orgs] = j.split('/')
//           return $fetch(generateUrl('orgs', orgs))
//         }
//         return $fetch(generateUrl('users', user))
//       }))
//     }),
//   )

//   console.log(res)

//   // let repos: Repo[] = await $fetch(url)
//   // repos = repos
//   //   .filter(i => !i.disabled && !i.fork && !i.archived && !i.private)
//   //   .sort((a, b) => {
//   //     const v = b.stargazers_count - a.stargazers_count
//   //     if (v === 0)
//   //       return b.forks_count - a.forks_count
//   //     return v
//   //   })

//   // return {
//   //   ps: repos.filter(i => !i.is_template),
//   //   templates: repos.filter(i => i.is_template),
//   // }
// }
