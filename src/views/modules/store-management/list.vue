<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('store.storeList') }}</h3>

    <el-row
      :gutter="24"
      style="margin-bottom:20px;"
    >

      <el-col :span="3">
        <div class="grid-content1">
          <el-button
            size="mini"
            type="primary"
            @click="addStore"
          >{{ $t('store.addStore') }}</el-button>
        </div>
      </el-col>
      <el-col :span="5">
        <el-input
          v-model="storeName"
          :placeholder="$t('store.storePloher')"
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
      </el-col>

      <el-col :span="5">
        <div class="grid-content">
          <div class="left">
            {{ $t('store.StoreType') }}
          </div>
          <div class="right">
            <el-select
              v-model="storeType"
              style="width:100%;"
              clearable
              :placeholder="$t('oss.qcloudRegionTips')"
              size="mini"
              @change="search"
            >
              <el-option
                v-for="item in storeTypeList"
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
          <div class="left">
            {{ $t('store.city') }}
          </div>
          <div class="right">
            <Address
              :size="'mini'"
              :addvalue="addressValue"
              @getValue="getCheckValue"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content" />
      </el-col>
      <el-col :span="3">
        <div class="grid-content" />
      </el-col>
    </el-row>

    <div class="controllan">
      <div class="left">
        <el-button
          size="mini"
          type="primary"
          style="margin-bottom:20px"
          @click="append(1)"
        >{{ $t('store.addLevel') }}</el-button>
        <el-tree
          :data="levelData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span
            slot-scope="{ node,data }"
            class="custom-tree-node"
          >
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-edit-outline"
                @click="() => edit(node,data)"
              />
            </span>
            <span>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-remove-outline"
                @click="() => remove(node, data)"
              />
            </span>
            <span>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-circle-plus-outline"
                @click="() => append(data)"
              />
            </span>
          </span>
        </el-tree>

      </div>

      <div class="right">
        <tableMobCopy
          ref="table_mob_one"
          :table-data="StoreList"
          :table-config="tableConfig"
          @sendData="getStoreData"
        />

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

