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
      <el-form-item label="项目名称" prop="name">
        <el-input :disabled="type == 'look'" size="small" placeholder="请输入项目名称" v-model="ruleForm.name"></el-input>
      </el-form-item>

        <!-- <el-form-item label="副标题" prop="title">
        <el-input :disabled="type == 'look'" size="small" placeholder="请输入副标题" v-model="ruleForm.title"></el-input>
      </el-form-item> -->

      <el-form-item label="类别" prop="type">
        <el-radio-group :disabled="type == 'look'" v-model="ruleForm.type">
          <el-radio :label="1">普通项目</el-radio>
          <el-radio :label="2">新版块项目</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="列表图" prop="listLogo">
        <div class="img-upload">
          <img v-if="ruleForm.listLogo != null" style="width:100%;" :src="$fileUrl() + ruleForm.listLogo" />
          <div v-if="ruleForm.listLogo == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage v-if="type == null" :cid="1" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>

      <el-form-item label="头图" prop="logo">
        <div class="img-upload">
          <img v-if="ruleForm.logo != null" style="width:100%;" :src="$fileUrl() + ruleForm.logo" />
          <div v-if="ruleForm.logo == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage  v-if="type == null"  :cid="2"  type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>

      <el-form-item label="项目介绍" prop="description">
        <Tinymce id="tinymce" :disabled="type == 'look'"  v-model="ruleForm.description" :height="200" />
      </el-form-item>

      <el-form-item label="按钮主题">
        <el-input size="small" :disabled="type == 'look'"  placeholder="请输入按钮主题" v-model="ruleForm.buttonTheme"></el-input>
      </el-form-item>

      <el-form-item v-if="type == null">
        <el-button size="mini" type="primary" @click="submitForm('ruleForm')">修改</el-button>
        <el-button size="mini" @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import Tinymce from "@/components/Tinymce";
import editorImage from "@/components/Tinymce/components/editorImage";
import { projectDetail,addproject } from "@/api/surbanajurong/website";
export default {
  name: "add-project",
  components: { Tinymce, editorImage },
  data() {
    return {
      type:null,
      ruleForm: { 
        name:null,
        title:null,
        description: null,
        listLogo:null,
        logo:null,
        type:null,
        listLogo:null,
       },
      rules: {
        listLogo: [
          { required: true, message: "请上传列表图", trigger: "change" }
        ],
         logo: [
          { required: true, message: "请上传头图", trigger: "change" }
        ],
        description: [
          { required: true, message: "请填写项目介绍", trigger: "change" }
        ],
         name: [
          { required: true, message: "请填写项目名称", trigger: "blur" }
        ],
        //  title: [
        //   { required: true, message: "请填写副标题", trigger: "blur" }
        // ],
        //   buttonTheme: [
        //   { required: true, message: "请填写按钮主题", trigger: "blur" }
        // ],
          type: [
          { required: true, message: "请选择类别", trigger: "change" }
        ],
      }
    };
  },
  computed: {},
  created() {
    if (this.$route.query.id) {
      this.getDetail(this.$route.query.id);
    }
     if (this.$route.query.type) {
       this.type = this.$route.query.type
     }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getDetail(id) {
      projectDetail({ id: id }).then(res => {
        if (res.code == 0) {
          this.ruleForm = res.data;
        }
      });
    },
   submitForm(formName){
       this.$refs[formName].validate(valid => {
        if (valid) {
          addproject(this.ruleForm).then(res => {
            if (res.code == 0) {
               this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success"
              });
              this.$router.go(-1)
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
     },
    imageSuccessCBK(e) {
       if(e.cid == 1){
           this.ruleForm.listLogo = e[0].url[0].url;
        }else if(e.cid == 2){
           this.ruleForm.logo = e[0].url[0].url;
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

