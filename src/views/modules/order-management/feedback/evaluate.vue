<template>
  <d2-container class="page">
    <h3 class="list-title">{{$t('order.evaluationManagement')}}</h3>
    <!-- 搜索↓ -->
    <el-row>
      <el-col class="box_col"
              :span="24">
        <div class="col_status">{{$t('order.tradeName')}}：</div>
        <div class="col_sty">
          <el-input size="mini"
                    placeholder="请输入商品名称"
                    v-model="form.name"
                    clearable>
          </el-input>
        </div>
        <div class="col_sty">
          <el-date-picker size="mini"
                          v-model="form.time"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          :range-separator="$t('datePicker.range')"
                          :start-placeholder="$t('order.startDate')"
                          :end-placeholder="$t('order.endDate')">
          </el-date-picker>
        </div>
        <div class="col_sty">
          <el-input size="mini"
                    :placeholder="$t('order.entry')"
                    v-model="form.number"
                    clearable>
          </el-input>
        </div>
        <el-button size="mini"
                   type="primary"
                   @click="clickSearch()">{{$t('layout.tooltip.search')}}</el-button>
        <el-button size="mini"
                   @click="clickEmpty()">{{$t('order.clearFilter')}}</el-button>
      </el-col>
    </el-row>
    <!-- 搜索↑ -->
    <!-- 列表↓ -->
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column :label="$t('order.tradeName')">
        <template slot-scope="scope">
          {{ scope.row.productName }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.userName')">
        <template slot-scope="scope">
          {{ scope.row.memberName }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.orderForm')">
        <template slot-scope="scope">
          {{ scope.row.orderNum }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.evaluate')">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top">
            <p style="width:300px;text-align:center;"> {{ scope.row.evaluate }}</p>
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{$t('order.lookUp')}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.diagramResourceName')">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top">
            <p style="width:300px;">
              <img v-for="item in scope.row.picture"
                   :key="item"
                   style="width:50px;height:50px;margin-right:10px;"
                   :src="$fileUrl() + item" />
            </p>
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{$t('order.viewPicture')}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.tickingTime')">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('handle')">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     style="color:#F56C6C"
                     @click="handleDelete(scope.$index, scope.row)">{{$t('delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表↑ -->
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>
  </d2-container>
</template>
<script>
import { EvaluationManagement, EvaluationDel } from '@/api/order/order'
import { mapState } from "vuex";
export default {
  components: {},
  data () {
    return {
      form: {
        name: '',
        time: '',
        number: '',
      },
      currentPage: 1,
      total: 0,
      formData: {},
      tableData: []
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    this.formData = JSON.parse(JSON.stringify(this.form))
    this.evaluationManagementInterface(1);
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    // 评价管理列表接口 
    evaluationManagementInterface (page) {
      let option = {
        page: page,
        size: 10,
        channel: this.info.ChannelId
      }
      if (this.formData.name) {
        option.productName = this.formData.name
      }
      if (this.formData.time) {
        option.startTime = this.formData.time[0]
        option.endTime = this.formData.time[1]
      }
      if (this.formData.number) {
        option.orderNum = this.formData.number
      }
      EvaluationManagement(option).then(res => {
        if (res.code == 0) {
          this.total = res.data.count;
          if (res.data.list.length) {
            res.data.list.map(item => {
              if (item.picture) {
                item.picture = item.picture.split(',')
              }
            })
            this.tableData = res.data.list;
          }
        }
      })
    },
    clickEmpty () {
      this.form = {
        name: '',
        time: ['', ''],
        number: '',
      }
      this.formData = JSON.parse(JSON.stringify(this.form))
      this.currentPage = 1;
      this.evaluationManagementInterface(1);
    },
    clickSearch () {
      // 点击搜索按钮
      this.formData = JSON.parse(JSON.stringify(this.form))
      this.currentPage = 1;
      this.evaluationManagementInterface(1);
    },
    handleDelete (index, row) {
      this.$confirm("确定删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          EvaluationDel({
            orderId: row.orderId,
          }).then(res => {
            if (res.code == 0) {
              this.open2('成功', '删除成功', 'success');
              this.evaluationManagementInterface(1);
            } else {
              this.open2('警告', res.message, 'warning');
            }
          })
        })
        .catch(() => {
          this.open2('警告', error.message, 'warning');
        });
    },
    handleCurrentChange (e) {
      // 点击分页
      this.currentPage = e;
      this.evaluationManagementInterface(e);
    },
    open2 (title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.el-row,
.el-col {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.box_col {
  display: flex;
  align-items: center;
  .col_status {
    margin-right: 10px;
  }
  .col_sty {
    margin-right: 10px;
    .sty_inp {
      width: 20%;
    }
  }
}
.table_title {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>

