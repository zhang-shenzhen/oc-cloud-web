<template>
  <d2-container class="page">
    <!-- <toaster-container toaster-options="{'position-class': 'toast-top-right', 'close-button':true}"></toaster-container> -->
    <!-- 交互式报表 -->
    <div style="position: relative;">
        <iframe style="background:#eaeaea;" width="100%" height="800" src="https://app.powerbi.cn/view?r=eyJrIjoiMWUyYWU3ZTUtZGMzMi00ZmQ3LWIzN2UtYjRlYWE5ZmE4NGQ1IiwidCI6IjEyNzE3YTQ3LThmMTctNDU4Zi05ODE0LTgyNGI3ZGEwNDA5ZCJ9"  frameborder="0" allowFullScreen="true">
       </iframe>
        <div  style="width:300px;height:36px;background:#eaeaea;position: absolute;left: 0;bottom:5px;"></div>
      </div>
  </d2-container>
</template>
<script>

export default {
  name: 'FansPandect',
  components: {},
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

