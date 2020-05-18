<template>
  <el-submenu :index="menu.name || uniqueId">
    <template slot="title">
      <d2-icon-svg v-if="menu.icon" :style="{fill:menu.fill||'#fff'}"  :name="menu.icon" />
      <span slot="title">{{ menu.title }}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <d2-layout-header-aside-menu-item v-if="child.children === undefined" :key="childIndex" :menu="child" />
      <d2-layout-header-aside-menu-sub v-else :key="childIndex" :menu="child" />
    </template>
  </el-submenu>
</template>

<script>
import { uniqueId } from 'lodash'
// 组件
import d2LayoutMainMenuItem from '../menu-item'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'D2LayoutHeaderAsideMenuSub',
  components: {
    'd2-layout-header-aside-menu-item': d2LayoutMainMenuItem
  },
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      uniqueId: uniqueId('d2-menu-empty-')
    }
  },
  computed: {
    ...mapGetters('d2admin', {
      themeActiveSetting: 'theme/activeSetting'
    })
  }
}
</script>
