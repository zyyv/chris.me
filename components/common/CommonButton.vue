<script lang='ts' setup>

</script>

<template>
  <button
    class="btnn"
    pr z-1
    b="~ white/10" rd-full
    p="x-6 y-2"
    text="sm" fw-500 lh-6
    un-after="content-none rd-full op-0
      h-[calc(100%+4px)] w-[calc(100%+4px)]
      pa left--2px top--2px
      transition-all duration-1000
      bg-gradient-radial
      from-white/24 to-transparent
    "
    hover-after-op-50
  >
    <div inline-block gradientText bg-gradient-to-tr from-purple-400 to-red-500>
      Try Demo
    </div>
  </button>
</template>

<style scoped>
.btnn {
  background: radial-gradient(107.5% 107.5% at 50% 215%, rgba(255, 255, 255, .24) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .04);
}
</style>
