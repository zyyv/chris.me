<script lang='ts' setup>
import type { Repo } from '~/types'

defineProps<{
  data: Repo[]
  label: string
}>()
</script>

<template>
  <div v-if="data.length">
    <h4>
      {{ label }}
    </h4>
    <div grid="~ cols-1 md:cols-2 gap-4">
      <RepoCard v-for="repo in data" :key="repo.id" :repo="repo" />
    </div>
  </div>
</template>
