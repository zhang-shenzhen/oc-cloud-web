<template>
  <d2-container class="page">
    <el-form
      :rules="rules"
      style="width:500px;"
      ref="ruleForm"
      :model="form"
      label-position="left"
      label-width="80px"
    >
      <el-form-item prop="title" label="标题">
        <el-input
          size="small"
          placeholder="请输入标题"
          maxlength="20"
          show-word-limit
          v-model="form.title"
        ></el-input>
      </el-form-item>
      <el-form-item prop="externalLinkUrl" label="原文链接">
        <el-input size="small" placeholder="请输入原文链接" v-model="form.externalLinkUrl"></el-input>
      </el-form-item>

      <el-form-item prop="picUrl" label="封面">
        <el-button type="primary" size="small" @click="dialogVisible = true">从图库选择</el-button>

        <div v-if="form.picUrl" class="img-box">
          <el-image name="img" class="img" :src="$fileUrl() + form.picUrl" fit="contain" />
        </div>
      </el-form-item>

      <el-form-item prop="description" label="摘要">
        <el-input
          placeholder="请输入摘要"
          :autosize="{ minRows: 4, maxRows: 6}"
          type="textarea"
          v-model="form.description"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit('ruleForm')">保存</el-button>
        <el-button size="small" @click="getback">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="同步图文" :visible.sync="dialogVisible" width="80%">
      <imagePic :type="'choose'" :projectName="'surbanajurong'" @sendData="getdata" />
    </el-dialog>
  </d2-container>
</template>
<script>
import imagePic from "./image-pic";
import {
  AdvancedMessageDetail,
  addAdvancedMessage,
  updateAdvancedMessage
} from "@/api/wechat/material";

import {
  surbanajurong_AdvancedMessageDetail,
  surbanajurong_addAdvancedMessage,
  surbanajurong_updateAdvancedMessage
} from "@/api/surbanajurong/wechat/material";

export default {
  name: "addAdvancedMessage",
  components: { imagePic },
  data() {
    return {
      API: {},
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        externalLinkUrl: [
          { required: true, message: "请输入原文链接", trigger: "blur" }
        ],
        picUrl: [{ required: true, message: "请选择封面", trigger: "blur" }],
        description: [
          { required: true, message: "请输入摘要", trigger: "blur" }
        ]
      },
      form: {
        title: null,
        picUrl: null,
        description: null,
        externalLinkUrl: null
      },
      dialogVisible: false
    };
  },
  computed: {},
  created() {
    if (localStorage.getItem("projectName")) {
      let projectName = localStorage.getItem("projectName");
      this.projectName = projectName;
      if (projectName == "surbanajurong") {
        this.API = {
          AdvancedMessageDetail: surbanajurong_AdvancedMessageDetail,
          addAdvancedMessage: surbanajurong_addAdvancedMessage,
          updateAdvancedMessage: surbanajurong_updateAdvancedMessage
        };
      } else {
        this.API = {
          AdvancedMessageDetail: AdvancedMessageDetail,
          addAdvancedMessage: addAdvancedMessage,
          updateAdvancedMessage: updateAdvancedMessage
        };
      }
    }
    if (this.$route.query.id) {
      this.details(this.$route.query.id);
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    details(id) {
      this.API.AdvancedMessageDetail({ id: id }).then(res => {
        if (res.code == 0) {
          this.form = res.data.advancedNewsItemList[0];
          // this.form.title = advancedNewsItemList.title;
          // this.form.picUrl = advancedNewsItemList.picUrl;
          // this.form.description = advancedNewsItemList.description;
          // this.form.externalLinkUrl = advancedNewsItemList.externalLinkUrl;
        }
      });
    },
    getdata(e) {
      this.dialogVisible = false;
      this.form.picUrl = e.localUrl;
      console.log(e);
    },
    getback() {
      this.$router.go(-1);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            num: "",
            advancedNewsItemList: []
          };
          data.advancedNewsItemList.push(this.form);
          if (this.$route.query.id) {
            //编辑
            data.id = this.$route.query.id;
            this.API.updateAdvancedMessage(data).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: "成功",
                  message: "编辑成功",
                  type: "success"
                });
                this.getback();
              }
            });
          } else {
            this.API.addAdvancedMessage(data).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: "成功",
                  message: "新建成功",
                  type: "success"
                });
                this.getback();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.img-box {
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  overflow: hidden;
  margin: 10px 0;
  .img {
    width: 100%;
  }
}
.el-form-item {
  margin-bottom: 15px;
}
</style>

