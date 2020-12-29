<template>
  <div class="wrapper">
    <div class="body overlay">
      <div class="info flex flex-center flex-column flex-items-center">
        <el-tooltip
          :content="model?'夜间模式':'关闭夜间模式'"
          placement="left"
          :effect="model?'light':'dark'"
        >
          <span @click="changeModel" class="model">
            <i class="iconfont iconbofangye_gengduo_yejianmoshiyijingdakai"></i>
          </span>
        </el-tooltip>
        <el-popover placement="right" popper-class="popper" trigger="hover">
          <div style="height:220px" v-if="musicList.length">
            <vueScroll>
              <ul class="musicList" style="padding:12px;">
                <li
                  v-for="(item,i) in musicList"
                  :key="item.url"
                  class="musicItem"
                  :class="{pb10: i != musicList.length-1,active: item.status}"
                >
                  <div class="musicCon flex flex-items-center pr">
                    <div class="sortNum noselect">{{i+1}}</div>
                    <div class="musicName ellipsis fs13">{{item.name}}</div>
                    <i
                      @click="musicPause"
                      v-if="item.status"
                      class="cursor iconfont el-icon-video-pause musicStatus"
                    ></i>
                    <i
                      @click="musicPlay(i)"
                      v-else
                      class="cursor iconfont el-icon-video-play musicStatus"
                    ></i>
                  </div>
                </li>
              </ul>
            </vueScroll>
          </div>
          <div v-else class="noData"></div>
          <div slot="reference" class="action animate pr">
            <img class="avatar" :class="m_status?'rotate':''" v-lazy="blogerInfo.avatar" alt />
            <div
              @click="m_status? musicPause() : musicPlay(current.index)"
              class="fs0 audioBox pa flex flex-center flex-items-center"
            >
              <i v-show="m_status" class="iconfont iconpause" style="font-size:25px;"></i>
              <i v-show="!m_status" class="iconfont iconplay" style="font-size:25px;"></i>
            </div>
          </div>
        </el-popover>
        <section class="mt20">
          <el-tooltip
            :content="`Hi i'm ${blogerInfo.name}`"
            placement="top"
            :effect="model?'light':'dark'"
          >
            <div @dblclick="login">
              <h2 class="fs18 noselect mb5">朱颖的博客</h2>
              <h2 class="fs16 noselect">Chris's Blog</h2>
            </div>
          </el-tooltip>
        </section>
        <section class="mt20 sign">
          <!-- <p class="fs13 lh1-5">我是一个 24 岁的 homeschooler，爱好旅行以及一切富有创造性的事物，尤其是摄影、设计和编程。这个世界就是我的学校。学自己之所想所爱。自由的身心定能使我成为一个一直朝前行走的行者。</p> -->
          <p class="fs13 lh1-5">一位22岁的小码农</p>
        </section>
        <section class="mt20" style="width:100%">
          <el-carousel :autoplay="false" indicator-position="none" height="230px" ref="carousel">
            <el-carousel-item name="menu">
              <div class="card cfff fs14 flex flex-column flex-items-center flex-around">
                <span
                  v-for="menu in menus"
                  :key="menu.path"
                  @click="$router.push(menu.path)"
                  class="cursor menu-item"
                >{{menu.title}}</span>
                <div class="icons flex flex-between">
                  <el-popover placement="top-start" width="150" trigger="hover">
                    <div style="width:100%;" class="flex flex-items-center flex-column">
                      <img
                        style="width:100%;"
                        src="http://qfr5vuqoo.hn-bkt.clouddn.com/chris_qrcode.png"
                        alt
                        srcset
                      />
                      <span style="color:#666" class="mt10 fs12">扫码了解有趣的他</span>
                    </div>
                    <img slot="reference" class="cursor" :src="wechat" alt />
                  </el-popover>
                  <el-tooltip :effect="model?'light':'dark'" content="去github逛逛吗" placement="top">
                    <img class="cursor" :src="github" alt />
                  </el-tooltip>
                  <el-tooltip
                    :effect="model?'light':'dark'"
                    content="即将成为Up🐖，先来个关注吧"
                    placement="top"
                  >
                    <img @click="goBilibili" class="cursor" :src="bilibili" alt />
                  </el-tooltip>
                  <el-tooltip :effect="model?'light':'dark'" content="微博。。。" placement="top">
                    <img class="cursor" :src="weibo" alt />
                  </el-tooltip>
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item name="sign">
              <div class="card flex flex-center flex-items-center">
                <vueScroll>
                  <div class="pl20 pr20 pt10 pb10 flex flex-wrap"></div>
                </vueScroll>
              </div>
            </el-carousel-item>
            <el-carousel-item name="mine">
              <!-- <div class="card flex flex-center flex-items-center">
                <Time color="#fff" />
              </div>-->
            </el-carousel-item>
          </el-carousel>
        </section>
      </div>
    </div>
    <el-dialog title="Login" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :rules="rules" :model="form" class="demo-form-inline" size="middle">
        <el-form-item prop="account">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.account" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            @keyup.enter.native="onSubmit"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="form.pwd"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <audio ref="audio" @ended="audioEnded"></audio>
  </div>
