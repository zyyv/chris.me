<template>
  <div id="app" :class="model?'light':'night'">
    <el-container class="container" style>
      <el-aside class="aside" :width="openAside ? '38%' : '22%'">
        <Info />
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Info from '@/components/Info'
import { mapState } from "vuex";
export default {
  name: 'App',
  components: { Info },
  data () {
    return {}
  },
  created () {
    localStorage.setItem('ip', window.returnCitySN['cip'])
    localStorage.setItem('cityname', window.returnCitySN['cname'])
    this.$store.state.user.token || this.$store.dispatch('user/getTourist')
  },
  computed: {
    ...mapState('menu', ['openAside']),
    ...mapState('user', ['model']),
  }
}
</script>
<style lang="scss" scoped>
$bg-color: #fafbff;
$color: #555;
$night-bg-color: #151518;
$night-color: #999;
#app {
  .container {
    height: 100vh;
  }
  .aside {
    transition: all 1s;
    background-image: url('http://chat.chrisying.cn/1608021783130-8397.jfif');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    color: rgba(255, 255, 255, 0.8);
  }
  &.night{
    .main{
      background-color: $night-bg-color !important;
      color: $night-color !important;
    }
  }
  .main {
    transition: all 1s;
    background-color: $bg-color;
    color: $color;
    padding: 0;
    overflow: hidden;
  }
}
</style>
