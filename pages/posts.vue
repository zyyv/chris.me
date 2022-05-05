<script lang='ts' setup>
// import { MaybeRef } from '@vueuse/core'
const val = ref(true)
</script>

<template>
  <NuxtLayout>
    <div>
      posts

      <div b p-4>
        <!-- <Switch v-model="val" /> -->
        <Wave3 />

        <hr my-4>
        <Wave2 />
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang='scss' scoped>
</style>
