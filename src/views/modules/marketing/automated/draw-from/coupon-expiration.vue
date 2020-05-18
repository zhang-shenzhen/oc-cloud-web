<template>
  <div>
    <el-form
      ref="form"
      :model="dataForm"
      style="margin-bottom:15px"
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="选择卡券">
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
        <el-radio-group
          @change="dataFormchange"
          :disabled="action == 'look'"
          size="small"
          v-model="dataForm.time"
        >
          <el-radio :label="1">当天提醒</el-radio>
          <el-radio :label="2">提前提醒</el-radio>
        </el-radio-group>
        <div v-if="dataForm.time == 2">
          <el-row>
            <el-col :span="5">
              <el-input
                :disabled="action == 'look'"
                placeholder="请填写天"
                size="small"
                type="number"
                :min="1"
                v-model="days"
              ></el-input>
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
        time: 1,
        days: null
      },
      templateId: null,
      days: 0,
      templates: [], //模板数组
    };
  },
  computed: {},
  created() {
    if (this.showData) {
      //回显数据
      this.templateId = this.showData.couponId
      this.days = this.showData.days * 1
      if(this.days == 0){
         this.dataForm.time = 1
      }else{
         this.dataForm.time = 2
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
        page: 1,
        size: 10000
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
    dataFormchange(e) {
      if (this.dataForm.time == 1) {
         this.days = 0;
      } else {
        this.days = null;
      }
      console.log( this.days)
    },
    onSubmit() {
      if (!this.templateId) {
        this.$notify({
          title: "警告",
          message: "请选择卡券",
          type: "error"
        });
        return;
      }
      if (this.days == null || this.days == '') {
        this.$notify({
          title: "警告",
          message: "请设置提前天数",
          type: "error"
        });
        return;
      }

      let obj = {
        couponId: this.templateId,
        days: this.days,
        cycleType:1
      };

      this.$emit("gteData", obj);
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

