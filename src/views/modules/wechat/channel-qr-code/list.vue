<template>
   <d2-container class="page">
    <!-- 调组件 -->
    <channelQrCode />
   </d2-container>
</template>
<script>
import channelQrCode from './component'
export default {
  name: 'wechat-qrcode-list',
  components: { channelQrCode },
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

