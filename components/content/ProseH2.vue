<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h2 :id="id" text-2xl class="group">
    {{ id }}
    <a header-anchor no-underline :href="`#${id}`">
      #
    </a>
  </h2>
</template>
