<template>
  <transition name="el-fade-in-linear">
    <el-tooltip class="item" effect="dark" :content="tips" placement="top">
      <div
        @click="handleClick"
        class="backTop"
        :style="{right: `${right}px`, bottom: `${bottom}px`}"
      >
        <i class="el-icon-caret-top"></i>
      </div>
    </el-tooltip>
  </transition>
</template>

<script>
export default {
  name: 'backtop',
  props: {
    right: {
      type: Number, default: 40
    },
    tips: {
      type: String, default: '又回到最初的起点~~'
    },
    bottom: {
      type: Number, default: 40
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang='scss' scoped>
.backTop {
  position: fixed;
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  z-index: 5;
  &:hover {
    background-color: #f2f6fc;
  }
}
</style>
