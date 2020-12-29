<template>
  <div class="home">
    <vueScroll ref="vs" @handle-scroll="handleScroll">
      <!-- <vueScroll
      ref="vs"
      v-infinite-scroll="loadArticles"
      :infinite-scroll-disabled="disabled"
      :infinite-scroll-distance="200"
      @handle-scroll="handleScroll"
      >-->
      <section class="body">
        <div class="openBox">
          <span @click="showMenu = true" class="openMenu">
            <i class="fs16 el-icon-s-fold"></i>
          </span>
        </div>
        <Article v-for="(item) in articleList" :key="item._id" :article="item" />
        <p class="text-center pt20 fs14" v-if="loading">
          <i class="el-icon-loading mr5"></i>玩命加载中...
        </p>
        <p class="text-center pt20 fs14" v-if="noMore">客官，没有更多啦~</p>
      </section>
    </vueScroll>
    <!-- <el-row class="row" :gutter="20">
    <el-col class="left" :span="18">-->

    <!-- </el-col> -->
    <!-- <el-col class="right" :span="6">
        <vueScroll>
          <el-card class="mb20" shadow="hover">
            <el-input
              size="small"
              placeholder="您要查点什么嘛？"
              v-model="keyword"
              class="input-with-select"
            >
              <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-divider></el-divider>
            <div class="categories">
              <p
                @click="categoryClick(item, i)"
                v-for="(item, i) in categories"
                :key="i"
                class="cursor"
                :class="i === categoryIndex ? 'active' : ''"
              >{{ item.name }}</p>
            </div>
          </el-card>
          <el-card class="mb20" shadow="hover">
            <div class="fs15">热门标签</div>
            <el-divider></el-divider>
            <div class="flex flex-wrap">
              <Tag
                @click="TagClick"
                v-for="(tag, i) in tags"
                :key="i"
                class="mr10 ml10 mb10"
                :tag="tag"
              ></Tag>
            </div>
          </el-card>
          <el-card shadow="hover">
            <div class="fs15">热门文章</div>
            <el-divider></el-divider>
            <div class="fireArticle">
              <div
                v-for="(item,i) in hotArticles"
                :key="item._id"
                class="fire flex flex-items-center ellipsis fs14 pl5 pr10"
              >
                <span class="sort inline-block mr5 fs13" :class="'top' + (i+1)">{{ i + 1 }}</span>
                <div class="flex-1 ellipsis" :title="item.title">
                  <el-link
                    style="max-width:100%;display:inline-block;"
                    class="ellipsis"
                    @click="handleDetail(item._id)"
                    :type="types[i]"
                  >{{item.title}}</el-link>
                </div>
              </div>
            </div>
          </el-card>
        </vueScroll>
    </el-col>-->
    <!-- </el-row> -->
    <!-- <BackTop @click="backTop" v-show="showBacktop" /> -->
    <!-- <div class="right">
      <vueScroll>
        <section class="wrapper">
          <span class="closeMenu">
            <i class="fs16 el-icon-s-unfold"></i>
          </span>
          <el-card class="card mb20" :body-style="{padding:'10px'}" shadow="hover">
            <div class="header">
              <el-input
                size="small"
                placeholder="您要查点什么嘛？"
                v-model="keyword"
                class="input-with-select"
              >
                <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div class="categories">
              <p
                @click="categoryClick(item, i)"
                v-for="(item, i) in categories"
                :key="i"
                class="cursor"
                :class="i === categoryIndex ? 'active' : ''"
              >{{ item.name }}</p>
            </div>
          </el-card>
          <el-card class="card mb20" shadow="hover">
            <div class="header">
              <div class="fs15">热门标签</div>
            </div>
            <div class="flex flex-wrap">
              <Tag
                @click="TagClick"
                v-for="(tag, i) in tags"
                :key="i"
                class="mr10 ml10 mb10"
                :tag="tag"
              ></Tag>
            </div>
          </el-card>
          <el-card class="card" shadow="hover">
            <div class="header">
              <div class="fs15">热门文章</div>
            </div>
            <div class="fireArticle">
              <div
                v-for="(item,i) in hotArticles"
                :key="item._id"
                class="fire flex flex-items-center ellipsis fs14 pl5 pr10"
              >
                <span class="sort inline-block mr5 fs13" :class="'top' + (i+1)">{{ i + 1 }}</span>
                <div class="flex-1 ellipsis" :title="item.title">
                  <el-link
                    style="max-width:100%;display:inline-block;"
                    class="ellipsis"
                    @click="handleDetail(item._id)"
                    :type="types[i]"
                  >{{item.title}}</el-link>
                </div>
              </div>
            </div>
          </el-card>
        </section>
      </vueScroll>
    </div>-->
    <el-drawer
      custom-class="right"
      :show-close="false"
      :modal="false"
      size="20%"
      :withHeader="false"
      :visible.sync="showMenu"
      direction="rtl"
    >
      <vueScroll>
        <section class="wrapper">
          <span @click="showMenu=false" class="closeMenu">
            <i class="fs16 el-icon-s-unfold"></i>
          </span>
          <el-card class="card mb20" :body-style="{padding:'10px'}" shadow="hover">
            <div class="header">
              <el-input
                size="small"
                placeholder="您要查点什么嘛？"
                v-model="keyword"
                class="input-with-select"
              >
                <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div class="categories">
              <p
                @click="categoryClick(item, i)"
                v-for="(item, i) in categories"
                :key="i"
                class="cursor"
                :class="i === categoryIndex ? 'active' : ''"
              >{{ item.name }}</p>
            </div>
          </el-card>
          <el-card class="card mb20" :body-style="{padding:'10px'}" shadow="hover">
            <div class="header">
              <div class="fs15">热门标签</div>
            </div>
            <div class="flex flex-wrap">
              <Tag
                @click="TagClick"
                v-for="(tag, i) in tags"
                :key="i"
                class="mr10 ml10 mb10"
                :tag="tag"
              ></Tag>
            </div>
          </el-card>
          <el-card class="card" :body-style="{padding:'10px'}" shadow="hover">
            <div class="header">
              <div class="fs15">热门文章</div>
            </div>
            <div class="fireArticle">
              <div
                v-for="(item,i) in hotArticles"
                :key="item._id"
                class="fire flex flex-items-center ellipsis fs14 pl5 pr10"
              >
                <span class="sort inline-block mr5 fs13" :class="'top' + (i+1)">{{ i + 1 }}</span>
                <div class="flex-1 ellipsis" :title="item.title">
                  <el-link
                    style="max-width:100%;display:inline-block;"
                    class="ellipsis"
                    @click="handleDetail(item._id)"
                    :type="types[i]"
                  >{{item.title}}</el-link>
                </div>
              </div>
            </div>
          </el-card>
        </section>
      </vueScroll>
    </el-drawer>
  </div>
