<template>
  <d2-container class="page">
    <h3 class="list-title">新增触发器</h3>
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <!-- 此页面已不用 -->
    <el-row>
      <el-col :span="2"
              style="margin-top:10px;">名称</el-col>
      <el-col :span="20">
        <el-input v-model="trigger.name"
                  size="mini"
                  placeholder="请输入内容"
                  style="width:50%"
                  clearable />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2"
              style="margin-top:10px;">触发条件</el-col>
      <el-col :span="20">
        <el-select v-model="trigger.event.type"
                   size="mini"
                   style="width:50%"
                   clearable
                   placeholder="请选择"
                   @change="triggerSelect(trigger.event.type)"
                   @clear="emptySelect()">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
      </el-col>
      <!-- 点击菜单 -->
      <el-col v-if="trigger.event.type==3"
              :span="20"
              :offset="2">
        <el-radio-group v-model="trigger.event.data[0].mode"
                        size="mini">
          <el-radio label="11">点击任意菜单</el-radio>
          <el-radio label="1">点击指定菜单</el-radio>
        </el-radio-group>
      </el-col>
      <!-- 点击菜单里面的指定菜单 -->
      <el-col v-if="trigger.event.data[0].mode==1&&trigger.event.type==3"
              :span="20"
              :offset="2">
        <el-select v-model="trigger.event.data[0].value"
                   size="mini"
                   style="width:50%"
                   clearable
                   placeholder="请选择">
          <el-option v-for="item in memuSelect"
                     :key="item.id"
                     :label="item.title"
                     :value="item.id" />
        </el-select>
      </el-col>
      <!-- 关注 -->
      <el-col v-if="trigger.event.type==1"
              :span="20"
              :offset="2">
        <el-radio-group v-model="trigger.event.data[0].mode"
                        size="mini">
          <el-radio label="11">任意关注</el-radio>
          <el-radio label="1">指定二维码关注</el-radio>
        </el-radio-group>
      </el-col>
      <!-- 点击关注里面的指定二维码关注 -->
      <el-col v-if="trigger.event.data[0].mode==1&&trigger.event.type==1"
              :span="20"
              :offset="2">
        <el-select v-model="trigger.event.data[0].value"
                   style="width:50%"
                   size="mini"
                   clearable
                   filterable
                   placeholder="请选择">
          <el-option v-for="item in codeList"
                     :key="item.id"
                     :label="item.title"
                     :value="item.id" />
        </el-select>
      </el-col>
      <!-- 发送消息 -->
      <el-col v-if="trigger.event.type==4"
              :span="20"
              :offset="2">
        <el-radio-group v-model="mode"
                        size="mini"
                        @change="newsLabel()">
          <el-radio label="11">任意消息</el-radio>
          <el-radio label="1">指定消息关键字</el-radio>
        </el-radio-group>
      </el-col>
      <el-col v-if="trigger.event.type==4&&trigger.event.data[0].mode!=11"
              :span="20"
              :offset="2">
        <div v-for="(item,index) in trigger.event.data"
             :key="index"
             style="margin-bottom:20px;">
          <el-input v-model="item.value"
                    size="mini"
                    placeholder="请输入内容"
                    style="width:34%"
                    clearable />
          <el-select v-model="item.mode"
                     size="mini"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in newsSelect"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
        </div>
        <el-button size="mini"
                   type="primary"
                   @click="addKey()">增加关键字</el-button>
      </el-col>
      <!-- 订单状态变更 -->
      <el-col v-if="trigger.event.type==7"
              :span="22">
        <el-col :span="2"
                style="margin:10px 10px 0 0;">订单状态</el-col>
        <el-col :span="20">
          <el-select v-model="trigger.event.data[0].value"
                     style="width:55%"
                     size="mini"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in orderSelect"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-col>
      <!-- 指定时间 -->
      <el-col v-if="trigger.event.type==8"
              :span="20"
              :offset="2">
        <el-radio-group v-model="lstime"
                        size="mini"
                        @change="timesLabel()">
          <el-radio label="1">选择时间</el-radio>
          <el-radio label="2">指定周</el-radio>
          <el-radio label="3">指定月</el-radio>
          <el-radio label="4">指定年</el-radio>
        </el-radio-group>
      </el-col>
      <el-col v-if="trigger.event.type==8 && lstime == 1"
              :span="20"
              :offset="2">
        <span>选择时间:</span>
        <el-date-picker v-model="time.dateTime"
                        size="mini"
                        style="margin:0 20px;"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期" />
        <el-time-select v-model="time.weekTime"
                        size="mini"
                        :picker-options="{start: '00:00', step: '00:10',end: '23:59'}"
                        placeholder="选择时间" />
        <!-- <el-date-picker v-model="time.dateTime" type="datetime" placeholder="选择日期时间"></el-date-picker> -->
      </el-col>
      <el-col v-if="trigger.event.type==8 && lstime == 2"
              :span="20"
              :offset="2">
        <span>每周:</span>
        <el-radio-group v-model="time.weekDay"
                        style="margin:0 10px;"
                        @change="weeklyLabel()">
          <el-radio label="1">周一</el-radio>
          <el-radio label="2">周二</el-radio>
          <el-radio label="3">周三</el-radio>
          <el-radio label="4">周四</el-radio>
          <el-radio label="5">周五</el-radio>
          <el-radio label="6">周六</el-radio>
          <el-radio label="7">周日</el-radio>
        </el-radio-group>
        <el-time-select v-model="time.weekTime"
                        size="mini"
                        :picker-options="{start: '00:00', step: '00:10',end: '23:59'}"
                        placeholder="选择时间" />
      </el-col>
      <el-col v-if="trigger.event.type==8 && lstime == 3"
              :span="20"
              :offset="2">
        <span>每月:</span>
        <el-select v-model="time.monthData"
                   style="margin:0 20px;"
                   size="mini"
                   clearable
                   placeholder="请选择日"
                   @change="monthSelect()">
          <el-option v-for="item in monthlySelect"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-time-select v-model="time.weekTime"
                        size="mini"
                        :picker-options="{start: '00:00', step: '00:10',end: '23:59'}"
                        placeholder="选择时间" />
      </el-col>
      <el-col v-if="trigger.event.type==8 && lstime == 4"
              :span="20"
              :offset="2">
        <span>每年:</span>
        <el-select v-model="time.yearData"
                   size="mini"
                   clearable
                   placeholder="请选择月"
                   @change="yearSelectData()">
          <el-option v-for="item in yearSelect"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-select v-model="time.monthData"
                   style="margin:0 20px;"
                   size="mini"
                   clearable
                   placeholder="请选择日"
                   @change="monthSelect()">
          <el-option v-for="item in monthlySelect"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-time-select v-model="time.weekTime"
                        size="mini"
                        :picker-options="{start: '00:00', step: '00:10',end: '23:59'}"
                        placeholder="选择时间" />
      </el-col>
    </el-row>

    <!-- 筛选器限制 -->
    <el-row>
      <el-col :span="2"
              style="margin-top:10px;">筛选器限制</el-col>
      <el-col :span="20">
        <el-select v-model="trigger.filterId"
                   style="width:50%"
                   size="mini"
                   clearable
                   filterable
                   placeholder="请选择">
          <el-option v-for="item in filterSelect"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id" />
        </el-select>
      </el-col>
    </el-row>
    <!-- 触发事件 -->
    <el-row>
      <el-col :span="2"
              style="margin-top:10px;">触发事件</el-col>
      <el-col :span="20">
        <el-select v-model="trigger.operation.operationItems[0].type"
                   style="width:50%"
                   size="mini"
                   clearable
                   placeholder="请选择">
          <el-option v-for="item in strikeOption"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
      </el-col>
      <!-- 文本域 -->
      <el-col v-if="trigger.operation.operationItems[0].type==1"
              :span="20"
              :offset="2">
        <el-input v-model="trigger.operation.operationItems[0].value[0].text"
                  style="width:50%"
                  size="mini"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 6}"
                  placeholder="请输入内容"
                  maxlength="600"
                  show-word-limit />
      </el-col>
      <!-- 模板消息 -->
      <el-col v-if="trigger.operation.operationItems[0].type==11"
              :span="20"
              :offset="2">
        <el-select v-model="trigger.operation.operationItems[0].value[0].id"
                   style="width:50%"
                   size="mini"
                   filterable
                   placeholder="请选择模板消息可输入筛选">
          <el-option v-for="item in templates"
                     :key="item.id"
                     :label="item.title"
                     :value="item.id" />
        </el-select>
      </el-col>
      <!-- 短信下拉框 -->
      <el-col v-if="trigger.operation.operationItems[0].type==13"
              :span="20"
              :offset="2">
        <el-select v-model="trigger.operation.operationItems[0].value[0].id"
                   style="width:50%"
                   size="mini"
                   clearable
                   placeholder="请选择短信">
          <el-option v-for="item in noteOption"
                     :key="item.tplId"
                     :label="item.tpl_content"
                     :value="item.tplId" />
        </el-select>
      </el-col>
      <!-- 卡券下拉框 -->
      <el-col v-if="trigger.operation.operationItems[0].type==14"
              :span="20"
              :offset="2">
        <el-select v-model="trigger.operation.operationItems[0].value[0].id"
                   style="width:50%"
                   size="mini"
                   clearable
                   placeholder="请选择卡券">
          <el-option v-for="item in cardlist"
                     :key="item.id"
                     :label="item.title"
                     :value="item.id" />
        </el-select>
      </el-col>
      <!-- 图文 -->
      <el-col v-if="trigger.operation.operationItems[0].type==6"
              :span="20"
              :offset="2">
        <div v-for="(item,index) in ReplyList"
             :key="index"
             style="width:50%">
          <Reply :function-list="['图文']"
                 :item-id="item.id"
                 @getObj="getValue" />
        </div>
      </el-col>
    </el-row>
    <!-- 触发时间 -->
    <!-- <el-row>
        <el-col :span="2" style="margin-top:10px;">触发时间</el-col>
        <el-col :span="20">
          <el-radio v-model="radio" label="2">立即发送</el-radio>
        </el-col>
    </el-row>-->
    <!-- 是否开启 -->
    <el-row>
      <el-col :span="2">是否开启</el-col>
      <el-col :span="20">
        <el-checkbox v-model="trigger.enabled">立即开启</el-checkbox>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">是否打标签</el-col>
      <el-col :span="20">
        <el-switch v-model="tageShow"
                   size="mini"
                   active-color="#13ce66"
                   inactive-color="#ff4949"
                   @change="choosenable()" />
      </el-col>
    </el-row>
    <el-row v-if="tageShow">
      <el-col :span="3"
              style="margin-top:10px;">为触发用户添加标签</el-col>
      <el-col :span="20">
        <el-select v-model="tagNameList"
                   size="mini"
                   style="width:45%;"
                   multiple
                   filterable
                   placeholder="请选择">
          <el-option v-for="item in showTagList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id" />
        </el-select>
      </el-col>
    </el-row>
    <el-button size="mini"
               type="primary"
               @click="submit()">确认</el-button>
    <el-button size="mini"
               @click="cancel()">取消</el-button>
  </d2-container>
