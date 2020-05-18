<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('member.HmemList.erweihuoMember') }}</h3>

    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        :label="$t('member.filter.name')"
      />
      <el-table-column
        prop="mobile"
        :label="$t('member.filter.phoneNumber')"
      />
      <el-table-column
        prop="behaviourVO.haXnBauerShopVO.name"
        :label="$t('member.HmemList.favorShop')"
      />
      <el-table-column
        prop="behaviourVO.haXnBauerFoodVOS"
        :label="$t('member.HmemList.favorDishes')"
      />
      <el-table-column
        fixed="right"
        :label="$t('handle')"
        width="300"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(2,scope.row)">{{ $t('member.HmemList.memberbtn01') }}</el-button>
          <el-button type="text" size="small" @click="handleClick(1,scope.row)">{{ $t('member.HmemList.memberbtn02') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t('member.HmemList.payRecord')" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="shopName" :label="$t('store.storeName')" width="150" />
        <el-table-column property="count" :label="$t('member.HmemList.payNum')" />
        <el-table-column property="maxMoney" :label="$t('member.HmemList.payBig')" width="200" />
        <el-table-column property="avgMoney" :label="$t('member.HmemList.payAverage')" />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="dialogCurrentPage"
          layout="total, prev, pager, next, jumper"
          :total="dialogTotal"
          @current-change="dialogHandleCurrentChange"
        />
      </div>
    </el-dialog>

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
import { getMemberData, getMemberList, getMemberHave } from '@/api/haxnbauerData/data'
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      dialogCurrentPage: 1,
      total: 0,
      dialogTotal: 0,
      dialogTableVisible: false,
      gridData: ''
    }
  },
  created() {
    this.getListData(1)
  },
  methods: {
    getListData(page) {
      getMemberList('?page=' + page + '&size=10').then(res => {
        res.data.data.forEach((item, index) => {
          item.behaviourVO.haXnBauerFoodVOS = item.behaviourVO.haXnBauerFoodVOS ? item.behaviourVO.haXnBauerFoodVOS.map(i => {
            return i ? i.name : ''
          }) : ''

					  item.behaviourVO.haXnBauerFoodVOS = item.behaviourVO.haXnBauerFoodVOS ? item.behaviourVO.haXnBauerFoodVOS.join('、') : ''
          console.log(item.behaviourVO.haXnBauerFoodVOS)
        })
        this.tableData = res.data.data
        this.total = res.data.total
        console.log(res)
      })
    },
    handleClick(type, item) {
      this.type = type
      this.memberBrandId = item.memberBrandId
      getMemberHave('?page=1&size=10&memberBrandId=' + item.memberBrandId + '&yearOrMonth=' + type).then(res => {
        console.log(res)
        if (res.code == 0 && res.data.data != null) {
          this.gridData = res.data.data.data
          this.dialogTotal = res.data.data.total
          this.dialogTableVisible = true
        } else {
          this.$message('暂没有数据')
        }
      })
    },
    dialogHandleCurrentChange(e) {
      getMemberHave('?page=' + e + '&size=10&memberBrandId=' + this.memberBrandId + '&yearOrMonth=' + this.type).then(res => {
        console.log(res)
        if (res.code == 0 && res.data.data != null) {
          this.gridData = res.data.data
        }
      })
      this.dialogCurrentPage = page
    },
    handleCurrentChange(e) {
      this.getListData(e)
      this.currentPage = page
    }
  }
}
</script>
