<template>
  <d2-container class="page">
    <h3 class="list-title">{{ type == 'add' ? '添加' : '编辑' }}模板</h3>

    <el-form ref="ruleForm"
             :model="Form"
             :rules="rules"
             label-position="left"
             label-width="100px">
      <el-form-item label="所选模板">
        <el-row>
          <el-col :span="10">
            <span style="color:#666;">{{ template.templateName }}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="标题"
                    prop="title">
        <el-row>
          <el-col :span="10">
            <el-input v-model="Form.title"
                      placeholder="请输入模板标题" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="内容"
                    prop="value">
        <el-row>
          <el-col :span="10">
            <el-input v-model="Form.value"
                      placeholder="请输入模板内容" />
          </el-col>
          <el-col style="margin-left:15px;"
                  :span="5">
            <el-color-picker v-model="colorValue" />
          </el-col>
        </el-row>
      </el-form-item>

      <!-- <el-form-item v-for="(val,index) in content"
                    v-if="index > 0"
                    :key="index"
                    :label="val.key">
        <el-row>
          <el-col :span="10">
            <el-input v-model="val.label"
                      :placeholder="'请输入'+ val.key" />
          </el-col>
          <el-col style="margin-left:15px;"
                  :span="5">
            <el-color-picker v-model="val.color" />
          </el-col>
        </el-row>
      </el-form-item> -->
      <el-form-item>
        <el-form-item v-for="(val,index) in content"
                      v-if="index > 0"
                      :key="index"
                      :label="val.key">
          <el-row>
            <el-col :span="10">
              <el-input v-model="val.value"
                        :placeholder="'请输入'+ val.key"></el-input>
            </el-col>
            <el-col style="margin-left:15px; display:flex;"
                    :span="5">
              <el-color-picker v-model="val.color" />
              <el-popover placement="right"
                          width="200"
                          trigger="hover">
                <div v-for="(item,ind) in popoverData"
                     :key="ind">
                  <div class="popover-title">{{item.flieldType}}</div>
                  <div class="popover-centent"
                       v-for="(initem,i) in item.children"
                       :key="i">
                    <p @click="flieldName(initem,index)"> {{initem.name}}</p>
                  </div>
                </div>
                <el-button style="margin-left:10px"
                           slot="reference"
                           type="text">+插入参数</el-button>
              </el-popover>
            </el-col>
            <el-col :span="5">

            </el-col>
          </el-row>
        </el-form-item>
      </el-form-item>

      <el-form-item label="跳转链接">
        <el-row>
          <el-col :span="10">
            <el-input v-model="Form.url"
                      placeholder="请输入跳转链接" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="备注">
        <el-row>
          <el-col :span="10">
            <el-input v-model="Form.description"
                      type="textarea"
                      placeholder="请输入备注"
                      :autosize="{ minRows: 4, maxRows: 6}" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item style="margin-top:30px;">
        <el-button size="mini"
                   type="primary"
                   @click="onSubmit('ruleForm')">保存到模板消息</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>

import { templatesDetails, Addmessages, addtemplatesDetails, Updatetemplate, templateParameter } from '@/api/wechat/templateMessage'

