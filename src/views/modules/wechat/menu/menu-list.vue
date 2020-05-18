<template>
   <d2-container class="page">
    <!-- 调组件 -->
    <MenuList />
   </d2-container>
</template>
<script>

import MenuList from './component'
export default {
  name: 'wechat-menu-list',
  components: { MenuList },
  data() {
    return {
       Api:{}
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

