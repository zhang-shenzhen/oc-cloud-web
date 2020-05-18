<template>
  <div>
    <el-form style="margin-bottom:15px" label-position="left" label-width="140px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="智能营销流程名">
            <el-input
              v-model="sendData.title"
              :disabled="action == 'look'"
              placeholder="为智能营销流程取一个名称"
              size="small"
            />
          </el-form-item>
          <el-alert title="可以针对某一群组的客户，在每天或每周、每月执行一次营销动作，进行周期性的推送。" type="info" />

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
            <el-col :span="24">
              <el-select
                v-model="sendData.tagId"
                :disabled="action == 'look'"
                size="small"
                style="width:100%"
                clearable
                placeholder="请选择"
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

          <el-form-item label="周期设置">
            <el-col :span="24">
              <el-radio-group
                v-model="timeParam.timeType"
                :disabled="action == 'look'"
                size="small"
                @change="timeClick"
              >
                <el-radio
                  v-for="(data, index) in dataType"
                  :key="index"
                  :label="data.id"
                >{{ data.name }}</el-radio>
              </el-radio-group>
            </el-col>

            <el-col :span="24">
              <el-form :inline="true" class="demo-form-inline">
                <!-- 天 -->
                <span v-if="timeParam.timeType == 1 && timeParam.day != -1">
                  <el-form-item label="每">
                    <el-select
                      v-model="timeParam.day"
                      style="width:100px;"
                      size="small"
                      placeholder="选择天"
                      :disabled="action == 'look'"
                    >
                      <el-option v-for="v in 30" :key="v" :label="v" :value="v" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="天" />
                </span>

                <!-- 周 -->
                <span v-if="timeParam.timeType == 2">
                  <el-form-item>
                    <el-select
                      v-model="timeParam.weekday"
                      style="width:100px;"
                      size="small"
                      clearable
                      multiple
                      placeholder="选择周"
                      :disabled="action == 'look'"
                    >
                      <el-option v-for="(v, i) in weekList" :key="i" :label="v.name" :value="v.id" />
                    </el-select>
                  </el-form-item>
                </span>

                <!-- 月 -->
                <span v-if="timeParam.timeType == 3">
                  <el-form-item>
                    <el-select
                      v-model="timeParam.monthDay"
                      style="width:100px;"
                      size="small"
                      clearable
                      multiple
                      placeholder="选择日"
                      :disabled="action == 'look'"
                    >
                      <el-option v-for="i in 31" :key="i" :label="i" :value="i" />
                    </el-select>
                  </el-form-item>
                </span>

                <!-- 年 -->
                <span v-if="timeParam.timeType == 4">
                  <el-form-item>
                    <el-select
                      v-model="timeParam.month"
                      :disabled="action == 'look'"
                      style="width:100px;"
                      size="small"
                      clearable
                      multiple
                      placeholder="选择月"
                    >
                      <el-option v-for="i in 12" :key="i" :label="i" :value="i" />
                    </el-select>
                  </el-form-item>
                </span>

                <el-form-item>
                  <el-select
                    v-model="timeParam.hour"
                    :disabled="action == 'look'"
                    style="width:100px;"
                    size="small"
                    placeholder="选择小时"
                  >
                    <el-option v-for="v in 23" :key="v" :label="v" :value="v" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select
                    v-model="timeParam.minute"
                    :disabled="action == 'look'"
                    style="width:100px;"
                    size="small"
                    placeholder="选择分钟"
                  >
                    <el-option :label="0" :value="0" />
                    <el-option v-for="v in 59" :key="v" :label="v" :value="v" />
                  </el-select>
                </el-form-item>

                <!-- <el-form-item>
                  <el-select
                    :disabled="action == 'look'"
                    style="width:100px;"
                    size="small"
                    v-model="timeParam.second"
                    placeholder="选择秒"
                  >
                    <el-option :label="0"  :value="0"></el-option>
                    <el-option :label="v" v-for="v in 59" :key="v" :value="v"></el-option>
                  </el-select>
                </el-form-item>-->
              </el-form>
            </el-col>
          </el-form-item>

          <el-form-item v-if="LMBshowType" label="开启时间">
            <el-col :span="20">
              <el-radio-group v-model="timeType" :disabled="action == 'look'" size="small">
                <el-radio :label="1">立即开启</el-radio>
                <!-- <el-radio :label="2">定时开启</el-radio> -->
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
            <el-button v-if="type != 'start'" size="small" @click="clear">取消</el-button>
            <el-button v-if="type == 'start'" size="small" @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 点击菜单里面的指定菜单 -->
  </div>