export default {
  name: 'WechatTemplateMessageAddTemplateMessage',
  components: {},
  data () {
    return {
      type: null,
      colorobj: {},
      aaaa: '',
      sendValueObj: {},
      template: {},
      Form: {
        title: null,
        value: null,
        url: null,
        description: null
      },
      content: [],
      popoverData: [],
      rules: {
        title: [
          { required: true, message: '请输入模板标题', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请输入模板内容', trigger: 'blur' }
        ]
      },
      colorValue: null
    }
  },
  computed: {},
  created () {
    this.type = this.$route.query.type
    if (this.type == 'update') {
      this.getUpdateDetails()
    } else {
      this.getDetails()
    }
    this.templateParameterDetails();
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    change () {
      this.$forceUpdate()
    },
    // 弹框模板参数
    templateParameterDetails () {
      templateParameter().then(res => {
        console.log(res, '参数参数')
        if (res.code == 0) {
          let data = {};
          res.data.data.map(item => {
            item.children = []
            item.children.push({
              id: item.id,
              name: item.name,
              field: item.field,
              flieldType: item.flieldType,
            })
          })
          // this.popoverData = res.data.data;
          this.parameterData(res.data.data);
          console.log(res.data.data)
        }
      })
    },
    parameterData (data) {
      console.log(data, 'data-------')
      let items = [];
      let datelist = {};
      for (let i = 0; i < data.length; i++) {
        let element = data[i];
        if (!datelist[element.flieldType]) {
          items.push(element)
          datelist[element.flieldType] = element;
        } else {
          for (let j = 0; j < items.length; j++) {
            let subment = items[j];
            if (subment.flieldType == element.flieldType) {
              subment.children.push(element)
            }
          }
        }
      }
      this.popoverData = items;
    },
    flieldName (item, index) {
      // 点击选择某一个
      let reg = /^.*[\,，].*$/; // 判断是否有逗号
      let val = JSON.parse(JSON.stringify(this.content[index].value))
      if (reg.test(val)) {
        this.content[index].value = val.split(",")[0] + ',{' + item.field + '}'
      } else {
        this.content[index].value = val + ',{' + item.field + '}';
      }
      // this.content[index].value = '{' + item.field + '}'; // 要保留客户输入的字段并且把选择插入的字段带到后面去
      this.content[index].configParam = item.field; // 这个是你带过去给后台的字段
      console.log(this.content[index].label, this.content[index].value, this.content, item, '点击选择之后')
    },

    getDetails () { // 新增的时候调的接口
      templatesDetails({
        id: this.$route.query.id
      }).then(res => {
        if (res.code == 0) {
          this.template = res.data
          res.data.content.map((val, index) => {
            val.id = index + 1;
            val.label = val.value
          })
          this.content = res.data.content
          console.log(this.content, ' this.content===this.content')
        }
      })
    },
    getUpdateDetails () { // 编辑的时候调的接口
      addtemplatesDetails({
        id: this.$route.query.id
      }).then(res => {
        if (res.code == 0) {
          this.template = res.data
          this.template.templateName = res.data.templateName;
          this.template.title = res.data.title;
          this.Form.title = res.data.title
          this.Form.url = res.data.url
          this.Form.description = res.data.description
          res.data.data.map((val, index) => {
            if (val.key == '{{first.DATA}}') {
              this.Form.value = val.value
              this.colorValue = val.color
            }
            const option = {
              id: index + 1,
              key: val.name,
              value: val.value,
              label: val.key,
              color: val.color,
              configParam: val.configParam,
            }
            // this.colorobj[option.id] = val.color
            // this.sendValueObj[option.id] = val.value
            this.content.push(option)
          })

          console.log(this.template, this.content, this.Form, 'this.template======this.template')
        }
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const sendData = {
            contentValue: []
          }
          sendData.title = this.Form.title
          sendData.templateId = this.$route.query.id
          this.content.map(val => {
            let option = {};
            if (val.value == "{{first.DATA}}") {
              // this.sendValueObj[val.id] = this.Form.value
              // this.colorobj[val.id] = this.colorValue
              option = {
                key: val.value,
                value: this.Form.value,
                color: this.colorValue,
              }
              sendData.contentValue.push(option)
            }
            if (!this.$isNull(val.id) && val.value != "{{first.DATA}}") {
              option = {
                key: val.label,
                value: val.value,
                color: val.color ? val.color : null,
                configParam: val.configParam ? val.configParam : null,
              }
              sendData.contentValue.push(option)
            }
          })

          sendData.url = this.Form.url
          sendData.description = this.Form.description
          console.log(sendData, this.content, 'sendDatasendData')
          // return;
          if (this.type == 'add') {
            // 添加
            Addmessages(sendData).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: '成功',
                  message: '添加模板成功',
                  type: 'success'
                })
                this.$router.push({
                  name: 'wechat-template-message-list'
                })
              }
            })
          } else {
            // /编辑
            Updatetemplate(this.$route.query.id, sendData).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: '成功',
                  message: '编辑模板成功',
                  type: 'success'
                })
                this.$router.push({
                  name: 'wechat-template-message-list'
                })
              }
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '有必填字段未填写'
          })
          return false
        }
      })
    },
    changeColor () {
      console.log(this.colorobj)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
.popover-title {
  color: #dcdfe6 !important;
  margin-bottom: 10px;
}
.popover-centent {
  cursor: pointer;
}
.popover-centent:hover {
  background-color: rgb(130, 188, 245);
  color: #fff;
}
</style>

