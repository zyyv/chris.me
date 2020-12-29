import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/css/main.scss';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// vueScroll
import vuescroll from 'vuescroll'
// moment
import moment from 'moment'
// lazyload
import VueLazyLoad from 'vue-lazyload'
// 粒子特效
// import VueParticles from 'vue-particles'
// 点击特效
import './utils/clickSpecialEffects';


Vue.config.productionTip = false;

Vue.use(ElementUI)
Vue.use(vuescroll, {
  ops: {
    bar: { background: '#dddee0' },
    scrollPanel: {
      scrollingX: false,
    }
  }
})
Vue.use(VueLazyLoad)
// Vue.use(VueParticles)

Vue.filter('dateformat', function(date, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(date).format(pattern)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");