<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('store.list') }}</h3>

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
          >{{ $t('store.add') }}</el-button>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <div class="left">{{ $t('coupons.StoreName') }}</div>
          <div class="right">
            <el-input
              v-model="storeName"
              :placeholder="$t('store.storePlace')"
              clearable
              size="mini"
              class="input-with-select"
              @clear="clearSearch"
            >
              <el-button
                slot="append"
                size="mini"
                icon="el-icon-search"
                @click="search"
              />
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="controllan">

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
import tableMobCopy from '@/components/GPMob/haxnbauer/tableMobCopy'
import storeListTableConfig from '@/tableConfigs/storeManagement/haxnbauer/storeListTableConfig'
import { StoreList, Changestate, storesTypes, deleteStore } from '@/api/storeManagement/storeManagement'
import axios from 'axios'
import configUrl from '@/api/configUrl'

import {
  SSL_OP_NO_TLSv1_1
} from 'constants'

import { cookieGet } from '@/common/cookie'
export default {
  name: 'StoreManagementList',
  components: { Address, tableMobCopy },
  data() {
    const data = []
    return {
      storeName: null,
      storeType: null,
      storeTypeList: [],
      addressValue: [],
      tableConfig: null,
      StoreList: [],
      currentPage_t: 1,
      total_t: 0,
      copyItem: null,
      data: JSON.parse(JSON.stringify(data))
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
    },
    getStoreList(page) {
      const sendData = {
        sort: 'create_time;2',
        page: page,
        size: 10,
        wechatId: 16
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

      axios({
        method: 'get',
        url: configUrl.ajax_url + 'user/stores',
        headers: {
          Accept: 'application/json',
          'X-Channel': JSON.parse(cookieGet('Httpheader')).ChannelId,
          'X-Channel-Type': SSL_OP_NO_TLSv1_1,
          'Content-Security-Policy': 'upgrade-insecure-requests',
          'X-Security-Feign': true
        },
        params: sendData
      }).then((result) => {
        var res = result.data
        console.log(res)
        this.StoreList = []
        if (res.code == 0) {
          this.total_t = res.data.total
          this.currentPage_t = page
          res.data.data.map((val, index) => {
            if (page > 1) {
              val.number = (page * 10 - 10) + (index + 1)
            } else {
              val.number = index + 1
            }
            val.statusValue = this.handleStatus(val.status)
            val.enabled = val.enable == 1
          })
          this.StoreList = res.data.data
        }
      })
      // StoreList(sendData).then(res => {
      //   this.StoreList = []
      //   if (res.code == 0) {
      //     this.total_t = res.data.total
      //     this.currentPage_t = page
      //     res.data.data.map((val, index) => {
      //       if (page > 1) {
      //         val.number = (page * 10 - 10) + (index + 1)
      //       } else {
      //         val.number = index + 1
      //       }
      //       val.statusValue = this.handleStatus(val.status)
      //       val.enabled = val.enable == 1
      //     })
      //     this.StoreList = res.data.data
      //   }
      // })
    },
    getStoreData(val) {
      this.copyItem = val.click_data
      console.log(val.click_event.btn)
      if (val.click_event.btn == '状态') {
        Changestate({
          id: this.copyItem.id,
          enable: !this.copyItem.enabled ? 1 : 0
        }).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            })

            this.StoreList.map((val, index) => {
              if (val.id == this.copyItem.id) {
                this.$set(val, 'enabled', !this.copyItem.enabled)
              }
            })
          }
        })
      }
      if (val.click_event.btn == '编辑') {
        this.$router.push({
          name: 'haxnbauer-add-store',
          query: {
            id: this.copyItem.id,
            type: 'edit'
          }
        })
      }
      if (val.click_event.btn == '删除') {
        deleteStore(this.copyItem.id).then(res => {
          console.log(res)
          if (res.code == 0) {
            this.getStoreList(1)
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            })
          }
        })
      }
    },
    search() {
      this.storeType = null
      this.getStoreList(1)
    },
    clearSearch() {
      this.getStoreList(1)
    },
    storeTypeChange() {
      this.addressValue = []
      this.getStoreList(1)
    },
    addStore() {
      this.$router.push({
        name: 'haxnbauer-add-store',
        query: {
          type: 'add'
        }
      })
    },
    handleCurrentChange_t(e) {
      this.getStoreList(e)
    },
    getCheckValue(val) {
      this.storeType = null
      this.storeName = null
      this.province = val[ 0 ].id
      this.city = val[ 1 ].id
      this.district = val[ 2 ].id
      this.getStoreList(1)
    },
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
  display: flex;
  .left {
    text-align: right;
    line-height: 28px;
    color: #333333;
    margin:0 10px;
  }
  .right {
    flex: 1;
  }
}
.grid-content1 {
  width: 100%;
  height: 35px;
}
.controllan {
  width: 100%;
  .left {
    width: 200px;
    float: left;
  }
}
</style>

