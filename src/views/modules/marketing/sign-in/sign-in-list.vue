<template>
  <d2-container class="page">
    <div class="caozuo">
      <el-button type="primary" size="mini" @click="newsSignin">{{
        $t('brand.CheckIn')
      }}</el-button>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          size="mini"
          style="width: 100%"
          max-height="500"
        >
          <el-table-column :label="$t('c') + $t('news.title')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c') + $t('pe')">
            <template slot-scope="scope">
              <span v-if="!scope.row.attendanceTimes" style="margin-left: 10px"
                >0</span
              >
              <span
                v-if="scope.row.attendanceTimes"
                style="margin-left: 10px"
                >{{ scope.row.attendanceTimes }}</span
              >
            </template>
          </el-table-column>
          <el-table-column :label="$t('c') + $t('npe')">
            <template slot-scope="scope">
              <span v-if="scope.row.attendanceNum" style="margin-left: 10px">{{
                scope.row.attendanceNum
              }}</span>
              <span v-if="!scope.row.attendanceNum" style="margin-left: 10px"
                >0</span
              >
            </template>
          </el-table-column>
          <el-table-column :label="$t('datePicker.start')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.beginTime }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('datePicker.end')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('outerLink')">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="copy(scope.row.url)">{{
                $t('look')
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="signInStatistics(scope.row.id)"
                >{{ $t('data') }}</el-button
              >
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.row.id)"
                >{{ $t('edit') }}</el-button
              >
              <el-button
                size="mini"
                type="text"
                @click="handleNews(scope.row.id)"
                >{{ $t('copy') }}</el-button
              >
              <el-button
                size="mini"
                type="text"
                style="color:#F56C6C"
                @click="handleDelete(scope.row.id)"
                >{{ $t('delete') }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 页数 -->
    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      :title="$t('outerLink')"
      width="40%"
      :visible.sync="dialogFormVisible"
    >
      <span>{{ $t('outerLink') }}:</span>
      <span>{{ copyUrl }}</span>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-clipboard:copy="copyUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          size="mini"
          type="primary"
          @click="dialogFormVisible = false"
          >{{ $t('copy') }}</el-button
        >
        <el-button size="mini" @click="dialogFormVisible = false">{{
          $t('cancel')
        }}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
import { TableDataList, DeleteDate, CopyingData } from '@/api/marketing/signin'
import { formatDate } from '@/utils/index'
export default {
  components: {},
  data() {
    return {
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      copyUrl: '',
      tableData: []
    }
  },
  computed: {},
  created() {
    this.TableDataInterface(1)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    newsSignin() {
      // 跳转到新增签到页面
      this.$router.push({
        name: 'signInAdd'
      })
    },
    TableDataInterface(e) {
      // 签到列表接口
      const obj = {
        page: e,
        size: 10
      }
      TableDataList(obj).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            console.log('签到列表接口', res)
            res.data.data.map(res => {
              res.beginTime = formatDate(new Date(res.beginTime), 'yyyy/MM/dd')
              res.endTime = formatDate(new Date(res.endTime), 'yyyy/MM/dd')
            })
            this.tableData = res.data.data
          } else {
            this.tableData = []
          }
          this.total = res.data.total
        }
      })
    },
    handleCurrentChange(e) {
      // 页面跳转
      this.TableDataInterface(e)
    },
    copy(url) {
      // 点击查看
      console.log('点击查看', url, document)
      this.copyUrl = url
      this.dialogFormVisible = true
    },
    onError() {
      this.$notify.error({
        title: '错误',
        message: '复制失败'
      })
    },
    onCopy() {
      this.$notify({
        title: '成功',
        message: '复制成功',
        type: 'success'
      })
    },

    handleEdit(id) {
      // 点击编辑按钮
      console.log(id)
      this.$router.push({
        name: 'signInEdit',
        query: { id: id }
      })
    },
    signInStatistics(id) {
      // 点击数据按钮
      this.$router.push({
        name: 'signInStatistics',
        query: { id: id }
      })
    },
    handleNews(id) {
      // 列表上的复制按钮
      CopyingData({}, id).then(res => {
        if (res.code == 0) {
          console.log('列表上的复制按钮', res)
          this.TableDataInterface(1)
          this.open('成功', '数据复制成功!', 'success')
        }
      })
    },
    handleDelete(id) {
      console.log('删除里的', id)
      this.$confirm('确定删除此条模板消息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          DeleteDate({ id: id }).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              })
              this.TableDataInterface(1)
            } else {
              this.open('警告', res.message, 'warning')
            }
          })
        })
        .catch(() => {})
    },
    open(title, message, type) {
      // 通知框
      this.$notify({
        title: title,
        message: message,
        type: type
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
