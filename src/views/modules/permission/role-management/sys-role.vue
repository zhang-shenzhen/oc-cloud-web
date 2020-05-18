<template>
  <d2-container class="page">
    <div class="driverList">
      <div class="search-box">
        <el-form>
          <el-form-item class="search-box-item" label style="display:flex;">
            <div style="display:flex;line-height: 0;margin-top: 5px;">
              <el-input v-model="searchName" size="mini" placeholder="角色名称" />
              <el-button
                style="margin-left:20px;"
                size="mini"
                type="primary"
                @click="getDriverList()"
              >搜索</el-button>
              <el-button size="mini" type="primary" @click="isAddOrEdit()">新建角色</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- tabMob -->
      <table-mob
        ref="table_mob"
        :table-data="tableData"
        :table-config="tableConfig"
        :tabs-slots="f_tabsSlots"
        @_selectionChange="getTabSelList"
      >
        <template v-slot:starLevel="starLevel">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          />
        </template>

        <template v-slot:operating="operating">
          <el-button type="text" size="mini" @click="isAddOrEdit(operating.operating)">编辑</el-button>
          <el-button type="text" size="mini" @click="deleteAlert(operating.operating)">删除</el-button>
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
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <el-dialog
      :title="!dataForm.id ? $t('add') : $t('update')"
      :visible.sync="dialogDriverInfoVisible"
    >
      <div class="sysRoleInfoData">
        <el-form ref="tree" :model="dataForm" size="mini" label-width="80px">
          <el-form-item label="角色名称">
            <el-input placeholder="请输入角色名称" v-model="dataForm.name" prop="name" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input placeholder="请输入备注" v-model="dataForm.note" prop="note" size="mini" />
          </el-form-item>
          <el-form-item label="菜单授权">
            <el-tree
              ref="menuListTree"
              :data="treeMenuList"
              :props="{ label: 'name', children: 'childList' }"
              node-key="permission"
              :default-checked-keys="permissionList"
              accordion
              show-checkbox
            />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="addOrEdit">确定</el-button>
            <el-button size="mini" @click="dialogDriverInfoVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- </div> -->
  </d2-container>
</template>

