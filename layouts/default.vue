<template>
  <div>
    <TheHeader />
    <main px-7 py-10>
      <slot />
      <!-- <NuxtPage /> -->
    </main>
    <TheFooter />
    <Cursor />
  </div>
</template>
