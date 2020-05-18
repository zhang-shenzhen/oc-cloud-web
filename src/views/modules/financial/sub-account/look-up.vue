<template>
  <d2-container class="page">
    <h3 class="list-title">详情</h3>
    <div>总金额：{{totalAmount}}</div>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column :label="$t('financial.SN')">
        <template slot-scope="scope">{{  scope.$index+1  }}</template>
      </el-table-column>
      <el-table-column :label="$t('financial.item')">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column :label="$t('financial.Consumerstore')">
        <template slot-scope="scope">{{ scope.row.accountStoreName }}</template>
      </el-table-column>
      <el-table-column :label="$t('store.price')">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column label="会员名称">
        <template slot-scope="scope">{{ scope.row.memberName }}</template>
      </el-table-column>
      <el-table-column :label="$t('t')">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
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
    <!-- <div class="pagination">
      总金额：123
    </div> -->
  </d2-container>
</template>
<script>
import { TradingRecord } from "@/api/financial/index";
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
      subOption: null,
      totalAmount: null,
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    this.subOption = JSON.parse(sessionStorage.getItem('sub-account'));
    console.log(this.subOption, this.info, ' this.subOoption this.subOoption this.subOoption')
    this.viewDetailsInterface(1);
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {

    // 查看详情列表接口
    viewDetailsInterface (e) {
      let option = {
        page: e,
        size: 10,
        type: 2,
        startTime: this.subOption.startTime,
        endTime: this.subOption.endTime,
        accountStoreId: this.info.storeId,
        specialAccountType: this.subOption.specialAccountType,
      }
      TradingRecord(option).then(res => {
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
          this.totalAmount = this.subOption.amount
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },



    handleDelete (index, row) { // 删除
      console.log(index, row);
      this.$confirm("确定删除此条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log('点击确认')
        })
        .catch(() => {
          console.log('点击删除')
        });
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

