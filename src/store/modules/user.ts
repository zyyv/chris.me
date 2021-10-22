import { Module } from 'vuex'
import type { RootStateTypes, UserStateTypes } from '@/types'

const user: Module<UserStateTypes, RootStateTypes> = {
  namespaced: true,
  state: () => ({
    token: `getToken()`,
    userInfo: {}, // 用户信息
    roleType: `getRoleType` ?? '',
    userBtn: []
  }),
  mutations: {
    // setToken(state, token: string | null) {
    //   state.token = token
    //   setToken(token ?? '')
    // },
    // setUserInfo(state, userInfo: IUser) {
    //   state.userInfo = userInfo
    //   setUserInfo(userInfo)
    // },
    // setRoleType(state, roleType: string) {
    //   state.roleType = roleType
    //   setRoleType(roleType)
    // },
    // setUserBtn(state, userBtns: any) {
    //   state.userBtn = userBtns
    //   setUserBtn(userBtns)
    // }
  },
  actions: {
    async login({ commit, dispatch }, data: any) {
      //   return accountLogin(data).then(async ({  }) => {
      //     // ;(window as any).$message.success('登录成功')
      //     setTimeout(() => {
      //       router.replace('/')
      //     }, 1000)
      //     return data
      //   })
    }
  }
}

export default user
