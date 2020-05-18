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
        <div style="width:100%">
          <el-radio-group style="float:right;" v-model="radioValue"  size="mini">
            <el-radio-button label="1">¥</el-radio-button>
            <el-radio-button label="2">s$</el-radio-button>
          </el-radio-group>
        </div>
        <el-table :data="chartData.rows" style="width: 100%">
          <el-table-column prop="region" label="Region"></el-table-column>
          <el-table-column prop="securedProject" label="Secured Project"></el-table-column>
          <el-table-column label="Order Book">
            <template slot-scope="scope">
              <span v-if="radioValue == 1">¥{{scope.row.orderBook}}</span>
              <span v-if="radioValue == 2">S${{scope.row.orderBook_1}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="clear:both"></div>
    </div>
  </d2-container>
</template>
<script>
import { dateList, regionList ,rate} from "@/api/surbanajurong/dataCenter";
export default {
  components: {},
  data() {
    this.chartSettings = {
      labelMap: {
        securedProject: "Secured Project",
        orderBook: "Order Book"
      },
      legendName: {
        region: "区域"
      }
    };
    return {
      radioValue: 1,
      endData: null,
      timeList: [],
      chartData: {
        columns: ["region", "securedProject", "orderBook"],
        rows: []
      },
      rateValue:1
    };
  },
  computed: {},
  created() {
    this.getdateList();
    this.getrate();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getrate(){
      rate({}).then(res  => {
         if (res.code == 0) {
            this.rateValue = res.data;
         }
      })
    },
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
      regionList({
        year: time
      }).then(res => {
        if (res.code == 0) {
          this.chartData.rows = [];
          if (res.data) {
            let list = [];
            res.data.map(val =>{
               if(!val.orderBook){
                  val.orderBook = 0;
               }
               val.orderBook_1 = this.rateValue * val.orderBook;
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

