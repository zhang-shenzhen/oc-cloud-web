<template>
  <d2-container class="page">
    <div class="shortBackground">
      <div class="shortTotal">
        因运营商要求，短信内容需审核。模板审核通过后，可以通过API调用的形式发送。
      </div>
      <div class="search-box">
        <div class="search-box-left">
          <el-input v-model="searchName" size="mini" />
          <el-button
            type="primary"
            size="mini"
            class="search-box-left-btn"
            @click="gettempList(1)"
            >搜索</el-button
          >
        </div>
      </div>
      <div class="caozuo">
        <el-button type="primary" size="mini" @click="editThis(msg, '1')"
          >新增模板</el-button
        >
        <el-button type="primary" size="mini" @click="synchronization()"
          >同步云片模板</el-button
        >
      </div>
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

      <div class="pagination">
        <el-pagination
          background
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 新建 -->
      <el-dialog
        :title="enabledText.title"
        width="40%"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          ref="ruleForm"
          :model="submitmsg"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-col
            v-show="enabledText.title == '编辑模板'"
            :span="24"
            class="bottom"
            style="height:30px;"
          >
            <el-form-item label="模板code">
              <p class="margin-top">{{ submitmsg.id }}</p>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="bottom">
            <el-form-item label="发送账号" prop="account">
              <el-select
                v-model="submitmsg.account"
                style="width:62%;"
                clearable
                size="mini"
                @change="accountTypeChange"
              >
                <el-option
                  v-for="item in accountTypeList"
                  :key="item.id"
                  :label="item.nick"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="bottom">
            <el-form-item label="短信签名" prop="sign">
              <el-select
                v-model="submitmsg.sign"
                style="width:62%;"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in daccountTypeList"
                  :key="item.id"
                  :label="item.sign"
                  :value="item.sign"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="bottom">
            <el-form-item prop="tplType" label="短信类型">
              <el-radio-group v-model="submitmsg.tplType">
                <el-radio :disabled="isdisabled" label="验证码" />
                <el-radio :disabled="isdisabled" label="通知类" />
                <el-radio :disabled="!isdisabled" label="营销类" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col
            v-show="submitmsg.tplType == '验证码'"
            :span="24"
            class="bottom"
          >
            <el-form-item label="网络地址">
              <el-input
                v-model="submitmsg.website"
                class="elinput"
                style="height:30px!important;line-height:30px!important"
                value=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="bottom">
            <el-form-item label="常用模板">
              <el-select
                v-model="submitmsg.tplId"
                style="width:62%;"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in defaultTypeList"
                  :key="item.id"
                  :label="item.tpl_content"
                  :value="item.id"
                />
              </el-select>
              <el-button type="primary" size="mini" @click="choose()"
                >使用</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="24" class="bottom">
            <el-form-item label="发送内容" style="width:70%;" prop="tplContent">
              <el-input v-model="submitmsg.tplContent" type="textarea" />
              <span class="p"
                >共0个字，1条短信。(因内容有变量,按实际发送长度计费,一条短信67个字)</span
              >
            </el-form-item>
          </el-col>

          <el-col :span="24" class="bottom">
            <el-form-item label="变量" style="width:70%;">
              <el-input v-model="submitmsg.parameter" type="textarea" />
            </el-form-item>
          </el-col>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="enabledOk('ruleForm')"
            >确 定</el-button
          >
          <el-button size="mini" @click="callOff()">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 确认编辑 -->
      <el-dialog
        :title="enabledText.edittitle"
        width="40%"
        :visible.sync="editdialogFormVisible"
      >
        <div>
          修改后模板将重新审核，审核过程中模板不可用，请确认是否继续修改模板？
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="esitenabledOk()"
            >确 定</el-button
          >
          <el-button size="mini" @click="editcallOff()">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 删除模板 -->

      <!-- 同步 -->
      <el-dialog :title="title" width="40%" :visible.sync="childrenFormVisible">
        <el-col :span="24" class="bottom">
          <div>确认同步云片模板？</div>
        </el-col>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="sure('synruleForm')"
            >确 定</el-button
          >
          <el-button size="mini" @click="off()">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </d2-container>
