<template>
  <div>
    <el-row style="margin-bottom:15px;"
            :gutter="20">
      <el-col :span="24">
        <el-button style="float:left;"
                   type="primary"
                   size="small"
                   @click="addTemplateMessage">添加模板消息</el-button>
      </el-col>
    </el-row>

    <tableMobCopy ref="table_mob"
                  :table-data="MessageList"
                  :table-config="tableConfig.Message"
                  @sendData="getTableData" />

    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>

    <el-dialog title="选择模板"
               :visible.sync="addTemplateBtn">

      <div>
        <tableMobCopy ref="table_mob_one"
                      :table-data="TemplateList"
                      :table-config="tableConfig.Template"
                      @sendData="getTemplateData" />

        <div class="pagination">
          <el-pagination background
                         :current-page="currentPage_t"
                         layout="total, prev, pager, next, jumper"
                         :total="total_t"
                         @current-change="handleCurrentChange_t" />
        </div>

      </div>

      <!-- <span
        slot="footer"
        class="dialog-footer"
      >

        <el-button
          size="mini"
          @click="addTemplateBtn = false"
        >取 消</el-button>

      </span> -->
    </el-dialog>

  </div>
</template>
<script>
import tableMobCopy from '@/components/GPMob/tableMobCopy'
import templateMessageTableConfig from '@/tableConfigs/wechat/templateMessageTableConfig'
import { messagesList, delTemplateMeassge, templatesList } from '@/api/wechat/templateMessage'
export default {
  name: 'TemplateMessage',
  components: { tableMobCopy },
  data () {
    return {
      addTemplateBtn: false,
      // dialogVisible:false,
      tableConfig: null,
      MessageList: [],
      currentPage: 1,
      total: 0,
      itemObj: null,
      TemplateList: [],
      currentPage_t: 1,
      total_t: 0
    }
  },
  computed: {},
  created () {
    this.tableConfig = templateMessageTableConfig
    this.tableConfig.Template.operating = [ // 操作字段
      {
        name: 'choose', // 选择
        btn: '选择',
        style: {
          width: 80
        }
      }]
    this.getList(1)
    this.getTemplateList(1)
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    getList (page) {
      const sendData = {
        page: page,
        size: 10
      }
      messagesList(sendData).then(res => {
        this.MessageList = []
        if (res.code == 0) {
          this.total = res.data.total
          this.currentPage = page
          if (res.data.data) {
            res.data.data.map((val, index) => {
              if (page > 1) {
                val.number = (page * 10 - 10) + (index + 1)
              } else {
                val.number = index + 1
              }
            })
          }

          this.MessageList = res.data.data
        }
      })
    },
    getTemplateList (page) {
      const sendData = {
        page: page,
        size: 10
      }
      templatesList(sendData).then(res => {
        this.TemplateList = []
        if (res.code == 0) {
          this.total_t = res.data.total
          this.currentPage_t = page
          res.data.data.map((val, index) => {
            if (page > 1) {
              val.number = (page * 10 - 10) + (index + 1)
            } else {
              val.number = index + 1
            }
          })
          this.TemplateList = res.data.data
        }
      })
    },
    handleCurrentChange (e) {
      this.getList(e)
    },
    delTemplateMessage () {
      this.$confirm('确定删除此条模板消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delTemplateMeassge({
          id: this.itemObj.id
        }).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })

            this.MessageList.map((val, index) => {
              if (val.id == this.itemObj.id) {
                this.MessageList.splice(index, 1)
                this.total -= 1
              }
            })
          }
        })
      }).catch(() => {

      })
    },
    addTemplateMessage () {
      this.addTemplateBtn = true
    },
    handleCurrentChange_t (e) {
      this.getTemplateList(e)
    },
    getTableData (val) {
      const btn = val.click_event.btn
      this.itemObj = val.click_data
      if (btn == '编辑') {
        this.$router.push({
          name: 'wechat-templateMessage-addTemplateMessage',
          query: {
            id: this.itemObj.id,
            type: 'update'
          }
        })
      }

      if (btn == '删除') {
        this.delTemplateMessage()
      }
    },
    getTemplateData (val) {
      if (val.click_event.btn == '选择') {
        this.addTemplateBtn = false
        this.$router.push({
          name: 'wechat-templateMessage-addTemplateMessage',
          query: {
            id: val.click_data.id,
            type: 'add'
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  margin-top: 10px;
}
</style>

<style lang="scss" >
.el-dialog {
  margin-top: 5vh !important;
}
.el-dialog__body {
  padding: 0px 20px 20px 20px !important;
}
</style>
