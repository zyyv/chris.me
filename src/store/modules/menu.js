const menu = {
  namespaced: true,
  state: {
    openAside: true,
  },
  mutations: {
    setAside(state, status) {
      state.openAside = status
    }
  },
  actions: {

  }
}
export default menu