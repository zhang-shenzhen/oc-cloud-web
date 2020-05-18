<template>
  <d2-container class="page">
    <h3 class="list-title">新增触发器</h3>
    <el-form ref="trigger"
             :model="trigger"
             :rules="rules"
             size="mini"
             label-width="160px"
             class="demo-ruleForm">
      <el-form-item label="名称"
                    prop="name">
        <el-col :span="9">
          <el-input v-model="trigger.name" />
        </el-col>
      </el-form-item>
      <!-- 触发条件 -->
      <el-form-item label="触发条件">
        <el-col :span="9">
          <el-select v-model="trigger.event.type"
                     style="width:100%;"
                     clearable
                     placeholder="请选择"
                     @change="changeTrigger(trigger.event.type)">
            <el-option label="任意操作"
                       :value="0" />
            <el-option label="点击菜单"
                       :value="3" />
            <el-option label="关注"
                       :value="1" />
            <el-option label="发送消息"
                       :value="4" />
            <el-option label="订单状态变更"
                       :value="7" />
            <el-option label="会员开卡"
                       :value="6" />
            <el-option label="指定时间"
                       :value="8" />
            <el-option label="微信扫码"
                       :value="2" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item v-if="trigger.event.type==8">
        <el-col :span="9">
          <el-radio-group v-model="lstime"
                          @change="timesLabel()">
            <el-radio :label="1">选择时间</el-radio>
            <el-radio :label="2">指定周</el-radio>
            <el-radio :label="3">指定月</el-radio>
            <el-radio :label="4">指定年</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <!-- 选择时间 -->
      <el-form-item v-if="trigger.event.type==8 && lstime == 1">
        <el-col :span="2">选择时间:</el-col>
        <el-col :span="5">
          <el-date-picker v-model="time.dataTime"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd" />
        </el-col>
        <el-col :span="5">
          <el-time-select v-model="time.hour"
                          :picker-options="{start: '00:00', step: '00:10',end: '23:59'}"
                          placeholder="选择时间" />
        </el-col>
      </el-form-item>
      <!-- 指定周 -->
      <el-form-item v-if="trigger.event.type==8 && lstime == 2">
        <el-col :span="2">每周:</el-col>
        <el-col :span="12">
          <el-radio-group v-model="time.weekDay">
            <el-radio :label="1">周一</el-radio>
            <el-radio :label="2">周二</el-radio>
            <el-radio :label="3">周三</el-radio>
            <el-radio :label="4">周四</el-radio>
            <el-radio :label="5">周五</el-radio>
            <el-radio :label="6">周六</el-radio>
            <el-radio :label="7">周日</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="5">
          <el-time-select v-model="time.hour"
                          :picker-options="{start: '00:00', step: '00:10',end: '23:59'}"
                          placeholder="选择时间" />
        </el-col>
      </el-form-item>
      <!-- 指定月 -->
      <el-form-item v-if="trigger.event.type==8 && lstime == 3">
        <el-col :span="2">每月:</el-col>
        <el-col :span="5">
          <el-select v-model="time.monthData"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in monthlySelect"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-time-select v-model="time.hour"
                          :picker-options="{start: '00:00', step: '00:10',end: '23:59'}"
                          placeholder="选择时间" />
        </el-col>
      </el-form-item>
      <!-- 指定年 -->
      <el-form-item v-if="trigger.event.type==8 && lstime == 4">
        <el-col :span="2">每年:</el-col>
        <el-col :span="5">
          <el-select v-model="time.yearData"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in yearSelect"
                       :key="item"
                       :label="item"
                       :value="item" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="time.monthData"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in monthlySelect"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-time-select v-model="time.hour"
                          :picker-options="{start: '00:00', step: '00:10',end: '23:59'}"
                          placeholder="选择时间" />
        </el-col>
      </el-form-item>
      <!-- 订单状态变更 -->
      <el-form-item v-if="trigger.event.type == 7"
                    label="订单状态">
        <el-col :span="9">
          <el-select v-model="trigger.event.data[0].value"
                     suffix-icon="el-icon-date"
                     style="width:100%"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in orderSelect"
                       :key="item.id"
                       :label="item.name"
                       :value="JSON.stringify(item.id)" />
          </el-select>
        </el-col>
      </el-form-item>
      <!-- 点击菜单 -->
      <el-form-item v-if="trigger.event.type == 3">
        <el-col :span="9">
          <el-radio-group v-model="trigger.event.data[0].mode"
                          @change="tap2Menu">
            <el-radio :label="11">点击任意菜单</el-radio>
            <el-radio :label="1">点击指定菜单</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <!-- 点击菜单 -->
      <el-form-item v-if="trigger.event.data[0].mode == 1 && trigger.event.type == 3">
        <el-col :span="9">
          <el-select v-model="trigger.event.data[0].menuId"
                     size="mini"
                     style="width:100%"
                     clearable
                     placeholder="请选择"
                     @change="selectMenu">
            <el-option v-for="item in memuSelect"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <!-- 关注 -->
      <el-form-item v-if="trigger.event.type == 1">
        <el-col :span="9">
          <el-radio-group v-model="trigger.event.data[0].mode"
                          @change="concern">
            <el-radio :label="11">任意关注</el-radio>
            <el-radio :label="1">指定二维码关注</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <!-- 关注 => 指定二维码关注-->
      <el-form-item v-if="trigger.event.data[0].mode==1&&trigger.event.type==1">
        <el-col :span="9">
          <el-select v-model="trigger.event.data[0].value"
                     style="width:100%"
                     size="mini"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option v-for="item in codeList"
                       :key="item.id"
                       :label="item.title"
                       :value="JSON.stringify(item.id)" />
          </el-select>
        </el-col>
      </el-form-item>
      <!-- 发送消息 -->
      <el-form-item v-if="trigger.event.type == 4">
        <el-col :span="9">
          <el-radio-group v-model="mode"
                          @change="newsLabel()">
            <!-- <el-radio-group v-model="trigger.event.data[0].mode" @change="newsLabel()"> -->
            <el-radio :label="11">任意消息</el-radio>
            <el-radio :label="1">指定消息关键字</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <!-- 发送消息==>指定消息关键字 -->
      <el-form-item v-if="trigger.event.type==4&&trigger.event.data[0].mode!=11">
        <el-col v-for="(item,index) in trigger.event.data"
                :key="index"
                :span="24">
          <el-col :span="8">
            <el-input v-model="item.value"
                      size="mini"
                      placeholder="请输入内容"
                      clearable />
          </el-col>
          <el-col :span="5">
            <el-select v-model="item.mode"
                       size="mini"
                       clearable
                       placeholder="请选择">
              <el-option label="完全匹配"
                         :value="1" />
              <el-option label="模糊匹配"
                         :value="10" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-button size="mini"
                     type="primary"
                     @click="addKey()">增加关键字</el-button>
        </el-col>
      </el-form-item>

      <!-- 二维码 -->
      <el-form-item label="二维码"
                    v-if="trigger.event.type==2">
        <el-col :span="9">
          <el-select v-model="trigger.event.data[0].value"
                     suffix-icon="el-icon-date"
                     style="width:100%"
                     clearable
                     placeholder="请选择二维码">
            <el-option v-for="item in wxcodeList"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>

      <!-- 筛选器限制 -->
      <el-form-item label="筛选器限制">
        <el-col :span="9">
          <el-select v-model="trigger.filterId"
                     suffix-icon="el-icon-date"
                     style="width:100%"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in filterSelect"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <!-- 触发事件 -->
      <el-form-item label="触发事件">
        <el-col :span="9">
          <el-select v-model="trigger.operation.operationItems[0].type"
                     suffix-icon="el-icon-date"
                     style="width:100%"
                     clearable
                     placeholder="请选择">
            <el-option label="修改会员信息"
                       :value="15" />
            <el-option v-if="trigger.event.type == 0 || trigger.event.type == 3|| trigger.event.type == 1 || trigger.event.type== 2 || trigger.event.type== 4"
                       label="发送消息"
                       :value="1" />
            <el-option v-if="trigger.event.type == 0 || trigger.event.type == 3|| trigger.event.type == 1|| trigger.event.type== 2 || trigger.event.type == 4"
                       label="图文"
                       :value="6" />
            <el-option v-if="trigger.event.type == 7 || trigger.event.type == 6"
                       label="模板消息"
                       :value="11" />

            <el-option v-if="trigger.event.type == 8"
                       label="发送短信"
                       :value="13" />
            <el-option v-if="trigger.event.type == 6"
                       label="发送卡券"
                       :value="14" />
          </el-select>
        </el-col>
      </el-form-item>
      <!-- 当触发事件v = 修改会员信息时 -->
      <el-form-item label="选择字段"
                    v-if="trigger.operation.operationItems[0].type==15">
        <el-col :span="9">
          <el-select v-model="trigger.operation.operationItems[0].value[0].field"
                     suffix-icon="el-icon-date"
                     style="width:100%"
                     clearable
                     placeholder="请选择">
            <el-option label="性别"
                       value="sex" />
            <el-option label="是否为会员"
                       value="memberOrNot" />
          </el-select>
        </el-col>
      </el-form-item>
      <!-- 选择字段 v = 性别||是否为会员时 -->
      <el-form-item label="性别"
                    v-if="trigger.operation.operationItems[0].value[0].field=='sex'&&trigger.operation.operationItems[0].type==15">
        <el-col :span="9">
          <el-select v-model="trigger.operation.operationItems[0].value[0].value"
                     suffix-icon="el-icon-date"
                     style="width:100%"
                     clearable
                     placeholder="请选择">
            <el-option label="男"
                       :value="1" />
            <el-option label="女"
                       :value="2" />
            <el-option label="未知"
                       :value="3" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="是否为会员"
                    v-if="trigger.operation.operationItems[0].value[0].field=='memberOrNot'&&trigger.operation.operationItems[0].type==15">
        <el-col :span="9">
          <el-select v-model="trigger.operation.operationItems[0].value[0].value"
                     suffix-icon="el-icon-date"
                     style="width:100%"
                     clearable
                     placeholder="请选择">
            <el-option label="是"
                       :value="1" />
            <el-option label="否"
                       :value="2" />
          </el-select>
        </el-col>
      </el-form-item>
      <!-- 发送卡券 -->
      <el-form-item v-if="trigger.operation.operationItems[0].type==14">
        <el-col :span="9">
          <el-select v-model="trigger.operation.operationItems[0].value[0].id"
                     style="width:100%"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in cardlist"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <!-- 发送短信 -->
      <el-form-item v-if="trigger.operation.operationItems[0].type==13">
        <el-col :span="9">
          <el-select v-model="trigger.operation.operationItems[0].value[0].id"
                     style="width:100%"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in noteOption"
                       :key="item.tplId"
                       :label="item.tpl_content"
                       :value="item.tplId" />
          </el-select>
        </el-col>
      </el-form-item>
      <!-- 图文 -->
      <el-form-item v-if="trigger.operation.operationItems[0].type==6">
        <el-col :span="15">
          <div v-for="(item,index) in ReplyList"
               :key="index"
               style="width:80%">
            <Reply :function-list="['图文']"
                   :item-id="item.id"
                   :show-data="item.showData"
                   @getObj="getValue" />
          </div>
        </el-col>
      </el-form-item>
      <!-- 模板消息 -->
      <el-form-item v-if="trigger.operation.operationItems[0].type==11">
        <el-col :span="9">
          <el-select v-model="trigger.operation.operationItems[0].value[0].id"
                     style="width:100%"
                     size="mini"
                     filterable
                     placeholder="请选择模板消息可输入筛选">
            <el-option v-for="item in templates"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <!-- 文本域 -->
      <el-form-item v-if="trigger.operation.operationItems[0].type==1">
        <el-col :span="9">
          <el-input v-model="trigger.operation.operationItems[0].value[0].text"
                    style="width:100%"
                    size="mini"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    placeholder="请输入内容"
                    maxlength="600"
                    show-word-limit />
        </el-col>
      </el-form-item>

      <!-- 触发时间 -->
      <el-form-item label="触发时间">
        <el-col :span="9">
          <el-radio-group v-model="lstime"
                          @change="attackTime">
            <el-radio :label="0">立即发送</el-radio>
            <el-radio :label="1">延时发送</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>

      <el-form-item v-if="lstime == 1">
        <el-col :span="3"
                style="margin-right:20px;">
          <el-select clearable
                     placeholder="天"
                     v-model="triggerTime.triggerDay">
            <el-option label="0"
                       value="0"></el-option>
            <el-option label="1"
                       value="1"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-time-picker class="time_select"
                          v-model="triggerTime.triggerTimes"
                          :picker-options="{
      selectableRange: '00:30:00 - 23:59:59'
    }"
                          value-format="HH:mm:ss"
                          placeholder="任意时间点"></el-time-picker>
        </el-col>
      </el-form-item>

      <!-- 是否开启 -->
      <el-form-item label="是否开启">
        <el-col :span="9">
          <el-checkbox v-model="trigger.enabled">立即开启</el-checkbox>
        </el-col>
      </el-form-item>
      <!-- 是否打标签 -->
      <el-form-item label="是否打标签">
        <el-col :span="9">
          <el-switch v-model="tageShow"
                     size="mini"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="choosenable()" />
        </el-col>
      </el-form-item>
      <el-form-item v-if="tageShow"
                    label="为触发用户添加标签">
        <el-col :span="9">
          <el-select v-model="tagNameList"
                     size="mini"
                     style="width:100%;"
                     multiple
                     filterable
                     placeholder="请选择">
            <el-option v-for="item in showTagList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   size="mini"
                   @click="submitForm('trigger')">确定</el-button>
        <el-button size="mini"
                   @click="resetForm('trigger')">取消</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import {
  Details,
  GetMenuList,
  GetCode,
  wxCode,
  OrderStatus,
  GetFilter,
  TemplatesTemplates,
  ShortMessage,
  CardMessage,
  GetTag,
  Modify
} from "@/api/wechat/trigger";
import Reply from "@/components/reply";
export default {
  name: "TriggerAdd",
  components: { Reply },
  data () {
    return {
      triggerTime: {
        triggerDay: "0",
        triggerTimes: "00:30:00"
      },
      tagType: { type: 10, value: [] },
      ReplyList: [
        {
          id: 1,
          getVal: {}
        }
      ],
      lstime: 0 /** 指定时间下的单选时间 */,
      time: {
        dataTime: "" /** 年月日 */,
        hour: "" /** 小时 */,
        weekDay: "" /** 星期 */,
        monthData: "" /** 月 */,
        yearData: "" /** 年 */
      },
      mode: "",
      filterSelect: [] /** 筛选器下拉内容 */,
      tageShow: false /** 是否打标签 */,
      showTagList: [] /** 添加标签下拉框数据 */,
      tagNameList: [] /** 你选择的标签 */,
      monthlySelect: [] /** 月 */,
      yearSelect: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      orderSelect: [] /** 订单状态下拉框 */,
      memuSelect: [] /** 点击菜单下拉框 */,
      codeList: [] /** 点击二维码下拉框 */,
      wxcodeList: [] /**点击微信扫码 */,
      cardlist: [] /** 卡券下拉框 */,
      noteOption: [] /** 短信下拉框 */,
      templates: [] /** 模板消息下拉框参数 */,
      trigger: {
        name: "",
        description: "",
        type: 1,
        event: {
          type: 0, // 触发条件
          data: [
            {
              mode: 11, // 匹配模式: 1(等于), 2(不等于), 3(小于), 4(小于等于), 5(大于), 6(大于等于), 7(A于B之间, 范围), 8(空), 9(非), 10(模糊), 11(任意值, 非空)
              value: "", // 关键字, 菜单ID, 二维码ID 等
              menuId: ""
            }
          ]
        },
        filterId: null, // 过滤器ID, 可为空
        operation: {
          mode: 2, // 1(随机运行), 2(全部运行)
          runAt: null, // 延迟运行时间
          operationItems: [
            {
              type: 1, // 触发事件:
              value: [
                {
                  id: "",
                  text: "",
                  localUrl: "",
                  wechatMaterialNewsItemList: [],
                  point: "",
                  des: ""
                }
              ] // 相关数据
            }
          ],
          extraOperation: null // 额外操作, 内容同 打标签
        },
        enabled: false, // 是否立即启用
        enableAt: null // 如果不是立即启用需要配置这个字段, 传入启用时间就行
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  created () {
    this.getFilterInterface();
    this.getTagInterface();
    this.getcardlstatus();
    this.cardMessageInterface();
    this.shortMessageInterface();
    this.templatesInterface();
    this.wxCodeInterface();
    this.detailsInterface(this.$route.query.id);
  },
  mounted () {
    for (let i = 1; i < 32; i++) {
      this.monthlySelect.push({
        value: i,
        label: i
      });
    }
  },
  beforeDestroy () { },
  methods: {
    detailsInterface (id) {
      // 详情
      Details({}, id).then(res => {
        if (res.code == 0) {
          console.log("详情", res);
          this.trigger = res.data;
          console.log("回显详情", this.trigger);
          //   菜单接口调取
          this.tap2Menu();
          this.concern();
          // 是否打标签
          if (this.trigger.operation.extraOperation.value.length != 0) {
            this.tageShow = true;
            this.trigger.operation.extraOperation.value.map(res => {
              this.tagNameList.push(res.id);
            });
          }
          // 图文回显
          if (this.trigger.operation.operationItems[0].type == 6) {
            const showDataObj = {
              type: this.trigger.operation.operationItems[0].type,
              value: [
                {
                  id: this.trigger.operation.operationItems[0].value[0].id,
                  number: 1,
                  wechatMaterialNewsItemList: this.trigger.operation
                    .operationItems[0].value[0].wechatMaterialNewsItemList
                }
              ]
            };
            this.ReplyList = [
              {
                id: 1,
                getVal: {},
                showData: showDataObj
              }
            ];
          }
          //   触发条件为 发送消息的时候
          if (this.trigger.event.type == 4) {
            this.mode = this.trigger.event.data[0].mode
          }
          // if (this.trigger.event.data.length != 0) {
          //   this.mode = 1;
          // } else {
          //   this.mode = 11;
          // }
          if (this.trigger.event.type == 2) {
            this.getCodeEcho(this.trigger.event.data[0].value);
          }
          if (this.trigger.operation.runAt) {
            this.lstime = 1;
            this.delayEcho(this.trigger.operation.runAt);
          }
          // if(this.trigger.event.type == 3){
          //   this.menuEcho(this.trigger.event.data[0].menuId);
          // }
          if (this.trigger.event.type == 8) {
            this.timeEcho(JSON.parse(this.trigger.event.data[0].value));
          }
        }
      });
    },
    // 微信扫码
    getCodeEcho (id) {
      wxCode({}).then(res => {
        if (res.code == 0) {
          console.log("回显微信扫码", res);
          res.data.data.map(res => {
            if (res.id == id) {
              console.log("找到了", res, id);
              this.trigger.event.data[0].value = res.id;
            }
          });
        }
      });
    },
    // 延时回显
    delayEcho (daytime) {
      // 回显触发时间 一天 86400秒; 一个小时 3600秒; 一分钟 60秒;
      let day = Math.floor(daytime / 86400);
      let time = Math.floor((daytime - day * 86400) / 3600);
      let min = Math.floor((daytime - day * 86400 - time * 3600) / 60);
      let second = daytime - day * 86400 - time * 3600 - min * 60;
      console.log(day, time, second, "toime");
      this.triggerTime.triggerDay = day;
      this.triggerTime.triggerTimes = time + ":" + min + ":" + second;
    },
    menuEcho (id) {
      // 菜单回显
    },
    timeEcho (msg) {
      // 触发条件为指定时间回显
      this.lstime = parseInt(msg.type);
      console.log(msg, "msgmsgmsgmsgmsgmsg");
      if (this.lstime == 1) {
        this.time.dataTime = msg.data;
        this.time.hour = msg.hour + ":" + msg.minute;
      } else if (this.lstime == 2) {
        this.time.weekDay = msg.week;
        this.time.hour = msg.hour + ":" + msg.minute;
      } else if (this.lstime == 3) {
        this.time.monthData = msg.day;
        this.time.hour = msg.hour + ":" + msg.minute;
      } else if (this.lstime == 4) {
        this.time.yearData = msg.month;
        this.time.monthData = msg.day;
        this.time.hour = msg.hour + ":" + msg.minute;
      }
    },
    getFilterInterface () {
      // 获取筛选器条件限制
      GetFilter({}).then(res => {
        if (res.code == 0) {
          console.log("获取筛选器条件限制", res);
          this.filterSelect = res.data;
        }
      });
    },
    getTagInterface () {
      // 获取标签列表
      GetTag({}).then(res => {
        if (res.code == 0) {
          console.log("获取标签列表", res);
          this.showTagList = res.data;
        }
      });
    },
    getcardlstatus () {
      // 订单状态列表
      OrderStatus({}).then(res => {
        if (res.code == 0) {
          console.log("订单状态列表", res);
          this.orderSelect = res.data;
        }
      });
    },
    wxCodeInterface () {
      wxCode({}).then(res => {
        if (res.code == 0) {
          console.log("微信扫码", res);
          this.wxcodeList = res.data.data;
        }
      });
    },
    codeListInterface () {
      // 二维码列表
      GetCode({}).then(res => {
        if (res.code == 0) {
          console.log("二维码列表", res);
          this.codeList = res.data.data;
        }
      });
    },
    menuList () {
      // 菜单组列表
      const obj = {
        page: 1,
        size: 1000
      };
      GetMenuList(obj).then(res => {
        if (res.code == 0) {
          console.log("菜单组列表", res);
          this.memuSelect = res.data.data;
        }
      });
    },
    cardMessageInterface () {
      // 卡券列表接口
      CardMessage({}).then(res => {
        if (res.code == 0) {
          console.log("卡券列表接口", res);
          this.cardlist = res.data.couponList;
        }
      });
    },
    shortMessageInterface () {
      // 发送短信列表接口
      ShortMessage({}).then(res => {
        if (res.code == 0) {
          console.log("发送短信列表接口", res);
          this.noteOption = res.data;
        }
      });
    },
    templatesInterface () {
      // 模板消息列表
      const obj = {
        page: 1,
        size: 1000,
        templateTitle: ""
      };
      TemplatesTemplates(obj).then(res => {
        if (res.code == 0) {
          console.log("模板消息列表", res);
          this.templates = res.data.data;
        }
      });
    },
    selectMenu (e) {
      // 触发条件=>点击菜单=>点击指定菜单
      console.log(e, "触发条件=>点击菜单=>点击指定菜单");
      this.memuSelect.map(res => {
        if (res.id == e && res.type == "view") {
          console.log("来来来", res.url);
          this.trigger.event.data[0].value =
            res.url + "?t=" + new Date().getTime();
        }
        if (res.id == e && res.type == "miniprogram") {
          console.log("你周凯", res.pagePath);
          this.trigger.event.data[0].value =
            res.pagePath + "?t=" + new Date().getTime();
        }
        if (res.id == e && res.type == "click") {
          this.trigger.event.data[0].value = e;
        }
      });
    },
    timesLabel () {
      // 选择指定时间
      this.time = {
        dataTime: "",
        hour: "",
        weekDay: "",
        monthData: "",
        yearData: ""
      };
    },
    newsLabel () {
      // 判断你选中的是任意消息或者 指定消息关键字
      console.log("消息关键字", this.mode);
      if (this.mode == 11) {
        console.log(this.mode);
        this.trigger.event.data = [{ mode: 11, value: "" }];
      } else {
        this.trigger.event.data = [{ mode: 1, value: "" }];
      }
    },
    addKey () {
      // 增加关键词
      const arr = { mode: 1, value: "" };
      this.trigger.event.data.push(arr);
    },
    getValue (e) {
      // 图文上传
      console.log(e);
      this.trigger.operation.operationItems[0].value[0].id = e.id;
      this.trigger.operation.operationItems[0].value[0].wechatMaterialNewsItemList =
        e.wechatMaterialNewsItemList;
    },
    choosenable () {
      // 是否打标签
      console.log(this.tageShow);
      this.tagNameList = [];
      if (this.tageShow) {
        this.trigger.operation.extraOperation = {};
      } else {
        this.trigger.operation.extraOperation = null;
      }
    },
    changeTrigger (number) {
      // 选择触发条件
      this.lstime = 1;
      this.trigger.event.data[0].mode = 11;
      this.trigger.event.data[0].value = ""; /** 默认参数为空 */
      this.trigger.event.data[0].menuId = ""; /** 默认参数为空 */
      if (number == 0 || number == 3 || number == 4 || number == 2) {
        this.trigger.operation.operationItems[0].type = 1;
      }
      if (number == 7) {
        this.trigger.operation.operationItems[0].type = 11;
      }
      if (number == 6) {
        this.trigger.operation.operationItems[0].type = 14;
      }
      if (number == 8) {
        this.trigger.operation.operationItems[0].type = 13;
        this.trigger.operation.operationItems[0].value[0].id = "";
      }
    },
    tap2Menu () {
      // 点击指定菜单
      this.menuList();
    },
    concern () {
      // 点击触发条件为 关注
      this.codeListInterface();
    },
    dealDate (obj) {
      // 触发器数据处理   选择不同触发器事件,value字段显示不同
      const type = obj.operation.operationItems[0].type;
      const value = obj.operation.operationItems[0].value[0];
      if (type == 1) {
        value.localUrl = "";
        value.wechatMaterialNewsItemList = "";
      }
      if (type == 2) {
        value.text = "";
        value.wechatMaterialNewsItemList = "";
      }
      if (type == 4) {
        value.text = "";
        value.localUrl = "";
        value.wechatMaterialNewsItemList = "";
      }
      if (type == 6) {
        value.localUrl = "";
        value.text = "";
      }
    },

    attackTime () {
      // 触发时间
      if (this.lstime == 0) {
        //清空
        this.triggerTime = {
          triggerDay: "0",
          triggerTimes: "00:30:00"
        };
      }
    },

    delayTime () {
      // 延时时间处理 一天 86400秒  一小时 3600秒 一分钟 60秒
      let day = this.triggerTime.triggerDay * 86400;
      let time = this.triggerTime.triggerTimes.split(":");
      let hour = time[0] * 3600;
      let min = time[1] * 60;
      let send = time[2] * 1;
      return day + hour + min + send;
    },

    submitForm (formName) {
      this.dealDate(this.trigger);
      if (this.trigger.event.type == 7 || this.trigger.event.type == 8) {
        this.trigger.event.data[0].mode = 1;
      }
      // 触发条件为微信扫码时，select框不能为空
      if (this.trigger.event.type == 2 && !this.trigger.event.data[0].value) {
        this.open("警告", "请选择二维码", "warning");
        return;
      }
      if (
        this.lstime == 1 &&
        !this.triggerTime.triggerDay &&
        !this.triggerTime.triggerTimes
      ) {
        this.open("警告", "选择延时发送时请选择完整的时间", "warning");
        return;
      }
      if (this.lstime == 1) {
        //选择了延时发送
        this.trigger.operation.runAt = this.delayTime();
      } else {
        this.trigger.operation.runAt = null;
      }
      console.log(this.tagNameList);
      this.showTagList.map(res => {
        if (this.tagNameList.indexOf(res.id) != -1) {
          this.tagType.value.push({
            id: res.id
          });
        }
      });
      this.trigger.operation.extraOperation = this.tagType;
      // 触发事件先暂无 type == 12 ↓
      if (this.trigger.operation.operationItems[0].type == 12) {
        this.trigger.operation.operationItems[0].value[0].des = this.trigger.name;
      } else {
        this.trigger.operation.operationItems[0].value[0].des = "";
      }
      if (this.trigger.event.type == 8) {
        let value;
        const type = this.lstime;
        if (this.lstime == 1) {
          value = {
            type: type,
            data: this.time.dataTime,
            hour: this.time.hour.split(":")[0],
            minute: this.time.hour.split(":")[1]
          };
        } else if (this.lstime == 2) {
          value = {
            type: type,
            week: this.time.weekDay,
            hour: this.time.hour.split(":")[0],
            minute: this.time.hour.split(":")[1]
          };
        } else if (this.lstime == 3) {
          value = {
            type: type,
            day: this.time.monthData,
            hour: this.time.hour.split(":")[0],
            minute: this.time.hour.split(":")[1]
          };
        } else if (this.lstime == 4) {
          value = {
            type: type,
            month: this.time.yearData,
            day: this.time.monthData,
            hour: this.time.hour.split(":")[0],
            minute: this.time.hour.split(":")[1]
          };
        }
        this.trigger.event.data[0].value = JSON.stringify(value);
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(
            this.trigger,
            this.trigger.event.data[0].value,
            "这是我要传的参数"
          );
          this.createTriggerInterface(this.trigger);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    createTriggerInterface (obj) {
      // 触发器创建
      Modify(obj).then(res => {
        if (res.code == 0) {
          this.open("成功", "编辑成功", "success");
          console.log("触发器编辑", res);
          this.$router.push({
            name: "wechat-trigger-trigger-list"
          });
        }
      });
    },

    resetForm (formName) {
      // 取消
      this.$router.push({
        name: "wechat-trigger-trigger-list"
      });
    },
    open (title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-row,
.el-col {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.time_select {
  width: 100%;
}
</style>
