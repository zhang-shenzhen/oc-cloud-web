<template>
  <div class="tab-box">
    <el-tabs v-model="activeName"
             type="card"
             size="mini"
             @tab-click="handleClick">
      <el-tab-pane v-if="functionList.indexOf('文本') > -1"
                   label="文本"
                   name="文本">
        <el-input v-model="textarea"
                  type="textarea"
                  :rows="10"
                  placeholder="请输入内容"
                  size="mini"
                  @blur="SetTextarea" />
      </el-tab-pane>

      <el-tab-pane v-if="functionList.indexOf('图片') > -1"
                   label="图片"
                   name="图片">
        <div v-if="imgObj.localUrl != undefined"
             class="showimg">
          <img :src="$fileUrl() + imgObj.localUrl" />
          <div class="zeo">
            <el-button type="danger"
                       class="del"
                       icon="el-icon-delete"
                       circle
                       size="mini"
                       @click="delImg" />
          </div>
        </div>

        <div v-if="imgObj.localUrl == undefined"
             class="pic-box">
          <div class="left"
               @click="dialogshow">
            <div class="icon-box">
              <i class="icon el-icon-plus" />
            </div>
            <p>从素材库中选择</p>
          </div>
          <!-- <div class="right">
            <div class="icon-box">
              <i class="icon el-icon-plus" />
            </div>
            <p>上传图片</p>
            <editorImage urltype="wechat" type="custom" @successCBK="imageSuccessCBK" />
          </div>-->
        </div>
      </el-tab-pane>

      <el-tab-pane v-if="functionList.indexOf('图文') > -1"
                   label="图文"
                   name="图文">
        <div class="box-con">
          <!-- 图文显示 -->
          <div v-if="imgObjTwo.wechatMaterialNewsItemList != undefined"
               class="two-box">
            <div class="imgbox">
              <el-image name="img"
                        style="width:100%; height:100%"
                        :src="$fileUrl() + imgObjTwo.wechatMaterialNewsItemList[0].localThumbUrl"
                        fit="contain" />
            </div>
            <div class="txtbox">
              <p>{{ imgObjTwo.wechatMaterialNewsItemList[0].title }}</p>
              <p v-if="imgObjTwo.wechatMaterialNewsItemList[1]">{{ imgObjTwo.wechatMaterialNewsItemList[1].title }}</p>
            </div>
            <div style="clear:both" />
          </div>

          <!-- 高级图文显示 -->
          <div v-if="imgObjTwo.advancedNewsItemList != undefined"
               class="two-box">
            <div class="imgbox">
              <el-image name="img"
                        style="width:100%; height:100%"
                        :src="$fileUrl() + imgObjTwo.advancedNewsItemList[0].picUrl"
                        fit="contain" />
            </div>
            <div class="txtbox">
              <p>{{ imgObjTwo.advancedNewsItemList[0].title }}</p>
              <p v-if="imgObjTwo.advancedNewsItemList[1]">{{ imgObjTwo.advancedNewsItemList[1].title }}</p>
            </div>
            <div style="clear:both" />
          </div>
          <div class="zeo">
            <el-button type="danger"
                       class="del"
                       icon="el-icon-delete"
                       circle
                       size="mini"
                       @click="delImgTwo" />
          </div>
        </div>

        <div v-if="imgObjTwo.id == undefined"
             class="pic-box">
          <div class="left"
               @click="dialogshowTwo">
            <div class="icon-box">
              <i class="icon el-icon-plus" />
            </div>
            <p>从素材库中选择</p>
          </div>
          <!-- <div class="right" @click="uploadImgTxt">
            <div class="icon-box">
              <i class="icon el-icon-plus" />
            </div>
            <p>上传图文</p>
          </div>-->
        </div>
      </el-tab-pane>

      <el-tab-pane v-if="functionList.indexOf('链接') > -1"
                   label="链接"
                   name="链接">
        <div class="form-box">
          <el-form ref="form1"
                   label-width="80px">
            <el-form-item label="链接">
              <el-input v-model="formDataUrl.url"
                        placeholder="请输入"
                        size="mini"
                        @blur="formDataUrlBlur" />
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <el-tab-pane v-if="functionList.indexOf('小程序') > -1"
                   label="小程序"
                   name="小程序">
        <div class="form-box">
          <el-form ref="form"
                   size="mini"
                   label-width="80px">
            <el-form-item label="PagePath:">
              <el-input v-model="formData.title"
                        placeholder="请输入"
                        @blur="xiao_blur" />
            </el-form-item>
            <el-form-item label="appId:">
              <el-input v-model="formData.appId"
                        placeholder="请输入"
                        @blur="xiao_blur" />
            </el-form-item>
            <el-form-item label="URL:">
              <el-input v-model="formData.url"
                        placeholder="请输入"
                        @blur="xiao_blur" />
            </el-form-item>
            <!-- <el-form-item label="封面">
              <div v-if="formData.imgUrl != null"
                   class="showimg">
                <img :src="$fileUrl() + formData.imgUrl" />
                <div class="zeo">
                  <el-button type="danger"
                             class="del"
                             icon="el-icon-delete"
                             circle
                             @click="xiao_delImg" />
                </div>
              </div>
              <div v-if="formData.imgUrl == null"
                   class="pic-box">
                <div style="margin-left:0px"
                     class="left"
                     @click="xiao_dialogshow">
                  <div class="icon-box">
                    <i class="icon el-icon-plus" />
                  </div>
                  <p>从素材库中选择</p>
                </div>
              </div>
            </el-form-item>-->
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="选择图片"
               :visible.sync="dialogVisible"
               width="50%">
      <div class="container">
        <div class="waterfall">
          <div v-for="(img,index) in imgList"
               :key="index"
               :style="{borderColor: img.check ? '#1989fa' : '#cccccc' }"
               class="pin"
               @click="checkImg(img)">
            <i v-if="img.check"
               style="color:#1989fa;font-size:20px;"
               class="el-icon-success" />
            <!-- <img :src="" /> -->
            <el-image name="img"
                      style="width:100%; height:100%"
                      :src="$fileUrl() + img.localUrl"
                      fit="contain" />
          </div>
        </div>
      </div>

      <div class="pagination">
        <el-pagination background
                       :current-page="currentPage1"
                       layout="total, prev, pager, next, jumper"
                       :total="total"
                       @current-change="handleCurrentChange" />
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   @click="saveModel">确 定</el-button>
        <el-button size="mini"
                   @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="选择图文"
               :visible.sync="dialogVisibleTwo"
               width="50%">
      <el-tabs v-model="activeNameTwo"
               type="card"
               size="mini"
               @tab-click="handleClickTwo">
        <el-tab-pane label="图文"
                     name="first">
          <div class="box-con">
            <div v-for="(val,index) in NewsList"
                 :key="index"
                 :style="{borderColor: val.check ? '#1989fa' : '#cccccc' }"
                 class="two-box"
                 @click="checkImgTwo(val,1)">
              <i v-if="val.check"
                 style="color:#1989fa;font-size:20px;position:absolute;top:10px;right:10px;z-index:99;"
                 class="el-icon-success" />
              <div class="imgbox">
                <el-image name="img"
                          style="width:100%; height:100%"
                          :src="$fileUrl() + val.wechatMaterialNewsItemList[0].localThumbUrl"
                          fit="contain" />
              </div>
              <div class="txtbox">
                <p>{{ val.wechatMaterialNewsItemList[0].title }}</p>
                <p v-if="val.wechatMaterialNewsItemList[1]">{{ val.wechatMaterialNewsItemList[1].title }}</p>
              </div>
              <div style="clear:both" />
            </div>
          </div>

          <div class="pagination">
            <el-pagination background
                           :current-page="currentPage2"
                           layout="total, prev, pager, next, jumper"
                           :total="totalTwo"
                           @current-change="handleCurrentChangeTwo" />
          </div>
        </el-tab-pane>

        <el-tab-pane v-if="photoShow==1"
                     label="高级图文"
                     name="two">
          <div class="box-con">
            <div v-for="(val,index) in seniorNewsList"
                 :key="index"
                 :style="{borderColor: val.check ? '#1989fa' : '#cccccc' }"
                 class="two-box"
                 @click="checkImgThree(val,2)">
              <i v-if="val.check"
                 style="color:#1989fa;font-size:20px;position:absolute;top:10px;right:10px;z-index:99;"
                 class="el-icon-success" />
              <div class="imgbox">
                <el-image name="img"
                          style="width:100%; height:100%"
                          :src="$fileUrl() + val.advancedNewsItemList[0].picUrl"
                          fit="contain" />
              </div>
              <div class="txtbox">
                <p>{{ val.advancedNewsItemList[0].title }}</p>
                <p v-if="val.advancedNewsItemList[1]">{{ val.advancedNewsItemList[1].title }}</p>
              </div>
              <div style="clear:both" />
            </div>
          </div>
          <div class="pagination">
            <el-pagination background
                           :current-page="currentPage3"
                           layout="total, prev, pager, next, jumper"
                           :total="totalThree"
                           @current-change="handleCurrentChangeThree" />
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   @click="saveModelTwo">确 定</el-button>
        <el-button size="mini"
                   @click="dialogVisibleTwo = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  Image,
  ImageHtml,
  advancedMaterialList,
  GetImgFile,
  AdvancedMessageDetail
} from "@/api/wechat/material";
import {
  surbanajurong_Image,
  surbanajurong_ImageHtml,
  surbanajurong_advancedMaterialList,
  surbanajurong_GetImgFile,
  surbanajurong_AdvancedMessageDetail,
} from "@/api/surbanajurong/wechat/material";
import editorImage from "@/components/Tinymce/components/editorImage";
export default {
  name: "Reply",
  components: { editorImage },
  props: {
    functionList: {
      type: Array,
      default: ["文本", "图片", "图文"]
    },
    itemId: {
      type: Number,
      default: null
    },
    showData: {
      type: Object,
      default: null
    },
    photoShow: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      API: {},
      number: "",
      textarea: "",
      activeName: this.functionList[0],
      activeNameTwo: "first",
      dialogVisible: false,
      dialogVisibleTwo: false,
      imgList: [],
      NewsList: [],
      seniorNewsList: [],
      total: 0,
      totalTwo: 0,
      totalThree: 0,
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      imgObjText: {},
      imgObj: {},
      imgObjTwo: {},
      copyImg: {},
      copyImgtwo: {},
      dialogshowType: "图片",
      formData: {},
      formDataUrl: {},
      showDataObj: null
    };
  },
  computed: {},
  watch: {
    showData (newVal, oldvAL) {
      this.showDataObj = newVal;
      this.init();
    }
  },
  created () {
    if (localStorage.getItem("projectName")) {
      let projectName = localStorage.getItem("projectName");
      if (projectName == "surbanajurong") {
        this.API = {
          Image: surbanajurong_Image,
          ImageHtml: surbanajurong_ImageHtml,
          advancedMaterialList: surbanajurong_advancedMaterialList,
          GetImgFile: surbanajurong_GetImgFile,
          MessageDetail: surbanajurong_AdvancedMessageDetail
        };
      } else {
        this.API = {
          Image: Image,
          ImageHtml: ImageHtml,
          advancedMaterialList: advancedMaterialList,
          GetImgFile: GetImgFile,
          MessageDetail: AdvancedMessageDetail
        };
      }
    }
    this.setData();
    this.showDataObj = this.showData ? this.showData : {};
    console.log("123", this.showDataObj);
    this.init();
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    init () {
      if (this.$isNull(this.showDataObj.type)) {
        this.setData();
        return;
      }
      console.log("this.showDataObj", this.showDataObj);
      if (this.showDataObj.type == 1) {
        if (this.showData.value.length) {
          this.textarea = this.showData.value[0].text;
        } else {
          this.textarea = ''
        }
        this.activeName = "文本";
      }
      if (this.showDataObj.type == 2) {
        this.activeName = "图片";
        this.imgObj.id = this.showData.value[0].id;
        this.imgObj.localUrl = this.showData.value[0].localUrl;
      }
      if (this.showDataObj.type == 6) {
        this.activeName = "图文";
        this.imgObjTwo.id = this.showData.value[0].id;
        this.imgObjTwo.number = this.showDataObj.type;
        if (!this.$isNull(this.showData.value[0].wechatMaterialNewsItemList[0].id)) {
          this.imgObjTwo.wechatMaterialNewsItemList = this.showData.value[0].wechatMaterialNewsItemList;
        } else {
          this.getShowImg(this.showData.value[0].id);
        }
      }
      if (this.showDataObj.type == 5) {
        this.activeName = "图文";
        this.imgObjTwo.id = this.showData.value[0].id;
        this.imgObjTwo.number = this.showDataObj.type;
        if (!this.$isNull(this.showData.value[0].wechatMaterialNewsItemList[0].id)) {
          this.imgObjTwo.advancedNewsItemList = this.showData.value[0].wechatMaterialNewsItemList;
        } else {
          this.imageText(this.showData.value[0].id);
        }
      }
      if (this.showDataObj.type == 8) {
        this.activeName = "链接";
        this.formDataUrl.url = this.showData.value[0].url;
      }
      if (this.showDataObj.type == 9) {
        this.activeName = "小程序";
        this.formData.title = this.showData.value[0].title;
        this.formData.appId = this.showData.value[0].appId;
        this.formData.url = this.showData.value[0].pagePath;
        this.formData.imgUrl = this.showData.value[0].localUrl;
        this.imgObj.id = this.showData.value[0].id;
        this.imgObj.mediaId = this.showData.value[0].thumbMediaId;
        // console.log(this.formData, this.imgObj);
      }
    },
    getShowImg (number) {
      // 通过图片id回显图片
      // console.log("通过图片id回显图片", number);
      this.API.GetImgFile({ id: number }).then(res => {
        if (res.code == 0) {
          console.log("通过图片id回显图片通过图片id回显图片", res);
          this.$set(
            this.imgObjTwo,
            "wechatMaterialNewsItemList",
            res.data.wechatMaterialNewsItemList
          );
          // console.log(this.imgObjTwo.wechatMaterialNewsItemList);
        }
      });
    },
    imageText (id) {
      this.API.MessageDetail({ id: id }).then(res => {
        if (res.code == 0) {
          // console.log("通过图片id回显图片通过图片id回显图片", res);
          this.$set(
            this.imgObjTwo,
            "advancedNewsItemList",
            res.data.advancedNewsItemList
          );
          // console.log(this.imgObjTwo.wechatMaterialNewsItemList);
        }
      });
    },
    setData () {
      this.textarea = "";

      this.imgObjText = {
        itemId: this.itemId
      };
      this.imgObj = {
        itemId: this.itemId
      };
      this.imgObjTwo = {
        itemId: this.itemId
      };
      this.copyImg = {
        itemId: this.itemId
      };
      this.copyImgtwo = {
        itemId: this.itemId
      };

      this.formData = {
        title: "",
        appId: "",
        url: "",
        imgUrl: null,
        itemId: this.itemId
      };
      this.formDataUrl = {
        url: "",
        itemId: this.itemId
      };
    },
    uploadImgTxt () {
      this.$notify.info({
        title: "消息",
        message: "请至图文素材内上传图文"
      });
    },
    xiao_dialogshow () {
      this.dialogshowType = "小程序";
      this.dialogVisible = true;
      this.getMaterial(1);
    },
    dialogshow () {
      this.dialogshowType = "图片";
      this.dialogVisible = true;
      this.setData();
      this.getMaterial(1);
    },
    dialogshowTwo () {
      this.dialogVisibleTwo = true;
      this.setData();
      this.getMaterialTwo(1);
    },
    getMaterial (page) {
      this.imgList = [];
      this.API.Image({
        type: "image",
        page: page,
        size: 10
      }).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            this.imgList = res.data.data;
            this.total = res.data.total;
            this.currentPage1 = res.data.page;
          }
        }
      });
    },
    getMaterialTwo (page) {
      this.NewsList = [];
      this.totalTwo = 0;
      this.API.ImageHtml({
        type: "news",
        page: page,
        size: 10
      }).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            this.NewsList = res.data.data;
            this.totalTwo = res.data.total;
            this.currentPage2 = res.data.page;
          }
        }
      });
    },
    getAdvanced (page) {
      this.seniorNewsList = [];
      this.totalThree = 0;
      this.API.advancedMaterialList({
        page: page,
        size: 10
      }).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            this.seniorNewsList = res.data.data;
            this.totalThree = res.data.total;
            this.currentPage3 = res.data.page;
          }
        }
      });
    },
    checkImg (img) {
      this.imgList.map(item => {
        this.$set(item, "check", false);
      });
      this.$set(img, "check", true);
      this.copyImg = img;
    },
    checkImgTwo (val, num) {
      val.wechatMaterialNewsItemList[0].type = 6;
      this.NewsList.map(item => {
        this.$set(item, "check", false);
      });
      this.$set(val, "check", true);
      this.copyImgTwo = val;
      this.number = num;
    },
    checkImgThree (val, num) {
      console.log(val, num);
      val.advancedNewsItemList[0].type = 5;
      this.seniorNewsList.map(item => {
        this.$set(item, "check", false);
      });
      this.$set(val, "check", true);
      if (num == 1) {
        this.copyImg = val;
      } else {
        this.copyImgTwo = val;
      }
      this.number = num;
    },
    handleCurrentChange (e) {
      this.getMaterial(e);
    },
    handleCurrentChangeTwo (e) {
      this.getMaterialTwo(e);
    },
    handleCurrentChangeThree (e) {
      this.getAdvanced(e);
    },
    saveModel () {
      console.log("555555555555", this.copyImg);
      this.imgObj = Object.assign(this.imgObj, this.copyImg);
      this.dialogVisible = false;
      if (this.dialogshowType == "小程序") {
        this.formData.imgUrl = this.imgObj.localUrl;
        this.formData.action = this.activeName;
        this.formData.imgObj = this.copyImg;
        this.$emit("getObj", this.formData);
      } else {
        this.imgObj.action = this.activeName;
        this.$emit("getObj", this.imgObj);
      }
    },
    saveModelTwo () {
      console.log("66666", this.copyImgTwo);
      this.imgObjTwo = Object.assign(this.imgObjTwo, this.copyImgTwo);
      this.dialogVisibleTwo = false;
      this.imgObjTwo.action = this.activeName;
      this.imgObjTwo.number = this.number;
      this.$emit("getObj", this.imgObjTwo);
    },
    delImg () {
      this.setData();
      this.$emit("getObj", { itemId: this.itemId });
    },
    delImgTwo () {
      this.setData();
      this.$emit("getObj", { itemId: this.itemId });
    },
    xiao_blur () {
      this.formData.action = this.activeName;
      this.$emit("getObj", this.formData);
    },
    xiao_delImg () {
      //  this.formData = {}
      this.$set(this.formData, "imgObj", null);
      this.$set(this.formData, "imgUrl", null);
      this.formData.action = this.activeName;
      this.$emit("getObj", this.formData);
    },
    imageSuccessCBK (e) {
      if (e) {
        this.$set(this.imgObj, "localUrl", e[0].url.localUrl);
        this.imgObj.action = this.activeName;
        this.$emit("getObj", this.imgObj);
      }
    },
    SetTextarea () {
      this.$set(this.imgObjText, "info", this.textarea);
      this.imgObjText.action = this.activeName;
      this.$emit("getObj", this.imgObjText);
    },
    formDataUrlBlur () {
      this.formDataUrl.action = this.activeName;
      this.$emit("getObj", this.formDataUrl);
    },
    handleClick (tab, event) {
      this.setData();
      this.$emit("getObj", { itemId: this.itemId });
      // console.log(tab, event)
    },
    handleClickTwo (tab) {
      console.log(tab.index, '你选择的是哪个图文')
      // console.log(tab.index)
      this.setData();
      if (tab.index == 0) {
        this.getMaterialTwo(1);
      }

      if (tab.index == 1) {
        this.getAdvanced(1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-box {
  max-width: 500px;
  margin: 20px 0;
  .input-list {
    width: 100%;
    .left {
      width: 50px;
      height: 40px;
      line-height: 40px;
      text-align: right;
      float: left;
    }
    .right {
      width: calc(100% - 80px);
      float: right;
    }
  }
}
.box-con {
  width: 100%;
  padding-right: 15px;
  box-sizing: border-box;
  position: relative;
  .zeo {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    display: none;
    .del {
      position: relative;
      top: calc(50% - 25px);
      left: calc(50% - 25px);
    }
  }
  .two-box {
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    cursor: pointer;
    padding: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border: 1px solid #cccccc;
    .imgbox {
      width: 100px;
      height: 100px;
      float: left;
      background: #f5f5f5;
      img {
        width: 100%;
        display: block;
      }
    }
    .txtbox {
      width: calc(100% - 120px);
      height: 100px;
      float: right;
    }
  }
}
.showimg {
  width: 300px;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    display: block;
  }
  .zeo {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    display: none;
    .del {
      position: relative;
      top: calc(50% - 25px);
      left: calc(50% - 25px);
    }
  }
}
.showimg:hover .zeo {
  display: block;
}
.box-con:hover .zeo {
  display: block;
}
.container {
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
}

.waterfall {
  -moz-column-count: 3;
  -webkit-column-count: 3;
  column-count: 3;
  -moz-column-gap: 1em;
  -webkit-column-gap: 1em;
  column-gap: 1em;
}

.pin {
  padding: 1em;
  margin: 0 0.125em 1em;
  -webkit-column-break-inside: avoid;
  break-inside: avoid;
  background: white;
  border: 1px solid #cccccc;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.pin img {
  width: 100%;
  padding-bottom: 1em;
  margin-bottom: 0.5em;
}
.pagination {
  width: 100%;
  height: 30px;
  margin-top: 10px;
  text-align: right;
}
.tab-box {
  width: 100%;
}
.pic-box {
  width: 100%;
  height: 200px;
  display: flex;
  .left {
    flex: 1;
    height: 190px;
    border: 1px dashed #dee5e7;
    border-radius: 2px;
    margin-right: 10px;
    cursor: pointer;
    p {
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: center;
      margin-top: 10px;
      color: #303133;
    }
    .icon-box {
      width: 30px;
      height: 30px;
      margin: 70px auto 0 auto;
      .icon {
        font-size: 30px;
        color: #303133;
      }
    }
  }
  .right {
    flex: 1;
    height: 190px;
    border: 1px dashed #dee5e7;
    border-radius: 2px;
    margin-left: 10px;
    cursor: pointer;
    position: relative;
    p {
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: center;
      margin-top: 10px;
      color: #303133;
    }
    .icon-box {
      width: 30px;
      height: 30px;
      margin: 70px auto 0 auto;
      .icon {
        font-size: 30px;
        color: #303133;
      }
    }
  }
  .left:hover,
  .right:hover {
    border-color: #1989fa;
  }
}
</style>
