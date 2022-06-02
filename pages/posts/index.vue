<script lang='ts' setup>
interface IPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  ago: string;
}

const posts = reactive<IPost[]>([
  {
    id: 1,
    title: 'Hello World',
    content: 'Hello World',
    createdAt: 'May 21, 2020',
    ago: '2 days ago',
    updatedAt: 'May 21, 2020',
  },
  {
    id: 2,
    title: 'Hello World',
    content: 'Hello World',
    createdAt: 'May 21, 2020',
    ago: '2 days ago',
    updatedAt: 'May 21, 2020',
  },
])
</script>

<template>
  <NuxtLayout>
    <div prose ma>
      <h1 text-3xl base text-black mb4 fw500>
        Posts
      </h1>
      <p text-base base font-mono>
        Some boring but useful text
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
            {{ item.createdAt }}&nbsp;&nbsp;&nbsp;<sub>{{ item.ago }}</sub>
          </div>
        </nuxt-link>
      </section>
    </div>
  </NuxtLayout>
</template>

<style lang='scss' scoped>
</style>
