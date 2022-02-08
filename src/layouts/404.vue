<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700">
    <router-view />
    <div>
      <button
        class="bg-gray-400 px-4 cursor-pointer border-none rounded-1 outline-none py-2 text-white-500 m-3 text-sm mt-8"
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>
