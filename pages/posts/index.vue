<script lang='ts' setup>
import { useTitle } from '@vueuse/core'

useTitle('Chris\' Blog | Posts')
</script>

<template>
  <div prose ma>
    <h1 text-3xl base text-black mb4>
      Posts
    </h1>
    <p text-base base italic>
      Some boring but useful articles.
    </p>
    <ContentList>
      <template #default="{ list }">
        <template v-for="article in list" :key="article._path">
          <nuxt-link
            v-if="!article.draft"
            :to="article._path"
            important-no-underline
            block
            op-70
            hover:op-100
          >
            <h3>{{ article.title }}</h3>
            <div italic fic text-sm text-gray4 fw-normal>
              {{ new Date(article.ctime).toDateString() }}
            </div>
          </nuxt-link>
        </template>
      </template>
      <template #not-found>
        1
      </template>
    </ContentList>
  </div>
</template>

<style lang='scss' scoped>
</style>
