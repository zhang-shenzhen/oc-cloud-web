<template>
  <d2-container class="page">
    <h3 class="list-title">签到统计</h3>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" size="mini" style="width: 100%" max-height="500">
          <el-table-column label="会员号">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.memberInfo.memberCardNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="会员手机号">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.memberInfo.phoneNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="签到时间">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="签到赠送">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.awardInfo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="累计签到">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.cumulativeDays }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 页数 -->
    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </d2-container>
</template>
<script>
import { SigninData } from '@/api/marketing/signin'
import { formatDate } from '@/utils/index'
export default {
  components: {},
  data() {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      signin: {
        id: ''
      }
    }
  },
  computed: {},
  created() {
    this.signin.id = this.$route.query.id
    this.signinDataInterface(1)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    signinDataInterface(e) {
      // 列表数据接口
      const obj = {
        attendanceId: this.signin.id,
        page: e,
        size: 10
      }
      SigninData(obj).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            res.data.data.map(res => {
              res.memberInfo = JSON.parse(res.memberInfo)
              res.createTime = formatDate(
                new Date(res.createTime),
                'yyyy-MM-dd hh:mm:ss'
              )
            })
            this.tableData = res.data.data
          } else {
            this.tableData = []
          }
          this.total = res.data.total
        }
      })
    },
    handleCurrentChange(e) {
      // 点击页数
      this.signinDataInterface(e)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
