<template>
  <div>
    <el-form
      style="margin-bottom:15px"
      label-position="left"
      label-width="140px"
    >
      <div v-if="type == 'start'">
        <el-form-item label="智能营销流程名">
          <el-input
            v-model="trigger.flowTitle"
            :disabled="action == 'look'"
            placeholder="为智能营销流程取一个名称"
            size="small"
          />
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            v-model="trigger.remark"
            :disabled="action == 'look'"
            placeholder="请输入备注"
            size="small"
          />
        </el-form-item>
        <div class="line" />
      </div>

      <!-- <el-form-item label="触发名称">
        <el-input
          v-model="trigger.name"
          :disabled="action == 'look'"
          placeholder="请输入"
          size="small"
          v-model="trigger.name"
        ></el-input>
      </el-form-item>-->
      <!-- -->

      <el-form-item :label="type == 'draw' ? '首次触发条件' : '触发条件'">
        <el-col
          v-if="
            trigger.event.type == 6 ||
              trigger.event.type == 16 ||
              trigger.event.type == 17
          "
          :span="24"
          style="color:rgb(245, 108, 108);"
          >此节点无需配置触发条件，请点击确定按钮保存</el-col
        >

        <el-select
          v-if="type == 'start' || type == 'draw'"
          v-model="trigger.event.type"
          :disabled="action == 'look'"
          size="small"
          style="width:100%"
          clearable
          placeholder="请选择"
          @change="triggerSelect(trigger.event.type)"
          @clear="emptySelect()"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- 点击菜单 -->
        <el-col v-if="trigger.event.type == 3" :span="20">
          <el-radio-group
            v-model="trigger.event.data[0].mode"
            :disabled="action == 'look'"
            size="small"
          >
            <el-radio :label="11">点击任意菜单</el-radio>
            <el-radio :label="1">点击指定菜单</el-radio>
          </el-radio-group>
        </el-col>
        <!-- 选择会员卡升级 -->
        <el-col v-if="trigger.event.type == 11" :span="20">
          <el-col :span="6">自有会员卡</el-col>
          <el-select
            v-model="trigger.event.data[0].value"
            :disabled="action == 'look'"
            size="small"
            style="width:50%"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in memuSelect"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <!-- 点击菜单里面的指定菜单 -->
        <el-col
          v-if="trigger.event.data[0].mode == 1 && trigger.event.type == 3"
          :span="20"
        >
          <el-select
            v-model="trigger.event.data[0].value"
            :disabled="action == 'look'"
            size="small"
            style="width:50%"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in memuSelect"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>

        <!-- 关注 -->
        <el-col v-if="trigger.event.type == 1" :span="20">
          <el-radio-group
            v-model="trigger.event.data[0].mode"
            :disabled="action == 'look'"
            size="small"
          >
            <el-radio :label="11">任意关注</el-radio>
            <el-radio :label="1">指定二维码关注</el-radio>
          </el-radio-group>
        </el-col>
        <!-- 点击关注里面的指定二维码关注 -->
        <el-col
          v-if="trigger.event.data[0].mode == 1 && trigger.event.type == 1"
        >
          <el-select
            v-model="trigger.event.data[0].value"
            :disabled="action == 'look'"
            style="width:100%"
            size="small"
            clearable
            filterable
            placeholder="请选择二维码"
          >
            <el-option
              v-for="item in codeList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <!-- 微信扫码 -->
        <el-col v-if="trigger.event.type == 2">
          <el-select
            v-model="trigger.event.data[0].value"
            :disabled="action == 'look'"
            style="width:100%"
            size="small"
            clearable
            filterable
            placeholder="请选择二维码"
          >
            <el-option
              v-for="item in codeList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <!-- 发送消息 -->
        <el-col v-if="trigger.event.type == 4" :span="20">
          <el-radio-group
            v-model="mode"
            :disabled="action == 'look'"
            size="small"
            @change="newsLabel"
          >
            <el-radio v-model="mode" :label="11">任意消息</el-radio>
            <el-radio v-model="mode" :label="1">指定消息关键字</el-radio>
          </el-radio-group>
        </el-col>
        <el-col
          v-if="trigger.event.type == 4 && trigger.event.data[0].mode != 11"
          :span="20"
        >
          <div
            v-for="(item, index) in trigger.event.data"
            :key="index"
            style="margin-bottom:20px;"
          >
            <el-input
              v-model="item.value"
              size="small"
              :disabled="action == 'look'"
              placeholder="请输入内容"
              style="width:34%"
              clearable
            />
            <el-select
              v-model="item.mode"
              size="small"
              :disabled="action == 'look'"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="i in newsSelect"
                :key="i.value"
                :label="i.label"
                :value="i.value"
              />
            </el-select>
          </div>
          <el-button
            :disabled="action == 'look'"
            size="small"
            type="primary"
            @click="addKey()"
            >增加关键字</el-button
          >
        </el-col>

        <!-- 订单状态变更 -->
        <el-col v-if="trigger.event.type == 7" :span="22">
          <el-col :span="6">订单状态</el-col>
          <el-col :span="12">
            <el-select
              v-model="trigger.event.data[0].value"
              :disabled="action == 'look'"
              style="width:55%"
              size="small"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderSelect"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
        </el-col>

        <!-- 自定义事件 -->
        <el-col v-if="trigger.event.type == 13" :span="22">
          <el-col :span="6" style="color:#606266;">自定义事件</el-col>
          <el-col :span="12">
            <el-select
              v-model="trigger.event.data[0].value"
              :disabled="action == 'look'"
              style="width:100%"
              size="small"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in ClickSelect"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
        </el-col>
      </el-form-item>

      <el-form-item style="margin-top:30px;">
        <el-button
          :disabled="action == 'look'"
          size="small"
          type="primary"
          @click="submit"
          >确定</el-button
        >
        <el-button :disabled="action == 'look'" size="small" @click="clear"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { triggerName } from '@/api/marketing/automated'
