<template>
  <d2-container class="page">
    <h3 class="list-title">{{$t('financial.information')}}</h3>
    <el-row class="record-header">
      <el-col :span="8" :xs="24">
        <div class="header-box">
          <div class="header-centent">
            <p class="header-div-title">{{$t('financial.amountyesterday')}}</p>
            <p class="header-div-mey">￥{{BasicOption.yesterdayRecharge}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8" :xs="24">
        <div class="header-box">
          <div class="header-div"></div>
          <div class="header-centent">
            <p class="header-div-title">{{$t('financial.totalrecharge')}}</p>
            <p class="header-div-mey">￥{{BasicOption.totalRecharge}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8" :xs="24">
        <div class="header-box">
          <div class="header-div"></div>
          <div class="header-centent">
            <p class="header-div-title">{{$t('financial.totalconsumption')}}</p>
            <p class="header-div-mey">￥{{BasicOption.consumption}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('financial.consumption')" name="2"></el-tab-pane>
      <el-tab-pane :label="$t('financial.recharge')" name="1"></el-tab-pane>
    </el-tabs>
    <el-row class="select-store" v-if="!info.storeId">
      <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
        <el-form-item :label="activeTitle">
          <el-select v-model="formInline.storeId" clearable :placeholder="$t('oss.qcloudRegionTips')" @change="search">
            <el-option v-for="item in StoreList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('coupons.date')">
          <el-date-picker v-model="formInline.time" type="daterange" :range-separator="$t('datePicker.range')"
            :start-placeholder="$t('datePicker.start')" :end-placeholder="$t('datePicker.end')" format="yyyy-MM-dd"
            value-format="yyyy-MM-dd" @change="search">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column :label="$t('financial.SN')">
        <template slot-scope="scope">{{  scope.$index+1  }}</template>
      </el-table-column>
      <el-table-column :label="$t('news.content')">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column :label="$t('financial.Rechargestore')">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column :label="$t('store.price')">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column :label="$t('financial.Membername')">
        <template slot-scope="scope">{{ scope.row.memberName }}</template>
      </el-table-column>
      <!-- <el-table-column :label="$t('financial.Operator')">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column> -->
      <el-table-column :label="$t('t')">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="total"
        @current-change="handleCurrentChange" />
    </div>

  </d2-container>
</template>
<script>
import { TradingRecord, TradeInformation } from "@/api/financial/index";
import { StoreList } from '@/api/storeManagement/storeManagement';
import { mapState } from "vuex";
export default {
  name: 'record',
  components: {},
  data () {
    return {
      activeTitle: this.$t('financial.consumptionstore'),
      activeName: '2',
      currentPage: 1,
      total: 0,
      options: [],
      storeId: '',
      tableData: [],
      StoreList: [],
      BasicOption: {},
      formInline: {
        storeId: '',
        time: '',
      },
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    console.log(this.info, '拿到的当前登录人的信息')
    if (this.info.storeId) {
      this.formInline.storeId = this.info.storeId;
    }
    this.init();
    this.viewDetailsInterface(1);
    this.TradeInformationInterface();
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    init () {
      const sendData = {
        wechatId: this.info.ChannelId,
        sort: 'create_time;2',
        page: 1,
        size: 999
      }
      // 获取门店列表
      StoreList(sendData).then(res => {
        if (res.code == 0) {
          this.StoreList = res.data.data
        }
      })
    },
    search () {
      this.viewDetailsInterface(1);
    },
    // 基础信息接口
    TradeInformationInterface () {
      let option = {
        channelId: this.info.ChannelId
      }
      if (this.info.storeId) {
        option.accountStoreId = this.info.storeId;
      }
      TradeInformation(option).then(res => {
        if (res.code == 0) {
          console.log(res, '基础信息消费')
          this.BasicOption = res.data;
          this.BasicOption.consumption = this.toThousands(((res.data.consumption) / 100).toFixed(2));
          this.BasicOption.totalRecharge = this.toThousands(((res.data.totalRecharge) / 100).toFixed(2));
          this.BasicOption.yesterdayRecharge = this.toThousands(((res.data.yesterdayRecharge) / 100).toFixed(2));
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },
    // 查看详情列表接口
    viewDetailsInterface (e) {
      let option = {
        page: e,
        size: 10,
        type: this.activeName,
        accountStoreId: this.formInline.storeId,
      }
      if (this.formInline.time) {
        option.startTime = this.formInline.time[0];
        option.endTime = this.formInline.time[1];
      }
      console.log(option, '出来不')
      TradingRecord(option).then(res => {
        console.log('请求数据', res)
        if (res.code == 0) {
          if (res.data.data) {
            res.data.data.map(item => {
              item.money = ((item.money) / 100).toFixed(2);
              item.createTime = this.$formatDate(new Date(item.createTime), "yyyy-MM-dd hh:mm:ss");
            })
          }
          this.tableData = res.data.data;
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
    handleClick (tab, event) {
      if (this.activeName == 2) {
        this.activeTitle = this.$t('financial.consumptionstore')
      } else {
        this.activeTitle = this.$t('financial.Rechargestore')
      }
      this.viewDetailsInterface(1);
    },
    handleCurrentChange (e) {
      // 点击分页
      this.viewDetailsInterface(e);
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

