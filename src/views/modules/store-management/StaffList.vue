<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('store.clerkList') }}</h3>

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
        <el-input
          v-model="name"
          :placeholder="$t('store.clerkName')"
          clearable
          size="mini"
          class="input-with-select"
          @clear="search"
        >
          <el-button slot="append" size="mini" icon="el-icon-search" @click="search" />
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-button class="btn" size="mini" @click="outExcle()">{{ $t('store.clerkData') }}</el-button>
      </el-col>
    </el-row>
    <div>
      <el-button type="primary" style="margin-bottom:10px" class="btn" size="mini" @click="addStaff">{{ $t('store.addClerk') }}</el-button>
    </div>
    <div class="controllan">
      <div>
        <table-mob
          ref="table_mob"
          :table-data="clerkList"
          :table-config="tableConfig"
          :tabs-slots="f_tabsSlots"
        >
          <template v-slot:operating="operating">
            <el-button
              key="edit"
              type="text"
              size="mini"
              @click="getStoreData('编辑',operating.operating)"
            >{{ $t('edit') }}</el-button>
            <el-button
              key="del"
              size="mini"
              type="text"
              @click="getStoreData('删除',operating.operating)"
            >{{ $t('member.filter.delete') }}</el-button>
            <el-button
              key="comment"
              size="mini"
              type="text"
              @click="getStoreData('评论',operating.operating)"
            >{{ $t('store.comment') }}</el-button>
            <el-button
              key="order"
              size="mini"
              type="text"
              @click="getStoreData('预约',operating.operating)"
            >{{ $t('store.reservation') }}</el-button>
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
import StaffListTableConfit from '@/tableConfigs/storeManagement/StaffListTableConfit'
import { clerkList, deleteClerk, StoreList } from '@/api/storeManagement/storeManagement'
import configUrl from '@/api/configUrl'
import { mapState } from "vuex";
export default {
  name: 'StoreManagementList',
  components: { tableMob },
  data() {
    return {
      name: null,
      storeId: '',
      StoreList: [],
      addressValue: [],
      tableConfig: null,
      clerkList: [],
      currentPage_t: 1,
      total_t: 0,
      page: 1,
      f_tabsSlots: { operating: 'operating' } // 插槽
    }
  },
  computed: {
     ...mapState("d2admin/user", ["info"])
  },
  created() {
    this.tableConfig = StaffListTableConfit
    this.init()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 页面初始化
    init() {
      const sendData = {
        wechatId: this.info.ChannelId,
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
      if (this.$route.query.id) {
        this.storeId = this.$route.query.id
      }

      this.getClerkList(1)
    },
    // 获取店员列表数据
    getClerkList(page) {
      const sendData = {
        page: page,
        size: 10
      }
      if (!this.$isNull(this.name)) {
        sendData.name = this.name
      }

      if (!this.$isNull(this.storeId)) {
        sendData.storeId = this.storeId
      }

      clerkList(sendData).then(res => {
        this.clerkList = []
        if (res.code == 0) {
          this.total_t = res.data.total
          this.currentPage_t = page
          if (res.data.data != null) {
            res.data.data.map((val, index) => {
              val.grade = val.grade != null ? val.grade + '星' : 0 + '星'
            })
          } else {
            res.data.data = []
          }
          this.clerkList = res.data.data
        }
      })
    },
    // 操作
    getStoreData(type, val) {
      console.log(val)
      if (type == '编辑') {
        this.$router.push({
          name: 'storeManagement-addStaff',
          query: {
            id: val.id,
            type: 'edit'
          }
        })
      } else if (type == '删除') {
        this.$confirm('确定删除此店员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteClerk('?id=' + val.id).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success'
                })
                this.getClerkList(1)
              }
            })
          })
      } else if (type == '评论') {
        this.$router.push({
          name: 'storeManagement-commentList',
          query: {
            id: val.id
          }
        })
      } else if (type == '预约') {
        this.$router.push({
          name: 'storeManagement-reservationList',
          query: {
            id: val.id
          }
        })
      }
    },
    // 搜索、清除、选择门店
    search() {
      this.getClerkList(1)
    },
    // 添加店员
    addStaff() {
      this.$router.push({
        name: 'storeManagement-addStaff'
      })
    },
    // 分页
    handleCurrentChange_t(e) {
      this.page = e
      this.getClerkList(e)
    },
    // 导出店员数据
    outExcle() {
      const sendData = configUrl.ajax_url + 'user/store/clerk/excle/make?sort=create_time&page=' + this.page + '&size=999'
      console.log(sendData)
      window.location.href = sendData
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

