<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-button
          v-if="$Buttonpermissions('surbanajurong.wechat.material.advanced-picturehtml-list[add]')"
          type="primary"
          @click="addAdvancedMessage"
          size="small"
        >{{$t('material.bnt7')}}</el-button>
      </el-col>
    </el-row>

    <div class="container">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="title">{{$t('material.des4')}}{{ total }}{{$t('material.des1')}}</div>
        </el-col>
      </el-row>

      <div v-for="(item,index) in MaterialList" :key="index" class="item-list">
        <el-card>
          <div slot="header">
            <div style="width:100%;padding:0;">
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('material.des3')+$formatDate(new Date(item.advancedNewsItemList[0].createTime),'yyyy-MM-dd hh:mm:ss')"
                placement="top-start"
              >
                <span
                  class="header-sty"
                >{{$t('material.des3')}}{{ $formatDate(new Date(item.advancedNewsItemList[0].createTime),'yyyy-MM-dd hh:mm:ss') }}</span>
              </el-tooltip>

              <el-button
                size="small"
                type="text"
                style="float:right;color:#f05050"
                v-if="$Buttonpermissions('surbanajurong.wechat.material.advanced-picturehtml-list[del]')"
                @click="delImagesText(item)"
              >{{$t('delete')}}</el-button>

              <el-button
                size="small"
                type="text"
                style="margin-right:10px;float:right;"
                @click="link_copy(item.advancedNewsItemList[0])"
              >{{$t('material.lab6')}}</el-button>

              <el-button
                size="small"
                type="text"
                style="margin-right:10px;float:right;"
                @click="update(item)"
                v-if="$Buttonpermissions('surbanajurong.wechat.material.advanced-picturehtml-list[update]')"
              >{{$t('update')}}</el-button>

              <div style="clear:both" />
            </div>
          </div>
          <div class="img-box">
            <el-image
              name="img"
              class="img"
              :src="$fileUrl() + item.advancedNewsItemList[0].picUrl"
              fit="contain"
            />
          </div>
          <div class="text-time">{{item.advancedNewsItemList[0].title}}</div>
        </el-card>
      </div>

      <div style="clear:both" />
    </div>
    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- <el-dialog title="同步图文" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form
          ref="ruleForm"
          :model="LaunchFrom"
          :rules="Rules"
          label-width="100px"
          label-position="left"
        >
          <el-form-item prop="type" label="同步范围">
            <el-radio-group v-model="LaunchFrom.type">
              <el-radio label="全部图片" />
              <el-radio label="所选日期只有的图文" />
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="time" label="日期">
            <el-date-picker v-model="LaunchFrom.time" type="date" placeholder="选择日期时间" />
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getImagesText('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>-->

    <el-dialog :title="$t('material.lab7')" :visible.sync="dialogVisible_url" width="30%">
      <span>{{ copyUrl }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_url = false">{{ $t('cancel') }}</el-button>
        <el-button
          v-clipboard:copy="copyUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          type="primary"
          @click="dialogVisible_url = false"
        >{{ $t('copy') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { advancedMaterialList, deleteImageText } from "@/api/wechat/material";

import {
  surbanajurong_advancedMaterialList,
  surbanajurong_deleteImageText
} from "@/api/surbanajurong/wechat/material";

export default {
  props: {
    projectName: {
      type: String,
      default: "product"
    }
  },
  name: "AdvancedImageText",
  components: {},
  data() {
    return {
      API: {},
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
      },
      dialogVisible_url: false,
      copyUrl: null
    };
  },
  computed: {},
  created() {
    if (localStorage.getItem("projectName")) {
      let projectName = localStorage.getItem("projectName");
      this.projectName = projectName;
      if (projectName == "surbanajurong") {
        this.API = {
          advancedMaterialList: surbanajurong_advancedMaterialList,
          deleteImageText: surbanajurong_deleteImageText
        };
      } else {
        this.API = {
          advancedMaterialList: advancedMaterialList,
          deleteImageText: deleteImageText
        };
      }
    }

    console.log("我进页面的时候传过来的参数", this.API, this.projectName);
    this.getList(1);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getList(page) {
      const sendData = {
        page: page,
        size: 12
      };
      this.API.advancedMaterialList(sendData).then(res => {
        this.MaterialList = [];
        if (res.code == 0) {
          this.total = res.data.total;
          this.currentPage = page;
          this.MaterialList = res.data.data;
        }
      });
    },
    handleCurrentChange(e) {
      this.getList(e);
    },
    delImagesText(item) {
      this.copyItems = item;
      console.log(item, this.API.deleteImageText, "1234567");
      this.$confirm("确定删除此条图文消息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.API.deleteImageText({
            id: this.copyItems.id
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
        .catch(() => {});
    },
    onError() {
      this.$notify.error({
        title: "错误",
        message: "复制失败"
      });
    },
    onCopy() {
      this.$notify({
        title: "成功",
        message: "复制成功",
        type: "success"
      });
    },
    link_copy(item) {
      this.dialogVisible_url = true;
      this.copyUrl = item.externalLinkUrl;
    },
    GetsyncWechatMaterial() {
      this.dialogVisible = true;
    },
    // getImagesText(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       const data =
    //         "news/" + this.$formatDate(this.LaunchFrom.time, "yyyy-MM-dd");
    //       this.API.syncWechatMaterial(data).then(res => {
    //         if (res.code == 0) {
    //           this.dialogVisible = false;
    //           this.$notify({
    //             title: "成功",
    //             message: "同步成功",
    //             type: "success"
    //           });
    //         }
    //       });
    //     } else {
    //       this.$notify.error({
    //         title: "错误",
    //         message: "有必填字段未填写"
    //       });
    //       return false;
    //     }
    //   });
    // },
    addAdvancedMessage() {
      this.$router.push({
        name: "wechat-material-addAdvancedMessage",
        query: {
          projectName: this.projectName
        }
      });
    },
    update(item) {
      console.log(item, this.projectName, "这个是删除按钮");
      this.$router.push({
        name: "wechat-material-addAdvancedMessage",
        query: {
          id: item.id,
          projectName: this.projectName
        }
      });
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
.header-sty {
  width: 47%;
  height: 17px;
  float: left;
  margin-top: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>

