<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-alert
          title="请选择需要筛选的条件"
          type="info"
          :closable="false"
        />
      </el-col>
    </el-row>
    <el-row class="btn_wid">
      <el-col
        v-for="(item,index) in memberlist"
        :key="index"
        :span="4"
      >
        <el-checkbox
          v-model="item.checked"
          size="mini"
          class="interval_padding"
          :label="item.name"
          prop="name"
          border
          @change="checkId(1,item.name,item,index)"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col
        v-for="(item,index) in list_one"
        :key="index"
      >
        <el-col
          :span="3"
          style="margin-top:10px;"
        >{{ item.name }}:</el-col>
        <el-col
          v-for="(itm,idx) in item.child"
          :key="idx"
          :span="3"
        >
          <el-radio
            v-if="itm.type == 'radio'"
            v-model="item.number"
            size="mini"
            :label="itm.radio1"
            border
            @change="checkId(2,item.name,itm,index)"
          >{{ itm.name }}</el-radio>
          <el-input
            v-if="itm.type == 'input' && itm.ishow"
            v-model="itm.textval"
            size="mini"
            placeholder="请输入内容"
            clearable
          />
          <el-select
            v-if="itm.type == 'select' && itm.ishow"
            v-model="itm.textval"
            size="mini"
            style="margin:0 10px;"
            clearable
            placeholder="请选择"
            @change="selectId(item,value)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-if="itm.type == 'selects' && itm.ishow"
            v-model="itm.textval"
            size="mini"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="initem in itm.optionsDate"
              :key="initem.value"
              :label="initem.label"
              :value="initem.value"
            />
          </el-select>
          <Address
            v-if="itm.type == 'citys' && itm.ishow"
            size="mini"
            style="width: 240px;"
            :addvalue="addressValue"
            @getValue="getCheckValue"
          />
          <el-radio-group
            v-if="itm.type == 'radioSex' && itm.ishow"
            v-model="radio"
            style="width:200px;margin-top:10px;"
          >
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">未知</el-radio>
          </el-radio-group>
          <el-select
            v-if="itm.type == 'language' && itm.ishow"
            v-model="language"
            size="mini"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="initem in imgList"
              :key="initem.value"
              :label="initem.cnName"
              :value="initem.enName"
            />
          </el-select>

          <el-select
            v-if="itm.type == 'attention' && itm.ishow"
            v-model="attention"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="initem in sourcelist"
              :key="initem.value"
              :label="initem.name"
              :value="initem.id"
            />
          </el-select>
          <el-select
            v-if="itm.type == 'labels' && itm.ishow"
            v-model="labels"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="initem in labelData"
              :key="initem.value"
              :label="initem.name"
              :value="initem.id"
            />
          </el-select>
        </el-col>
        <a
          class="del"
          @click="del(item)"
        >删除</a>
      </el-col>
      <el-button
        size="mini"
        type="primary"
        @click="sure()"
      >确认筛选条件</el-button>
    </el-row>
  </div>
