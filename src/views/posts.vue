<template>
  <div>
    posts
    <Switch />
    <div class="i-ph-anchor-simple-thin" />
    {{ a }}
  </div>
</template>

<script lang="ts" setup>
let a = ref({
  a: 19
})
// console.log(a)
</script>
<style lang="scss" scoped></style>
