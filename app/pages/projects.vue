<script lang='ts' setup>
import { useTitle } from '@vueuse/core'

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

const { data, pending } = useFetch('/api/repos')
</script>

<template>
  <div ma max-w-65ch>
    <PageHeader title="Projects" description="List of projects that I am proud of." />
    <div mt-8 space-y-8>
      <template v-if="pending">
        <div v-for="section in 2" :key="section">
          <h4 mb-2 class="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div grid="~ cols-1 md:cols-2 gap-4">
            <RepoSkeleton v-for="n in 4" :key="n" />
          </div>
        </div>
      </template>
      <template v-else>
        <div v-for="(repos, key) in data" :key="key">
          <h4 mb-2>
            {{ key }}
          </h4>
          <div grid="~ cols-1 md:cols-2 gap-4">
            <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