<script>
import roleListConfig from "@/tableConfigs/permission/role-management/role-management";
import {
  roleList,
  roleAdd,
  roleEdit,
  roleDetails,
  roleDel,
  permissionUser
} from "@/api/permission";
// sys-roleInfo
export default {
  components: {},
  data() {
    return {
      value: 3.7,
      total: 0,
      page: 1,
      currentPage: 1,
      tableData: [],
      tableConfig: {},
      tabSelList: [],
      tabSelIdList: [],
      searchName: "",
      f_tabsSlots: { operating: "operating", starLevel: "starLevel" }, // 插槽
      dialogDriverInfoVisible: false,
      driverInfoData: null,
      dataForm: {
        id: null,
        name: null,
        note: null
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      menuList: [],
      treeMenuList: [],
      permissionList: []
    };
  },
  computed: {},
  created() {
    this.getList(1);
    this.initTab();
    this.getPermissionUser();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.$refs.menuListTree.setCheckedKeys([]);
      });
    },
    initTab() {
      this.tableConfig = roleListConfig;
    },
    // 获取指定用户所有权限
    getPermissionUser() {
      // console.log('userId', localStorage.getItem('userInfo'))
      const userId = JSON.parse(
        localStorage.getItem(`userInfo-${process.env.VUE_APP_VERSION}`)
      ).id;
      permissionUser(userId).then(res => {
        console.log("获取指定用户所有权限", res);
        if (res && res.code == 0) {
          this.setData(res.data);
          console.log(res.data);
          this.menuList = res.data;
        }
      });
    },
    // 递归处理 菜单授权 数据 显示
    setData(arr) {
      if (arr.length > 0) {
        for (const i in arr) {
          arr[i].name = JSON.parse(arr[i].name).zh_CN;
          if (arr[i].childList.length > 0) {
            this.setData(arr[i].childList);
          }
        }
      }
    },
    // 角色列表
    getList(page) {
      this.tableData = [];
      const params = {
        size: 10,
        page: page
      };
      Object.assign(params, this.form);
      roleList(params).then(res => {
        console.log("角色列表", res);
        this.currentPage = page;
        res.data.data.map(val => {
          val.createTime = this.$formatDate(
            new Date(val.createTime),
            "yyyy-MM-dd hh:mm:ss"
          );
          this.tableData.push(val);
        });

        this.total = res.data.total;
      });
    },
    getTabSelList(v) {
      this.tabSelList = v;
      const tabSelIdList = [];
      v.map(d => {
        tabSelIdList.push(d.id);
      });
      this.tabSelIdList = tabSelIdList;
    },
    isAddOrEdit(data) {
      this.permissionList = [];
      this.treeMenuList = [...this.menuList];
      if (data) {
        // edit
        console.log("edit");
        this.getDetails(data);
      } else {
        // add
        console.log("add");
        this.dialogDriverInfoVisible = true;
        this.dataForm = {};
      }
    },
    getDetails(data) {
      roleDetails(data.id).then(res => {
        console.log("详情", res);
        if (res && res.code == 0) {
          this.dataForm = res.data;
          if (res.data.description) {
            this.$set(this.dataForm, "note", res.data.description);
          } else {
            this.$set(this.dataForm, "note", null);
          }
          this.dialogDriverInfoVisible = true;
          let list = [];
          //递归
          let permissions = this.setPermissionList(
            res.data.permissions[0].childList,
            list
          );
          console.log(permissions);
          setTimeout(() => {
            if (permissions.length > 0) {
              this.$refs.menuListTree.setCheckedKeys(permissions, false);
            }
          }, 500);
        }
      });
    },
    setPermissionList(arr, list) {
      if (arr.length > 0) {
        for (const i in arr) {
          if (arr[i].permission.indexOf(".*") == -1) {
            list.push(arr[i].permission);
          }
          if (arr[i].childList.length > 0) {
            this.setPermissionList(arr[i].childList, list);
          }
        }
      }
      return list;
    },
    addOrEdit() {
      if (this.dataForm.id) {
        // edit
        console.log("edit", this.dataForm);
        this.edit();
      } else {
        // add
        console.log("add", this.dataForm);
        this.add();
      }
    },
    add() {
      console.log("menuList", this.menuList);
      console.log(this.$refs.menuListTree.getCheckedKeys());
      console.log(this.$refs.menuListTree.getHalfCheckedKeys());
      const permissions = [];
      for (const i in this.$refs.menuListTree.getCheckedKeys()) {
        permissions.push({
          permission: this.$refs.menuListTree.getCheckedKeys()[i]
        });
      }
      for (const i in this.$refs.menuListTree.getHalfCheckedKeys()) {
        permissions.push({
          permission: this.$refs.menuListTree.getHalfCheckedKeys()[i]
        });
      }

      roleAdd({
        name: this.dataForm.name,
        description: this.dataForm.note,
        permissions: permissions
      }).then(res => {
        console.log("添加角色", res);
        if (res.code == 0) {
          this.dialogDriverInfoVisible = false;
          this.getList(1);
        }
      });
    },
    edit() {
      const permissions = [];
      for (const i in this.$refs.menuListTree.getCheckedKeys()) {
        permissions.push({
          permission: this.$refs.menuListTree.getCheckedKeys()[i]
        });
      }
      for (const i in this.$refs.menuListTree.getHalfCheckedKeys()) {
        permissions.push({
          permission: this.$refs.menuListTree.getHalfCheckedKeys()[i]
        });
      }
      roleEdit({
        id: this.dataForm.id,
        name: this.dataForm.name,
        description: this.dataForm.note,
        permissions: permissions
      }).then(res => {
        console.log("编辑角色", res);
        if (res.code == 0) {
          this.dialogDriverInfoVisible = false;
          this.getList(1);
        }
      });
    },
    // 删除alert
    deleteAlert(data) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.remove(data);
      });
    },
    remove(data) {
      console.log("删除角色", data);
      roleDel({
        id: data.id
      }).then(res => {
        if (res.code == 0) {
          this.getList(1);
        }
      });
    },
    // 分页获取数据
    handleCurrentChange(e) {
      this.getList(e);
    }
  }
};
</script>

<style lang="scss" scope>
.driverList {
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
