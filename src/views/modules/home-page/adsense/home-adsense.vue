<template>
  <d2-container class="page">
    <h3 class="list-title">热门分类</h3>
    <el-row>
      <HomePageList imgType="3" />
    </el-row>
  </d2-container>
</template>
<script>
import HomePageList from '../component-list'
export default {
  components: { HomePageList },
  data () {
    return {
    }
  },
  computed: {},
  created () {

  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
</style>

