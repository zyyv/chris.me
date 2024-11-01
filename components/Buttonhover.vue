<script lang="ts" setup>

</script>

<template>
  <div>
    <button>
      <span class="dot top" />
      <span>Hover me</span>
      <span class="dot bottom" />
    </button>
  </div>
</template>

<style scoped>
  button{
    padding: 8px 10px;
    position: relative;
    background-color: transparent;
    --diff: -1px;
    /* border: 1px solid; */
  }

  .top::before,
  .bottom::before,
  .top::after,
  .bottom::after{
    position: absolute;
    border: 1px solid #fff;
    display: block;
    width: 8px;
    height: 8px;
    content: "";
    transition: all 0.3s;
  }

  .top::before {
    top: var(--diff);
    left: var(--diff);
    border-bottom: none;
    border-right: none;

  }
  .top::after{
    top: var(--diff);
    right: var(--diff);
    border-bottom: none;
    border-left: none;
  }
  .bottom::before{
    bottom: var(--diff);
    left: var(--diff);
    border-top: none;
    border-right: none;
  }
  .bottom::after{
    bottom: var(--diff);
    right: var(--diff);
    border-top: none;
    border-left: none;
  }

  button:hover {
    --diff: 2px;
  }
</style>
