// Vue
import Vue from 'vue'
import App from './App'
// i18n
import i18n from '@/i18n'
// 核心插件
import d2Admin from '@/plugin/d2admin'
import VCharts from 'v-charts'
// store
import store from '@/store/index'
// [ 可选组件 ]D2-Crud
import D2Crud from '@d2-projects/d2-crud'
// 菜单和路由设置
import router from './router'

import configUrl from './api/configUrl'
// 引用mock
// import './mock.js'
// 复制
import VueClipboard from 'vue-clipboard2'

import {
  formatDate,
  notifyFrame
} from '@/utils'
// 全局混入前端视图渠道屏蔽
import showTypeModule from '@/mixins/showType-module'

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
// 全局注册tableMob
import tableMob from '@/components/GPMob/tableMob'
Vue.component('table-mob', tableMob)
// 全局注册formMob
import formMob from '@/components/GPMob/formMob'
Vue.component('form-mob', formMob)

Vue.use(VueClipboard)
// 核心插件
Vue.use(d2Admin)
// 可选插件组件
Vue.use(D2Crud)

Vue.use(VCharts)

function notify_Frame(message, type) {
  /**
   * 成功 success
   * 警告 warning
   */
  Vue.prototype.$notify({
    title: type ? '成功' : '警告',
    message: message,
    type: type ? 'success' : 'warning'
  });
}
Vue.prototype.$notifyFrame = notify_Frame /* 提示框*/
Vue.prototype.$formatDate = formatDate /* 时间转换*/
Vue.prototype.$fileUrl = () => configUrl.showFile // 文件Url1
Vue.prototype.$baseUrl = () => configUrl.webUrl // 基础Url
Vue.prototype.$ImageUrl = () => configUrl.upload // 上传图片URl

Vue.prototype.$isNull = function isNull(str) {
  if (str === '' || str === undefined || str == null) {
    return true
  }
  return false
}
Vue.prototype.$CheckGate = () => configUrl.CheckGate
Vue.prototype.$materialUrl = () => configUrl.material_upload
Vue.prototype.$getChannelId = () => configUrl.channelId

Vue.prototype.$confirmDel = (str, callfn = () => true) => {
  Vue.prototype
    .$confirm(str, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .then(() => {
      callfn()
    })
    .catch(() => {
      Vue.prototype.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
}


// 按钮权限
Vue.prototype.$Buttonpermissions = function Buttonpermissions(str) {
  let show = false
  const projectName = localStorage.getItem('projectName')
  if (projectName == 'surbanajurong') {
    const buttonPermission = localStorage.getItem('buttonPermission')
    if (buttonPermission) {
      const data = JSON.parse(buttonPermission)
      if (data[str] != '' && data[str] != undefined && data[str] != null) {
        show = true
      }
    }
  } else {
    show = true
  }
  return show
}

localStorage.setItem('view-path', window.location.pathname)

Vue.mixin({
  ...showTypeModule
})
new Vue({
  i18n,
  router,
  store,
  mounted() {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  render: h => h(App)
}).$mount('#app')

// 环境变量测试
// console.log('3333环境变量测试process.env.SHOW_TYPE',{...process.env})