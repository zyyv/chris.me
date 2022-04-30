<script lang='ts' setup>
// import { MaybeRef } from '@vueuse/core'
const val = ref(true)
</script>

<template>
  <div>
    posts

    <div b p-4>
      <Switch v-model="val" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>
