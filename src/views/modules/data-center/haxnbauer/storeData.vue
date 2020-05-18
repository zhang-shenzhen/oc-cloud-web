<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('member.HmemList.storeData') }}</h3>

    <el-dialog :title="$t('data')+' '+$t('statistical')" :visible.sync="dialogTableVisible" width="70%">
      <el-form :model="shopItem" label-width="160px">
        <el-form-item :label="$t('member.HmemList.ageGroup')" style="margin-bottom:20px;">
          <el-table
            :data="shopItem.ageDOData"
            style="width: 100%"
          >
            <el-table-column
              prop="tenToTwenty"
              :label="$t('member.HmemList.below')"
            />
            <el-table-column
              prop="twentyOneToThirty"
              label="20-30"
            />
            <el-table-column
              prop="thirtyOneToForty"
              label="30-40"
            />
            <el-table-column
              prop="fortyOneToFifty"
              label="40-50"
            />
            <el-table-column
              prop="fiftyOneToSixty"
              label="50-60"
            />
            <el-table-column
              prop="sixtyOneToSeventy"
              :label="$t('member.HmemList.over')"
            />
          </el-table>
        </el-form-item>
        <el-form-item :label="$t('member.HmemList.genderProp')" style="margin-bottom:20px;">
          <el-table
            :data="shopItem.sexRatioDOData"
            style="width: 100%"
          >
            <el-table-column
              prop="woman"
              :label="$t('user.gender1')+'（'+$t('npe')+'）'"
            />
            <el-table-column
              prop="man"
              :label="$t('user.gender0')+'（'+$t('npe')+'）'"
            />
            <el-table-column
              prop="unknown"
              :label="$t('member.HmemList.unGender')+'（'+$t('npe')+'）'"
            />
            <el-table-column
              prop="womanRatio"
              :label="$t('user.gender1')+'（'+$t('member.HmemList.bili')+'）'"
            />
            <el-table-column
              prop="manRatio"
              :label="$t('user.gender0')+'（'+$t('member.HmemList.bili')+'）'"
            />
            <el-table-column
              prop="unknownRatio"
              :label="$t('member.HmemList.unGender')+'（'+$t('member.HmemList.bili')+'）'"
            />
          </el-table>
        </el-form-item>
        <el-form-item :label="$t('member.HmemList.PayNum')" style="margin-bottom:20px;">
          <el-date-picker
            v-model="value1"
            type="daterange"
            :range-separator="$t('datePicker.range')"
            :start-placeholder="$t('datePicker.start')"
            :end-placeholder="$t('datePicker.end')"
            style="height:35px"
            @change="toDataChange"
          />
          <el-table
            :data="storeTime"
            style="width: 100%"
          >
            <el-table-column
              prop="one"
              :label="'0-6 '+$t('member.HmemList.hour')"
            />
            <el-table-column
              prop="two"
              :label="'6-12 '+$t('member.HmemList.hour')"
            />
            <el-table-column
              prop="theer"
              :label="'12-18 '+$t('member.HmemList.hour')"
            />
            <el-table-column
              prop="four"
              :label="'18-24 '+$t('member.HmemList.hour')"
            />
          </el-table>
        </el-form-item>
        <el-form-item :label="$t('member.HmemList.dishData')" style="margin-bottom:20px;">
          <el-table :data="gridData">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item :label="$t('member.HmemList.ageGroup')">
                    <div>10-20：{{ props.row.ageDO?props.row.ageDO.tenToTwenty:'0' }} {{ $t('npe') }}</div>
                    <div>20-30：{{ props.row.ageDO?props.row.ageDO.twentyOneToThirty:'0' }} {{ $t('npe') }}</div>
                    <div>30-40：{{ props.row.ageDO?props.row.ageDO.thirtyOneToForty:'0' }} {{ $t('npe') }}</div>
                    <div>40-50：{{ props.row.ageDO?props.row.ageDO.fortyOneToFifty:'0' }} {{ $t('npe') }}</div>
                    <div>50-60：{{ props.row.ageDO?props.row.ageDO.fiftyOneToSixty:'0' }} {{ $t('npe') }}</div>
                    <div>60-70：{{ props.row.ageDO?props.row.ageDO.sixtyOneToSeventy:'0' }} {{ $t('npe') }}</div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column property="name" :label="$t('member.HmemList.dishName')" />
            <el-table-column property="price" :label="$t('member.HmemList.price')" />
            <el-table-column property="memberPrice" :label="$t('mem')+' '+$t('member.HmemList.price')" />
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
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        :label="$t('store.storeID')"
        prop="shopId"
      />
      <el-table-column
        :label="$t('store.storeName')"
        prop="name"
      />
      <el-table-column
        :label="$t('store.address')"
        prop="address"
      />
      <el-table-column
        fixed="right"
        :label="$t('handle')"
        width="300"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="expandChange(scope.row)">{{ $t('member.HmemList.detailData') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

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
import { getStoreList, getStoreData, getStoreMenu, getStoreTime } from '@/api/haxnbauerData/data'
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      menuList: [],
      dialogTableVisible: false,
      gridData: [],
      shopItem: {},
      dialogCurrentPage: 1,
      dialogTotal: 0,
      value1: '',
      storeTime: []
    }
  },
  watch: { // 实时检测
    storeTime(idx) { // 实时监听index的变化
      console.log(idx) // 在这里你可以再根据idx的值，做出其它的操作
    }
  },
  created() {
    this.getListData(1)
  },
  methods: {
    getListData(page) {
      this.currentPage = page
      getStoreList('?page=' + page + '&size=10').then(res => {
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },

    getMenuList(page) {
      getStoreMenu('?page=' + page + '&size=10' + '&entityId=' + this.entityId).then(res => {
        this.gridData = res.data.data
        this.dialogTotal = res.data.total
      })
    },
    expandChange(row) {
      this.dialogTableVisible = true
      this.entityId = row.entityId
      this.value1 = ''
      this.storeTime = []
      getStoreData('?entityId=' + row.entityId).then(res => {
        this.shopItem = res.data
        if (this.shopItem.ageDO != null) {
          this.shopItem.ageDOData = []
          this.shopItem.ageDOData.push(this.shopItem.ageDO)
        }
        if (this.shopItem.sexRatioDO != null) {
          this.shopItem.sexRatioDO.manRatio = this.toPercent(this.shopItem.sexRatioDO.manRatio)
          this.shopItem.sexRatioDO.unknownRatio = this.toPercent(this.shopItem.sexRatioDO.unknownRatio)
          this.shopItem.sexRatioDO.womanRatio = this.toPercent(this.shopItem.sexRatioDO.womanRatio)
          this.shopItem.sexRatioDOData = []
          this.shopItem.sexRatioDOData.push(this.shopItem.sexRatioDO)
        }
      })
      this.getMenuList(1)
    },
    toPercent(point) {
      if (point == 0) {
        return 0
      }
      var str = Number(point * 100).toFixed()
      str += '%'
      return str
    },
    p(s) {
      return s < 10 ? '0' + s : s
    },
    toDataChange() {
      this.storeTime = []
      var storeItem = {
        one: 0,
        two: 0,
        theer: 0,
        four: 0
      }
      const begin = new Date(this.value1[0])
      const beginTime = begin.getFullYear() + '-' + this.p((begin.getMonth() + 1)) + '-' + this.p(begin.getDate())
      const end = new Date(this.value1[1])
      const endTime = end.getFullYear() + '-' + this.p((end.getMonth() + 1)) + '-' + this.p(end.getDate())
      getStoreTime('?entityId=' + this.entityId + '&date=' + beginTime + '&endDate=' + endTime).then(res => {
        res.data.forEach((item, index) => {
          if (item.hour < 6) {
            storeItem.one += item.count
          }
          if (item.hour < 12 && item.hour >= 6) {
            storeItem.two += item.count
          }
          if (item.hour < 18 && item.hour >= 12) {
            storeItem.theer += item.count
          }
          if (item.hour < 24 && item.hour >= 18) {
            storeItem.four += item.count
          }
        })
        this.storeTime.push(storeItem)
        console.log(res, this.storeTime)
      })
    },
    dialogHandleCurrentChange(e) {
      this.getMenuList(e)
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleCurrentChange(e) {
      this.getListData(e)
    }
  }
}
</script>
<style>
.el-date-editor .el-range__icon{
  line-height:28px;
}
.el-date-editor .el-range-separator{
  line-height:28px
}
</style>
