<template>
  <div class="page-member-list">
    <div class="pageSettingBackground">
      <div>
        <!-- <span class="pageSetting-label">背景图片</span> -->
        <div class="boxs">
          <el-form
            ref="couponform"
            label-position="left"
            :model="form"
            label-width="100px"
          >
            <el-form-item
              label="背景图片"
              prop="logoImg"
            >
              <div class="img-upload">
                <img
                  v-if="form.backgroundPic != null"
                  style="width:100%;"
                  :src="$fileUrl() + form.backgroundPic"
                >
                <div
                  v-if="form.backgroundPic == null"
                  class="upload-box"
                >
                  <i class="el-icon-plus logoIcon" />
                </div>
                <editorImage
                  urltype="material"
                  type="custom"
                  @successCBK="imageSuccessCBK1"
                />
              </div>
              <div style="clear:both" />
              <el-alert
                :closable="false"
                title="建议尺寸宽640像素高1080像素或同等比例"
                type="info"
                style="padding:0  16px"
              />
            </el-form-item>
            <el-form-item
              label="标题图片"
              prop="logoImg"
            >
              <div class="img-upload">
                <img
                  v-if="form.titlePic != null"
                  style="width:100%;"
                  :src="$fileUrl() + form.titlePic"
                >
                <div
                  v-if="form.titlePic == null"
                  class="upload-box"
                >
                  <i class="el-icon-plus logoIcon" />
                </div>
                <editorImage
                  urltype="material"
                  type="custom"
                  @successCBK="imageSuccessCBK2"
                />
              </div>
              <div style="clear:both" />
              <el-alert
                :closable="false"
                title="建议尺寸宽770像素高小于等于300像素PNG"
                type="info"
                style="padding:0  16px"
              />
            </el-form-item>
            <el-form-item label="活动细则">
              <div
                v-if="tinymceType"
                class="pageSetting"
              >
                <div>
                  <Tinymce v-model="form.activityDetails" />
                </div>
              </div>
            </el-form-item>
            <el-form-item
              label="按钮颜色"
            >
              <div style="display:flex;">
                <span style="line-height:40px;margin-right:20px;">#</span>
                <el-input v-model="form.buttonRGB" size="mini" />
              </div>
            </el-form-item>
            <el-form-item
              label="转盘图片"
              prop="logoImg"
            >
              <div class="img-upload">
                <img
                  v-if="form.turntablePic != null"
                  style="width:100%;"
                  :src="$fileUrl() + form.turntablePic"
                >
                <div
                  v-if="form.turntablePic == null"
                  class="upload-box"
                >
                  <i class="el-icon-plus logoIcon" />
                </div>
                <editorImage
                  urltype="material"
                  type="custom"
                  @successCBK="imageSuccessCBK3"
                />
              </div>
              <div style="clear:both" />
              <el-alert
                :closable="false"
                title="建议尺寸300 * 300 或同等比例"
                type="info"
                style="padding:0  16px"
              />
            </el-form-item>
            <el-form-item
              label="转盘位置"
            >
              <div class="turntable">
                <div class="turntable-box-form-item">
                  <el-form-item
                    v-for="(item,index) in form.turntableLocation"
                    :key="index"
                    :label="('位置'+(index+1))"
                    style="margin-left: 20px;width:45%;"
                    label-width="60px"
                  >
                    <el-select
                      v-model="item.name"
                      style="margin-left:0;"
                      placeholder="请选择对应的商品"
                      size="mini"
                      @change="turntableLocationChange(item,index)"
                    >
                      <el-option
                        v-for="(itm,idx) in form.prizes"
                        :key="idx"
                        :label="itm.name"
                        :value="itm.name"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div style="flex:2">
                  <img
                    style="width:150px;height:150px;"
                    src="@/assets/img/zhuan.png"
                    alt=""
                  >
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-divider />
    </div>
  </div>
</template>

<script>

import Tinymce from '@/components/Tinymce'
import editorImage from '@/components/Tinymce/components/editorImage'
export default {
  name: 'PageSetting',
  components: {
    Tinymce,
    editorImage
  },
  props: {
    tinymceType: {
      type: Boolean,
      default: true
    },
    datas: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      value: '',
      form: {
        titlePic:null,
      }

    }
  },
  computed: {

  },
  created() {
    this[ 'form' ] = this.$store.state.luckyData
    if (this.$route.query.OTP == 1) {
      this[ 'form' ].turntableLocation = []
      for (let i = 0; i < 8; i++) {
        this[ 'form' ].turntableLocation.push({
          location: i + 1,
          name: null,
          serNum: null
        })
      }
    }

    console.log('pageSetting', this[ 'form' ])
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    // 上传图片的回调方法
    imageSuccessCBK1(arr) {
      console.log(arr)
      this.form.backgroundPic = arr[ 0 ].url.localUrl
    },
    imageSuccessCBK2(arr) {
      this.form.titlePic = arr[0].url.localUrl
    },
    imageSuccessCBK3(arr) {
      this.form.turntablePic = arr[0].url.localUrl
    },
    // 选择转盘位置change
    turntableLocationChange(itm, idx) {
      console.log('选择转盘位置change', itm, idx)
    }
  }
}
</script>

<style lang="scss" scope>
.pageSettingBackground {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  margin: 10px;
  min-width: 1080px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
  .pageSetting {
    display: flex;
    margin-bottom: 20px;
    .pageSetting-label {
      width: 180px;
      font-size: 13px;
      line-height: 40px;
      min-width: 180px;
      color: #58666e;
    }
    .pageSetting-txt {
      margin-top: 10px;
      font-size: 12px;
      color: #afaeae;
    }
  }
  .userTotal {
    font-size: 16px;
    color: #000;
    margin-bottom: 20px;
  }
  .el-form {
    // display: flex;
    .search-box {
      // display: flex;
      .search-box-btn {
        // line-height: 40px;
        /* padding: 10px; */
        // width: 60px;
        text-align: center;
        background: #66b1ff;
        height: 40px;
        color: #fff;
        border-radius: 5px;
        margin-left: -5px;
        border: none;
      }
    }
  }

  .tab-head-btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .v-name {
    color: #409eff;
    cursor: pointer;
  }
  .boxs {
    width: 80%;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 30px 15px;
  }
  .img-upload {
    width: 100px;
    position: relative;
    margin-bottom: 10px;
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
}
</style>
<style lang="scss" >
.pageSettingBackground {
  .btn {
    line-height: 30px !important;
    height: 30px !important;
    padding: 0 20px !important;
  }
  .el-table th {
    color: #000 !important;
    // background: #f7f6f2 !important;
    text-align: center !important;
  }
  .el-table td {
    text-align: center !important;
    .v-label {
      background: rgb(51, 204, 153);
      color: #fff;
      padding: 5px;
    }
  }
  .el-form-item__content {
    margin-bottom: 50px;
  }
  .turntable {
    display: flex;
    .turntable-box-form-item {
      flex-wrap: wrap;
      display: flex;
      flex: 8;
      .el-form-item__content {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
