import {
  capsuleLog
} from '@/common/log'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state vuex state
     */
    versionShow() {
      capsuleLog('D2Admin', `v${process.env.VUE_APP_VERSION}`)
    }
  }
}
