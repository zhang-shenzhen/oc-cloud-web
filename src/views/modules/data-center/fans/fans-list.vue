<template>
  <d2-container class="page">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="粉丝总览"
        name="fansOverview"
      >
        <div v-if="activeName == 'fansOverview'">
          <fansPandect />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="粉丝增长"
        name="fansGrowth"
      >
        <div v-if="activeName == 'fansGrowth'">
          <fansGrowthData />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="属性分析"
        name="analyze"
      >
        <div v-if="activeName == 'analyze'">
          <fansAttribute />
        </div>
      </el-tab-pane>
    </el-tabs>
  </d2-container>
</template>
<script>
import fansPandect from './fans-pandect'
import fansGrowthData from './fans-growth-data'
import fansAttribute from './fans-attribute'
export default {
  name: 'Coupon',
  components: { fansPandect, fansGrowthData, fansAttribute },
  data() {
    return {
      activeName: 'fansOverview'
    }
  },
  computed: {},
  created() { },
  mounted() { },
  beforeDestroy() { },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

