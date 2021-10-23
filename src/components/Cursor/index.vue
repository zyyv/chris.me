<template>
    <div class="dot" ref="dotRef" :style="style.dot"></div>
    <div id="cursor" :style="style.cursor">
        <div class="circle" :style="style.circle"></div>
    </div>
</template>

<script lang="ts" setup>
import { ICursorStyle } from '@/types'
import { ref, reactive } from 'vue'
import { useCursor, useDot } from './index'

const style = reactive<ICursorStyle>({
    dot: {},
    cursor: {},
    circle: {}
})

useCursor(style)

const { dotRef } = useDot(style)
</script>
<style lang="scss" scoped>
#cursor {
    position: fixed;
    left: 0;
    top: 0;
    pointer-events: none;
    will-change: transform;
    z-index: 99999999;
}

.dot {
    mix-blend-mode: normal;
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    opacity: 0;
    position: fixed;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transition: opacity 0.3s ease-in-out,
        -webkit-transform 0.3s ease-in-out;
    transition: opacity 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out,
        -webkit-transform 0.3s ease-in-out;
}

.dot {
    z-index: 99999999;
    width: 9px;
    height: 9px;
    background-color: #adbac7;
    border: solid;
    border-radius: 50%;
    border-width: 0px;
    border-color: #000;
}
.circle {
    width: 64px;
    height: 64px;
    margin-top: -50%;
    margin-left: -50%;
    border-radius: 50%;
    border: solid 1px #adbac7;
    transition: opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1),
        background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
        border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
        width 0.3s cubic-bezier(0.25, 1, 0.5, 1),
        height 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
</style>
