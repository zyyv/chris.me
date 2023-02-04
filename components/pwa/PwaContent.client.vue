<script lang="ts" setup>
const pwa = useNuxtApp().$pwa
</script>

<template>
  <ClientOnly>
    <div
      v-if="pwa?.offlineReady || pwa?.needRefresh"
      fixed
      bottom-40
      right-4
      p="x-3 y-2"
      backdrop-blur-lg
      b="~ black op-10"
      dark-b="white op-10"
      rd-md
      role="alert"
      class="[&>button]-(text-xs lg-text-sm)"
      children-trans
    >
      <div mb-2 text="~ sm" lg-text-base>
        <span v-if="pwa.offlineReady">
          App 离线可用
        </span>
        <span v-else>
          有新内容可用，请刷新
        </span>
      </div>
      <button v-if="pwa.needRefresh" lg-badge-lg-red badge-sm-red mr-3 @click="pwa.updateServiceWorker()">
        更新
      </button>
      <button lg-badge-lg-yellow badge-sm-yellow @click="pwa.cancelPrompt()">
        忽略
      </button>
    </div>
    <div
      v-if="pwa?.showInstallPrompt && !pwa?.needRefresh"
      fixed
      bottom-10
      right-4
      p="x-3 y-2"
      backdrop-blur-lg
      b="~ black op-10"
      dark-b="white op-10"
      rd-md
      role="alert"
      class="[&>button]-(text-xs lg-text-sm)"
      children-trans
    >
      <div mb-2 text="~ sm" lg-text-base>
        <span>
          安装 PWA
        </span>
      </div>
      <button lg-badge-lg-teal badge-sm-teal mr-3 @click="pwa.install()">
        安装
      </button>
      <button lg-badge-lg-yellow badge-lg-yellow @click="pwa.cancelInstall()">
        取消
      </button>
    </div>
  </ClientOnly>
</template>
