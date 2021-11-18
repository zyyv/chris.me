<template>
  <div>
    <div class="text-light-600">
      posts1===11111111111
    </div>
    <Switch v-model:value="a" size="small" />
    {{ a }}
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'

const a = ref(true)
useUserStore()

</script>
<style lang="scss" scoped></style>
