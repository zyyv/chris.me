<template>
  <n-config-provider :theme-overrides="global" :theme="darkTheme">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts" setup>
import { NMessageProvider, NConfigProvider, darkTheme } from 'naive-ui'
import global from '@/styles/global.json'
</script>
