<template>
  <div class="page-member-list">
    <div class="shortBackground">
      <div class="shortTotal">{{ $t('short.msg2') }}</div>
      <div class="caozuo">
        <el-button type="primary" size="mini" @click="editThis('', '1')">{{
          $t('short.addaccount')
        }}</el-button>
      </div>

      <!-- tabMob -->
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
      >
        <template v-slot:operating="operating">
          <el-button
            key="change"
            type="text"
            size="mini"
            @click="editThis(operating.operating, '2')"
            >{{ $t('edit') }}</el-button
          >
          <el-button
            key="del"
            size="mini"
            type="text"
            style="color:#F56C6C;"
            @click="deleteThis(operating.operating)"
            >{{ $t('delete') }}</el-button
          >
        </template>
      </table-mob>

      <el-dialog
        :title="deletetitle"
        width="40%"
        :visible.sync="deleteFormVisible"
      >
        <div>{{ $t('short.suredel') }}</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="deleteOk()">{{
            $t('confirm')
          }}</el-button>
          <el-button size="mini" @click="deleteff()">{{
            $t('cancel')
          }}</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="title" width="40%" :visible.sync="childrenFormVisible">
        <el-form
          ref="ruleForm"
          :model="submitmsg"
          :rules="rules"
          label-width="150px"
          class="demo-ruleForm"
          style="overflow: hidden;"
        >
          <el-col :span="24" class="bottom">
            <el-form-item
              :label="$t('short.lab1')"
              style="width:80%;line-height: 30px;"
              prop="nick"
            >
              <el-input
                v-model="submitmsg.nick"
                :placeholder="$t('short.lab2')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="bottom">
            <el-form-item
              :label="$t('short.lab3')"
              style="line-height: 30px;"
              prop="type"
            >
              <el-radio-group v-model="submitmsg.type">
                <el-radio :label="$t('short.lab4')" />
                <el-radio :label="$t('short.lab5')" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="bottom">
            <el-form-item
              label="APIKEY"
              style="width:80%;line-height: 30px;"
              prop="apiKey"
            >
              <el-input
                v-model="submitmsg.apiKey"
                :placeholder="$t('short.lab6')"
              />
            </el-form-item>
          </el-col>
        </el-form>
        <div class="shortTotaln">{{ $t('short.lab7') }}</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="sure('ruleForm')">{{
            $t('confirm')
          }}</el-button>
          <el-button size="mini" @click="off()">{{ $t('cancel') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import accountTableConfig from '@/tableConfigs/marketing/short/accountmanagement'
import {
  addaccount,
  accountlists,
  editaccount,
  daleteaccount
} from '@/api/marketing/short'
import { cookieGet } from '@/common/cookie'
export default {
  name: 'ShortManagement',
  components: {},
  data() {
    return {
      title: this.$t('short.addaccount'),
      deletetitle: this.$t('short.delaccount'),
      deleteFormVisible: false,
      delid: '',
      childrenFormVisible: false,
      searchName: '',
      tableData: [],
      tableConfig: {},
      f_tabsOnCList: [], // 该tab的事件集合  @ k:key; mT:methodsType
      f_tabsSlots: { operating: 'operating' }, // 插槽
      submitmsg: {
        type: '',
        nick: '',
        apiKey: '',
        channlId: JSON.parse(cookieGet('Httpheader')).ChannelId
      },
      ruleForm: {
        type: '',
        nick: '',
        apiKey: ''
      },
      rules: {
        nick: [
          { required: true, message: this.$t('short.lab2'), trigger: 'change' }
        ],
        type: [
          { required: true, message: this.$t('short.lab8'), trigger: 'change' }
        ],
        apiKey: [
          { required: true, message: this.$t('short.lab6'), trigger: 'change' }
        ]
      }
    }
  },
  created() {
    console.log('this.cookieGet', JSON.parse(cookieGet('Httpheader')).ChannelId)
    // console.log('this.$getChannelId()', this.$getChannelId())
    this.getshortList()
    this._initTab()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    _initTab() {
      // console.log('tableConfig', { ...accountTableConfig })
      accountTableConfig.tabHeadConfig.map((d, idx) => {
        d.id = idx + 1
      })
      this.tableConfig = accountTableConfig
    },
    tabEvns(k, v) {
      // console.log('setIngV', 'onC' + k, k, v)
      this['onC' + k](v) // 动态调用当前列表中的方法;
    },
    getTabSelList(v) {
      // console.log('getTabSelList', v)
    },
    integralThis(type, v) {
      this.integralType = type
      // console.log(type, v, 111111)
    },
    getshortList() {
      accountlists().then(res => {
        // console.log('子账户列表', res)
        res.data.data.forEach(d => {
          d.chargingTotal ? (d.chargingTotal = d.chargingTotal * 0.04) : null
        })
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },
    sure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = this.submitmsg
          if (this.title == this.$t('short.addaccount')) {
            this.submitmsg.id = ''
            addaccount(params).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('short.success'),
                  message: this.$t('short.addsuc'),
                  type: 'success'
                })
                this.getshortList()
                this.childrenFormVisible = false
                this.submitmsg = {
                  type: '',
                  nick: '',
                  apiKey: '',
                  channlId: JSON.parse(cookieGet('Httpheader')).ChannelId,
                  id: ''
                }
              } else {
                this.$notify.error({
                  title: this.$t('member.filter.error'),
                  message: res.message
                })
              }
            })
          } else {
            editaccount(params).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('short.success'),
                  message: this.$t('short.editsuc'),
                  type: 'success'
                })
                this.getshortList()
                this.childrenFormVisible = false
              } else {
                this.$notify.error({
                  title: this.$t('member.filter.error'),
                  message: res.message
                })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    off() {
      this.childrenFormVisible = false
    },
    editThis(v, type) {
      this.childrenFormVisible = true
      console.log('item', v)
      if (type == '1') {
        this.title = '新增账户'
      } else {
        this.title = '编辑账户'
        this.submitmsg.type = v.type
        this.submitmsg.nick = v.nick
        this.submitmsg.apiKey = v.apiKey
        this.submitmsg.id = v.id
      }
    },
    deleteThis(v) {
      this.delid = v.id
      this.deleteFormVisible = true
    },
    deleteOk() {
      daleteaccount(this.delid).then(res => {
        if (res.code == 0) {
          this.$notify({
            title: this.$t('short.success'),
            message: this.$t('delete') + this.$t('short.success'),
            type: 'success'
          })
          this.getshortList()
          this.deleteFormVisible = false
        } else {
          this.$notify.error({
            title: this.$t('member.filter.error'),
            message: res.message
          })
        }
      })
    },
    deleteff() {
      this.deleteFormVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.shortBackground {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  margin: 10px;
  min-width: 1080px;
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

      .search-box-left-btn {
        text-align: center;
        height: 30px;
        color: #fff;
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
  .bottom {
    margin-bottom: 20px;
  }
  .tab-head-btn {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 20px 0;
  }
  .el-input__inner {
    height: 30px !important;
    line-height: 30px !important;
  }
  .el-form-item__label {
    line-height: 30px !important;
  }
  .shortTotaln {
    padding: 10px 15px;
    border: 1px solid #00ccff;
    background: #e5f6ff;
    color: #ccc;
    margin-top: 20px;
  }
}
</style>
