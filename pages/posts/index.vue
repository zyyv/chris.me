<script lang='ts' setup>
import { useTitle } from '@vueuse/core'

interface IPost {
  id: number | string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  ago: string;
}

useTitle('Chris\' Blog | Posts')

const posts = reactive<IPost[]>([
  {
    id: 'test',
    title: 'Hello World',
    content: 'Hello World',
    createdAt: 'May 21, 2020',
    ago: '2 days ago',
    updatedAt: 'May 21, 2020',
  },
])
</script>

<template>
  <div prose ma>
    <h1 text-3xl base text-black mb4 fw500>
      Posts
    </h1>
    <p text-base base font-mono>
      Some boring but useful articles.
    </p>

    <section>
      <nuxt-link
        v-for="item in posts"
        :key="item.id"
        :to="`/posts/${item.id}`"
        important-no-underline
        block
        op-70
        hover:op-100
      >
        <h3>{{ item.title }}</h3>
        <div fic text-sm text-gray4 fw-normal>
          {{ item.createdAt }}&nbsp;&nbsp;&nbsp;<sub bottom-0>{{ item.ago }}</sub>
        </div>
      </nuxt-link>
    </section>
  </div>
</template>

<style lang='scss' scoped>
</style>
