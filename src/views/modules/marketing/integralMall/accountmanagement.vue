<template>
  <div class="page-member-list">
    <div class="shortBackground">
      <div class="shortTotal">
        账户需要通过运营商申请后，获取APIKEY后进行创建，需要账户APIKEY请联系客户经理申请。
      </div>
      <div class="caozuo">
        <el-button type="primary" size="mini" @click="editThis('', '1')"
          >新增账户</el-button
        >
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
            >编辑</el-button
          >
          <el-button
            key="del"
            size="mini"
            type="text"
            @click="deleteThis(operating.operating)"
            >删除</el-button
          >
        </template>
      </table-mob>

      <el-dialog
        :title="deletetitle"
        width="40%"
        :visible.sync="deleteFormVisible"
      >
        <div>是否确认删除？</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="deleteOk()"
            >确 定</el-button
          >
          <el-button size="mini" @click="deleteff()">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="title" width="40%" :visible.sync="childrenFormVisible">
        <el-form
          ref="ruleForm"
          :model="submitmsg"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
          style="overflow: hidden;"
        >
          <el-col :span="24" class="bottom">
            <el-form-item
              label="账户名称"
              style="width:70%;line-height: 30px;"
              prop="nick"
            >
              <el-input v-model="submitmsg.nick" placeholder="请填写账户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="bottom">
            <el-form-item
              label="账号类型"
              style="line-height: 30px;"
              prop="type"
            >
              <el-radio-group v-model="submitmsg.type">
                <el-radio label="系统" />
                <el-radio label="营销" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="bottom">
            <el-form-item
              label="APIKEY"
              style="width:70%;line-height: 30px;"
              prop="apiKey"
            >
              <el-input
                v-model="submitmsg.apiKey"
                placeholder="请填写账户APIKEY"
              />
            </el-form-item>
          </el-col>
        </el-form>
        <div class="shortTotaln">APIKEY请联系客户经理申请。</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="sure('ruleForm')"
            >确 定</el-button
          >
          <el-button size="mini" @click="off()">取 消</el-button>
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
      title: '新增账户',
      deletetitle: '删除账户',
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
        channlId: this.$getChannelId()
      },
      ruleForm: {
        type: '',
        nick: '',
        apiKey: ''
      },
      rules: {
        nick: [
          { required: true, message: '请填写账户名称', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择账号类型', trigger: 'change' }
        ],
        apiKey: [
          { required: true, message: '请填写账户APIKEY', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    console.log('this.$getChannelId()', this.$getChannelId())
    this.getshortList()
    this._initTab()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    _initTab() {
      console.log('this.cookieGet', cookieGet)
      console.log('this.$getChannelId()', this.$getChannelId())
      console.log('tableConfig2222233333', { ...accountTableConfig })
      accountTableConfig.tabHeadConfig.map((d, idx) => {
        d.id = idx + 1
      })
      this.tableConfig = accountTableConfig
    },
    tabEvns(k, v) {
      console.log('setIngV', 'onC' + k, k, v)
      this['onC' + k](v) // 动态调用当前列表中的方法;
    },
    getTabSelList(v) {
      console.log('getTabSelList', v)
    },
    integralThis(type, v) {
      this.integralType = type
      console.log(type, v, 111111)
    },
    getshortList() {
      accountlists().then(res => {
        console.log('子账户列表', res)
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },
    sure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = this.submitmsg
          if (this.title == '新增账户') {
            this.submitmsg.id = ''
            addaccount(params).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: '成功',
                  message: '新增成功',
                  type: 'success'
                })
                this.getshortList()
                this.childrenFormVisible = false
                this.submitmsg = {
                  type: '',
                  nick: '',
                  apiKey: '',
                  channlId: '3',
                  id: ''
                }
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.message
                })
              }
            })
          } else {
            editaccount(params).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: '成功',
                  message: '编辑成功',
                  type: 'success'
                })
                this.getshortList()
                this.childrenFormVisible = false
              } else {
                this.$notify.error({
                  title: '错误',
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
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
          this.getshortList()
          this.deleteFormVisible = false
        } else {
          this.$notify.error({
            title: '错误',
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
