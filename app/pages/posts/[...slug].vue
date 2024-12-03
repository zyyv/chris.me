<script lang="ts" setup>
import type { TocLink } from '@nuxt/content'

const route = useRoute()
const { data: post } = await useAsyncData(() => {
  return queryCollection('posts')
    .path(route.path)
    .first()
})
const ids = computed(() => getIds(post.value?.body.toc?.links ?? []))
const activeToc = ref<string[]>([])

useSeoMeta(post.value?.seo ?? {})

function getIds(links: TocLink[]): string[] {
  return links.reduce((acc, link) => {
    acc.push(link.id)
    if (link.children) {
      acc.push(...getIds(link.children))
    }
    return acc
  }, [] as string[])
}

function isElementInViewport(selector: string): boolean {
  const element = document.querySelector(selector)
  if (!element)
    return false

  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0
    && rect.left >= 0
    && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function handleScroll() {
  const _ids = ids.value.filter(id => isElementInViewport(`#${id}`))
  if (_ids.length)
    activeToc.value = _ids
}

onMounted(() => {
  handleScroll()
  useEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <div prose mxa class="peer text-3.75">
      <template v-if="post">
        <h1>{{ post.title }}</h1>
        <ContentRenderer :value="post" />
      </template>
      <Back mt-8 />
    </div>

    <Toc
      v-if="post" peer-hover="op-100"
      hover="op-100!"
      class="pf right-10 top-40 op-36 trans"
      :links="post.body.toc?.links ?? []"
      :highlights="activeToc"
    />
  </div>
</template>
