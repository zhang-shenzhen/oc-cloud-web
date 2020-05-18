<template>
  <d2-container class="page">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="120px"
      style="width:1000px;"
    >
      <el-form-item
        v-if="$t('surbanajurong.click.click-list[export]')"
        :label="$t('website.index.pvexport')"
      >
        <el-date-picker
          v-model="time"
          type="daterange"
          size="small"
          :range-separator="$t('datePicker.range')"
          :start-placeholder="$t('datePicker.start')"
          :end-placeholder="$t('datePicker.end')"
        ></el-date-picker>

        <el-button
          size="mini"
          type="primary"
          @click="exportData()"
          style="margin-left:20px;"
        >{{$t('export_sj')}}</el-button>
      </el-form-item>

      <el-form-item :label="$t('website.index.form1')" prop="logo">
        <div class="img-upload">
          <img v-if="ruleForm.logo != null" style="width:100%;" :src="$fileUrl() + ruleForm.logo" />
          <div v-if="ruleForm.logo == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage :cid="1" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>

      <el-form-item :label="$t('website.index.form2')" prop="viceLogo">
        <div class="img-upload">
          <img
            v-if="ruleForm.viceLogo != null"
            style="width:100%;"
            :src="$fileUrl() + ruleForm.viceLogo"
          />
          <div v-if="ruleForm.viceLogo == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage :cid="2" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>

      <el-form-item :label="$t('website.index.form3')" prop="topLogo">
        <div class="img-upload">
          <img
            v-if="ruleForm.topLogo != null"
            style="width:100%;"
            :src="$fileUrl() + ruleForm.topLogo"
          />
          <div v-if="ruleForm.topLogo == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage :cid="3" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>

      <el-form-item :label="$t('website.index.form4')" prop="cooperationLogo">
        <div class="img-upload">
          <img
            v-if="ruleForm.cooperationLogo != null"
            style="width:100%;"
            :src="$fileUrl() + ruleForm.cooperationLogo"
          />
          <div v-if="ruleForm.cooperationLogo == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage :cid="4" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>

      <el-form-item :label="$t('website.index.form10')" prop="developmentLogo">
        <div class="img-upload">
          <img
            v-if="ruleForm.developmentLogo != null"
            style="width:100%;"
            :src="$fileUrl() + ruleForm.developmentLogo"
          />
          <div v-if="ruleForm.developmentLogo == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage :cid="7" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>
      <el-form-item :label="$t('website.index.form10')" prop="extraImg">
        <div class="img-upload">
          <img
            v-if="ruleForm.extraImg != null"
            style="width:100%;"
            :src="$fileUrl() + ruleForm.extraImg"
          />
          <div v-if="ruleForm.extraImg == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage :cid="8" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>

      <el-form-item :label="$t('website.index.form5')" prop="description">
        <Tinymce id="tinymce" v-model="ruleForm.description" :height="200" />
      </el-form-item>

      <el-form-item :label="$t('website.index.form6')" prop="newDescription">
        <Tinymce id="tinymce1" v-model="ruleForm.newDescription" :height="200" />
      </el-form-item>

      <el-form-item :label="$t('website.index.form7')" prop="qrCode">
        <div class="img-upload">
          <img
            v-if="ruleForm.qrCode != null"
            style="width:100%;"
            :src="$fileUrl() + ruleForm.qrCode"
          />
          <div v-if="ruleForm.qrCode == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage :cid="5" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>

      <el-form-item :label="$t('website.index.form8')" prop="video">
        <video
          v-if="ruleForm.video != null"
          x5-playsinline
          playsinline
          webkit-playsinline="true"
          x-webkit-airplay="allow"
          :src="$fileUrl() + ruleForm.video"
          controls="controls"
        ></video>
        <div class="img-upload">
          <div class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage :cid="6" type="custom" @successCBK="imageSuccessCBK" />
        </div>
      </el-form-item>

      <el-form-item :label="$t('website.index.form11')" prop="pdf">
        {{ruleForm.pdf}}
        <upfile
          urltype="material"
          type="custom"
          text="只能上传pdf文件，且不超过500kb"
          :cid="1"
          :fUrl="upload"
          @upfileSuccess="subfile"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          v-if="$Buttonpermissions('surbanajurong.website.website-info[add/update]')"
          size="mini"
          type="primary"
          @click="submitForm('ruleForm')"
        >{{$t('save')}}</el-button>
        <!-- <el-button size="mini" @click="getback">取消</el-button> -->
      </el-form-item>
    </el-form>

    <!-- 导出 -->
    <el-dialog width="35%" :title="$t('export_sj')" :visible.sync="dialogExportVisible">
      <el-form label-position="left" label-width="100px">
        <el-form-item :label="$t('export_sj')">
          <el-radio-group
            size="small"
            style="width:100%;"
            v-model="expordType"
            :placeholder="$t('pla2')"
          >
            <el-radio :label="1">EXCEL</el-radio>
            <el-radio :label="2">CSV</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-top:10px">
          <el-button size="mini" type="primary" @click="exportModelData">{{$t('confirm')}}</el-button>
          <el-button size="mini" @click="dialogExportVisible = false">{{$t('cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </d2-container>
</template>
<script>
import Tinymce from "@/components/Tinymce";
import editorImage from "@/components/Tinymce/components/editorImage";
import {
  getwebsiteInfo,
  websiteInfo,
  clickDataExport
} from "@/api/surbanajurong/website";
import upfile from "@/components/Tinymce/components/upfile";
import configUrl from "@/api/configUrl";
export default {
  name: "website-info",
  components: { Tinymce, editorImage, upfile },
  data() {
    return {
      dialogExportVisible: false,
      expordType: 1,
      time: null,
      upload: configUrl.upload,
      ruleForm: {
        cooperationLogo: null,
        description: null,
        logo: null,
        newDescription: null,
        qrCode: null,
        topLogo: null,
        viceLogo: null,
        video: null,
        developmentLogo: null,
        extraImg: null,
        pdf: null
      },
      rules: {
        cooperationLogo: [
          {
            required: true,
            message: this.$t("website.index.rule1"),
            trigger: "change"
          }
        ],
        description: [
          {
            required: true,
            message: this.$t("website.index.rule2"),
            trigger: "change"
          }
        ],
        newDescription: [
          {
            required: true,
            message: this.$t("website.index.rule3"),
            trigger: "change"
          }
        ],
        logo: [
          {
            required: true,
            message: this.$t("website.index.rule4"),
            trigger: "change"
          }
        ],
        qrCode: [
          {
            required: true,
            message: this.$t("website.index.rule5"),
            trigger: "change"
          }
        ],
        topLogo: [
          {
            required: true,
            message: this.$t("website.index.rule6"),
            trigger: "change"
          }
        ],
        viceLogo: [
          {
            required: true,
            message: this.$t("website.index.rule7"),
            trigger: "change"
          }
        ],
        video: [
          {
            required: true,
            message: this.$t("website.index.rule8"),
            trigger: "change"
          }
        ],
        developmentLogo: [
          {
            required: true,
            message: this.$t("website.index.rule10"),
            trigger: "change"
          }
        ],
        extraImg: [
          {
            required: true,
            message: this.$t("website.index.rule10"),
            trigger: "change"
          }
        ],
        pdf: [
          {
            required: true,
            message: this.$t("website.index.rule11"),
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    this.getinfo();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getinfo() {
      getwebsiteInfo({}).then(res => {
        if (res.code == 0) {
          if (res.data) {
            this.ruleForm = res.data;
            if (this.ruleForm.extraInfo) {
              this.$set(
                this.ruleForm,
                "extraImg",
                this.ruleForm.extraInfo.extraImg
              );
              this.$set(this.ruleForm, "pdf", this.ruleForm.extraInfo.pdf);
            } else {
              this.$set(this.ruleForm, "extraImg", null);
              this.$set(this.ruleForm, "pdf", null);
            }
          }
        }
      });
    },
    addinfo() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.extraImg) {
            this.ruleForm.extraInfo = {
              extraImg: this.ruleForm.extraImg,
              pdf: this.ruleForm.pdf
            };
          }
          websiteInfo(this.ruleForm).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success"
              });
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
      } else if (e.cid == 2) {
        this.ruleForm.viceLogo = e[0].url[0].url;
      } else if (e.cid == 3) {
        this.ruleForm.topLogo = e[0].url[0].url;
      } else if (e.cid == 4) {
        this.ruleForm.cooperationLogo = e[0].url[0].url;
      } else if (e.cid == 5) {
        this.ruleForm.qrCode = e[0].url[0].url;
      } else if (e.cid == 6) {
        this.ruleForm.video = e[0].url[0].url;
      } else if (e.cid == 7) {
        this.ruleForm.developmentLogo = e[0].url[0].url;
      } else if (e.cid == 8) {
        this.ruleForm.extraImg = e[0].url[0].url;
      }
    },
    subfile(e) {
      if (e.response.code == 0) {
        if (e.response.data) {
          this.ruleForm.pdf = e.response.data[0].url;
        }
      }
    },
    exportData() {
      this.dialogExportVisible = true;
    },
    exportData() {
      if (this.$isNull(this.time)) {
        this.$notify({
          title: this.$t("error"),
          message: this.$t("website.index.exporePla"),
          type: "error"
        });
        return;
      }
      clickDataExport({
        beginDate: this.$formatDate(new Date(this.time[0]), "yyyy-MM-dd"),
        endDate: this.$formatDate(new Date(this.time[1]), "yyyy-MM-dd"),
        csv: this.expordType == 1 ? false : true
      }).then(res => {
        if (res.code == 0) {
          let url = `${this.$fileUrl().replace(
            "/storage",
            ""
          )}api/storage/download?remoteFilename=${res.data}&filename=${
            this.expordType == 1 ? "PV数据.xls" : "PV数据.csv"
          }`;
          window.open(url);
          this.dialogExportVisible = false;
        }
      });
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

