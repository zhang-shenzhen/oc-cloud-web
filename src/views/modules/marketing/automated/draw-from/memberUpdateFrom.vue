<template>
  <div>
    <el-form
      ref="form"
      :model="dataForm"
      style="margin-bottom:15px"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="修改会员信息">
       <!-- 会员信息修改 -->
         <el-col  :span="20">
          <el-radio-group
            :disabled="action == 'look'"
            v-model="dataForm.field"
            size="small"
            @change="xuanze"
          >
            <el-radio :label="'sex'">性别</el-radio>
            <el-radio :label="'memberOrNot'">是否为会员</el-radio>
          </el-radio-group>
        </el-col>
        <!-- 性别 -->
         <el-col :span="20" v-if="dataForm.field== 'sex'">
          <el-select
            :disabled="action == 'look'"
            v-model="dataForm.fieldValue"
            style="width:100%"
            size="small"
            clearable
            filterable
            placeholder="请选择"
          >
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
            <el-option label="未知" :value="3" />
          </el-select>
        </el-col>
        <!-- 是否为会员 -->
         <el-col :span="20" v-if="dataForm.field== 'memberOrNot'">
          <el-select
            :disabled="action == 'look'"
            v-model="dataForm.fieldValue"
            style="width:100%"
            size="small"
            clearable
            filterable
            placeholder="请选择"
          >
            <el-option label="是" :value="1" />
            <el-option label="否" :value="2" />
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="延时">
        <el-radio-group size="small" v-model="dataForm.time">
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
        <el-button size="small" type="primary" :disabled="action == 'look'" @click="onSubmit">确定</el-button>
        <el-button size="small" :disabled="action == 'look'"  @click="clear">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Reply from '@/components/reply'
export default {
  name: "wechatFrom",
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
  components: { Reply },
  data() {
    return {
      dataForm: {
        name: null,
        time:'1',
        day:null,
        hour:null,
        minute:null,
        second:null,
        field:null,
        fieldValue:null
      },
      ReplyList: [
        {
          id: 1,
          getVal: {},
          showData: {}
        }
      ],
       operation:{
             mode: 2, // 1(随机运行), 2(全部运行)
             runAt: null, // 指定时间运行
             operationItems: [
               {
                 type:null,
                 value:[]
               }
             ] /** 里面的参数在 this.operationItems 里放置*/,
             extraOperation: null // 額外操作，添加標籤
        }
    };
  },
  computed: {},
  created() {
    if (this.showData) {
      console.log(this.showData)
      //回显数据
       this.operation.operationItems = this.showData.operationItems;
       this.dataForm.field = this.showData.operationItems[0].value[0].field;
       this.dataForm.fieldValue = this.showData.operationItems[0].value[0].value;
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
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    setTime(s){
      this.dataForm.time = '2';
      var day = Math.floor( s/ (24*3600) ); // Math.floor()向下取整 
      var hour = Math.floor( (s - day*24*3600) / 3600); 
      var minute = Math.floor( (s - day*24*3600 - hour*3600) /60 ); 
      var second = s - day*24*3600 - hour*3600 - minute*60; 
      return day + '-'  + hour + "-" + minute + "-" + second; 
    },
    xuanze(){
      this.dataForm.fieldValue = null;
    },
    onSubmit() {
      this.operation.operationItems[0].type = 15;
      this.operation.operationItems[0].value =[{
          field:this.dataForm.field,
          value:this.dataForm.fieldValue
      }];

     if(this.dataForm.field == 'sex'){
        this.operation.showEleText = `性别为:${this.dataForm.fieldValue == 1 ? '男' : this.dataForm.fieldValue == 2 ? "女" : "未知"}`
     }else if(this.dataForm.field == 'memberOrNot'){
       this.operation.showEleText = `是否为会员:${this.dataForm.fieldValue == 1 ? '是' : "否"}`
     }

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