import Address from '@/components/address'
import tableMobCopy from '@/components/GPMob/tableMobCopy'
import storeListTableConfig from '@/tableConfigs/storeManagement/storeListTableConfig'
import { cookieGet } from '@/common/cookie'
import { StoreList, Changestate, storesTypes, deleteStore, levelUpdate, levelList, addLevel, deleteLevel } from '@/api/storeManagement/storeManagement'
export default {
  name: 'StoreManagementList',
  components: { Address, tableMobCopy },
  data() {
    return {
      storeName: null,
      levelData: [],
      storeType: null,
      storeTypeList: [],
      addressValue: [],
      tableConfig: null,
      StoreList: [],
      currentPage_t: 1,
      currentPage: 1,
      total: 0,
      total_t: 0,
      dialogTableVisible: false,
      clerkData: [], // 店员列表
      storeId: ''
    }
  },
  computed: {},
  created() {
    this.tableConfig = storeListTableConfig
    this.getStoreList(1)
    this.GetstoresTypes()
  },
  mounted() {

  },
  beforeDestroy() { },
  methods: {
    GetstoresTypes() {
      storesTypes().then(res => {
        if (res.code == 0) {
          this.storeTypeList = res.data
        }
      })
      levelList().then(res => {
        if (res.code == 0) {
          res.data = JSON.parse(JSON.stringify(res.data).replace(/sunList/g, 'children'))
          res.data = JSON.parse(JSON.stringify(res.data).replace(/name/g, 'label'))
          console.log(res.data)
          this.levelData = res.data
        }
      })
    },
    getStoreList(page) {
      const sendData = {
        sort: 'create_time;2',
        page: page,
        size: 10,
        wechatId: JSON.parse(cookieGet('Httpheader')).ChannelId
      }

      if (!this.$isNull(this.storeName)) {
        sendData.name = this.storeName
      }

      if (!this.$isNull(this.storeType)) {
        sendData.storeType = this.storeType
      }

      if (!this.$isNull(this.province)) {
        sendData.province = this.province
      }

      if (!this.$isNull(this.city)) {
        sendData.city = this.city
      }

      if (!this.$isNull(this.district)) {
        sendData.district = this.district
      }

      StoreList(sendData).then(res => {
        this.StoreList = []
        if (res.code == 0) {
          this.total_t = res.data.total
          this.currentPage_t = page
          if (res.data.data != null) {
            res.data.data.map((val, index) => {
              if (page > 1) {
                val.number = (page * 10 - 10) + (index + 1)
              } else {
                val.number = index + 1
              }
              val.statusValue = this.handleStatus(val.status)
              val.enabled = val.enable == 1
            })
          } else {
            res.data.data = []
          }
          this.StoreList = res.data.data
        }
      })
    },
    // 操作
    getStoreData(val) {
      console.log(val)
      if (val.click_event.btn == '编辑') {
        this.$router.push({
          name: 'storeManagement-addStore',
          query: {
            id: val.click_data.id,
            type: 'edit'
          }
        })
      } else if (val.click_event.btn == '店员') {
        this.storeId = val.click_data.id
        this.$router.push({
          name: 'storeManagement-StaffList',
          query: {
            id: val.click_data.id
          }
        })
      } else if (val.click_event.btn == '状态') {
        val.click_data.enabled = !val.click_data.enabled
        var data = {
          'enable': val.click_data.enabled ? 1 : 0,
          'id': val.click_data.id,
          'status': val.click_data.status
        }
        Changestate(data).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: this.$t('schedule.statusLog1'),
              message: this.$t('prompt.success'),
              type: 'success'
            })
          }
        })
      } else if (val.click_event.btn == '删除') {
        this.$confirm(this.$t('store.delStore'), this.$t('tip'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        })
          .then(() => {
            deleteStore(val.click_data.id).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('schedule.statusLog1'),
                  message: this.$t('prompt.success'),
                  type: 'success'
                })
                this.getStoreList(1)
              }
            })
          })
      }
    },
    // 搜索按钮、门店类型选择事件、清除
    search() {
      this.getStoreList(1)
    },
    // 跳转添加门店
    addStore() {
      this.$router.push({
        name: 'storeManagement-addStore'
      })
    },
    // 树形结构编辑事件
    edit(node, data) {
      console.log(node, data)
      this.$prompt(this.$t('store.levelOneName'), this.$t('tip'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      }).then(({ value }) => {
        data.label = value
        const setData = {
          'desc': data.desc,
          'id': data.id,
          'name': data.label,
          'parentId': data.parentId
        }
        levelUpdate(setData).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: this.$t('schedule.statusLog1'),
              message: this.$t('prompt.success'),
              type: 'success'
            })
            this.GetstoresTypes()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('cancel')
        })
      })
    },

    // 树形结构添加事件
    append(data) {
      // console.log(data)
      this.$prompt(this.$t('store.levelOneName'), this.$t('tip'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      }).then(({ value }) => {
        var setData = {}
        if (data == 1) {
          setData = {
            'desc': '',
            'name': value,
            'parentId': 0
          }
        } else {
          setData = {
            'desc': '',
            'name': value,
            'parentId': data.id
          }
        }
        addLevel(setData).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: this.$t('schedule.statusLog1'),
              message: this.$t('prompt.success'),
              type: 'success'
            })
            this.GetstoresTypes()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('cancel')
        })
      })
    },

    // 树形结构删除事件
    remove(node, data) {
      this.$confirm(this.$t('store.delLevel'), this.$t('tip'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          deleteLevel('?id=' + data.id).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: this.$t('schedule.statusLog1'),
                message: this.$t('prompt.success'),
                type: 'success'
              })
              this.GetstoresTypes()
            }
          })
        })
    },
    // 分页事件
    handleCurrentChange_t(e) {
      this.getStoreList(e)
    },
    // 城市选择
    getCheckValue(val) {
      console.log(val)
      this.province = val.length > 0 ? val[ 0 ].id : ''
      this.city = val.length > 0 ? val[ 1 ].id : ''
      this.district = val.length > 0 ? val[ 2 ].id : ''
      this.getStoreList(1)
    },
    // 门店状态判断
    handleStatus(status) {
      var msg = ''
      switch (status) {
        case 1:
          msg = '系统错误'
          break
        case 2:
          msg = '审核中'
          break
        case 3:
          msg = '审核通过'
          break
        case 4:
          msg = '审核驳回'
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
  text-align: left;
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

