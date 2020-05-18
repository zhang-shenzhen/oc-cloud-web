<template>
  <div>
    <el-form
      style="margin-bottom:15px"
      label-position="left"
      label-width="140px"
    >
      <el-form-item label="智能营销流程名">
        <el-input
          v-model="sendData.title"
          :disabled="action == 'look'"
          placeholder="为智能营销流程取一个名称"
          size="small"
        />
      </el-form-item>
      <el-alert
        title="面对指定的人群，执行一次/系列的营销动作。当我们选定某个群组后，只要在此群组中的客户就会进入自动流 程。已经在群组内的客户会进入流程，流程开始运行后，再进入群组的客户也会进入流程"
        type="info"
      />

      <el-form-item style="margin-top:15px" label="备注">
        <el-input
          v-model="sendData.remark"
          :disabled="action == 'look'"
          placeholder="请填写备注"
          size="small"
        />
      </el-form-item>

      <div class="line" />

      <el-form-item v-if="LMBshowType" label="用户群体">
        <el-col :span="20">
          <el-select
            v-model="sendData.tagId"
            size="small"
            style="width:100%"
            clearable
            placeholder="请选择"
            :disabled="action == 'look'"
          >
            <el-option
              v-for="item in tageList"
              :key="item.id"
              :label="item.tagName"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item v-if="LMBshowType" label="开启时间">
        <el-col :span="20">
          <el-radio-group
            v-model="timeType"
            :disabled="action == 'look'"
            size="small"
            @click="timeClick"
          >
            <el-radio :label="1">立即开启</el-radio>
            <el-radio v-if="false" :label="2">定时开启</el-radio>
          </el-radio-group>
        </el-col>
        <el-col v-if="timeType == 2" :span="20">
          <el-date-picker
            v-model="sendData.startTime"
            size="small"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
            :disabled="action == 'look'"
          />
        </el-col>
      </el-form-item>

      <el-form-item style="margin-top:30px;">
        <el-button size="small" type="primary" @click="submit">确定</el-button>
        <el-button v-if="type != 'start'" size="small" @click="clear"
          >取消</el-button
        >
        <el-button v-if="type == 'start'" size="small" @click="$router.go(-1)"
          >取消</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 点击菜单里面的指定菜单 -->
  </div>
</template>
<script>
import {
  addFlow,
  saveAutomateStore,
  labelList,
} from '@/api/marketing/automated'
export default {
  name: '',
  components: {},
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
  },
  data() {
    return {
      sendData: {
        data: {
          data: null, // 流程图数据
          nodes: [
            {
              node: 'node_h6fumt7up55', // 当前节点id
              last: false, // 是否为最后一个节点
              operations: [],
              trigger: {},
              pnode: '0', // 上节点id
              quote: false, // 是否为引用触发器
              triggerId: null, // /触发器id
            },
          ], // nodes结束
        },
        title: null,
        tagId: null,
        type: 2,
        remark: null,
        startTime: null,
      },
      timeType: 1,
      tageList: [],
      showType: true, // 根据渠道控制模块
    }
  },
  computed: {},
  created() {},
  mounted() {
    console.log('VUE', this)
    // 乐摩吧屏蔽
    console.log('单次营销showData', { ...this.showData })
    if (this.showData) {
      const data = this.showData
      this.sendData = {
        data: {
          data: null, // 流程图数据
          nodes: [
            {
              node: 'node_h6fumt7up55', // 当前节点id
              last: false, // 是否为最后一个节点
              operations: [],
              trigger: {},
              pnode: '0', // 上节点id
              quote: false, // 是否为引用触发器
              triggerId: null, // /触发器id
            },
          ], // nodes结束
        },
        title: data.title,
        tagId: data.tagId,
        type: 3,
        remark: data.remark,
        startTime: data.startTime,
      }
      if (data.startTime) {
        this.timeType = 2
      }
      console.log('单次营销sendData', this.sendData)
    }
    this.getlabelList()
  },
  beforeDestroy() {},
  methods: {
    getlabelList() {
      labelList({
        page: 1,
        size: 1000,
        type: 1,
      }).then((res) => {
        if (res.code == 0) {
          if (res.data) {
            if (res.data.data) {
              this.tageList = res.data.data
            }
          }
        }
      })
    },
    timeClick() {
      if (this.timeType == 2) {
        this.sendData.startTime = null
      }
    },
    clear() {
      this.$emit('claer')
    },
    submit() {
      if (this.$isNull(this.sendData.title)) {
        this.$notify.error({
          title: '错误',
          message: '请输入智能营销流程名',
        })
        return
      }
      // if (this.$isNull(this.sendData.tagId)) {
      //   this.$notify.error({
      //     title: "错误",
      //     message: "请选择用户群体"
      //   });
      //   return;
      // }
      if (this.timeType == 2 && this.$isNull(this.sendData.startTime)) {
        this.$notify.error({
          title: '错误',
          message: '请选择开启时间',
        })
        return
      }

      this.sendData.loading = true

      this.$emit('sendValue', this.sendData)
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
  margin: 20px 0;
}
</style>
