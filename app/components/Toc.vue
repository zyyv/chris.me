<script lang="ts" setup>
import type { TocLink } from '@nuxt/content'

defineProps<{
  links: TocLink[]
  highlights: string[]
}>()

function handleClickToc(event: MouseEvent, link: TocLink) {
  event.preventDefault()
  window.history.replaceState(null, '', `#${link.id}`)

  const element = document.getElementById(link.id)
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 86, // header height + 16px
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <ul class="space-y-1 text-3.25">
    <li v-for="link in links" :key="link.id" :class="`pl-${link.depth * 4}`">
      <a
        :href="`#${link.id}`" class="text op-50 trans"
        :class="highlights.includes(link.id) ? 'op-100!' : ''"
        hover="underline op-100"
        @click="handleClickToc($event, link)"
      >{{ link.text }}</a>
      <Toc v-if="link.children" :links="link.children" :highlights pl-4 my-1 />
    </li>
  </ul>
</template>
