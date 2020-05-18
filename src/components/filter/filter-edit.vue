<template>
  <div>
    <el-row v-for="(item, index) in conditions" :key="index" class="box-term">
      <div class="term-h2">
        <span v-if="index > 0">或</span>
        <span v-if="index == 0">&nbsp;&nbsp;&nbsp;</span>
        条件{{ index + 1 }}
      </div>
      <div class="term-div">
        <div v-for="(itm, idx) in item.entrys" :key="idx" class="term-cent">
          <div v-if="filterType.type == 1" class="term-p4" @click="filterEdit(index, idx, itm, 99)">
            <i style="cursor: pointer;" class="el-icon-edit-outline term-edit-outline" />
          </div>
          <div class="term-p2">
            <span v-if="idx > 0 && idx < item.entrys.length">且</span>
            {{ itm.title1 }} {{ itm.title2 }} {{ itm.title3 }}
          </div>
        </div>
      </div>
      <div v-if="filterType.type == 1" class="term-p3" @click="filterDel(index)"> 删 除 </div>
    </el-row>
    <el-button v-if="filterType.type == 1" size="mini" type="primary" @click="condition(0)">添加筛选条件</el-button>
    <el-dialog title="条件" width="80%" :visible.sync="dialogFormVisible" :modal-append-to-body="true">
      <div>
        <!-- 提示语 -->
        <el-row class="btn_wid">
          <el-alert title="请选择需要筛选的条件" type="info" :closable="false" />
          <!-- 会员or非会员(暂时只提供会员) -->
          <el-radio-group v-model="radio" style="margin:10px 0;" size="small" @change="membermember">
            <el-radio border :label="1">会 员</el-radio>
            <el-radio border disabled :label="2">非会员</el-radio>
            <el-radio border :label="3">会员行为</el-radio>
          </el-radio-group>
        </el-row>
        <el-row class="btn_wid">
          <!-- 循环总共有多少筛选条件(父项) -->
          <el-col v-for="(item, index) in filterList" :key="index" :span="4">
            <el-checkbox v-model="item.checked" size="mini" class="interval_padding" :label="item.name" border
              @change="checkId(1, item.name, item.text, item, index)" />
          </el-col>
        </el-row>
        <el-row>
          <div v-for="(item, index) in list_one" :key="index" class="sty-list">
            <!-- 显示你选中的是哪一项↓ -->
            <div class="sty-list-title">{{ item.name }}:</div>
            <!-- 你选中的某项的具体内容↓ -->
            <div class="sty-list-btn">
              <div v-for="(itm, idx) in item.child" :key="idx" class="col-radio">
                <el-radio v-if="itm.type == 'radio'" v-model="item.number" size="mini" :label="itm.radio1" border
                  @change="checkId(2, item.name, item.text, itm, index)">{{ itm.name }}</el-radio>
                <!-- input框(姓名 手机号码 微信昵称 微信关注时间 邮箱 ) 只有特定的条件才会显示 -->
                <el-input v-if="itm.type == 'input' && item.number > 2" v-model="itm.textval" size="mini"
                  placeholder="请输入内容" clearable />
                <!-- 日期(微信关注时间 系统注册时间)隐藏内容 -->
                <el-date-picker v-if="itm.type == 'datetime' && item.number > 2" v-model="itm.textval" size="mini"
                  type="date" value-format="yyyy-MM-dd" placeholder="选择日期时间" />
                <!-- 生日 -->
                <el-date-picker v-if="itm.type == 'birthdaytime' && item.number > 2" v-model="itm.textval" size="mini"
                  type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
                <!-- 省市区(地区) -->
                <el-cascader v-if="itm.type == 'citys' && item.number > 2" v-model="itm.textval" size="mini"
                  :options="propsData" :props="{ checkStrictly: true }" @change="handleChange">
                  <template slot-scope="{ node, data }">
                    <span>{{ data.addressName }}</span>
                  </template>
                </el-cascader>
                <!-- 性别 -->
                <el-radio-group v-if="itm.type == 'radioSex' && item.number > 2" v-model="itm.textval"
                  style="width:200px;margin-top:10px;">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                  <el-radio :label="3">未知</el-radio>
                </el-radio-group>
                <!-- 语言 -->
                <el-select v-if="itm.type == 'language' && item.number > 2" v-model="itm.textval" size="mini" clearable
                  placeholder="请选择">
                  <el-option v-for="initem in imgList" :key="initem.value" :label="initem.cnName"
                    :value="initem.enName" />
                </el-select>
                <!-- 关注来源 -->
                <el-select v-if="itm.type == 'attention' && item.number > 2" v-model="itm.textval" size="mini" clearable
                  placeholder="请选择">
                  <el-option v-for="initem in sourcelist" :key="initem.value" :label="initem.name" :value="initem.id" />
                </el-select>
                <!-- 标签 multiple -->
                <el-select v-if="itm.type == 'labels' && item.number > 2" v-model="itm.textval" size="mini" clearable
                  placeholder="请选择标签">
                  <el-option v-for="initem in labelData" :key="initem.id" :label="initem.tagName" :value="initem.id" />
                </el-select>
                <!-- 是否为充值用户 -->
                <el-radio-group v-if="itm.type == 'depositedRadio' && item.number > 2" v-model="itm.textval"
                  style="width:200px;margin-top:10px;">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
                <div>
                  <i v-if="itm.type == 'modify'" class="el-icon-plus icon-sty icon-sty1"
                    @click="clickAdd(index, item)" />
                  <i v-if="itm.type == 'modify'" class="
                 el-icon-close icon-sty icon-sty2" @click="clickDel(index, item)" />
                </div>
              </div>
            </div>
          </div>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="clickSure()">确 定</el-button>
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetMaterial, FilterMaterial, CityList } from '@/api/member/filter'
import FilterData from './filter-data'
import JudeType from './jude-type'
import { Getcity } from '../../api/common'
export default {
  components: {},
  props: ['childid'],
  data () {
    return {
      radio: 1,
      judgement: 0,
      first: 0,
      last: 0,
      dialogFormVisible: false,
      checked1: '',
      filterList: [], // 此变量放置初始数据
      list_one: [], // 放置你选择的哪些具体数据
      BatchLabeling: [], // 放置你选中的父级的名称(英文名称)
      imgList: [], // 获取语言参数放置处
      labelData: [], // 标签参数放置处
      propsData: [], // 省市区调取拿到的接口参数放置处
      conditions: [], // 给父组件传过去的参数放置处
      fatherSonData: [], // 父传子参数放置处
      fatherSonJudge: false, // 父传子参数放置处
      status: 0,
      memberArray: [],
      sunMoney: [],
      judeType: [],
      // 关注来源
      sourcelist: [
        {
          id: 'ADD_SCENE_SEARCH',
          name: '公众号搜索 ',
        },
        {
          id: 'ADD_SCENE_ACCOUNT_MIGRATION',
          name: '公众号迁移',
        },
        {
          id: 'ADD_SCENE_PROFILE_CARD',
          name: '名片分享',
        },
        {
          id: 'ADD_SCENE_QR_CODE',
          name: '扫描二维码 ',
        },
        {
          id: 'ADD_SCENEPROFILE LINK',
          name: '图文页内名称点击',
        },
        {
          id: 'ADD_SCENE_PROFILE_ITEM',
          name: '图文页右上角菜单',
        },
        {
          id: 'ADD_SCENE_PAID',
          name: '支付后关注',
        },
        {
          id: 'ADD_SCENE_OTHERS',
          name: '其他',
        },
      ],
      filterType: '',
    }
  },
  computed: {},
  watch: {},
  created () {
    this.filterType = JSON.parse(sessionStorage.getItem('filterOptions'))
    this.filterList = JSON.parse(JSON.stringify(FilterData))
    this.memberArray = JSON.parse(JSON.stringify(JudeType)).memberArray;
    this.sunMoney = JSON.parse(JSON.stringify(JudeType)).sunMoney;
    this.init()
    // 当发现父组件给传过来是个空的对象时候代表是新增状态反之亦然
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    membermember () {
      // 点击切换会员or会员行为
      console.log(this.radio, '点击切换会员or会员行为')
      if (this.radio == 1) {
        this.filterList = JSON.parse(JSON.stringify(FilterData))
      } else {
        this.filterList = JSON.parse(JSON.stringify(JudeType)).tabledata
      }
      this.BatchLabeling = [];
      this.list_one = [];
    },
    async init () {
      await this.getLanguageInterface()
      await this.labelInterface()
      const data = await this.cityListInterface() // 公共接口成功调用之后
      if (data) {
        if (this.childid[0].entrys.length == 0) {
          // 新增
          this.fatherSonJudge = false
          this.fatherSonData = this.childid
        } else {
          // 编辑
          this.fatherSonJudge = true
          this.fatherSonData = this.childid
          this.fatherSonHandle(this.fatherSonData)
        }
      }
    },
    // 获取语言接口
    async getLanguageInterface () {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      this.imgList = []
      const res = await GetMaterial({})
      if (res) {
        loading.close()
        if (res.code === 0) {
          if (res.data) {
            this.imgList = res.data
            return new Promise((resolve, reject) => {
              resolve(true)
            })
          }
        }
      }
    },
    async labelInterface () {
      // 获取所有的标签
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      this.labelData = []
      const res = await FilterMaterial({
        page: 1,
        size: 1000,
      })
      if (res) {
        loading.close()
        if (res.code === 0) {
          if (res.data) {
            this.labelData = res.data.data
            console.log('标签', this.labelData)
            return new Promise((resolve, reject) => {
              resolve(true)
            })
          }
        }
      }
    },
    // s\省市区接口
    async cityListInterface () {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      const res = await CityList({})
      if (res) {
        loading.close()
        if (res.code == 0) {
          const data = res.data
          this.provinceCity(data)
          return new Promise((resolve, reject) => {
            resolve(true)
          })
        }
      }
    },
    // 处理省市区返回的参数用来在页面上显示和传输
    provinceCity (list) {
      list.map((res) => {
        res.label = res.addressName
        res.value = res.addressName
        res.children.map((item) => {
          item.label = item.addressName
          item.value = item.addressName
          item.children.map((initem) => {
            initem.label = initem.addressName
            initem.value = initem.addressName
          })
        })
      })
      this.propsData = list
    },
    handleChange () {
      console.log('你是在什么时候触发的?')
    },
    /**
     * 注释： (回显1)
     * 通过他的英文名字和id来获取到他的中文名和id
     */
    fatherSonHandle (data) {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      const array = []
      data.map((res) => {
        loading.close()
        const arrayobj = []
        res.entrys.map((item) => {
          const options = {}
          switch (item.name) {
            case 'name':
              options.title1 = '姓名'
              options.transfer1 = item.name
              break
            case 'phone':
              options.title1 = '手机号码'
              options.transfer1 = item.name
              break
            case 'nickname':
              options.title1 = '微信昵称'
              options.transfer1 = item.name
              break
            case 'headimgurl':
              options.title1 = '微信头像'
              options.transfer1 = item.name
              break
            case 'subscribeTimeInt':
              options.title1 = '微信关注时间'
              options.transfer1 = item.name
              break
            case 'location':
              options.title1 = '地区'
              options.transfer1 = item.name
              break
            case 'registerTime':
              options.title1 = '系统注册时间'
              options.transfer1 = item.name
              break
            case 'email':
              options.title1 = '邮箱'
              options.transfer1 = item.name
              break
            case 'gender':
              options.title1 = '性别'
              options.transfer1 = item.name
              break
            case 'birthday':
              options.title1 = '生日'
              options.transfer1 = item.name
              break
            case 'language':
              options.title1 = '语言'
              options.transfer1 = item.name
              break
            case 'subscribescene':
              options.title1 = '关注来源'
              options.transfer1 = item.name
              break
            case 'tag':
              options.title1 = '标签'
              options.transfer1 = item.name
              break
            case 'programFirstTime':
              options.title1 = '首次登陆小程序时间'
              options.transfer1 = item.name
              break
            case 'programLastTime':
              options.title1 = '最后一次登录小程序时间'
              options.transfer1 = item.name
              break
            case 'memberData.orderLastFinishTime':
              options.title1 = '最后交易时间'
              options.transfer1 = item.name
              break
            case 'memberData.orderTotal':
              options.title1 = '订单总数'
              options.transfer1 = item.name
              break
            case 'memberData.orderPayTotal':
              options.title1 = '已支付订单总数'
              options.transfer1 = item.name
              break
            case 'memberData.orderAmount':
              options.title1 = '订单支付总金额'
              options.transfer1 = item.name
              break
            case 'memberData.orderAmountAvg':
              options.title1 = '订单平均支付金额'
              options.transfer1 = item.name
              break
            case 'depositAmount':
              options.title1 = '累计充值金额'
              options.transfer1 = item.name
              break
            case 'deposited':
              options.title1 = '是否为充值用户'
              options.transfer1 = item.name
              break
          }
          const mode = parseInt(item.mode)
          switch (mode) {
            case 1:
              options.transfer2 = 1
              options.title2 = '等于'
              options.radio1 = 3
              break
            case 2:
              options.transfer2 = 2
              options.title2 = '包含'
              options.radio1 = 5
              break
            case 3:
              options.transfer2 = 3
              options.title2 = '早于'
              options.radio1 = 5
              break
            case 4:
              options.transfer2 = 4
              options.title2 = '早于(含)'
              options.radio1 = 6
              break
            case 5:
              options.transfer2 = 5
              options.title2 = '晚于'
              options.radio1 = 7
              break
            case 6:
              options.transfer2 = 6
              options.title2 = '晚于(含)'
              options.radio1 = 8
              break
            case 8:
              options.transfer2 = 8
              options.title2 = '为空'
              options.radio1 = 1
              break
            case 9:
              options.transfer2 = 9
              options.title2 = '不等于'
              options.radio1 = 4
              break
            case 11:
              options.transfer2 = 11
              options.title2 = '不为空'
              options.radio1 = 2
              break
            case 12:
              options.transfer2 = 12
              options.title2 = '不包含'
              options.radio1 = 6
              break
          }
          if (
            mode == 5 &&
            (item.name == 'memberData.orderTotal' ||
              item.name == 'memberData.orderPayTotal' ||
              item.name == 'memberData.orderAmount' ||
              item.name == 'memberData.orderAmountAvg' ||
              item.name == 'depositAmount')
          ) {
            options.transfer2 = 5
            options.title2 = '大于'
            options.radio1 = 7
          }
          if (
            mode == 3 &&
            (item.name == 'memberData.orderTotal' ||
              item.name == 'memberData.orderPayTotal' ||
              item.name == 'memberData.orderAmount' ||
              item.name == 'memberData.orderAmountAvg' ||
              item.name == 'depositAmount')
          ) {
            options.transfer2 = 3
            options.title2 = '小于'
            options.radio1 = 5
          }
          if (item.value) {
            // 返回的对象里面有value值的时候才赋值
            options.value = item.value
          }
          arrayobj.push(options)
        })
        array.push(arrayobj)
      })
      this.handleJudge(array)
    },
    handleJudge (list) {
      // 这里你只要处理隐藏部分显示的时候的值就即可 (回显2)
      this.conditions = []
      list.map((res) => {
        // let entrys = [];
        res.map((item) => {
          if (item.radio1 > 2) {
            // >2为隐藏部分显示这个时候你也要把值赋予给他
            console.log('----------', item)
            if (item.transfer1 == 'gender') {
              item.title3 = item.value == '1' ? '男' : item.value == '2' ? '女' : '未知'
              item.transfer3 = item.value
            } else if (item.transfer1 == 'language') {
              item.transfer3 = item.value
              this.imgList.map((initem) => {
                if (item.value == initem.enName) {
                  item.title3 = initem.cnName
                }
              })
            } else if (item.transfer1 == 'subscribescene') {
              item.transfer3 = item.value
              this.sourcelist.map((initem) => {
                if (initem.id == item.value) {
                  item.title3 = initem.name
                }
              })
            } else if (item.transfer1 == 'tag') {
              item.transfer3 = item.value
              this.labelData.map((initem) => {
                if (item.value == initem.id) {
                  item.title3 = initem.tagName
                }
              })
            } else if (item.transfer1 == 'deposited') {
              item.title3 = item.value ? '是' : '否'
              item.transfer3 = !!item.value
            } else if (item.transfer1 == 'subscribeTimeInt') {
              // item.transfer1 == 'registerTime' || 
              let times = item.value ? JSON.parse(JSON.stringify(item.value)).toString() : '';
              if (times) {
                // times = times.slice(0, 4) + '-' + times.slice(4, 2) + '-' + times.slice(6)
                times = times.slice(0, 4) + '-' + times.slice(4)
                times = times.slice(0, 7) + '-' + times.slice(7)
              }
              item.title3 = times // 回显
              item.transfer3 = item.value // 后台要数据
              console.log(item, '---这个是时间处理函数---', times)
            } else if (this.sunMoney.indexOf(item.transfer1) != -1) { // 金额处理
              item.title3 = ((item.value / 100).toFixed(2)) * 1 // 回显
              item.transfer3 = item.value // 后台要数据
            } else {
              item.title3 = item.value
              item.transfer3 = item.value
            }
          }
        })
        this.conditions.push({
          entrys: res,
        })
      })
      console.log(this.conditions, 'this.conditions')
    },

    // 以上为回显做的逻辑编辑 ↑

    // 以下为选中状态做的逻辑编辑↓
    /**
     * 点击添加筛选按钮显示弹框(第一步)
     */
    condition (type) {
      // 每次点击显示弹框之前都要清空数据
      this.radio = 1;
      this.judgement = type
      this.dialogFormVisible = true
      this.filterList = JSON.parse(JSON.stringify(FilterData))
      this.BatchLabeling = []
      this.list_one = []
    },
    /**
     * 点击选择复选框/单选框进行条件筛选(第二步)
     * 注释：
     * type 为父级或子集的check框，name 为名称 title为英文名称 item 为这个对象 index 第index个对象
     * 0.type=1为选择父条件
     * 1.当你点击弹框里的条件的时候在下方显示你选中的具体数据
     * 2.当你要取消选中的时候就在数组里面删除这个对象
     * 3.当你点击取消父级的一个选项的时候那么相应的子项选中的数据也清除掉。
     * 4.隐藏并清空
     */
    checkId (type, name, title, item, index) {
      // console.log(type, name, title, item, index, '点击了checkbox框======')
      if (type == 1) {
        // 注释0
        if (this.BatchLabeling.indexOf(item.text) != -1) {
          this.removeByValue(this.BatchLabeling, item.text)
          item.number = (index + 1) * -1 // 注释3
          item.child.map((res) => {
            // 注释4
            if (res.textval) {
              res.textval = ''
            }
          })
          for (let i = 0; i < this.list_one.length; i++) {
            if (this.list_one[i].name == name) {
              this.list_one.splice(i, 1)
              i--
            }
          }
        } else {
          this.BatchLabeling.push(item.text)
          this.list_one.push(item) // 注释1
        }
      } else if (type == 2) {
        // 当你点击子项的时候如果number<3那么就证明隐藏部分不显示并清空
        this.list_one.map((res) => {
          if (res.number < 3) {
            res.child.map((item) => {
              if (item.textval) {
                item.textval = ''
              }
            })
          }
        })
      }
      // console.log(this.list_one, this.filterList, '显示我点击之后的数据=====')
    },

    checkData (val) {
      // console.log(val, '选择省市区')
    },
    /**
     * 此为父级点击取消(属于第二步内容)
     */
    removeByValue (arr, val) {
      // 数组里面有相同的删除
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1)
          break
        }
      }
      return arr
    },
    /**
     * 点击弹框里面的确认按钮结束条筛选(最后一步)
     * 注释：
     * 1.当res.number>2证明隐藏部分显示,并且不能为空
     * 2.当res.number<0证明你还没有选择子项,
     * optionArray =[{
     * title1:父级姓名
     * title2:子级姓名
     * title3:扩展字段的名字
     * radio1：子级的radio1
     * transfer1：父级英文名称
     * transfer2：子级的id
     * transfer3：扩展字段内容或id
     * value：扩展字段内容或id
     * array:[{
     * 扩展字段内容或id
     * }]
     * }]
     */
    clickSure () {
      let type = 0
      let type1 = 0
      let type2 = 0
      let type3 = 0
      const optionArray = []
      this.list_one.map((res) => {
        const option = {}
        const array = []
        if (res.number > 2) {
          // 注释1
          res.child.map((item) => {
            const reg = /.*\..*/
            if (item.ishow && item.textval == '') {
              // !item.textval的时候证明是需要抛异常的。
              type += 1
            }
            // 订单总数/已支付订单总数必须为整数↓
            if (
              item.ishow &&
              item.textval != parseInt(item.textval) &&
              (res.text == 'memberData.orderTotal' || res.text == 'memberData.orderPayTotal')
            ) {
              type2 += 1
            }
            if (
              (res.text == 'memberData.orderAmount' ||
                res.text == 'memberData.orderAmountAvg' ||
                res.text == 'depositAmount') &&
              item.ishow &&
              reg.test(item.textval) &&
              item.textval.split('.')[1].length > 2
            ) {
              type3 += 1
            }
            if (item.ishow) {
              // 不管他里面有没有值我都要拿这个值没有的时候上方已经判定了。
              array.push(item.textval)
            }
            if (res.number == item.radio1) {
              option.title1 = res.name
              option.title2 = item.name
              option.radio1 = res.number
              option.transfer1 = res.text
              option.transfer2 = item.id
            }
          })
        } else if (res.number < 0) {
          // 注释2
          type1 += 1
        } else {
          res.child.map((item) => {
            if (res.number == item.radio1) {
              option.title1 = res.name
              option.title2 = item.name
              option.radio1 = res.number
              option.transfer1 = res.text
              option.transfer2 = item.id
            }
          })
        }
        option.array = array
        optionArray.push(option)
      })
      if (type > 0) {
        // 当发现有隐藏的显示了且你没有填写那么我就抛出异常不允许往下执行
        this.open('请填写完整您所选的条件')
        return
      }
      if (type1 > 0) {
        this.open('请选择您添加的筛选条件')
        return
      }
      if (type2 > 0) {
        this.open('订单总数或已支付订单总数需为整数')
        return
      }
      if (type3 > 0) {
        this.open('金额小数点后最多两位')
        return
      }
      this.dialogFormVisible = false
      console.log('这个地方是判断填写是否违规', optionArray)
      this.judge(optionArray)
    },
    /**
     * 当你点击弹框确认按钮之后把数据按照后台需要格式配置好，并在页面上显示逻辑(最后一步里的处理)
     */
    // 判断
    judge (list) {
      const options = {}
      list.map((res) => {
        const name = res.transfer1
        if (name == 'subscribescene') {
          // 关注来源获取到的是id所以在页面上显示的时候需要查一遍获取到他的name
          this.sourcelist.map((item) => {
            if (res.array[0] == item.id) {
              res.title3 = item.name
              res.transfer3 = item.id
              res.value = item.id
            }
          })
        } else if (name == 'gender') {
          // 性别 因为男为0的时候页面隐藏再显示还默认显示男
          if (res.array.length != 0) {
            res.title3 =
              res.array[0] == 1 ? '男' : res.array[0] == 2 ? '女' : '未知'
            res.transfer3 = res.array[0] == 1 ? 1 : res.array[0] == 2 ? 2 : 0
            res.value = res.array[0] == 1 ? 1 : res.array[0] == 2 ? 2 : 0
          }
        } else if (name == 'language') {
          // 语言与关注来源相同
          this.imgList.map((item) => {
            if (res.array[0] == item.enName) {
              res.title3 = item.cnName
              res.transfer3 = item.enName
              res.value = item.enName
            }
          })
        } else if (name == 'tag') {
          // 标签 (同上) 后台要成 ==>数组形式的[123]
          // let listitle = [];
          this.labelData.map((item) => {
            if (res.array[0] == item.id) {
              res.title3 = item.tagName
              res.value = res.array[0]
              res.transfer3 = res.array
            }
          })
          console.log(res, res.array[0], '标签====标签')
        } else if (name == 'deposited') {
          // 是否为充值用户
          res.title3 = res.array[0] == 1 ? '是' : '否'
          res.transfer3 = res.array[0] == 1 ? 1 : 0
          res.value = res.array[0]
        } else if (name == 'subscribeTimeInt') {
          let times = res.array.length ? JSON.parse(JSON.stringify(res.array[0])) : ''
          res.title3 = res.array.join(',');
          res.transfer3 = times ? times.replace(/[-]/g, "") : '';
          res.value = res.array.join(',');
        } else {
          res.title3 = res.array.join(',')
          res.transfer3 = res.array.join(',')
          res.value = res.array.join(',')
        }
      })
      if (this.judgement == 99) {
        // 99时为点击了编辑
        // 先删除this.conditions[index].entrys[idx]再在this.conditions[index].entrys[idx]后面添加一个
        this.conditions[this.first].entrys.splice(this.last, 1)
        list.map((res) => {
          this.conditions[this.first].entrys.splice(this.last, 0, res)
        })
      } else {
        options.entrys = list
        this.conditions.push(options)
      }

      this.changeType(this.conditions);
      console.log('这个地方是已经处理好的数据', this.conditions)

    },
    // 判断哪些筛选条件需要改变类型
    changeType (data) {
      data.map(item => {
        item.entrys.map(res => {
          if (this.memberArray.indexOf(res.transfer1) != -1) {
            res.transfer3 = res.transfer3 * 1
          }
          if (this.sunMoney.indexOf(res.transfer1) != -1) {
            res.transfer3 = res.transfer3 * 100
          }
        })
      })
      this.$emit('getFilter', data)
    },

    /**
     * 页面上显示你的条件后，你点击了删除按钮
     */
    filterDel (index) {
      // 点击删除你创建的筛选条件
      this.$confirm('确认删除此条件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.conditions.splice(index, 1)
          this.$emit('getFilter', this.conditions)
        })
        .catch(() => { })
    },
    /**
     * 条件生成之后不满意点击了编辑按钮(完成筛选条件之后又再次修改)
     */
    filterEdit (index, idx, list, type) {
      // 点击编辑的时候
      console.log(index, idx, list, '点击了编辑=@')
      this.first = index
      this.last = idx
      this.judgement = type
      this.list_one = []
      this.BatchLabeling = []
      if (list.transfer1 == 'depositAmount' || list.transfer1 == 'deposited') {
        this.radio = 3;
        this.filterList = JSON.parse(JSON.stringify(JudeType)).tabledata
      } else {
        this.radio = 1;
        this.filterList = JSON.parse(JSON.stringify(FilterData)) // 点击编辑的时候把初始数据给他
      }

      this.dialogFormVisible = true // 弹框显示
      this.filterList.map((res) => {
        if (res.text == list.transfer1) {
          res.number = list.radio1
          this.BatchLabeling.push(res.text)
          res.checked = true
          this.list_one.push(res)
          if (list.radio1 > 2) {
            // 只有大于2的时候隐藏部分才会显示也才会有数据
            res.child.map((item) => {
              if (res.text == 'gender' && item.type == 'radioSex') {
                // 性别
                list.value == '0' ? (item.textval = 3) : list.value == 1 ? (item.textval = 1) : (item.textval = 2)
              }
              if (res.text == 'location' && item.type == 'citys') {
                // 省市区
                item.textval = list.value.split(',')
              }
              if (res.text == 'tag' && item.type == 'labels') {
                item.textval = parseInt(list.value)
              }
              if (res.text == 'deposited' && item.type == 'depositedRadio') {
                // 是否为充值用户
                list.value == 1 ? (item.textval = 1) : (item.textval = 2)
              }
              if (item.textval == '' && item.ishow) {
                item.textval = list.value
              }
            })
          }
        }
      })
    },
    /**
     * 在弹框里面又生成一个相同条件的对象
     */
    clickAdd (index, list) {
      // 点击新增一个子类 index 在list_one里面的第index个对象  list这个对象
      // console.log(index, list, '新增一个子类========')
      const filterList = JSON.parse(JSON.stringify(FilterData))
      filterList.map((res) => {
        if (res.text == list.text) {
          res.copys = 1
          this.list_one.splice(index + 1, 0, res)
        }
      })
    },
    /**
     * 弹框里多个相同的一个对象删除
     */
    clickDel (index, list) {
      // 点击删除一个子类
      // console.log(index, list, '删除一个子类========')
      if (list.copys == 1) {
        this.list_one.splice(index, 1)
      }
    },
    open (message) {
      this.$notify({
        title: '警告',
        message: message,
        type: 'warning',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.btn_wid {
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  .interval_padding {
    margin: 10px 0;
  }
}
.sty-list {
  display: flex;
  .sty-list-title {
    width: 130px;
  }
  .sty-list-btn {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }
}
.box-term {
  display: flex;
  margin-bottom: 10px;
  .term-h2 {
    width: 130px;
    font-size: 16px;
  }
  .term-div {
    width: 40%;
    font-size: 15px;
    .term-cent {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      .term-p2 {
        margin-bottom: 4px;
      }
      .term-p4 {
        width: 12px;
        height: 12px;
        color: #409eff;
        margin-right: 10px;
        margin-bottom: 4px;
      }
      .term-edit-outline {
        display: none;
      }
    }
    .term-cent:hover .term-edit-outline {
      display: block;
    }
  }
  .term-p3 {
    margin-left: 20px;
    color: #f56c6c;
    cursor: pointer;
  }
}
.col-radio {
  margin-right: 10px;
  margin-bottom: 10px;
}
.icon-sty {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
}
.icon-sty1 {
  background-color: #409eff;
  margin: 0 10px;
}
.icon-sty2 {
  background-color: #f56c6c;
}
</style>
