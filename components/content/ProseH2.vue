<template>
  <h2 :id="id" pr class="group">
    {{ id }}
    <a header-anchor no-underline :href="`#${id}`">
      #
    </a>
  </h2>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>
