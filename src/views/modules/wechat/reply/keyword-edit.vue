<template>
  <d2-container class="page">
    <h3 class="list-title">创建关键字回复</h3>
    <el-row>
      <el-col :span="15"
              :offset="2">
        <el-col :span="2"
                style="margin-top:5px;">规则名称：</el-col>
        <el-col :span="15">
          <el-input v-model="param.name"
                    size="mini"
                    placeholder="请输入内容"
                    clearable />
        </el-col>
      </el-col>
      <el-col v-for="(item,index) in keywordData"
              :key="index"
              :span="15"
              :offset="2">
        <el-col :span="2"
                size="mini"
                style="margin-top:5px;">关键字：</el-col>
        <el-col :span="5">
          <el-select v-model="item.mode"
                     size="mini"
                     clearable
                     placeholder="请选择">
            <el-option v-for="i in keywordTemp"
                       :key="i.mode"
                       :label="i.name"
                       :value="i.mode" />
          </el-select>
        </el-col>
        <el-col :span="13">
          <el-input v-model="item.value"
                    size="mini"
                    placeholder="请输入内容"
                    clearable />
        </el-col>
        <el-col :span="4">
          <i v-if="keywordData.length-1 == index"
             class="el-icon-circle-plus icon_sty"
             @click="addKeyword('keyword',index)" />
          <i class="el-icon-remove icon_sty"
             @click="minusKeyword('keyword',index)" />
        </el-col>
      </el-col>
      <el-col :span="15"
              :offset="2">
        <el-col v-for="(item,index) in operationItems"
                :key="index">
          <el-col :span="2"
                  size="mini"
                  style="margin-top:10px;">回复内容：</el-col>
          <el-col :span="18">
            <Reply :function-list="['文本','图片','图文','小程序']"
                   :item-id="item.id"
                   :show-data="item.showData"
                   @getObj="getValue" />
          </el-col>
          <el-col :span="4">
            <i v-if="operationItems.length-1 == index"
               class="el-icon-circle-plus icon_sty"
               @click="addKeyword('content',index)" />
            <i class="el-icon-remove icon_sty"
               @click="minusKeyword('content')" />
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="15"
              :offset="2">
        <el-col :span="2"
                size="mini"
                style="margin-top:5px;">回复方式：</el-col>
        <el-col :span="15">
          <el-select v-model="param.operation.mode"
                     size="mini"
                     clearable
                     placeholder="请选择回复方式">
            <el-option v-for="item in options"
                       :key="item.mode"
                       :label="item.name"
                       :value="item.mode" />
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="15"
              :offset="2">
        <span>为发送此关键字的用户添加标签</span>
        <el-switch v-model="param.addtag"
                   size="mini"
                   style="margin:0 20px;"
                   active-color="#13ce66"
                   inactive-color="#ff4949" />
        <el-select v-model="selectList"
                   size="mini"
                   style="width:35%"
                   placeholder="请选择"
                   multiple
                   @change="selectTable()">
          <el-option v-for="item in option"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id" />
        </el-select>
      </el-col>
    </el-row>
    <el-button size="mini"
               type="primary"
               @click="sure()">确定</el-button>
    <el-button size="mini"
               @click="abolish()">取消</el-button>
  </d2-container>
</template>
<script>
import {
  TagList,
  DefaultReply,
  DetailsMessage,
  ReplyUpdate
} from "@/api/wechat/reply";

import {
  surbanajurong_TagList,
  surbanajurong_KeyWordReply,
  surbanajurong_DetailsMessage,
  surbanajurong_KeyWordUpdate
} from "@/api/surbanajurong/wechat/reply";


