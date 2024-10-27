<script lang="ts" setup>
import { FlowLayout } from 'vue-flow-layout'

const { data } = await useFetch('/api/images')
</script>

<template>
  <FlowLayout
    :cols="4"
    :gap="10"
    class="w-80% mxa children-has-[img:hover]:blur-sm hover-children-has-[img:hover]:blur-none"
  >
    <div
      v-for="src in data"
      :key="src.id"
      of-hidden
      class="group trans"
    >
      <ImgBlurHash
        :src="src.urls.raw"
        :blurhash="src.blur_hash"
        w-100 trans
        style="margin: -5px -10px -10px -5px;"
        group-hover="scale-110"
      />
      <div pa inset-0 op-0 group-hover-op-100>
        <p>
          {{ src.user.last_name }} {{ src.user.first_name }}
        </p>
        <p line-clamp-1>
          {{ src.description }}
        </p>
      </div>
    </div>
  </FlowLayout>
</template>

<style scoped>

</style>
