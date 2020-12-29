<template>
  <div class="message">
    <vueScroll ref="vs">
      <div class="msgCon">
        <header class="header">
          <h1 class="name">留言板</h1>
          <h2 class="num">已有{{total}}人留下足迹</h2>
        </header>
        <Reply :row="8" :_id="type" :type="type" @reply="handleReply"></Reply>
        <div class="messageList">
          <Comment
            class="messageItem"
            @likes="msgAction"
            @dislikes="msgAction"
            @reply="msgReply"
            :type="type"
            v-for="item in messageList"
            :comment="item"
            :key="item._id"
          />
          <div class="flex flex-center">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="query.pagesize"
              layout="total, prev, pager, next"
              :total="total"
              hide-on-single-page
            ></el-pagination>
          </div>
        </div>
      </div>
    </vueScroll>
  </div>
</template>

<script>
import { getApi, postApi } from "@/api";
import Reply from "@/components/Comment/reply";
import Comment from "@/components/Comment";
export default {
  name: 'message',
  components: {
    Reply, Comment
  },
  data () {
    return {
      type: 'msg',
      messageList: [],
      total: 0,
      query: {
        page: 0,
        pagesize: 5
      },
      currentPage: 0
    }
  },
  created () {
    this.$store.commit('menu/setAside', true)
  },
  mounted () {
    this.loadMessages()
  },
  methods: {
    handleCurrentChange (val) {
      this.query.page = val - 1;
      this.loadMessages();
    },
    msgReply (params) {
      postApi('/message/reply', { ...params }).then(() => {
        this.$message({
          showClose: true,
          message: '留言成功',
          type: 'success'
        })
        this.loadMessages()
      })
    },
    msgAction (params) {
      getApi('/message/update', { ...params }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    loadMessages () {
      getApi('/message/search', { ...this.query }).then(res => {
        this.messageList = res.data.data
        this.total = res.data.total
      })
    },
    handleReply (one) {
      postApi('/message/create', this.formatParms(one)).then(() => {
        this.$message({
          type: 'success',
          message: '成功踩点。23333'
        })
        this.loadMessages()
      })
    },
    formatParms (one) {
      // { name, ip, city, avatar, content, email, os, env }
      return {
        ...one,
        ip: localStorage.getItem('ip'),
        city: localStorage.getItem('cityname'),
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.night {
  .message {
    .remark {
      color: #999 !important;
    }
  }
}
.message {
  height: 100%;
  .msgCon {
    padding: 55px;
    height: 100%;
    .header {
      text-align: center;
      margin-bottom: 40px;
      .name {
        color: inherit;
        font-size: 35px;
        margin-bottom: 15px;
      }
      .num {
        color: inherit;
        font-size: 26px;
        margin-bottom: 10px;
      }
    }
    .remark {
      margin-top: 30px;
      padding: 0 10px 10px;
      line-height: 1.725;
      transition: color 1s;
      color: rgba(0, 0, 0, 0.6);
      .title {
        color: #fb7299;
      }
    }
    .messageList {
      padding: 20px 0;
      .messageItem {
        padding: 20px;
        border: 1px solid;
        border-radius: 4px;
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
