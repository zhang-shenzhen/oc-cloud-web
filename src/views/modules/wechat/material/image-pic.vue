<template>
  <div>
    <el-row :gutter="20"
            v-if="type == 'default'">
      <el-col :span="24">
        <div v-if="$Buttonpermissions('surbanajurong.wechat.material.picture-list[add]')"
             style="float:left;margin-right:20px;">
          <editorImage urltype="material"
                       type="default"
                       @successCBK="imageSuccessCBK" />
        </div>
        <el-button v-if="$Buttonpermissions('surbanajurong.wechat.material.picture-list[syn]')"
                   size="small"
                   @click="GetsyncWechatMaterial">{{$t('material.bnt1')}}</el-button>
        <el-button size="small"
                   type="primary"
                   @click="AllPicture">全部图片</el-button>
      </el-col>
    </el-row>

    <div class="container">
      <el-row :gutter="20">
        <el-col :span="24">
          <!-- 图片(共{{ total }}条) -->
          <div class="title">{{$t('material.des')}}{{ total }}{{$t('material.des1')}}</div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <div class="group">
            <div class="left">
              <div class="item">{{$t('material.des2')}}</div>
            </div>
            <!-- 分组后面你创建的几个分组 -->
            <div class="center">
              <span v-for="(group,index) in imageGroup"
                    :key="index"
                    class="item-list-grop"
                    :class="{'active': group.check}"
                    @click="groupClick(group)">{{ group.name }}</span>
            </div>
            <div v-if="type == 'default'"
                 class="right">
              <!-- 新建分组 -->
              <el-button v-if="$Buttonpermissions('surbanajurong.wechat.material.picture-list[addGroup]')"
                         type="primary"
                         size="small"
                         @click="addGroupClick">{{$t('material.bnt2')}}</el-button>
            </div>
          </div>
        </el-col>
      </el-row>

      <div v-for="(item,index) in MaterialList"
           :key="index"
           class="item-list">
        <el-card>
          <div slot="header">
            <div style="width:100%;padding:0;">
              <span class="itemName">{{ item.name }}</span>
              <!-- <el-button
                v-if="type == 'default'"
                size="small"
                style="float:right;color:#f05050"
                type="text"
                @click="delImagesText(item)"
              >删除</el-button>-->
              <!-- 移动分组 -->
              <el-button size="small"
                         v-if="type == 'default' && $Buttonpermissions('surbanajurong.wechat.material.picture-list[moveGroup]')"
                         style="float:right;margin-right:15px;"
                         type="text"
                         @click="removeGroup(item)">{{$t('material.bnt3')}}</el-button>

              <div style="clear:both" />
            </div>
          </div>
          <div class="img-box">
            <el-image @click="choosePic(item)"
                      name="img"
                      class="img"
                      :src="$fileUrl() + item.localUrl"
                      fit="contain" />
          </div>
          <!-- <div class="text-time">

          </div>-->
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

    <el-dialog :title="$t('material.bnt4')"
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
              <el-radio :label="1">{{$t('material.lab1')}}</el-radio>
              <el-radio :label="2">{{$t('material.lab2')}}</el-radio>
            </el-radio-group>
          </el-form-item>-->
          <el-date-picker size="small"
                          v-model="LaunchFrom.time"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
          <!-- <el-form-item prop="time"
                        :label="$t('material.lab3')">
            <el-date-picker style="width:100%"
                            size="small"
                            v-model="LaunchFrom.time"
                            type="date"
                            :placeholder="$t('pla2')" />
          </el-form-item> -->
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
    <!-- 移动分组 -->
    <el-dialog :title="$t('material.bnt3')"
               :visible.sync="dialogVisible_remove"
               width="30%">
      <div>
        <el-form ref="removeForm"
                 :model="removeForm"
                 :rules="removeRules"
                 label-width="100px"
                 label-position="left">
          <el-form-item prop="id"
                        :label="$t('material.bnt5')">
            <el-radio-group v-model="removeForm.id">
              <el-radio v-for="(group,index) in imageGroup"
                        :key="index"
                        :label="group.id">{{ group.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="dialogVisible_remove = false">{{$t('cancel')}}</el-button>
        <el-button size="small"
                   type="primary"
                   @click="saveRemove('removeForm')">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>

    <!-- 新建分组 -->
    <el-dialog :title="$t('material.bnt2')"
               :visible.sync="dialogVisible_group"
               width="30%">
      <div>
        <el-form ref="addgroupForm"
                 :model="addgroupForm"
                 :rules="addgroupRules"
                 label-width="100px"
                 label-position="left">
          <el-form-item :label="$t('material.bnt3')"
                        prop="GroupName">
            <el-row>
              <el-col :span="10">
                <el-input v-model="addgroupForm.GroupName"
                          :placeholder="$t('pla1')"
                          maxlength="6"
                          show-word-limit />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="dialogVisible_group = false">{{$t('cancel')}}</el-button>
        <el-button size="small"
                   type="primary"
                   @click="saveAddGroup('addgroupForm')">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  Image,
  deleteImageText,
  syncWechatMaterial_pic,
  ImageGroup,
  removeImage,
  AddGroup
} from "@/api/wechat/material";

import {
  surbanajurong_Image,
  surbanajurong_deleteImageText,
  surbanajurong_syncWechatMaterial_pic,
  surbanajurong_ImageGroup,
  surbanajurong_removeImage,
  surbanajurong_AddGroup
} from "@/api/surbanajurong/wechat/material";

import editorImage from "@/components/Tinymce/components/editorImage";

export default {
  name: "image-pic",
  props: {
    type: {
      type: String,
      default: "default"
    },
    projectName: {
      type: String,
      default: "product"
    }
  },
  components: { editorImage },
  data () {
    return {
      API: {},
      MaterialList: [],
      materialGroupId: null,
      dialogVisible_remove: false,
      removeForm: {
        id: null
      },
      imageGroup: [
        {
          id: -1,
          name: "全部图片",
          check: true
        }
      ],
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
      removeRules: {
        id: [
          {
            required: true,
            message: this.$t("material.rule2"),
            trigger: "change"
          }
        ]
      },
      dialogVisible_group: false,
      addgroupForm: {
        GroupName: null
      },
      addgroupRules: {
        // 请输入分组名
        GroupName: [
          {
            required: true,
            message: this.$t("material.rule3"),
            trigger: "blur"
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
          materialList: surbanajurong_Image,
          deleteImageText: surbanajurong_deleteImageText,
          syncWechatMaterial_pic: surbanajurong_syncWechatMaterial_pic,
          ImageGroup: surbanajurong_ImageGroup,
          removeImage: surbanajurong_removeImage,
          AddGroup: surbanajurong_AddGroup
        };
      } else {
        this.API = {
          materialList: Image,
          deleteImageText: deleteImageText,
          syncWechatMaterial_pic: syncWechatMaterial_pic,
          ImageGroup: ImageGroup,
          removeImage: removeImage,
          AddGroup: AddGroup
        };
      }
    }

    this.getList(1);
    this.getGroup();
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    imageSuccessCBK (e) {
      this.getList(1);
    },
    getGroup () {
      // 获取你共创建了几个分组
      this.API.ImageGroup({}).then(res => {
        if (res.code == 0) {
          if (res.data) {
            // this.imageGroup = [];
            console.log(res.data, "1.分组分组");
            res.data.map(val => {
              val.check = false;
              this.imageGroup.push(val);
            });
          }
        }
      });
    },
    groupClick (item) {
      // 你点击了某一个分组
      this.imageGroup.map(val => {
        this.$set(val, "check", false);
      });
      this.$set(item, "check", true);
      this.materialGroupId = item.id;
      if (item.id < 0) {
        this.materialGroupId = null;
      }
      this.getList(this.currentPage);
    },
    removeGroup (item) {
      this.copyItems = item;
      this.dialogVisible_remove = true;
      if (this.copyItems.materialGroupId) {
        this.removeForm.id = this.copyItems.materialGroupId;
      } else {
        this.removeForm.id = -1;
      }
      console.log(item, this.removeForm.id, this.copyItems.materialGroupId, '1.点击移动分组')
    },
    saveRemove (removeForm) {
      this.$refs[removeForm].validate(valid => {
        if (valid) {
          this.API.removeImage({
            id: this.copyItems.id,
            materialGroupId: this.removeForm.id
          }).then(res => {
            if (res.code == 0) {
              this.dialogVisible_remove = false;
              this.removeForm.id = null;
              this.getList(this.currentPage);
              this.$notify({
                title: "成功",
                message: "移动成功",
                type: "success"
              });
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
    AllPicture () {
      // 点击查看全部图片
      this.materialGroupId = null;
      this.imageGroup.map(val => {
        this.$set(val, "check", false);
      });
      this.getList(1);
    },
    getList (page) {
      const sendData = {
        page: page,
        type: "image",
        size: 12
      };
      if (!this.$isNull(this.materialGroupId)) {
        sendData.materialGroupId = this.materialGroupId;
      }
      this.API.materialList(sendData).then(res => {
        this.MaterialList = [];
        this.currentPage = page;
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

      this.$confirm("确定删除此张图片, 是否继续?", "提示", {
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
          let data = {
            startTime: this.LaunchFrom.time[0],
            endTime: this.LaunchFrom.time[1]
          }
          // let data = this.$formatDate(this.LaunchFrom.time, "yyyy-MM-dd");
          this.API.syncWechatMaterial_pic(data).then(res => {
            if (res.code == 0) {
              this.dialogVisible = false;
              this.$notify({
                title: "成功",
                message: "同步成功",
                type: "success"
              });
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
    addGroupClick () {
      this.dialogVisible_group = true;
      this.addgroupForm.GroupName = null;
    },
    saveAddGroup (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.API.AddGroup({ name: this.addgroupForm.GroupName }).then(res => {
            if (res.code == 0) {
              this.dialogVisible_group = false;
              this.getGroup();
              this.$notify({
                title: "成功",
                message: "新建分组成功",
                type: "success"
              });
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
    choosePic (item) {
      if (this.type == "default") {
        return;
      }
      this.$emit("sendData", item);
    },
    syType () {
      if (this.LaunchFrom.type == 1) {
        this.LaunchFrom.time = null;
        this.Rules.time[0].required = true;
      } else {
        this.Rules.time[0].required = false;
      }
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
  margin-top: 10px;
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
.itemName {
  float: left;
  margin-top: 8px;
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
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
.group {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  box-sizing: border-box;
  .left {
    width: 100px;
    .item {
      width: 100%;
      padding: 5px 0;
    }
  }
  .center {
    flex: 1;
    .item-list-grop {
      display: inline-block;
      padding: 5px 8px 5px 0px;
      cursor: pointer;
      margin-right: 15px;
      text-align: center;
      user-select: none;
      margin-bottom: 15px;
    }
    .active {
      color: #409eff;
      border-bottom: 1px solid #409eff;
    }
  }
  .right {
    width: 120px;
    height: 50px;
  }
}
</style>

