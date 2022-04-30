<script lang="ts" setup>
import { initSize } from '.'
import type { SwitchEvents, SwitchProps } from '.'

const props = withDefaults(defineProps<SwitchProps>(), {})
const emits = defineEmits<SwitchEvents>()

const status = useVModel(props, 'value', emits)
const [w, h] = initSize(props.size, props.width, props.height)

const handleClick = () => {
  if (!props.disabled) {
    status.value = !status.value
    // eslint-disable-next-line vue/require-explicit-emits
    emits('change', status.value)
  }
}
</script>
<!-- <script lang="ts">
export default {
  name: 'Switch',
}
</script> -->

<template>
  <div
    :class="['switch', w, h, disabled && 'op-50', status && 'active']"
    rounded-full
    overflow-hidden
    bg="black op-14"
    b="~ c-red"
    pr
    shadow-switch
    @click="handleClick"
  >
    <div pa rounded-full overflow-hidden class="switch__button">
      <slot name="dot">
        <div w-full h-full bg-white />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.switch {
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
  box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
  }

  &.active {
    .switch__button {
      left: calc(100% - $dotWidth - 1px);
    }
  }

  &__button {
    left: 1px;
    top: 1px;
    // width: $dotWidth;
    // height: $dotHeight;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
