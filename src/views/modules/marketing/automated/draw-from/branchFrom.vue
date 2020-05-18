<template>
  <div>
    <el-form
      ref="form"
      :model="dataForm"
      style="margin-bottom:15px"
      label-position="left"
      label-width="80px"
    >
      <div v-for="(val,index) in  branchList" :key="index">
        <el-form-item label="名称">
          <div class="list-box">
            <el-input
              style="width:100%;"
              :disabled="action == 'look'"
              placeholder="分值线路名称"
              size="small"
              v-model="val.label"
            ></el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <div v-for="(item,index) in  val.selecItemtList" :key="index" class="list-box">
            <div class="box">判断条件{{index + 1}}</div>
            <div class="box">
              <el-select
                style="width:100%;"
                size="small"
                :disabled="action == 'look'"
                @change="selChange(item)"
                clearable
                v-model="item.class"
                placeholder="选择"
              >
                <el-option
                  :label="num.name"
                  :value="num.id"
                  v-for="(num,index) in  item.selectList"
                  :key="index"
                >{{num.name}}</el-option>
              </el-select>
            </div>
            <div class="box">
              <el-select
                style="width:100%;"
                size="small"
                @change="selChange_1(item)"
                :disabled="action == 'look'"
                clearable
                v-model="item.name"
                placeholder="选择"
              >
                <el-option
                  :label="num.name"
                  :value="num.id"
                  v-for="(num,index) in  item.selectList1"
                  :key="index"
                >{{num.name}}</el-option>
              </el-select>
            </div>

            <div class="box">
              <el-select
                style="width:100%;"
                @change="selChange_2(item)"
                :disabled="action == 'look'"
                size="small"
                clearable
                v-model="item.mode"
                placeholder="选择"
              >
                <el-option
                  :label="num.name"
                  :value="num.id"
                  v-for="(num,index) in  item.selectList2"
                  :key="index"
                >{{num.name}}</el-option>
              </el-select>
            </div>

            <div v-if="item.type == 'bescene'" class="box">
              <el-select
                style="width:100%;"
                size="small"
                clearable
                v-model="item.value"
                placeholder="选择"
                :disabled="action == 'look'"
              >
                <el-option
                  :label="num.name"
                  :value="num.id"
                  v-for="(num,index) in  subscribescene"
                  :key="index"
                >{{num.name}}</el-option>
              </el-select>
            </div>

            <div v-if="item.type == 'other'" class="box">
              <el-input
                :disabled="action == 'look'"
                placeholder="判断名称"
                size="small"
                v-model="item.value"
              ></el-input>
            </div>

            <div v-if="item.type == 'time'" class="box">
              <el-date-picker
                style="width:100%;"
                v-model="item.value"
                type="date"
                size="small"
                placeholder="选择日期"
                :disabled="action == 'look'"
              ></el-date-picker>
            </div>
          </div>
          <div class="list-box">
            <el-button
              size="small"
              type="text"
              :disabled="action == 'look'"
              @click="add(val)"
            >添加属性判断</el-button>
          </div>
        </el-form-item>
      </div>

      <el-form-item style="margin-top:30px;">
        <el-button size="small" type="primary" :disabled="action == 'look'" @click="onSubmit">确定</el-button>
        <el-button size="small" :disabled="action == 'look'" @click="clear">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { GetTag } from "@/api/wechat/trigger";
