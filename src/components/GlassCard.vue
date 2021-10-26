<template>
  <div class="Glassmorphism relative">
    <div class="circle absolute top-0 left-0"></div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { addUnit } from '@/utils'
const props = withDefaults(
  defineProps<{
    width?: string | number
    height?: string | number
    radius?: string | number
  }>(),
  {
    width: '100%',
    height: '100%',
    radius: 12
  }
)
const c_width = computed(() => addUnit(props.width))
const c_height = computed(() => addUnit(props.height))
const c_radius = computed(() => addUnit(props.radius))
</script>

<style lang="scss" scoped>
$circlePath: calc(v-bind(c_radius) * 2);
$radius: v-bind(c_radius);
.Glassmorphism {
  width: v-bind(c_width);
  height: v-bind(c_height);
  border-radius: $radius;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(6px);
  box-shadow: 0.8rem 0.8rem 1.3rem 0 rgba(0, 0, 0, 0.15);
  > .circle {
    width: $circlePath;
    height: $circlePath;
    border-radius: 50%;
    border: 1px solid #fff;
    clip: rect(0, $radius, $radius, 0);
    z-index: -1;
  }
  &::before,
  &::after {
    position: absolute;
    content: '';
    display: block;
    z-index: 2;
    border-radius: $radius;
  }
  &::before {
    width: calc(100% - v-bind(c_radius) * 2);
    height: 1px;
    top: 0;
    left: $radius;
    background: linear-gradient(to right, #fff, transparent);
  }
  &::after {
    width: 1px;
    height: calc(100% - v-bind(c_radius) * 2);
    top: $radius;
    left: 0;
    background: linear-gradient(to bottom, #fff, transparent);
  }
}
</style>
