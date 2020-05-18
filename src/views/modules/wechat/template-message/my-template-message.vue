<template>
  <div>
    <el-row
      :gutter="20"
      style="margin-bottom:10px;"
    >
      <el-col :span="24">
        <el-button
          style="float:left;"
          type="primary"
          size="small"
          @click="getTemplateMessage"
        >同步微信平台模板消息</el-button>
      </el-col>
    </el-row>

    <tableMobCopy
      ref="table_mob_one"
      :table-data="TemplateList"
      :table-config="tableConfig.Template"
      @sendData="getTemplateData"
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
</template>
<script>

import tableMobCopy from '@/components/GPMob/tableMobCopy'
import templateMessageTableConfig from '@/tableConfigs/wechat/templateMessageTableConfig'
import { templatesList, Deletetemplate, synTemplate } from '@/api/wechat/templateMessage'

export default {
  name: 'MyTemplateMessage',
  components: { tableMobCopy },
  data() {
    return {
      tableConfig: null,
      TemplateList: [],
      currentPage_t: 1,
      total_t: 0
    }
  },
  computed: {},
  created() {
    this.tableConfig = templateMessageTableConfig
    this.tableConfig.Template.operating = [ // 操作字段
      {
        name: 'details', // 详情
        btn: '详情',
        style: {}
      },
      {
        name: 'delete', // 删除
        btn: '删除',
        style: {
          color: '#f56c6c'
        }
      }
    ]
    this.getTemplateList(1)
  },
  mounted() {

  },
  beforeDestroy() { },
  methods: {
    getTemplateList(page) {
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
    handleCurrentChange_t(e) {
      this.getTemplateList(e)
    },
    getTemplateData(val) {
      if (val.click_event.btn == '详情') {
        this.$router.push({
          name: 'wechat-templateMessage-templateDetails',
          query: {
            id: val.click_data.id
          }
        })
      }

      if (val.click_event.btn == '删除') {
        this.delTemplate(val.click_data.id)
      }
    },
    delTemplate(id) {
      this.$confirm('确定删除此条模板消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Deletetemplate({
          id: id
        }).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })

            this.TemplateList.map((val, index) => {
              if (val.id == id) {
                this.TemplateList.splice(index, 1)
                this.total_t -= 1
              }
            })
          }
        })
      }).catch(() => {

      })
    },
    getTemplateMessage() {
      this.$confirm('您需要同步当前微信公众号平台上的模版消息吗, 是否继续?', '同步模板消息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        synTemplate({}).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '同步成功',
              type: 'success'
            })
            this.getTemplateList(1)
          }
        })
      }).catch(() => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>

