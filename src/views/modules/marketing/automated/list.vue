<template>
  <d2-container class="page">
    <h3 class="list-title">自动化营销列表</h3>

    <el-row :gutter="24" style="margin-bottom:20px;">
      <el-col :span="5">
        <el-input
          v-model="keyword"
          class="input-with-select"
          placeholder="请输入名称"
          clearable
          size="mini"
          @clear="clearSearch"
        >
          <el-button
            slot="append"
            size="mini"
            icon="el-icon-search"
            @click="search"
          />
        </el-input>
      </el-col>
      <el-col :span="15">
        <div class="grid-content" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content1">
          <el-button
            style="float: right;"
            size="mini"
            type="primary"
            @click="addAutomated"
            >新建自动化营销</el-button
          >
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" width="180">
        <template slot-scope="scope">
          <span>{{ showType(scope.row.type) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="200">
        <template slot-scope="scope">{{
          $formatDate(new Date(scope.row.createTime), 'yyyy-MM-dd hh:mm:ss')
        }}</template>
      </el-table-column>

      <el-table-column label="进行中">
        <template slot-scope="scope">{{ scope.row.inProgressTotal }}</template>
      </el-table-column>

      <el-table-column label="完成次数">
        <template slot-scope="scope">{{ scope.row.finishedTotal }}</template>
      </el-table-column>

      <el-table-column label="总次数">
        <template slot-scope="scope">{{ scope.row.total }}</template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">{{
          showStatus(scope.row.status)
        }}</template>
      </el-table-column>

      <el-table-column label="备注">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>

      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 1"
            size="mini"
            type="text"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >

          <el-button size="mini" type="text" @click="Look(scope.row)"
            >查看</el-button
          >

          <el-button size="mini" type="text" @click="Copy(scope.row)"
            >复制</el-button
          >

          <el-button
            v-if="
              scope.row.type != 2 &&
                (scope.row.status == 2 ||
                  scope.row.status == 3 ||
                  scope.row.status == 4)
            "
            size="mini"
            type="text"
            @click="open(scope.row)"
            >{{ scope.row.status == 3 ? '关闭' : '开启' }}</el-button
          >

          <el-button
            v-if="scope.row.type == 2 && scope.row.status == 2"
            size="mini"
            type="text"
            @click="open(scope.row)"
            >开启</el-button
          >

          <el-button
            v-if="scope.row.status != 2"
            size="mini"
            type="text"
            style="color:#f56c6c"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </d2-container>
</template>
<script>
import {
  automateList,
  FlowStatistics,
  FlowOpen,
  FlowDelete,
  copyAutomate,
  executeOpen,
} from '@/api/marketing/automated'

export default {
  name: 'Automated',
  components: {},
  data() {
    return {
      keyword: null,
      total: 0,
      currentPage: 1,
      tableData: [],
    }
  },
  computed: {},
  created() {
    this.getautomateList(1)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    showType(num) {
      let str = null
      switch (num) {
        case 1:
          str = '实时营销'
          break
        case 2:
          str = '单次营销'
          break
        case 3:
          str = '周期营销'
          break
        case 4:
          str = '节日营销'
          break
      }
      return str
    },
    showStatus(num) {
      let str = null
      switch (num) {
        case 1:
          str = '草稿'
          break
        case 2:
          str = '预开启'
          break
        case 3:
          str = '已开启'
          break
        case 4:
          str = '已关闭'
          break
        case 5:
          str = '已执行'
          break
      }
      return str
    },
    getautomateList(page) {
      const sendData = {
        page: page,
        size: 10,
      }

      if (!this.$isNull(this.keyword)) {
        sendData.title = this.keyword
      }

      automateList(sendData).then((res) => {
        if (res.code == 0) {
          this.total = res.data.count
          this.currentPage = page
          if (res.data.list) {
            this.tableData = res.data.list
            this.tableData.map((val) => {
              if (val.type == 1) {
                FlowStatistics({
                  id: val.id,
                }).then((data) => {
                  if (data.code == 0) {
                    this.tableData.map((item) => {
                      if (item.id == val.id) {
                        this.$set(
                          item,
                          'finishedTotal',
                          data.data.finishedTotal
                        )
                        this.$set(
                          item,
                          'inProgressTotal',
                          data.data.inProgressTotal
                        )
                        this.$set(item, 'total', data.data.total)
                      }
                    })
                  }
                })
              } else {
                this.$set(val, 'finishedTotal', val.passTotal)
                this.$set(val, 'inProgressTotal', '-')
                this.$set(val, 'total', '-')
              }
            })
          }
        }
      })
    },
    handleCurrentChange(e) {
      this.getautomateList(e)
    },
    clearSearch() {
      this.getautomateList(1)
    },
    search() {
      this.getautomateList(1)
    },
    addAutomated() {
      this.$router.push({
        name: 'marketing-Automated-addAutomated',
      })
    },
    goPage(num) {
      let str = null
      switch (num) {
        case 1:
          str = 'marketing-Automated-draw'
          break
        case 2:
          str = 'singl-marketing-draw'
          break
        case 3:
          str = 'cycle-marketing-draw'
          break
        case 4:
          str = 'festival-marketing-draw'
          break
      }
      return str
    },
    handleEdit(item) {
      this.$router.push({
        name: this.goPage(item.type),
        query: {
          id: item.id,
        },
      })
    },
    Look(item) {
      this.$router.push({
        name: this.goPage(item.type),
        query: {
          id: item.id,
          islook: true,
        },
      })
    },
    handleDelete(item) {
      this.$confirm('确定删除此条, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          FlowDelete({
            id: item.id,
          }).then((res) => {
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
              })

              this.tableData.map((val, index) => {
                if (val.id == item.id) {
                  this.tableData.splice(index, 1)
                }
              })
            }
          })
        })
        .catch(() => {})
    },
    open(item) {
      if (item.type == 2) {
        if (item.status == 3) {
          this.$notify.error({
            title: '错误',
            message: '单次营销不允许关闭',
          })
          return
        }
        executeOpen({
          id: item.id,
        }).then((res) => {
          if (res.code == 0) {
            this.tableData.map((val) => {
              if (val.id == item.id) {
                this.$set(val, 'status', 3)
                this.$notify({
                  title: '成功',
                  message: '开启成功',
                  type: 'success',
                })
              }
            })
          }
        })
      } else {
        FlowOpen({
          open: item.status != 3,
          id: item.id,
        }).then((res) => {
          if (res.code == 0) {
            this.tableData.map((val) => {
              if (val.id == item.id) {
                if (item.status == 3) {
                  this.$set(val, 'status', 4)
                  this.$notify({
                    title: '成功',
                    message: '关闭成功',
                    type: 'success',
                  })
                } else {
                  this.$set(val, 'status', 3)
                  this.$notify({
                    title: '成功',
                    message: '开启成功',
                    type: 'success',
                  })
                }
              }
            })
          }
        })
      }
    },
    Copy(item) {
      copyAutomate({
        id: item.id,
      }).then((res) => {
        if (res.code == 0) {
          this.$notify({
            title: '成功',
            message: '复制成功',
            type: 'success',
          })
          this.getautomateList(this.currentPage)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.grid-content {
  width: 100%;
  height: 35px;
}
</style>
