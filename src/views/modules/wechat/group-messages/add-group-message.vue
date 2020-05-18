<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('wechat.groupMessages.newsGroupMessage') }}</h3>
    <el-form ref="ruleForm"
             :label-position="labelPosition"
             :model="ruleForm"
             :rules="rules"
             size="mini"
             label-width="190px"
             class="demo-ruleForm">
      <el-form-item label="选择发送对1象："
                    prop="tagtype">
        <el-radio-group v-model="ruleForm.tagtype"
                        @change="choiceRadio">
          <el-radio label="1">全部粉丝</el-radio>
          <el-radio label="2">按条件筛选</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.tagtype == 2"
                    label="添加标签:"
                    prop="tagId">
        <el-col :span="8">
          <el-select v-model="ruleForm.tagId"
                     size="mini"
                     clearable
                     filterable
                     placeholder="请选择/可搜索">
            <el-option v-for="item in option"
                       :key="item.tagId"
                       :label="item.name"
                       :value="item.tagId" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="发送内容:"
                    prop="ReplyList">
        <el-col :span="15">
          <div v-for="(item,index) in ReplyList"
               :key="index">
            <Reply :function-list="['图文']"
                   :item-id="item.id"
                   :photoShow="photoShow"
                   :show-data="item.showData"
                   @getObj="getValue" />
          </div>
          <p>全部粉丝,同一图文一天最多发送1次;按条件筛选，同一标签一天最多发送1次</p>
          <p>每个粉丝一个月最多收到4次推送</p>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">立即发送</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import Reply from "@/components/reply";
import { SaveMessage, SendMessage, TagList } from "@/api/wechat/groupMessage";
import { surbanajurong_SaveMessage, surbanajurong_SendMessage, surbanajurong_TagList } from "@/api/surbanajurong/wechat/material";

export default {
  name: "AddGroupMessage",
  components: { Reply },
  data () {
    return {
      API: {},
      option: [],
      photoShow: 2,
      labelPosition: "left",
      groupMessage: {
        tag_id: null,
        msg_info: "",
        msg_type: "mpnews",
        from_flag: 0,
        is_to_all: false
      },
      ruleForm: {
        tagtype: "",
        tagId: ""
      },

      rules: {
        tagtype: [
          { required: true, message: "请选择发送对象", trigger: "change" }
        ]
      },
      ReplyList: [
        {
          id: 1,
          getVal: {},
          showData: {}
        }
      ]
    };
  },
  computed: {},
  created () {
    if (this.$route.query.projectName == "product") {
      this.API = {
        SaveMessage: SaveMessage,
        SendMessage: SendMessage,
        TagList: TagList
      };
    } else if (this.$route.query.projectName == "surbanajurong") {
      this.API = {
        SaveMessage: surbanajurong_SaveMessage,
        SendMessage: surbanajurong_SendMessage,
        TagList: surbanajurong_TagList
      };
    }
    this.tableList();
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    tableList () {
      //   标签接口
      this.API.TagList({}).then(res => {
        if (res.code == 0) {
          console.log("标签", res);
          this.option = res.data;
        }
      });
    },
    choiceRadio () {
      if (this.ruleForm.tagtype != 2) {
        this.ruleForm.tagId = null;
        this.$set(this.rules, "tagId", null);
      } else {
        this.$set(this.rules, "tagId", [
          { required: true, message: "请选择发送对象", trigger: "blur" }
        ]);
      }
    },
    getValue (e) {
      console.log(e, '上传图文')
      this.ReplyList[0].getVal = e;
    },
    submitForm (formName) {
      // 点击验证
      if (this.$isNull(this.ReplyList[0].getVal.id)) {
        this.open("警告", "请填写发送内容", "warning");
        return;
      }
      this.groupMessage.msg_info = this.ReplyList[0].getVal.id;
      if (this.ruleForm.tagtype == "1") {
        this.groupMessage.is_to_all = true;
      } else {
        this.groupMessage.is_to_all = false;
      }
      this.groupMessage.tag_id = this.ruleForm.tagId;
      this.groupMessage.msg_type = "mpnews";
      console.log("formName", this.groupMessage);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateBatch(this.groupMessage);
        } else {
          return false;
        }
      });
    },

    updateBatch (obj) {
      // 点击保存
      this.API.SaveMessage(obj).then(res => {
        if (res.code == 0) {
          console.log("点击保存", res);
          this.open("成功", "保存成功", "success");
          // this.$router.push({
          //   name: "wechat-groupMessages-groupPage"
          // });
          this.$router.go(-1)
        }
      });
    },
    resetForm (formName) {
      if (this.$isNull(this.ReplyList[0].getVal.id)) {
        this.open("警告", "请填写发送内容", "warning");
        return;
      }
      this.groupMessage.msg_info = this.ReplyList[0].getVal.id;
      if (this.ruleForm.tagtype == "1") {
        this.groupMessage.is_to_all = true;
      } else {
        this.groupMessage.is_to_all = false;
      }
      this.groupMessage.tag_id = this.ruleForm.tagId;
      this.groupMessage.msg_type = "mpnews";
      console.log("formName", this.groupMessage);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.clickSend(this.groupMessage);
        } else {
          return false;
        }
      });
    },
    clickSend (obj) {
      // 点击发送
      this.API.SendMessage(obj).then(res => {
        if (res.code == 0) {
          this.open("成功", "保存成功", "success");
          // this.$router.push({
          //   name: "wechat-groupMessages-groupPage"
          // });
          this.$router.go(-1)
        }
      });
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
.radio_sty {
  margin: 20px;
}
</style>
