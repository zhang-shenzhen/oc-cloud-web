<template>
  <div>
    <el-form
      ref="form"
      :model="dataForm"
      style="margin-bottom:15px"
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="打标签">
        <el-select
          v-model="templateId"
          style="width:100%;"
          size="small"
          :disabled="action == 'look'"
          multiple
          filterable
          placeholder="选择标签"
        >
          <el-option
            v-for="(message, index) in templates"
            :key="index"
            :label="message.tagName"
            :value="message.id"
          />
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="延时">
        <el-radio-group v-model="dataForm.time">
          <el-radio label="1">立即发送</el-radio>
          <el-radio label="2">等待时间</el-radio>
        </el-radio-group>

        <el-row>
          <el-col :span="5">
            <el-select v-model="dataForm.day" placeholder="选择天">
              <el-option :label="num" :value="num" v-for="(num,index) in  10" :key="index">{{num}}</el-option>
            </el-select>
          </el-col>
          <el-col :offset="1" :span="5">
            <el-select v-model="dataForm.day" placeholder="选择小时">
              <el-option :label="num" :value="num" v-for="(num,index) in  10" :key="index">{{num}}</el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;">
          <el-col :span="5">
            <el-select v-model="dataForm.day" placeholder="选择天">
              <el-option :label="num" :value="num" v-for="(num,index) in  10" :key="index">{{num}}</el-option>
            </el-select>
          </el-col>
          <el-col :offset="1" :span="5">
            <el-select v-model="dataForm.day" placeholder="选择天">
              <el-option :label="num" :value="num" v-for="(num,index) in  10" :key="index">{{num}}</el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>-->

      <el-form-item style="margin-top:30px;">
        <el-button
          size="small"
          type="primary"
          :disabled="action == 'look'"
          @click="onSubmit"
          >确定</el-button
        >
        <el-button size="small" :disabled="action == 'look'" @click="clear"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { GetTag } from '@/api/wechat/trigger'
import { labelList, tagList } from '@/api/member/member'
export default {
  name: 'TagFrom',
  components: {},
  components: {},
  props: {
    showData: {
      type: Object,
      default: null,
    },
    action: {
      type: String,
      default: 'add',
    },
  },
  data() {
    return {
      dataForm: {
        name: null,
      },
      templateId: null,
      templates: [], // 模板数组
      operation: {
        mode: 2, // 1(随机运行), 2(全部运行)
        runAt: null, // 指定时间运行
        operationItems: [
          {
            type: null,
            value: [],
          },
        ] /** 里面的参数在 this.operationItems 里放置*/,
        extraOperation: null, // 額外操作，添加標籤
      },
    }
  },
  computed: {},
  created() {
    if (this.showData) {
      console.log(this.showData)
      // 回显数据
      this.templateId = []
      const array = this.showData.operationItems[0].value
      array.map((val) => {
        this.templateId.push(val.id)
      })
      this.operation.operationItems[0].value = this.showData.operationItems[0].value
    }
    this.getMessageList()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getMessageList() {
      tagList({ type: 1 }).then((res) => {
        this.templates = res.data
        console.log('this.templates', this.templates)
      })
    },
    getValue() {
      // 操作类型:1微信回复文本消息,2微信回复图片消息,3微信回复视频消息,4微信回复语音消息,5微信回复外链图文消息,6微信回复图文消息,7微信回复音乐消息,8微信回复卡券消息,9微信回复小程序消息,10分配标签,11微信回复模板消息,12赠送积分,13发送短信,14发放卡券
    },
    onSubmit() {
      // console.log(this.templateId)
      this.operation.operationItems[0].type = 16
      this.operation.operationItems[0].value = []
      if (this.templateId) {
        this.templateId.map((val) => {
          this.operation.operationItems[0].value.push({ id: val })
        })

        const tag = []
        this.templates.map((item) => {
          this.templateId.map((val) => {
            if (item.id == val) {
              tag.push(item.tagName)
            }
          })
        })

        this.operation.showEleText = tag
      }
      this.$emit('gteData', this.operation)
    },
    clear() {
      // this.onSubmit();
      this.$emit('claer')
    },
  },
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
