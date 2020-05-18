<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('store.commentList') }}</h3>

    <el-row :gutter="24" style="margin-bottom:20px;">
      <el-col :span="5">
        <div class="grid-content">
          <div class="left">{{ $t('store.storeSelect') }}:</div>
          <div class="right">
            <el-select
              v-model="storeId"
              style="width:100%;"
              clearable
              :placeholder="$t('oss.qcloudRegionTips')"
              size="mini"
              @change="dataChange"
            >
              <el-option
                v-for="item in StoreList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="left" style="width:60px;">{{ $t('t') }}:</div>
          <div class="right">
            <el-date-picker
              v-model="time"
              type="daterange"
              :range-separator="$t('datePicker.range')"
              :start-placeholder="$t('datePicker.start')"
              :end-placeholder="$t('datePicker.end')"
              style="height:28px;line-height:28px;padding:0 10px;width:250px;"
              @change="dataChange"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <div class="left">{{ $t('store.commentScore') }}:</div>
          <div class="right">
            <el-select
              v-model="grade"
              style="width:100%;"
              clearable
              :placeholder="$t('oss.qcloudRegionTips')"
              size="mini"
              @change="dataChange"
            >
              <el-option
                v-for="item in gradeList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <div>
      <el-button
        class="btn"
        size="mini"
        type="primary"
        style="margin-bottom:10px"
        @click="callImportBox(1)"
      >{{ $t('store.allUpdata') }}</el-button>
      <el-button
        class="btn"
        size="mini"
        type="primary"
        style="margin-bottom:10px"
        @click="callImportBox(2)"
      >{{ $t('store.allDelete') }}</el-button>
    </div>
    <div class="controllan">
      <div>
        <!-- <tableMob
          ref="table_mob_one"
          :table-data="StoreList"
          :table-config="tableConfig"
          @sendData="getStoreData"
        />-->
        <table-mob
          ref="table_mob"
          :table-data="commentList"
          :table-config="tableConfig"
          :tabs-slots="f_tabsSlots"
          @_selectionChange="selectionChange"
        >
          <template v-slot:operating="operating">
            <el-button
              key="del"
              type="text"
              size="mini"
              @click="getStoreData('删除',operating.operating)"
            >{{ $t('delete') }}</el-button>
            <el-button
              key="release"
              size="mini"
              type="text"
              @click="getStoreData('发布',operating.operating)"
            >{{ $t('wechat.menu.btn2') }}</el-button>
          </template>

        </table-mob>
        <div class="pagination">
          <el-pagination
            background
            :current-page="currentPage_t"
            layout="total, prev, pager, next, jumper"
            :total="total_t"
            @current-change="handleCurrentChange_t"
          />
        </div>
      </div>
    </div>
  </d2-container>
</template>
<script>
import tableMob from '@/components/GPMob/tableMob'
import commentListTableConfit from '@/tableConfigs/storeManagement/commentListTableConfit'
import {
  commentList,
  StoreList,
  commentPublish,
  deleteComment,
  deleteComments,
  commentPublishs
} from '@/api/storeManagement/storeManagement'
import {
  formatDate
} from '@/utils/index'

