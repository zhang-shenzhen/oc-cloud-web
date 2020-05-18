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
        <div>
          <el-select
            v-model="memGroupId"
            style="width:100%;"
            :disabled="action == 'look'"
            size="small"
            clearable
            placeholder="选择分组"
            @change="memGroupGetId"
          >
            <el-option
              v-for="(itm, index) in memberGroupList"
              :key="index"
              :label="itm.name"
              :value="itm.id"
              >{{ itm.name }}</el-option
            >
          </el-select>
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
      memberGroupitem: {
        mode: 'memberGroup',
        name: 'memberGroup',
        type: 'memberGroup',
      },
      memGroupVal: null,
      memGroupId: null,
      memGroupInfo: {},
      memberGroupList: [], // memberGrouplist数据
    }
  },
  computed: {},
  created() {
    console.log('memberGroupitem--this.showData', this.showData)
    sessionStorage.setItem('filterOptions', JSON.stringify({ type: 1 }))
    this.getMessageList()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    memGroupGetId(id) {
      console.log('memGroupGetId-get', id)
      this.memberGroupList.forEach((d) => {
        if (d.id == id) {
          this.memGroupVal = d.conditions[0].entrys
          this.memGroupInfo = d
        }
      })
      console.log('memberGroupitem-memGroupInfo', this.memGroupInfo)
    },
    getMessageList() {
      FilterList({
        page: 1,
        size: 10000,
      }).then((res) => {
        if (res.code == 0) {
          if (res.data.data) {
            this.memberGroupList = res.data.data
            this.memberGroupList.forEach((d) => {
              d.conditions.forEach((dd) => {
                delete dd.type
              })
            })
            if (this.showData) {
              // 回显数据
              this.dataForm.name = this.showData.name
              const conditions = this.showData.conditions[0]
              this.memberGroupList
              console.log('回显conditions', conditions)
              this.memGroupVal = conditions.entrys
              this.memGroupId = conditions.id
              // console.log('回显-memGroupVals', this.memGroupVal)
              // console.log('回显-memGroupId', this.memGroupId)
            }
            console.log('this.memberGroupList', this.memberGroupList)
          }
        }
      })
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
      const res = this.memGroupVal
      let status = false
      const option = {
        entrys: res,
        type: res.class,
        id: this.memGroupId,
      }
      console.log('memberGroupitem-res', res)
      console.log('memberGroupitem-memGroupInfo', this.memGroupInfo)
      // 3静态，2动态
      if (this.memGroupInfo.automatic == 3) {
        option.entrys = [
          {
            name: 'memberFilterIds',
            mode: 2,
            value: this.memGroupInfo.id,
          },
        ]
      }

      console.log('会员建组-sendData', sendData)
      if (!this.memGroupId) status = true
      sendData.conditions.push(option)

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
