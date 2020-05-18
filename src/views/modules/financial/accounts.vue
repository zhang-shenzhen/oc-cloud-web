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
        <!-- <el-date-picker size="mini"
                        v-model="value2"
                        type="date"
                        :placeholder="$t('order.date')"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
        </el-date-picker> -->
        <!-- <el-date-picker size="mini"
                        v-model="value2"
                        type="month"
                        :placeholder="$t('order.date')">
        </el-date-picker> -->
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
          <!-- <el-button size="mini"
                     type="text"
                     @click="handleEdit(scope.$index, scope.row)">确认</el-button> -->
          <el-button size="mini"
                     type="text"
                     @click="handleCheck(scope.$index, scope.row)">查看</el-button>
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
import { ListLedger, CollectingInformation } from "@/api/financial/index";
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
      BasicOption: {},
      statusType: {
        '1': '待处理',
        '2': '确认中',
        '3': '已完成',
      },
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    console.log(this.info, '拿到的用户信息')
    this.parameter.channelId = this.info.ChannelId;
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
        optipon.accountStoreId = this.info.storeId;
      }
      CollectingInformation(option).then(res => {
        if (res.code == 0) {
          this.BasicOption = res.data;
          this.BasicOption.completed = this.toThousands(((res.data.completed) / 100).toFixed(2));
          this.BasicOption.pending = this.toThousands(((res.data.pending) / 100).toFixed(2));
          this.BasicOption.total = this.toThousands(((res.data.total) / 100).toFixed(2));
          console.log(res, '这些是基础信息参数')
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
      if (this.value2) {
        optipon.startTime = this.value2[0];
        optipon.endTime = this.value2[1];
      }
      ListLedger(optipon).then(res => {
        if (res.code == 0) {
          res.data.data.map(item => {
            item.amount = ((item.amount) / 100).toFixed(2);
            item.createTime = this.$formatDate(new Date(item.createTime), "yyyy-MM-dd");
            item.startTime = this.$formatDate(new Date(item.startTime), "yyyy-MM-dd hh:mm:ss");
            item.endTime = this.$formatDate(new Date(item.endTime), "yyyy-MM-dd hh:mm:ss");
          })
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.currentPage = res.data.page;
          console.log(this.tableData, '出现吧')
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
      console.log(this.value2, '日期')
      if (this.value2) {
        this.parameter.startTime = this.value2[0];
        this.parameter.endTime = this.value2[1];
      } else {
        this.parameter.startTime = ''
        this.parameter.endTime = '';
      }

      this.ledgerRecordInterface(1);
    },
    // handleEdit (index, row) {
    //   console.log(index, row);
    // },
    handleCheck (index, row) { // 查看
      console.log(index, row);
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

