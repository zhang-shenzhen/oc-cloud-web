<template>
  <d2-container class="page">
    <!-- <h3 class="list-title">触发器列表</h3> -->
    <div class="caozuo">
      <el-button type="primary"
                 size="mini"
                 @click="goAddTrigger()">{{ $t('wechat.trigger.addTrigger') }}</el-button>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData"
                  style="width: 100%"
                  size="mini">
          <el-table-column :label="$t('wechat.menu.number')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('member.filter.name')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.trigger.flipFlop')">
            <template slot-scope="scope">
              <span v-if="scope.row.event.type == 0"
                    style="margin-left: 10px">任意操作</span>
              <span v-if="scope.row.event.type == 1"
                    style="margin-left: 10px">关注</span>
              <span v-if="scope.row.event.type == 3"
                    style="margin-left: 10px">点击菜单</span>
              <span v-if="scope.row.event.type == 4"
                    style="margin-left: 10px">发送消息</span>
              <span v-if="scope.row.event.type == 6"
                    style="margin-left: 10px">会员开卡</span>
              <span v-if="scope.row.event.type == 7"
                    style="margin-left: 10px">订单状态更改</span>
              <span v-if="scope.row.event.type == 8"
                    style="margin-left: 10px">指定时间</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.trigger.messageType')">
            <template slot-scope="scope">
              <span v-if="scope.row.operation.operationItems[0].type==1"
                    style="margin-left: 10px">消息</span>
              <span v-if="scope.row.operation.operationItems[0].type==2"
                    style="margin-left: 10px">图片</span>
              <span v-if="scope.row.operation.operationItems[0].type==4"
                    style="margin-left: 10px">对话</span>
              <span v-if="scope.row.operation.operationItems[0].type==5"
                    style="margin-left: 10px">扫码关注并回复</span>
              <span v-if="scope.row.operation.operationItems[0].type==6"
                    style="margin-left: 10px">图文</span>
              <span v-if="scope.row.operation.operationItems[0].type==11"
                    style="margin-left: 10px">模板消息</span>
              <span v-if="scope.row.operation.operationItems[0].type==12"
                    style="margin-left: 10px">赠送积分</span>
              <span v-if="scope.row.operation.operationItems[0].type==13"
                    style="margin-left: 10px">发送短信</span>
              <span v-if="scope.row.operation.operationItems[0].type==14"
                    style="margin-left: 10px">发送卡券</span>
              <span v-if="scope.row.operation.operationItems[0].type==15&&scope.row.operation.operationItems[0].value[0].field=='sex'"
                    style="margin-left: 10px">性别</span>
              <span v-if="scope.row.operation.operationItems[0].type==15&&scope.row.operation.operationItems[0].value[0].field=='memberOrNot'"
                    style="margin-left: 10px">是否为会员</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('schedule.status')">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabled"
                         active-color="#13ce66"
                         inactive-color="#ff4949"
                         @change="selectSwitch(scope.row.id,scope.row.enabled)" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('member.filter.operation')">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="text"
                         @click="handleEdit(scope.row.id)">{{ $t('member.filter.edit') }}</el-button>
              <el-button size="mini"
                         type="text"
                         style="color:#F56C6C"
                         @click="handleDelete(scope.row.id,scope.row.enabled)">{{ $t('member.filter.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 页数 -->
    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>
    <!-- 修改状态弹框 -->
    <!-- <el-dialog :title="enabledText.title"
               width="30%"
               :visible.sync="dialogFormVisible">
      <div>{{ enabledText.content }}</div>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   @click="enabledOk()">确 定</el-button>
        <el-button size="mini"
                   @click="callOff()">取 消</el-button>
      </div>
    </el-dialog> -->
    <el-dialog title="提示"
               :visible.sync="dialogFormVisible"
               width="30%"
               :before-close="callOff">
      <span>{{ enabledText.content }}</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   @click="enabledOk()">确 定</el-button>
        <el-button size="mini"
                   @click="callOff()">取 消</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  triggerList,
  TriggerEnable,
  TriggerDisable,
  TriggerDelete
} from '@/api/wechat/trigger'
export default {
  name: 'TriggerLists',
  components: {},
  data () {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      enabled: '',
      triger: {
        id: '',
        triggerId: '',
        enabled: '',
        interface: ''
      },

      dialogFormVisible: false,
      dialogTableVisible: false,
      enabledText: {
        title: '启用触发器',
        content: '确认启用触发器'
      }
    }
  },
  computed: {},
  created () {
    this.getTriggerList(1)
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    goAddTrigger () {
      this.$router.push({
        name: 'wechat-trigger-trigger-news' // 路径
      })
    },
    getTriggerList (num) {
      const object = {
        page: num,
        pageSize: 10,
        type: 1
      }
      console.log(object, triggerList)
      triggerList(object).then(res => {
        if (res.code == 0) {
          console.log('筛选器列表', res)
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    handleEdit (id) {
      console.log(id, '编辑id============')
      this.$router.push({
        name: 'wechat-trigger-edit', // 路径
        query: { id: id } // 参数
      })
    },
    handleDelete (id, enabled) {
      this.triger.id = id
      this.enabled = enabled
      console.log('删除', id)
      // 点击删除按钮
      if (this.enabled) {
        this.open('警告', '无法删除启用状态的触发器', 'warning')
        return
      }
      this.$confirm('确定删除此条模板消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          TriggerDelete({}, id).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              })
              this.getTriggerList(1)
            } else {
              this.open('警告', res.message, 'warning')
            }
          })
        })
        .catch(() => { })
    },
    handleCurrentChange (e) {
      console.log('分页', e)
      this.getTriggerList(e)
    },
    selectSwitch (id, enabled) {
      console.log(id, enabled)
      this.triger.triggerId = id
      this.triger.enabled = enabled
      if (enabled) {
        this.enabledText = {
          title: '启用触发器',
          content: '确认启用触发器'
        }
      } else {
        this.enabledText = {
          title: '禁用触发器',
          content: '确认禁用触发器'
        }
      }
      this.dialogFormVisible = true
    },
    enabledOk () {
      // 点击弹框确认
      if (this.triger.enabled == false) {
        // 启用
        this.triggerInterface(TriggerDisable)
      } else if (this.triger.enabled == true) {
        // 禁用
        this.triggerInterface(TriggerEnable)
      }
    },
    triggerInterface (list) {
      list({}, this.triger.triggerId).then(res => {
        if (res.code == 0) {
          console.log('接口状态修改', res)
          this.open('成功', '修改成功', 'success')
          this.dialogFormVisible = false
        }
      })
    },

    callOff () {
      // 点击弹框取消
      this.tableData.map(res => {
        if (res.id == this.triger.triggerId) {
          res.enabled = !res.enabled
        }
      })
      this.dialogFormVisible = false
    },
    open (title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

