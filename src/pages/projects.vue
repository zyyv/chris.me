<script lang='ts' setup>
const { t } = useI18n()
console.log(t('project.h1'))
</script>
<template>
  <div class="w-3/5 m-auto">
    <h1>{{ t('project.h1') }}</h1>
    <h3>List of projects that I am proud of</h3>
  </div>
</template>
<style lang='scss' scoped>
</style>
