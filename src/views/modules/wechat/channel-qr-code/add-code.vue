<template>
  <d2-container class="page">
    <h3 class="list-title"
        style="margin-top:-10px;">{{ type == 'update' ? $t('wechat.addQr.title2') : $t('wechat.addQr.title1') }}</h3>

    <el-form ref="ruleForm"
             :model="Form"
             :rules="rules"
             label-position="left"
             label-width="100px">
      <el-form-item :label="$t('wechat.addQr.form1')"
                    prop="permanently">
        <el-radio-group size="small"
                        v-model="Form.permanently"
                        :disabled="type == 'update'"
                        @change="permanentlyClick">
          <el-radio :label="false">临时二维码
            <span v-if="productType">/Temporary QR code</span>
          </el-radio>
          <el-radio :label="true">永久二维码
            <span v-if="productType">/Permanent QR code</span>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('wechat.addQr.form2')"
                    prop="name">
        <el-row>
          <el-col :span="10">
            <el-input v-model="Form.name"
                      size="small"
                      :placeholder="$t('p')" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item v-if="!Form.permanently"
                    :label="$t('wechat.addQr.form3')"
                    prop="expireTimeString">
        <el-row>
          <el-col :span="10">
            <el-date-picker v-model="Form.expireTimeString"
                            :disabled="type == 'update'"
                            type="datetime"
                            placeholder="选择日期时间" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item :label="$t('wechat.addQr.form4')"
                    prop="mode">
        <el-radio-group v-model="Form.mode">
          <el-radio label="1">全部回复
            <span v-if="productType">/Reply all</span>
          </el-radio>
          <el-radio label="2">随机回复
            <span v-if="productType">/Random recovery</span>
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('wechat.addQr.form5')">
        <el-row>
          <el-col v-for="(item,index) in ReplyList"
                  :key="index"
                  style="margin-bottom:30px"
                  :span="24">
            <el-col :span="10">
              <Reply :function-list="['文本','图片','图文']"
                     :item-id="item.id"
                     :show-data="item.showData"
                     @getObj="getValue" />
            </el-col>
            <el-col style="margin-left:15px"
                    :span="2">
              <i v-if="index == 0"
                 class="el-icon-circle-plus icon-btn"
                 @click="addReply" />
              <i class="el-icon-remove icon-btn"
                 @click="removeReply(index)" />
            </el-col>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item :label="$t('wechat.addQr.form6')">
        <el-row>
          <el-col :span="24">
            <span v-for="(item,index) in tagListShow"
                  :key="index"
                  style="margin-left:10px;">
              <el-tag v-if="item.type == 'checkbox'"
                      type="success"
                      closable
                      @close="clearTag(item,index)">{{ item.name }}</el-tag>
              <el-tag v-if="item.type == 'radio'"
                      closable
                      @close="clearTag(item,index)">{{ item.name }}</el-tag>
            </span>
            <!-- <i
              class="el-icon-circle-plus icon-btn"
              style="position:relative;top:5px;margin-left:10px;"
              @click="dialogVisible = true"
            /> -->
            <i class="el-icon-circle-plus icon-btn"
               style="position:relative;top:5px;margin-left:10px;"
               @click="displayFrame()" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   size="small"
                   @click="onSubmit('ruleForm')">{{$t('confirm')}}</el-button>
        <el-button size="small"
                   @click="$router.go(-1);">{{$t('cancel')}}</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :title="$t('member.memList.addLabel')"
               :visible.sync="dialogVisible"
               width="30%">
      <div class="container">
        <el-form ref="ruleForm"
                 :model="LabelFrom"
                 label-width="100px"
                 label-position="left">
          <el-form-item prop="type"
                        :label="$t('wechat.menu.menulabel')">
            <el-radio-group v-model="LabelFrom.tag1"
                            size="mini">
              <el-radio @click.native.prevent="tagClick(item.id)"
                        v-for="(item,index) in tagList"
                        :key="index"
                        :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="type"
                        :label="$t('wechat.menu.no_menulabel')">
            <el-checkbox-group v-model="LabelFrom.tag2"
                               size="mini">
              <el-checkbox v-for="(item,index) in tagList1"
                           :key="index"
                           :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button size="mini"
                   @click="dialogVisible = false">{{$t('cancel')}}</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="saveAddLabel()">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  getTag,
  addQrcode,
  QrcodeDetails,
  GetTrigger,
  UpdateQrcode
} from "@/api/wechat/channelQrCode";

