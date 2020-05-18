<template>
 <d2-container class="page">
    <!-- 调产品组件 -->
    <MenuList  :projectName="'surbanajurong'" />
 </d2-container>
</template>
<script>

import MenuList from '../../../wechat/menu/component'
export default {
  name: 'surbanajurong-wechat-menu-list',
  components: { MenuList },
  data() {
    return {
       
    }
  },
  computed: {},
  created() {

  },
  mounted() { },
  beforeDestroy() { },
  methods: {
  
  }
}
</script>
<style lang="scss" scoped>
</style>

