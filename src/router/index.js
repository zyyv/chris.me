import Vue from "vue";
import VueRouter from "vue-router";
// 顶部加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

NProgress.inc(0.2)
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false
})

const Home = () => import('@/views/home')
const Notes = () => import('@/views/notes')
const Photos = () => import('@/views/photos')
const Details = () => import('@/views/details')
const Message = () => import('@/views/message')
const About = () => import('@/views/about')

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/details/:articleId", name: "Details", component: Details },
  { path: "/notes", name: "Notes", component: Notes },
  { path: "/message", name: "Message", component: Message },
  { path: "/photos", name: "Photos", component: Photos },
  { path: "/about", name: "About", component: About }
];

const router = new VueRouter({ routes, mode: 'hash' })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;