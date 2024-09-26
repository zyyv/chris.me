<script lang='ts' setup>
import { useTitle } from '@vueuse/core'

const { data: repoGroup } = await useFetch('/api/repos')

useTitle('Projects | Chris')
useHead({
  title: 'Projects | Chris',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'List of projects that I am proud of.',
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: 'projects, github, open source, vue, nuxt, node, javascript, typescript',
    },
  ],
})
</script>

<template>
  <div ma max-w-65ch>
    <PageHeader title="Projects" description="List of projects that I am proud of." />
    <template v-for="(repos, key) in repoGroup" :key="key">
      <h4>
        {{ key }}
      </h4>
      <div grid="~ cols-1 md:cols-2 gap-4">
        <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
      </div>
    </template>
  </div>
</template>