</template>
<script>
import {
  addFlow,
  saveAutomateStore,
  labelList
} from "@/api/marketing/automated";
export default {
  name: "",
  components: {},
  props: {
    type: {
      type: String,
      default: null
    },
    showData: {
      type: Object,
      default: null
    },
    action: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      sendData: {
        data: {
          data: null, // 流程图数据
          nodes: [
            {
              node: "node_h6fumt7up55", // 当前节点id
              last: false, // 是否为最后一个节点
              operations: [],
              trigger: {},
              pnode: "0", // 上节点id
              quote: false, // 是否为引用触发器
              triggerId: null // /触发器id
            }
          ] // nodes结束
        },
        title: null,
        tagId: null,
        type: 3,
        remark: null,
        startTime: null
      },
      timeParam: {
        day: null,
        hour: null,
        minute: null,
        second: 0,
        timeType: 1,
        weekday: [],
        monthDay: [],
        month: []
      },
      timeType: 1,
      tageList: [],
      dataType: [
        {
          name: "每几天",
          id: 1
        },
        {
          name: "每一天",
          id: -1
        },
        {
          name: "每周",
          id: 2
        },
        {
          name: "每月",
          id: 3
        },
        {
          name: "每年",
          id: 4
        }
      ],
      weekList: [
        {
          name: "周一",
          id: 1
        },
        {
          name: "周二",
          id: 2
        },
        {
          name: "周三",
          id: 3
        },
        {
          name: "周四",
          id: 4
        },
        {
          name: "周五",
          id: 5
        },
        {
          name: "周六",
          id: 6
        },
        {
          name: "周日",
          id: 7
        }
      ]
    };
  },
  computed: {},
  created() {
    console.log(this.showData);
    if (this.showData) {
      const data = this.showData;
      this.sendData = {
        data: {
          data: null, // 流程图数据
          nodes: [
            {
              node: "node_h6fumt7up55", // 当前节点id
              last: false, // 是否为最后一个节点
              operations: [],
              trigger: {},
              pnode: "0", // 上节点id
              quote: false, // 是否为引用触发器
              triggerId: null // /触发器id
            }
          ] // nodes结束
        },
        title: data.title,
        tagId: data.tagId,
        type: 3,
        remark: data.remark,
        startTime: data.startTime
      };
      if (data.startTime) {
        this.timeType = 2;
      }
      if (data.timeParam) {
        let timeParam = data.timeParam;
        if (typeof timeParam == "string") {
          timeParam = JSON.parse(timeParam);
        }
        this.timeParam = timeParam;
        if (timeParam.day > -1) {
          this.timeParam.timeType = 1;
        } else {
          this.timeParam.timeType = -1;
        }
      }
    }

    this.getlabelList();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getlabelList() {
      labelList({
        page: 1,
        size: 1000,
        type: 1
      }).then(res => {
        if (res.code == 0) {
          if (res.data) {
            if (res.data.data) {
              this.tageList = res.data.data;
            }
          }
        }
      });
    },
    timeClick() {
      const data = {
        day: null,
        hour: null,
        minute: null,
        second: 0,
        timeType: this.timeParam.timeType,
        weekday: [],
        monthDay: [],
        month: []
      };
      this.timeParam = { ...data };
      if (this.timeParam.timeType == -1) {
        this.timeParam.day = -1;
      }
    },
    clear() {
      this.$emit("claer");
    },
    submit() {
      if (this.$isNull(this.sendData.title)) {
        this.$notify.error({
          title: "错误",
          message: "请输入智能营销流程名"
        });
        return;
      }
      // if (this.$isNull(this.sendData.tagId)) {
      //   this.$notify.error({
      //     title: "错误",
      //     message: "请选择用户群体"
      //   });
      //   return;
      // }

      if (this.timeType == 2) {
        if (this.$isNull(this.sendData.startTime)) {
          this.$notify.error({
            title: "错误",
            message: "请选择开启时间"
          });
          return;
        }
      }

      if (
        this.$isNull(this.timeParam.hour) ||
        this.$isNull(this.timeParam.minute) ||
        this.$isNull(this.timeParam.second)
      ) {
        this.$notify.error({
          title: "错误",
          message: "请选择时间"
        });
        return;
      }

      this.sendData.loading = true;
      this.sendData.timeParam = { ...this.timeParam };
      if (this.sendData.timeParam.timeType == -1) {
        this.sendData.timeParam.timeType = 1;
      }

      this.$emit("sendValue", this.sendData);
    }
  }
};
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
