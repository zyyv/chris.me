<template>
  <div>
    posts
    <Switch v-model:value="a" disabled />
    {{ a }}
  </div>
</template>

<script lang="ts" setup>
let a = ref(true)
// console.log(a)

function handleChage(a: boolean) {
  console.log(a)
}
</script>
<style lang="scss" scoped></style>