export default {
  name: 'StoreManagementList',
  components: { tableMob },
  data() {
    return {
      storeId: '',
      tableConfig: null,
      commentList: [],
      StoreList: [],
      currentPage_t: 1,
      total_t: 0,
      copyItem: null,
      time: '',
      gradeList: [1, 2, 3, 4, 5],
      grade: '',
      multipleSelection: [],
      f_tabsSlots: { operating: 'operating' }, // 插槽
      operatorId: '' // 操作人ID
    }
  },
  computed: {},
  created() {
    this.tableConfig = commentListTableConfit
    this.init()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 页面初始化
    init() {
      const sendData = {
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

      this.getCommentList(1)
    },
    // 评论列表查询
    getCommentList(page) {
      const sendData = {
        sort: 'create_time;2',
        page: page,
        size: 10
      }

      if (!this.$isNull(this.storeId)) {
        sendData.storeId = this.storeId
      }

      if (!this.$isNull(this.$route.query.id)) {
        sendData.idClerk = this.$route.query.id
      }

      if (!this.$isNull(this.time)) {
        console.log(this.time)
        sendData.startTime = this.time[0].getFullYear() + '-' + (this.time[0].getMonth() + 1) + '-' + this.time[0].getDate()
        sendData.endTime = this.time[1].getFullYear() + '-' + (this.time[1].getMonth() + 1) + '-' + this.time[1].getDate()
        // sendData.startTime = this.startTime
      }

      if (!this.$isNull(this.grade)) {
        sendData.grade = this.grade
      }

      commentList(sendData).then(res => {
        if (res.code == 0) {
          this.total_t = res.data.total
          this.currentPage_t = page
          if (res.data.data != null) {
            res.data.data.map((d, idx) => {
              d.createTime = d.createTime != null ? formatDate(new Date(d.createTime), 'yyyy-MM-dd') : ''
              d.grade = d.grade != null ? d.grade + '星' : 0 + '星'
            })
          } else {
            res.data.data = []
          }
          this.commentList = res.data.data
          this.operatorId = this.commentList[0].operatorId
        }
      })
    },
    // 操作
    getStoreData(type, val) {
      console.log(val)
      if (type == '发布') {
        const sendData = {
          'comment': val.comment,
          'grade': parseInt(val.grade),
          'id': val.id,
          'idClerk': val.idClerk,
          'memberId': val.memberId,
          'memberName': val.memberName,
          'operatorId': val.operatorId,
          'picture': val.picture,
          'state': val.state,
          'storeId': val.storeId
        }
        this.$confirm(this.$t('store.releaseComment'), this.$t('tip'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        })
          .then(() => {
            commentPublish(sendData).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('schedule.statusLog1'),
                  message: this.$t('prompt.success'),
                  type: 'success'
                })
                this.getCommentList(1)
              }
            })
          })
      } else if (type == '删除') {
        this.$confirm(this.$t('store.delComment'), this.$t('tip'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        })
          .then(() => {
            deleteComment('?id=' + val.id).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('schedule.statusLog1'),
                  message: this.$t('prompt.success'),
                  type: 'success'
                })
                this.getCommentList(1)
              }
            })
          })
      }
    },
    // 搜索条件改变
    dataChange() {
      this.getCommentList(1)
    },
    handleCurrentChange_t(e) {
      this.getCommentList(e)
    },
    // 选择事件
    selectionChange(val) {
      this.multipleSelection = val.map((item, index) => {
        return item.id
      })
      console.log(this.multipleSelection)
    },
    // 批量操作
    callImportBox(index) {
      if (this.multipleSelection.length <= 0) {
        this.$message(this.$t('store.releasePloher'))
        return
      }
      this.$confirm(this.$t('store.allbranch'), this.$t('tip'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          if (index == 1) {
            commentPublishs('/' + this.operatorId, this.multipleSelection).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('schedule.statusLog1'),
                  message: this.$t('prompt.success'),
                  type: 'success'
                })
                this.getCommentList(1)
              }
            })
          } else {
            deleteComments(this.multipleSelection).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('schedule.statusLog1'),
                  message: this.$t('prompt.success'),
                  type: 'success'
                })
                this.getCommentList(1)
              }
            })
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.grid-content {
  width: 100%;
  height: 35px;
  display: flex;
  .left {
    width: 100px;
    line-height: 30px;
    color: #333333;
    text-align: right;
    margin-right: 10px;
  }
  .right {
    flex: 1;
  }
}
.grid-content1 {
  width: 100%;
  height: 35px;
  text-align: right;
}
.controllan {
  width: 100%;
  .left {
    width: 200px;
    float: left;
  }
  .right {
    width: calc(100% - 220px);
    float: left;
  }
}
</style>

