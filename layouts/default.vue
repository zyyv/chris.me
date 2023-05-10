<template>
  <div>
    <NavHeader />
    <main px-7 pt-10 pb-18>
      <!-- <router-view v-slot="{ Component, route }">
        <transition
          enter-active-class="animate-fade-in animate-duration-500"
          leave-active-class="animate-fade-out animate-duration-500"
          mode="out-in"
        >
          <keep-alive>
            <component :is="Component" :key="route.name" />
          </keep-alive>
        </transition>
      </router-view> -->
      <slot />
    </main>
    <NavFooter />
    <Cursor />
    <!-- <Bg /> -->
  </div>
</template>
