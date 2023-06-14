<script lang="ts" setup>
const routes = reactive<{ icon?: string; path: string; text?: string }[]>([
  // { icon: 'i-carbon-blog', path: '/posts', text: 'Blog' },
  { icon: 'i-carbon-blog', path: '/posts' },
  { icon: 'i-carbon-delivery-parcel', path: '/projects' },
  // { icon: 'i-carbon:bookmark', path: '/bookmark' },
  // { icon: 'i-carbon-notebook', path: '/notes' },
])

const route = useRoute()
const inHome = computed(() => route.path === '/')
</script>

<template>
  <header
    fixed
    z-9999
    top-0
    inset-x-0
    trans
    backdrop-blur
    fcc
    px-8
  >
    <nav w-full :class="inHome ? 'fcc' : 'fbc'">
      <div v-if="!inHome" class="transitionLogo">
        <NuxtLink to="/" title="Home">
          <img v-show="isDark" h-6 src="/logo-light.svg" alt="logo">
          <img v-show="!isDark" h-6 src="/logo.svg" alt="logo">
        </NuxtLink>
      </div>

      <div
        class="transBlock"
        grid="~ gap-5"
        auto-flow-col
        items-center
        h-16
        md:h-18
      >
        <NuxtLink to="/test">
          <div icon-link i-carbon:language />
        </NuxtLink>
        <NuxtLink
          v-for="_route in routes"
          :key="_route.path"
          :to="_route.path"
          :title="_route.path.slice(1, 2).toUpperCase() + _route.path.slice(2).toLowerCase()"
        >
          <span v-if="_route.text" icon-text>{{ _route.text }}</span>
          <div v-else icon-btn :class="_route.icon" />
        </NuxtLink>

        <!-- <a hidden lg:block>
          <div icon-link i-carbon:language @click="toggleLocales" />
        </a> -->
        <!-- <a
          title="Bilibili"
          hidden
          lg:block
          href="https://space.bilibili.com/402454160"
          target="_blank"
          icon-link
          i-ri:bilibili-line
        /> -->
        <a
          title="Twitter"
          hidden
          lg:block
          href="https://twitter.com/chris_zyyv"
          target="_blank"
          icon-link
          i-ri:twitter-line
        />
        <a title="Github" href="https://github.com/zyyv" target="_blank" icon-link i-ri-github-line />
        <div fcc>
          <DrakToggle />
        </div>
        <!-- <div
          pr
          w-6
          h-full
          lg:hidden
          fcc
          class="group"
        >
          <div
            pa
            right-0
            trans
            w-45
            b="1 gray2 dark:gray2"
            bg="white dark:gray9"
            rounded-md
            class="-bottom-full"
            group-hover="op100 translate-y-8px visible"
            invisible
            translate-y-2px
            transition-300
            op-0
          >
            <div
              p-3
              fb
              b="0 b-1 gray2 dark:gray6"
            >
              <span text="size-2 text-text dark:text-text-dark">外貌</span>
            </div>
            <div
              p-3
              fsc
              flex
              gap-3
            >
              <NuxtLink to="https://space.bilibili.com/402454160">
                <div icon-link i-ri:bilibili-line />
              </NuxtLink>
              <NuxtLink to="https://github.com/zyyv/chris.me">
                <div icon-link i-carbon:logo-github />
              </NuxtLink>
            </div>
            <div />
          </div>
        </div> -->
      </div>
    </nav>
  </header>
  <!-- For header fixed -->
  <div h-16 md:h-18 />
</template>

<style scoped>
.transitionLogo {
  view-transition-name: logo;
}

.transBlock {
  view-transition-name: nav-menu;
}

/* .aaa{
  view-transition-name: selected-film
} */
</style>
