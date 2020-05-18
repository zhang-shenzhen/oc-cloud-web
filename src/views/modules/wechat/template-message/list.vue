<template>
  <d2-container class="page">
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="模板消息"
                   name="first">
        <div v-if="activeName == 'first'"
             class="box">
          <templateMessage />
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的模板"
                   name="second">
        <div v-if="activeName == 'second'"
             class="box">
          <MyTemplateMessage />
        </div>
      </el-tab-pane>
    </el-tabs>
  </d2-container>
</template>
<script>

import templateMessage from './template-message'
import MyTemplateMessage from './my-template-message'

export default {
  name: 'TemplateMessageList',
  components: { templateMessage, MyTemplateMessage },
  data () {
    return {
      activeName: 'first'
    }
  },
  computed: {},
  created () {
    this.init()
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    init () {
      if (!this.$isNull(localStorage.getItem('templateMessage_activeName'))) {
        this.activeName = localStorage.getItem('templateMessage_activeName')
      }
    },
    handleClick () {
      localStorage.setItem('templateMessage_activeName', this.activeName)
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  margin-top: 10px;
}
</style>

