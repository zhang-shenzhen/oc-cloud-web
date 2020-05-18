<template>
  <d2-container class="page">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="120px"
      style="width:800px;"
    >
      <el-form-item :label="$t('website.logo.tabel2')" prop="name">
        <el-input
          :disabled="type == 'look'"
          size="small"
          :placeholder="$t('pla1')"
          v-model="ruleForm.name"
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('website.logo.tabel3')" prop="logo">
        <div class="img-upload">
          <img v-if="ruleForm.logo != null" style="width:100%;" :src="$fileUrl() + ruleForm.logo" />
          <div v-if="ruleForm.logo == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage :cid="1" v-if="type != 'look'" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>

      <el-form-item :label="$t('website.logo.tabel6')" prop="viceLogo">
        <div class="img-upload">
          <img
            v-if="ruleForm.viceLogo != null"
            style="width:100%;"
            :src="$fileUrl() + ruleForm.viceLogo"
          />
          <div v-if="ruleForm.viceLogo == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage :cid="2" v-if="type != 'look'" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          v-if="type == null"
          size="mini"
          type="primary"
          @click="AddsubmitForm('ruleForm')"
        >{{$t('add')}}</el-button>
        <el-button
          v-if="type == 'update'"
          size="mini"
          type="primary"
          @click="submitForm('ruleForm')"
        >{{$t('update')}}</el-button>
        <el-button size="mini" @click="$router.go(-1)">{{$t('back')}}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import Tinymce from "@/components/Tinymce";
import editorImage from "@/components/Tinymce/components/editorImage";
import {
  companyLogoDetail,
  updatecompanyLogo,
  addcompanyLogo
} from "@/api/surbanajurong/website";
export default {
  name: "add-project",
  components: { Tinymce, editorImage },
  data() {
    return {
      type: null,
      ruleForm: {
        logo: null,
        name: null,
        viceLogo: null
      },
      rules: {
        logo: [
          {
            required: true,
            message: this.$t("website.logo.rule1"),
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: this.$t("website.logo.rule2"),
            trigger: "blur"
          }
        ],
        viceLogo: [
          {
            required: true,
            message: this.$t("website.logo.rule3"),
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    if (this.$route.query.id) {
      this.getDetail(this.$route.query.id);
    }
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getDetail(id) {
      companyLogoDetail({ id: id }).then(res => {
        if (res.code == 0) {
          this.ruleForm = res.data;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updatecompanyLogo(this.ruleForm).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: this.$t("success"),
                message: this.$t("op_success"),
                type: "success"
              });
              this.$router.go(-1);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    AddsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addcompanyLogo(this.ruleForm).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: this.$t("success"),
                message: this.$t("op_success"),
                type: "success"
              });
              this.$router.go(-1);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    imageSuccessCBK(e) {
      if (e.cid == 1) {
        this.ruleForm.logo = e[0].url[0].url;
      } else {
        this.ruleForm.viceLogo = e[0].url[0].url;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
.img-upload {
  width: 150px;
  position: relative;
}
.upload-box {
  width: 100px;
  height: 100px;
  border: 1px dashed #dddddd;
  cursor: pointer;
}
.logoIcon {
  font-size: 40px;
  color: #dddddd;
  margin: 30px;
}
</style>

