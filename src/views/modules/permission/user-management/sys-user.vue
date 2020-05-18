<template>
  <d2-container class="page">
    <div class="driverList">
      <div class="search-box">
        <el-form>
          <el-form-item class="search-box-item"
                        label
                        style="display:flex;">
            <div style="display:flex;line-height: 0;margin-top: 5px;">
              <el-input v-model="form.username"
                        size="mini"
                        clearable
                        placeholder="用户名" />
              <el-button style="margin-left:20px;"
                         size="mini"
                         type="primary"
                         @click="UserListInterface(1)">搜索</el-button>
              <el-button size="mini"
                         type="primary"
                         @click="newRole()">新建</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="deleteRole">删除</el-button>
              <el-button size="mini"
                         type="primary"
                         @click="1">导出</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :default-sort="{prop: 'date', order: 'descending'}"
                @sort-change="sortChange"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column label="用户名">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="所属部门">
          <template slot-scope="scope">{{ scope.row.departmentName }}</template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="text"
                       style="color:#F56C6C"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background
                       :current-page="currentPage"
                       layout="total, prev, pager, next, jumper"
                       :total="total"
                       @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 编辑 -->
    <div v-if="dialogDriverInfoVisible"
         class="sys-user-info">
      <el-dialog title="用户"
                 width="40%"
                 :visible.sync="dialogDriverInfoVisible">
        <sys-user-info :driverInfoData="driverInfoId"
                       :driverId="driverId"
                       @getValue="getCheckValue" />
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import sysUserInfo from './sys-user-info'
import {
  userList, userDel, deleteBatches
} from "@/api/permission";
import { mapState } from "vuex";
export default {
  components: {
    'sys-user-info': sysUserInfo
  },
  data () {
    return {
      form: {
        username: null
      },
      driverId: '',
      total: 0,
      currentPage: 1,
      dialogDriverInfoVisible: false,
      driverInfoId: '1234567890',
      tableData: [],
      multipleSelection: [],
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
  },
  mounted () {
    this.UserListInterface(1);
  },
  beforeDestroy () { },
  methods: {
    // 用户列表接口 
    UserListInterface (e) {
      let option = {
        page: e,
        size: 10,
      }
      if (this.form.username) {
        option.nickName = this.form.keyWord;
      }
      userList(option).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            res.data.data.map(item => {
              item.createTime = this.$formatDate(new Date(item.createTime), "yyyy-MM-dd hh:mm:ss");
            })
          }
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.currentPage = res.data.page;
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },
    sortChange (column, prop, order) {
      console.log('你过来吧', column, prop, order)
    },
    handleEdit (index, row) {
      console.log(index, row);
      this.driverId = row.id;
      this.dialogDriverInfoVisible = true;
    },
    handleDelete (index, row) {
      console.log(index, row);
      this.$confirm("确定此操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.DeleteInterface(row.id);
        })
        .catch(() => { });
    },
    newRole () {
      // 新建按钮
      this.driverId = '';
      this.dialogDriverInfoVisible = true;
    },
    deleteRole () {
      // 点击删除
      if (!this.multipleSelection.length) {
        this.$notify.error({
          title: '错误',
          message: '请选择要删除的用户'
        });
        return;
      }
      let str = [];
      this.multipleSelection.map(item => {
        str.push(item.id)
      })
      let userIds = JSON.parse(JSON.stringify(str))
      this.$confirm("确定此操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteBatches(userIds).then(res => {
            if (res.code == 0) {
              this.UserListInterface(1);
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              });
            }
          })
        })
        .catch(() => { });
    },
    // 删除接口
    DeleteInterface (id) {
      userDel({
        id: id
      }).then(res => {
        if (res.code == 0) {
          this.UserListInterface(1);
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },

    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    getCheckValue (e) {
      // 弹框数据
      this.dialogDriverInfoVisible = false;
      this.UserListInterface(1);
    },
    // 分页获取数据
    handleCurrentChange (e) {
      this.UserListInterface(e)
    }
  }
}
</script>

<style lang="scss" scope>
.userTotal {
  font-size: 16px;
  color: #000;
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

.v-name {
  color: #409eff;
  cursor: pointer;
}
</style>
<style lang="scss" >
.driverList {
  .el-form-item__label {
    min-width: 100px;
    text-align: left;
  }
  .el-table th {
    color: #000 !important;
    // background: #f7f6f2 !important;
    text-align: center !important;
  }
  .el-table td {
    text-align: center !important;
  }
}
</style>
