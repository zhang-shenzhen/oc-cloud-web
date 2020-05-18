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
        <ve-histogram :settings="chartSettings" :data="chartData"></ve-histogram>
        <el-table :data="chartData.rows" style="width: 100%">
          <el-table-column prop="status" label="Stage"></el-table-column>
          <el-table-column prop="pursuit" label="Pursuit"></el-table-column>
        </el-table>
      </div>
      <div style="clear:both"></div>
    </div>
  </d2-container>
</template>
<script>
import { dateList, pursuitList } from "@/api/surbanajurong/dataCenter";
export default {
  components: {},
  data() {
    this.chartSettings = {
      labelMap: {
        status: "Stage",
        pursuit: "Pursuit"
      },
      legendName: {
        status: "状态"
      }
    };
    return {
      radioValue: 1,
      endData: null,
      timeList: [],
      chartData: {
        columns: ["status", "pursuit"],
        rows: []
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
      pursuitList({
        year: time
      }).then(res => {
        if (res.code == 0) {
          this.chartData.rows = [];
          if (res.data) {
            let list = [];
            res.data.map(val =>{
               list.push(val)
            })
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
    margin-top: 50px;
  }
  .right {
    width: calc(100% - 220px);
    float: left;
  }
}
</style>

