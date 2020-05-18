<template>
  <d2-container class="page">
    <div class="caozuo">
      <el-button
        v-if="$Buttonpermissions('surbanajurong.website.tracking-list[add]')"
        type="primary"
        size="mini"
        @click="addTracking"
        >{{ $t('add') }}</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="num" :label="$t('website.tracking.tabel1')" />
      <el-table-column prop="title" :label="$t('website.tracking.tabel2')" />
      <el-table-column prop="url" :label="$t('website.tracking.tabel3')" />
      <el-table-column :label="$t('website.tracking.tabel4')">
        <template slot-scope="scope">{{
          $formatDate(new Date(scope.row.updateTime), 'yyyy-MM-dd hh:mm:ss')
        }}</template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('website.tracking.tabel5')">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="look(scope.row)"
            >{{ $t('look') }}</el-button
          >
          <el-button
            v-if="
              $Buttonpermissions('surbanajurong.website.tracking-list[update]')
            "
            type="text"
            size="small"
            @click.native.prevent="update(scope.row)"
            >{{ $t('update') }}</el-button
          >
          <el-button
            v-if="
              $Buttonpermissions(
                'surbanajurong.website.tracking-list[statistics]'
              )
            "
            type="text"
            size="small"
            @click.native.prevent="Statistics(scope.row)"
            >{{ $t('statistics') }}</el-button
          >
          <el-button
            v-if="
              $Buttonpermissions('surbanajurong.website.tracking-list[del]')
            "
            type="text"
            size="small"
            style="color:#f56c6c;"
            @click.native.prevent="del(scope.row)"
            >{{ $t('delete') }}</el-button
          >
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

    <el-dialog
      :title="$t('statistics')"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-row :gutter="24">
        <el-col style="margin-bottom:5px;" :span="15">
          <div class="grid-content1">
            <div class="left">{{ $t('startTime') }}</div>
            <div class="right">
              <el-date-picker
                v-model="beginDate"
                default-time="00:00:00"
                style="width:100%"
                size="small"
                type="datetime"
                placeholder="选择开始时间"
              />
            </div>
          </div>
        </el-col>
        <el-col style="margin-bottom:5px;" :span="15">
          <div class="grid-content1">
            <div class="left">{{ $t('endTime') }}</div>
            <div class="right">
              <el-date-picker
                v-model="endDate"
                style="width:100%"
                size="small"
                default-time="23:59:59"
                type="datetime"
                placeholder="选择开始时间"
              />
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <el-button type="primary" size="small" @click="search(1)">{{
            $t('search')
          }}</el-button>
          <el-button size="small" type="text" @click="modelexportData">{{
            $t('export')
          }}</el-button>
          <el-button size="small" type="text" @click="modelexportDataInfo"
            >导出详情</el-button
          >
        </el-col>
      </el-row>

      <el-table :data="modelData" style="width: 100%">
        <el-table-column prop="date" :label="$t('website.tracking.tabel6')" />
        <el-table-column prop="count" :label="$t('website.tracking.tabel7')" />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="m_currentPage"
          layout="total, prev, pager, next, jumper"
          :total="m_total"
          @current-change="m_handleCurrentChange"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">{{
          $t('cancel')
        }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  trackingList,
  trackingDel,
  statistics
} from '@/api/surbanajurong/website'
import configUrl from '@/api/configUrl'
export default {
  name: 'TrackingList',
  components: {},
  data() {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      dialogVisible: false,
      modelData: [],
      m_currentPage: 1,
      m_total: 0,
      details: null,
      beginDate: null,
      endDate: null
    }
  },
  computed: {},
  created() {
    this.list(1)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    addTracking() {
      this.$router.push({
        name: 'surbanajurong-website-add-tracking',
        query: {
          type: 'add'
        }
      })
    },
    list(page) {
      this.tableData = []
      trackingList({
        page: page,
        size: 10
      }).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            res.data.data.map((val, index) => {
              val.num = index + 1
              val.url =
                process.env.NODE_ENV == 'stage'
                  ? `https://stage.ocheng.me/h5/shengyu/#/pages/tracking/tracking?id=${val.id}`
                  : `https://scrm.ocheng.me/h5/shengyu/#/pages/tracking/tracking?id=${val.id}`
              this.tableData.push(val)
            })
          }
          this.currentPage = page
          this.total = res.data.total
        }
      })
    },
    look(item) {
      this.$router.push({
        name: 'surbanajurong-website-add-tracking',
        query: {
          id: item.id,
          type: 'look'
        }
      })
    },
    update(item) {
      this.$router.push({
        name: 'surbanajurong-website-add-tracking',
        query: {
          id: item.id,
          type: 'update'
        }
      })
    },
    del(item) {
      this.$confirm(this.$t('op_Click'), this.$t('reminder'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        trackingDel({ id: item.id }).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: this.$t('success'),
              message: this.$t('op_success'),
              type: 'success'
            })
            this.list(1)
          }
        })
      })
    },
    Statistics(item) {
      this.details = item
      const date = new Date()
      this.beginDate = date.getTime() - 3600 * 1000 * 24 * 30
      this.endDate = date.getTime()
      this.dialogVisible = true
      this.search(1)
    },
    handleCurrentChange(e) {
      this.list(e)
    },
    modelexportData() {
      const url =
        configUrl.webUrl +
        `/api/surbanajurong/article/export/statistics?page=${
          this.m_currentPage
        }&size=10&id=${this.details.id}&beginDate=${this.$formatDate(
          new Date(this.beginDate),
          'yyyy-MM-dd hh:mm:ss'
        )}&endDate=${this.$formatDate(
          new Date(this.endDate),
          'yyyy-MM-dd hh:mm:ss'
        )}`
      window.open(url)
    },
    modelexportDataInfo() {
      const url =
        configUrl.webUrl +
        `/api/surbanajurong/article/export/details/?beginDate=${this.$formatDate(
          new Date(this.beginDate),
          'yyyy-MM-dd hh:mm:ss'
        )}&endDate=${this.$formatDate(
          new Date(this.endDate),
          'yyyy-MM-dd hh:mm:ss'
        )}&id=${this.details.id}`
      window.open(url)
    },
    search(page) {
      this.modelData = []
      const data = {
        size: 10,
        page: page,
        beginDate: this.$formatDate(
          new Date(this.beginDate),
          'yyyy-MM-dd hh:mm:ss'
        ),
        endDate: this.$formatDate(
          new Date(this.endDate),
          'yyyy-MM-dd hh:mm:ss'
        ),
        id: this.details.id
      }
      statistics(data).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            this.modelData = res.data.data
          }
          this.m_currentPage = page
          this.m_total = res.data.total
        }
      })
    },
    m_handleCurrentChange(e) {
      this.search(e)
    }
  }
}
</script>
<style lang="scss" scoped>
.grid-content1 {
  width: 100%;
  display: flex;
  .left {
    width: 120px;
    height: 32px;
    line-height: 32px;
  }
  .right {
    flex: 1;
    height: 32px;
    line-height: 32px;
    color: #000000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