import {
  surbanajurong_getTag,
  surbanajurong_addQrcode,
  surbanajurong_QrcodeDetails,
  surbanajurong_GetTrigger,
  surbanajurong_UpdateQrcode
} from "@/api/surbanajurong/wechat/channelQrCode";


import Reply from "@/components/reply";

export default {
  name: "WechatChannelQrCodeAddCode",
  components: { Reply },
  data () {
    return {
      API: {},
      type: null,
      dialogVisible: false,
      LabelFrom: {
        tag1: null,
        tag2: []
      },
      Form: {
        permanently: true, // 创建类型
        name: null, // 二维码名称
        expireTimeString: null, // 失效时间
        mode: "1", // 回复方式
        tag1: null, // 标签一
        tag2: []
      },
      rules: {
        permanently: [{ required: true, message: "", trigger: "change" }],
        name: [
          { required: true, message: this.$t('wechat.addQr.rule1'), trigger: "blur" }
        ],
        mode: [{ required: true, message: "", trigger: "change" }]
      },
      ReplyList: [
        {
          id: 1,
          getVal: {}
        }
      ],
      AlltagList: [],
      tagList: [],
      tagList1: [],
      tagListShow: []
    };
  },
  computed: {},
  created () {
    if (this.$route.query.projectName == "product") {
      this.API = {
        getTag: getTag,
        addQrcode: addQrcode,
        QrcodeDetails: QrcodeDetails,
        GetTrigger: GetTrigger,
        UpdateQrcode: UpdateQrcode
      };
    } else if (this.$route.query.projectName == "surbanajurong") {
      this.API = {
        getTag: surbanajurong_getTag,
        addQrcode: surbanajurong_addQrcode,
        QrcodeDetails: surbanajurong_QrcodeDetails,
        GetTrigger: surbanajurong_GetTrigger,
        UpdateQrcode: surbanajurong_UpdateQrcode
      };
    }

    if (this.$route.query.id) {
      this.type = "update";
      this.ReplyList = [];
      this.getData(); // 回显数据
    } else {
      this.setTime();
    }
    this.getLabel();
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    getData () {
      this.API.QrcodeDetails({
        id: this.$route.query.id
      }).then(res => {

        if (res.code == 0) {
          this.Form.permanently = res.data.permanently;
          this.Form.name = res.data.title;

          if (!res.data.permanently) {
            this.Form.expireTimeString = new Date(res.data.expireTime);
          }

          this.Form.triggerIds = res.data.triggerIds;
          this.Form.id = res.data.id;

          if (res.data.triggerIds) {
            const ids = JSON.parse(res.data.triggerIds);
            this.getTrigger(ids[0]);
          }
        }
      });
    },
    getTrigger (triggerId) { // 回显
      this.API.GetTrigger({
        id: triggerId
      }).then(res => {
        if (res.code == 0) {
          this.Form.mode = JSON.stringify(res.data.operation.mode);
          // 回复方式回显
          const operationItems = res.data.operation.operationItems;
          console.log(operationItems, '你给我出来我看卡code可以处理不')
          operationItems.map((val, index) => {
            val.code = 'code'
            let option = {}
            let showDataOption = {
              type: 1,
              value: []
            }
            showDataOption = val;
            if (val.type == 1) {
              option = {
                action: "文本",
                info: val.value[0] ? val.value[0].text : ''
              }
            }
            if (val.type == 2) {
              option = {
                action: "图片",
                id: val.value[0].id,
                localUrl: val.value[0].localUrl
              }
            }
            if (val.type == 5) {
              option = {
                action: "图文",
                advancedNewsItemList: JSON.parse(JSON.stringify(val.value))
              }
              showDataOption.value[0].wechatMaterialNewsItemList = val.value
            }
            if (val.type == 6) {
              option = {
                action: "图文",
                wechatMaterialNewsItemList: JSON.parse(JSON.stringify(val.value))
              }
              showDataOption.value[0].wechatMaterialNewsItemList = val.value
            }

            this.ReplyList.push({
              id: index + 1,
              getVal: option,
              showData: showDataOption
            });
          });

          // 标签回显
          if (
            res.data.operation.extraOperation &&
            res.data.operation.extraOperation.type == "10"
          ) {
            const label = res.data.operation.extraOperation.value;

            this.AlltagList.map(val => {
              label.map(res => {
                if (res.id == val.id) {
                  if (val.menuTag) {
                    val.type = "radio";
                    this.LabelFrom.tag1 = val.id;
                  }
                  if (!val.menuTag) {
                    val.type = "checkbox";
                    this.LabelFrom.tag2.push(val.id);
                  }
                  this.tagListShow.push(val);
                }
              });
            });
          }
        }
      });
    },
    getLabel () {
      this.API.getTag({}).then(res => {
        if (res.code == 0) {
          this.AlltagList = res.data;
          if (res.data) {
            res.data.forEach(item => {
              if (item.menuTag) {
                this.tagList.push(item);
              } else {
                this.tagList1.push(item);
              }
            });
          }

        }
      });
    },
    permanentlyClick () {
      this.setTime();
    },
    setTime () {
      if (this.Form.permanently) {
        const date = new Date();
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 1);
        this.Form.expireTimeString = date;
        this.$set(this.rules, "expireTimeString", [
          { required: true, message: this.$t('wechat.addQr.rule2'), trigger: "change" }
        ]);
      } else {
        this.$set(this.rules, "expireTimeString", null);
        this.Form.expireTimeString = null;
      }
    },
    getValue (val) {
      this.ReplyList.map(item => {
        if (item.id == val.itemId) {
          item.getVal = val;
        }
      });
      console.log(val, this.ReplyList, '这个是你选择的是啥')
    },
    addReply () {
      console.log('你点击的是新增回复内容', this.ReplyList.length + 1)
      this.ReplyList.push({
        id: this.ReplyList.length + 1,
        getVal: {}
      });
    },
    removeReply (index) {
      this.ReplyList.splice(index, 1);
    },
    displayFrame () {
      // 点击显示添加标签弹框
      this.dialogVisible = true;
      console.log('显示弹框====', this.LabelFrom.tag2, this.LabelFrom.tag1, this.tagListShow)
      if (this.tagListShow.length != 0) {
        this.LabelFrom.tag2 = []; // tag2为非菜单标签放置处
        this.LabelFrom.tag1 = [];
        this.tagListShow.map(res => { // 当你点击标签添加弹框的时候,如果已经有标签了。那么我就把这些标签回显给弹框里面
          if (res.type == 'checkbox') {
            this.LabelFrom.tag2.push(res.id)
          } else {
            this.LabelFrom.tag1 = res.id
          }
        })
      } else {
        this.LabelFrom.tag2 = [];
        this.LabelFrom.tag1 = [];
      }


    },
    saveAddLabel () { // 点击标签添加弹框里面的确认按钮
      this.tagListShow = [];
      this.tagList.map(val => {
        if (val.id == this.LabelFrom.tag1) {
          val.type = "radio";
          this.tagListShow.unshift(val);
        }
      });
      this.tagList1.map(val => {
        this.LabelFrom.tag2.map(item => {
          if (val.id == item) {
            val.type = "checkbox";
            this.tagListShow.push(val);
          }
        });
      });

      this.dialogVisible = false;
    },
    clearTag (e, index) {
      this.tagListShow.splice(index, 1);
      if (e.type == "radio") {
        this.LabelFrom.tag1 = null;
      }
      if (e.type == "checkbox") {
        this.LabelFrom.tag2.map((item, ind) => {
          if (e.id == item) {
            this.LabelFrom.tag2.splice(ind, 1);
          }
        });
      }
    },
    tagClick (e) {
      // console.log(item)
      e === this.LabelFrom.tag1 ? this.LabelFrom.tag1 = null : this.LabelFrom.tag1 = e
    },
    sendData () {
      const sendData = {
        permanently: this.Form.permanently,
        expireTime: null,
        expireTimeString: this.Form.permanently
          ? null
          : this.$formatDate(
            new Date(this.Form.expireTimeString),
            "yyyy-MM-dd hh:mm:ss"
          ),
        title: this.Form.name,
        action_info: { scene: { scene_str: this.Form.name } },
        trigger: {
          name: this.Form.name + "触发器",
          description: "",
          type: 2,
          event: {
            type: "1", // 事件类型: 0(微信默认消息), 1(微信关注), 2(微信扫码), 3(微信点菜单), 4(微信消息)
            data: [
              {
                mode: 1, // 匹配模式: 1(等于), 2(不等于), 3(小于), 4(小于等于), 5(大于), 6(大于等于), 7(A于B之间, 范围), 8(空), 9(非), 10(模糊), 11(任意值, 非空)
                value: "" // 等于某个关键字
              }
            ]
          },
          filterId: null, // 过滤器ID, 可为空
          operation: {
            mode: this.Form.mode, // 1(随机运行), 2(全部运行)
            runAt: null, // 指定时间运行
            operationItems: [
              {
                type: 1, // 操作方式:
                //  1(微信回复文本消息), 2(微信回复图片消息), 3(微信回复视频消息), 4(微信回复语音消息), 5(微信回复外链图文消息)
                //  6(微信回复图文消息), 7(微信回复音乐消息), 8(微信回复卡券消息), 9(微信回复小程序消息), 10(分配标签)
                value: [] // 相关数据
              }
            ],
            extraOperation: null // 额外操作,标签
          },
          enabled: true, // 是否立即启用
          enableAt: null // 如果不是立即启用需要配置这个字段, 传入启用时间就行
        }
      };

      // /标签
      if (this.tagListShow.length > 0) {
        const extraOperation = {
          type: 10,
          value: this.tagListShow.map(choose => {
            return { id: choose.id };
          })
        };
        sendData.trigger.operation.extraOperation = extraOperation;
      }

      // /回复内容
      const operationItems = [];
      this.ReplyList.map(val => {
        console.log(val, '这个是你选择的图文之类的东西')
        if (val.getVal) {
          delete val.showData;
          const option = {
            type: 1,
            value: []
          };
          if (val.getVal.action == "文本") {
            option.type = 1;
            option.value.push({
              text: val.getVal.info
            });
          }

          if (val.getVal.action == "图片") {
            option.type = 2;
            option.value.push({
              id: val.getVal.id,
              localUrl: val.getVal.localUrl
            });
          }

          if (val.getVal.action == "图文") {
            let itemList;
            if (val.getVal.wechatMaterialNewsItemList) {
              option.type = 6;
              itemList = val.getVal.wechatMaterialNewsItemList[0];
            } else if (val.getVal.advancedNewsItemList) {
              option.type = 5;
              itemList = val.getVal.advancedNewsItemList[0];
            }
            option.value.push(
              // id: val.getVal.id,
              // wechatMaterialNewsItemList: itemList
              itemList);
          }

          operationItems.push(option);
        }
      });

      sendData.trigger.operation.operationItems = operationItems;

      // /编辑时逻辑
      if (this.type == "update") {
        sendData.id = this.Form.id;
        sendData.triggerIds = this.Form.triggerIds;
      }

      return sendData;
    },
    onSubmit (formName) {
      console.log(this.sendData(), '你给我出来你有错误知道不')
      this.$refs[formName].validate(valid => {
        if (valid) {
          const sendData = this.sendData();
          sendData.loading = true;
          if (this.type == "update") {
            // 编辑
            this.API.UpdateQrcode(sendData).then(res => {
              if (res.code == 0) {
                this.$router.go(-1); //返回上一层
              }
            });
          } else {
            this.API.addQrcode(sendData).then(res => {
              if (res.code == 0) {
                this.$router.go(-1); //返回上一层
              }
            });
          }
        } else {
          this.$notify.error({
            title: this.$t('member.filter.error'),
            message: this.$t('wechat.addQr.error1')
          });
          return false;
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
.icon-btn {
  color: #696969;
  font-size: 30px;
  cursor: pointer;
  margin-right: 10px;
}
.el-radio {
  margin-bottom: 10px;
}
</style>

