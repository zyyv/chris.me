<script lang='ts' setup>
import type { Repo } from '~/types'

defineProps<{
  repo: Repo
}>()
</script>

<template>
  <article
    b="~ black op-10"
    dark-b="white op-10"
    rounded-lg
    p-4
    text-xs
    shadow-sm
    trans
    hover="bg-orange bg-op-3"
    dark-hover="bg-white bg-op-3"
  >
    <a :href="repo.homepage || repo.html_url" target="_blank" decoration-none flex="~ col gap-3" h-full>
      <h5 m0 fsc gap-1 text-sm>
        <i i-ri:git-repository-line />
        <span>{{ repo.name }}</span>
        <span
          fw-normal
          inline-block
          important-rounded-full
          :class="repo.is_template ? 'bg-yellow bg-blue' : 'dark-bg-teal bg-red'"
        >
          {{ repo.private ? 'Private' : 'Public' }}
          {{ repo.is_template ? 'Template' : '' }}
        </span>
      </h5>
      <p m0 flex-1>
        {{ repo.description }}
      </p>
      <p fsc gap-4 m0>
        <span v-if="repo.language" fsc gap-1>
          <i
            w-3
            h-3
            rounded-full
            :style="{ backgroundColor: repo.language ? getLanguageColor(repo.language) : '' }"
          />
          {{ repo.language }}
        </span>
        <a
          v-if="repo.stargazers_count"
          target="_blank"
          decoration-none
          :href="`https://github.com/${repo.full_name}/stargazers`"
        >
          <span v-if="repo.stargazers_count" fsc gap-1>
            <i i-ri:star-line />
            {{ repo.stargazers_count }}
          </span>
        </a>
        <a
          v-if="repo.forks_count"
          target="_blank"
          decoration-none
          :href="`https://github.com/${repo.full_name}/network/members`"
          fsc
          gap-1
        >
          <i i-carbon:direction-fork />
          {{ repo.forks_count }}
        </a>
      </p>
    </a>
  </article>
</template>
