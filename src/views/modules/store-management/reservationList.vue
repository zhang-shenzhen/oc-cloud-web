<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('store.reservationList') }}</h3>

    <el-row :gutter="24" style="margin-bottom:20px;">
      <el-col :span="5">
        <div class="grid-content">
          <div class="left">{{ $t('store.store') }}:</div>
          <div class="right">
            <el-select
              v-model="storeId"
              style="width:100%;"
              clearable
              :placeholder="$t('oss.qcloudRegionTips')"
              size="mini"
              @change="search"
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
      <el-col :span="5">
        <div class="grid-content">
          <div class="left">{{ $t('store.reservationType') }}:</div>
          <div class="right">
            <el-select
              v-model="state"
              style="width:100%;"
              clearable
              :placeholder="$t('oss.qcloudRegionTips')"
              size="mini"
              @change="search"
            >
              <el-option
                v-for="item in stateList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="5">
        <div class="grid-content">
          <div class="left">预约类型:</div>
          <div class="right">
            <el-select
              v-model="type"
              style="width:100%;"
              clearable
              placeholder="请选择"
              size="mini"
              @change="search"
            >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
        </div>
      </el-col> -->
      <el-col :span="5">
        <el-input
          v-model="name"
          :placeholder="$t('member.filter.fullName')"
          clearable
          size="mini"
          class="input-with-select"
          @clear="search"
        >
          <el-button
            slot="append"
            size="mini"
            icon="el-icon-search"
            @click="search"
          />
        </el-input>
      </el-col></el-row>

    <div class="controllan">
      <div>
        <table-mob
          ref="table_mob"
          :table-data="subscribeList"
          :table-config="tableConfig"
          :tabs-slots="f_tabsSlots"
        >
          <template v-slot:operating="operating">
            <el-button
              key="signin"
              type="text"
              size="mini"
              :disabled="operating.operating.state=='已取消'"
              @click="getStoreData('签到',operating.operating)"
            >{{ $t('c') }}</el-button>
            <el-button
              key="cancel"
              size="mini"
              type="text"
              @click="getStoreData('取消',operating.operating)"
            >{{ $t('cancel') }}</el-button>
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
import reservationListConfig from '@/tableConfigs/storeManagement/reservationListConfig'
import {
  StoreList,
  subscribeList,
  updateSubscribe
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
      StoreList: [],
      name: '',
      type: '',
      typeList: [],
      state: '',
      stateList: [
        {
          id: 1,
          name: '预约中'
        }, {
          id: 2,
          name: '已预约'
        }, {
          id: 3,
          name: '已取消'
        }
      ],
      addressValue: [],
      tableConfig: null,
      subscribeList: [],
      currentPage_t: 1,
      total_t: 0,
      f_tabsSlots: { operating: 'operating' } // 插槽
    }
  },
  computed: {},
  created() {
    this.tableConfig = reservationListConfig
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

      this.getSubscribeList(1)
    },
    // 获取预约列表
    getSubscribeList(page) {
      const sendData = {
        page: page,
        size: 10
      }

      if (!this.$isNull(this.name)) {
        sendData.name = this.name
      }

      if (!this.$isNull(this.type)) {
        sendData.type = this.type
      }

      if (!this.$isNull(this.state)) {
        sendData.state = this.state
      }

      if (!this.$isNull(this.storeId)) {
        sendData.storeId = this.storeId
      }

      if (this.$route.query.id) {
        sendData.idClerk = this.$route.query.id
      }

      subscribeList(sendData).then(res => {
        if (res.code == 0) {
          this.total_t = res.data.total
          this.currentPage_t = page
          if (res.data.data != null) {
            res.data.data.map((d, idx) => {
              d.createTime = d.createTime != null ? formatDate(new Date(d.createTime), 'yyyy-MM-dd') : ''
              d.sex = d.sex == 1 ? '男' : d.sex == 2 ? '女' : '未知'
              d.state = this.handleStatus(d.state)
            })
          } else {
            res.data.data = []
          }
          this.subscribeList = res.data.data
        }
      })
    },
    // 操作
    getStoreData(type, val) {
      console.log(val)
      var data = {
        'id': val.id,
        'idClerk': val.idClerk,
        'state': 2,
        'storeId': val.storeId,
        'type': val.type
      }
      if (type == '签到') {
        data.state = 2
      } else if (type == '取消') {
        data.state = 3
      }
      updateSubscribe(data).then(res => {
        if (res.code == 0) {
          this.$notify({
            title: this.$t('schedule.statusLog1'),
            message: this.$t('prompt.success'),
            type: 'success'
          })
          this.getSubscribeList(1)
        }
      })
    },
    // 搜索、清除、预约状态
    search() {
      this.getSubscribeList(1)
    },

    // 分页
    handleCurrentChange_t(e) {
      this.getSubscribeList(e)
    },
    // 状态判断
    handleStatus(status) {
      var msg = ''
      switch (status) {
        case 1:
          msg = '预约中'
          break
        case 2:
          msg = '已预约'
          break
        case 3:
          msg = '已取消'
          break
      }
      return msg
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
    width: 60px;
    line-height: 30px;
    color: #333333;
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

