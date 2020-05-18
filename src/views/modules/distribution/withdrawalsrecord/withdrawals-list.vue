<template>
  <d2-container class="page">
    <el-form label-position="left"
             size="mini"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item :label="$t('distri.with1')">
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
      <el-form-item :label="$t('distri.with2')">
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

    <div class="msg">
      <div class="top">
        <div :class="{'but':true,'border':type == 0?true:''}"
             @click="dianji(0)">
          {{ $t('distri.with11') }}
        </div>
        <div :class="{'but':true,'border':type == 1?true:''}"
             @click="dianji(1)">
          {{ $t('distri.with12') }}</div>

        <div :class="{'but':true,'border':type == 2?true:''}"
             @click="dianji(2)">
          {{ $t('distri.with13') }}</div>

        <div :class="{'but':true,'border':type == 3?true:''}"
             @click="dianji(3)">
          {{ $t('distri.with14') }}</div>

        <div :class="{'but':true,'border':type == 4?true:''}"
             @click="dianji(4)">
          {{ $t('distri.with15') }}</div>

        <div :class="{'but':true,'border':type == 5?true:''}"
             @click="dianji(5)">
          {{ $t('distri.with16') }}</div>
      </div>

      <el-table :data="changelist"
                style="width: 100%">
        <el-table-column :label="$t('distri.with1')">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>

        <el-table-column :label="$t('distri.with2')">
          <template slot-scope="scope">{{ scope.row.applyTime }}</template>
        </el-table-column>

        <el-table-column :label="$t('distri.with3')">
          <template slot-scope="scope">{{ scope.row.applyMoney }}</template>
        </el-table-column>

        <el-table-column :label="$t('distri.with4')">
          <template slot-scope="scope">{{ scope.row.commissionInfoList[0].realName }}</template>
        </el-table-column>

        <el-table-column :label="$t('distri.with5')">
          <template slot-scope="scope">
            {{ scope.row.commissionInfoList[0].bankName }}
          </template></el-table-column>
        <el-table-column :label="$t('distri.with6')">
          <template slot-scope="scope">{{ scope.row.commissionInfoList[0].account }}</template>
        </el-table-column>
        <el-table-column :label="$t('distri.with7')">
          <template slot-scope="scope">{{ scope.row.statusName }}</template>
        </el-table-column>

        <el-table-column :label="$t('handle')">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="details(scope.row,1)">{{ $t('distri.with8') }}</el-button>
            <el-button v-if="scope.row.status == 1"
                       size="mini"
                       type="text"
                       @click="shenpi(scope.row)">{{ $t('distri.with9') }}</el-button>
            <el-button v-if="scope.row.status == 2"
                       size="mini"
                       type="text"
                       @click="details(scope.row,2)">{{ $t('distri.with10') }}</el-button>
          </template>
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

    <!-- 审批 -->
    <el-dialog :title="$t('distri.with20')"
               :visible.sync="dialogVisible_kai"
               width="30%">
      <div>
        <el-form label-position="left"
                 size="mini"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item :label="$t('distri.with21')">
            <el-col :span="8">
              <el-input v-model="toExamine.approvalRemarks"
                        clearable />
            </el-col>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button size="mini"
                   @click="jujue()">{{ $t('distri.with17') }}</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="tongguo()">{{ $t('distri.x9') }}</el-button>
      </span>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog :title="$t('distri.with8')"
               :visible.sync="deldialogVisible_kai"
               width="30%">
      <div>
        <el-form label-position="left"
                 size="mini"
                 label-width="80px"
                 class="demo-ruleForm">
          <el-form-item :label="$t('distri.with1')">
            <el-col :span="8">
              <span>{{ detailsmsg.nickname }}</span>
            </el-col>
          </el-form-item>

          <el-form-item :label="$t('distri.with2')">
            <el-col :span="8">
              <span>{{ detailsmsg.applyTime }}</span>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('distri.with3')">
            <el-col :span="8">
              <span>{{ detailsmsg.applyMoney }}</span>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('distri.with4')">
            <el-col :span="8">
              <span>{{ detailsmsg.commissionInfoList[0].realName }}</span>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('distri.with5')">
            <el-col :span="8">
              <span>{{ detailsmsg.commissionInfoList[0].bankName }}</span>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('distri.with6')">
            <el-col :span="8">
              <span>{{ detailsmsg.commissionInfoList[0].account }}</span>
            </el-col>
          </el-form-item>

          <el-form-item :label="$t('distri.with21')">
            <el-col :span="8">
              <span>{{ detailsmsg.statusName }}</span>
            </el-col>
          </el-form-item>

        </el-form>
      </div>

      <span v-if="dtype == 2"
            slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   @click="surefk()">{{ $t('distri.with22') }}</el-button>
        <el-button size="mini"
                   @click="bohuifk()">{{ $t('distri.with23') }}</el-button>
      </span>
    </el-dialog>

  </d2-container>
