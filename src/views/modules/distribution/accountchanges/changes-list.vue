<template>
  <d2-container class="page">
    <el-form label-position="left"
             size="mini"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item :label="$t('distri.butor1')">
        <el-col :span="16">
          <el-input v-model="nickname"
                    style="width:20%;margin-right:10px"
                    clearable />
          <el-button type="primary"
                     @click="search()">{{ $t('distri.butor8') }}</el-button>
          <el-button type="primary"
                     @click="clear()">{{ $t('distri.butor6') }}</el-button>
          <el-button type="primary"
                     @click="daochu()">{{ $t('distri.butor7') }}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('distri.change1')">
        <el-col :span="10">
          <div class="grid-content">
            <div class="right">
              <el-date-picker v-model="time"
                              type="daterange"
                              :range-separator="$t('datePicker.range')"
                              :start-placeholder="$t('datePicker.start')"
                              :end-placeholder="$t('datePicker.end')"
                              style="height:28px;line-height:28px;padding:0 10px;width:300px;"
                              @change="dataChange" />
            </div>
          </div>
        </el-col>
      </el-form-item>
    </el-form>

    <el-table :data="changelist"
              style="width: 100%">
      <el-table-column :label="$t('distri.change2')">
        <template slot-scope="scope">{{ scope.row.commissionName }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.change3')">
        <template slot-scope="scope">{{ scope.row.orderInfo.orderNum }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.change4')">
        <template slot-scope="scope">{{ scope.row.orderInfo.memberName }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.change5')">
        <template slot-scope="scope">{{ scope.row.orderInfo.totalPay }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.change6')">
        <template slot-scope="scope">
          <span v-if="scope.row.status ==1">{{ $t('distri.sta1') }}</span>
          <span v-if="scope.row.status ==2">{{ $t('distri.sta2') }}</span>
          <span v-if="scope.row.status ==3">{{ $t('distri.sta3') }}</span>
          <span v-if="scope.row.status ==4">{{ $t('distri.sta4') }}</span>
          <span v-if="scope.row.status ==5">{{ $t('distri.sta5') }}</span>
          <span v-if="scope.row.status ==6">{{ $t('distri.sta6') }}</span>
          <span v-if="scope.row.status ==7">{{ $t('distri.sta7') }}</span>
          <span v-if="scope.row.status ==8">{{ $t('distri.sta8') }}</span>
          <span v-if="scope.row.status ==9">{{ $t('distri.sta9') }}</span>
          <span v-if="scope.row.status ==10">{{ $t('distri.sta5') }}</span>
          <span v-if="scope.row.status ==11">{{ $t('distri.sta11') }}</span>
          <span v-if="scope.row.status ==12">{{ $t('distri.sta12') }}</span>
        </template></el-table-column>
      <el-table-column :label="$t('distri.change7')">
        <template slot-scope="scope">
          <span v-if="scope.row.relationship == 0">{{ $t('distri.sta13') }}</span>
          <span v-if="scope.row.relationship == 1">{{ $t('distri.sta14') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('distri.change8')">
        <template slot-scope="scope">{{ scope.row.commissionProportion }}%</template>
      </el-table-column>
      <el-table-column :label="$t('distri.change9')">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
    </el-table>

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
import {
  cookieGet
} from '@/common/cookie'
import configUrl from '@/api/configUrl'
import { commissionLogOrderPage } from '@/api/distribution/distribution'
import { mapState } from "vuex";
export default {
  name: 'Distributor',
  components: {},
  data () {
    return {
      time: '',
      changelist: [],
      total: 0,
      currentPage: 1,
      nickname: '',
      beginDate: '',
      endDate: '',
      date: new Date(),
      ChannelId: ''
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    // this.ChannelId = JSON.parse(cookieGet('Httpheader')).ChannelId
    this.getDateRange(this.date, 30, true)
    this.getchangelist(1)
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    search () {
      this.getchangelist(1)
    },
    clear () {
      this.nickname = ''
      this.getDateRange(this.date, 30, true)
    },
    daochu () {
      let url = '?channelId=' + this.info.ChannelId + '&beginDate=' + this.beginDate + ' 00:00:00' + '&endDate=' + this.endDate + ' 23:59:59'
      if (this.nickname) {
        url += '&nickname=' + this.nickname
      }
      window.open(configUrl.ajax_url + 'gasfun/commissionLog/commissionLogOrderExport' + url)
    },
    handleCurrentChange (e) {
      this.getchangelist(e)
    },
    dataChange (e) {
      this.endDate = this.$formatDate(new Date(e[1]), 'yyyy-MM-dd')
      this.beginDate = this.$formatDate(new Date(e[0]), 'yyyy-MM-dd')
    },
    // 账变明细查询
    getchangelist (page) {
      let url = '?page=' + page + '&size=10&channelId=' + this.info.ChannelId + '&beginDate=' + this.beginDate + ' 00:00:00' + '&endDate=' + this.endDate + ' 23:59:59'
      if (this.nickname) {
        url += '&nickname=' + this.nickname
      }
      this.changelist = []
      commissionLogOrderPage(url).then(res => {
        if (res.code === 0 && res.data) {
          this.total = res.data.count
          if (res.data.list && res.data.list.length > 0) {
            this.changelist = res.data.list
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },

    getDateRange (dateNow, intervalDays, bolPastTime) {
      const oneDayTime = 24 * 60 * 60 * 1000
      let lastDay
      if (bolPastTime == true) {
        lastDay = new Date(dateNow.getTime() - intervalDays * oneDayTime)
        this.endDate = this.$formatDate(new Date(dateNow), 'yyyy-MM-dd')
        this.beginDate = this.$formatDate(new Date(lastDay), 'yyyy-MM-dd')
      } else {
        lastDay = new Date(dateNow.getTime() + intervalDays * oneDayTime)
        this.endDate = this.$formatDate(new Date(dateNow), 'yyyy-MM-dd')
        this.beginDate = this.$formatDate(new Date(lastDay), 'yyyy-MM-dd')
      }
      this.time = [this.beginDate, this.endDate]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

