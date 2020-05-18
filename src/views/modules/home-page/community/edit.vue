<template>
  <d2-container class="page">
    <h3 class="list-title">编辑社区</h3>
    <HomePage :imgType="type"
              :id="id" />
  </d2-container>
</template>
<script>
import HomePage from '../component'
export default {
  components: { HomePage },
  data () {
    return {
      type: 1,
      id: -10,
    }
  },
  computed: {},
  created () {
    this.type = this.$route.query.type
    this.id = this.$route.query.id
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