</template>
<script>
import {
  GetMenuList,
  GetCode,
  OrderStatus,
  GetFilter,
  TemplatesTemplates,
  ShortMessage,
  CardMessage,
  GetTag,
  CreateTrigger
} from '@/api/wechat/trigger'
import Reply from '@/components/reply'
export default {
  name: 'TriggerAdd',
  components: { Reply },
  data () {
    return {
      tagNameList: [],
      tagType: { type: 10, value: [] },
      tageShow: false,
      ReplyList: [
        {
          id: 1,
          getVal: {}
        }
      ],
      mode: '',
      lstime: '1' /** 年月日 */,
      time: {
        dateTime: '' /** 你选择的是 选择时间 下的具体时间 */,
        weekDay: '' /** 那一周 */,
        weekTime: '' /** 那一周的具体时间 */,
        monthData: '' /** 每月的几号 */,
        yearData: '' /** 每年的具体某一个月 */
      },
      trigger: {
        name: '' /** 名称 */,
        description: '',
        type: 2,
        event: {
          type: 0, // 事件类型: 0(微信默认消息), 1(微信关注), 2(微信扫码), 3(微信点菜单), 4(微信消息)
          data: [
            {
              mode: 11, // 匹配模式: 1(等于), 2(不等于), 3(小于), 4(小于等于), 5(大于), 6(大于等于), 7(A于B之间, 范围), 8(空), 9(非), 10(模糊), 11(任意值, 非空)
              value: '' // 关键字, 菜单ID, 二维码ID 等
            }
          ]
        },
        filterId: null, // 过滤器ID, 可为空
        operation: {
          mode: 2, // 1(随机运行), 2(全部运行)
          runAt: null, // 延迟运行时间
          operationItems: [
            {
              type: 1, // 操作方式:
              //  1(微信回复文本消息), 2(微信回复图片消息), 3(微信回复视频消息), 4(微信回复语音消息), 5(微信回复外链图文消息)
              //  6(微信回复图文消息), 7(微信回复音乐消息), 8(微信回复卡券消息), 9(微信回复小程序消息), 10(分配标签)
              value: [
                {
                  id: '',
                  text: '',
                  localUrl: '',
                  wechatMaterialNewsItemList: [],
                  point: '',
                  des: ''
                }
              ] // 相关数据
            }
          ],
          extraOperation: null // 额外操作, 内容同 打标签
        },
        enabled: true, // 是否立即启用
        enableAt: null // 如果不是立即启用需要配置这个字段, 传入启用时间就行
      },
      memuSelect: [
        /** 任意菜单下拉框 */
      ],
      options: [
        /** 触发条件下拉框内容 */
        {
          value: 0,
          label: '任意操作'
        },
        {
          value: 1,
          label: '关注'
        },
        {
          value: 3,
          label: '点击菜单'
        },
        {
          value: 4,
          label: '发送消息'
        },
        {
          value: 6,
          label: '会员开卡'
        },
        {
          value: 7,
          label: '订单状态变更'
        },
        {
          value: 8,
          label: '指定时间'
        }
      ],
      codeList: [
        // 二维码参数
      ],
      newsSelect: [
        // 指定消息下拉框内容
        {
          value: 1,
          label: '完全匹配'
        },
        {
          value: 10,
          label: '模糊匹配'
        }
      ],
      orderSelect: [
        // 订单状态下拉框框内容
      ],
      monthlySelect: [
        // 每月的几号
      ],
      yearSelect: [
        // 每年的具体某一个月
      ],
      filterSelect: [
        /** 筛选器下拉内容 */
      ],
      strikeOption: [
        /** 触发事件下拉框内容 */
        {
          value: 1,
          label: '发送消息'
        },
        {
          value: 6,
          label: '图文'
        }
      ],
      templates: [
        // 模板消息下拉框参数
      ],
      noteOption: [
        // 短信下拉框内容
      ],
      cardlist: [
        // 卡券下拉内容
      ],
      showTagList: [
        // 获取标签列表数据
      ]
    }
  },
  computed: {},
  created () {
    this.monthlySelect = []
    this.menuList()
    this.codeListInterface()
    this.getcardlstatus()
    this.getFilterInterface()
    this.templatesInterface()
    this.shortMessageInterface()
    this.cardMessageInterface()
    this.getTagInterface()
    for (let i = 0; i < 32; i++) {
      this.monthlySelect.push({
        value: i,
        label: i
      })
    }
    for (let i = 1; i < 13; i++) {
      this.yearSelect.push({
        value: i,
        label: i
      })
    }
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    triggerSelect (value) {
      // 触发条件下拉框
      console.log('你选中的', value)
      this.trigger.event.data[0].mode = 11 /** 默认参数为11 */
      this.trigger.event.data[0].value = '' /** 默认参数为空 */
      if (value == 4) {
        // 发送消息
        console.log('value', value)
        this.mode = '11'
      }
      if (
        this.trigger.event.type == 0 ||
        this.trigger.event.type == 3 ||
        this.trigger.event.type == 1 ||
        this.trigger.event.type == 4
      ) {
        this.trigger.operation.operationItems[0].type = 1
        this.strikeOption = [
          {
            value: 1,
            label: '发送消息'
          },
          {
            value: 6,
            label: '图文'
          }
        ]
      }
      if (this.trigger.event.type == 6) {
        this.trigger.operation.operationItems[0].type = 14
        this.strikeOption = [
          {
            value: 11,
            label: '模板消息'
          },
          {
            value: 14,
            label: '发送卡券'
          }
        ]
      }
      if (this.trigger.event.type == 7) {
        this.trigger.operation.operationItems[0].type = 11
        this.strikeOption = [
          {
            value: 11,
            label: '模板消息'
          }
        ]
      }
      if (this.trigger.event.type == 8) {
        this.trigger.operation.operationItems[0].type = 13
        this.trigger.operation.operationItems[0].value[0].id = ''
        this.strikeOption = [
          {
            value: 13,
            label: '发送短信'
          }
        ]
      }
    },
    emptySelect () {
      // 清空触发条件按钮
      this.trigger.event.data[0].mode = 11 /** 默认参数为11 */
    },
    menuList () {
      // 菜单组列表
      const obj = {
        page: 1,
        size: 1000
      }
      GetMenuList(obj).then(res => {
        if (res.code == 0) {
          console.log('菜单组列表', res)
          this.memuSelect = res.data.data
        }
      })
    },
    codeListInterface () {
      // 二维码列表
      GetCode({}).then(res => {
        if (res.code == 0) {
          console.log('二维码列表', res)
          this.codeList = res.data.data
        }
      })
    },
    getcardlstatus () {
      // 订单状态列表
      OrderStatus({}).then(res => {
        if (res.code == 0) {
          console.log('订单状态列表', res)
          this.orderSelect = res.data
        }
      })
    },
    getFilterInterface () {
      // 获取筛选器条件限制
      GetFilter({}).then(res => {
        if (res.code == 0) {
          console.log('获取筛选器条件限制', res)
          this.filterSelect = res.data
        }
      })
    },
    templatesInterface () {
      // 模板消息列表
      const obj = {
        page: 1,
        size: 1000,
        templateTitle: ''
      }
      TemplatesTemplates(obj).then(res => {
        if (res.code == 0) {
          console.log('模板消息列表', res)
          this.templates = res.data
        }
      })
    },
    shortMessageInterface () {
      // 发送短信列表接口
      ShortMessage({}).then(res => {
        if (res.code == 0) {
          console.log('发送短信列表接口', res)
          this.noteOption = res.data
        }
      })
    },
    cardMessageInterface () {
      // 卡券列表接口
      CardMessage({}).then(res => {
        if (res.code == 0) {
          console.log('卡券列表接口', res)
          this.cardlist = res.data.couponList
        }
      })
    },
    getTagInterface () {
      // 获取标签列表
      GetTag({}).then(res => {
        if (res.code == 0) {
          console.log('获取标签列表', res)
          this.showTagList = res.data
        }
      })
    },
    newsLabel () {
      // 判断你选中的是任意消息或者 指定消息关键字
      console.log('消息关键字', this.mode)
      if (this.mode == 11) {
        console.log(this.mode)
        this.trigger.event.data = [{ mode: 11, value: '' }]
      } else {
        this.trigger.event.data = [{ mode: 1, value: '' }]
      }
    },
    addKey () {
      // 增加关键词
      const arr = { mode: 1, value: '' }
      this.trigger.event.data.push(arr)
    },
    timesLabel () {
      // 选择指定时间
      // this.time.dateTime = ""; /**选择时间清空 */
      // this.time.weekDay = ""; /**选择的周清空 */
      // this.time.weekTime = ""; /**周时间清空 */
      // this.time.monthData = ""; /**每月的几号 */
      this.time = {
        dateTime: '',
        weekDay: '',
        weekTime: '',
        monthData: '',
        yearData: ''
      }
    },
    weeklyLabel () {
      // 你点击的是哪一周
      this.time.weekTime = ''
    },
    monthSelect () {
      // 每月的几号 (每次选择日期的时候都会清空具体时间)
      this.time.weekTime = ''
    },
    yearSelectData () {
      // 每一年的具体某一月
      this.time.monthData = ''
      this.time.weekTime = ''
    },
    getValue (e) {
      // 图文上传
      console.log(e)
      this.trigger.operation.operationItems[0].value[0].id = e.id
      if (e.wechatMaterialNewsItemList) { // 图文
        this.trigger.operation.operationItems[0].value[0].wechatMaterialNewsItemList =
          e.wechatMaterialNewsItemList
      }
      if (e.advancedNewsItemList) { // 高级图文
        this.trigger.operation.operationItems[0].value[0].wechatMaterialNewsItemList =
          e.advancedNewsItemList
      }

    },
    choosenable () {
      // 是否打标签
      console.log(this.tageShow)
      this.tagNameList = []
      if (this.tageShow) {
        this.trigger.operation.extraOperation = {}
      } else {
        this.trigger.operation.extraOperation = null
      }
    },
    // 触发器数据处理
    dealDate (obj) {
      console.log(obj)
      // 选择不同触发器事件，value字段显示不同
      var type = obj.operation.operationItems[0].type
      var value = obj.operation.operationItems[0].value[0]
      if (type == 1) {
        value.localUrl = ''
        value.wechatMaterialNewsItemList = ''
      }
      if (type == 2) {
        value.text = ''
        value.wechatMaterialNewsItemList = ''
      }
      if (type == 4) {
        value.text = ''
        value.localUrl = ''
        value.wechatMaterialNewsItemList = ''
      }
      if (type == 6) {
        value.localUrl = ''
        value.text = ''
      }
    },
    submit () {
      // 点击确认按钮
      this.dealDate(this.trigger)
      if (!this.trigger.name) {
        this.open('警告', '请填写名称', 'warning')
        return
      }

      if (this.trigger.event.type == 7 || this.trigger.event.type == 8) {
        this.trigger.event.data[0].mode = 1
      }
      // 如果加上会影响你传入的值↓
      // else {
      //   this.trigger.event.data[0].value = "";
      // }

      // 你选中的标签↓
      console.log(this.tagNameList)
      this.showTagList.map(res => {
        if (this.tagNameList.indexOf(res.id) != -1) {
          this.tagType.value.push({
            id: res.id
          })
        }
      })
      this.trigger.operation.extraOperation = this.tagType
      console.log(this.trigger, this.trigger.operation.extraOperation)
      // 触发事件先暂无 type == 12 ↓
      if (this.trigger.operation.operationItems[0].type == 12) {
        this.trigger.operation.operationItems[0].value[0].des = this.trigger.name
      } else {
        this.trigger.operation.operationItems[0].value[0].des = ''
      }
      // 只有你选择了指定时间的时候才能走下方代码
      if (this.trigger.event.type == 8) {
        let value
        const type = this.lstime
        if (this.lstime == 1) {
          value = {
            type: type,
            data: this.time.dateTime,
            hour: this.time.weekTime.split(':')[0],
            minute: this.time.weekTime.split(':')[1]
          }
        } else if (this.lstime == 2) {
          value = {
            type: type,
            week: this.time.weekDay,
            hour: this.time.weekTime.split(':')[0],
            minute: this.time.weekTime.split(':')[1]
          }
        } else if (this.lstime == 3) {
          value = {
            type: type,
            day: this.time.monthData,
            hour: this.time.weekTime.split(':')[0],
            minute: this.time.weekTime.split(':')[1]
          }
        } else if (this.lstime == 4) {
          value = {
            type: type,
            month: this.time.yearData,
            day: this.time.monthData,
            hour: this.time.weekTime.split(':')[0],
            minute: this.time.weekTime.split(':')[1]
          }
        }
        this.trigger.event.data[0].value = JSON.stringify(value)

        console.log(value, 'eeeee', this.trigger)
      }
      console.log('kankan', this.trigger)
      this.createTriggerInterface(this.trigger)
    },
    createTriggerInterface (obj) {
      // 触发器创建
      CreateTrigger(obj).then(res => {
        if (res.code == 0) {
          this.open('成功', '创建成功', 'success')
          console.log('触发器创建', res)
          this.$router.push({
            name: 'wechat-trigger-triggerList'
          })
        }
      })
    },
    cancel () {
      // 取消
      this.$router.push({
        name: 'wechat-trigger-triggerList'
      })
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
</style>
