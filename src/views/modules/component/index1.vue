<template>
  <d2-container class="page">
    <div class="home">
      <div class="h-head" />
      <div class="h-body" />
    </div>

  </d2-container>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {

    }
  },
  created() {
    // this.getSysInfo()
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.home{

}
.page {
  p {
    &:first-child {
      margin-top: 0px;
    }
    b {
      color: $color-text-main;
      margin-right: 10px;
    }
    span {
      color: $color-text-normal;
    }
  }
}
</style>
