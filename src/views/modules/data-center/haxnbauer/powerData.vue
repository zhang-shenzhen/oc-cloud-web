<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('member.HmemList.powerData') }}</h3>
    <iframe id="child" name="child" :src="url1" width="100%" height="880" frameborder="0" scrolling="no" style="position:related;top: 2.8px;left: 0px;" />
  </d2-container>
</template>
<script>

export default {
  data() {
    return {
      url1: ''
    }
  },
  mounted() {},

  mounted() {
    this.url1 = 'https://app.powerbi.cn/view?r=eyJrIjoiNTJhNTc5MjUtNjMxOC00MzJiLThjZGQtODZhNzNkZTNiNjNiIiwidCI6IjUzYmZkMmYzLTdhMzgtNGM1MC04MDA1LTllYTRlYmZiODkyNSJ9'
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>

