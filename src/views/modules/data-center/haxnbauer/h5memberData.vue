<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('member.HmemList.h5register') }}</h3>
    <!-- 调组件 -->
    <memberList />
  </d2-container>
</template>
<script>
import memberList from './component'
export default {
  components: { memberList },
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

