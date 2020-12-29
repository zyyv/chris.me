<template>
  <div class="comment">
    <el-row :gutter="20">
      <el-col class="text-center" :span="2">
        <el-avatar v-if="type === 'cmt'" :src="comment.author.avatar"></el-avatar>
        <el-avatar v-else :src="comment.avatar">
          <!-- <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" /> -->
          {{comment.name[0]}}
        </el-avatar>
      </el-col>
      <el-col :span="22">
        <div class="content">
          <div class="author flex flex-wrap">
            <span
              v-if="type === 'cmt' && comment.author"
              class="name mr10 fs13"
            >{{comment.author.name}}</span>
            <span v-else class="name mr10 fs13">{{comment.name}}</span>
            <el-tooltip
              class="item"
              effect="dark"
              :content="formatTime(comment.createdAt).format"
              placement="top"
            >
              <span class="time mr10 fs13">{{formatTime(comment.createdAt).distance}}</span>
            </el-tooltip>
            <el-tooltip
              v-if="comment.replyed"
              class="item"
              effect="dark"
              :content="comment.replyed.content"
              placement="top"
            >
              <span
                v-if="comment.replyed && type === 'cmt' && comment.replyed.author"
                class="fs13 replyed"
              >
                回复&nbsp;
                <span class="name">@{{comment.replyed.author.name}}：</span>
              </span>
              <span v-else class="fs13 replyed">
                回复&nbsp;
                <span class="name">@{{comment.replyed.name}}：</span>
              </span>
            </el-tooltip>
          </div>
          <p class="text fs14 lh1-5">{{comment.content}}</p>
          <ul class="actions mt10 mb10">
            <li @click.once="handleActionLike('likes')">
              <div class="pr pl20 cursor">
                <div class="like pa" :class="likes ? 'active' : ''"></div>
                <span class="ml5 fs13">{{comment.likes}}</span>
              </div>
            </li>
            <li @click.once="handleActionLike('dislikes')">
              <!-- <span> -->
              <!-- <i class="el-icon-heavy-rain mr5 fs15"></i> -->
              <i class="iconfont iconnoxin mr5 fs16"></i>
              <span>{{comment.dislikes}}</span>
              <!-- </span> -->
            </li>
            <li @click="thToggleReply">
              <span>
                <i class="el-icon-chat-line-square mr5 fs15"></i>
                <span>Reply to</span>
              </span>
            </li>
          </ul>
          <el-collapse-transition>
            <Reply
              v-show="showReply"
              @reply="handleReply"
              :type="type"
              :_id="comment._id"
              :placeholder="type === 'cmt' ? `回复${comment.author.name}:` : `回复${comment.name}:`"
              class="mt20 mb20"
            />
          </el-collapse-transition>
          <template v-if="comment.children && comment.children.length">
            <template v-for="(item,i) in comment.children">
              <el-collapse-transition :key="item._id">
                <comment
                  v-if="i < capacity"
                  :type="type"
                  @reply="reply"
                  @likes="childAction"
                  @dislikes="childAction"
                  :comment="item"
                />
              </el-collapse-transition>
            </template>
            <template v-if="comment.children && comment.children.length > defaultChildNum">
              <p v-if="noMore" class="flex flex-items-center flex-center">
                <el-tooltip :effect="model? 'light':'dark'" content="收起" placement="top">
                  <el-link @click="capacity = defaultChildNum" :underline="false">
                    <span class="fs13">没有更多啦~.~</span>
                    <i class="fs13 el-icon-d-arrow-right ml5" style="transform:rotate(-90deg)"></i>
                  </el-link>
                </el-tooltip>
              </p>
              <p v-else class="flex flex-items-center flex-center">
                <el-link @click="loadMore" :underline="false">
                  <span class="fs13">加载更多</span>
                  <i
                    class="fs13 ml5"
                    :class="loading ? 'el-icon-loading' : 'el-icon-d-arrow-right'"
                    style="transform:rotate(90deg)"
                  ></i>
                </el-link>
              </p>
            </template>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Reply from "./reply";
import moment from "moment";
import { getDateByTime, throttle } from "@/utils";
import { mapState } from "vuex"
export default {
  name: 'comment',
  components: {
    Reply
  },
  props: {
    comment: Object,
    type: { type: String, default: 'cmt' }
  },
  data () {
    return {
      name: '',
      email: '',
      loading: false,
      likes: false,
      dislikes: false,
      showReply: false,
      accumulateNum: 5, // 每次累加多少条数据
      defaultChildNum: 3, // 最开始显示几条
      capacity: 3 // 容量 最开始与 defaultChildNum 保持一致
    }
  },
  computed: {
    ...mapState('user', ['model']),
    noMore () {
      return this.capacity >= this.comment.children.length
    }
  },
  methods: {
    loadMore () {
      this.loading = true
      setTimeout(() => {
        this.capacity += this.accumulateNum
        this.loading = false
      }, 350);
    },
    toggleReply () {
      this.showReply = !this.showReply
    },
    childAction (params) {
      this.$emit(params.type, { ...params })
    },
    handleActionLike (type) {
      this[type] = true
      this.comment[type]++
      this.$emit(type, { _id: this.comment._id, type })
    },
    thToggleReply: throttle('toggleReply', 500),
    formatTime (date) {
      return { distance: getDateByTime(+new Date(date)), format: moment(date).format('YYYY-MM-DD HH:mm:ss') }
    },
    handleReply (params) {
      this.showReply = false
      this.$emit('reply', params)
    },
    /** reply组件回复的数据向上冒泡，提交到父组件的 @reply*/
    reply (params) {
      this.$emit('reply', params)
    }
  }
}
</script>
<style lang='scss' scoped>
.night {
  .content {
    .author {
      .name {
        color: rgba($color: #ccc, $alpha: 0.6);
      }
      .time,
      .replyed {
        color: #666;
      }
      .text {
        color: #999;
      }
    }
    .actions {
      li {
        color: inherit;
      }
    }
  }
}
.comment {
  padding: 10px 0;
}

.content {
  .author {
    margin-bottom: 8px;
    .name {
      color: rgba(0, 0, 0, 0.45);
      transition: color 1s;
    }
    .time,
    .replyed {
      color: #ccc;
      transition: color 1s;
    }
    .text {
      transition: color 1s;
      color: #333;
    }
  }
  .actions {
    display: flex;
    li {
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.45);
      height: 20px;
      line-height: 20px;
      margin-right: 15px;
      transition: color .3s;
      font-size: 13px;
      user-select: none;
      cursor: pointer;
      &:hover {
        color: #595959;
      }
    }
    .like {
      top: -14px;
      left: -14px;
      width: 50px;
      height: 50px;
      background: url('../../assets/images/likes.png') no-repeat;
      background-position: left;
      background-size: cover;

      &.active {
        background-position: right;
        transition: background 0.6s steps(28);
      }
    }
  }
}
</style>
