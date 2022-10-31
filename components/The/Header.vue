<script lang="ts" setup>
const routes = reactive([
  { icon: 'i-carbon-blog', path: '/posts' },
  // { icon: 'i-carbon-delivery-parcel', path: '/projects' },
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
    <NuxtLink to="/" title="Home">
      <img
        v-show="isDark"
        h-6
        fixed
        left-8
        top-6
        src="/logo-light.svg"
        alt="logo"
      >
      <img
        v-show="!isDark"
        h-6
        fixed
        left-8
        top-6
        src="/logo.svg"
        alt="logo"
      >
    </NuxtLink>
    <nav
      px-8
      w-full
      grid="~ cols-[auto_max-content]"
      box-border
      class="h-18"
    >
      <!-- 垫片 -->
      <div class="spacer" />
      <div grid gap-5 auto-flow-col items-center>
        <NuxtLink
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          :title="route.path.slice(1, 2).toUpperCase() + route.path.slice(2).toLowerCase()"
        >
          <div icon-btn :class="route.icon" />
        </NuxtLink>
        <div fcc>
          <DrakToggle />
        </div>
        <!-- <a hidden lg:block>
          <div icon-link i-carbon:language @click="toggleLocales" />
        </a> -->
        <a
          title="Bilibili"
          hidden
          lg:block
          href="https://space.bilibili.com/402454160"
          target="_blank"
          icon-link
          i-ri:bilibili-line
        />
        <a
          title="Github"
          href="https://github.com/zyyv"
          target="_blank"
          icon-link
          i-ri-github-line
        />
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
  <div class="h-18" />
</template>
