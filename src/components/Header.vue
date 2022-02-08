<script lang="ts" setup>
import { isDark } from '@u/index'
const { availableLocales, locale } = useI18n()
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const routes = reactive([
  { icon: 'i-ri:article-line', path: '/posts' },
  { icon: 'i-carbon:progress-bar-round', path: '/projects' },
  { icon: 'i-carbon:camera-action', path: '/photoes' }
])
</script>

<template>
  <header w-full>
    <Navlink to="/">
      <img
        w-10
        h-10
        fixed
        left-6
        top-6
        :src="Logo"
        alt="logo"
      >
    </Navlink>
    <nav p-8 w-full grid box-border class="grid-cols-[auto_max-content]">
      <div class="spacer" />
      <div grid gap-5 auto-flow-col>
        <Navlink
          v-for="route in routes"
          :key="route.path"
          inactive-class="op-50 text-gray-700"
          active-class="op-100 text-teal-600"
          hover="op-100 text-teal-600"
          :to="route.path"
        >
          <div icon-btn :class="route.icon" />
        </Navlink>
        <div f-c>
          <Switch
            v-model:value="isDark"
            size="small"
            bg-color="#f1f1f1"
            bg-active-color="#2f2f2f"
            width="36px"
            height="21px"
          >
            <template #dot>
              <div w-full h-full f-c class="bg-white dark:bg-[#1a1a1a]">
                <div v-if="!isDark" class="w-1em h-1em i-carbon:light-filled text-gray" />
                <div v-else class="i-akar-icons:moon-fill w-1em h-1em text-white" />
              </div>
            </template>
          </Switch>
        </div>
        <a>
          <div icon-link i-carbon:language @click="toggleLocales" />
        </a>
        <Navlink to="https://space.bilibili.com/402454160">
          <div icon-link i-ri:bilibili-line />
        </Navlink>
        <Navlink to="https://github.com/chris-zhu">
          <div icon-link i-carbon:logo-github />
        </Navlink>
      </div>
    </nav>
  </header>
</template>
