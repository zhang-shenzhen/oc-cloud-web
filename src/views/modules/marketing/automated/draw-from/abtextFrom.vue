<template>
  <div>
    <el-form
      ref="form"
      :model="dataForm"
      style="margin-bottom:15px"
      label-position="top"
      label-width="80px"
    >
      <!-- <el-form-item label="名称">
       <el-input
            :disabled="action == 'look'"
            placeholder="分支名称"
            size="small"
            v-model="dataForm.name"
          ></el-input>
      </el-form-item> -->

    <el-form-item label="">
        <div class="list-box">
           <div  class="left">
             分支
           </div>
           <div  class="right">
             流量配比
           </div>
           <div style="clear:both"></div>
        </div>

         <div v-for="(item,index) in  branchList" :key="index" class="list-box">
           <div  class="left">
             <el-input
                  :disabled="action == 'look'"
                  placeholder="分支名"
                  size="small"
                  v-model="item.label"
                ></el-input>
           </div>
           <div  class="right">
                 <el-input
                  :disabled="action == 'look'"
                  placeholder="流量配比"
                  size="small"
                  v-model="item.value"
                ></el-input>
           </div>
           <div style="clear:both"></div>
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
import { GetTag } from "@/api/wechat/trigger";
export default {
  name: "branchFrom",
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
        name: null
      },
      templateId: null,
      branchList: [
        {
          name:'分支名',
          value:30
        }
      ], //模板数组
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
      this.branchList = [];
      let array = this.showData.abtextData;
      array.map(val => {
        this.branchList.push(val)
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
    onSubmit() {
      let num = 0;
      this.branchList.map(res =>{
         num += res.value * 1;
      })
      if(num != 100){
          this.$notify.error({
              title: "错误",
              message: "流量配比相加之和应等于100"
           });
         return;
      }
      this.$emit("gteData", this.branchList);
    },
    clear() {
      // this.onSubmit();
      this.$emit("claer");
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
.list-box{
  width: 300px;
  height: 32px;
  margin-bottom: 10px;
  .left{
    width: calc(100% - 120px);
    height: 32px;
    float: left;
    line-height: 32px;
  }
  .right{
    width: 100px;
    height: 32px;
    line-height: 32px;
    float: right;
  }
}
</style>

