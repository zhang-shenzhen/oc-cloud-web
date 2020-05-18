<template>
  <div class="sys-user-info">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="nickname">
        <el-input v-model="form.nickname" size="mini" />
      </el-form-item>
      <el-form-item label="所属部门" prop="departmentName">
        <el-select v-model="form.departmentName" size="mini" placeholder="请选择">
          <el-option :label="1" :value="1">
            <el-tree
              :data="dataList"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="!driverId" label="密码" prop="password">
        <el-input v-model="form.password" show-password size="mini" />
      </el-form-item>
      <el-form-item v-if="!driverId" label="确认密码" required prop="repwdword">
        <el-input v-model="form.repwdword" show-password size="mini" />
      </el-form-item>
      <!-- <el-form-item label="真实姓名"
                    prop="nickname">
        <el-input v-model="form.nickname"
                  size="mini" />
      </el-form-item>-->
      <el-form-item label="邮箱" required prop="email">
        <el-input v-model="form.email" size="mini" />
      </el-form-item>
      <el-form-item label="手机号" required prop="phone">
        <el-input v-model="form.phone" size="mini" />
      </el-form-item>
      <el-form-item label="角色配置" prop="roleIds">
        <el-select v-model="form.roleIds" size="mini" placeholder="请选择角色">
          <el-option v-for="item in tableData" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="onSubmit('form')">确定</el-button>
        <el-button size="mini" @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  roleList,
  list,
  addUser,
  userDetails,
  userEdit,
} from "@/api/permission";
import { mapState } from "vuex";
export default {
  components: {
  },
  props: {
    driverInfoData: {
      default: '1'
    },
    driverId: {
      default: '',
    }
  },
  data () {
    var validatePassword = (rule, value, callback) => {
      let str = '';
      if (value) {
        this.form.password = value.replace(/\s*/g, "")
        str = value.replace(/\s*/g, "")
      }
      console.log(value, str)
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (str.length < 8 || str.length > 24) {
        callback(new Error('密码不能小于8位数或大于24位数!'));
      } else {
        callback();
      }
    };
    var validaterePwdword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatereEmail = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_-]+([.A-Za-z\d]+)@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱格式!'));
      } else {
        callback();
      }
    };
    var validaterePhone = (rule, value, callback) => {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!myreg.test(value)) {
        callback(new Error('请输入正确的手机格式!'));
      } else {
        callback();
      }
    };
    return {
      value: null,
      form: {
        id: '',
        departmentName: '',
        departmentId: '',
        password: '',
        repwdword: null,
        nickname: '',
        email: null,
        phone: null,
        roleIds: null,
      },
      rules: {
        nickname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        departmentName: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        repwdword: [{ validator: validaterePwdword, trigger: 'blur' }],
        email: [{ validator: validatereEmail, trigger: 'blur' }],
        phone: [{ validator: validaterePhone, trigger: 'blur' }],
        roleIds: [{ required: true, message: '请选择角色配置', trigger: 'change' }],
      },
      defaultProps: {
        children: 'childList',
        label: 'name',
        parentName: 'parentName'
      },
      tableData: [],
      dataList: []
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    this.getList()
    this.DepartmentList()
    console.log(this.driverInfoData, this.driverId, 'vvvvvv');
    if (this.driverId) {
      this.DetailsInterface(this.driverId)
    }
  },
  mounted () {

  },
  beforeDestroy () {
  },
  methods: {
    DepartmentList () {
      list().then(res => {
        console.log('部门权限列表', res)
        this.dataList = res.data
      })
    },
    // 角色列表
    getList () {
      this.tableData = [];
      const params = {
        size: 999,
        page: 1
      };
      roleList(params).then(res => {
        console.log("角色列表", res);
        this.tableData = res.data.data;
      });
    },
    // 详情接口
    DetailsInterface (id) {
      userDetails({
        id: id
      }).then(res => {
        console.log(res, '角色详情接口')
        if (res.code == 0) {
          let data = res.data;
          this.form = {
            id: data.id,
            departmentName: data.departmentName,
            departmentId: data.departmentId,
            password: '********',
            repwdword: '********',
            nickname: data.nickname,
            email: data.email,
            phone: data.phone,
            roleIds: data.roles[0].id,
          }
        }
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form, '这个是我输入的参数')
          let option = JSON.parse(JSON.stringify(this.form))
          if (this.driverId) { // 编辑
            this.editRolue(option);
          } else { // 新增
            this.addUserInterface(option);
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      let data = {
        status: 2
      }
      this.$refs[formName].resetFields();
      this.$emit('getValue', data)
    },
    handleNodeClick (data) { // 选择所属部门
      console.log(data, 'dddddd')
      this.form.departmentName = data.name;
      this.form.departmentId = data.id;
    },
    // 添加用户接口
    addUserInterface (option) {
      console.log('这个是我新增的时候的参数', option)
      delete option.repwdword;
      delete option.id;
      let roleData = [];
      roleData.push(option.roleIds)
      option.channelName = this.info.channelName;
      option.channelId = this.info.ChannelId;
      option.roleIds = roleData;
      let data = {
        status: 1
      }
      console.log(option, 'option====option--------')
      addUser(option).then(res => {
        console.log(res, '添加用户接口');
        if (res.code == 0) {
          this.$emit('getValue', data)
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },
    editRolue (option) {
      // 编辑接口
      delete option.repwdword;
      delete option.password;
      let roleData = [];
      roleData.push(option.roleIds)
      option.channelName = this.info.channelName;
      option.channelId = this.info.ChannelId;
      option.roleIds = roleData;
      let data = {
        status: 1
      }
      console.log(option, 'option1====option1--------')
      userEdit(option).then(res => {
        if (res.code == 0) {
          this.$emit('getValue', data)
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    }
  }

}
</script>

<style lang="scss" scope>
</style>
<style lang="scss" >
.sys-user-info {
  .el-select-dropdown__wrap {
    li {
      height: 100% !important;
    }
  }
}
.el-select-dropdown {
  // background: #eded !important;
  li {
    height: 100% !important;
  }
}
.el-form-item {
  margin-bottom: 10px;
}
.el-form-item__erro {
  padding-top: 0 !important;
}
</style>
