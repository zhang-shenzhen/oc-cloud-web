<template>
  <d2-container class="page">
    <div class="contant">
      <div class="left">
        <div
          v-for="(itme,index) in timeList"
          :key="index"
          style="margin:0 auto 15px  auto;width:90%;"
        >
          <el-button
            @click="timelineClick(index)"
            :type="itme.type"
            style="width:100%;"
            size="small"
          >{{itme.value}}</el-button>
        </div>
      </div>
      <div class="right">
        <ve-pie :extend="chartExtend" :settings="chartSettings" :data="chartData"></ve-pie>
      </div>
      <div style="clear:both"></div>
    </div>
  </d2-container>
</template>
<script>
import { dateList, industryList } from "@/api/surbanajurong/dataCenter";
export default {
  components: {},
  data() {
    this.chartSettings = {
      labelMap: {
        industrySegment: "Industry Segment",
        pursuit: "Pursuit"
      },
      legendName: {
        industrySegment: "状态"
      }
    };
    return {
      radioValue: 1,
      endData: null,
      timeList: [],
      chartData: {
        columns: ["industrySegment", "pursuit"],
        rows: []
      },
      chartExtend: {
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20
        }
      }
    };
  },
  computed: {},
  created() {
    this.getdateList();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getdateList() {
      dateList({}).then(res => {
        if (res.code == 0) {
          if (res.data) {
            this.endData = this.$formatDate(new Date(res.data), "yyyy");
            this.timeList = this.getDate(this.endData * 1 + 1);
            this.timeList[this.timeList.length - 2].type = "danger";
            this.getChartData(this.endData * 1);
          }
        }
      });
    },
    getDate(endData) {
      let list = [];
      for (let i = 2014; i <= endData; i++) {
        let option = {
          value: i,
          type: null
        };
        list.push(option);
      }
      return list;
    },
    getChartData(time) {
      industryList({
        year: time
      }).then(res => {
        if (res.code == 0) {
          this.chartData.rows = [];
          if (res.data) {
            let list = [];
            res.data.map(val => {
              list.push(val);
            });
            this.chartData.rows = list;
          }
        }
      });
    },
    timelineClick(index) {
      this.timeList.map(val => (val.type = null));
      this.timeList[index].type = "danger";
      this.getChartData(this.timeList[index].value * 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.contant {
  width: 100%;
  .left {
    width: 140px;
    box-sizing: border-box;
    float: left;
    margin-top:10px;
  }
  .right {
    width: calc(100% - 220px);
    float: left;
  }
}
</style>

