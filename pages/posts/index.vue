<script lang='ts' setup>
import { useTitle } from '@vueuse/core'

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
    <ContentList v-slot="{ list }" path="/posts">
      {{ list }}
      <nuxt-link
        v-for="article in list"
        :key="article._path"
        :to="article"
        important-no-underline
        block
        op-70
        hover:op-100
      >
        <h3>{{ article.title }}</h3>
        <!-- <div fic text-sm text-gray4 fw-normal>
          {{ item.ctime }}
        </div> -->
      </nuxt-link>
    </ContentList>

    <!-- <section>
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
        </div>
      </nuxt-link>
    </section> -->
  </div>
</template>

<style lang='scss' scoped>
</style>