</template>
<script>
import shortTableConfig from '@/tableConfigs/marketing/short/templatemanagementConfig'
import { formatDate } from '@/utils/index'
import {
  templatetmsg,
  account,
  defaultl,
  daccount,
  deletel,
  adddefaultl,
  synchronizationtpl
} from '@/api/marketing/short'
export default {
  name: 'TemplateManagement',
  components: {},
  data() {
    return {
      isdisabled: false,
      // 新建
      submitmsg: {
        account: '',
        id: null,
        parameter: '',
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
          { required: true, message: '请选择发送账号', trigger: 'change' }
        ],
        sign: [
          { required: true, message: '请选择短信签名', trigger: 'change' }
        ],
        tplType: [
          { required: true, message: '请选择短信类型', trigger: 'change' }
        ],
        tplContent: [
          { required: true, message: '请输入发送内容', trigger: 'change' },
          {
            min: 1,
            max: 67,
            message: '长度在 1 到 67 个字符',
            trigger: 'change'
          }
        ]
      },
      msg: '',
      deletetitle: '删除模板',
      searchName: '',
      tableData: [],
      tableConfig: {},
      total: 0,
      currentPage: 1,
      page: 1,
      f_tabsOnCList: [], // 该tab的事件集合  @ k:key; mT:methodsType
      f_tabsSlots: { operating: 'operating' },
      enabledText: {
        title: '新建模板',
        edittitle: '确认修改模板'
      }, // 插槽\
      dialogFormVisible: false,
      editdialogFormVisible: false,
      deleteFormVisible: false,
      accountTypeList: [],
      defaultTypeList: [],
      daccountTypeList: [],
      delid: '',
      childrenFormVisible: false,
      title: '同步云片模板'
    }
  },
  computed: {
    // ...mapState('d2admin/user', ['info'])
  },
  created() {
    this.gettempList(1)
    this._initTab()
    this.getaccount()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    _initTab() {
      console.log('tableConfig', { ...shortTableConfig })
      shortTableConfig.tabHeadConfig.map((d, idx) => {
        d.id = idx + 1
      })
      this.tableConfig = shortTableConfig
    },
    tabEvns(k, v) {
      console.log('setIngV', 'onC' + k, k, v)
      this['onC' + k](v)
    },
    getTabSelList(v) {
      console.log('getTabSelList', v)
    },
    deleteThis(v) {
      this.$confirmDel('删除当前选择模版', () => {
        deletel(v.id).then(res => {
          if (res.code == 0) {
            this.this.gettempList(1)
          }
        })
      })
    },
    handleCurrentChange(e) {
      console.log('分页', e)
      this.gettempList(e)
    },
    gettempList(page) {
      const params =
        '?page=' + page + '&size=10' + '&tpl_content=' + this.searchName
      templatetmsg(params).then(res => {
        console.log('模板列表', res)
        if (res.data && res.data.data != null) {
          res.data.data.map(d => {
            d.create_time = formatDate(
              new Date(d.create_time),
              'yyyy-MM-dd hh:mm:ss'
            )
            if (d.check_status == 'CHECKING') {
              d.check_status = '审核中'
            } else if (d.check_status == 'FAIL') {
              d.check_status = '审核失败'
            } else if (d.check_status == 'SUCCESS') {
              d.check_status = '审核成功'
            } else if (d.check_status == 'APLLYING_VIP') {
              d.check_status = '普通通道审核成功申请升级专用通道中'
            } else {
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
    editThis(v, type) {
      if (type == '1') {
        this.dialogFormVisible = true
        this.editdialogFormVisible = false
        this.enabledText = {
          title: '新建模板'
        }
      } else {
        this.enabledText = {
          title: '编辑模板'
        }
        if (v) {
          console.log(v)
          this.submitmsg.id = v.id
          this.submitmsg.tplContent = v.tpl_content
          if (v.tpl_type == '1') {
            this.submitmsg.tplType = '验证码'
            this.isdisabled = false
          } else if (v.tpl_type == '2') {
            this.submitmsg.tplType = '通知类'
            this.isdisabled = false
          } else if (v.tpl_type == '3') {
            this.submitmsg.tplType = '营销类'
            this.isdisabled = true
          }
          this.submitmsg.sign = v.sign_content
          this.submitmsg.account = v.account
          this.submitmsg.tplId = null
          this.submitmsg.parameter = ''
          this.submitmsg.website = ''
        }
        this.dialogFormVisible = false
        this.editdialogFormVisible = true
      }
    },
    enabledOk(formName) {
      console.log(this.submitmsg.tplType)
      if (this.submitmsg.tplType == '验证码' && !this.submitmsg.website) {
        this.$notify.error({
          title: '错误',
          message: '请输入网络地址'
        })
        return
      }
      console.log(this.submitmsg)
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.submitmsg.tplType == '验证码') {
            this.submitmsg.tplType = '1'
          } else if (this.submitmsg.tplType == '通知类') {
            this.submitmsg.tplType = '2'
          } else if (this.submitmsg.tplType == '营销类') {
            this.submitmsg.tplType = '3'
          }
          const params = this.submitmsg
          adddefaultl(params).then(res => {
            console.log('发送账号', res)
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success'
              })
              this.submitmsg = {
                account: '',
                id: null,
                parameter: '',
                sign: '',
                tplContent: '',
                tplId: null,
                website: ''
              }
            }
          })
          this.dialogFormVisible = false
          this.editdialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    callOff() {
      // 点击弹框取消
      this.submitmsg = {
        account: '',
        id: null,
        parameter: '',
        sign: '',
        tplContent: '',
        tplId: null,
        tplType: '',
        website: ''
      }
      this.dialogFormVisible = false
      this.editdialogFormVisible = false
    },
    editcallOff() {
      this.dialogFormVisible = false
      this.editdialogFormVisible = false
    },
    esitenabledOk() {
      this.dialogFormVisible = true
      this.editdialogFormVisible = false
    },
    getaccount() {
      account().then(res => {
        console.log('发送账号', res)
        if (res.data.length > 0) {
          this.accountTypeList = res.data
          console.log(this.accountTypeList)
        }
      })
      defaultl().then(res => {
        console.log('常用模板', res)
        if (res.data.length > 0) {
          this.defaultTypeList = res.data
          console.log(this.defaultTypeList)
        }
      })
    },
    accountTypeChange(e) {
      for (let i = 0; i < this.accountTypeList.length; i++) {
        if (e == this.accountTypeList[i].id) {
          if (this.accountTypeList[i].type == '系统') {
            this.isdisabled = false
            this.submitmsg.tplType = '验证码'
          } else {
            this.isdisabled = true
            this.submitmsg.tplType = '营销类'
          }
        }
      }
      this.daccountTypeList = []
      daccount(e).then(res => {
        console.log('短信签名', res)
        if (res.data.length > 0) {
          this.daccountTypeList = res.data
          console.log(this.daccountTypeList)
        }
      })
    },
    choose() {
      this.defaultTypeList.map(d => {
        if (d.id == this.submitmsg.tplId) {
          this.submitmsg.tplContent = d.tpl_content
        }
      })
    },

    deleteff() {
      this.deleteFormVisible = false
    },

    synchronization() {
      this.childrenFormVisible = true
    },
    sure() {
      synchronizationtpl().then(res => {
        console.log('同步云模板', res)
        if (res.code == 0) {
          this.$notify({
            title: '成功',
            message: '同步成功',
            type: 'success'
          })
          this.childrenFormVisible = false
        }
      })
    },
    off() {
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
