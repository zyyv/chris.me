<script lang='ts' setup>
const router = useRouter()
</script>

<template>
  <div>
    <slot>
      <button @click="router.back()">
        cd ..
      </button>
    </slot>
  </div>
</template>

<style lang='scss' scoped>
</style>