</template>
<script>
import { GetMaterial, FilterMaterial } from '@/api/member/filter'
import Address from '@/components/address'
export default {
  name: 'FilterCom',
  components: { Address },
  props: ['childid'],
  data() {
    return {
      name,
      radio: '',
      radio1: '-1',
      textval: '',
      type: 2,
      imgList: [], // 获取语言参数放置处
      labelData: [], // 标签参数放置处
      language: '', // 你选取的语言放置处
      labels: '', // 你选中的标签数据放置处
      attention: '', // 选中的关注来源数据放置处
      addressValue: [], // 省市区ID放置处
      inputName: false,
      value: '',
      dayTime: '',
      options: [], // 月下拉框数据
      // optionsDate: [], //日下拉框数据
      screenArray: [
        {
          type: 2,
          entrys: []
        }
      ],
      list_one: [], // 你选中的值放置处
      BatchLabeling: [],
      memberlist: [
        {
          id: 1,
          number: -1,
          name: '姓名',
          text: 'name',
          checked: false,
          child: [
            {
              id: 8,
              name: '为空',
              radio1: 1,
              type: 'radio'
            },
            {
              id: 11,
              name: '不为空',
              radio1: 2,
              type: 'radio'
            },
            {
              id: 1,
              name: '等于',
              radio1: 3,
              textval: '',
              type: 'radio'
            },
            {
              id: 9,
              name: '不等于',
              radio1: 4,
              textval: '',
              type: 'radio'
            },
            {
              id: 2,
              name: '包含',
              radio1: 5,
              textval: '',
              type: 'radio'
            },
            {
              id: 12,
              name: '不包含',
              radio1: 6,
              textval: '',
              type: 'radio'
            },
            {
              id: 12,
              name: '输入框',
              radio1: 6,
              textval: '',
              type: 'input',
              ishow: false
            }
          ]
        },
        {
          id: 2,
          number: -2,
          name: '手机号码',
          text: 'phone',
          checked: false,
          child: [
            {
              id: 8,
              name: '为空',
              radio1: 7,
              type: 'radio'
            },
            {
              id: 11,
              name: '不为空',
              radio1: 8,
              type: 'radio'
            },
            {
              id: 1,
              name: '等于',
              radio1: 9,
              textval: '',
              type: 'radio'
            },
            {
              id: 9,
              name: '不等于',
              radio1: 10,
              textval: '',
              type: 'radio'
            },
            {
              id: 2,
              name: '包含',
              radio1: 11,
              textval: '',
              type: 'radio'
            },
            {
              id: 12,
              name: '不包含',
              radio1: 12,
              textval: '',
              type: 'radio'
            },
            {
              id: 12,
              name: '输入框',
              radio1: 13,
              textval: '',
              type: 'input',
              ishow: false
            }
          ]
        },
        {
          id: 5,
          number: -3,
          name: '微信昵称',
          text: 'nickname',
          checked: false,
          child: [
            {
              id: 8,
              name: '为空',
              radio1: 14,
              type: 'radio'
            },
            {
              id: 11,
              name: '不为空',
              radio1: 15,
              type: 'radio'
            },
            {
              id: 1,
              name: '等于',
              radio1: 16,
              textval: '',
              type: 'radio'
            },
            {
              id: 9,
              name: '不等于',
              radio1: 17,
              textval: '',
              type: 'radio'
            },
            {
              id: 2,
              name: '包含',
              radio1: 18,
              textval: '',
              type: 'radio'
            },
            {
              id: 12,
              name: '不包含',
              radio1: 19,
              textval: '',
              type: 'radio'
            },
            {
              id: 12,
              name: '输入框',
              radio1: 6,
              textval: '',
              type: 'input',
              ishow: false
            }
          ]
        },
        {
          id: 6,
          number: -4,
          name: '微信头像',
          text: 'headimgurl',
          checked: false,
          child: [
            {
              id: 8,
              name: '为空',
              radio1: 2,
              type: 'radio'
            },
            {
              id: 11,
              name: '不为空',
              radio1: 6,
              type: 'radio'
            }
          ]
        },
        {
          id: 7,
          number: -5,
          name: '微信关注时间',
          text: 'subscribetime',
          checked: false,
          child: [
            {
              id: 8,
              radio1: 1,
              name: '为空',
              type: 'radio'
            },
            {
              id: 11,
              radio1: 2,
              name: '不为空',
              type: 'radio'
            },
            {
              id: 1,
              radio1: 3,
              name: '等于',
              type: 'radio'
            },
            {
              id: 9,
              radio1: 4,
              name: '不等于',
              type: 'radio'
            },
            {
              id: 3,
              radio1: 5,
              name: '早于',
              type: 'radio'
            },
            {
              id: 4,
              radio1: 6,
              name: '早于(含)',
              type: 'radio'
            },
            {
              id: 5,
              radio1: 7,
              name: '晚于',
              type: 'radio'
            },
            {
              id: 6,
              radio1: 8,
              name: '晚于(含)',
              type: 'radio'
            },
            {
              id: 12,
              name: '输入框',
              radio1: 6,
              textval: '',
              type: 'input',
              ishow: false
            },
            {
              id: 13,
              name: '选择框',
              textval: '',
              type: 'select',
              ishow: false
            },
            {
              id: 14,
              name: '选择框',
              textval: '',
              optionsDate: [],
              type: 'selects',
              ishow: false
            }
          ]
        },

        {
          id: 9,
          number: -7,
          name: '地区',
          text: 'location',
          checked: false,
          child: [
            {
              id: 8,
              radio1: 1,
              name: '为空',
              type: 'radio'
            },
            {
              id: 11,
              radio1: 2,
              name: '不为空',
              type: 'radio'
            },
            {
              id: 1,
              radio1: 3,
              name: '等于',
              type: 'radio'
            },
            {
              id: 9,
              radio1: 4,
              name: '不等于',
              type: 'radio'
            },
            {
              id: 9,
              name: '选择框',
              type: 'citys',
              ishow: false
            }
          ]
        },
        {
          id: 8,
          number: -6,
          name: '系统注册时间',
          text: 'registertime',
          checked: false,
          child: [
            {
              id: 8,
              radio1: 1,
              name: '为空',
              type: 'radio'
            },
            {
              id: 11,
              radio1: 2,
              name: '不为空',
              type: 'radio'
            },
            {
              id: 1,
              radio1: 3,
              name: '等于',
              type: 'radio'
            },
            {
              id: 9,
              radio1: 4,
              name: '不等于',
              type: 'radio'
            },
            {
              id: 3,
              radio1: 5,
              name: '早于',
              type: 'radio'
            },
            {
              id: 4,
              radio1: 6,
              name: '早于(含)',
              type: 'radio'
            },
            {
              id: 5,
              radio1: 7,
              name: '晚于',
              type: 'radio'
            },
            {
              id: 6,
              radio1: 8,
              name: '晚于(含)',
              type: 'radio'
            },
            {
              id: 12,
              name: '输入框',
              radio1: 6,
              textval: '',
              type: 'input',
              ishow: false
            },
            {
              id: 13,
              name: '选择框',
              textval: '',
              type: 'select',
              ishow: false
            },
            {
              id: 14,
              name: '选择框',
              textval: '',
              optionsDate: [],
              type: 'selects',
              ishow: false
            }
          ]
        },
        {
          id: 10,
          number: -8,
          name: '邮箱',
          text: 'email',
          checked: false,
          child: [
            {
              id: 8,
              name: '为空',
              radio1: 20,
              type: 'radio'
            },
            {
              id: 11,
              name: '不为空',
              radio1: 21,
              type: 'radio'
            },
            {
              id: 1,
              name: '等于',
              radio1: 22,
              textval: '',
              type: 'radio'
            },
            {
              id: 9,
              name: '不等于',
              radio1: 23,
              textval: '',
              type: 'radio'
            },
            {
              id: 2,
              name: '包含',
              radio1: 24,
              textval: '',
              type: 'radio'
            },
            {
              id: 12,
              name: '不包含',
              radio1: 25,
              textval: '',
              type: 'radio'
            },
            {
              id: 12,
              name: '输入框',
              radio1: 6,
              textval: '',
              type: 'input',
              ishow: false
            }
          ]
        },
        {
          id: 12,
          number: -9,
          name: '性别',
          text: 'gender',
          checked: false,
          child: [
            {
              id: 8,
              radio1: 1,
              name: '为空',
              type: 'radio'
            },
            {
              id: 11,
              radio1: 2,
              name: '不为空',
              type: 'radio'
            },
            {
              id: 1,
              radio1: 3,
              name: '等于',
              type: 'radio'
            },
            {
              id: 9,
              radio1: 4,
              name: '不等于',
              type: 'radio'
            },
            {
              id: 9,
              radio1: 4,
              name: '单选框',
              type: 'radioSex',
              ishow: false
            }
          ]
        },
        {
          id: 13,
          number: -10,
          name: '生日',
          text: 'birthday',
          checked: false,
          child: [
            {
              id: 8,
              radio1: 1,
              name: '为空',
              type: 'radio'
            },
            {
              id: 11,
              radio1: 2,
              name: '不为空',
              type: 'radio'
            },
            {
              id: 1,
              radio1: 3,
              name: '等于',
              type: 'radio'
            },
            {
              id: 9,
              radio1: 4,
              name: '不等于',
              type: 'radio'
            },
            {
              id: 3,
              radio1: 5,
              name: '早于',
              type: 'radio'
            },
            {
              id: 4,
              radio1: 6,
              name: '早于(含)',
              type: 'radio'
            },
            {
              id: 5,
              radio1: 7,
              name: '晚于',
              type: 'radio'
            },
            {
              id: 6,
              radio1: 8,
              name: '晚于(含)',
              type: 'radio'
            },
            {
              id: 12,
              name: '输入框',
              radio1: 6,
              textval: '',
              type: 'input',
              ishow: false
            },
            {
              id: 13,
              name: '选择框',
              textval: '',
              type: 'select',
              ishow: false
            },
            {
              id: 14,
              name: '选择框',
              textval: '',
              optionsDate: [],
              type: 'selects',
              ishow: false
            }
          ]
        },
        {
          id: 14,
          number: -11,
          name: '语言',
          text: 'language',
          checked: false,
          child: [
            {
              id: 8,
              radio1: 1,
              name: '为空',
              type: 'radio'
            },
            {
              id: 11,
              radio1: 2,
              name: '不为空',
              type: 'radio'
            },
            {
              id: 1,
              radio1: 3,
              name: '等于',
              type: 'radio'
            },
            {
              id: 9,
              radio1: 4,
              name: '不等于',
              type: 'radio'
            },
            {
              id: 9,
              radio1: 5,
              name: '语言框',
              textval: '',
              type: 'language',
              ishow: false
            }
          ]
        },
        {
          id: 15,
          number: -12,
          name: '关注来源',
          text: 'subscribescene',
          checked: false,
          child: [
            {
              id: '8',
              radio1: 1,
              name: '为空',
              type: 'radio'
            },
            {
              id: 11,
              radio1: 2,
              name: '不为空',
              type: 'radio'
            },
            {
              id: 1,
              radio1: 3,
              name: '等于',
              type: 'radio'
            },
            {
              id: 9,
              radio1: 4,
              name: '不等于',
              type: 'radio'
            },
            {
              id: 5,
              radio1: 4,
              name: '关注来源',
              type: 'attention',
              ishow: false
            }
          ]
        },
        {
          id: 18,
          number: -13,
          name: '标签',
          text: 'tag',
          checked: false,
          child: [
            {
              id: 8,
              radio1: 1,
              name: '为空',
              type: 'radio'
            },
            {
              id: 11,
              radio1: 2,
              name: '不为空',
              type: 'radio'
            },
            {
              id: 2,
              radio1: 3,
              name: '包含',
              type: 'radio'
            },
            {
              id: 12,
              radio1: 4,
              name: '不包含',
              type: 'radio'
            },
            {
              id: 12,
              radio1: 5,
              name: '标签',
              type: 'labels',
              ishow: false
            }
          ]
        }
      ],
      // 关注来源
      sourcelist: [
        {
          id: 'ADD_SCENE_SEARCH',
          name: '公众号搜索 '
        },
        {
          id: 'ADD_SCENE_ACCOUNT_MIGRATION',
          name: '公众号迁移'
        },
        {
          id: 'ADD_SCENE_PROFILE_CARD',
          name: '名片分享'
        },
        {
          id: 'ADD_SCENE_QR_CODE',
          name: '扫描二维码 '
        },
        {
          id: 'ADD_SCENEPROFILE LINK',
          name: '图文页内名称点击'
        },
        {
          id: 'ADD_SCENE_PROFILE_ITEM',
          name: '图文页右上角菜单'
        },
        {
          id: 'ADD_SCENE_PAID',
          name: '支付后关注'
        },
        {
          id: 'ADD_SCENE_OTHERS',
          name: '其他'
        }
      ]
    }
  },
  computed: {
    /**
     * 实例创建完成后被立即调用
     */
  },
  created() {
    console.log('我的返回值', this.childid)
    this.getLanguageInterface()
    this.labelInterface()
    for (let i = 1; i < 13; i++) {
      this.options.push({
        value: i,
        label: i
      })
    }
    if (this.childid[ 0 ].entrys.length > 0) {
      this.echoDate()
    }
  },
  mounted() {
    /**
     * 初始化数据
     * 挂在完成以后也就是模板渲染完成以后才会被调用
     * 一般是用来向后端发起请求拿到数据以后做一些业务处理
     */
  },
  beforeDestroy() { },
  updated() {
    // 更新完成后
  },
  methods: {
    // 获取语言接口
    getLanguageInterface() {
      this.imgList = []
      GetMaterial({}).then(
        res => {
          console.log('接口', res)
          if (res.code === 0) {
            if (res.data) {
              this.imgList = res.data
              console.log(this.imgList)
            }
          }
        }
      )
    },
    labelInterface() {
      this.labelData = []
      FilterMaterial({}).then(
        res => {
          console.log('接口2', res)
          if (res.code === 0) {
            if (res.data) {
              this.labelData = res.data
              console.log(this.labelData)
            }
          }
        }
      )
    },

    // 回显你的数据
    echoDate() {
      this.list_one = []
      this.type = this.childid[ 0 ].type
      this.memberlist.forEach(item => {
        this.childid[ 0 ].entrys.forEach(initem => {
          if (item.text == initem.name) {
            item.checked = true
            this.list_one.push(item)
            item.child.forEach(element => {
              if (initem.mode == element.id) {
                item.number = element.radio1
                if (
                  (item.name == '姓名' ||
                    item.name == '手机号码' ||
                    item.name == '微信昵称' ||
                    item.name == '邮箱') &&
                  (element.name == '等于' ||
                    element.name == '不等于' ||
                    element.name == '包含' ||
                    element.name == '不包含')
                ) {
                  this.echoJudge(item.name, initem.value)
                }
                if (
                  (item.name == '微信关注时间' ||
                    item.name == '系统注册时间' ||
                    item.name == '生日') &&
                  (element.name == '等于' ||
                    element.name == '不等于' ||
                    element.name == '早于' ||
                    element.name == '早于(含)' ||
                    element.name == '晚于' ||
                    element.name == '晚于(含)')
                ) {
                  this.echoJudge(item.name, initem.value)
                }
                if (
                  item.name == '地区' &&
                  (element.name == '等于' || element.name == '不等于')
                ) {
                  // 回显的省市区因为是name但是插件用的是id所以暂放
                  this.echoJudge(item.name, initem.value)
                }
                if (
                  item.name == '性别' &&
                  (element.name == '等于' || element.name == '不等于')
                ) {
                  this.echoJudge(item.name, initem.value)
                }
                if (
                  item.name == '语言' &&
                  (element.name == '等于' || element.name == '不等于')
                ) {
                  this.echoJudge(item.name, initem.value)
                }
                if (
                  item.name == '关注来源' &&
                  (element.name == '等于' || element.name == '不等于')
                ) {
                  this.echoJudge(item.name, initem.value)
                }
                if (
                  item.name == '标签' &&
                  (element.name == '包含' || element.name == '不包含')
                ) {
                  this.echoJudge(item.name, initem.value)
                }
              }
            })
          }
        })
      })
    },

    echoJudge(name, val) {
      this.memberlist.map(res => {
        if (res.name == name) {
          res.child.map(item => {
            if (item.type == 'input') {
              item.ishow = true
              if (
                name == '微信关注时间' ||
                name == '系统注册时间' ||
                name == '生日'
              ) {
                item.textval = val.split('-')[ 0 ]
              } else {
                item.textval = val
              }
            }
            if (item.type == 'select') {
              item.ishow = true
              item.textval = val.split('-')[ 1 ]
            }
            if (item.type == 'selects') {
              item.ishow = true
              item.textval = val.split('-')[ 2 ]
            }
            if (item.type == 'citys') {
              item.ishow = true
              // this.addressValue;
            }
            if (item.type == 'radioSex') {
              item.ishow = true
              this.radio = val
            }
            if (item.type == 'language') {
              item.ishow = true
              this.language = val
            }
            if (item.type == 'attention') {
              item.ishow = true
              this.attention = val
            }
            if (item.type == 'labels') {
              item.ishow = true
              this.labels = val
            }
          })
        }
      })
    },
    checkId(type, name, list, index) {
      // 你选中的筛选条件
      if (type == 1) {
        if (this.BatchLabeling.indexOf(list.text) != -1) {
          //   //!= -1时代表这个数组里面 有 这个值 (有值的时候删除)
          this.removeByValue(this.BatchLabeling, list.text)
          for (let i = 0; i < this.list_one.length; i++) {
            if (this.list_one[ i ].name == name) {
              // 二级参数放置处
              this.list_one.splice(i, 1)
            }
          }

          list.number =
            (index + 1) * -1 /** 你取消一级的时候,二级相应选中的取消 */
          list.child.map(res => {
            res.ishow = false
            res.textval = ''
          })
          for (let i = 0; i < this.screenArray[ 0 ].entrys.length; i++) {
            // 给后台传过去的参数
            if (this.screenArray[ 0 ].entrys[ i ].name == list.text) {
              this.screenArray[ 0 ].entrys.splice(i, 1)
            }
          }
        } else {
          this.BatchLabeling.push(list.text)
          this.list_one.push(list)
        }
      } else if (type == 2) {
        // 当点击下一级的时候怎样拿到他的父级信息
        if (
          ((name == '姓名' ||
            name == '手机号码' ||
            name == '微信昵称' ||
            name == '邮箱') &&
            (list.name == '等于' ||
              list.name == '不等于' ||
              list.name == '包含' ||
              list.name == '不包含')) ||
          ((name == '微信关注时间' ||
            name == '系统注册时间' ||
            name == '生日') &&
            (list.name == '等于' ||
              list.name == '不等于' ||
              list.name == '早于' ||
              list.name == '早于(含)' ||
              list.name == '晚于' ||
              list.name == '晚于(含)'))
        ) {
          this.Judge(name, this.list_one, 'input', true)
        } else {
          this.Judge(name, this.list_one, 'input', false)
        }
        if (
          (name == '微信关注时间' ||
            name == '系统注册时间' ||
            name == '生日') &&
          (list.name == '等于' ||
            list.name == '不等于' ||
            list.name == '早于' ||
            list.name == '早于(含)' ||
            list.name == '晚于' ||
            list.name == '晚于(含)')
        ) {
          this.list_one.map(res => {
            if (name == res.name) {
              res.child.map(val => {
                if (val.type == 'select' || val.type == 'selects') {
                  val.ishow = true
                }
              })
            }
          })
        } else {
          this.list_one.map(res => {
            if (name == res.name) {
              res.child.map(val => {
                if (val.type == 'select' || val.type == 'selects') {
                  val.ishow = false
                  val.textval = ''
                }
              })
            }
          })
        }

        if (name == '地区' && (list.name == '等于' || list.name == '不等于')) {
          this.Judge(name, this.list_one, 'citys', true)
        } else if (
          name == '地区' &&
          (list.name != '等于' || list.name != '不等于')
        ) {
          this.Judge(name, this.list_one, 'citys', false)
          this.addressValue = []
        }

        if (name == '性别' && (list.name == '等于' || list.name == '不等于')) {
          this.Judge(name, this.list_one, 'radioSex', true)
        } else if (
          name == '性别' &&
          (list.name != '等于' || list.name != '不等于')
        ) {
          this.Judge(name, this.list_one, 'radioSex', false)
          this.radio = ''
        }

        if (name == '语言' && (list.name == '等于' || list.name == '不等于')) {
          this.Judge(name, this.list_one, 'language', true)
        } else if (
          name == '语言' &&
          (list.name != '等于' || list.name != '不等于')
        ) {
          this.Judge(name, this.list_one, 'language', false)
          this.language = ''
        }

        if (
          name == '关注来源' &&
          (list.name == '等于' || list.name == '不等于')
        ) {
          this.Judge(name, this.list_one, 'attention', true)
        } else if (
          name == '关注来源' &&
          (list.name != '等于' || list.name != '不等于')
        ) {
          this.Judge(name, this.list_one, 'attention', false)
          this.attention = ''
        }

        if (name == '标签' && (list.name == '包含' || list.name == '不包含')) {
          this.Judge(name, this.list_one, 'labels', true)
        } else if (
          name == '标签' &&
          (list.name != '包含' || list.name != '不包含')
        ) {
          this.Judge(name, this.list_one, 'labels', false)
          this.labels = ''
        }
      }
    },
    getCheckValue() {
      // 省市区
      console.log(this.addressValue)
    },

    selectId(list, val) {
      // 下拉框 通过月显示日
      console.log(list)
      this.list_one
      for (let i = 0; i < this.list_one.length; i++) {
        if (list.name == this.list_one[ i ].name) {
          this.list_one[ i ].child.map(res => {
            if (res.type == 'selects') {
              res.optionsDate = []
              for (let j = 1; j < 32; j++) {
                res.optionsDate.push({
                  value: j,
                  label: j
                })
              }
            }
          })
        }
      }
    },

    Judge(name, list, text, trueFalse) {
      // 判断
      list.map(res => {
        if (name == res.name) {
          res.child.map(val => {
            if (val.type == text) {
              val.ishow = trueFalse
              if (!trueFalse) {
                val.textval = ''
              }
            }
          })
        }
      })
    },

    sure() {
      // 点击确认筛选条件
      this.screenArray.type = this.type
      this.screenArray[ 0 ].entrys = []
      for (let i = 0; i < this.list_one.length; i++) {
        this.screenArray[ 0 ].entrys.push({
          name: this.list_one[ i ].text, // 显示一级英文名称
          mode: '', // 显示二级id
          value: '' // 显示二级后的 拼接
        })
        this.list_one[ i ].child.forEach(item => {
          if (this.list_one[ i ].number == item.radio1) {
            this.screenArray[ 0 ].entrys[ i ].mode = item.id
          }
        })
      }

      this.screenArray[ 0 ].entrys.map(res => {
        if (
          res.name == 'name' ||
          res.name == 'phone' ||
          res.name == 'nickname' ||
          res.name == 'email'
        ) {
          // 姓名 手机号码 微信昵称 邮箱
          if (res.mode) {
            this.memberlist.map(inres => {
              if (res.name == inres.text) {
                inres.child.map(item => {
                  if (item.type == 'input') {
                    res.value = item.textval
                  }
                })
              }
            })
          }
        } else if (
          res.name == 'subscribetime' ||
          res.name == 'registertime' ||
          res.name == 'birthday'
        ) {
          // 微信关注时间 系统注册时间 生日
          if (res.mode) {
            const value = []
            this.memberlist.map(inres => {
              if (res.name == inres.text) {
                inres.child.map(item => {
                  if (item.ishow) {
                    value.push(item.textval)
                  }
                })
              }
            })
            res.value = value.join('-')
          }
        } else if (res.name == 'location') {
          // 调用插件正在调; 地区
        } else if (res.name == 'gender' && res.mode) {
          // 性别
          res.value = this.radio
        } else if (res.name == 'language' && res.mode) {
          // 语言
          res.value = this.language
        } else if (res.name == 'subscribescene' && res.mode) {
          // 关注来源
          res.value = this.attention
        } else if (res.name == 'tag' && res.mode) {
          // 标签
          res.value = this.labels
        }
      })
      console.log(this.screenArray, this.memberlist)

      this.$emit('getFilter', this.screenArray)
    },

    removeByValue(arr, val) {
      // 删除数组给定的值
      for (var i = 0; i < arr.length; i++) {
        if (arr[ i ] == val) {
          arr.splice(i, 1)
          break
        }
      }
      return arr
    },
    del(list) {
      // 点击右侧删除按钮
      for (let i = 0; i < this.list_one.length; i++) {
        // 删除这一项
        if (this.list_one[ i ].text == list.text) {
          this.list_one.splice(i, 1)
        }
      }
      if (this.BatchLabeling.indexOf(list.text) != -1) {
        // 删掉数组里的相同一项
        this.removeByValue(this.BatchLabeling, list.text)
      }
      this.memberlist.forEach(item => {
        // true 换成false
        if (item.text == list.text) {
          item.checked = false
        }
      })

      for (let i = 0; i < this.screenArray[ 0 ].entrys.length; i++) {
        // 后台传入的参数删除
        if (this.screenArray[ 0 ].entrys[ i ].name == list.text) {
          this.screenArray[ 0 ].entrys.splice(i, 1)
        }
      }
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
.interval_padding {
  margin: 10px 0;
}
.btn_wid {
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.del {
  float: right;
  padding: 10px;
  color: #f56c6c;
  cursor: pointer;
}
</style>

