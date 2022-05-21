<script lang="ts" setup>
import { useUserStore } from '~~/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div
    text="sm gray4"
    m-5
    flex
    justify-center
    gap-3
  >
    <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2022005364号</a>
    2022 ©
    <a href="https://github.com/chris-zhu" target="_blank">{{ userStore.user?.name }}</a>
  </div>
</template>
