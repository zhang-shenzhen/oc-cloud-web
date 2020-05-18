<template>
    <d2-container class="page">
    <!-- 调产品组件 -->
    <GroupPage  :projectName="'surbanajurong'"/>
    </d2-container>
</template>
<script>
import GroupPage from '../../../wechat/group-messages/component'
export default {
  components: { GroupPage },
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

