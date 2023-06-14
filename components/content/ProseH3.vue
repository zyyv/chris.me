<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h3 :id="id" text-xl class="group">
    <!-- {{ id.charAt(0).toUpperCase() + id.slice(1) }} -->
    {{ id }}
    <a header-anchor no-underline :href="`#${id}`">
      #
    </a>
  </h3>
</template>
