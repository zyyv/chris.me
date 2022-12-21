<script lang="ts" setup>
const routes = reactive<{ icon?: string, path: string, text?: string }[]>([
  // { icon: 'i-carbon-blog', path: '/posts', text: 'Blog' },
  { icon: 'i-carbon-blog', path: '/posts' },
  // { icon: 'i-carbon-delivery-parcel', path: '/projects' },
  { icon: 'i-ri:bookmark-3-line', path: '/bookmark' },
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
    b="b-0 dashed gray-300 dark:b-gray-500"
    fbc
    px-8
  >
    <NuxtLink to="/" title="Home">
      <img v-show="isDark" h-6 src="/logo-light.svg" alt="logo">
      <img v-show="!isDark" h-6 src="/logo.svg" alt="logo">
    </NuxtLink>
    <nav w-full grid="~ cols-[auto_max-content]" h-16 md:h-18>
      <!-- 垫片 -->
      <div />
      <div grid gap-5 auto-flow-col items-center>
        <NuxtLink
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          :title="route.path.slice(1, 2).toUpperCase() + route.path.slice(2).toLowerCase()"
        >
          <span v-if="route.text" icon-text>{{ route.text }}</span>
          <div v-else icon-btn :class="route.icon" />
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
          href="https://twitter.com/_Chris_zhu"
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
