<script lang='ts' setup>
const emits = defineEmits<{
  (e: 'click'): void
}>()

const handleClick = () => {
  emits('click')
}
</script>

<template>
  <button w-6 h-6 clearBtn @click="handleClick">
    <div
      hidden
      md:block
      lg:hidden
      text-6
      icon-link
      class="i-carbon:overflow-menu-horizontal"
    />
    <span
      md:hidden
      class="con"
      block
      w-full
      h-full
      overflow-hidden
      pr
    >
      <span menu-icon-line top-4px translate-x-7px />
      <span menu-icon-line top-11px translate-x-14px />
      <span menu-icon-line top-18px translate-x-10px />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.con{
    &:hover{
        span{
            opacity: 1;
            &:nth-child(1){
                transform: translateX(10px);
            }
            &:nth-child(2){
                transform: translateX(7px);
            }
            &:nth-child(3){
                transform: translateX(14px);
            }
        }
    }
}
.dark{
   .con{
    &:hover{
        span{
            background-color: #d9dfe9;
        }
    }
}
}
</style>
