<template>
  <div id="app">
    <keep-alive :include="keepAlive"  >
      <router-view  />
    </keep-alive>
  </div>
</template>

<script>
import { cookieSet } from '@/common/cookie'
import { messages } from '@/i18n'
import { mapState } from 'vuex'
export default {
  name: 'App',
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  computed: {
    ...mapState('d2admin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse
    })
  },
  created() {
    this.i18nHandle(this.$i18n.locale)
    // console.log('process.env.VUE_APP_NODE_SHOWTYPE',process.env.VUE_APP_NODE_SHOWTYPE)
    this.$store.state.VUE_APP_NODE_SHOWTYPE = process.env.VUE_APP_NODE_SHOWTYPE
    // console.log('this.$store.state.VUE_APP_NODE_SHOWTYPE',this.$store.state.VUE_APP_NODE_SHOWTYPE)
  },
  methods: {
    i18nHandle(val, oldVal) {
      cookieSet('language', val)
      document.querySelector('html').setAttribute('lang', val)
      document.title = messages[val].brand.lg
      // 非登录页面，切换语言刷新页面
      if (this.$route.name !== 'login' && oldVal) {
        window.location.reload()
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
body {
  overflow: auto !important;
}
#app {
  font-weight: normal;
  font-size: 12px !important;
}
.tabBackground {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  margin: 10px;
}
.d2-layout-header-aside-group
  .d2-layout-header-aside-content
  .d2-theme-container
  .d2-theme-container-main
  .d2-theme-container-main-body
  .container-component
  .d2-container-full
  .d2-container-full__body {
  margin: 10px !important;
  border-radius: 10px;
}

.list-title {
  color: #000;
}
</style>