import Reply from "@/components/reply";
export default {
  name: "KeyordEdit",
  components: {
    Reply
  },
  data () {
    return {
      API: {},
      form: {
        name: ""
      },
      selectList: [],
      selectTagList: [],
      option: [],
      param: {
        name: "",
        itemId: 1,
        description: "",
        type: 5, // 触发器类型 1 2
        operation: {
          mode: 2, // 1(随机运行), 2(全部运行)
          runAt: null, // 指定时间运行
          operationItems: [],
          extraOperation: null // 額外操作，添加標籤
        },
        event: {
          type: 0, // 事件类型: 0(默认回复)) 1(微信关注), 2(微信扫码), 3(微信点菜单), 4(微信消息)
          data: []
        },
        filterId: null,
        enabled: true, // 是否立即启用
        enableAt: null, // 如果不是立即启用需要配置这个字段, 传入启用时间就行
        trigger: "0",
        addtag: false
      },
      //  回復內容
      operationItems: [],
      // 关键字回复(下拉框数据)
      keywordTemp: [
        {
          mode: 10,
          name: "半匹配"
        },
        {
          mode: 1,
          name: "全匹配"
        }
      ],
      keywordData: [
        /** 关键字参数放置处(多个) */
        {
          mode: 1,
          value: ""
        }
      ],
      options: [
        {
          mode: 2,
          name: "回复全部"
        },
        {
          mode: 1,
          name: "随机一条"
        }
      ]
    };
  },
  computed: {},
  created () {
    if (this.$route.query.projectName == "product") {
      this.API = {
        TagList: TagList,
        DefaultReply: DefaultReply,
        DetailsMessage: DetailsMessage,
        ReplyUpdate: ReplyUpdate
      };
    } else if (this.$route.query.projectName == "surbanajurong") {
      this.API = {
        TagList: surbanajurong_TagList,
        DefaultReply: surbanajurong_KeyWordReply,
        DetailsMessage: surbanajurong_DetailsMessage,
        ReplyUpdate: surbanajurong_KeyWordUpdate
      };
    }

    this.tableList();
    this.keywordList = this.$route.query;
    if (this.keywordList.title == 2) {
      // 回显
      this.detailsMessageEcho(this.keywordList.id);
    } else {
      this.operationItems = [
        {
          id: 1,
          getVal: {},
          showData: null,
          type: 1,
          value: [
            {
              id: "",
              localUrl: "",
              text: "",
              wechatMaterialNewsItemList: [],
              appId: "",
              title: "",
              pagePath: "",
              thumbMediaId: "",
              miniUrl: ""
            }
          ]
        }
      ];
    }
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    detailsMessageEcho (id) {
      this.API.DetailsMessage({}, id).then(res => {
        if (res.code == 0) {
          console.log("回显数据", res);
          this.param = res.data;
          // 关键字
          this.keywordData = this.param.event.data;
          // 标签
          if (this.param.operation.extraOperation) {
            this.param.operation.extraOperation.value.map(res => {
              this.selectList.push(res.id);
            });
            this.param.addtag = true;
          }

          this.echoData(this.param.operation.operationItems);
        }
      });
    },
    echoData (array) {
      console.log(array);
      this.operationItems = [];
      array.map((val, index) => {
        const option = {
          id: index + 1,
          getVal: {},
          showData: val,
          type: val.type,
          value: val.value
        };
        this.operationItems.push(option);
      });
      this.disposeGetVal(this.operationItems);
    },
    disposeGetVal (text) {
      // 处理

      text.map(res => {
        if (res.type == 1) {
          res.getVal.action = "文本";
          res.getVal.info = res.value[0].text;
        }
        if (res.type == 2) {
          res.getVal.action = "图片";
          res.getVal.id = res.value[0].id;
          res.getVal.localUrl = res.value[0].localUrl;
        }
        if (res.type == 6) {
          res.getVal.action = "图文";
          res.getVal.number == 1;
          res.getVal.id = res.value[0].id;
          res.getVal.wechatMaterialNewsItemList =
            res.value[0].wechatMaterialNewsItemList;
        }
        if (res.type == 5) {
          res.getVal.action = "图文";
          res.getVal.number == 2;
          res.getVal.id = res.value[0].id;
          res.getVal.advancedNewsItemList =
            res.value[0].wechatMaterialNewsItemList;
        }
        if (res.type == 9) {
          res.getVal.action = "小程序";
          res.getVal.title = res.value[0].title;
          res.getVal.appId = res.value[0].appId;
          res.getVal.url = res.value[0].pagePath;
          res.getVal.title = res.value[0].title;
          res.getVal.imgObj = {
            id: res.value[0].id,
            mediaId: res.value[0].thumbMediaId
          };
        }
      });
    },

    tableList () {
      //   标签接口
      this.API.TagList({}).then(res => {
        if (res.code === 0) {
          this.option = res.data;
          console.log("标签接口", this.option);
        }
      });
    },
    addKeyword (text, index) {
      console.log("text", index);
      // 新增关键字↓
      if (text === "keyword") {
        this.keywordData.push({
          mode: 10,
          value: ""
        });
      }
      // 回复内容↓
      if (text === "content") {
        this.operationItems.push({
          id: index + 2,
          getVal: {},
          type: 1,
          value: [
            {
              id: "",
              localUrl: "",
              text: "",
              wechatMaterialNewsItemList: [],
              appId: "",
              title: "",
              pagePath: "",
              thumbMediaId: "",
              miniUrl: ""
            }
          ]
        });
        console.log(this.operationItems);
      }
    },
    minusKeyword (text, index) {
      if (index < 1) {
        return false;
      }
      // 删除关键字↓
      if (text === "keyword") {
        this.keywordData.splice(index, 1);
      }
      if (text === "content") {
        this.operationItems.splice(index, 1);
      }
    },
    getValue (e) {
      // 渠道二维码/回复设置/群发消息/回复方式
      console.log(e);
      this.operationItems.map(res => {
        if (res.id === e.itemId) {
          res.getVal = e;
        }
      });
    },

    dispose () {
      // 处理;
      console.log("11111111111111", this.operationItems);
      this.operationItems.map(res => {
        if (res.getVal.action == "文本") {
          res.type = 1;
          res.value[0].text = res.getVal.info;
        }
        if (res.getVal.action == "图片") {
          res.type = 2;
          res.value[0].id = res.getVal.id;
          res.value[0].localUrl = res.getVal.localUrl;
        }
        if (res.getVal.action == "图文") {
          res.value[0].id = res.getVal.id;
          if (res.getVal.number == 1) {
            res.type = 6;
            res.value[0].localUrl = res.getVal.wechatMaterialNewsItemList[0].localThumbUrl;
            res.value[0].wechatMaterialNewsItemList = res.getVal.wechatMaterialNewsItemList;
          }
          if (res.getVal.number == 2) {
            res.type = 5;
            res.value[0].localUrl = res.getVal.advancedNewsItemList[0].picUrl;
            res.value[0].wechatMaterialNewsItemList = res.getVal.advancedNewsItemList;
          }


        }
        if (res.getVal.action == "小程序") {
          res.type = 9;
          res.value[0].title = res.getVal.title;
          res.value[0].appId = res.getVal.appId;
          res.value[0].pagePath = res.getVal.url;
          res.value[0].id = res.getVal.imgObj.id;
          res.value[0].localUrl = res.getVal.imgUrl;
          res.value[0].miniUrl = res.getVal.imgUrl;
          res.value[0].thumbMediaId = res.getVal.imgObj.mediaId;
        }
      });
    },

    selectTable () {
      console.log("你选择了一个标签", this.selectList);
      if (this.selectList.length == 0) {
        this.param.addtag = false;
      } else {
        this.param.addtag = true;
      }
    },
    sure () {
      this.dispose();
      this.param.event.type = 4;
      const _extraOperation = {
        type: 10,
        value: []
      };
      this.selectList.map(res => {
        console.log(res);
        _extraOperation.value.push({
          id: res
        });
      });
      this.param.operation.extraOperation = this.param.addtag
        ? _extraOperation
        : null;
      // 触发类型
      this.param.enableAt =
        this.param.trigger == "0" ? null : this.param.enableAt;
      //  回复内容
      this.param.operation.operationItems = JSON.parse(
        JSON.stringify(this.operationItems)
      );
      this.param.operation.operationItems.map(res => {
        delete res.id;
        delete res.getVal;
        delete res.showData;
      });
      //  关键字
      this.param.event.data = this.keywordData;
      console.log(this.param);
      if (this.keywordList.title == 2) {
        this.replyUpdateInterface(this.param);
      } else {
        this.defaultReplyInterface(this.param);
      }
    },
    defaultReplyInterface (obj) {
      this.API.DefaultReply(obj).then(
        res => {
          if (res.code == 0) {
            this.open("成功", "创建成功", "success");
            console.log("创建默认回复", res);
            this.abolish();
          }
        },
        error => {
          console.log("123", error);
        }
      );
    },
    replyUpdateInterface (obj) {
      // 编辑接口
      console.log(obj);
      this.API.ReplyUpdate(obj).then(res => {
        if (res.code == 0) {
          this.open("成功", "编辑成功", "success");
          console.log("编辑接口", res);
          this.abolish();
        }
      });
    },
    abolish () {
      // this.$router.push({
      //   name: 'wechat-reply-keyword-reply'
      // })
      this.$router.go(-1);
    },
    open (title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-row,
.el-col {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.mar_sty {
  margin-top: 10px !important;
}
.icon_sty {
  font-size: 30px;
  cursor: pointer;
  margin: 0 10px 0 10px;
  color: #696969;
}
</style>

