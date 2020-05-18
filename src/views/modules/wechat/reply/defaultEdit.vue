<template>
  <d2-container class="page">
    <h3>{{ replyObj.replyName }}</h3>
    <el-form
      ref="param"
      :model="param"
      :rules="rules"
      label-position="left"
      size="mini"
      label-width="140px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-col :span="10">
          <el-input v-model="param.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="备注">
        <el-col :span="10">
          <el-input v-model="param.description" />
        </el-col>
      </el-form-item>
      <el-form-item label>
        <el-col :span="10">
          <div v-for="(item,index) in ReplyList" :key="index">
            <Reply
              :function-list="['文本','图片','图文','小程序']"
              :item-id="item.id"
              :show-data="item.showData"
              @getObj="getValue"
            />
          </div>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('param')">确认</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import Reply from '@/components/reply'
import { DetailsMessage, ReplyUpdate } from '@/api/wechat/reply'
export default {
  name: 'DefaultEdit',
  components: { Reply },
  data() {
    return {
      replyObj: {
        replyName: '',
        createType: '',
        replyId: ''
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      ReplyList: [],
      param: {
        name: '', // 默认回复描述
        description: '', // 备注
        type: 5, // 触发器类型 1 2
        operation: {
          mode: 2, // 1(随机运行), 2(全部运行)
          runAt: null, // 指定时间运行
          operationItems: [] /** 里面的参数在 this.operationItems 里放置*/,
          extraOperation: null // 額外操作，添加標籤
        },
        event: {
          type: 0, // 事件类型: 0(默认回复)) 1(微信关注), 2(微信扫码), 3(微信点菜单), 4(微信消息)
          data: [{ mode: 1, value: '' }] /** 这里面装的是关键字的参数(猜测) */
        },
        filterId: null,
        enabled: true, // 是否立即启用
        enableAt: null, // 如果不是立即启用需要配置这个字段, 传入启用时间就行
        trigger: '0',
        addtag: false
      },
      //  回復內容
      operationItems: [
        {
          type: 1 /** 文本1，图片2，图文6，小程序9 */,
          value: [
            {
              id: '',
              localUrl: '',
              text: '',
              wechatMaterialNewsItemList: [],
              appId: '',
              title: '',
              pagePath: '',
              thumbMediaId: '',
              miniUrl: ''
            }
          ]
        }
      ]
    }
  },
  computed: {},
  created() {
    console.log(this.$route.query)
    this.replyObj.replyId = this.$route.query.id
    this.replyObj.createType = this.$route.query.title
    if (this.replyObj.replyId == 1) {
      this.replyObj.replyName = '编辑默认回复'
    } else {
      this.replyObj.replyName = '编辑关注后回复'
    }
    this.detailsMessageInterface(this.replyObj.replyId)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    empty() {
      // 置空
      this.operationItems = [
        {
          type: 1 /** 文本1，图片2，图文6，小程序9 */,
          value: [
            {
              id: '',
              localUrl: '',
              text: '',
              wechatMaterialNewsItemList: [],
              appId: '',
              title: '',
              pagePath: '',
              thumbMediaId: '',
              miniUrl: ''
            }
          ]
        }
      ]
    },

    detailsMessageInterface(id) {
      // 回显
      DetailsMessage({}, id).then(res => {
        if (res.code == 0) {
          console.log('回显', res)
          this.param = res.data
          this.echoData(this.param.operation.operationItems)
        }
      })
    },

    echoData(array) {
      this.ReplyList = []
      array.map((val, index) => {
        const option = {
          id: index + 1,
          getVal: {},
          showData: val
        }
        this.ReplyList.push(option)
        console.log(this.ReplyList)
      })
    },

    getValue(e) {
      this.ReplyList[0].getVal = e
    },
    judgeSelection() {
      // 判断选择
      this.empty()
      if (this.ReplyList[0].getVal.action == '文本') {
        this.operationItems[0].type = 1
        this.operationItems[0].value[0].text = this.ReplyList[0].getVal.info
      } else if (this.ReplyList[0].getVal.action == '图片') {
        this.operationItems[0].type = 2
        this.operationItems[0].value[0].id = this.ReplyList[0].getVal.id
        this.operationItems[0].value[0].localUrl = this.ReplyList[0].getVal.localUrl
      } else if (this.ReplyList[0].getVal.action == '图文') {
        if (this.ReplyList[0].getVal.number == 1) {
          this.operationItems[0].type = 6
        } else {
          // 你上传高级图文的时候 == 5
          this.operationItems[0].type = 5
        }
        this.operationItems[0].value[0].id = this.ReplyList[0].getVal.id
        this.operationItems[0].value[0].localUrl = this.ReplyList[0].getVal.wechatMaterialNewsItemList[0].localThumbUrl
        this.operationItems[0].value[0].wechatMaterialNewsItemList = this.ReplyList[0].getVal.wechatMaterialNewsItemList
      } else if (this.ReplyList[0].getVal.action == '小程序') {
        this.operationItems[0].type = 9
        this.operationItems[0].value[0].title = this.ReplyList[0].getVal.title
        this.operationItems[0].value[0].appId = this.ReplyList[0].getVal.appId
        this.operationItems[0].value[0].pagePath = this.ReplyList[0].getVal.url
        this.operationItems[0].value[0].id = this.ReplyList[0].getVal.imgObj.id
        this.operationItems[0].value[0].localUrl = this.ReplyList[0].getVal.imgUrl
        this.operationItems[0].value[0].miniUrl = this.ReplyList[0].getVal.imgUrl
        this.operationItems[0].value[0].thumbMediaId = this.ReplyList[0].getVal.imgObj.mediaId
      }
      console.log(' this.operationItems', this.operationItems, this.ReplyList)
    },

    submitForm(formName) {
      this.judgeSelection()
      if (this.replyObj.createType == 1) {
        this.param.event.type = 0
      } else {
        this.param.event.type = 1
      }
      this.param.operation.operationItems = this.operationItems
      console.log(this.param.event.type)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 满足进入的
          this.replyUpdateInterface(this.param)
        } else {
          // 不满足进入的
          console.log('error submit!!')
          return false
        }
      })
    },
    replyUpdateInterface(obj) {
      // 编辑接口
      console.log(obj)
      ReplyUpdate(obj).then(res => {
        if (res.code == 0) {
          this.open('成功', '编辑成功', 'success')
          console.log('编辑接口', res)
          this.cancel()
        }
      })
    },
    cancel() {
      // let name
      // if (this.replyObj.createType == 1) {
      //   name = 'wechat-reply-default-reply'
      // } else {
      //   name = 'wechat-reply-foucus-reply'
      // }
      // this.$router.push({
      //   name: name
      // })
       this.$router.go(-1)
    },
    open(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
</style>

