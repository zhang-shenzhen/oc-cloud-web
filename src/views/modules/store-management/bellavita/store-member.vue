<template>
  <d2-container class="page">
    <h3 class="list-title">门店会员</h3>
    <el-row>
      <el-col :span="8">
        <el-form label-width="120px">
          <el-form-item :label="$t('store.store')">
            <el-select v-model="storeId"
                       style="width:100%;"
                       clearable
                       :placeholder="$t('oss.qcloudRegionTips')"
                       size="mini"
                       @change="search">
              <el-option v-for="item in StoreList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column label="SN">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">{{ scope.row.memberName }}</template>
      </el-table-column>
      <el-table-column label="会员号">
        <template slot-scope="scope">{{ scope.row.memberCard }}</template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">{{ status[scope.row.sex] }}</template>
      </el-table-column>
      <el-table-column label="余额">
        <template slot-scope="scope">{{ scope.row.balance }}</template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination background
                       :current-page="currentPage"
                       layout="total, prev, pager, next, jumper"
                       :total="total"
                       @current-change="handleCurrentChange" />
      </div>
    </el-table>
  </d2-container>
</template>
<script>
import { ListMemberAccounts } from "@/api/financial/index";
import { StoreList } from '@/api/storeManagement/storeManagement';
import { mapState } from "vuex";
export default {
  name: 'Coupon',
  components: {},
  data () {
    return {
      currentPage: 1,
      total: 0,
      storeId: '',
      StoreList: [],
      tableData: [],
      status: {
        '1': '男',
        '2': '女',
      }
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    this.init()
    this.StoreInterface(1);
    console.log(this.info, 'dhudhdud')
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
    // 搜索门店
    search () {
      this.StoreInterface(1)
    },
    // 
    // 门店列表接口
    StoreInterface (e) {
      let option = {
        page: e,
        size: 10,
      }
      if (this.storeId) {
        option.storeId = this.storeId;
      }
      if (this.info.storeId) {
        option.storeId = this.info.storeId;
      }
      ListMemberAccounts(option).then(res => {
        console.log(res, '门店列表接口')
        if (res.code == 0) {
          if (res.data.data) {
            res.data.data.map(item => {
              item.balance = ((item.balance) / 100).toFixed(2);
            })
          }
          this.tableData = res.data.data;
          this.currentPage = res.data.page
          this.total = res.data.total
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },
    handleCurrentChange (e) {
      this.StoreInterface(e);
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

