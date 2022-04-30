<script lang="ts" setup>
const routes = reactive([
  { icon: 'i-ri-article-line', path: '/posts' },
  // { icon: 'i-carbon-progress-bar-round', path: '/projects' },
  // { icon: 'i-carbon-bookmark', path: '/bookmark' },
  // { icon: 'i-carbon-notebook', path: '/notes' },
])

</script>

<template>
  <header
    fixed
    z-9999
    top-0
    inset-x-0
    trans
    backdrop-blur
    b="b-1 dashed gray-300 dark:b-gray-500"
  >
    <NuxtLink to="/">
      <img
        w-10
        h-10
        fixed
        left-8
        top-4
        src="/logo.svg"
        alt="logo"
      >
    </NuxtLink>
    <nav
      px-8
      w-full
      grid="~ cols-[auto_max-content]"
      box-border
      class="h-4.5rem"
    >
      <!-- 垫片 -->
      <div class="spacer" />
      <div grid gap-5 auto-flow-col items-center>
        <NuxtLink
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          op-50
          base
          hover="op-100 text-teal-600"
        >
          <div icon-btn :class="route.icon" />
        </NuxtLink>
        <div hidden lg:block f-c>
          <DrakToggle />
        </div>
        <!-- <a hidden lg:block>
          <div icon-link i-carbon:language @click="toggleLocales" />
        </a> -->
        <NuxtLink hidden lg:block to="https://space.bilibili.com/402454160">
          <div icon-link i-ri:bilibili-line />
        </NuxtLink>
        <NuxtLink hidden lg:block to="https://github.com/chris-zhu/chris.me">
          <div icon-link i-carbon:logo-github />
        </NuxtLink>
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
            trans
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
              <!-- <Switch
                v-model:value="isDark"
                size="small"
                bg-color="#f1f1f1"
                bg-active-color="#2f2f2f"
              >
                <template #dot>
                  <div w-full h-full f-c bg="white dark:#1a1a1a">
                    <div v-if="!isDark" w-1em h-1em i-carbon:light-filled text-gray />
                    <div v-else i-akar-icons:moon-fill w-1em h-1em text-white />
                  </div>
                </template>
              </Switch> -->
            </div>
            <div
              p-3
              f-c
              justify-start
            >
              <NuxtLink mr-3 to="https://space.bilibili.com/402454160">
                <div icon-link i-ri:bilibili-line />
              </NuxtLink>
              <NuxtLink mr-3 to="https://github.com/chris-zhu/chris.me">
                <div icon-link i-carbon:logo-github />
              </NuxtLink>
            </div>
            <div />
          </div>
        </div>
      </div>
    </nav>
  </header>
  <!-- For header fixed -->
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
