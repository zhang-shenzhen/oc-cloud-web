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
      <el-form-item :label="$t('website.p_more.tabel2')" prop="title">
        <el-input
          :disabled="type == 'look'"
          size="small"
          :placeholder="$t('pla1')"
          v-model="ruleForm.title"
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('website.p_more.tabel6')" prop="image">
        <div class="img-upload">
          <img v-if="ruleForm.image != null" style="width:100%;" :src="$fileUrl() + ruleForm.image" />
          <div v-if="ruleForm.image == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage v-if="type != 'look'" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>



      <el-form-item :label="$t('website.p_more.tabel7')"  prop="type">
        <el-radio-group :disabled="type == 'look'" v-model="ruleForm.type">
          <el-radio :label="1">{{$t('website.p_more.tabel8')}}</el-radio>
          <el-radio :label="2">{{$t('website.p_more.tabel9')}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('website.p_more.tabel3')" prop="sort">
        <el-input
          size="small"
          :disabled="type == 'look'"
          :placeholder="$t('pla1')"
          v-model="ruleForm.sort"
        ></el-input>
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
  moerProjectDetail,
  updateMoreProject,
  addMoreProject
} from "@/api/surbanajurong/website";
export default {
  name: "add-project",
  components: { Tinymce, editorImage },
  data() {
    return {
      type: null,
      ruleForm: {
        image: null,
        title: null,
        sort: null,
        width: null,
        height: null,
        type:null
      },
      rules: {
        image: [
          {
            required: true,
            message: this.$t("website.p_more.rule1"),
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            message: this.$t("website.p_more.rule2"),
            trigger: "blur"
          }
        ],
        sort: [
          {
            required: true,
            message: this.$t("website.p_more.rule3"),
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: this.$t("website.p_more.rule4"),
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
      moerProjectDetail({ id: id }).then(res => {
        if (res.code == 0) {
          this.ruleForm = res.data;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateMoreProject(this.ruleForm).then(res => {
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
          addMoreProject(this.ruleForm).then(res => {
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
      this.ruleForm.image = e[0].url[0].url;
      this.ruleForm.width = e[0].width;
      this.ruleForm.height = e[0].height;
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

