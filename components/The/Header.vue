<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { isDark } from '~~/composables/dark'
import { toggleLocales } from '~~/composables/i18n'

const routes = reactive([
  { icon: 'i-ri:article-line', path: '/posts' },
  { icon: 'i-carbon:progress-bar-round', path: '/projects' },
  { icon: 'i-carbon:camera-action', path: '/photoes' },
])

// i18n
// const { availableLocales, locale } = useI18n()
// const toggleLocales = () => {
//   const locales = availableLocales
//   locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
// }
</script>

<template>
  <header
    fixed
    z-99
    top-0
    inset-x-0
    toDark
    backdrop-blur
    border="0 b-1 dashed gray-300 dark:b-gray-700"
  >
    <NavLink to="/">
      <img
        w-10
        h-10
        fixed
        left-6
        top-4
        src="/logo.svg"
        alt="logo"
      >
    </NavLink>
    <nav
      px-8
      w-full
      grid
      box-border
      class="grid-cols-[auto_max-content] h-4.5rem"
    >
      <div class="spacer" />
      <div grid gap-5 auto-flow-col items-center>
        <NavLink
          v-for="route in routes"
          :key="route.path"
          inactive-class="op-50 text-gray-700"
          active-class="op-100 text-teal-600"
          hover="op-100 text-teal-600"
          :to="route.path"
        >
          <div icon-btn :class="route.icon" />
        </NavLink>
        <div hidden lg:block f-c>
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
        <a hidden lg:block>
          <div icon-link i-carbon:language @click="toggleLocales" />
        </a>
        <NavLink hidden lg:block to="https://space.bilibili.com/402454160">
          <div icon-link i-ri:bilibili-line />
        </NavLink>
        <NavLink hidden lg:block to="https://github.com/chris-zhu/chris.me">
          <div icon-link i-carbon:logo-github />
        </NavLink>
        <div
          pr
          w-6
          h-full
          lg:hidden
          f-c
          class="menus"
        >
          <!-- <BMenuIcon /> -->
          <div
            pa
            right-0
            toDark
            w-45
            b="1 gray-200 dark:gray-600"
            bg="white dark:gray-900"
            rounded-md
            class="-bottom-full menuItem"
            invisible
            translate-y-2px
            transition-300
            op-0
          >
            <div
              p-3
              f-c
              justify-between
              b="0 b-1 gray-200 dark:gray-600"
            >
              <span text="12px $text-black dark:$text-black-dark">外貌</span>
              <Switch
                v-model:value="isDark"
                size="small"
                bg-color="#f1f1f1"
                bg-active-color="#2f2f2f"
              >
                <template #dot>
                  <div w-full h-full f-c class="bg-white dark:bg-[#1a1a1a]">
                    <div v-if="!isDark" class="w-1em h-1em i-carbon:light-filled text-gray" />
                    <div v-else class="i-akar-icons:moon-fill w-1em h-1em text-white" />
                  </div>
                </template>
              </Switch>
            </div>
            <div
              p-3
              f-c
              justify-start
            >
              <a mr-3>
                <div icon-link i-carbon:language @click="toggleLocales" />
              </a>
              <NavLink mr-3 to="https://space.bilibili.com/402454160">
                <div icon-link i-ri:bilibili-line />
              </NavLink>
              <NavLink mr-3 to="https://github.com/chris-zhu/chris.me">
                <div icon-link i-carbon:logo-github />
              </NavLink>
            </div>
            <div />
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="h-4.5rem" />
</template>

<style lang="scss" scoped>
.menus{
  &:hover{
    .menuItem{
      opacity: 1;
      transform: translateY(8px);
      visibility: visible;
    }
  }
}
</style>
