<template>
  <div>
    <el-form
      ref="form"
      :model="dataForm"
      style="margin-bottom:15px"
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="发卡券">
        <el-select
          :disabled="action == 'look'"
          style="width:100%;max-width:570px;"
          v-model="templateId"
          placeholder="选择卡券"
          size="small"
        >
          <el-option
            v-for="(message,index) in templates"
            :key="index"
            :label="message.title"
            :value="message.id"
          ></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="延时">
        <el-radio-group size="small" v-model="dataForm.time">
          <el-radio label="1">立即发送</el-radio>
          <el-radio label="2">等待时间</el-radio>
        </el-radio-group>
        <div v-if="dataForm.time == 2">
          <el-row>
            <el-col :span="5">
              <el-select size="small" clearable v-model="dataForm.day" placeholder="选择天">
                <el-option :label="num" :value="num" v-for="(num,index) in  10" :key="index">{{num}}</el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="5">
              <el-select size="small" clearable v-model="dataForm.hour" placeholder="选择小时">
                <el-option :label="num" :value="num" v-for="(num,index) in  23" :key="index">{{num}}</el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="5">
              <el-select size="small" clearable v-model="dataForm.minute" placeholder="选择分钟">
                <el-option :label="num" :value="num" v-for="(num,index) in  59" :key="index">{{num}}</el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="5">
              <el-select size="small" clearable v-model="dataForm.second" placeholder="选择秒">
                <el-option
                  v-if="num > 9"
                  :label="num"
                  :value="num"
                  v-for="(num,index) in  59"
                  :key="index"
                >{{num}}</el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </el-form-item>

      <el-form-item style="margin-top:30px;">
        <el-button size="small" type="primary" :disabled="action == 'look'" @click="onSubmit">确定</el-button>
        <el-button size="small" :disabled="action == 'look'" @click="clear">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { couponList } from "@/api/wechat/trigger";
export default {
  name: "templateFrom",
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
      dataForm: {
        name: null,
        time: "1",
        day: null,
        hour: null,
        minute: null,
        second: null
      },
      templateId: null,
      templates: [], //模板数组
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
      }
    };
  },
  computed: {},
  created() {
    if (this.showData) {
      //回显数据
      this.operation.operationItems[0].value = [
        {
          id: this.showData.operationItems[0].value[0].id
        }
      ];
      this.templateId = this.showData.operationItems[0].value[0].id;

      //回显时间
      if (this.showData.runAt) {
        let timeArray = this.setTime(this.showData.runAt).split("-");
        if (timeArray[0] * 1 > 0) {
          this.dataForm.day = timeArray[0] * 1;
        }
        if (timeArray[0] * 1 > 0) {
          this.dataForm.hour = timeArray[1] * 1;
        }
        if (timeArray[0] * 1 > 0) {
          this.dataForm.minute = timeArray[2] * 1;
        }
        if (timeArray[0] * 1 > 0) {
          this.dataForm.second = timeArray[3] * 1;
        }
      }
    }
    this.getMessageList();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    setTime(s) {
      this.dataForm.time = "2";
      var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整
      var hour = Math.floor((s - day * 24 * 3600) / 3600);
      var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
      var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
      return day + "-" + hour + "-" + minute + "-" + second;
    },
    getMessageList() {
      couponList({
        page:1,
        size:10000
      }).then(res => {
        if (res.code == 0) {
          if (res.data) {
            if (res.data.couponList) {
              this.templates = res.data.couponList;
            }
          }
        }
      });
    },
    getValue() {
      // 操作类型:1微信回复文本消息,2微信回复图片消息,3微信回复视频消息,4微信回复语音消息,5微信回复外链图文消息,6微信回复图文消息,7微信回复音乐消息,8微信回复卡券消息,9微信回复小程序消息,10分配标签,11微信回复模板消息,12赠送积分,13发送短信,14发放卡券
    },
    onSubmit() {
      this.operation.operationItems[0].type = 14;
      this.operation.operationItems[0].value = [
        {
          id: this.templateId
        }
      ];

      this.templates.map(val => {
        if (this.templateId == val.id) {
          this.operation.showEleText = val.title;
        }
      });

      if (this.dataForm.time == 1) {
        this.dataForm.runAt = null;
      } else {
        let time = 0;
        let status = false;
        if (this.dataForm.day) {
          status = true;
          time += this.dataForm.day * 24 * 60 * 60;
        }
        if (this.dataForm.hour) {
          status = true;
          time += this.dataForm.hour * 60 * 60;
        }
        if (this.dataForm.minute) {
          status = true;
          time += this.dataForm.minute * 60;
        }
        if (this.dataForm.second) {
          status = true;
          time += this.dataForm.second * 1;
        }

        if (!status) {
          this.$notify({
            title: "警告",
            message: "请选择延迟时间",
            type: "error"
          });
          return;
        }
        this.operation.runAt = time;
      }

      this.$emit("gteData", this.operation);
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
</style>

