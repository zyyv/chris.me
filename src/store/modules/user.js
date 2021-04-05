import { getApi, postApi } from "@/api";
import { Notification, Message, MessageBox } from 'element-ui';

const user = {
  namespaced: true,
  state: {
    model: localStorage.getItem('model') === 'false' ? false : true, // false -> 'light'  true -> 'night' (是否夜间模式)
    token: localStorage.getItem('token'),
    blogerInfo: JSON.parse(localStorage.getItem('blogerInfo')) || {}, // 博主信息
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {} // 用户信息
  },
  mutations: {
    setModel(state) {
      const status = !state.model
      state.model = status
      localStorage.setItem('model', status + '')
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setBlogerInfo(state, blogerInfo) {
      state.blogerInfo = blogerInfo
      localStorage.setItem('blogerInfo', JSON.stringify(blogerInfo))
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  },
  actions: {
    /** 登录换取token */
    login({ commit }, params) {
      return new Promise((resolve, reject) => {
        postApi('/user/login', params).then(res => {
          Notification.closeAll()
          Notification({
            title: '登录成功',
            message: `<div class="flex fs0 flex-items-center">
                        <img class="mr5 radius-50" style="width:40px;height:40px" src="${res.data.userInfo.avatar}"/>
                        <span class="fs14">亲爱的${res.data.userInfo.name}，您好，欢迎回家</span>
                      </div>`,
            type: 'success',
            duration: 1500,
            dangerouslyUseHTMLString: true
          });
          commit('setToken', res.data.token)
          commit('setUserInfo', res.data.userInfo)
          resolve(res)
        }, err => reject(err))
      })
    },
    logout({ commit, dispatch }) {
      MessageBox.confirm('主人, 您确定要离开了吗?', '提示', {
        confirmButtonText: '爸爸走了',
        cancelButtonText: '再呆一会吧',
        type: 'warning',
        showClose: false
      }).then(() => {
        commit('setToken', null)
        localStorage.removeItem('token')
        Message({
          type: 'success',
          message: '爸爸再见~~'
        });
        dispatch('getTourist')
      }).catch(() => {
        Message({
          type: 'info',
          message: '您还是爱我的~~'
        });
      });
    },
    /** 获取超级管理信息 */
    loadSuperAdmin({ commit }) {
      return new Promise((resolve, reject) => {
        getApi('/user/superAdmin', {}).then(res => {
          commit('setBlogerInfo', res.data)
          resolve(res)
        }, err => reject(err))
      })
    },
    getTourist({ commit }) {
      return new Promise((resolve, reject) => {
        getApi('/user/getTourist', {}).then(res => {
          Notification.closeAll()
          Notification({
            duration: 1500,
            title: 'Tips',
            message: `<div class="flex fs0">
                        <img class="mr5 radius-50" style="width:40px;height:40px" src="${res.data.avatar}"/>
                        <span class="fs14">您将以游客的身份访问此网站，您的身份为${res.data.name}</span>
                      </div>`,
            type: 'info',
            dangerouslyUseHTMLString: true
          });
          commit('setUserInfo', res.data)
          resolve(res)
        }, err => reject(err))
      })
    }
  }
}
export default user