<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { data } = await useFetch('/api/pageview')

const time = useTimeAgo(computed(() => data.value.startAt))

const { availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const flag = ref(false)
</script>

<template>
  <div text-gray:80>
    <span font-500 text-gray>{{ data.pageview }}</span>
    page views since
    {{ $t('button.about') }}
    <span text-gray>{{ time }}</span>
    <button b @click="toggleLocales">
      change language
    </button>
    <Switch v-model:value="flag" />
  </div>
</template>
