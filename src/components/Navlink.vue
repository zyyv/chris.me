<script lang='ts' setup>
const props = defineProps<{
  to: string
  activeClass?: string
  inactiveClass?: string
}>()

const isExternalLink = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<template>
  <a
    v-if="isExternalLink"
    no-underline
    outline-none
    text-inherit
    v-bind="$attrs"
    :href="to"
    target="_blank"
  >
    <slot />
  </a>
  <router-link v-else v-slot="{ isActive, href, navigate }" v-bind="$props" custom>
    <a
      v-bind="$attrs"
      :href="href"
      text-inherit
      no-underline
      outline-none
      :class="isActive ? activeClass : inactiveClass"
      @click="navigate"
    >
      <slot />
    </a>
  </router-link>
</template>
