<template>
  <d2-container class="page">
    <el-row>
      <el-col :span="24">
        <h3>{{ replyName }}</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18"
              :offset="2">
        <el-col :span="4"
                class="mar_sty">{{ $t('wechat.reply.default') }}:</el-col>
        <el-col :span="18">
          <el-input v-model="param.name"
                    size="mini"
                    :placeholder="$t('wechat.reply.content')"
                    clearable />
        </el-col>
      </el-col>
      <el-col :span="18"
              :offset="2">
        <el-col :span="4"
                class="mar_sty">{{ $t('wechat.reply.remarks') }}:</el-col>
        <el-col :span="18">
          <el-input v-model="param.description"
                    :placeholder="$t('wechat.reply.content')"
                    clearable
                    size="mini" />
        </el-col>
      </el-col>
      <el-col :span="18"
              :offset="2">
        <div v-for="(item,index) in ReplyList"
             :key="index">
          <Reply :function-list="['文本','图片','图文','小程序']"
                 :item-id="item.id"
                 @getObj="getValue" />
        </div>
      </el-col>
      <el-col :span="18"
              :offset="2">
        <el-button size="mini"
                   type="primary"
                   @click="save()">{{ $t('confirm') }}</el-button>
        <el-button size="mini"
                   @click="cancel()">{{ $t('cancel') }}</el-button>
      </el-col>
    </el-row>
  </d2-container>
</template>
<script>
import Reply from '@/components/reply'
import { DefaultReply, FocusReply } from '@/api/wechat/reply'
import { surbanajurong_DefaultReply, surbanajurong_FocusReply } from "@/api/surbanajurong/wechat/reply"
export default {
  name: 'Default',
  components: { Reply },
  data () {
    return {
      API: {},
      replyName: '',
      description: '',
      replyList: {},
      ReplyList: [
        {
          id: 1,
          getVal: {}
        }
      ],
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
  created () {
    if (this.$route.query.projectName == "product") {
      this.API = {
        DefaultReply: DefaultReply,
        FocusReply: FocusReply
      };
    } else if (this.$route.query.projectName == "surbanajurong") {
      this.API = {
        DefaultReply: surbanajurong_DefaultReply,
        FocusReply: surbanajurong_FocusReply
      };
    }

    this.replyList = this.$route.query
    if (this.replyList.id == 1) {
      // 默认回复的
      this.replyName = this.$t('wechat.reply.establish')
    } else {
      this.replyName = '创建关注后回复'
    }
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    empty () {
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
    // 置空
    getValue (e) {
      // 渠道二维码/回复设置/群发消息/回复方式
      this.empty()
      this.ReplyList.getVal = e
      console.log(123, e, e.action, this.ReplyList)
      if (e.action == '文本') {
        this.operationItems[0].type = 1
        this.operationItems[0].value[0].text = e.info
      } else if (e.action == '图片') {
        this.operationItems[0].type = 2
        this.operationItems[0].value[0].id = e.id
        this.operationItems[0].value[0].localUrl = e.localUrl
        this.operationItems[0].value[0].wechatMaterialNewsItemList = []
      } else if (e.action == '图文') {
        this.operationItems[0].value[0].id = e.id
        if (e.number == 1) {
          this.operationItems[0].type = 6
          this.operationItems[0].value[0].wechatMaterialNewsItemList = e.wechatMaterialNewsItemList
          this.operationItems[0].value[0].localUrl = e.wechatMaterialNewsItemList[0].localThumbUrl
        } else {
          // 你上传高级图文的时候 == 5
          this.operationItems[0].type = 5
          this.operationItems[0].value[0].wechatMaterialNewsItemList = e.advancedNewsItemList
          this.operationItems[0].value[0].localUrl = e.advancedNewsItemList[0].picUrl
        }
      } else if (e.action == '小程序') {
        this.operationItems[0].type = 9
        this.operationItems[0].value[0].title = e.title
        this.operationItems[0].value[0].appId = e.appId
        this.operationItems[0].value[0].pagePath = e.url
        this.operationItems[0].value[0].id = e.imgObj.id
        this.operationItems[0].value[0].localUrl = e.imgUrl
        this.operationItems[0].value[0].miniUrl = e.imgUrl
        this.operationItems[0].value[0].thumbMediaId = e.imgObj.mediaId
        this.operationItems[0].value[0].wechatMaterialNewsItemList = []
      }
      console.log(this.operationItems[0].type)
    },
    save () {
      // 点击确认按钮
      if (!this.param.name) {
        this.open('警告', '回复描述不能为空', 'warning')
        return
      }
      this.param.operation.operationItems = this.operationItems
      console.log(this.param, this.operationItems)
      if (this.replyList.id == 1) {
        this.defaultReplyInterface(this.param)
      } else {
        this.param.event.type = 1
        this.focusReplyInterface(this.param)
      }
    },
    defaultReplyInterface (obj) {
      this.API.DefaultReply(obj).then(res => {
        if (res.code == 0) {
          this.open('成功', '创建成功', 'success')
          console.log('创建默认回复', res)
          this.skip()
        }
      })
    },
    focusReplyInterface (obj) {
      this.API.FocusReply(obj).then(res => {
        if (res.code == 0) {
          this.open('成功', '创建成功', 'success')
          console.log('创建默认回复', res)
          this.skip()
        }
      })
    },
    cancel () {
      // 点击返回
      this.skip()
    },
    skip () {
      // 跳转
      // let name = ''
      // if (this.replyList.id == 1) {
      //   name = 'wechat-reply-default-reply'
      // } else {
      //   name = 'wechat-reply-foucus-reply'
      // }
      // this.$router.push({
      //   name: name
      // })

      this.$router.go(-1)
    },

    open (title, message, type) {
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
.el-row,
.el-col {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.mar_sty {
  margin-top: 10px;
}
</style>
