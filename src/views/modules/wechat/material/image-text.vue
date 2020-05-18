<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-button v-if="$Buttonpermissions('surbanajurong.wechat.material.picturehtml-list[syn]')"
                   type="primary"
                   size="small"
                   @click="GetsyncWechatMaterial">{{$t('material.bnt1')}}</el-button>
      </el-col>
    </el-row>

    <div class="container">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="title">{{$t('material.des5')}}{{ total }}{{$t('material.des1')}}</div>
        </el-col>
      </el-row>

      <div v-for="(item,index) in MaterialList"
           :key="index"
           class="item-list">
        <el-card>
          <div slot="header">
            <el-tooltip effect="dark"
                        :content="item.wechatMaterialNewsItemList[0].title"
                        placement="top-start">
              <div style="width:100%;padding:0;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                {{ item.wechatMaterialNewsItemList[0].title }}
                <!-- <span
                style="float:left;margin-top:8px;"
                >{{ item.wechatMaterialNewsItemList[0].title }}</span>-->
                <!-- <el-button
                size="small"
                type="text"
                style="float:right;color:#f05050"
                @click="delImagesText(item)"
                >删除</el-button>-->
                <!-- <div style="clear:both" /> -->
              </div>
            </el-tooltip>
          </div>
          <!-- <div v-html="item.wechatMaterialNewsItemList[0].content"></div> -->
          <!-- :src="$fileUrl() + item.wechatMaterialNewsItemList[0].thumbUrl" -->
          <div @click="details(item.wechatMaterialNewsItemList[0])"
               class="img-box">
            <el-image name="img"
                      class="img"
                      :src="$fileUrl() + item.wechatMaterialNewsItemList[0].localThumbUrl"
                      fit="contain" />
          </div>
          <div class="text-time">{{$t('material.des3')}}{{ $formatDate(new Date(item.wechatMaterialNewsItemList[0].updateTime),'yyyy-MM-dd hh:mm:ss') }}</div>
        </el-card>
      </div>

      <div style="clear:both" />
    </div>
    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>

    <el-dialog :title="$t('material.bnt6')"
               :visible.sync="dialogVisible"
               width="30%">
      <div>
        <el-form ref="ruleForm"
                 :model="LaunchFrom"
                 :rules="Rules"
                 label-width="100px"
                 label-position="left">
          <!-- <el-form-item prop="type"  :label="$t('material.lab')">
            <el-radio-group @change="syType()" v-model="LaunchFrom.type">
              <el-radio :label="1">{{$t('material.lab4')}}</el-radio>
              <el-radio :label="2">{{$t('material.lab5')}}</el-radio>
            </el-radio-group>
          </el-form-item>-->

          <el-form-item prop="time"
                        :label="$t('material.lab3')">
            <el-date-picker size="small"
                            v-model="LaunchFrom.time"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
            <!-- <el-date-picker style="width:100%"
                            size="small"
                            v-model="LaunchFrom.time"
                            type="date"
                            :placeholder="$t('pla2')" /> -->
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="dialogVisible = false">{{$t('cancel')}}</el-button>
        <el-button size="small"
                   type="primary"
                   @click="getImagesText('ruleForm')">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="$t('material.bnt8')"
               :visible.sync="dialogVisible_1"
               width="50%">
      <h3>{{modelvalue.title}}</h3>
      <div v-html="modelvalue.content"></div>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="dialogVisible_1 = false">{{$t('cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  ImageHtml,
  deleteImageText,
  syncWechatMaterial_news
} from "@/api/wechat/material";

import {
  surbanajurong_ImageHtml,
  surbanajurong_deleteImageText,
  surbanajurong_syncWechatMaterial_news
} from "@/api/surbanajurong/wechat/material";

export default {
  props: {
    projectName: {
      type: String,
      default: "product"
    }
  },
  name: "ImageText",
  components: {},
  data () {
    return {
      API: {},
      modelvalue: {},
      dialogVisible_1: false,
      MaterialList: [],
      total: 0,
      currentPage: 1,
      copyItems: null,
      dialogVisible: false,
      LaunchFrom: {
        type: null,
        time: null
      },
      Rules: {
        type: [
          {
            required: true,
            message: this.$t("material.rule"),
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            message: this.$t("material.rule1"),
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {},
  created () {
    if (localStorage.getItem("projectName")) {
      let projectName = localStorage.getItem("projectName");
      this.projectName = projectName;
      if (projectName == "surbanajurong") {
        this.API = {
          materialList: surbanajurong_ImageHtml,
          deleteImageText: surbanajurong_deleteImageText,
          syncWechatMaterial_news: surbanajurong_syncWechatMaterial_news
        };
      } else {
        this.API = {
          materialList: ImageHtml,
          deleteImageText: deleteImageText,
          syncWechatMaterial_news: syncWechatMaterial_news
        };
      }
    }
    this.getList(1);
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    getList (page) {
      const sendData = {
        page: page,
        type: "news",
        size: 12
      };
      this.API.materialList(sendData).then(res => {
        this.MaterialList = [];
        if (res.code == 0) {
          this.total = res.data.total;
          this.currentPage = page;
          this.MaterialList = res.data.data;
        }
      });
    },
    handleCurrentChange (e) {
      this.getList(e);
    },
    delImagesText (item) {
      this.copyItems = item;

      this.$confirm("确定删除此条图文消息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.API.deleteImageText({
            id: this.copyItems.id,
            mediaId: this.copyItems.mediaId
          }).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });

              this.MaterialList.map((val, index) => {
                if (val.id == this.copyItems.id) {
                  this.MaterialList.splice(index, 1);
                  this.total -= 1;
                }
              });
            }
          });
        })
        .catch(() => { });
    },
    GetsyncWechatMaterial () {
      this.LaunchFrom.time = [];
      this.dialogVisible = true;
    },
    getImagesText (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let data = this.$formatDate(this.LaunchFrom.time, "yyyy-MM-dd");
          let data = {
            startTime: this.LaunchFrom.time[0],
            endTime: this.LaunchFrom.time[1]
          }
          console.log(this.LaunchFrom.time, data, 'LaunchFrom===LaunchFrom')
          this.API.syncWechatMaterial_news(data).then(res => {
            if (res.code == 0) {
              this.dialogVisible = false;
              this.$notify({
                title: "成功",
                message: "同步成功",
                type: "success"
              });
              this.getList(1);
            }
          });
        } else {
          this.$notify.error({
            title: "错误",
            message: "有必填字段未填写"
          });
          return false;
        }
      });
    },
    syType () {
      if (this.LaunchFrom.type == 1) {
        this.LaunchFrom.time = null;
        this.Rules.time[0].required = true;
      } else {
        this.Rules.time[0].required = false;
      }
    },
    details (item) {
      this.modelvalue = item;
      this.dialogVisible_1 = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  overflow: scroll;
  border: 1px solid #dddddd;
  border-radius: 2px;
  padding: 10px;
  margin-top: 30px;
  box-sizing: border-box;
  text-indent: 10px;
}
.title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}
.item-list {
  width: calc(33.33% - 20px);
  float: left;
  margin: 10px;
}
.img-box {
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  overflow: hidden;
  .img {
    width: 100%;
  }
}
.text-time {
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #999;
}
</style>

