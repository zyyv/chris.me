<template>
  <article class="article">
    <el-row type="flex" :gutter="20">
      <el-col :span="16">
        <section class="mb30 pr30">
          <h2 class="title ellipsis">
            <!-- <span v-if="article.category" class="fs16 category">【{{article.category.name}}】</span> -->
            <router-link class="titleName" :to="`/details/${article._id}`">{{ article.title }}</router-link>
          </h2>
          <p class="desc">{{article.desc}}</p>
          <footer class="flex flex-items-center">
            <el-tooltip :effect="model?'light':'dark'" :content="time.format" placement="bottom">
              <span class="mr10">{{time.distance}}发布</span>
            </el-tooltip>
            <span class="cursor" @click="handleDetail('commentList')">
              <i class="fs16 el-icon-chat-line-round"></i>
              {{ article.comments.length }}
            </span>
          </footer>
        </section>
      </el-col>
      <el-col :span="8">
        <router-link :to="`/details/${article._id}`">
          <div v-if="article.cover" class="cover cursor" v-lazy:background-image="article.cover"></div>
        </router-link>
      </el-col>
    </el-row>

    <!-- <div class="timeBox">
      <span class="date cfff">{{date}}</span>
      <span class="month fs18 cfff">
        {{month}}
        <small class="fs14 cfff">月</small>
      </span>
      <span class="year fs18 ml10 cfff">{{year}}</span>
    </div>-->
    <!-- <div class="content flex mt20 mb20">
      <router-link v-if="article.cover" class="cover pr mr20 fs0" :to="`/details/${article._id}`">
        <img v-lazy="article.cover" alt srcset />
      </router-link>
      <p class="flex-1 text fs14">{{ article.desc }}</p>
    </div>
    <div class="divider overflow-hidden mb20">
      <div class="line pr">
        <router-link :to="`/details/${article._id}`">
          <div class="noselect readnow cursor cfff text-center">
            开始阅读
            <i class="el-icon-s-promotion el-icon--right ml5"></i>
          </div>
        </router-link>
      </div>
    </div>
    <footer class="infos noselect flex flex-items-center">
      <div class="tags flex-1 flex flex-items-center">
        <i class="el-icon-collection-tag fs17" style="color:#eee;"></i>
        <Tag v-for="(tag, i) in article.tags" :key="i" class="ml20" :tag="tag"></Tag>
      </div>
      <div class="ml20 params flex flex-end flex-items-center">
        <div style="color:#606266">
          <i class="el-icon-view fs17"></i>
          <span class="ml5">{{ article.views }}</span>
        </div>
        <el-link
          v-if="article.comments && article.comments.length"
          @click="handleDetail('commentList')"
          class="ml20 comment"
          :underline="false"
        >
          <i class="el-icon-chat-line-square fs17"></i>
          <span class="ml5">{{ article.comments.length }}</span>
        </el-link>
        <el-link
          v-if="article.comments && article.comments.length"
          @click="newArticleLike"
          class="ml20 comment"
          :underline="false"
        >
          <i class="el-icon-thumb fs17"></i>
          <span class="ml5">{{ article.likes }}</span>
        </el-link>
      </div>
    </footer>-->
  </article>
</template>

