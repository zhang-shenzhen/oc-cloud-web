<template>
  <d2-container class="page">
    <h3 class="list-title">{{$t('home.banner.manage')}}</h3>
    <el-row>
      <HomePageList imgType="1" />
    </el-row>
  </d2-container>
</template>
<script>
import HomePageList from '../component-list'
export default {
  components: { HomePageList },
  data () {
    return {
      tableData: [],
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

