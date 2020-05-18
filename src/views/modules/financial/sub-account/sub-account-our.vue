<template>
  <d2-container class="page">
    <h3 class="list-title">{{$t('financial.information')}}</h3>
    <el-row class="record-header">
      <el-col :span="8"
              :xs="24">
        <div class="header-box">
          <div class="header-centent">
            <p class="header-div-title">{{$t('financial.hasbeen')}}</p>
            <p class="header-div-mey">￥{{BasicOption.completed}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8"
              :xs="24">
        <div class="header-box">
          <div class="header-div"></div>
          <div class="header-centent">
            <p class="header-div-title">{{$t('financial.Waitingprocess')}}</p>
            <p class="header-div-mey">￥{{BasicOption.pending}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8"
              :xs="24">
        <div class="header-box">
          <div class="header-div"></div>
          <div class="header-centent">
            <p class="header-div-title">{{$t('financial.totalconsumptionmonth')}}</p>
            <p class="header-div-mey">￥{{BasicOption.total}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="select-store">
      <el-col :span="24">
        {{$t('financial.YearMonth')}}:
        <el-date-picker size="mini"
                        v-model="value2"
                        type="daterange"
                        @change="changedate"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
    </el-row>

    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column :label="$t('financial.SN')">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column :label="$t('financial.item')">
        <template slot-scope="scope">{{ scope.row.itemName }}</template>
      </el-table-column>
      <el-table-column :label="$t('financial.Consumerstore')">
        <template slot-scope="scope">{{ scope.row.accountStoreName }}</template>
      </el-table-column>
      <el-table-column :label="$t('store.price')">
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>
      <el-table-column :label="$t('schedule.status')">
        <template slot-scope="scope">{{ statusType[scope.row.status] }}</template>
      </el-table-column>
      <el-table-column :label="$t('t')">
        <template slot-scope="scope">{{ scope.row.startTime }}至{{scope.row.endTime}}</template>
      </el-table-column>
      <el-table-column :label="$t('handle')">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     v-if="scope.row.status==2 && scope.row.statusType==2 && isShowId"
                     @click="handleEdit(scope.$index, scope.row)">确 认</el-button>
          <el-button size="mini"
                     type="text"
                     @click="handleCheck(scope.$index, scope.row)">查 看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>
  </d2-container>
</template>
<script>
import { ListLedger, ReviseLedgerRecord, CollectingInformation } from "@/api/financial/index";
import { mapState } from "vuex";
export default {
  name: 'subAccount',
  components: {},
  data () {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      value2: '',
      parameter: {
        accountStoreId: '', // 账户所属门店id
        channelId: '', // 渠道id
        endTime: '', // 结束时间
        page: '', // 当前页码
        size: 10, // 每页数量
        specialAccountType: 2, // 分账类型 1跨店分账 2本店分账
        startTime: '', // 起始时间
      },
      isShowId: null,
      statusType: {
        '1': '待处理',
        '2': '确认中',
        '3': '已完成',
      },
      BasicOption: {},
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    this.parameter.channelId = this.info.ChannelId;
    this.isShowId = this.info.storeId // 为空的时候隐藏确认按钮
    this.ledgerRecordInterface(1);
    this.BasicInformationInterface();
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    // 基础信息接口 
    BasicInformationInterface () {
      let option = {};
      if (this.info.storeId) {
        option.accountStoreId = this.info.storeId;
        option.specialAccountType = 2;
      }
      CollectingInformation(option).then(res => {
        if (res.code == 0) {
          this.BasicOption = res.data;
          this.BasicOption.completed = this.toThousands(((res.data.completed) / 100).toFixed(2));
          this.BasicOption.pending = this.toThousands(((res.data.pending) / 100).toFixed(2));
          this.BasicOption.total = this.toThousands(((res.data.total) / 100).toFixed(2));
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },
    // 分账记录列表接口
    ledgerRecordInterface (e) {
      let optipon = {
        page: e,
        size: 10,
        channelId: this.info.ChannelId,
      }
      if (this.info.storeId) {
        optipon.accountStoreId = this.info.storeId;
        optipon.specialAccountType = 2;
      }
      if (this.value2) {
        optipon.startTime = this.value2[0];
        optipon.endTime = this.value2[1];
      }
      ListLedger(optipon).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            res.data.data.map(item => { // 86400000 一天的毫秒数
              item.amount = ((item.amount) / 100).toFixed(2);
              item.startTime = this.$formatDate(new Date(item.startTime), "yyyy-MM-dd");
              item.endTime = this.$formatDate(new Date(item.endTime), "yyyy-MM-dd");
              let endTimeDate = JSON.parse(JSON.stringify(item.startTime))
              let enddate = Date.parse(new Date(endTimeDate)) + 86400000 // 账单生成时间+1天(默认8点开始)
              let todaydate = new Date().getTime();
              item.statusType = 1;
              //（今天的账单最早在明天8:00才可以操作）
              if (todaydate > enddate) {
                item.statusType = 2;
              }
            })
          }
          this.tableData = res.data.data;
          console.log(this.tableData, 'this.tableDatathis.tableData')
          this.total = res.data.total;
          this.currentPage = res.data.page;
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },
    changedate () {
      // 点击选择日期
      // if (this.value2) {
      //   this.parameter.startTime = this.value2[0];
      //   this.parameter.endTime = this.value2[1];
      // } else {
      //   this.parameter.startTime = ''
      //   this.parameter.endTime = '';
      // }
      this.ledgerRecordInterface(1);
    },
    handleEdit (index, row) {
      console.log(index, row);
      this.$confirm("确定此操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ReviseLedgerRecord({ id: row.id, status: 3 }).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '收款成功',
                type: 'success'
              });
              this.ledgerRecordInterface(1);
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              });
            }
          });
        })
        .catch(() => { });
    },
    handleCheck (index, row) { // 查看
      console.log(index, row);
      row.specialAccountType = 2;
      sessionStorage.setItem('sub-account', JSON.stringify(row))
      this.$router.push({
        name: "financial-sub-account-look-up", // 路径
        query: {} // 参数
      });
    },
    handleCurrentChange (e) {
      // 点击分页

      this.ledgerRecordInterface(e);
    },
    toThousands (num) {
      let str = num.toString();
      let reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?:\d{3})+$/g
      return str.replace(reg, "$1,")
    }
  }
}
</script>
<style lang="scss" scoped>
.record-header {
  text-align: center;
  margin-bottom: 20px;
}
.header-box {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  .header-div {
    width: 1px;
    height: 100%;
    background-color: #999;
  }
  .header-centent {
    width: 100%;
    text-align: center;
    font-size: 18px;
  }
}
.select-store {
  margin: 20px 0;
}
</style>

