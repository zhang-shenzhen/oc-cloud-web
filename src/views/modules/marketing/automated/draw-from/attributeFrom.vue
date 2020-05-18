<template>
  <div>
    <el-form
      ref="form"
      :model="dataForm"
      style="margin-bottom:15px"
      label-position="top"
      label-width="80px"
    >
      <el-form-item label="名称">
        <div class="list-box">
          <el-input
            v-model="dataForm.name"
            style="width:100%;"
            :disabled="action == 'look'"
            placeholder="判断名称"
            size="small"
          />
        </div>
      </el-form-item>

      <el-form-item>
        <div v-for="(item, index) in fitleList" :key="index" class="list-box">
          <div class="box">判断条件{{ index + 1 }}</div>
          <div class="box">
            <el-select
              v-model="item.class"
              style="width:100%;"
              size="small"
              clearable
              placeholder="选择条件1"
              :disabled="action == 'look'"
              @change="selChange(item)"
            >
              <el-option
                v-for="(num, index) in item.selectList"
                :key="index"
                :label="num.name"
                :value="num.id"
                >{{ num.name }}</el-option
              >
            </el-select>
          </div>
          <div class="box">
            <el-select
              v-model="item.name"
              style="width:100%;"
              size="small"
              clearable
              placeholder="选择条件2"
              :disabled="action == 'look'"
              @change="selChange_1(item)"
            >
              <el-option
                v-for="(num, index) in item.selectList1"
                :key="index"
                :label="num.name"
                :value="num.id"
                >{{ num.name }}</el-option
              >
            </el-select>
          </div>

          <div class="box">
            <el-select
              v-model="item.mode"
              style="width:100%;"
              size="small"
              clearable
              placeholder="选择条件3"
              :disabled="action == 'look'"
              @change="selChange_2(item)"
            >
              <el-option
                v-for="(num, index) in item.selectList2"
                :key="index"
                :label="num.name"
                :value="num.id"
                >{{ num.name }}</el-option
              >
            </el-select>
          </div>

          <div v-if="item.type == 'bescene'" class="box">
            <el-select
              v-model="item.value"
              style="width:100%;"
              :disabled="action == 'look'"
              size="small"
              clearable
              placeholder="选择条件4"
            >
              <el-option
                v-for="(num, index) in subscribescene"
                :key="index"
                :label="num.name"
                :value="num.id"
                >{{ num.name }}</el-option
              >
            </el-select>
          </div>

          <div v-if="item.type == 'tag'">
            <el-select
              v-model="item.value"
              style="width:100%;"
              :disabled="action == 'look'"
              size="small"
              clearable
              placeholder="选择标签"
            >
              <el-option
                v-for="(num, index) in tagList"
                :key="index"
                :label="num.tagName"
                :value="num.id"
                >{{ num.tagName }}</el-option
              >
            </el-select>
          </div>

          <div v-if="item.type == 'other'" class="box">
            <el-input
              v-model="item.value"
              :disabled="action == 'look'"
              placeholder="判断名称"
              size="small"
            />
          </div>

          <div v-if="item.type == 'time'" class="box">
            <el-date-picker
              v-model="item.value"
              style="width:100%;"
              type="date"
              size="small"
              :disabled="action == 'look'"
              placeholder="选择日期"
            />
          </div>
          <div v-if="item.type == 'memberGroup'">
            <el-select
              v-model="item.value"
              style="width:100%;"
              :disabled="action == 'look'"
              size="small"
              clearable
              placeholder="选择分组"
            >
              <el-option
                v-for="(itm, index) in memberGroupList"
                :key="index"
                :label="itm.name"
                :value="itm.conditions"
                >{{ itm.name }}</el-option
              >
            </el-select>
          </div>
        </div>
        <div class="list-box">
          <el-button
            size="small"
            type="text"
            :disabled="action == 'look'"
            @click="add"
            >添加属性判断</el-button
          >
        </div>
      </el-form-item>

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

    <!--  -->
  </div>
