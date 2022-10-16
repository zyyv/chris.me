<script lang='ts' setup>
import { useTitle } from '@vueuse/core'
import posts from '~/data/posts.json'

interface IPost {
  id: number | string;
  mtime: string;
  ctime: string;
  slug: string;
}

useTitle('Chris\' Blog | Posts')
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
        :to="`/posts/${item.slug}`"
        important-no-underline
        block
        op-70
        hover:op-100
      >
        <h3>{{ item.slug }}</h3>
        <div fic text-sm text-gray4 fw-normal>
          {{ item.ctime }}
          <!-- <sub bottom-0>{{ item.ago }}</sub> -->
        </div>
      </nuxt-link>
    </section>
  </div>
</template>

<style lang='scss' scoped>
</style>
