<script lang="ts" setup>
interface Menu {
  icon?: string
  path: string
  text?: string
}

const routes = reactive<Menu[]>([
  { path: '/posts', icon: 'i-custom-post' },
  { path: '/projects', icon: 'i-custom-package' },
  // { path: '/talks', icon: 'i-custom-ppt' },
  // { path: '/images', icon: 'i-ri-image-line' },
])

const route = useRoute()
const inHome = computed(() => route.path === '/')
</script>

<template>
  <header sticky z-999 top-0 trans backdrop-blur fcc px-6>
    <nav w-full :class="inHome ? 'fcc' : 'fbc'">
      <div v-show="!inHome">
        <NuxtLink to="/" title="Home">
          <UserAvatar />
        </NuxtLink>
      </div>

      <div view-transition-nav-menu grid="~ gap-5" auto-flow-col items-center h-16 md:h-18>
        <NuxtLink
          v-for="_route in routes" :key="_route.path" :to="_route.path"
          :title="_route.path.slice(1, 2).toUpperCase() + _route.path.slice(2).toLowerCase()"
        >
          <span v-if="_route.text" icon-text>{{ _route.text }}</span>
          <i v-if="_route.icon" icon-btn :class="_route.icon" />
        </NuxtLink>
        <a title="Github" href="https://github.com/zyyv" target="_blank" icon-link i-custom:github />
        <DrakToggle />
      </div>
    </nav>
  </header>
</template>
