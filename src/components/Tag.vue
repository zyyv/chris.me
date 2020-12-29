<template>
  <div class="inline-block fs0">
    <div @click="handleClick" class="tag" :style="{ '--color': color }">
      <div class="content ellipsis cfff noselect">{{ tag.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: ['tag'],
  data () {
    return {
      color: '',
      colors: [
        '#ab0921',
        '#cb0e34',
        '#ff4366',
        '#f1d186',
        '#d1e7f4',
        '#2f3336',
        '#363f3a',
        '#4e584f',
        '#899c88',
        '#f7737a',
        '#678db4',
        '#7ea0e0',
        '#c26881',
        '#54697c',
        '#4e7765',
        '#779885',
        '#a8c99c',
        '#e6e5d1',
        '#3f3b3a',
        '#7e6568',
        '#a86d67',
        '#e4ac79',
        '#b3a66f',
        '#414e70',
        '#7180b9',
        '#a0afea',
        '#f1cc85',
        '#f4e2be'
      ]
    }
  },
  created () {
    let random = Math.floor(Math.random() * this.colors.length)
    this.color = this.colors[random]
  },
  methods: {
    handleClick () {
      this.$emit('click', this.tag)
    }
  }
}
</script>
<style lang="scss" scoped>
.tag {
  position: relative;
  cursor: pointer;
  display: inline-block;
  height: 18px;
  background-color: var(--color);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  &::before {
    position: absolute;
    content: '';
    display: block;
    left: -18px;
    width: 0;
    height: 0;
    border-width: 9px;
    border-style: solid;
    border-color: transparent var(--color) transparent transparent;
  }
  &::after {
    display: block;
    position: absolute;
    content: '';
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    left: 2.5px;
    top: 50%;
    transform: translateY(-50%);
  }
  .content {
    padding: 0 5px 0 10px;
    line-height: 18px;
    font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New',
      monospace;
    max-width: 120px;
    font-size: 12px;
    padding: 0 5px 0 10px;
  }
}
</style>