import Reply from '@/components/reply'
import {
  GetMenuList,
  GetCode,
  OrderStatus,
  GetFilter,
  TemplatesTemplates,
  ShortMessage,
  CardMessage,
  GetTag,
  intelligent,
} from '@/api/wechat/trigger'
import { labelList, tagList } from '@/api/member/member'
import { myCard } from '@/api/member/member'

export default {
  name: 'TriggerAdd',
  components: { Reply },
  props: {
    type: {
      type: String,
      default: null,
    },
    showData: {
      type: Object,
      default: null,
    },
    action: {
      type: String,
      default: 'add',
    },
    eventType: {
      default: 1,
    },
  },
  data() {
    return {
      triggerNameCheckError: false,
      tagNameList: [],
      tagType: { type: 10, value: [] },
      tageShow: false,
      ReplyList: [
        {
          id: 1,
          getVal: {},
        },
      ],
      mode: 11,
      lstime: '1' /** 年月日 */,
      time: {
        dateTime: '' /** 你选择的是 选择时间 下的具体时间 */,
        weekDay: '' /** 那一周 */,
        weekTime: '' /** 那一周的具体时间 */,
        monthData: '' /** 每月的几号 */,
        yearData: '' /** 每年的具体某一个月 */,
      },
      trigger: {
        remark: null, // 自动营销备注
        flowTitle: null, // 自动营销标题
        name: '触发器__' /** 名称 */,
        description: '',
        type: 3,
        event: {
          type: null, // 事件类型: 0(微信默认消息), 1(微信关注), 2(微信扫码), 3(微信点菜单), 4(微信消息)
          data: [
            {
              mode: 11, // 匹配模式: 1(等于), 2(不等于), 3(小于), 4(小于等于), 5(大于), 6(大于等于), 7(A于B之间, 范围), 8(空), 9(非), 10(模糊), 11(任意值, 非空)
              value: '', // 关键字, 菜单ID, 二维码ID 等
            },
          ],
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
                  des: '',
                },
              ], // 相关数据
            },
          ],
          extraOperation: null, // 额外操作, 内容同 打标签
        },
        enabled: true, // 是否立即启用
        enableAt: null, // 如果不是立即启用需要配置这个字段, 传入启用时间就行
      },
      memuSelect: [
        /** 任意菜单下拉框 */
      ],
      options: [
        /** 触发条件下拉框内容 */
        {
          value: 1,
          label: '关注',
        },
        {
          value: 3,
          label: '点击菜单',
        },
        {
          value: 4,
          label: '发送消息',
        },
        {
          value: 6,
          label: '会员开卡',
        },
        {
          value: 7,
          label: '订单状态变更',
        },
        {
          value: 16,
          label: '会员注册',
        },
        {
          value: 13,
          label: '自定义事件',
        },
        {
          value: 17,
          label: '会员信息补全',
        },
        {
          value: 11,
          label: '会员卡升级',
        },
      ],
      codeList: [
        // 二维码参数
      ],
      newsSelect: [
        // 指定消息下拉框内容
        {
          value: 1,
          label: '完全匹配',
        },
        {
          value: 10,
          label: '模糊匹配',
        },
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
          label: '发送消息',
        },
        {
          value: 6,
          label: '图文',
        },
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
      ],
      ClickSelect: [], // 自定义事件列表
      copyName: null,
    }
  },
  computed: {},
  created() {
    this.trigger.event.type = this.eventType * 1
    this.monthlySelect = []
    if (this.eventType == 1 || this.eventType == 2) {
      // 二维码
      this.codeListInterface()
    } else if (this.eventType == 3) {
      this.menuList()
    } else if (this.eventType == 7) {
      this.getcardlstatus()
    } else if (this.eventType == 13) {
      this.getClick()
    }

    this.copyName = { ...this.trigger.name }
    this.callShowData()
    console.log('showData', this.showData)
    console.log('this.eventType', this.eventType)
    console.log('this.trigger', this.trigger)
    console.log('this.mode', this.mode)
  },
  mounted() {
    this.triggerSelect(this.trigger.event.type, true)
  },
  beforeDestroy() {},
  methods: {
    callShowData() {
      if (this.showData) {
        // 回显数据
        const showDataCP = JSON.parse(JSON.stringify({ ...this.showData }))
        showDataCP.event.data[0].value =
          typeof showDataCP.event.data[0].value == 'number'
            ? showDataCP.event.data[0].value * 1
            : showDataCP.event.data[0].value
        this.$set(this, 'trigger', showDataCP)

        if (this.trigger.event.type == 4) {
          // 发送消息
          if (this.trigger.event.data.length > 0) {
            this.$set(this, 'mode', 1)
          }
        }
      }
    },
    triggerSelect(value, breakMode = false) {
      if (this.trigger.event.type == 1) {
        // 二维码
        this.codeListInterface()
      } else if (this.trigger.event.type == 3) {
        this.menuList()
      } else if (this.trigger.event.type == 7) {
        this.getcardlstatus()
      } else if (this.trigger.event.type == 13) {
        this.getClick()
      } else if (this.trigger.event.type == 11) {
        this.getMyCard()
      }
      // 触发条件下拉框
      if (!breakMode) {
        this.trigger.event.data[0].mode = 11 /** 默认参数为11 */
        this.trigger.event.data[0].value = '' /** 默认参数为空 */
      }

      if (value == 4) {
        // 发送消息
        this.mode = 11
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
            label: '发送消息',
          },
          {
            value: 6,
            label: '图文',
          },
        ]
      }
      if (this.trigger.event.type == 6) {
        this.trigger.operation.operationItems[0].type = 14
        this.strikeOption = [
          {
            value: 11,
            label: '模板消息',
          },
          {
            value: 14,
            label: '发送卡券',
          },
        ]
      }
      if (this.trigger.event.type == 7) {
        this.trigger.operation.operationItems[0].type = 11
        this.strikeOption = [
          {
            value: 11,
            label: '模板消息',
          },
        ]
      }

      if (this.trigger.event.type == 16) {
        this.trigger.operation.operationItems[0].type = 13
        this.trigger.operation.operationItems[0].value[0].id = ''
        this.strikeOption = [
          {
            value: 16,
            label: '会员注册',
          },
        ]
      }

      if (this.trigger.event.type == 13) {
        this.trigger.operation.operationItems[0].type = 13
        this.trigger.operation.operationItems[0].value[0].id = ''
        this.strikeOption = [
          {
            value: 13,
            label: '自定义事件',
          },
        ]
      }
    },
    emptySelect() {
      // 清空触发条件按钮
      this.trigger.event.data[0].mode = 11 /** 默认参数为11 */
    },
    getClick() {
      // 事件列表
      intelligent({}).then((res) => {
        if (res.code == 0) {
          if (res.data) {
            this.ClickSelect = res.data
          }
        }
      })
    },
    menuList() {
      // 菜单组列表
      const obj = {
        page: 1,
        size: 1000,
      }
      GetMenuList(obj).then((res) => {
        console.log('menuList-res', res)
        if (res.code == 0) {
          this.$set(this, 'memuSelect', res.data.data)
          this.callShowData()
        }
      })
    },
    getMyCard() {
      // 菜单组列表  //
      tagList().then((res) => {
        console.log('tagList', res)
        if (res.code == 0) {
          res.data.forEach((d) => {
            d.title = d.levelName
            d.value = d.id
          })
          this.memuSelect = res.data
          this.callShowData()
        }
      })
    },
    codeListInterface() {
      // 二维码列表
      GetCode({}).then((res) => {
        if (res.code == 0) {
          this.codeList = res.data.data
          this.callShowData()
        }
      })
    },
    getcardlstatus() {
      // 订单状态列表
      OrderStatus({}).then((res) => {
        if (res.code == 0) {
          this.orderSelect = res.data
          this.callShowData()
        }
      })
    },
    getFilterInterface() {
      // 获取筛选器条件限制
      GetFilter({}).then((res) => {
        if (res.code == 0) {
          this.filterSelect = res.data
        }
      })
    },
    templatesInterface() {
      // 模板消息列表
      const obj = {
        page: 1,
        size: 1000,
      }
      TemplatesTemplates(obj).then((res) => {
        if (res.code == 0) {
          this.templates = res.data.data
        }
      })
    },
    shortMessageInterface() {
      // 发送短信列表接口
      ShortMessage({}).then((res) => {
        if (res.code == 0) {
          this.noteOption = res.data
        }
      })
    },
    cardMessageInterface() {
      // 卡券列表接口
      CardMessage({}).then((res) => {
        if (res.code == 0) {
          this.cardlist = res.data.couponList
        }
      })
    },
    getTagInterface() {
      // 获取标签列表
      GetTag({}).then((res) => {
        if (res.code == 0) {
          this.showTagList = res.data
        }
      })
    },
    newsLabel() {
      // 判断你选中的是任意消息或者 指定消息关键字
      if (this.mode == 11) {
        this.trigger.event.data = []
      } else {
        this.trigger.event.data = [{ mode: 1, value: '' }]
      }
    },
    addKey() {
      // 增加关键词
      const arr = { mode: 1, value: '' }
      this.trigger.event.data.push(arr)
    },
    timesLabel() {
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
        yearData: '',
      }
    },
    weeklyLabel() {
      // 你点击的是哪一周
      this.time.weekTime = ''
    },
    monthSelect() {
      // 每月的几号 (每次选择日期的时候都会清空具体时间)
      this.time.weekTime = ''
    },
    yearSelectData() {
      // 每一年的具体某一月
      this.time.monthData = ''
      this.time.weekTime = ''
    },
    getValue(e) {
      // 图文上传
      this.trigger.operation.operationItems[0].value[0].id = e.id
      this.trigger.operation.operationItems[0].value[0].wechatMaterialNewsItemList =
        e.wechatMaterialNewsItemList
    },
    choosenable() {
      // 是否打标签
      this.tagNameList = []
      if (this.tageShow) {
        this.trigger.operation.extraOperation = {}
      } else {
        this.trigger.operation.extraOperation = null
      }
    },
    // 触发器数据处理
    dealDate(obj) {
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
    submit() {
      // 点击确认按钮
      console.log('this.trigger', this.trigger)
      this.dealDate(this.trigger)
      if (this.type == 'start') {
        if (!this.trigger.flowTitle) {
          this.open('警告', '请填写智能营销流程名', 'error')
          return
        }
      }

      // if (!this.trigger.name) {
      //   this.open("警告", "请填写触发名称", "error");
      //   return;
      // }

      if (this.trigger.event.type == 7 || this.trigger.event.type == 8) {
        this.trigger.event.data[0].mode = 1
      }
      // 如果加上会影响你传入的值↓
      // else {
      //   this.trigger.event.data[0].value = "";
      // }

      // 你选中的标签↓
      this.showTagList.map((res) => {
        if (this.tagNameList.indexOf(res.id) != -1) {
          this.tagType.value.push({
            id: res.id,
          })
        }
      })
      this.trigger.operation.extraOperation = this.tagType
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
            minute: this.time.weekTime.split(':')[1],
          }
        } else if (this.lstime == 2) {
          value = {
            type: type,
            week: this.time.weekDay,
            hour: this.time.weekTime.split(':')[0],
            minute: this.time.weekTime.split(':')[1],
          }
        } else if (this.lstime == 3) {
          value = {
            type: type,
            day: this.time.monthData,
            hour: this.time.weekTime.split(':')[0],
            minute: this.time.weekTime.split(':')[1],
          }
        } else if (this.lstime == 4) {
          value = {
            type: type,
            month: this.time.yearData,
            day: this.time.monthData,
            hour: this.time.weekTime.split(':')[0],
            minute: this.time.weekTime.split(':')[1],
          }
        }
        this.trigger.event.data[0].value = JSON.stringify(value)
      }
      this.createTriggerInterface(this.trigger)
    },
    createTriggerInterface(obj) {
      // 触发器创建
      // if (this.triggerNameCheckError) {
      //   this.open("警告", "该触发器名称已存在,请重新设置", "error");
      //   return;
      // }
      this.$emit('sendValue', obj)
    },
    triggerNameCheck(name) {
      // if (this.copyName == name || this.$isNull(name)) {
      //   return;
      // }
      // triggerName({
      //   name: name
      // }).then(res => {
      //   if (res.code == 0) {
      //     if (res.data) {
      //       this.open("警告", "该触发器名称已存在,请重新设置", "error");
      //       this.triggerNameCheckError = true;
      //     } else {
      //       this.triggerNameCheckError = false;
      //     }
      //   }
      // });
    },
    cancel() {
      // 取消
      this.$router.push({
        name: 'home',
      })
    },
    open(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type,
      })
    },
    clear() {
      if (this.type == 'start') {
        this.$router.push({
          name: 'marketing-automated-list',
        })
      } else {
        // this.submit();
        this.$emit('claer')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
.line {
  width: 100%;
  height: 0px;
  border-bottom: 1px dashed #dcdfe6;
  margin-bottom: 20px;
}
</style>
