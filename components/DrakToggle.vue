<script setup lang="ts">
const dark = computed({
  get() { return isDark.value },
  set(val:boolean) {
    isDark.value = val
  },
})
</script>

<template>
  <Switch
    v-model:value="isDark"
    size="small"
  >
    <!-- <template #dot>
      <div w-full h-full f-c class="bg-white dark:bg-[#1a1a1a]">
        <div v-if="dark" i-akar-icons:moon-fill text-white />
        <div v-else i-carbon:light-filled text-gray />
      </div>
    </template> -->
  </Switch>
</template>
