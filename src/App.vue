<template>
  <n-config-provider :theme-overrides="global">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts" setup>
import { NMessageProvider, NConfigProvider } from 'naive-ui'
import global from '@/styles/global.json'
</script>
