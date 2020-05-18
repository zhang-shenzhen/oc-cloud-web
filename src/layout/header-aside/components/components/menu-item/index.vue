<template>
  <el-menu-item :index="menu.name || uniqueId">
    <!-- <d2-icon-svg :name="menu.icon"/> -->
    <span slot="title" style="color:#f3f3f3">{{ menu.title }}</span>
  </el-menu-item>
</template>

<script>
import { uniqueId } from 'lodash'
export default {
  name: 'D2LayoutHeaderAsideMenuItem',
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
  }
}
</script>
