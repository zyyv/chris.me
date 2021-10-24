<template>
  <div>
    <img class="w-60 h-60" alt="Vue logo" src="@/assets/logo.svg" />
    {{store.info}}
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { ref, reactive } from 'vue'
const store = useUserStore()
</script>
<style lang="scss" scoped></style>
