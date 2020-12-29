<template>
  <div class="detail">
    <el-page-header class="pb20" style="line-height:35px" @back="goBack">
      <h1
        v-if="article"
        :title="article.title"
        class="title ellipsis"
        slot="content"
      >{{article.title}}</h1>
      <span slot="content" v-else class="fs14 c666">稍微等等哦···</span>
    </el-page-header>
    <el-row class="row" :gutter="20">
      <el-col class="left" :span="18">
        <vueScroll style="height:100%;" ref="vs" @handle-scroll="handleScroll">
          <div v-if="article">
            <section class="wrapper">
              <div class="info flex flex-items-center">
                <span
                  class="mr20 fs13"
                >{{article.createdAt | dateformat}}&nbsp;发布，{{article.views}}&nbsp;读过</span>
                <span class="mr20 fs13 cursor" @click="newLikesUpdate">
                  <i class="mr5 iconfont icondianzan fs14"></i>
                  赞成({{ article.likes }})
                </span>
                <div class="flex-1 ellipsis" v-if="article.outlink">
                  <el-tooltip effect="dark" :content="`原文链接：${article.outlink}`" placement="top">
                    <el-link
                      class="ellipsis"
                      style="display:inline-block;max-width:100%;"
                      type="danger"
                      :href="article.outlink"
                      target="_blank"
                      icon="el-icon-s-promotion"
                    >
                      <span class="ml5">{{ article.outlink }}</span>
                    </el-link>
                  </el-tooltip>
                </div>
              </div>
              <section class="markdown-wrapper" v-html="article.content"></section>
              <section class="extra">
                <p class="lh1-5 mb10 flex fs13">
                  <i class="el-icon-sunny fs17 mr10 c333" style="margin-top:1px"></i>
                  <span style="color:#585957">{{article.desc}}</span>
                </p>
                <div class="lh1-5 flex">
                  <i class="el-icon-collection-tag fs17 c333"></i>
                  <div class="fs0">
                    <Tag v-for="(tag, i) in article.tags" :key="i" class="ml20" :tag="tag" />
                  </div>
                </div>
              </section>
            </section>
            <div id="commentList">
              <div class="listHeader flex flex-items-center flex-between">
                <span
                  v-if="article.comments"
                  class="fs15 mr20 c333"
                >{{article.comments.length !== 0 ? `${article.comments.length} 评论` : '评论区跟Up🐖的钱包一样空~~'}}</span>
                <el-button type="success" @click="commentDialog=true" size="mini">评论</el-button>
              </div>
              <Comment
                @reply="cmtReply"
                @likes="cmtAction"
                @dislikes="cmtAction"
                v-for="item in article.comments"
                :key="item._id"
                :comment="item"
              />
            </div>
          </div>
          <div v-else class="flex flex-center" style="height:100%;">
            <div class="noData mt70"></div>
          </div>
        </vueScroll>
      </el-col>
      <el-col class="right" :span="6">
        <vueScroll>
          <el-card class="card" v-if="tocList.length" shadow="hover">
            <ul class="tocList pr">
              <li
                class="cursor tocItem fs14 ellipsis"
                :class="tocIndex === i ? 'active' : ''"
                @click="scrollToAnchorPoint(item.id, i)"
                v-for="(item,i) in tocList"
                :key="item.id"
              >{{item.title}}</li>
              <span
                v-show="tocIndex !== -1"
                class="slider pa"
                :style="{top: `${tocIndex * 30 + 2}px`}"
              ></span>
            </ul>
          </el-card>
        </vueScroll>
      </el-col>
    </el-row>
    <el-dialog class="detail-Dialog" title="说点什么吧~~" :visible.sync="commentDialog" width="50%">
      <Reply :_id="articleId" @reply="createComment" />
    </el-dialog>
    <Backtop @click="backTop" v-show="showBacktop" />
  </div>
</template>

