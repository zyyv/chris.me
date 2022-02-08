<script lang="ts" setup>
import { isDark } from '@u/index'
useTitle('Chris\' Blog | Posts')
</script>

<template>
  <div>
    <div class="text-light-600" />
    <Switch v-model:value="isDark" size="medium" bg-color="#f1f1f1" bg-active-color="#2f2f2f">
      <template #dot>
        <div w-full h-full f-c class="bg-white dark:bg-[#1a1a1a]">
          <div v-if="!isDark" class="w-1em h-1em i-carbon:light-filled text-gray" />
          <div v-else class="i-akar-icons:moon-fill w-1em h-1em text-white" />
        </div>
      </template>
    </Switch>
  </div>
</template>
