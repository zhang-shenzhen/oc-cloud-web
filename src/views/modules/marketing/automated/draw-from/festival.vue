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
          <el-alert
            title="纪念日营销是指针对客户日期类的属性进行的营销，比如生日、纪念日、预约时间等。前提是你的客户必须已经填写了该日期类属性。选择相应的日期类属性及需要进行营销的客户群组，设定流程开始的时间即可。"
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

          <el-form-item label="节日类型">
            <el-col :span="20">
              <el-select
                v-model="timeParam.holidayId"
                :disabled="action == 'look'"
                size="small"
                style="width:100%"
                clearable
                placeholder="请选择"
              >
                <el-option :key="-99" label="生日" :value="-99" />
                <el-option
                  v-for="item in holidayList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item label="时间设置">
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
                <span v-if="timeParam.timeType == 2">
                  <el-form-item label="提前">
                    <el-select
                      v-model="timeParam.day"
                      :disabled="action == 'look'"
                      style="width:100px;"
                      size="small"
                      placeholder="选择天"
                    >
                      <el-option v-for="v in 30" :key="v" :label="v - 1" :value="v - 1" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="天" />
                </span>

                <el-form-item>
                  <el-select
                    v-model="timeParam.hour"
                    :disabled="action == 'look'"
                    style="width:100px;"
                    size="small"
                    placeholder="选择小时"
                  >
                    <el-option :label="0" :value="0" />
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
                    style="width:100px;"
                    size="small"
                    v-model="timeParam.second"
                    placeholder="选择秒"
                    :disabled="action == 'look'"
                  >
                    <el-option :label="0" :value="0"></el-option>
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
  labelList,
  holidayType
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
        type: 4,
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
        month: [],
        holidayId: null
      },
      timeType: 1,
      tageList: [],
      holidayList: [
        {
          id: 1,
          name: "国庆节"
        }
      ],
      dataType: [
        {
          name: "当天",
          id: 1
        },
        {
          name: "提前",
          id: 2
        }
      ]
    };
  },
  computed: {},
  created() {
    if (this.showData) {
      console.log(this.showData);
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
        if (typeof data.timeParam == "string") {
          this.timeParam = JSON.parse(data.timeParam);
        }else{
           this.timeParam = data.timeParam;
        }
        if (this.timeParam.timeType == 5 && this.timeParam.day) {
          this.timeParam.timeType = 2;
        } else if (this.timeParam.timeType == 5 && !this.timeParam.day) {
          this.timeParam.timeType = 1;
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

      holidayType({}).then(res => {
        if (res.code == 0) {
          if (res.data) {
            this.holidayList = res.data;
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
        month: [],
        holidayId: null
      };
      this.timeParam = { ...data };
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
      if (this.$isNull(this.timeParam.holidayId)) {
        this.$notify.error({
          title: "错误",
          message: "请选择节日类型"
        });
        return;
      }

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

      const data = { ...this.sendData };
      if ((this.timeParam.holidayId = -99)) {
        data.timeParam.timeType = 5;
      }
      if (!this.timeParam.day) {
        data.timeParam.day = 0;
      }

      this.$emit("sendValue", data);
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
