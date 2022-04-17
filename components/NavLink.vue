<script lang='ts' setup>
const props = defineProps<{
  to: string
  linkActiveClass?: string
  linkExactActiveClass?: string
}>()
const isExternalLink = computed(() => typeof props.to === 'string' && props.to.startsWith('http'))
</script>

<template>
  <a
    v-if="isExternalLink"
    navlink
    v-bind="$attrs"
    :href="to"
    target="_blank"
  >
    <slot />
  </a>
  <NuxtLink v-else v-bind="props" navlink prefetch>
    <slot />
  </NuxtLink>
</template>
