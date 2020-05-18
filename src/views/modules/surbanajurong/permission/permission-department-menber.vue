<template>
  <d2-container class="page">
    <div class="caozuo">
      <el-button
        v-if="$Buttonpermissions('surbanajurong.permission.permission-department-menber[add-department]')"
        type="primary"
        size="mini"
        @click="addDepartment"
      >{{$t('role.add_dep')}}</el-button>
      <el-button
        v-if="$Buttonpermissions('surbanajurong.permission.permission-department-menber[update-department]')"
        type="primary"
        size="mini"
        @click="update"
      >{{$t('role.upa_dep')}}</el-button>
      <el-button
        v-if="$Buttonpermissions('surbanajurong.permission.permission-department-menber[del-department]')"
        type="danger"
        size="mini"
        @click="remove"
      >{{$t('role.del_dep')}}</el-button>
      <el-button
        v-if="$Buttonpermissions('surbanajurong.permission.permission-department-menber[add-menber]')"
        type="primary"
        size="mini"
        @click="addMember"
      >{{$t('role.add_member')}}</el-button>



       <el-button
        style="margin-left:20px;float:right;"
        size="mini"
        type="primary"
        @click="getUserList(1)"
      >{{$t('search')}}</el-button>
      <el-input  style="width:150px;float:right;margin-left:20px;" v-model="email" size="mini" clearable :placeholder="$t('user.form16')" />
      <el-input style="width:150px;float:right;"  v-model="name" size="mini" clearable :placeholder="$t('user.form6')" />
    </div>

    
    <div class="contant-div">
      <div class="left">
        <el-tree
          :data="treeData"
          default-expand-all
          :props="defaultProps"
          :expand-on-click-node="false"
          highlight-current
          @node-click="handleNodeClick"
          ref="vuetree"
          node-key="id"
        ></el-tree>
      </div>
      <div class="right">
        <el-table :data="tableData" max-height="600">
          <el-table-column fixed prop="num" :label="$t('role.tabel1')"></el-table-column>
          <el-table-column prop="name" :label="$t('role.tabel2')"></el-table-column>
          <el-table-column prop="email" :label="$t('role.tabel3')"></el-table-column>
          <el-table-column prop="departmentName" :label="$t('role.tabel4')"></el-table-column>
          <el-table-column prop="nickname" :label="$t('role.tabel5')"></el-table-column>
          <el-table-column prop="roleName" :label="$t('role.tabel6')"></el-table-column>
          <el-table-column fixed="right" :label="$t('role.tabel7')">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="umBinding(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.openid && scope.row.permission_update"
              >{{$t('untying')}}</el-button>
              <el-button
                @click.native.prevent="lookUser(scope.row)"
                type="text"
                size="small"
              >{{$t('look')}}</el-button>
              <el-button
                v-if="scope.row.permission_update"
                @click.native.prevent="updateUser(scope.row)"
                type="text"
                size="small"
              >{{$t('update')}}</el-button>
              <el-button
                v-if="scope.row.permission_del"
                @click.native.prevent="removeUser(scope.row)"
                type="text"
                size="small"
                style="color:#f56c6c;"
              >{{$t('delete')}}</el-button>
              <el-button
                v-if="scope.row.permission_reset"
                @click.native.prevent="resetPassword(scope.row)"
                type="text"
                size="small"
                style="color:#f56c6c;"
              >{{$t('resetPassword')}}</el-button>
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
      </div>
      <div style="clear:both"></div>
    </div>

    <el-dialog :title="$t('role.add_dep')" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="120px"
        style="width:100%;"
      >
        <el-form-item :label="$t('role.form1')" prop="name">
          <el-input size="small" :placeholder="$t('pla1')" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item :label="$t('role.form2')">
          <el-input
            size="small"
            :disabled="true"
            :placeholder="$t('pla2')"
            v-model="ruleForm.parentName"
          ></el-input>
          <el-tree
            :data="copytreeData"
            default-expand-all
            :props="defaultProps"
            highlight-current
            :expand-on-click-node="false"
            @node-click="handleNodeClickModel"
          ></el-tree>
        </el-form-item>

        <el-form-item :label="$t('role.form3')">
          <el-input size="small" :placeholder="$t('pla1')" v-model="ruleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="type == 'add'"
          type="primary"
          size="mini"
          @click="saveAddDepartment('ruleForm')"
        >{{$t('save')}}</el-button>
        <el-button
          v-if="type == 'update'"
          type="primary"
          size="mini"
          @click="updateAddDepartment('ruleForm')"
        >{{$t('update')}}</el-button>
        <el-button size="mini" @click="dialogVisible = false">{{$t('cancel')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  list,
  add,
  edit,
  del,
  userList,
  userDel,
  unbinding,
  resetPassword
} from "@/api/surbanajurong/permission";
export default {
  name: "surbanajurong-permission-department-menber",
  components: {},
  data() {
    return {
      name: null,
      email: null,
      departmentId: null,
      total: 0,
      currentPage: 1,
      dialogVisible: false,
      ruleForm: {
        parentId: 0,
        name: null,
        description: null,
        sort: 0,
        deleted: false,
        parentName: null
      },
      rules: {
        name: [
          { required: true, message: this.$t("role.rule1"), trigger: "blur" }
        ]
      },
      tableData: [],
      copytreeData: [],
      treeData: [],
      defaultProps: {
        children: "childList",
        label: "name"
      },
      treeDetails: null,
      type: "add"
    };
  },
  computed: {},
  created() {
    this.getList();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    clear() {
      this.ruleForm = {
        parentId: 0,
        name: null,
        description: null,
        sort: 0,
        deleted: false,
        parentName: null
      };
      this.type = "add";
      this.treeDetails = null;
    },
    getUserList(page) {
      this.tableData = [];
      let data = {
        size: 10,
        page: page
      };

      if (localStorage.getItem("sur-TreeId")) {
        let id = localStorage.getItem("sur-TreeId") * 1;
        data.departmentId = id;
        this.$nextTick(function() {
          this.$refs["vuetree"].setCurrentKey(id);
        });
      } else {
        this.$nextTick(function() {
          this.$refs["vuetree"].setCurrentKey(-1);
        });
      }

      if (!this.$isNull(this.name)) {
        data.name = this.name;
      }

      if (!this.$isNull(this.email)) {
        data.email = this.email;
      }

      let permission_update = this.$Buttonpermissions('surbanajurong.permission.permission-department-menber[update-menber]')
      let permission_del = this.$Buttonpermissions('surbanajurong.permission.permission-department-menber[del-department]')
      let permission_reset = this.$Buttonpermissions('surbanajurong.permission.permission-department-menber[reset-password]')

      userList(data).then(res => {
        if (res.code == 0) {
          this.total = res.data.total;
          this.currentPage = page;
          if (res.data.data) {
            if (res.data.data.length > 0) {
              res.data.data.map((item, index) => {
                item.permission_update = permission_update
                item.permission_del = permission_del
                item.permission_reset = permission_reset
                item.num = index + 1 + (page - 1) * 10;
                this.tableData.push(item);
              });
            }
          }
        }
      });
    },
    getList() {
      this.treeData = [];
      list({
        page: 1,
        size: 1000
      }).then(res => {
        if (res.code == 0) {
          if (res.data && res.data.length > 0) {
            let list = [
              {
                name: "盛裕",
                parentName: null,
                sort: 0,
                deleted: false,
                id: -1,
                parentId: -1,
                childList: res.data
              }
            ];
            this.treeData = list;
            this.getUserList(1);
          }
        }
      });
    },
    addDepartment() {
      this.clear();
      this.type = "add";
      this.dialogVisible = true;
      this.copytreeData = [...this.treeData];
    },
    saveAddDepartment(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          add(this.ruleForm).then(res => {
            if (res.code == 0) {
              this.dialogVisible = false;
              this.clear();
              this.getList();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateAddDepartment(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.parentId == this.ruleForm.id) {
            // 不能选择本级作为自己的上级
            this.$notify.error({
              title: this.$t("error"),
              message: this.$t("role.error1")
            });
            return;
          }
          edit(this.ruleForm).then(res => {
            if (res.code == 0) {
              this.dialogVisible = false;
              this.clear();
              this.getList();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleNodeClickModel(e) {
      console.log(e);
      this.ruleForm.parentId = e.id;
      this.ruleForm.parentName = e.name;
    },
    addMember() {
      this.$router.push({
        name: "permission-add-department-member",
        query: {
          type: "add"
        }
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleNodeClick(e) {
      this.treeDetails = e;
      if (e.id > 0) {
        localStorage.setItem("sur-TreeId", e.id);
      } else {
        localStorage.removeItem("sur-TreeId");
      }
      this.getUserList(1);
    },
    remove() {
      if (!this.treeDetails) {
        // 请先选择需要删除的部门
        this.$notify.error({
          title: this.$t("error"),
          message: this.$t("role.error2")
        });
        return;
      }
      del({ id: this.treeDetails.id }).then(res => {
        if (res.code == 0) {
          this.clear();
          this.getList();
          this.$notify({
            title: this.$t("success"),
            message: this.$t("op_success"),
            type: "success"
          });
        }
      });
    },
    update() {
      if (!this.treeDetails) {
        // 请先选择需要编辑的部门
        this.$notify.error({
          title: this.$t("error"),
          message: this.$t("role.error3")
        });
        return;
      }
      this.ruleForm = { ...this.treeDetails };
      this.type = "update";
      this.copytreeData = [...this.treeData];
      this.dialogVisible = true;
    },
    handleCurrentChange(e) {
      this.getUserList(e);
    },
    updateUser(item) {
      this.$router.push({
        name: "permission-add-department-member",
        query: {
          id: item.id,
          type: "update"
        }
      });
    },
    lookUser(item) {
      this.$router.push({
        name: "permission-add-department-member",
        query: {
          id: item.id,
          type: "look"
        }
      });
    },
    removeUser(item) {
      // 删除
      this.$confirm(this.$t("op_Click"), this.$t("reminder"), {
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        type: "warning"
      })
        .then(() => {
          userDel({
            id: item.id
          }).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: this.$t("success"),
                message: this.$t("op_success"),
                type: "success"
              });
              this.getUserList(1);
            }
          });
        })
        .catch(() => {});
    },
    umBinding(item) {
      //解绑
      this.$confirm(this.$t("op_Click_1"), this.$t("reminder"), {
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        type: "warning"
      })
        .then(() => {
          unbinding({
            id: item.id
          }).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: this.$t("success"),
                message: this.$t("op_success"),
                type: "success"
              });
              this.getUserList(1);
            }
          });
        })
        .catch(() => {});
    },
    resetPassword(item) {
      //重置密码
      this.$confirm(this.$t("op_Click_2"), this.$t("reminder"), {
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        type: "warning"
      })
        .then(() => {
          resetPassword({
            id: item.id
          }).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: this.$t("success"),
                message: this.$t("op_success"),
                type: "success"
              });
            }
          });
        })
        .catch(() => {});
    },
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
.contant-div {
  width: 100%;
  .left {
    width: 250px;
    float: left;
    border: 1px solid #dcdfe6;
  }
  .right {
    width: calc(100% - 270px);
    float: left;
    margin-left: 10px;
    border: 1px solid #dcdfe6;
    padding-bottom: 20px;
  }
}
</style>

