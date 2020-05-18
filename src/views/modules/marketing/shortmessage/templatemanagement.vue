<template>
  <d2-container class="page">
    <div class="shortBackground">
      <div class="shortTotal">{{ $t('short.msg3') }}</div>
      <div class="search-box">
        <div class="search-box-left">
          <el-input size="mini"
                    clearable
                    placeholder="请输入内容"
                    v-model="searchName"
                    class="input-with-select">
            <el-button slot="append"
                       class="search-box-left-btn"
                       @click="gettempList(1)">{{ $t('short.search') }}</el-button>
          </el-input>
          <!-- <el-input v-model="searchName"
                    size="mini" />
          <el-button type="primary"
                     size="mini"
                     class="search-box-left-btn"
                     @click="gettempList(1)">{{ $t('short.search') }}</el-button> -->
        </div>
      </div>
      <div class="caozuo">
        <el-button type="primary"
                   size="mini"
                   @click="editThis(msg, '1')">{{
          $t('short.addtemplate')
        }}</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="synchronization()">{{
          $t('short.tb')
        }}</el-button>
      </div>
      <table-mob ref="table_mob"
                 :table-data="tableData"
                 :table-config="tableConfig"
                 :tabs-slots="f_tabsSlots"
                 :tabs-on-c-list="f_tabsOnCList"
                 @_selectionChange="getTabSelList"
                 @_name="tabEvns"
                 @_sex="tabEvns"
                 @_operating="tabEvns">
        <template v-slot:operating="operating">
          <el-button key="change"
                     type="text"
                     size="mini"
                     :class="{'colorSty':operating.operating.status_type==1}"
                     @click="editThis(operating.operating, '2')">{{ $t('edit') }}</el-button>
          <el-button key="del"
                     size="mini"
                     type="text"
                     style="color:#F56C6C"
                     @click="deleteThis(operating.operating)">{{ $t('delete') }}</el-button>
        </template>
      </table-mob>

      <div class="pagination">
        <el-pagination background
                       :current-page="currentPage"
                       layout="total, prev, pager, next, jumper"
                       :total="total"
                       @current-change="handleCurrentChange" />
      </div>
      <!-- 新建 -->
      <el-dialog :title="enabledText.title"
                 width="40%"
                 :visible.sync="dialogFormVisible">
        <el-form ref="ruleForm"
                 :model="submitmsg"
                 :rules="rules"
                 label-width="150px"
                 class="demo-ruleForm">
          <el-col v-show="enabledText.title == $t('edit') + $t('short.mb')"
                  :span="24"
                  class="bottom"
                  style="height:30px;">
            <el-form-item :label="$t('short.mb') + 'code'">
              <p class="margin-top">{{ submitmsg.id }}</p>
            </el-form-item>
          </el-col>
          <!-- 发送账号 -->
          <el-col :span="24"
                  class="bottom">
            <el-form-item :label="$t('short.lab11')"
                          prop="account">
              <el-select v-model="submitmsg.account"
                         style="width:62%;"
                         clearable
                         size="mini"
                         @change="accountTypeChange">
                <el-option v-for="item in accountTypeList"
                           :key="item.id"
                           :label="item.nick"
                           :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 短信签名 -->
          <el-col :span="24"
                  class="bottom">
            <el-form-item :label="$t('short.lab12')"
                          prop="sign">
              <el-select v-model="submitmsg.sign"
                         style="width:62%;"
                         clearable
                         size="mini">
                <el-option v-for="item in daccountTypeList"
                           :key="item.id"
                           :label="item.sign"
                           :value="item.sign" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 短信类型 -->
          <el-col :span="24"
                  class="bottom">
            <el-form-item prop="tplType"
                          :label="$t('short.lab13')">
              <el-radio-group v-model="submitmsg.tplType">
                <el-radio :disabled="isdisabled"
                          :label="$t('short.lab14')" />
                <el-radio :disabled="isdisabled"
                          :label="$t('short.lab15')" />
                <el-radio :disabled="!isdisabled"
                          :label="$t('short.lab16')" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-show="submitmsg.tplType == $t('short.lab14')"
                  :span="24"
                  class="bottom">
            <el-form-item :label="$t('short.lab17')">
              <el-input v-model="submitmsg.website"
                        class="elinput"
                        style="height:30px!important;line-height:30px!important"
                        value="" />
            </el-form-item>
          </el-col>
          <el-col :span="24"
                  class="bottom">
            <el-form-item :label="$t('short.lab18')">
              <el-select v-model="tplId"
                         style="width:62%;"
                         clearable
                         size="mini">
                <el-option v-for="item in defaultTypeList"
                           :key="item.id"
                           :label="item.tpl_content"
                           :value="item.id" />
              </el-select>
              <el-button type="primary"
                         size="mini"
                         @click="choose()">{{
                $t('short.sy')
              }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24"
                  class="bottom">
            <el-form-item :label="$t('short.lab19')"
                          style="width:70%;"
                          prop="tplContent">
              <el-input v-model="submitmsg.tplContent"
                        type="textarea" />
              <span class="p">{{ $t('short.msg4') }}</span>
            </el-form-item>
          </el-col>

          <!-- <el-col
            :span="24"
            class="bottom"
          >
            <el-form-item
              :label="$t('short.lab20')"
              style="width:70%;"
            >
              <el-input
                v-model="submitmsg.parameter"
                type="textarea"
              />
            </el-form-item>
          </el-col> -->
        </el-form>

        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     size="mini"
                     @click="enabledOk('ruleForm')">{{ $t('confirm') }}</el-button>
          <el-button size="mini"
                     @click="callOff()">{{
            $t('cancel')
          }}</el-button>
        </div>
      </el-dialog>
      <!-- 确认编辑 -->
      <el-dialog :title="enabledText.edittitle"
                 width="40%"
                 :visible.sync="editdialogFormVisible">
        <div>{{ $t('short.msg5') }}</div>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     size="mini"
                     @click="esitenabledOk()">{{
            $t('confirm')
          }}</el-button>
          <el-button size="mini"
                     @click="editcallOff()">{{
            $t('cancel')
          }}</el-button>
        </div>
      </el-dialog>
      <!-- 删除模板 -->
      <el-dialog :title="deletetitle"
                 width="40%"
                 :visible.sync="deleteFormVisible">
        <div>{{ $t('short.msg6') }}</div>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     size="mini"
                     @click="deleteOk()">{{
            $t('confirm')
          }}</el-button>
          <el-button size="mini"
                     @click="deleteff()">{{
            $t('cancel')
          }}</el-button>
        </div>
      </el-dialog>

      <!-- 同步 -->
      <el-dialog :title="title"
                 width="40%"
                 :visible.sync="childrenFormVisible">
        <el-col :span="24"
                class="bottom">
          <div>{{ $t('short.msg7') }}</div>
          <el-form>
            <el-form-item label="请选择账户">
              <el-select size="mini"
                         v-model="value"
                         clearable
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.id"
                           :label="item.nick"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

        </el-col>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     size="mini"
                     @click="sure('synruleForm')">{{
            $t('confirm')
          }}</el-button>
          <el-button size="mini"
                     @click="off()">{{ $t('cancel') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </d2-container>
</template>
<script>
import shortTableConfig from '@/tableConfigs/marketing/short/templatemanagementConfig'
import { formatDate } from '@/utils/index'
import { mapState } from "vuex";
import {
  templatetmsg,
  account,
  defaultl,
  daccount,
  deletel,
  adddefaultl,
  viewaccount,
  synchronizationtpl
} from '@/api/marketing/short'
export default {
  name: 'TemplateManagement',
  components: {},
  data () {
    return {
      options: [],
      value: '',
      isdisabled: false,
      // 新建
      tplId: '',
      submitmsg: {
        account: '',
        id: null,
        sign: '',
        tplContent: '',
        tplId: null,
        tplType: '',
        website: ''
      },
      ruleForm: {
        account: '',
        resigngion: '',
        tplType: '',
        tplContent: ''
      },
      rules: {
        account: [
          { required: true, message: this.$t('short.lab36'), trigger: 'change' }
        ],
        sign: [
          { required: true, message: this.$t('short.lab37'), trigger: 'change' }
        ],
        tplType: [
          { required: true, message: this.$t('short.lab38'), trigger: 'change' }
        ],
        tplContent: [
          {
            required: true,
            message: this.$t('short.lab39'),
            trigger: 'change'
          },
          {
            min: 1,
            max: 67,
            message: this.$t('short.lab40'),
            trigger: 'change'
          }
        ]
      },
      msg: '',
      deletetitle: this.$t('delete') + this.$t('short.mb'),
      searchName: '',
      tableData: [],
      tableConfig: {},
      total: 0,
      currentPage: 1,
      page: 1,
      f_tabsOnCList: [], // 该tab的事件集合  @ k:key; mT:methodsType
      f_tabsSlots: { operating: 'operating' },
      enabledText: {
        title: this.$t('short.addtemplate'),
        edittitle: this.$t('short.msg8')
      }, // 插槽\
      dialogFormVisible: false,
      editdialogFormVisible: false,
      deleteFormVisible: false,
      accountTypeList: [],
      defaultTypeList: [],
      daccountTypeList: [],
      delid: '',
      childrenFormVisible: false,
      title: this.$t('short.tb')
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    console.log(this.info, 'info===info')
    this.gettempList(1)
    this._initTab()
    this.getaccount()
    this.viewaccountinterface(this.info.ChannelId);
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    _initTab () {
      console.log('tableConfig', { ...shortTableConfig })
      shortTableConfig.tabHeadConfig.map((d, idx) => {
        d.id = idx + 1
      })
      this.tableConfig = shortTableConfig
    },
    tabEvns (k, v) {
      this['onC' + k](v)
    },
    getTabSelList (v) {
      console.log('getTabSelList', v)
    },
    deleteThis (v) {
      this.$confirmDel('删除当前选择模版', () => {
        deletel(v.id).then(res => {
          if (res.code == 0) {
            this.gettempList(1)
          } else {
            this.$notify.error({
              title: res.message,
              message: this.$t('short.noedit')
            })
          }
        })
      })
    },
    handleCurrentChange (e) {
      console.log('分页', e)
      this.gettempList(e)
    },
    // 模板列表
    gettempList (page) {
      const params =
        '&page=' + page + '&size=10' + '&tpl_content=' + this.searchName
      templatetmsg(params).then(res => {
        console.log('模板列表', res)
        if (res.data && res.data.data != null) {
          res.data.data.map(d => {
            d.create_time = formatDate(
              new Date(d.create_time),
              'yyyy-MM-dd hh:mm:ss'
            )
            if (d.check_status == 'CHECKING') { // 审核中
              d.status_type = 1
              d.check_status = this.$t('short.lab32')
            } else if (d.check_status == 'FAIL') { // 审核失败
              d.status_type = 2
              d.check_status = this.$t('short.lab33')
            } else if (d.check_status == 'SUCCESS') { // 审核成功
              d.status_type = 3
              d.check_status = this.$t('short.lab34')
            } else if (d.check_status == 'APLLYING_VIP') { // 普通通道审核成功申请升级专用通道中
              d.status_type = 4
              d.check_status = this.$t('short.lab35')
            } else {
              d.status_type = 5
              d.check_status = '/'
            }
            if (!d.reason) {
              d.reason = '/'
            }
          })
          this.tableData = res.data.data
          this.total = res.data.total
        } else {
          this.tableData = []
        }
      })
    },
    // 点击编辑或新建
    editThis (v, type) {
      console.log(v, type, 'jdskvbskyugws')
      this.submitmsg = {
        account: '',
        id: null,
        sign: '',
        tplContent: '',
        tplId: null,
        tplType: '',
        website: ''
      }
      if (type == 2 && v.status_type == 1) {
        this.$notify.error({
          title: this.$t('member.filter.error'),
          message: this.$t('short.noedit')
        })
        return;
      }
      if (type == '1') {
        this.dialogFormVisible = true
        this.editdialogFormVisible = false
        this.enabledText.title = this.$t('short.addtemplate')
      } else {
        this.enabledText.title = this.$t('edit') + this.$t('short.mb')
        if (v) {
          console.log(v, 'vvvvvvv')
          this.submitmsg.id = v.id
          this.submitmsg.tplContent = v.tpl_content
          if (v.tpl_type == '1') {
            this.submitmsg.tplType = this.$t('short.lab14')
            this.isdisabled = false
          } else if (v.tpl_type == '2') {
            this.submitmsg.tplType = this.$t('short.lab15')
            this.isdisabled = false
          } else if (v.tpl_type == '3') {
            this.submitmsg.tplType = this.$t('short.lab16')
            this.isdisabled = true
          }
          console.log(777, this.submitmsg.tplType)
          this.submitmsg.sign = v.sign_content
          this.submitmsg.account = v.account
          this.submitmsg.tplId = v.tpl_id
          this.submitmsg.website = v.website
        }
        this.dialogFormVisible = false
        this.editdialogFormVisible = true
      }
    },
    // 提交编辑或新建
    enabledOk (formName) {
      if (
        this.submitmsg.tplType == this.$t('short.lab14') &&
        !this.submitmsg.website
      ) {
        this.$notify.error({
          title: this.$t('member.filter.error'),
          message: this.$t('short.lab31')
        })
        return
      }
      console.log(this.submitmsg)
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.submitmsg.tplType == this.$t('short.lab14')) {
            this.submitmsg.tplType = '1'
          } else if (this.submitmsg.tplType == this.$t('short.lab15')) {
            this.submitmsg.tplType = '2'
            this.submitmsg.website = ''
          } else if (this.submitmsg.tplType == this.$t('short.lab16')) {
            this.submitmsg.tplType = '3'
            this.submitmsg.website = ''
          }
          const params = this.submitmsg
          adddefaultl(params).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: this.$t('short.success'),
                message: this.$t('short.caozuosuc'),
                type: 'success'
              })
              this.gettempList(1)
              this.submitmsg = {
                account: '',
                id: null,
                sign: '',
                tplContent: '',
                tplId: null,
                website: '',
                tplType: ''
              }
            }
          })
          this.dialogFormVisible = false
          this.editdialogFormVisible = false
        } else {
          return false
        }
      })
    },
    callOff () {
      // 点击弹框取消
      this.submitmsg = {
        account: '',
        id: null,
        sign: '',
        tplContent: '',
        tplId: null,
        tplType: '',
        website: ''
      }
      this.dialogFormVisible = false
      this.editdialogFormVisible = false
    },
    editcallOff () {
      this.dialogFormVisible = false
      this.editdialogFormVisible = false
    },
    esitenabledOk () {
      this.dialogFormVisible = true
      this.editdialogFormVisible = false
    },
    // 发送账号列表
    getaccount () {
      account().then(res => {
        if (res.data.length > 0) {
          this.accountTypeList = res.data
        }
      })
      // 常用模板
      defaultl().then(res => {
        if (res.data.length > 0) {
          this.defaultTypeList = res.data
        }
      })
    },
    // 选择发送账号
    accountTypeChange (e) {
      for (let i = 0; i < this.accountTypeList.length; i++) {
        if (e == this.accountTypeList[i].id) {
          if (this.accountTypeList[i].type == this.$t('short.lab21')) {
            this.isdisabled = false
            this.submitmsg.tplType = this.$t('short.lab14')
          } else {
            this.isdisabled = true
            this.submitmsg.tplType = this.$t('short.lab16')
          }
        }
      }
      this.daccountTypeList = []
      // 短信签名
      daccount(e).then(res => {
        if (res.data.length > 0) {
          this.daccountTypeList = res.data
        }
      })
    },
    choose () { // 点击选择模板确认按钮
      this.defaultTypeList.map(d => {
        if (d.id == this.tplId) {
          this.submitmsg.tplContent = d.tpl_content
        }
      })
    },
    // 删除模板
    deleteOk () {
      const id = this.delid
      deletel(id).then(res => {
        if (res.code == 0) {
          this.$notify({
            title: this.$t('short.success'),
            message: this.$t('delete') + this.$t('short.success'),
            type: 'success'
          })
        }
      })
    },
    deleteff () {
      this.deleteFormVisible = false
    },

    synchronization () {
      this.childrenFormVisible = true
    },

    // 获取账户接口
    viewaccountinterface (ChannelId) {
      viewaccount({
        channelId: ChannelId
      }).then(res => {
        if (res.code == 0) {
          this.options = res.data.data;
          this.value = this.options[0].id
        }
      })
    },
    // 同步
    sure () {
      synchronizationtpl({
        channelId: this.info.ChannelId,
        accountId: this.value
      }).then(res => {
        if (res.code == 0) {
          this.$notify({
            title: this.$t('short.success'),
            message: this.$t('short.tb') + this.$t('short.success'),
            type: 'success'
          })
          this.gettempList(1)
          this.childrenFormVisible = false
        }
      })
    },
    off () {
      this.childrenFormVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.shortBackground {
  .shortTotal {
    padding: 10px 15px;
    border: 1px solid rgba(0, 204, 255, 1);
    background: rgba(229, 246, 255, 1);
    color: #ccc;
    margin-bottom: 20px;
  }
  .colorSty {
    color: #909399;
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
        // background: #66b1ff;
        // margin-left: -5px;
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

  .tab-head-btn {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 20px 0;
  }

  .grid-content {
    width: 100%;
    height: 35px;
    display: flex;
    .left {
      width: 90px;
      line-height: 25px;
      color: #333333;
    }
    .right {
      flex: 1;
    }
  }
  .bottom {
    margin-bottom: 20px;
  }
  .textarea {
    width: 62%;
    height: 50px;
    border: 1px solid #dcdfe6 !important;
    outline: none;
    resize: none;
    color: #606266;
  }
  .p {
    width: 100%;
    margin-top: -3px;
    font-size: 10px;
  }
  .height {
    height: 100px;
  }
  .elinput {
    width: 62%;
    height: 30px !important;
  }
  .el-input__inner {
    height: 30px !important;
    line-height: 30px !important;
  }
  .margin-top {
    margin-top: 0;
  }
}
</style>
<style lang="scss">
.el-input-group__append {
  background-color: #66b1ff !important;
}
// .input-with-select .el-input-group__prepend {
//   background-color: #66b1ff !important;
// }
</style>
