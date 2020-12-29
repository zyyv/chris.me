<template>
  <div class="reply replyComponent">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="60px"
      size="small"
      hide-required-asterisk
    >
      <el-form-item prop="content">
        <div slot="label" class="text-center">
          <el-avatar v-if="userInfo" :src="userInfo.avatar"></el-avatar>
        </div>
        <el-input
          type="textarea"
          class="textarea"
          :placeholder="placeholder"
          :autosize="{ minRows: row, maxRows: row}"
          v-model="form.content"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="flex flex-between">
          <template v-if="type === 'msg'">
            <el-input
              style="max-width:200px"
              class="mr20"
              placeholder="取个nice的网名吧~~"
              v-model="form.name"
            ></el-input>
            <el-input
              style="max-width:200px"
              class="mr20"
              placeholder="Email 地址~~"
              v-model="form.email"
            ></el-input>
          </template>
          <el-button size="mini" type="primary" @click="onSubmit">reply</el-button>
        </div>
      </el-form-item>
    </el-form>
    <p v-if="type === 'msg'" class="remark">
      <span class="title">隐私说明：</span>您可以放心的输入，您的Email 地址不会被公开显示，您的 IP 地址会被保存，但只会公开显示您当前所在的城市名。
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'reply',
  props: {
    _id: { type: String, required: true },
    type: { type: String, required: true },
    row: { type: Number, default: 5 },
    placeholder: { type: String, default: '请您畅所欲言吧~~' }
  },
  data () {
    return {
      form: {
        content: '',
        name: '',
        email: ''
      },
      rules: {
        content: [
          { required: true, message: '是您的键盘坏了吗~·', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = { _id: this._id }
          if (this.type === 'cmt') {
            params.content = this.form.content
          } else {
            params = { ...params, ...this.form }
          }
          this.$emit('reply', params)
          this.form.content = ''
          return true
        }
        return false;
      });
    }
  }
}
</script>
<style lang='scss' scoped>
.night {
  .reply {
    .remark {
      color: #999;
    }
  }
}
.reply {
  &.replyComponent {
    transition: all 1s;
  }
  padding: 10px;
  border: 1px dotted #dcdfe6;
  border-radius: 4px;
  .el-form {
    .el-form-item:last-child {
      margin-bottom: 0;
    }
  }
  .remark {
    margin-top: 30px;
    padding: 0 10px 10px;
    line-height: 1.725;
    color: rgba(0, 0, 0, 0.6);
    transition: color 1s;
    .title {
      color: #fb7299;
    }
  }
}
</style>
