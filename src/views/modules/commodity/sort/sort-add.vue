<template>
  <d2-container class="page">
    <h3 class="list-title">{{$t('commodity.sort.addclass')}}</h3>
    <SortEdit :type="type"
              :cut="cut"
              :routerId="queryId"
              :routerType="level" />
  </d2-container>
</template>
<script>
import SortEdit from "@/components/sort/index";
export default {
  components: { SortEdit },
  data () {
    return {
      cut: 0,
      type: 0,
      indexImg: 0,
      queryId: 0,
      level: 0,
    }
  },
  computed: {},
  created () {
    let that = this;
    that.cut = that.$route.query.cut;
    that.queryId = that.$route.query.id; // 小于0为新增,大于或等于0为编辑
    that.level = that.$route.query.level;
    if (that.cut == 3) { // 品牌新增和编辑的时候不管那一级都只上传分类图片
      that.type = 3;
    } else {
      that.type = that.$route.query.type;
    }
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