<script>
import Comment from "@/components/Comment";
import Backtop from "@/components/BackTop";
import Reply from "@/components/Comment/reply";
import Tag from "@/components/Tag";
import marked from "marked";
import hljs from "highlight.js";
import { getApi, postApi } from "@/api";
import { throttle } from "@/utils";
import 'highlight.js/styles/atom-one-dark.css';
import "@/assets/css/markdown.scss";
import { mapState } from "vuex";
export default {
  name: 'detail',
  data () {
    return {
      articleId: '',
      article: null,
      tocList: [], // 文章目录 
      tocIndex: -1,
      commentDialog: false,
      showBacktop: false,
      pos: ''
    }
  },
  components: { Comment, Reply, Backtop, Tag },
  created () {
    this.$store.commit('menu/setAside', false)
    this.articleId = this.$route.params.articleId
    this.pos = this.$route.query.pos
    this.initMarked()
  },
  async mounted () {
    await this.viewUpdate()
    this.loadDetails()
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    cmtAction (params) {
      getApi('/comments/update', { ...params }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    viewUpdate () {
      return getApi('/article/typeUpdate', { _id: this.articleId, type: 'views' })
    },
    likesUpdate () {
      this.article.likes++
      getApi('/article/typeUpdate', { _id: this.articleId, type: 'likes' }).then(() => {
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
    newLikesUpdate: throttle('likesUpdate', 1000),
    createComment (params) {
      postApi('/article/createComment', { ...params, author: this.userInfo._id }).then(() => {
        this.$message({
          showClose: true,
          message: '评论成功',
          type: 'success'
        })
        this.commentDialog = false
        this.loadDetails()
      })
    },
    backTop () {
      this.$refs["vs"].scrollTo({ y: 0 })
    },
    handleScroll ({ scrollTop }) {
      this.showBacktop = scrollTop >= 200
      // console.log('handleScroll:',vertical.scrollTop, horizontal, nativeEvent)
      // var a = document.getElementById('bow-making-words-easy')
      // {scrollTop}
      // console.log(a.getBoundingClientRect().top);
      // console.log(a.scr);

      // TODO 滚动响应toc
      for (let i = 0; i < this.tocList.length; i++) {
        let top = document.getElementById(this.tocList[i].id).getBoundingClientRect().top
        if (top < 60 && top > 0) {
          console.log(this.tocList[i].title);
          break
        }
      }
    },
    scrollToAnchorPoint (id, index) {
      this.tocIndex = index
      this.$refs["vs"].scrollIntoView(`#${id}`, 350);
    },
    goBack () {
      this.$router.go(-1)
    },
    cmtReply (params) {
      postApi('/comments/reply', { ...params, author: this.userInfo._id }).then(() => {
        this.$message({
          showClose: true,
          message: '评论成功',
          type: 'success'
        })
        this.loadDetails()
      })
    },
    loadDetails () {
      getApi('/article/details', { _id: this.articleId }).then(res => {
        res.data.content = marked(res.data.content).replace(/<pre>/g, "<pre class='hljs'>");
        this.article = res.data
        let tocList = []
        let result = true
        const reg = /<h2 id="(?<id>[\w\W]+?)">(?<title>[\w\W]+?)<\/h2>/g // 找出 h2 标签
        while (result) {
          result = reg.exec(this.article.content)
          if (result) {
            tocList.push(result.groups)
          }
        }
        this.tocList = tocList
        if (this.article.comments.length) {
          this.tocList.push({
            id: 'commentList',
            title: '评论'
          })
          if (this.pos) {
            this.$nextTick(() => {
              this.scrollToAnchorPoint(this.pos, this.tocList.length - 1)
            })
          }
        }

      })
    },
    initMarked () {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      });
    }
  }
}
</script>
<style lang='scss' scoped>
.night {
  .detail {
    .title {
      color: #555;
    }
  }
  .left {
    .wrapper {
      .info {
        background: #282c34 !important;
      }
    }
  }
  .right {
    .card {
      background: #282c34 !important;
      border-color: #282c34 !important;
      color: #999 !important;
    }
  }
}
.detail {
  padding: 10px;
  height: 100%;
  .row {
    height: calc(100% - 55px);
    .left,
    .right {
      height: 100%;
    }
    .left {
      .noData {
        width: 402px;
        height: 304px;
        background: url('../assets/images/noDate.png') center/contain no-repeat;
      }
    }
    .right {
      .card {
        background: #fff;
        transition: background 1s, border 1s;
        // transition: border 1s;
      }
    }
  }
  .title {
    font-size: 26px;
    font-weight: 700;
    word-break: break-word;
    color: #404040;
    max-width: 1000px;
  }
  .wrapper {
    position: relative;
    .info {
      position: sticky;
      top: 0;
      border: 1px dotted #ccc;
      padding: 15px;
      background: #fafafa;
      z-index: 2;
      transition: background 1s;
      section {
        margin-right: 15px;
      }
    }
    .extra {
      padding: 12px 0;
      border-top: 1px #dcdfe6 dotted;
    }
  }
  .tocList {
    .tocItem {
      width: 100%;
      line-height: 30px;
      height: 30px;
      // color: #2c3e50;
      color: inherit;
      padding-left: 7px;
      transition: all 0.35s;
      box-sizing: border-box;
      &.active {
        color: #3eaf7c;
      }
      &:hover {
        color: #3eaf7c;
      }
    }
    .slider {
      transition: all 0.35s;
      display: block;
      left: -8px;
      width: 4px;
      height: 26px;
      background-color: #3eaf7c;
    }
  }
  #commentList {
    .listHeader {
      border-top: 1px #dcdfe6 dotted;
      border-bottom: 1px solid #dcdfe6;
      padding: 12px 0;
    }
  }
}
</style>
