<template>
  <div class="w-3/5 m-auto">
    <!-- <img class="w-60 h-60" alt="Vue logo" src="@/assets/logo.svg" /> -->
    {{ store.info.name }}
    <div v-typeWrite style="height: 300px">{{ str }}</div>
    <div v-typeWrite style="height: 300px">{{ str2 }}</div>

    <pre v-typeWrite style="height: 300px;white-space: pre-wrap;">{{ add }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { ref, reactive } from 'vue'
const store = useUserStore()
// setTimeout(() => {
//   store.$patch({
//     age: 18
//   } as any)
// }, 1000)

let add =  `
<html>
asdasdasdasdas
</html>
<input type="button" value="Scan" onclick="AcquireImage();" />
<script type="text/javascript">
var DWObject;
function Dynamsoft_OnReady(){
    DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
}
function AcquireImage(){
    if(DWObject) {
        DWObject.IfDisableSourceAfterAcquire = true;
        DWObject.SelectSource();
        DWObject.OpenSource();
        DWObject.AcquireImage();
    }
}
<\/script>
`

let str = `一天叶子`
let str2 = `一天叶子a`
</script>
<style lang="scss" scoped></style>
