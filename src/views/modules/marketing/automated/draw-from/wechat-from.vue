<template>
  <div>
    <el-form
      ref="form"
      :model="dataForm"
      style="margin-bottom:15px"
      label-position="top"
      label-width="110px"
    >
    
      <el-form-item label="推送微信消息">
        <div
          v-for="(item,index) in ReplyList"
          :key="index"
        >
          <Reply
            :function-list="['文本','图片','图文','小程序']"
            :item-id="item.id"
            :show-data="item.showData"
            @getObj="getValue"
          />
        </div>
      </el-form-item>
      <el-form-item label="延时">
        <el-radio-group v-model="dataForm.time">
          <el-radio label="1">立即发送</el-radio>
          <el-radio label="2">等待时间</el-radio>
        </el-radio-group>
        <div  v-if="dataForm.time == 2">
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
            <el-select size="small"  clearable v-model="dataForm.minute" placeholder="选择分钟">
              <el-option :label="num" :value="num" v-for="(num,index) in  59" :key="index">{{num}}</el-option>
            </el-select>
          </el-col>
          <el-col :offset="1" :span="5">
            <el-select size="small"  clearable v-model="dataForm.second" placeholder="选择秒">
              <el-option v-if="num > 9" :label="num" :value="num" v-for="(num,index) in  59" :key="index">{{num}}</el-option>
            </el-select>
          </el-col>
        </el-row>
         </div>
      </el-form-item>


      <el-form-item style="margin-top:30px;">
        <el-button
          size="small"
          type="primary"
          :disabled="action == 'look'"
          @click="onSubmit"
        >确定</el-button>
        <el-button
          size="small"
          :disabled="action == 'look'"
          @click="clear"
        >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Reply from '@/components/reply'
export default {
  name: 'WechatFrom',
  components: { Reply },
  props: {
    showData: {
      type: Object,
      default: null
    },
    action: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      dataForm: {
        name: null,
        time:'1',
        day:null,
        hour:null,
        minute:null,
        second:null
      },
      ReplyList: [
        {
          id: 1,
          getVal: {},
          showData: {}
        }
      ],
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
    }
  },
  computed: {},
  created() {
    if (this.showData) {
      // 回显数据
      this.ReplyList = []
      this.ReplyList.push({
        id: 1,
        getVal: {},
        showData: this.showData.operationItems[ 0 ]
      })
      //回显时间
      if(this.showData.runAt){
         let timeArray = this.setTime(this.showData.runAt).split("-");
         if(timeArray[0] * 1 > 0){
            this.dataForm.day = timeArray[0] * 1
         }
         if(timeArray[0] * 1 > 0){
            this.dataForm.hour = timeArray[1] * 1
         }
         if(timeArray[0] * 1 > 0){
            this.dataForm.minute = timeArray[2] * 1
         }
          if(timeArray[0] * 1 > 0){
            this.dataForm.second = timeArray[3] * 1
         }

      }
      this.operation = {...this.showData}
    }
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    setTime(s){
      this.dataForm.time = '2';
      var day = Math.floor( s/ (24*3600) ); // Math.floor()向下取整 
      var hour = Math.floor( (s - day*24*3600) / 3600); 
      var minute = Math.floor( (s - day*24*3600 - hour*3600) /60 ); 
      var second = s - day*24*3600 - hour*3600 - minute*60; 
      return day + '-'  + hour + "-" + minute + "-" + second; 
    },
    getValue(val) {
      // 操作类型:1微信回复文本消息,2微信回复图片消息,3微信回复视频消息,4微信回复语音消息,5微信回复外链图文消息,6微信回复图文消息,7微信回复音乐消息,8微信回复卡券消息,9微信回复小程序消息,10分配标签,11微信回复模板消息,12赠送积分,13发送短信,14发放卡券

      if (val.action == '文本') {
        this.operation.operationItems[ 0 ].type = 1
        this.operation.operationItems[ 0 ].value = [{
          text: val.info
        }]
      } else if (val.action == '图片') {
        this.operation.operationItems[ 0 ].type = 2
        this.operation.operationItems[ 0 ].value = [{
          id: val.id,
          localUrl: val.localUrl
        }]
      } else if (val.action == '图文') {
        if (val.number == 1) {
          this.operation.operationItems[ 0 ].type = 6
        } else {
          // 你上传高级图文的时候 == 5
          this.operation.operationItems[ 0 ].type = 5
        }

        this.operation.operationItems[0].value=[{
           id:val.id,
           localUrl:val.wechatMaterialNewsItemList[0].localThumbUrl,
           wechatMaterialNewsItemList:val.wechatMaterialNewsItemList
        }];

      } else if (val.action == "小程序") {
        this.operation.operationItems[0].type = 9;
         this.operation.operationItems[0].value=[{
           title:val.title,
           appId:val.appId,
           pagePath:val.url,
           id:val.imgObj? val.imgObj.id : null,
           localUrl:val.imgUrl,
           miniUrl:val.imgUrl,
           thumbMediaId:val.imgObj ? val.imgObj.mediaId : null
        }];
      }
    },
    onSubmit() {
      if(this.dataForm.time == 1){
         this.dataForm.runAt = null;
      }else{
        let time = 0;
        let status = false;
        if(this.dataForm.day){
           status = true;
           time += this.dataForm.day * 24 * 60 * 60;
        }
        if(this.dataForm.hour){
           status = true;
           time += this.dataForm.hour * 60 * 60;
        }
        if(this.dataForm.minute){
           status = true;
           time += this.dataForm.minute  * 60;
        }
        if(this.dataForm.second){
           status = true;
           time += this.dataForm.second*1;
        }

        if(!status){
           this.$notify({
              title: '警告',
              message: '请选择延迟时间',
              type: 'error'
           });
          return;
        }
         this.operation.runAt = time;
      }
      this.$emit("gteData", this.operation)
    },
    clear() {
      this.onSubmit();
      // this.$emit("claer");
    }
  }
}
</script>
<style lang="scss" scoped>
.title-item {
  width: 100%;
  height: 32px;
  line-height: 32px;
  color: #333333;
}
</style>

