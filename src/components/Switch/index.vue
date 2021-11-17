<script lang="ts" setup>
import { useSize } from '.'

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium' | 'large'
    value?: string | number | boolean
    loading?: boolean
    defaultValue?: string | number | boolean
    disabled?: boolean
    bgColor?: string
    bgActiveColor?: string
  }>(),
  {
    size: 'medium',
    defaultValue: false,
    disabled: false,
    bgColor: 'rgba(0, 0, 0, 0.14)',
    bgActiveColor: '#60bc95',
  }
)

const emits = defineEmits<{
  (event: 'change', status: boolean): void
  (event: 'update:value', status: boolean): void
}>()

const { _width, _height } = useSize(props.size) // 容器组件的宽高
const _bgColor = computed(() => props.bgColor)
const _bgActiveColor = computed(() => props.bgActiveColor)

const handleClick = () => {
  if (!props.disabled) {
    emits('update:value', !props.value)
    emits('change', !props.value)
  }
}
</script>

<template>
  <div
    class="switch border-$default"
    :class="[disabled && 'op-50', value && 'active']"
    rounded-full
    overflow-hidden
    border
    relative
    @click="handleClick"
  >
    <div absolute rounded-full class="switch__button bg-[#fff]"></div>
  </div>
</template>


<style lang="scss" scoped>
$dotWidth: calc(v-bind(_height) - 4px);
$dotHeight: calc(v-bind(_height) - 4px);

.switch {
  margin: 100px 0 0 100px;

  width: v-bind(_width);
  height: v-bind(_height);
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: v-bind(_bgColor);

  &:focus {
    box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
  }

  &.active {
    background-color: v-bind(_bgActiveColor);
    .switch__button {
      left: calc(100% - $dotWidth - 1px);
    }
  }

  &__button {
    left: 1px;
    top: 1px;
    width: $dotWidth;
    height: $dotHeight;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
