<template>
  <d2-container class="page">
    <div class="msg">
      <div class="top">
        <div :class="{'but':true,'border':type == 1?true:''}"
             @click="dianji(1)">
          {{ $t('distri.butor11') }}
        </div>
        <div :class="{'but':true,'border':type == 2?true:''}"
             @click="dianji(2)">
          {{ $t('distri.butor12') }}</div>
      </div>
      <el-form label-position="left"
               size="mini"
               class="demo-ruleForm">

        <el-col :span="4">
          <div class="grid-content">
            <div class="right">
              <el-select v-model="choiceTime"
                         style="width:60%"
                         clearable
                         size="mini"
                         @change="timeChange">
                <el-option v-for="item in timechoose"
                           :key="item.value"
                           :label="item.name"
                           :value="item.value" />
              </el-select>
            </div>
          </div>
        </el-col>

        <el-col :span="10">
          <div class="grid-content">
            <div class="right">
              <el-date-picker v-model="time"
                              :disabled="istrue"
                              type="daterange"
                              :range-separator="$t('datePicker.range')"
                              :start-placeholder="$t('datePicker.start')"
                              :end-placeholder="$t('datePicker.end')"
                              style="height:28px;line-height:28px;padding:0 10px;width:300px;"
                              @change="dataChange" />
            </div>
          </div>
        </el-col>
        <el-button style="height: 30px;padding: 0 10px;"
                   type="primary"
                   @click="daochu()">{{ $t('distri.butor7') }}</el-button>

      </el-form>
      <el-table v-if="type==1"
                :data="selectLogisticelist"
                style="width: 100%">
        <el-table-column :label="$t('distri.search1')">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>

        <el-table-column :label="$t('distri.search2')">
          <template slot-scope="scope">{{ scope.row.money }}</template>
        </el-table-column>

        <el-table-column :label="$t('distri.search3')">
          <template slot-scope="scope">{{ scope.row.eventType }}</template>
        </el-table-column>

        <el-table-column :label="$t('distri.search4')">
          <template slot-scope="scope">
            <span v-if="scope.row.applyInfo!=null"> {{ $t('distri.search7') }}{{ scope.row.applyInfo.lendingCode }}</span>
            <span v-if="scope.row.orderInfo!=null"> {{ $t('distri.search8') }}{{ scope.row.orderInfo.orderNum }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('distri.search5')">
          <template slot-scope="scope">
            <span v-if="scope.row.applyInfo!=null"> {{ $t('distri.search9') }}{{ scope.row.applyInfo.userNickName }}</span>
            <span v-if="scope.row.orderInfo!=null"> {{ $t('distri.search10') }}{{ scope.row.nextCommissionName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('distri.search6')">
          <template slot-scope="scope">{{ $formatDate(new Date(scope.row.createTime), 'yyyy-MM-dd') }}</template>
        </el-table-column>
      </el-table>

      <el-table v-if="type==2"
                :data="selectLogisticelisttwo"
                style="width: 100%">
        <el-table-column :label="$t('distri.search11')">
          <template slot-scope="scope">{{ scope.row.applyMoney }}</template>
        </el-table-column>

        <el-table-column :label="$t('distri.search18')">
          <template slot-scope="scope">{{ scope.row.commissionInfoList[0].bankName }}{{ scope.row.commissionInfoList[0].account }}</template>
        </el-table-column>

        <el-table-column :label="$t('distri.search12')">
          <template slot-scope="scope">{{ scope.row.statusName }}</template>
        </el-table-column>
        <el-table-column :label="$t('distri.search13')">

          <template slot-scope="scope">{{ scope.row.approvalUser }}</template>
        </el-table-column>
        <el-table-column :label="$t('distri.search14')">
          <template slot-scope="scope">{{ $formatDate(new Date(scope.row.approvalTime), 'yyyy-MM-dd') }}</template>
        </el-table-column>

        <el-table-column :label="$t('distri.search15')">
          <template slot-scope="scope">{{ $formatDate(new Date(scope.row.lendingTime), 'yyyy-MM-dd') }}</template>
        </el-table-column>

        <el-table-column :label="$t('distri.search16')">

          <template slot-scope="scope">{{ scope.row.lendingUser }}</template>
        </el-table-column>
        <el-table-column :label="$t('distri.search17')">

          <template slot-scope="scope">{{ scope.row.lendingRemarks }}</template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination background
                       :current-page="currentPage"
                       layout="total, prev, pager, next, jumper"
                       :total="total"
                       @current-change="handleCurrentChange" />
      </div>

    </div>
  </d2-container>
</template>
<script>
import {
  cookieGet
} from '@/common/cookie'
import configUrl from '@/api/configUrl'
import { commissionApply, commissionLog } from '@/api/distribution/distribution'
import { mapState } from "vuex";
export default {
  name: 'Distributor',
  components: {},
  data () {
    return {
      istrue: true,
      dialogVisible_kai: false,
      ruleForm: {
        nickname: '',
        phoneNumber: '',
        minTotal: '',
        maxTotal: '',
        minUsed: '',
        maxUsed: ''
      },
      type: '',
      selectLogisticelist: [],
      selectLogisticelisttwo: [],
      keyword: null,
      total: 0,
      currentPage: 1,
      enterpriseName: '',
      backgroundUrl: null,
      memberBrandId: '',
      choiceTime: '1',
      time: '',
      beginDate: '',
      endDate: '',
      timechoose: [
        {
          name: this.$t('distri.time1'),
          value: '1'
        },
        {
          name: this.$t('distri.time2'),
          value: '2'
        },
        {
          name: this.$t('distri.time3'),
          value: '3'
        },
        {
          name: this.$t('distri.time4'),
          value: '4'
        }
      ],
      ChannelId: ''
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    // this.ChannelId = JSON.parse(cookieGet('Httpheader')).ChannelId
    this.memberBrandId = this.$route.query.id
    this.type = this.$route.query.type
    this.timeChange(1)
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    daochu () {
      const url = '?channelId=' + this.info.ChannelId + '&memberBrandId=' + this.memberBrandId + '&beginDate=' + this.beginDate + ' 00:00:00' + '&endDate=' + this.endDate + ' 23:59:59'
      if (this.type == 1) {
        window.open(configUrl.ajax_url + 'member/commissionLog/export' + url)
      } else if (this.type == 2) {
        window.open(configUrl.ajax_url + 'member/commissionApply/export' + url)
      }
    },
    dianji (type) {
      this.type = type
      this.commissionApply(1)
    },
    handleCurrentChange (e) {
      this.commissionApply(e)
    },
    dataChange (e) {
      this.endDate = this.$formatDate(new Date(e[1]), 'yyyy-MM-dd')
      this.beginDate = this.$formatDate(new Date(e[0]), 'yyyy-MM-dd')
      this.commissionApply(1)
    },
    // 明细查询
    commissionApply (page) {
      const url = 'page=' + page + '&size=10&channelId=' + this.info.ChannelId + '&memberBrandId=' + this.memberBrandId + '&choiceTime=' + this.choiceTime + '&beginDate=' + this.beginDate + ' 00:00:00' + '&endDate=' + this.endDate + ' 23:59:59'
      this.selectLogisticelist = []
      this.selectLogisticelisttwo = []
      if (this.type == 1) {
        commissionLog(url).then(res => {
          if (res.code === 0 && res.data) {
            this.total = res.data.count
            if (res.data.list && res.data.list.length > 0) {
              this.selectLogisticelist = res.data.list
            }
          } else {
            this.$message.error(res.message)
          }
        })
      } else if (this.type == 2) {
        commissionApply(url).then(res => {
          if (res.code === 0 && res.data) {
            this.total = res.data.count
            if (res.data.list && res.data.list.length > 0) {
              this.selectLogisticelisttwo = res.data.list
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    timeChange (e) {
      const date = new Date()
      if (e == 1) {
        this.istrue = true

        this.getDateRange(date, 365, true)
      } else if (e == 2) {
        this.istrue = true

        this.getDateRange(date, 30, true)
      } else if (e == 3) {
        this.istrue = true

        this.getDateRange(date, 7, true)
      } else if (e == 4) {
        this.istrue = false
      }
      this.commissionApply(1)
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
.img-upload {
  width: 150px;
  position: relative;
}
.upload-box {
  width: 100px;
  height: 100px;
  border: 1px dashed #dddddd;
  cursor: pointer;
}
.logoIcon {
  font-size: 40px;
  color: #dddddd;
  margin: 30px;
}
.msg {
  width: 100%;
  height: auto;
  border: 1px solid #ededed;
  box-sizing: border-box;
  padding: 0 20px;
}
.top {
  width: 100%;
  border-bottom: 1px solid #ededed;
  margin-bottom: 20px;
  overflow: hidden;
}
.but {
  width: 80px;
  height: 50px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.border {
  border-bottom: 1px solid #409eff;
}
</style>

