<template>
  <p>111</p>
  <div class="switch">
    <div class="switch__rail">
      <div class="switch__button">
        <!-- update something -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useSize } from '.'

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium' | 'large'
    value?: string | number | boolean
    loading?: boolean
    defaultValue?: string | number | boolean
    disabled?: boolean
  }>(),
  {
    size: 'medium',
    defaultValue: false,
    disabled: undefined
  }
)

const { _width, _height } = useSize(props.size)
</script>
<style lang="scss" scoped>
.switch {
  margin: 100px 0 0 500px;

  width: v-bind(_width);
  height: v-bind(_height);
  border-radius: 40px;
  border: 1px solid var(--default);

  &__rail {
    // overflow: hidden;
    // height: var(--rail-height);
    // min-width: var(--rail-width);
    // border-radius: var(--rail-border-radius);
    // cursor: pointer;
    // position: relative;
    // transition: background-color 0.3s var(--bezier),
    //   box-shadow 0.3s var(--bezier);
    // background-color: var(--rail-color);
  }
  &__button {
  }
}
</style>
