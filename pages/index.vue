<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div font-craft text="#6f6f6f" p-2>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
    <div>
      <button class="btn">
        <span>Try Demo</span>
      </button>

      <CommonButton />
    </div>
    <!-- <div mt-2 class="glowing-box-input">
          <input type="text" placeholder="Enter your domain">
        </div> -->

    <div mt-2 style="--animation-speed:2s;" class="try-demo-input glowing-box glowing-box-active " q:key="C9_2">
      <div class="glowing-box-borders-masker">
        <div class="glowing-box-borders" />
      </div>
      <div class="glowing-box-input" q:key="hu_0">
        <input placeholder="Enter your domain">
      </div>
    </div>

    <CommonInput mt2 />
  </div>
</template>

<style scoped>
.try-demo-input {
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background-color: #ffffff0a;
}

.glowing-box {
  isolation: isolate;
  overflow: hidden;
  border-radius: 999px;
  display: inline-block;
  position: relative;
}

.glowing-box-active .glowing-box-animations,
.glowing-box-active .glowing-box-borders-masker {
  opacity: 1;
}

.glowing-box-borders-masker {
  border-radius: 999px;
  content: "";
  height: 100%;
  inset: 0;
  left: 0;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  padding: 1px;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: 1s ease opacity;
  width: 100%;
}

@keyframes borderTurnWithTranslate {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.glowing-box-borders {
  animation-name: borderTurnWithTranslate;
}

input {
  background-color: transparent;
  border: 1px solid transparent;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  outline: none;
}

.glowing-box-borders,
.glowing-box-glow,
.glowing-box-stars {
  animation: borderTurnWithTranslate var(--animation-speed) infinite linear;
  background-image: conic-gradient(from 0 at 50% 50%, rgba(255, 255, 255, .5) 0deg, rgba(255, 255, 255, 0) 60deg, rgba(255, 255, 255, 0) 310deg, rgba(255, 255, 255, .5) 360deg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.glowing-box-animations:before,
.glowing-box-borders:before {
  content: "";
  float: left;
  padding-top: 100%;
}

.glowing-box-animations:after,
.glowing-box-borders:after {
  clear: both;
  content: "";
  display: block;
}

.glowing-box-animations,
.glowing-box-borders {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.btn {
  background: radial-gradient(107.5% 107.5% at 50% 215%, rgba(255, 255, 255, .24) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .04);
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  cursor: pointer;
  padding: 7px 24px;
  position: relative;
  z-index: 1;

  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}

.btn span {
  background: linear-gradient(180deg, rgba(255, 255, 255, .3) 8.85%, #FFFFFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  display: block;
}

.btn::after {
  background: radial-gradient(85% 120% at 50% 120%, rgba(255, 255, 255, .24) 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 999px;
  content: "";
  height: calc(100% + 4px);
  left: -2px;
  opacity: 0;
  position: absolute;
  top: -2px;
  transition: 1s all;
  width: calc(100% + 4px);
}

.btn:hover::after {
  opacity: .7;
}

.glowing-box-input {
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  position: relative;
  z-index: 1;
}

.glowing-box-input {
  font-feature-settings: "cv06" on, "calt" off, "liga" off;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -.01em;
  line-height: 24px;
}

.glowing-box-input input {
  color: #fff;
  padding: 14px 20px;
  position: relative;
  z-index: 1;
}

.try-demo-input input {
  max-width: 352px;
  padding-right: 130px !important;
  width: 100%;
}
</style>