</template>

<script>
// import Time from '@/components/Time'
import { getApi } from '@/api'
import { mapState } from "vuex"
import menus from "@/utils/menus";
export default {
  name: 'info',
  components: {
    // Time,
    // Tag
  },
  props: {},
  data () {
    return {
      menus,
      form: {
        account: '', pwd: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '密码长度不够哦~~ 5-10位', trigger: 'blur' }
        ]
      },
      github: 'https://qiniu-apps.zoombin.com/github.png',
      bilibili: 'https://qiniu-apps.zoombin.com/bilibili.png',
      wechat: 'https://qiniu-apps.zoombin.com/wechat.png',
      weibo: 'https://qiniu-apps.zoombin.com/weibo.png',
      dialogVisible: false,
      current: null,
      musicList: []
    }
  },
  computed: {
    ...mapState('user', ['blogerInfo', 'token', 'model']),
    m_status () {
      return this.musicList.some(it => it.status)
    }
  },
  mounted () {
    this.blogerInfo._id || this.$store.dispatch('user/loadSuperAdmin') //获取信息
    this.loadMusicList()
  },
  methods: {
    changeModel () {
      this.$store.commit('user/setModel')
    },
    goBilibili () {
      window.open('https://space.bilibili.com/402454160')
    },
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.form).then(() => {
            this.dialogVisible = false
            this.$refs['form'].resetFields()
          }).catch(() => {
            this.form.pwd = ''
          })
        } else {
          return false;
        }
      });
    },
    login () {
      if (this.token) {
        this.logout()
      } else {
        this.dialogVisible = true
      }
    },
    logout () {
      this.$store.dispatch('user/logout')
    },
    loadMusicList () {
      getApi('/qiniu/bgmMusic', { limit: 20 }).then(res => {
        this.musicList = res.data.source.map((it, index) => ({ ...it, status: false, index }))
        if (this.musicList.length) {
          this.audioCtrl = this.$refs.audio
          this.changeMusic(0, false)
          this.$notify({
            title: '这是一条温馨小提示(u‿ฺu✿ฺ)',
            message: '点击下方头像可以播放动听的bgm哦~~',
            position: 'top-left',
            duration: 0
          });
        }
      })
    },
    changeMusic (index, action = true) {
      if (this.audioCtrl) {
        if (this.current) {
          this.current.status = false
        }
        this.current = this.musicList[index]
        this.audioCtrl.src = this.current.url
        if (action) {
          this.audioCtrl.play()
          this.musicList[index].status = true
        }
      }
    },
    audioEnded () {
      this.playNextMusic()
    },
    playNextMusic () {
      let index = this.current.index
      index++
      index = index < this.musicList.length ? index : 0
      this.changeMusic(index)
    },
    musicPause () {
      if (this.current) {
        this.current.status = false
        this.audioCtrl.pause()
      }
    },
    musicPlay (index) {
      if (this.current) {
        const item = this.musicList[index]
        if (item.url === this.current.url) {
          this.current.status = true
          this.audioCtrl.play()
          return
        }
      }
      this.changeMusic(index)
    }
  }
}
</script>
<style lang="scss" scoped>
.noData {
  width: 200px;
  height: 163px;
  background: url('../../assets/images/noDate.png') center/contain no-repeat;
}
.musicList {
  .musicItem {
    &.active {
      .musicCon {
        color: #fff;
        .sortNum {
          width: 10px;
          height: 10px;
          left: 5px;
          font-size: 0;
          background: url('../../assets/images/wave.gif') 0 0 no-repeat;
        }
      }
    }
    .musicCon {
      padding-left: 25px;
      color: #e1e1e1cc;
      overflow: hidden;
      .sortNum {
        position: absolute;
        width: 20px;
        left: 0;
        font-size: 13px;
        text-align: center;
        color: inherit;
      }
      .musicName {
        width: 160px;
        color: inherit;
      }
      .musicStatus {
        font-size: 18px;
        color: inherit;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}

.night {
  .overlay {
    background-color: rgba(0, 0, 0, 0.75) !important;
  }
}
.wrapper {
  width: 100%;
  height: 100%;
  .overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    transition: all 1s;
    &.body {
      .info {
        position: relative;
        width: 100%;
        height: 100%;
        .model {
          position: absolute;
          top: 10px;
          right: 10px;
          display: inline-block;
          width: 25px;
          height: 25px;
          line-height: 25px;
          border-radius: 50%;
          text-align: center;
          cursor: pointer;
          border: 1px solid;
          border-color: rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.45)
            rgba(255, 255, 255, 0.55);
          color: rgba(255, 255, 255, 0.8);
          transition: 0.2s;
          background-color: rgba(0, 0, 0, 0.15);

          &:hover {
            background-color: rgba(255, 255, 255, 0.15);
          }
          i {
            font-size: 18px;
          }
        }
        .sign {
          padding: 0 13%;
        }
        .action {
          margin: 0 auto;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5),
            0px 2px 20px 3px rgba(0, 0, 0, 0.25);
          border-radius: 50%;
          width: 100px;
          height: 100px;
          overflow: hidden;
          &.animate {
            &:hover {
              animation: run linear 1s;
            }
          }
          .avatar {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            &.rotate {
              animation: rotate 8s infinite linear;
            }
          }
          &:hover {
            .audioBox {
              z-index: 2;
              background-color: rgba(0, 0, 0, 0.3);
            }
          }
          .audioBox {
            z-index: -1;
            width: 100%;
            height: 100%;
            // background-color: rgba(0, 0, 0, 0.25);
            top: 0;
            left: 0;
            transition: all 0.3s ease-in-out;
          }
        }

        .tooltip {
          margin-top: 20px;
        }

        .menuSelect {
          width: 40px;
          height: 40px;
          img {
            width: 80%;
            height: 80%;
          }
        }

        .card {
          width: 100%;
          height: 100%;
          .menu-item {
            transition: all 0.2s ease-in-out;
            &:hover {
              display: inline-block;
              padding: 4px 10px;
              border-radius: 5%;
              background: #00a1d6;
              color: #fff;
              font-size: 15px;
            }
          }
          .icons {
            width: 60%;
            img {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
  }
}

@keyframes run {
  // 0% {
  //   -webkit-transform: scale(1, 1);
  // }
  0% {
    -webkit-transform: scale(1.2, 0.8);
  }
  1% {
    -webkit-transform: scale(1.18, 0.82);
  }
  2% {
    -webkit-transform: scale(1.16, 0.84);
  }
  3% {
    -webkit-transform: scale(1.13, 0.87);
  }
  4% {
    -webkit-transform: scale(1.1, 0.9);
  }
  5% {
    -webkit-transform: scale(1.07, 0.93);
  }
  6% {
    -webkit-transform: scale(1.04, 0.96);
  }
  7% {
    -webkit-transform: scale(1.01, 0.99);
  }
  8% {
    -webkit-transform: scale(0.99, 1.01);
  }
  9% {
    -webkit-transform: scale(0.97, 1.03);
  }
  10% {
    -webkit-transform: scale(0.95, 1.05);
  }
  11% {
    -webkit-transform: scale(0.94, 1.06);
  }
  12% {
    -webkit-transform: scale(0.93, 1.07);
  }
  13% {
    -webkit-transform: scale(0.93, 1.07);
  }
  14% {
    -webkit-transform: scale(0.93, 1.07);
  }
  15% {
    -webkit-transform: scale(0.93, 1.07);
  }
  16% {
    -webkit-transform: scale(0.94, 1.06);
  }
  17% {
    -webkit-transform: scale(0.94, 1.06);
  }
  18% {
    -webkit-transform: scale(0.95, 1.05);
  }
  19% {
    -webkit-transform: scale(0.96, 1.04);
  }
  20% {
    -webkit-transform: scale(0.98, 1.02);
  }
  21% {
    -webkit-transform: scale(0.99, 1.01);
  }
  22% {
    -webkit-transform: scale(1, 1);
  }
  23% {
    -webkit-transform: scale(1, 1);
  }
  24% {
    -webkit-transform: scale(1.01, 0.99);
  }
  25% {
    -webkit-transform: scale(1.02, 0.98);
  }
  26% {
    -webkit-transform: scale(1.02, 0.98);
  }
  27% {
    -webkit-transform: scale(1.02, 0.98);
  }
  28% {
    -webkit-transform: scale(1.03, 0.97);
  }
  29% {
    -webkit-transform: scale(1.03, 0.97);
  }
  30% {
    -webkit-transform: scale(1.02, 0.98);
  }
  31% {
    -webkit-transform: scale(1.02, 0.98);
  }
  32% {
    -webkit-transform: scale(1.02, 0.98);
  }
  33% {
    -webkit-transform: scale(1.02, 0.98);
  }
  34% {
    -webkit-transform: scale(1.01, 0.99);
  }
  35% {
    -webkit-transform: scale(1.01, 0.99);
  }
  36% {
    -webkit-transform: scale(1.01, 0.99);
  }
  37% {
    -webkit-transform: scale(1, 1);
  }
  38% {
    -webkit-transform: scale(1, 1);
  }
  39% {
    -webkit-transform: scale(1, 1);
  }
  40% {
    -webkit-transform: scale(0.99, 1.01);
  }
  41% {
    -webkit-transform: scale(0.99, 1.01);
  }
  42% {
    -webkit-transform: scale(0.99, 1.01);
  }
  43% {
    -webkit-transform: scale(0.99, 1.01);
  }
  44% {
    -webkit-transform: scale(0.99, 1.01);
  }
  45% {
    -webkit-transform: scale(0.99, 1.01);
  }
  46% {
    -webkit-transform: scale(0.99, 1.01);
  }
  47% {
    -webkit-transform: scale(0.99, 1.01);
  }
  48% {
    -webkit-transform: scale(0.99, 1.01);
  }
  49% {
    -webkit-transform: scale(1, 1);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
