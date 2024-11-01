<script lang="ts" setup>

</script>

<template>
  <div ma>
    <Buttonhover mb10 />

    <div class="button">
      <div class="svg-group">
        <div class="svg-wrapper">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-dtzj9" width="142" height="60" viewBox="0 0 142 60">
            <rect
              x="1.5" y="1.5" stroke-width="3" stroke-linecap="round" stroke="white" width="139" height="57"
              rx="8"
              style="stroke-dashoffset: 22.5664; stroke-dasharray: 32.5664, 345.375;"
            />
            <rect
              x="1.5" y="1.5" stroke-width="3" stroke-linecap="round" stroke="white" width="139" height="57" rx="8"
              style="stroke-dashoffset: -166.404; stroke-dasharray: 32.5664, 345.375;"
            />
            <rect
              x="1.5" y="1.5" stroke-width="1" stroke-linecap="round" stroke="rgba(255, 255, 255, 0.3)" width="139" height="57" rx="8"
              style="stroke-dashoffset: -20; stroke-dasharray: 136.404, 241.537;"
            />
            <rect
              x="1.5" y="1.5" stroke-width="1" stroke-linecap="round" stroke="rgba(255, 255, 255, 0.3)" width="139" height="57" rx="8"
              style="stroke-dasharray: 136.404, 241.537; stroke-dashoffset: 546.912;"
            />
          </svg>
        </div>
      </div>
      <span class="btn-text">
        Sign Up
      </span>
    </div>
    <svg width="200" height="200">
      <circle
        cx="100" cy="100" r="80" stroke="white" stroke-width="5" fill="none"
        stroke-dasharray="20, 40" stroke-dashoffset="20"
      />
    </svg>
    <svg class="aasd" width="55" height="55" view-box="0 0 55 55">
      <rect
        class="testRect"
        x="1.5" y="1.5" fill="transparent" stroke-width="3" stroke-linecap="round" stroke="white" width="52" height="52" rx="0"
      />
      <rect
        class="testRect2"
        x="1.5" y="1.5" fill="transparent" stroke-width="3" stroke-linecap="round" stroke="white" width="52" height="52" rx="0"
      />
      <rect
        class="testRect3"
        x="1.5" y="1.5" fill="transparent" stroke-width="1" stroke-linecap="round" stroke="rgba(255, 255, 255, 0.3)" width="52" height="52" rx="0"
      />
      <rect
        class="testRect4"
        x="1.5" y="1.5" fill="transparent" stroke-width="1" stroke-linecap="round" stroke="rgba(255, 255, 255, 0.3)" width="52" height="52" rx="0"
      />
    </svg>
  </div>
</template>

<style scoped>
.testRect, .testRect2, .testRect3, .testRect4 {
  transition: stroke-dasharray 0.3s, stroke-dashoffset 0.3s;
}
.aasd{
  cursor: pointer;
}

.testRect{
  /* 12 虚线宽度 196 间隙宽度 */
  /* 12 + 196 === 52 * 4 （周长）*/
  stroke-dasharray: 12, 196;
  /* 左上角 */
  /* -(12 / 2) */
  stroke-dashoffset: 6;
}
.aasd:hover .testRect{
  /* 上边长中间 */
  /* -(52/2 -6) */
  stroke-dashoffset: calc(calc(calc(52 / 2) - 6) * -1) !important;
}

.testRect3 {
  stroke-dasharray: 72, 208;
  stroke-dashoffset: -16;
}
.aasd:hover .testRect3 {
  stroke-dashoffset: calc(calc(calc(calc(52 / 2) - 6) * -1) - 10 - 12) !important;
}

.testRect2{
  stroke-dasharray: 12, 196;
  /* 右下角 */
  /* -(52 + 52 - 12 + (12 / 2)) */
  stroke-dashoffset: -98;
}
.aasd:hover .testRect2{
  /* 下边长中间 */
  /* -(52*2 + 52/2 - 6)  */
  stroke-dashoffset: calc(calc(calc(52 * 2) + calc(52 / 2) - 6) * -1) !important;
}

.testRect4 {
  stroke-dasharray: 72, 208;
  /* 72 + (12/2) + 10(gap) + 72 */
  stroke-dashoffset: 160;
}
.aasd:hover .testRect4 {
  /*  hover时候：开头要留 10px 的线 */
  stroke-dasharray: 72, 136;
  /* 72 - 10px */
  stroke-dashoffset: 62 !important;
}

.button{
  background-color: rgba(255, 255, 255, 0.2);
  width: 120px;
  text-align: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  padding: 10px 15px;
  border-radius: 3px;
  transition: background-color 0.3s;

  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
}

.btn-text{
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
}

.svg-group{
  position: absolute;
  top: -11px;
  right: -11px;
  bottom: -11px;
  left: -11px;
}
</style>
