<template>
  <d2-container class="page">
    <!-- 调组件 -->
    <memberList />
  </d2-container>
</template>
<script>
import memberList from './component'
export default {
  name: 'MemberListCP',
  components: { memberList },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