<script>
import moment from 'moment'
// import Tag from '@/components/Tag'
import { getApi } from "@/api";
import { mapState } from "vuex"
import { getDateByTime, throttle } from "@/utils";
export default {
  name: 'Article',
  components: {
    // Tag
  },
  props: ['article'],
  data () {
    return {
      year: null,
      month: null,
      date: null
    }
  },
  computed: {
    ...mapState('user', ['model']),
    time () {
      return { distance: getDateByTime(+new Date(this.article.createdAt)), format: moment(this.article.createdAt).format('YYYY-MM-DD HH:mm:ss') }
    }
  },
  created () {
    this.formatDate()
  },
  methods: {
    articleLike () {
      this.article.likes++
      getApi('/article/typeUpdate', { _id: this.article._id, type: 'likes' }).then(() => {
        this.$message({
          type: 'success',
          message: '收到您的小惊喜啦~~'
        })
      }, err => {
        this.$message({
          type: 'error',
          message: err
        })
        this.article.likes--
      })
    },
    newArticleLike: throttle('articleLike', 1000),
    formatDate () {
      this.year = moment(this.article.createdAt).year()
      this.month = this.formatNum(moment(this.article.createdAt).month() + 1)
      this.date = this.formatNum(moment(this.article.createdAt).date())
    },
    formatNum (num) {
      if (parseInt(num) < 10) {
        num = '0' + num
      }
      return num
    },
    /** 
     * pos 页面锚点
     */
    handleDetail (pos) {
      this.$router.push({
        path: `/details/${this.article._id}`,
        query: {
          pos
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
$color: #333;
.night {
  .desc {
    color: #888 !important;
  }
  .titleName {
    color: #555 !important;
  }
}
.article {
  padding-top: 20px;
  padding-bottom: 40px;
  .title {
    line-height: 1.5;
    margin-bottom: 7px;
    .category {
      font-weight: 400;
      display: inline-block;
      vertical-align: bottom;
      color: #409eff;
    }
    .titleName {
      transition: all 1s;
      color: $color;
      font-size: 26px;
      font-weight: bold;
      line-height: 1.35;
      // transition: all 0.25s;
    }
  }
  .desc {
    font-size: 15px;
    line-height: 1.625;
    letter-spacing: 0.35px;
    margin-bottom: 17px;
    color: #555;
    transition: all 1s;
  }
  .cover {
    height: 100%;
    border-radius: 3px;
    background-size: cover;
    background-position: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 25, 0.1),
      0 5px 75px 1px rgba(0, 0, 50, 0.2);
    transition: box-shadow 1s ease-out;
    transition-delay: 2s;
  }
  // .timeBox {
  //   user-select: none;
  //   position: absolute;
  //   right: 0;
  //   top: -13px;
  //   // background-color: #fff;
  //   padding: 0 20px 5px 20px;
  //   line-height: 34px;
  //   color: #989997;
  //   span {
  //     display: inline-block;
  //     font-family: Georgia, '寰蒋闆呴粦', 'Helvetica Neue', Arial, sans-serif;
  //   }
  //   .date {
  //     display: block;
  //     font-size: 38px;
  //     // color: #6bc30d;
  //     text-align: center;
  //     font-weight: 700;
  //   }
  // }
  // .content {
  //   .cover {
  //     user-select: none;
  //     display: inline-block;
  //     width: 300px;
  //     height: 180px;
  //     border: 1px solid #e8e9e7;
  //     overflow: hidden;
  //     img {
  //       width: 100%;
  //       height: 100%;
  //     }
  //     &:hover::after {
  //       transition: left 1s ease-in-out;
  //       left: 160%;
  //     }
  //     &:after {
  //       content: '';
  //       height: 100%;
  //       width: 100px;
  //       transform: skewX(-25deg) translate3d(0, 0, 0);
  //       background: -webkit-linear-gradient(
  //         left,
  //         rgba(255, 255, 255, 0) 0,
  //         rgba(255, 255, 255, 0.3) 50%,
  //         rgba(255, 255, 255, 0) 100%
  //       );
  //       position: absolute;
  //       left: -160%;
  //       top: 0;
  //       z-index: 9;
  //     }
  //   }
  //   .text {
  //     height: 100%;
  //     line-height: 26px;
  //     // color: #585957;
  //     color: #eee;
  //     display: -webkit-box;
  //     -webkit-box-orient: vertical;
  //     -webkit-line-clamp: 5;
  //     overflow: hidden;
  //   }
  // }
  // .divider {
  //   width: 100%;
  //   .line {
  //     width: 100%;
  //     .readnow {
  //       // width: 15%;
  //       width: 127px;
  //       margin-left: 5%;
  //       transition: color 0.15s ease-in-out;
  //       &:hover {
  //         color: lightcoral;
  //       }
  //     }
  //     &::before,
  //     &::after {
  //       display: block;
  //       position: absolute;
  //       content: '';
  //       height: 1px;
  //       background-color: #e8e9e7;
  //       // border-bottom:1px solid #fff;
  //       top: 50%;
  //       transform: translateY(-50%);
  //     }
  //     &::before {
  //       left: 0;
  //       width: 5%;
  //     }
  //     &::after {
  //       right: 0;
  //       width: 80%;
  //     }
  //   }
  // }
  // .infos {
  //   .comment {
  //     &:hover {
  //       color: #fff !important;
  //     }
  //   }
  // }
}
</style>
