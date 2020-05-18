<template>
  <d2-container class="page">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="Form"
             label-position="left"
             label-width="150px"
             style="width:800px;">
      <h3>{{$t('untracked.title1')}}</h3>
      <!-- 客户来源 -->
      <el-form-item :label="$t('untracked.from3')"
                    prop="source">
        <el-select size="small"
                   style="width:100%;"
                   v-model="ruleForm.source"
                   clearable
                   :placeholder="$t('pla2')">
          <el-option v-for="item in selectList.CustomersourceList"
                     :key="item.id"
                     :label="item.label"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <!-- 集团名称 -->
      <el-form-item :label="$t('untracked.from7')">
        <el-input size="small"
                  type="text"
                  :placeholder="$t('pla1')"
                  v-model="ruleForm.groupName"></el-input>
      </el-form-item>

      <!-- 公司名称 -->
      <el-form-item :label="$t('untracked.from1')"
                    prop="companyName">
        <el-input size="small"
                  type="text"
                  :placeholder="$t('pla1')"
                  v-model="ruleForm.companyName"></el-input>
      </el-form-item>

      <!-- 服务方式 multiple $t('untracked.from14')-->
      <el-form-item label="服务方式"
                    prop="service">
        <el-select size="small"
                   style="width:100%;"
                   v-model="ruleForm.service"
                   clearable
                   :placeholder="$t('pla2')">
          <el-option v-for="item in selectList.ServiceTypeList"
                     :key="item.label"
                     :label="item.label"
                     :value="item.label"></el-option>
        </el-select>
      </el-form-item>

      <!-- 行业细分 -->
      <el-form-item :label="$t('untracked.from6')"
                    prop="industrySegmentation">
        <el-select size="small"
                   style="width:100%;"
                   v-model="ruleForm.industrySegmentation"
                   clearable
                   :placeholder="$t('pla2')">
          <el-option v-for="item in selectList.IndustryTypeList"
                     :key="item.label"
                     :label="item.label"
                     :value="item.label"></el-option>
        </el-select>
      </el-form-item>

      <h3>{{$t('untracked.title2')}}</h3>
      <!-- 姓名 -->
      <el-form-item :label="$t('untracked.from8')"
                    prop="name">
        <el-input size="small"
                  type="text"
                  :placeholder="$t('pla1')"
                  v-model="ruleForm.name"></el-input>
      </el-form-item>
      <!-- 职位 -->
      <el-form-item :label="$t('untracked.from9')">
        <el-input size="small"
                  type="text"
                  :placeholder="$t('pla1')"
                  v-model="ruleForm.position"></el-input>
      </el-form-item>
      <!-- 电话 -->
      <el-form-item :label="$t('untracked.from11')"
                    prop="mobilePhone">
        <el-input size="small"
                  type="text"
                  :placeholder="$t('pla1')"
                  v-model="ruleForm.mobilePhone"></el-input>
      </el-form-item>
      <!-- 手机 -->
      <el-form-item :label="$t('untracked.from10')"
                    prop="phoneNumber">
        <el-input size="small"
                  type="text"
                  :placeholder="$t('pla1')"
                  v-model="ruleForm.phoneNumber"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item :label="$t('untracked.from12')">
        <el-input size="small"
                  type="text"
                  :placeholder="$t('pla1')"
                  v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button size="mini"
                   type="primary"
                   :disabled="type == 'look'"
                   @click="submitForm('Form')">{{ type == 'add' ? $t('save') : $t('update')}}</el-button>
        <el-button size="mini"
                   @click="getback">{{$t('cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import { List } from "@/api/surbanajurong/customer-untracked";
import {
  add,
  update,
  Detail
} from "@/api/surbanajurong/customer-untracked";



import { CustomerDetails,ModifyCustomer } from "@/api/customer-management/customer";
import selectList from "./Data";
export default {
  name: "add-customer",
  components: {},
  data () {
    return {
      selectList: {},
      type: null,
      ruleForm: {
        companyName: null,
        email: null,
        groupName: null,
        industrySegmentation: null,
        mobilePhone: null,
        name: null,
        phoneNumber: null,
        position: null,
        service: [],
        source: null,
        service: null,
        status: 1,
        wechatName: null
      },
      rules: {
        source: [{ required: true, message: this.$t("untracked.rule1"), trigger: "change" }],
        companyName: [{ required: true, message: this.$t("untracked.rule3"), trigger: "blur" }],
        service: [{ required: true, message: this.$t("untracked.rule4"), trigger: "change" }],
        industrySegmentation: [{ required: true, message: this.$t("untracked.rule5"), trigger: "change" }],
        name: [{ required: true, message: this.$t("untracked.rule6"), trigger: "blur" }],
        mobilePhone: [{ required: true, message: this.$t("untracked.rule7"), trigger: "blur" }],
        phoneNumber: [{ required: true, message: this.$t("untracked.rule8"), trigger: "blur" }]
      }
    };
  },
  computed: {},
  created () {
    this.selectList = { ...selectList };
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    if (this.$route.query.id) {
      this.Details(this.$route.query.id);
    }
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    Details (id) {
      CustomerDetails({
        id: id
      }).then(res => {
        if (res.code == 0) {
          console.log(res, '详情接口参数')
          this.ruleForm = {
            id: res.data.id,
            source: res.data.sourceId,
            groupName: res.data.groupName,
            companyName: res.data.companyName,
            service: res.data.serviceMode, // .....
            industrySegmentation: res.data.industry, // ....
            name: res.data.name,
            position: res.data.position,
            mobilePhone: res.data.tel,
            phoneNumber: res.data.phone,
            email: res.data.email,
            status: 1,
          };
        }
      });
    },
    submitForm (formName) {
      let status = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.$isNull(this.ruleForm.phoneNumber)) {
            var reg = /^1[3456789]\d{9}$/;
            if (!reg.test(this.ruleForm.phoneNumber)) {
              status = false;
              this.$notify.error({
                title: this.$t("error"),
                message: this.$t("untracked.error1")
              });
              return;
            }
          }

          if (!this.$isNull(this.ruleForm.email)) {
            var regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if (!regemail.test(this.ruleForm.email)) {
              status = false;
              this.$notify.error({
                title: this.$t("error"),
                message: this.$t("untracked.error2")
              });
              return;
            }
          }

          if (status) {
            let data = {
              sourceId: this.ruleForm.source, // 客户来源ID
              sourceName: '', // 客户来源
              groupName: this.ruleForm.groupName, // 集团名称
              companyName: this.ruleForm.companyName, // 公司名称
              serviceMode: this.ruleForm.service, // 服务方式
              industry: this.ruleForm.industrySegmentation, // 行业细分
              name: this.ruleForm.name, // 姓名
              position: this.ruleForm.position, // 职位
              tel: this.ruleForm.mobilePhone, // 电话
              phone: this.ruleForm.phoneNumber, // 手机
              email: this.ruleForm.email, // 邮箱
              status: 1,
            };
            this.selectList.CustomersourceList.map(res => {
              if (res.id == this.ruleForm.source) {
                data.sourceName = res.label;
              }
            })
            // if (this.type == "add") {
              // data.createUserId = localStorage.getItem("roleUserid");
              // add(data).then(res => {
              //   if (res.code == 0) {
              //     this.$notify({
              //       title: this.$t("success"),
              //       message: this.$t("op_success"),
              //       type: "success"
              //     });
              //     this.getback();
              //   }
              // });
            // } else {
              // 编辑
              data.id = this.ruleForm.id;
              ModifyCustomer(data).then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: this.$t("success"),
                    message: this.$t("op_success"),
                    type: "success"
                  });
                  this.getback();
                }
              });
            // }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getback () {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>

