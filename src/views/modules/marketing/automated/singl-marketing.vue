<template>
  <d2-container class="page">
    <!-- <h3 class="list-title">{{ $t('wechat.coupon.couponList') }}</h3> -->
     <el-row :gutter="20">
      <el-col :span="20">
        <singl :type="'start'" @claer="hide" @sendValue="eventData" />
      </el-col>
    </el-row>
  </d2-container>
</template>
<script>
//单次营销
import singl from "./draw-from/singl";
import { addFlow, saveAutomateStore } from "@/api/marketing/automated";
export default {
  name: "",
  components: { singl },
  data() {
    return {
    };
  },
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    hide() {
      this.$router.go(-1)
    },
    eventData(val) {
      console.log(val)
      addFlow(val).then(res => {
        if (res.code == 0) {
          val.id = res.data;
          saveAutomateStore(val).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success"
              });
              this.$router.push({
                name: "singl-marketing-draw",
                query: {
                  id: val.id
                }
              });
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