export default {
  name: "attributeFrom",
  props: {
    showData: {
      type: Object,
      default: null
    },
    action: {
      type: String,
      default: "add"
    }
  },
  components: {},
  data() {
    return {
      branchList: [],
      dataForm: {
        name: null,
        selValue: null,
        selValue1: null,
        selValue2: null
      },
      templateId: null,
      fitleList: [], //模板数组
      operation: {
        mode: 2, // 1(随机运行), 2(全部运行)
        runAt: null, // 指定时间运行
        operationItems: [
          {
            type: null,
            value: []
          }
        ] /** 里面的参数在 this.operationItems 里放置*/,
        extraOperation: null // 額外操作，添加標籤
      },
      selectList: [
        {
          id: 2,
          name: "会员字段"
        },
        {
          id: 1,
          name: "粉丝字段"
        }
      ],
      subscribescene: [
        {
          id: "ADD_SCENE_SEARCH",
          name: "公众号搜索 "
        },
        {
          id: "ADD_SCENE_ACCOUNT_MIGRATION",
          name: "公众号迁移"
        },
        {
          id: "ADD_SCENE_PROFILE_CARD",
          name: "名片分享"
        },
        {
          id: "ADD_SCENE_QR_CODE",
          name: "扫描二维码 "
        },
        {
          id: "ADD_SCENEPROFILE_LINK",
          name: "图文页内名称点击"
        },
        {
          id: "ADD_SCENE_PROFILE_ITEM",
          name: "图文页右上角菜单"
        },
        {
          id: "ADD_SCENE_PAID",
          name: "支付后关注"
        },
        {
          id: "ADD_SCENE_OTHERS",
          name: "其他"
        }
      ],
      selectObj: {
        "2": [
          {
            id: "name",
            name: "姓名"
          },
          {
            id: "phone",
            name: "手机号码"
          },
          {
            id: "location",
            name: "地区"
          },
          {
            id: "registertime",
            name: "系统注册时间"
          },
          {
            id: "email",
            name: "邮箱"
          },
          {
            id: "gender",
            name: "性别"
          },
          {
            id: "birthday",
            name: "生日"
          },
          {
            id: "language",
            name: "语言"
          },
          {
            id: "tag",
            name: "标签"
          },
          {
            id: "subscribescene",
            name: "关注来源"
          }
        ],
        "1": [
          {
            id: "nickname",
            name: "微信昵称"
          },
          {
            id: "headimgurl",
            name: "微信头像"
          },
          {
            id: "subscribetime",
            name: "微信关注时间"
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    if (this.showData) {
      //回显数据
      console.log(this.showData);
      this.branchList = this.showData.branchData;
      this.branchList.map(res => {
        let option = {};
        if (res.conditions.length > 0) {
          res.conditions.map(val => {
            option.name = val.entrys[0].name;
            option.value = val.entrys[0].value;
            option.mode = val.entrys[0].mode;
            option.class = val.type;
            option.selectList = { ...this.selectList };
            option.selectList1 = this.selChange(
              JSON.stringify(val.type),
              "look"
            );
            option.selectList2 = this.selChange_1(val.entrys[0], "look");
            option.type = this.selChange_2(val.entrys[0], "look");
          });
          res.selecItemtList.push(option);
        }
      });
    }

    // if (this.showData) {
    //   //回显数据
    //   this.templateId = [];
    //   let array = this.showData.value;
    //   array.map(val => {
    //     this.templateId.push(val.id);
    //   });
    //   this.operation.operationItems[0].value = this.showData.value;
    // }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // getMessageList() {
    //   GetTag({}).then(res => {
    //     if (res.code == 0) {
    //       this.templates = res.data;
    //     }
    //   });
    // },
    getValue() {
      // 操作类型:1微信回复文本消息,2微信回复图片消息,3微信回复视频消息,4微信回复语音消息,5微信回复外链图文消息,6微信回复图文消息,7微信回复音乐消息,8微信回复卡券消息,9微信回复小程序消息,10分配标签,11微信回复模板消息,12赠送积分,13发送短信,14发放卡券
    },
    selChange(item, action) {
      if (!action) {
        item.name = null;
        item.mode = null;
        item.value = null;
        item.type = null;
        item.selectList1 = this.selectObj[item.class];
      } else {
        return this.selectObj[item];
      }
    },
    selChange_1(item, action) {
      if (!action) {
        item.mode = null;
        item.value = null;
        item.type = null;
      }
      let val = item.name;
      let selectList2 = null;
      if (
        val == "name" ||
        val == "phone" ||
        val == "email" ||
        val == "nickname"
      ) {
        //姓名、手机号码、邮箱、微信昵称
        selectList2 = [
          { id: 8, name: "为空" },
          { id: 11, name: "不为空" },
          { id: 1, name: "等于" },
          { id: 9, name: "不等于" },
          { id: 2, name: "包含" },
          { id: 12, name: "不包含" }
        ];
      } else if (
        val == "gender" ||
        val == "language" ||
        val == "subscribescene" ||
        val == "location"
      ) {
        //性别、语言、关注来源、地区
        selectList2 = [
          { id: 8, name: "为空" },
          { id: 11, name: "不为空" },
          { id: 1, name: "等于" },
          { id: 9, name: "不等于" }
        ];
      } else if (
        val == "registertime" ||
        val == "birthday" ||
        val == "subscribetime"
      ) {
        //系统注册时间、生日、微信关注时间
        selectList2 = [
          { id: 8, name: "为空" },
          { id: 11, name: "不为空" },
          { id: 1, name: "等于" },
          { id: 9, name: "不等于" },
          { id: 3, name: "早于" },
          { id: 4, name: "早于(含)" },
          { id: 5, name: "晚于" },
          { id: 6, name: "晚于(含)" }
        ];
      } else if (val == "tag") {
        //标签
        selectList2 = [
          { id: 8, name: "为空" },
          { id: 11, name: "不为空" },
          { id: 2, name: "包含" },
          { id: 12, name: "不包含" }
        ];
      } else if (val == "headimgurl") {
        //微信头像
        selectList2 = [{ id: 8, name: "为空" }, { id: 11, name: "不为空" }];
      }

      if (!action) {
        item.selectList2 = selectList2;
      } else {
        return selectList2;
      }
    },
    selChange_2(item, action) {
      if (!action) {
        item.value = null;
        item.type = null;
      }
      let type = null;
      if (
        item.name == "registertime" ||
        item.name == "birthday" ||
        item.name == "subscribetime"
      ) {
        if (
          item.mode == 1 ||
          item.mode == 9 ||
          item.mode == 3 ||
          item.mode == 4 ||
          item.mode == 5 ||
          item.mode == 6
        ) {
          type = "time";
        }
      } else if (item.name == "subscribescene") {
        //关注来源
        item.type = "bescene";
      } else {
        if (
          item.mode == 1 ||
          item.mode == 9 ||
          item.mode == 2 ||
          item.mode == 12
        ) {
          type = "other";
        }
      }

      if (!action) {
        item.type = type;
      } else {
        return type;
      }
    },
    add(val) {
      let option = {
        name: null,
        value: null,
        mode: null,
        class: null
      };
      option.selectList = { ...this.selectList };
      val.selecItemtList.push(option);
    },
    open(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    },
    onSubmit() {
      let list = [];
      this.branchList.map(val => {
        let sendData = {
          id: val.id,
          lineId: val.lineId,
          description: null,
          label: val.label,
          nextId: val.nextId,
          conditions: []
        };
        val.selecItemtList.map(res => {
          let entrys = {
            mode: res.mode,
            name: res.name
          };
          if (res.value) {
            if (
              res.name == "registertime" ||
              res.name == "birthday" ||
              res.name == "subscribetime"
            ) {
              entrys.value = this.$formatDate(
                new Date(res.value),
                "yyyy-MM-dd"
              );
            } else {
              entrys.value = res.value;
            }
          }
          let option = {
            entrys: [],
            type: res.class
          };
          option.entrys.push(entrys);
          sendData.conditions.push(option);
        });

        list.push(sendData);
      });
      this.$emit("gteData", list);
    },
    clear() {
      this.onSubmit();
      // this.$emit("claer");
    }
  }
};
</script>
<style lang="scss" scoped>
.title-item {
  width: 100%;
  height: 32px;
  line-height: 32px;
  color: #333333;
}
.list-box {
  width: 300px;
  .box {
    width: 100%;
    height: 32px;
    line-height: 32px;
    margin-bottom: 10px;
  }
}
</style>

