<template>
    <d2-container class="page">
    <!-- 调产品组件 -->
    <channelQrCode  :projectName="'surbanajurong'" />
    </d2-container>
</template>
<script>
import channelQrCode from '../../../wechat/channel-qr-code/component'
export default {
  name: 'surbanajurong-wechat-qrcode-list',
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