</template>

<script>
import Article from '@/components/Article'
import Tag from '@/components/Tag'
// import BackTop from "@/components/BackTop";
import { getApi } from '@/api'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  name: 'home',
  components: {
    Article,
    Tag,
    // BackTop
  },
  data () {
    return {
      showMenu: false,
      keyword: '',
      categoryIndex: -1,
      categories: [],
      loading: false,
      articleList: [],
      total: 10,
      query: {
        page: 0,
        pagesize: 10
      },
      tags: [],
      types: ['danger', 'warning', 'info', 'success', 'light'],
      hotArticles: [],
      showBacktop: false
    }
  },
  computed: {
    noMore () {
      return this.articleList.length === this.total
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.$store.commit('menu/setAside', true)
  },
  mounted () {
    this.loadArticles()
    this.loadCategories()
    this.loadHotArticles5()
    this.loadHotTags10()
  },
  methods: {
    handleScroll ({ scrollTop }) {
      this.showBacktop = scrollTop >= 200
    },
    backTop () {
      this.$refs["vs"].scrollTo({ y: 0 })
    },
    TagClick (tag) {
      if (this.loading) return // 如果处于其他请求中，结束
      this.query = {
        page: 0,
        pagesize: 10,
        tags: tag._id
      }
      this.categoryIndex = -1
      this.keyword = ''
      this.total = null
      this.articleList = []
      this.loadArticles()
    },
    loadHotTags10 () {
      getApi('/tags/hotTop10', {}).then(res => {
        this.tags = res.data.data
      })
    },
    handleDetail (_id) {
      this.$router.push(`/details/${_id}`)
    },
    loadHotArticles5 () {
      getApi('/article/hotTop5', {}).then(res => {
        this.hotArticles = res.data.data
      })
    },
    loadArticles () {
      this.loading = true
      getApi('/article/search', { ...this.query }).then((res) => {
        this.loading = false
        this.articleList = [...this.articleList, ...res.data.data]
        // this.articleList = [...this.articleList, ...res.data.data, ...res.data.data, ...res.data.data]
        this.total = res.data.total
        this.query.page++
        NProgress.done()
      })
    },
    loadCategories () {
      getApi('/category/search', {}).then((res) => {
        this.categories = res.data.data
        this.total = res.data.total
      })
    },
    handleSearch () {
      console.log(this.keyword)
      if (this.keyword) {
        NProgress.start()
        this.query = {
          page: 0,
          pagesize: 10,
          keyword: this.keyword,
          category: this.categoryIndex === -1 ? '' : this.categories[this.categoryIndex]._id
        }
        this.total = null
        this.articleList = []
        this.loadArticles()
      }
    },
    categoryClick (item, index) {
      if (this.loading) return // 如果处于其他请求中，结束
      // NProgress.start()
      let isActive = index !== this.categoryIndex
      this.categoryIndex = isActive ? index : -1
      this.query = {
        page: 0,
        pagesize: 10,
        keyword: this.keyword,
        category: isActive ? item._id : ''
      }
      this.total = null
      this.articleList = []
      this.loadArticles()
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  height: 100%;
  .body {
    position: relative;
    padding: 55px;
    // .openBox {
    // position: absolute;
    // z-index: 2;
    // right: 10px;
    // top: 10px;
    .openMenu {
      position: fixed;
      z-index: 2;
      right: 10px;
      top: 10px;
      display: inline-block;
      width: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        z-index: 2;
        background-color: #292a2b;
        color: #fefefa;
      }
    }
    // }
  }
}
.night {
  .right {
    .card {
      &.is-hover-shadow {
        &:hover {
          box-shadow: 0 2px 12px 0 rgba(255, 255, 255, 0.1);
        }
      }
      .header {
        border-bottom: 1px dotted #666 !important;
        color: #999;
      }
    }
    .categories {
      color: #888;
    }
  }
}
.right {
  height: 100%;
  transition: all 0.5s;
  &:hover {
    z-index: 3;
  }
  .wrapper {
    position: relative;
    height: 100%;
    padding-top: 60px;
    .closeMenu {
      position: absolute;
      right: 10px;
      top: 10px;
      display: inline-block;
      width: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: #292a2b;
        color: #fefefa;
      }
    }
    .card {
      background: transparent;
      border: none;
      border-radius: 0;
      .header {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px dotted #eaecef;
      }
    }
  }
}

.categories {
  width: 100%;
  color: #303133;
  p {
    height: 35px;
    line-height: 35px;
    transition: all 0.35s;
    font-size: 14px;
    padding: 0 20px;
    &:hover {
      background: #ecf5ff;
    }
    &.active {
      color: #fff;
      background: linear-gradient(to right, #ee9ca7, #ffdde1);
    }
  }
}
.fireArticle {
  .fire {
    width: 100%;
    padding: 10px 0;
    .sort {
      user-select: none;
      width: 22px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      border-radius: 50%;
      &.top1 {
        background-color: #fef0f0;
        color: #f56c6c;
      }
      &.top2 {
        background-color: #fdf6ec;
        color: #e6a23c;
      }
      &.top3 {
        background-color: #f4f4f5;
        color: #909399;
      }
      &.top4 {
        background-color: #f0f9eb;
        color: #67c23a;
      }
      &.top5 {
        background-color: #ecf5ff;
        color: #409eff;
      }
    }
  }
}
</style>
