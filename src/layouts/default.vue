<template>
  <Bg />
  <Cursor />
  <Header />
  <main px-7 py-10>
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <keep-alive include="Home">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
    </router-view>
  </main>
</template>