</template>
<script>
import {
  cookieGet
} from '@/common/cookie'
import configUrl from '@/api/configUrl'
import { commissionApply, statuscommissionApply, detailcommissionApply } from '@/api/distribution/distribution'
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
      dialogVisible_kai: false,
      deldialogVisible_kai: false,
      type: '',
      toExamine: {
        id: 0,
        status: 0,
        approvalUserId: 1,
        approvalRemarks: ''
      },
      sgmsg: '',
      dtype: '',
      detailsmsg: {
        commissionInfoList: [
          {
            realName: '',
            bankName: '',
            account: ''

          }
        ]
      },
      fkmsg: {
        id: 0,
        lendingUserId: 1,
        status: 0
      },
      ChannelId: ''
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    const userInfo = localStorage.getItem('userInfo')
    this.toExamine.id = userInfo.id
    this.fkmsg.id = userInfo.id
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
      let url = '?channelId' + this.info.ChannelId + '&beginDate=' + this.beginDate + ' 00:00:00' + '&endDate=' + this.endDate + ' 23:59:59'
      if (this.nickname) {
        url += '&nickname=' + this.nickname
      }
      if (this.type && this.type != 0) {
        url += '&status=' + this.type
      }
      window.open(configUrl.ajax_url + 'member/commissionApply/export' + url)
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
      if (this.type && this.type != 0) {
        url += '&status=' + this.type
      }
      this.changelist = []
      commissionApply(url).then(res => {
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
    // 时间选择
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
    },
    // 点击详情
    details (item, type) {
      this.fkmsg.id = item.id
      this.deldialogVisible_kai = true
      this.dtype = type
      this.getdetail(item.id)
    },
    dianji (type) {
      this.type = type
      this.getchangelist(1)
    },
    // 通过审批
    tongguo () {
      this.toExamine.status = 2
      this.sgmsg = this.$t('distri.with18')
      this.getshenpi(this.toExamine)
    },
    // 拒绝审批
    jujue () {
      this.toExamine.status = 4
      this.sgmsg = this.$t('distri.with19')
      this.getshenpi(this.toExamine)
    },
    // 审批
    shenpi (item) {
      this.toExamine.id = item.id
      this.dialogVisible_kai = true
    },
    // 审批/放款
    getshenpi (item) {
      statuscommissionApply(item).then(res => {
        if (res.code === 0) {
          this.dialogVisible_kai = false
          this.deldialogVisible_kai = false
          this.$message({
            message: this.sgmsg,
            type: 'success'
          })
          this.getchangelist(1)
        } else {
          this.$message.error(res.message)
        }
      })
    },

    // 详情
    getdetail (id) {
      detailcommissionApply(id).then(res => {
        if (res.code === 0 && res.data) {
          this.detailsmsg = res.data.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 通过放款
    surefk () {
      this.fkmsg.status = 3
      this.sgmsg = this.$t('distri.with24')
      this.getshenpi(this.fkmsg)
    },
    // 驳回放款
    bohuifk () {
      this.fkmsg.status = 5
      this.sgmsg = this.$t('distri.with25')
      this.getshenpi(this.fkmsg)
    }

  }
}
</script>
<style lang="scss" scoped>
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
  width: auto;
  height: 50px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  padding: 20px;
}
.border {
  border-bottom: 1px solid #409eff;
}
</style>