</template>
<script>
import { labelList } from '@/api/marketing/automated'
import { FilterList } from '@/api/member/filter'
export default {
  name: 'AttributeFrom',
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
        selValue: null,
        selValue1: null,
        selValue2: null,
      },
      templateId: null,
      fitleList: [], // 模板数组
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
      tagList: [],
      mem_group_conditions: [],
      memberGroupList: [], // memberGrouplist数据
      selectList: [
        {
          id: 2,
          name: '会员字段',
        },
        {
          id: 1,
          name: '粉丝字段',
        },
      ],
      subscribescene: [
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
          id: 'ADD_SCENEPROFILE_LINK',
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
      selectObj: {
        '2': [
          {
            id: 'name',
            name: '姓名',
          },
          {
            id: 'phone',
            name: '手机号码',
          },
          {
            id: 'location',
            name: '地区',
          },
          {
            id: 'registertime',
            name: '系统注册时间',
          },
          {
            id: 'email',
            name: '邮箱',
          },
          {
            id: 'gender',
            name: '性别',
          },
          {
            id: 'birthday',
            name: '生日',
          },
          {
            id: 'language',
            name: '语言',
          },
          {
            id: 'tag',
            name: '标签',
          },
          {
            id: 'subscribescene',
            name: '关注来源',
          },
        ],
        '1': [
          {
            id: 'nickname',
            name: '微信昵称',
          },
          {
            id: 'headimgurl',
            name: '微信头像',
          },
          {
            id: 'subscribetime',
            name: '微信关注时间',
          },
        ],
      },
    }
  },
  computed: {},
  created() {
    console.log('attributeFrom--this.showData', this.showData)
    if (this.showData) {
      // 回显数据
      this.dataForm.name = this.showData.name
      const conditions = this.showData.conditions
      conditions.map((val) => {
        const option = {
          name: val.entrys[0].name,
          value: val.entrys[0].value,
          mode: val.entrys[0].mode,
          class: val.type,
        }
        option.selectList = { ...this.selectList }
        option.selectList1 = this.selChange(JSON.stringify(val.type), 'look')
        option.selectList2 = this.selChange_1(val.entrys[0], 'look')
        option.type = this.selChange_2(val.entrys[0], 'look')
        this.fitleList.push(option)
      })
    }
    this.mem_group_conditions = [
      {
        entrys: [],
        type: 2,
      },
    ]
    sessionStorage.setItem('filterOptions', JSON.stringify({ type: 1 }))
    this.getMessageList()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getCheckValue(e) {
      console.log('getCheckValue', e)
    },
    getMessageList() {
      labelList({ page: 1, size: 10000 }).then((res) => {
        if (res.code == 0) {
          if (res.data) {
            if (res.data.data) {
              this.tagList = res.data.data
            }
          }
        }
      })
    },
    getValue() {
      // 操作类型:1微信回复文本消息,2微信回复图片消息,3微信回复视频消息,4微信回复语音消息,5微信回复外链图文消息,6微信回复图文消息,7微信回复音乐消息,8微信回复卡券消息,9微信回复小程序消息,10分配标签,11微信回复模板消息,12赠送积分,13发送短信,14发放卡券
    },
    selChange(item, action) {
      if (!action) {
        item.name = null
        item.mode = null
        item.value = null
        item.type = null
        item.selectList1 = this.selectObj[item.class]
      } else {
        return this.selectObj[item]
      }
    },
    selChange_1(item, action) {
      console.log('selChange_1', item, action)
      if (!action) {
        item.mode = null
        item.value = null
        item.type = null
      }
      const val = item.name
      let selectList2 = null
      if (
        val == 'name' ||
        val == 'phone' ||
        val == 'email' ||
        val == 'nickname'
      ) {
        // 姓名、手机号码、邮箱、微信昵称
        selectList2 = [
          { id: 8, name: '为空' },
          { id: 11, name: '不为空' },
          { id: 1, name: '等于' },
          { id: 9, name: '不等于' },
          { id: 2, name: '包含' },
          { id: 12, name: '不包含' },
        ]
      } else if (
        val == 'gender' ||
        val == 'language' ||
        val == 'subscribescene' ||
        val == 'location'
      ) {
        // 性别、语言、关注来源、地区
        selectList2 = [
          { id: 8, name: '为空' },
          { id: 11, name: '不为空' },
          { id: 1, name: '等于' },
          { id: 9, name: '不等于' },
        ]
      } else if (
        val == 'registertime' ||
        val == 'birthday' ||
        val == 'subscribetime'
      ) {
        // 系统注册时间、生日、微信关注时间
        selectList2 = [
          { id: 8, name: '为空' },
          { id: 11, name: '不为空' },
          { id: 1, name: '等于' },
          { id: 9, name: '不等于' },
          { id: 3, name: '早于' },
          { id: 4, name: '早于(含)' },
          { id: 5, name: '晚于' },
          { id: 6, name: '晚于(含)' },
        ]
      } else if (val == 'tag') {
        // 标签
        selectList2 = [
          { id: 8, name: '为空' },
          { id: 11, name: '不为空' },
          { id: 2, name: '包含' },
          { id: 12, name: '不包含' },
        ]
      } else if (val == 'headimgurl') {
        // 微信头像
        selectList2 = [{ id: 8, name: '为空' }, { id: 11, name: '不为空' }]
      } else if (val == 'memberGroup') {
        // 会员建祖
        selectList2 = [
          { id: 8, name: '为空' },
          { id: 11, name: '不为空' },
          { id: 2, name: '包含' },
          { id: 12, name: '不包含' },
        ]
      }

      if (!action) {
        item.selectList2 = selectList2
      } else {
        return selectList2
      }
    },
    selChange_2(item, action) {
      console.log(item)
      if (!action) {
        item.value = null
        item.type = null
      }
      let type = null
      if (
        item.name == 'registertime' ||
        item.name == 'birthday' ||
        item.name == 'subscribetime'
      ) {
        if (
          item.mode == 1 ||
          item.mode == 9 ||
          item.mode == 3 ||
          item.mode == 4 ||
          item.mode == 5 ||
          item.mode == 6
        ) {
          type = 'time'
        }
      } else if (item.name == 'memberGroup') {
        type = 'memberGroup'
      } else if (item.name == 'subscribescene') {
        // 关注来源
        item.type = 'bescene'
      } else {
        if (
          item.mode == 1 ||
          item.mode == 9 ||
          item.mode == 2 ||
          item.mode == 12
        ) {
          if (item.name == 'tag') {
            // 标签
            type = 'tag'
          } else {
            type = 'other'
          }
        }
      }

      if (!action) {
        item.type = type
      } else {
        return type
      }
    },
    add() {
      const option = {
        name: null,
        value: null,
        mode: null,
        class: null,
      }
      option.selectList = { ...this.selectList }
      this.fitleList.push(option)
    },
    open(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type,
      })
    },
    onSubmit() {
      if (!this.dataForm.name) {
        this.open('警告', '请填写判断名称', 'error')
        return
      }

      const sendData = {
        description: null,
        name: this.dataForm.name,
        conditions: [],
      }

      let status = false
      console.log('this.fitleList', this.fitleList)
      this.fitleList.map((res) => {
        if (!res.mode || !res.name || (res.type == 'other' && !res.value)) {
          status = true
        }

        // if (!res.mode || !res.name || !res.value) {
        //   status = true
        // }
        const entrys = {
          mode: res.mode,
          name: res.name,
        }
        if (res.value) {
          if (res.isTime) {
            entrys.value = this.$formatDate(new Date(res.value), 'yyyy-MM-dd')
          } else {
            entrys.value = res.value
          }
        }
        const option = {
          entrys: [],
          type: res.class,
        }
        option.entrys.push(entrys)
        sendData.conditions.push(option)
      })

      if (status) {
        this.open('警告', '请将数据填写完整', 'error')
        return
      }

      this.$emit('gteData', sendData)
    },
    clear() {
      // this.onSubmit()
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
.list-box {
  width: 300px;
  .box {
    width: 100%;
    height: 32px;
    line-height: 32px;
    margin-bottom: 10px;
  }
}
</style>
