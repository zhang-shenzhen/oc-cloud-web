<template>
  <d2-container class="page">
    <!-- <h3 class="list-title">{{ $t('wechat.coupon.couponList') }}</h3> -->
    <el-row :gutter="20">
      <el-col :span="14">
        <eventFrom :type="'start'" @claer="hide" @sendValue="eventData" />
      </el-col>
    </el-row>
  </d2-container>
</template>
<script>
import eventFrom from "./draw-from/event-from";
import { addFlow, saveAutomateStore } from "@/api/marketing/automated";
export default {
  name: "MarketingAutomatedStartTrigger",
  components: { eventFrom },
  data() {
    return {
      sendData: {
        data: {
          data: null, // 流程图数据
          nodes: [] // /nodes结束
        },
        id: null,
        remark: null, // 备注
        title: null, // 自动化营销标题
        type: 1
      },
      sendNdes: []
    };
  },
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    hide() {
      this.$router.push({
        name: "marketing-Automated"
      });
    },
    eventData(val) {
      this.sendNdes = [];
      const option = {
        node: "node_h6fumt7up55", // 当前节点id
        last: false, // 是否为最后一个节点
        operations: [],
        trigger: val,
        pnode: "0", // 上节点id
        quote: false, // 是否为引用触发器
        triggerId: null // /触发器id
      };

      this.sendNdes.push(option);

      // 保存数据
      this.sendData.data.nodes = this.sendNdes;
      if (!this.$isNull(val.flowTitle)) {
        this.sendData.title = val.flowTitle;
      }

      if (!this.$isNull(val.remark)) {
        this.sendData.remark = val.remark;
      }
      this.sendData.loading = true;

      addFlow(this.sendData).then(res => {
        if (res.code == 0) {
          this.sendData.id = res.data;
          saveAutomateStore(this.sendData).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success"
              });
              this.$router.push({
                name: "marketing-Automated-draw",
                query: {
                  id: this.sendData.id
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

