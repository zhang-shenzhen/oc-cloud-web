<template>
  <d2-container class="page">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="Form"
      label-position="left"
      label-width="150px"
      style="width:800px;"
    >
      <h3>{{$t('untracked.title1')}}</h3>
      <!-- 客户来源 -->
      <el-form-item :label="$t('untracked.from3')" prop="source">
        <el-select
          size="small"
          style="width:100%;"
          v-model="ruleForm.source"
          clearable
          :placeholder="$t('pla2')"
        >
          <el-option
            v-for="item in selectList.CustomersourceList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 公司类别 -->
      <el-form-item :label="$t('untracked.from4')" prop="companyType">
        <el-select
          size="small"
          style="width:100%;"
          v-model="ruleForm.companyType"
          clearable
          :placeholder="$t('pla2')"
        >
          <el-option
            v-for="item in selectList.CompanyTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 集团名称 -->
      <el-form-item :label="$t('untracked.from7')">
        <el-input size="small" type="text" :placeholder="$t('pla1')" v-model="ruleForm.groupName"></el-input>
      </el-form-item>

      <!-- 公司名称 -->
      <el-form-item :label="$t('untracked.from1')" prop="companyName">
        <el-input size="small" type="text" :placeholder="$t('pla1')" v-model="ruleForm.companyName"></el-input>
      </el-form-item>

      <!-- 服务方式 -->
      <el-form-item :label="$t('untracked.from14')" prop="service">
        <el-select
          size="small"
          style="width:100%;"
          v-model="ruleForm.service"
          multiple
          clearable
          :placeholder="$t('pla2')"
        >
          <el-option
            v-for="item in selectList.ServiceTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 行业细分 -->
      <el-form-item :label="$t('untracked.from6')" prop="industrySegmentation">
        <el-select
          size="small"
          style="width:100%;"
          v-model="ruleForm.industrySegmentation"
          clearable
          :placeholder="$t('pla2')"
        >
          <el-option
            v-for="item in selectList.IndustryTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="type == 'update'" :label="$t('untracked.from15')">
        <el-input :disabled="type == 'update'" size="small" type="text" :placeholder="$t('pla1')" v-model="ruleForm.userInChargeName"></el-input>
      </el-form-item>

      <el-form-item v-if="type == 'update'" :label="$t('untracked.from16')">
        <el-input :disabled="type == 'update'"  size="small" type="text" :placeholder="$t('pla1')" v-model="ruleForm.deptName"></el-input>
      </el-form-item>

      <h3>{{$t('untracked.title2')}}</h3>
      <el-form-item :label="$t('untracked.from8')" prop="name">
        <el-input size="small" type="text" :placeholder="$t('pla1')" v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item :label="$t('untracked.from9')">
        <el-input size="small" type="text" :placeholder="$t('pla1')" v-model="ruleForm.position"></el-input>
      </el-form-item>

      <el-form-item :label="$t('untracked.from11')" prop="mobilePhone">
        <el-input size="small" type="text" :placeholder="$t('pla1')" v-model="ruleForm.mobilePhone"></el-input>
      </el-form-item>

      <el-form-item :label="$t('untracked.from10')" prop="phoneNumber">
        <el-input size="small" type="text" :placeholder="$t('pla1')" v-model="ruleForm.phoneNumber"></el-input>
      </el-form-item>

      <el-form-item :label="$t('untracked.from12')">
        <el-input size="small" type="text" :placeholder="$t('pla1')" v-model="ruleForm.email"></el-input>
      </el-form-item>

      <!-- <el-form-item :label="$t('untracked.from13')">
        <el-input size="small" type="text" :placeholder="$t('pla1')" v-model="ruleForm.wechatName"></el-input>
      </el-form-item>-->

      <el-form-item>
        <el-button
          size="mini"
          type="primary"
          :disabled="type == 'look'"
          @click="submitForm('Form')"
        >{{ type == 'add' ? $t('save') : $t('update')}}</el-button>
        <el-button size="mini" @click="getback">{{$t('cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import { List } from "@/api/surbanajurong/customer-untracked";
import {
  Myadd,
  Myupdate,
  Detail
} from "@/api/surbanajurong/customer-untracked";
import selectList from "./Data";
export default {
  name: "add-customer",
  components: {},
  data() {
    return {
      selectList: {},
      type: null,
      ruleForm: {
        companyName: null,
        companyType: null,
        email: null,
        groupName: null,
        industrySegmentation: null,
        mobilePhone: null,
        name: null,
        phoneNumber: null,
        position: null,
        service: null,
        source: null,
        service: null,
        status: 1,
        wechatName: null
      },
      rules: {
        source: [
          {
            required: true,
            message: this.$t("untracked.rule1"),
            trigger: "change"
          }
        ],
        companyType: [
          {
            required: true,
            message: this.$t("untracked.rule2"),
            trigger: "change"
          }
        ],
        companyName: [
          {
            required: true,
            message: this.$t("untracked.rule3"),
            trigger: "blur"
          }
        ],
        service: [
          {
            required: true,
            message: this.$t("untracked.rule4"),
            trigger: "change"
          }
        ],
        industrySegmentation: [
          {
            required: true,
            message: this.$t("untracked.rule5"),
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: this.$t("untracked.rule6"),
            trigger: "blur"
          }
        ],
        mobilePhone: [
          {
            required: true,
            message: this.$t("untracked.rule7"),
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: this.$t("untracked.rule8"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    this.selectList = { ...selectList };
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    if (this.$route.query.id) {
      this.Details(this.$route.query.id);
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    Details(id) {
      Detail({
        id: id
      }).then(res => {
        if (res.code == 0) {
          this.ruleForm = {
            companyName: res.data.companyName,
            companyType: null,
            email: res.data.email,
            groupName: res.data.groupName,
            industrySegmentation: null,
            mobilePhone: res.data.mobilePhone,
            name: res.data.name,
            phoneNumber: res.data.phoneNumber,
            position: res.data.position,
            service: null,
            source: null,
            status: res.data.status,
            wechatName: res.data.wechatName,
            id: res.data.id,
            userInChargeName:res.data.userInChargeName,
            deptName:res.data.deptName
          };
          if (
            res.data.companyType ||
            res.data.industrySegmentation ||
            res.data.service ||
            res.data.source
          ) {
            this.ruleForm.companyType = res.data.companyType[0];
            this.ruleForm.industrySegmentation =
              res.data.industrySegmentation[0];
            this.ruleForm.service = res.data.service;
            this.ruleForm.source = res.data.source[0];
          }
        }
      });
    },
    submitForm(formName) {
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
              companyName: this.ruleForm.companyName,
              companyType: [],
              email: this.ruleForm.email,
              groupName: this.ruleForm.groupName,
              industrySegmentation: [],
              mobilePhone: this.ruleForm.mobilePhone,
              name: this.ruleForm.name,
              phoneNumber: this.ruleForm.phoneNumber,
              position: this.ruleForm.position,
              service: this.ruleForm.service,
              source: [],
              status: this.ruleForm.status,
              wechatName: this.ruleForm.wechatName
            };
            data.companyType.push(this.ruleForm.companyType);
            data.industrySegmentation.push(this.ruleForm.industrySegmentation);
            data.source.push(this.ruleForm.source);

            if (this.type == "add") {
              data.createUserId = localStorage.getItem("roleUserid");
              Myadd(data).then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: this.$t("success"),
                    message: this.$t("op_success"),
                    type: "success"
                  });
                  this.getback();
                }
              });
            } else {
              // 编辑
              data.id = this.ruleForm.id;
              Myupdate(data).then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: this.$t("success"),
                    message: this.$t("op_success"),
                    type: "success"
                  });
                  this.getback();
                }
              });
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getback() {
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

