<template>
  <d2-container class="page">
    <h3 class="list-title">图文详情</h3>
    <el-row>
      <div class="page_title">阅读发展趋势</div>
      <el-select v-model="selectNumber" size="mini" placeholder="请选择" @change="sureSelect">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <ve-line :data="chartData" :legend-visible="false" :data-empty="dataEmpty"></ve-line>
    </el-row>
    <el-row>
      <div class="page_title">转化率</div>
      <ve-bar :data="barChartData"></ve-bar>
    </el-row>
  </d2-container>
</template>
<script>
import { graphicDetails } from "@/api/dataCenter/fansList";
export default {
  name: "ImageDetails",
  components: {},
  data() {
    return {
      selectNumber: "图文阅读人数",
      dataparment: [],
      options: [
        { value: "图文阅读人数", label: "图文阅读人数" },
        { value: "原文页阅读人数", label: "原文页阅读人数" },
        { value: "分享转发人数", label: "分享转发人数" },
        { value: "微信收藏人数", label: "微信收藏人数" }
      ],
      dataEmpty: false,
      chartData: {
        columns: ["time", "访问用户"],
        rows: []
      },
      barChartData: {
        columns: ["text", "一次传播"],
        rows: [
          { text: "送达", 一次传播: '' },
          { text: "公众号会话阅读", 一次传播: '' }
        ]
      }
    };
  },
  computed: {},
  created() {
    console.log(this.$route.query);
    this.graphicDetailsInterface(this.$route.query.id);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 没有数据此页面暂无编辑。
    sureSelect() {
      console.log(this.selectNumber);
      let dataList = [];
      this.chartData.columns[1] = this.selectNumber;
      this.dataparment.map(item => {
        let option = {};
        option["time"] = item.refDate;
        option[this.selectNumber] = item.intPageReadCount;
        dataList.push(option);
      });
      this.chartData.rows = dataList;
    },
    graphicDetailsInterface(id) {
      // 进入页面之后调取的接口
      let obj = {
        msgId: id,
        page: 1,
        size: 100
      };
      graphicDetails(obj).then(res => {
        if (res.code == 0) {
          this.dataparment = res.data.data;
          let sessionRead = 0; //公众号阅读总数
          if (this.selectNumber) {
            let dataList = [];
            this.chartData.columns[1] = this.selectNumber;
            this.dataparment.map(item => {
              let option = {};
              sessionRead += item.intPageReadCount;
              option["time"] = item.refDate;
              option[this.selectNumber] = item.intPageReadCount;
              dataList.push(option);
            });
            this.chartData.rows = dataList;
          }
          this.barChartData.rows[0]["一次传播"] = this.$route.query.send;
          this.barChartData.rows[1]["公众号会话阅读"] = sessionRead;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-row {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.page_title {
  font-size: 16px;
  margin: 10px 0;
}
</style>

