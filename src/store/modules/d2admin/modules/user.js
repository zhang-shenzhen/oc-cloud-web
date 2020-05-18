export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    //存储会员列表的时间的
    allfilter:[],

  },
  mutations: {
    /**
     * @description 设置用户信息
     * @param {Object} state vuex state
     * @param {Boolean} active active
     */
    set(state, info) {
      // store 赋值
      state.info = info
      console.log(333, info)
    },
    setMemoryTimesTamp(state,allfilter){
      state.allfilter=[...state.allfilter,allfilter]
      console.log("vuex",state.allfilter)
    }
  },
  actions: {
    set_user({ dispatch, commit }, data) {
      return commit('set', data)
    }
  }

}
