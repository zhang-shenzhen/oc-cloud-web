<template>
  <d2-container class="page">
    <div class="shortBackground">
      <div class="search-box">
        <el-col
          :span="24"
          class="bottom"
        >
          <span
            class="phone"
            style="margin-right: 30px;"
          >{{ $t('short.zhanghu') }}</span>
          <el-select
            v-model="accountId"
            style="width:18%;"
            clearable
            size="mini"
            @change="getsendList(1)"
          >
            <el-option
              v-for="item in accountTypeList"
              :key="item.id"
              :label="item.nick"
              :value="item.id"
            />
          </el-select>
        </el-col>

        <!-- <el-col
            :span="24"
            class="bottom"
          >
           <span class="phone" style="margin-right: 30px;">签名</span>
            <el-select
                v-model="searchInfo.account"
                style="width:62%;"
                clearable
                size="mini"
                @change="signTypeChange"

              >
              <el-option
                  v-for="item in shortTypeList"
                  :key="item.id"
                  :label="item.sign"
                  :value="item.id"
              />
           </el-select>
          </el-col> -->

        <!-- <el-col
            :span="24"
            class="bottom"
          >
           <span class="phone" style="margin-right: 30px;">接收状态</span>
            <el-select
                v-model="searchInfo.account"
                style="width:62%;"
                clearable
                size="mini"
                @change="statusTypeChange"
              >
              <el-option
                  v-for="item in statuslist"
                  :key="item"
                  :label="item"
                  :value="item"
              />
           </el-select>
          </el-col> -->
      </div>
      <div class="search-box">
        <div class="search-box-left">
          <span class="phone">{{ $t('short.phone') }}</span>
          <el-input
            v-model="searchName"
            size="mini"
          />
          <el-button
            type="primary"
            size="mini"
            class="search-box-left-btn"
            @click="getsendList(1)"
          >{{ $t('short.search') }}</el-button>
        </div>
        <div class="search-box-left">
          <span class="time">{{ $t('short.time') }}</span>
          <el-date-picker
            v-model="times"
            size="mini"
            type="daterange"
            :range-separator="$t('datePicker.range')"
            value-format="yyyy-MM-dd"
            :start-placeholder="$t('datePicker.start')"
            :end-placeholder="$t('datePicker.end')"
          />
          <el-button
            type="primary"
            size="mini"
            class="search-box-left-btn"
            @click="getsendList(1)"
          >{{ $t('short.search') }}</el-button>
        </div>
      </div>
      <table-mob
        ref="table_mob"
        :table-data="tableData"
        :table-config="tableConfig"
        :tabs-slots="f_tabsSlots"
        :tabs-on-c-list="f_tabsOnCList"
        @_selectionChange="getTabSelList"
        @_name="tabEvns"
        @_sex="tabEvns"
        @_operating="tabEvns"
      />

      <div class="pagination">
        <el-pagination
          background
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>

    </div>
  </d2-container>
</template>
<script>
import sendTableConfig from '@/tableConfigs/marketing/short/sendConfig'
import { sendmsg, account, noshortmsg } from '@/api/marketing/short'
import { formatDate } from '@/utils/index'

