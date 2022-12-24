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
  <div prose ma>
    <PageHeader title="Projects" description="List of projects that I am proud of." />
    <RepoPanel v-for="(repos, key) in repoGroup" :key="key" :label="key" :data="repos" />
  </div>
</template>
