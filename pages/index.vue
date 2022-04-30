<script lang="ts" setup>
const val = ref(true)

</script>

<template>
  <NuxtLayout>
    <div>
      11
      <div b p-4>
        <Switch v-model="val" />
      </div>
      <!-- <Wave /> -->
    </div>
  </NuxtLayout>
</template>
