<template>
  <main class="container m-auto">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <keep-alive :include="['home']">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </main>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
