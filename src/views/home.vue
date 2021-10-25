<template>
  <div class=" w-3/5 m-auto">
    <img class="w-60 h-60" alt="Vue logo" src="@/assets/logo.svg" />
    {{ store.info.name }}
    <div style="height: 500px;" v-for="i in 3">1</div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { ref, reactive } from 'vue'
const store = useUserStore()
// setTimeout(() => {
//   store.$patch({
//     age: 18
//   } as any)
// }, 1000)
</script>
<style lang="scss" scoped></style>