export default {
  name: 'ShortManagement',
  components: {},
  data() {
    return {
      accountTypeList: [],
      shortTypeList: [],
      statuslist: ['全部', '接收成功', '接收失败', '等待返回'],
      searchName: null,
      accountId: '',
      tableData: [],
      tableConfig: {},
      total: 0,
      currentPage: 1,
      page: 1,
      f_tabsOnCList: [], // 该tab的事件集合  @ k:key; mT:methodsType
      f_tabsSlots: { operating: '' }, // 插槽
      times: ['2018-12-01', '2030-12-01']
    }
  },
  computed: {
    // ...mapState('d2admin/user', ['info'])
  },
  created() {
    this.getsendList(1)
    this._initTab()
    this.getaccount()
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    getaccount() {
      account().then(res => {
        if (res.data.length > 0) {
          this.accountTypeList = res.data
        }
      })
      noshortmsg().then(res => {
        this.shortTypeList = res.data.data
      })
    },
    _initTab() {
      console.log('tableConfig', { ...sendTableConfig })
      // 对 memTableConfig 配置文件 进行 增加id处理;
      sendTableConfig.tabHeadConfig.map((d, idx) => {
        d.id = idx + 1
      })
      this.tableConfig = sendTableConfig
    },
    tabEvns(k, v) {
      console.log('setIngV', 'onC' + k, k, v)
      this[ 'onC' + k ](v) // 动态调用当前列表中的方法;
    },
    getTabSelList(v) {
      console.log('getTabSelList', v)
    },
    integralThis(type, v) {
      this.integralType = type
      console.log(type, v, 111111)
    },
    handleCurrentChange(e) {
      console.log('分页', e)
      this.getsendList(e)
    },
    getsendList(page) {
      console.log(this.accountId)
      var params = ''
      if (this.searchName && !this.accountId) {
        this.tableData = []
        params =
          '?page=' +
          page +
          '&size=10' +
          '&start_time=' +
          this.times[ 0 ] +
          ' 00:00:00' +
          '&end_time=' +
          this.times[ 1 ] +
          ' 23:59:59' +
          '&mobile=' +
          this.searchName
      } else if (!this.searchName && !this.accountId) {
        params =
          '?page=' +
          page +
          '&size=10' +
          '&start_time=' +
          this.times[ 0 ] +
          ' 00:00:00' +
          '&end_time=' +
          this.times[ 1 ] +
          ' 23:59:59'
      } else if (this.searchName && this.accountId) {
        params =
          '?page=' +
          page +
          '&size=10' +
          '&start_time=' +
          this.times[ 0 ] +
          ' 00:00:00' +
          '&end_time=' +
          this.times[ 1 ] +
          ' 23:59:59' +
          '&mobile=' +
          this.searchName +
          '&accountId=' +
          this.accountId
      } else if (!this.searchName && this.accountId) {
        params =
          '?page=' +
          page +
          '&size=10' +
          '&start_time=' +
          this.times[ 0 ] +
          ' 00:00:00' +
          '&end_time=' +
          this.times[ 1 ] +
          ' 23:59:59' +
          '&accountId=' +
          this.accountId
      }
      sendmsg(params).then(res => {
        console.log('记录列表', res)
        if (res.data != null && res.data.data != null && res.data.data.length > 0) {
          res.data.data.map(d => {
            d.send_status = d.send_status == 'SUCCESS' ? this.$t('short.success') : this.$t('short.fail')
            d.report_status = d.report_status == 'SUCCESS' ? this.$t('short.success') : this.$t('short.fail')
            d.send_time = formatDate(
              new Date(d.send_time),
              'yyyy-MM-dd hh:mm:ss'
            )
          })
          this.tableData = res.data.data
          this.total = res.data.total
        } else {
          this.tableData = []
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.shortBackground {
  .shortTotal {
    padding: 10px 15px;
    border: 1px solid rgba(0, 204, 255, 1);
    background: rgba(229, 246, 255, 1);
    color: #ccc;
    margin-bottom: 20px;
  }
  .search-box {
    display: flex;
    margin-bottom: 20px;
    .search-box-left {
      display: flex;
      margin-right: 150px;
      .phone {
        width: 80px;
        height: 30px;
        line-height: 30px;
      }
      .time {
        width: 70px;
        height: 30px;
        line-height: 30px;
      }
      .search-box-left-btn {
        text-align: center;
        height: 30px;
        color: #fff;
        // background: #66b1ff;
        // margin-left: -5px;
        border: none;
      }
    }
    .search-box-right {
      line-height: 28px;
      .search-box-right-title {
        margin-right: 20px;
        color: #606266;
      }
    }
  }

  .tab-head-btn {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 20px 0;
  }
}
</style>
