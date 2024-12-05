<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'
import { proseHeadingClick } from '~/utils'

// @unocss-skip-start
const props = defineProps<{
  id?: string
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>()
// @unocss-skip-end

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && (
  (typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true)
  || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.[props.tag])),
)
</script>

<template>
  <component :is="props.tag" :id="props.id" class="pr group text text-op-90">
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
      text-inherit
      @click="proseHeadingClick($event, props.id)"
    >
      <slot />
    </a>
    <slot v-else />
    <span
      v-if="props.id && generate"
      pa fcc size-5.5 bg-primary:10 rd pyc left--7
      group-hover:op-100 trans op-0 cursor-pointer
      @click="proseHeadingClick($event, props.id)"
    >
      <i i-carbon:link text-sm />
    </span>
  </component>
</template>
