<template>
  <div>
    <el-row>
      <el-form :model="ruleForm"
               :rules="rules"
               size="mini"
               ref="ruleForm"
               label-width="150px"
               class="demo-ruleForm">
        <el-form-item :label="titleForm.titleName"
                      prop="imgName">
          <el-col :span="10">
            <el-input v-model="ruleForm.imgName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('commodity.sort.forder')">
          <el-col :span="10">
            <el-input v-model="ruleForm.sortNum"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('skip')">
          <el-col :span="10">
            <el-input v-model="ruleForm.url"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item :label="titleForm.imgName"
                      prop="imgUrl">
          <el-col :span="10">
            <el-alert class="alert-sty"
                      size="mini"
                      :title="titleForm.alertTitle"
                      type="info"
                      :closable="false">
            </el-alert>
            <div class="img_show"
                 v-if="ruleForm.imgUrl">
              <div class="img_show_del"
                   @click="delImg(-1,1)">
                <i class="el-icon-delete"></i>
              </div>
              <img style="width:100%;height:100%;"
                   :src="$fileUrl() + ruleForm.imgUrl" />
            </div>
            <div v-if="!ruleForm.imgUrl">
              <div class="upload_img"
                   @click="clickuloadImg()">
                <i class="el-icon-plus logoIcon" />
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">{{$t('member.filter.keep')}}</el-button>
          <el-button @click="resetForm()">{{$t('wechat.menu.btn4')}}</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <editorImage ref="muchild"
                 urltype="default"
                 type="default-1"
                 @successCBK="imageSuccessCBK" />
  </div>
</template>
<script>
import editorImage from '@/components/Tinymce/components/editorImage'
import { AddmallHome, MallDetails, EditmallHome } from '@/api/homePage/homeInt'
export default {
  components: { editorImage },
  props: {
    imgType: {
      default: 1,
    },
    id: {
      default: 0
    }
  },
  data () {
    return {

      titleForm: {
        titleName: this.$t('model.name'),
        imgName: this.$t('material.tab3'),
        alertTitle: '',
      },
      ruleForm: {
        loading: true,
        imgType: 1,
        imgName: '',
        sortNum: '',
        url: '',
        imgUrl: '',
      },
      rules: {
        imgName: [
          { required: true, message: this.$t('store.levelOneName'), trigger: 'blur' },
        ],
        imgUrl: [
          { required: true, message: this.$t('home.banner.upload'), trigger: 'blur' },
        ]
      }
    }
  },
  computed: {},
  created () {
    /**
     * imgType
     * ==1 轮播图
     * ==3 广告位
     * ==2 新人专享
     * id
     * == -10 为编辑
     * != -10 为新增
     */
    let titleName;
    let imgName;
    let alertTitle;
    if (this.imgType == 1) {
      titleName = this.$t('home.banner.name');
      imgName = this.$t('home.banner.bannerUpload');
      alertTitle = '建议上传图片宽度:750像素;高度:250像素'
    } else if (this.imgType == 3) {
      titleName = '热门分类名称';
      imgName = '上传图片';
      alertTitle = '建议上传图片宽度:400像素;高度:250像素'
    } else if (this.imgType == 2) {
      titleName = this.$t('home.vip.exclusiveName');
      imgName = this.$t('store.clerkUpPhoto');
      alertTitle = '建议上传图片宽度:375像素;高度:240像素'
    } else if (this.imgType == 4) {
      titleName = '品牌名称';
      imgName = '上传图片';
      alertTitle = '建议上传图片宽度:250像素;高度:250像素'
    } else if (this.imgType == 5) {
      titleName = '社区名称';
      imgName = '上传图片';
      alertTitle = '建议上传图片宽度:750像素;高度:250像素'
    }

    this.titleForm = {
      titleName: titleName,
      imgName: imgName,
      alertTitle: alertTitle
    }
    this.ruleForm.imgType = this.imgType;
    if (this.id != -10) {
      this.echoDetailInterface(this.id);
    }
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {

    // 回显详情接口
    echoDetailInterface (id) {
      MallDetails({
        id: id
      }).then(res => {
        if (res.code == 0) {
          this.ruleForm = res.data;
        }
      })
    },


    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id == -10) {
            this.newInterface();
          } else {
            this.editingInterface();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm () {
      this.$router.go(-1);
    },

    // 新增接口
    newInterface () {
      AddmallHome(this.ruleForm).then(res => {
        if (res.code == 0) {
          this.resetForm();
        } else {
          this.$notify({
            title: this.$t("member.filter.warning"),
            message: res.message,
            type: "warning"
          });
        }
      })
    },

    // 编辑接口
    editingInterface () {
      EditmallHome(this.ruleForm).then(res => {
        if (res.code == 0) {
          console.log(res, '编辑接口==========')
          this.resetForm();
        } else {
          this.$notify({
            title: this.$t("member.filter.warning"),
            message: res.message,
            type: "warning"
          });
        }
      })
    },


    clickuloadImg () {
      this.$refs.muchild.showModel(); // 显示上传图片弹框
    },
    imageSuccessCBK (e) {
      // 点击上传图片
      this.ruleForm.imgUrl = e[0].url[0].url;
      console.log(e, this.ruleForm, '图片=====')
    },
    delImg () {
      // 点击删除图片
      this.ruleForm.imgUrl = '';
    },
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  .img_show {
    width: 150px;
    height: 100px;
    display: flex;
    margin-right: 10px;
    .img_show_del {
      width: 150px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      position: absolute;
      z-index: 9;
      display: none;
    }
  }
  .img_show:hover .img_show_del {
    background-color: rgba(0, 0, 0, 0.3);
    display: block;
    color: #f56c6c;
    cursor: pointer;
  }
  .upload_img {
    width: 100px;
    height: 100px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    .logoIcon {
      font-size: 40px;
      color: #dddddd;
      margin: 30px;
    }
  }
}
.alert-sty {
  margin-bottom: 10px;
}
.el-alert {
  padding: 0;
}
</style>

