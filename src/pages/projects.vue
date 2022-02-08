<script lang='ts' setup>
const { t } = useI18n()

useTitle('Chris\' Blog | Projects')
</script>

<template>
  <div max-w-porse m-auto>
    <h1 text-4xl class="mb-4 font-medium">
      {{ t('project.h1') }}
    </h1>
    <p class="text-xl">
      {{ t('project.h2') }}
    </p>
  </div>
</template>
