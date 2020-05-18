<template>
<d2-container class="page">
  <div class="page">
    <div class="home">
      <div class="main-panel">
         <div class="nodes">
          <p class="title">自动化营销</p>
          <div class="nav">线形</div>
          <div v-if="lineList.length > 0">
            <div
              v-for="(item, index) in lineList"
              :key="index"
              class="node-box"
              @click="LineCheck(item)"
            >
              <div class="node-item-line">
                <i :class="item.icon" />
              </div>
              <div class="node-title">{{ item.name }}</div>
            </div>
            <div style="clear:both" />
          </div>

          <div class="nav">事件</div>
          <!-- @dragstart 开始拖放事件 -->
          <div v-if="node.list.length > 0">
            <div v-for="(item, index) in node.list" :key="index" class="node-box">
              <div :class="item.classes" draggable="true" @dragstart="onDragStart($event, item)">
                <i :class="item.icon" />
              </div>
              <div class="node-title">{{ item.name }}</div>
            </div>
            <div style="clear:both" />
          </div>

          <div class="nav">动作</div>
          <!-- @dragstart 开始拖放事件 -->
          <div v-if="node.list1.length > 0">
            <div v-for="(item, index) in node.list1" :key="index" class="node-box">
              <div :class="item.classes" draggable="true" @dragstart="onDragStart($event, item)">
                <i :class="item.icon" />
              </div>
              <div class="node-title">{{ item.name }}</div>
            </div>
            <div style="clear:both" />
          </div>

          <div class="nav">属性判断</div>
          <!-- @dragstart 开始拖放事件 -->
          <div v-if="node.list2.length > 0">
            <div v-for="(item, index) in node.list2" :key="index" class="node-box-one">
              <div :class="item.classes" @dragstart="onDragStart($event, item)" draggable="true">
                <i :class="item.icon"></i>
              </div>
              <div class="node-title">{{ item.name }}</div>
            </div>
            <div style="clear:both" />
          </div>

          <div class="nav">流程控制</div>
          <!-- @dragstart 开始拖放事件 -->
          <div v-if="node.list3.length > 0">
            <div v-for="(item, index) in node.list3" :key="index" class="node-box-one">
              <div :class="item.classes" @dragstart="onDragStart($event, item)" draggable="true">
                <i :class="item.icon"></i>
              </div>
              <div class="node-title">{{ item.name }}</div>
            </div>
            <div style="clear:both" />
          </div>

          <div class="nav">条件控制</div>
          <!-- @dragstart 开始拖放事件 -->
          <div v-if="node.list4.length > 0">
            <div v-for="(item, index) in node.list4" :key="index" class="node-box">
              <div :class="item.classes" draggable="true" @dragstart="onDragStart($event, item)">
                <i :class="item.icon" />
              </div>
              <div class="node-title">{{ item.name }}</div>
            </div>
            <div style="clear:both" />
          </div>
        </div>

        <div class="main">
          <div class="btn-box">
            <el-button
              size="small"
              class="save-btn"
              :disabled="true"
              type="primary"
              @click="saveData"
            >保存流程</el-button>
            <el-button
              size="small"
              :disabled="true"
              class="clear-btn"
              @click="clearData"
            >重置流程</el-button>
          </div>
          <!-- @dragover.prevent 非常关键, 不加这个不会触发 drop 事件 -->
          <!-- @drop 拖放事件 -->
          <div class="flow-box">
            <div id="flow" />
          </div>

          <div
            v-if="isShow"
            class="toolsDiv"
          >
            <div class="toolsDiv-box">
              <!-- 头部 -->
              <div class="toolsDiv_header">
                <span style="float:left;">{{ clickItem.name }}</span>
                <i
                  class="el-icon-close del-icon"
                  @click="hide"
                />
              </div>

              <div class="toolsDiv_contant">
                <!-- 业务逻辑 -->
                 <!-- 业务逻辑(结束和菱形没业务逻辑，只允许修改元素名和删除元素) -->
                <div v-if="clickItem.id < 30 &&  clickItem.id  !=  11" class="toolsDiv-nav">业务逻辑</div>
                <!-- 元素 -->
                  <eventFrom
                  v-if="clickItem.id < 10"
                  :showData="eventShowData"
                  :eventType="clickItem.id"
                  :action = "'look'"
                  @sendValue="eventData"
                  @claer="hide"
                ></eventFrom>

                <eventFrom
                  v-if="clickItem.id == 10"
                  :showData="eventShowData"
                  :eventType="clickItem.id"
                  @sendValue="eventData"
                  @claer="hide"
                  :action = "'look'"
                  :type="'draw'"
                ></eventFrom>

                <!-- 微信信息-->
                <wechatFrom
                  v-if="clickItem.id == 20"
                  :showData="eventShowData"
                   :action = "'look'"
                  @gteData="formGetData"
                  @claer="hide"
                ></wechatFrom>
                <!-- 短信信息 -->
                <noteFrom
                  v-if="clickItem.id == 21"
                  :showData="eventShowData"
                   :action = "'look'"
                  @gteData="formGetData"
                  @claer="hide"
                ></noteFrom>
                <!-- 模板消息 -->
                <templateFrom
                  v-if="clickItem.id == 22"
                  :showData="eventShowData"
                   :action = "'look'"
                  @gteData="formGetData"
                  @claer="hide"
                ></templateFrom>
                <!-- 打标签 -->
                <tagFrom
                  v-if="clickItem.id == 23"
                  :showData="eventShowData"
                   :action = "'look'"
                  @gteData="formGetData"
                  @claer="hide"
                ></tagFrom>

                <!-- A/B 测试 -->
                <abtextFrom
                  v-if="clickItem.id == 32"
                  :showData="eventShowData"
                   :action = "'look'"
                  @gteData="abtextGetData"
                  @claer="hide"
                ></abtextFrom>

                <!-- 分支 -->
                <branchFrom
                  v-if="clickItem.id == 31"
                  :showData="eventShowData"
                   :action = "'look'"
                  @gteData="branchGetData"
                  @claer="hide"
                ></branchFrom>

                <!-- 属性判断 -->
                <attributeFrom
                  v-if="clickItem.id == 30"
                   :action = "'look'"
                  :showData="eventShowData"
                  @gteData="attributeGetData"
                  @claer="hide"
                ></attributeFrom>

              </div>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        title="修改标签名"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-input
          v-model="labelValue"
          placeholder="请输入标签名"
          clearable
        />
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="setLabelName"
          >确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="修改元素文本"
        :visible.sync="dialogText"
        width="30%"
      >
        <el-input
          v-model="textValue"
          placeholder="请输入"
          clearable
        />
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogText = false">取 消</el-button>
          <el-button
            type="primary"
            @click="saveTextValue"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</d2-container>
</template>

<script>
import { jsPlumb } from "jsplumb";
import * as d3 from "d3";
import nodeData from "./nodeData";
import eventFrom from "./draw-from/event-from";
import wechatFrom from "./draw-from/wechat-from";
import noteFrom from "./draw-from/note-from";
import templateFrom from "./draw-from/template-from";
import tagFrom from "./draw-from/tag-from";
import branchFrom from "./draw-from/branchFrom";
import attributeFrom from "./draw-from/attributeFrom";
import abtextFrom from "./draw-from/abtextFrom";

import {
  addFlowSave,
  FlowDetails,
  saveAutomateStore
} from "@/api/marketing/automated";
import { setTimeout } from "timers";

export default {
  name: "MarketingAutomatedDraw",
  components: {
    eventFrom,
    wechatFrom,
    noteFrom,
    templateFrom,
    tagFrom,
    branchFrom,
    attributeFrom,
    abtextFrom
  },
  data() {
    return {
      // jsplumb 实例对象
      instance: null,

      // 偏移参数, 用于确定被拖拽的元素需要被放到什么位置
      offset: { x: 0, y: 0 },

      // 从左侧拖到右侧时, current 会被赋值为左侧被拖拽的节点的数据
      current: null,

      // 读取JSON的数据绑定变量
      input: "",
      // 线形
      connector: ["Flowchart", { curviness: 50 }],

      // 导出JSON变量
      output: "",
      // 左侧的测试节点数据
      node: nodeData,

      form: {
        name: '',
        region: '',
        resource: ''
      },
      isShow: false,
      lineList: nodeData.lineList,
      dialogVisible: false,
      labelValue: '',
      copyLabelEvent: null,
      updateType: '',
      dialogText: false,
      textValue: '',
      copyElementEvent: null,
      CopyConnections: [],
      nowAddEvent: false, // /添加元素此字段改为true
      clickItem: null,
      eventId: null,
      eventShowData: null,
      sendData: {
        data: {
          data: null, // 流程图数据
          nodes: [] // /nodes结束
        },
        id: null,
        remark: null, // 备注
        title: null // 自动化营销标题
      },
      sendNdes: [], //暂存node数据
      ActionData: {}, //判断条件的数据
      saveNodesIdObj: {},
      abtextData: {},
      attributeData: {},
      branchData: {}
    };
  },
  created() { },
  mounted() {
    this.createInstance();
    this.sendData.data.nodes = [];
    this.getDetails(this.$route.query.id);
  },
  methods: {
    getDetails(id) {
      FlowDetails({
        id: id
      }).then(res => {
        if (res.code == 0) {
          this.sendData.title = res.data.title;
          this.sendData.remark = res.data.remark;
          const nodedata = JSON.parse(res.data.data);
          //  console.log(res.data)
          if (!this.$isNull(nodedata.nodes)) {
            this.sendNdes = nodedata.nodes;
          }

          if (!this.$isNull(nodedata.data)) {
            // 回显流程图
            let flowData = JSON.parse(nodedata.data);
            this.importNodes(flowData);
            // 回显判断条件对应的数据
            if (!this.$isNull(flowData.ActionData)) {
              this.ActionData = flowData.ActionData;
            }

            if (!this.$isNull(flowData.abtextData)) {
              //A/B 数据回显
              this.abtextData = flowData.abtextData;
            }

            if (!this.$isNull(flowData.branchData)) {
              //分支数据回显
              this.branchData = flowData.branchData;
            }

            if (!this.$isNull(flowData.attributeData)) {
              //属性数据回显
              this.attributeData = flowData.attributeData;
            }

            if (!this.$isNull(flowData.abtextData)) {
              //abtest数据回显
              this.abtextData = flowData.abtextData;
            }
          } else {
            // /初始化开始
            this.initNodes();
          }
        }
      });
    },
    LineCheck(data) {
      // 线形选择
      this.lineList.map(val => {
        val.check = false
      })
      this.$set(data, 'check', true)
      this.connector = data.line
    },
    updateText() {
      this.hide()
      this.textValue = ''
      this.dialogText = true
    },
    saveTextValue() {
      // /保存元素文本
      $("#" + this.eventId)
        .children(".text-box")
        .text(this.textValue);
      this.instance.setSuspendDrawing(false, true); // 此方法重绘
      this.dialogText = false;
    },
    deleteElement() {
      // 移除元素
      this.hide();
      this.instance.remove(this.copyElementEvent);
      // console.log(this.copyElementEvent.id)
      // /删除触发器数据
      this.sendNdes.map((item, index) => {
        if (item.node == this.copyElementEvent.id) {
          this.sendNdes.splice(index, 1);
        }
      });

      //删除abtext数据
      if (this.abtextData[this.copyElementEvent.id]) {
        this.abtextData[this.copyElementEvent.id] = null;
      }

      //删除分支数据
      if (this.branchData[this.copyElementEvent.id]) {
        this.branchData[this.copyElementEvent.id] = null;
      }

      //删除属性数据
      if (this.attributeData[this.copyElementEvent.id]) {
        this.attributeData[this.copyElementEvent.id] = null;
      }
    },
    setLabelName() {
      this.dialogVisible = false
      if (this.labelValue && this.labelValue != '') {
        this.copyLabelEvent.setLabel(this.labelValue)
      } else {
        this.copyLabelEvent.setLabel('')
      }
    },
    initNodes() {
      // /初始化开始流程(每个流程默认初始化一个开始流程)
      const json = {
        id: "node_h6fumt7up55",
        line: "Straight",
        name: "开始",
        nodeId: "10",
        x: 350,
        y: 30
      }
      // 通过节点id找到左侧相对于的节点数据
      const data = { ...this.node.object[json.nodeId] };
      data.name = json.name;
      let connector = [];
      this.lineList.map(val => {
        if (val.type == json.line) {
          connector = val.line
        }
      })
      // 将节点添加到 jsplumb 实例上
      this.createNode(json.id, data, json.x, json.y, connector)
    },
    hide() {
      this.clickItem = null;
      this.isShow = false;
    },
    show() {
      this.isShow = true
    },
    createInstance() {
      /**
       * jsplumb 部分说明可以参考这里
       * https://github.com/rysinal/jsPlumb/wiki/%E8%AF%B4%E6%98%8E
       */

      // 默认连接器的类型
      // let  connector = [ "Bezier", {
      //   curviness: 50
      // }];
      const connector = this.connector;
      // 配置拖拽元素的参数
      const dragOptions = {
        cursor: "pointer",
        zIndex: 2000
      }
      // 连接点的样式
      const paintStyle = {
        stroke: "#Fa9c00",
        lineWidth: 3
      }
      // 重叠样式
      const overlays = [
        [
          'PlainArrow',
          {
            location: 1,
            width: 12,
            length: 12
          }
        ]
      ]
      // 锚点样式
      const endpoint = [
        "Dot",
        {
          radius: 5
        }
      ]
      // 锚点的css样式声明
      const endpointStyle = {
        fill: "#567567"
      };
      // 鼠标经过样式
      const endpointHoverStyle = {
        fill: "#7073EB"
      };
      // 鼠标经过线的样式
      const hoverPaintStyle = {
        stroke: "#7073EB"
      };

      const __this = this;

      // 创建一个 jsplumb 实例
      this.instance = jsPlumb.getInstance({
        Connector: connector,
        DragOptions: dragOptions,
        PaintStyle: paintStyle,
        Overlays: overlays,
        Endpoint: endpoint,
        EndpointStyle: endpointStyle,
        HoverPaintStyle: hoverPaintStyle,
        EndpointHoverStyle: endpointHoverStyle,
        // 在 ID 为 flow 的容器上创建实例
        Container: 'flow',
        ConnectionOverlays: [
          [
            'Label',
            {
              location: 0.5,
              label: '',
              cssClass: 'a-Label',
              visible: true,
              id: 'label',
              events: {
                tap: function() {
                     __this.$notify.error({
                      title: "错误",
                      message: "当前为详情页,不支持变更数据"
                    });
                }
              }
            }
          ]
        ]
      });
      var _this = this;
      this.instance.bind("click", function(conn, originalEvent) {
        if (originalEvent.path[0].getAttribute("id") == null) {
           ///删除线条,此处判断是表示点击箭头才删除线条,点击文字则为修改标签名
            _this.$notify.error({
              title: "错误",
              message: "当前为详情页,不支持变更数据"
            });
        }
      })

      this.instance.bind("connection", function(info) {
        // /连完成后事件
        var connection = info.connection;
        const target = d3.select("#" + info.targetId);
        const targetDom = d3.select("#" + info.sourceId);

        //分支只能连事件
        if (targetDom.attr("node-id") == 31) {
          if (target.attr("type") == 2) {
            _this.instance.deleteConnection(info.connection);
            _this.$notify.error({
              title: "错误",
              message: "分支不能连动作"
            });
            return;
          }
        }

        //属性判断只能连动作
        if (targetDom.attr("node-id") == 30) {
          if (target.attr("type") == 1) {
            _this.instance.deleteConnection(info.connection);
            _this.$notify.error({
              title: "错误",
              message: "属性判断不能连事件"
            });
            return;
          }
        }
        ///A/B测试只能连动作或事件
        if (targetDom.attr("node-id") == 32) {
          if (target.attr("node-id") == 30 || target.attr("node-id") == 31) {
            _this.instance.deleteConnection(info.connection);
            _this.$notify.error({
              title: "错误",
              message: "A/B测试不能连接属性判断或分支"
            });
            return;
          }
        }

        if (targetDom.attr("node-id") == "30") {
          //属性判断元素左边设置为'是'右边设置为'否'
          let sourceEndpointType = info.sourceEndpoint.anchor.type;
          if (sourceEndpointType == "Left") {
            connection.getOverlay("label").setLabel("是");
            target.attr("passDataId", info.sourceId);
          } else if (sourceEndpointType == "Right") {
            connection.getOverlay("label").setLabel("否");
            target.attr("noPassDataId", info.sourceId);
          }
          target.attr("pid", targetDom.attr("pid"));
        } else if (targetDom.attr("node-id") == "31") {
          //分支
          target.attr("branch-id", info.sourceId);
           target.attr("pid", targetDom.attr("pid"));
        } else if (targetDom.attr("node-id") == "32") {
          //abtest 连接时
          if (target.attr("type") == "1") {
            target.attr("pid", targetDom.attr("pid"));
          } else if (target.attr("type") == "2") {
            target.attr("pid", info.sourceId);
            target.attr("abpid", targetDom.attr("pid"));
          } else {
            target.attr("pid", info.sourceId);
          }
          target.attr("ab-ele-id", info.sourceId);
          target.attr("abline-id", info.sourceId + "@" + info.targetId);
        } else if (targetDom.attr("type") == 1) {
          if (targetDom.attr("abpid")) {
            target.attr("pid", targetDom.attr("abpid"));
          } else {
            target.attr("pid", info.sourceId);
          }

          if (targetDom.attr("ab-ele-id")) {
            target.attr("ab-ele-id", targetDom.attr("ab-ele-id"));
          }

          let childId = target.attr("child-id");
          if (childId) {
            childId = JSON.parse(childId);
            childId.map(vl => {
              $("#" + vl).attr("pid", info.sourceId);
            });
          }
          if (targetDom.attr("abline-id")) {
            target.attr("abline-id", targetDom.attr("abline-id"));
          }
        } else {
          if (target.attr("type") == "1") {
            if (targetDom.attr("abpid")) {
              //abtext下的动作连事件pid应为上一节点的abpid
              target.attr("pid", targetDom.attr("abpid"));
            } else {
              target.attr("pid", targetDom.attr("pid"));
            }
          } else {
            target.attr("pid", targetDom.attr("pid"));
          }

          //属性判断下的元素的逻辑
          if (targetDom.attr("passDataId")) {
            target.attr("passDataId", targetDom.attr("passDataId"));
          }
          if (targetDom.attr("noPassDataId")) {
            target.attr("noPassDataId", targetDom.attr("noPassDataId"));
          }

          // 分支元素下的逻辑
          if (targetDom.attr("ab-ele-id")) {
            target.attr("ab-ele-id", targetDom.attr("ab-ele-id"));
          }

          if (targetDom.attr("abpid")) {
            target.attr("abpid", targetDom.attr("abpid"));
          }
          if (targetDom.attr("abline-id")) {
            target.attr("abline-id", targetDom.attr("abline-id"));
          }
        }

        const labelID = connection.getOverlay("label").getElement().id;
        $("#" + labelID).addClass(info.sourceId);
        $("#" + labelID).attr("labId", info.sourceId + "@" + info.targetId);

        // 记录自己的下级
        if (targetDom.attr("child-id")) {
          let arr = JSON.parse(targetDom.attr("child-id"));
          arr.push(info.targetId);
          targetDom.attr("child-id", JSON.stringify(arr));
        } else {
          let arr = [];
          arr.push(info.targetId);
          targetDom.attr("child-id", JSON.stringify(arr));
        }

        if (!_this.nowAddEvent) {
          //回显时
          const id = info.sourceId + info.targetId;
          _this.CopyConnections.map(val => {
            if (val.labelEleId == id) {
              connection.getOverlay("label").setLabel(val.labelName);
            }
          });
        } else {
          if (targetDom.attr("node-id") != "30") {
            connection.getOverlay("label").setLabel("是");
          }
        }
      });
    },
    setLabel() {
      this.hide()
      this.dialogVisible = true
    },
    exportNodes() {
      const json = { nodes: [], connections: [] };

      // 获取当前 jsplumb 实例上存在的所有连接线
      const connections = this.instance.getConnections();
      for (var idx in connections) {
        const item = connections[idx];
        const sourceId = item.endpoints.map(res => res._jsPlumb.uuid)[0];
        const targetId = item.endpoints.map(res => res._jsPlumb.uuid)[1];
        json.connections.push({
          sourceId: sourceId,
          targetId: targetId,
          labelEleId:
            item.endpoints[0].anchor.elementId +
            item.endpoints[1].anchor.elementId,
          yes: $("#" + targetId).attr("yes")
        });
      }

      // // 获取当前 jsplumb 实例上的所有标签数据
      const Label = jsPlumb.getSelector("#flow .a-Label");
      for (var idx = 0; idx < Label.length; idx++) {
        const item = Label[idx];
        json.connections[idx].labelName = item.innerText;
      }

      // 获取当前 jsplumb 实例上的所有节点数据
      const nodes = jsPlumb.getSelector("#flow .node-deo");
      const nodes_start = jsPlumb.getSelector("#flow .node-deo-start");
      const nodes_lin = jsPlumb.getSelector("#flow .node-item-lin");
      let nodesCount = [];
      for (var idx = 0; idx < nodes.length; idx++) {
        nodesCount.push(nodes[idx]);
      }
      for (var idx = 0; idx < nodes_start.length; idx++) {
        nodesCount.push(nodes_start[idx]);
      }
      for (var idx = 0; idx < nodes_lin.length; idx++) {
        nodesCount.push(nodes_lin[idx]);
      }

      for (var idx = 0; idx < nodesCount.length; idx++) {
        const item = nodesCount[idx];
        json.nodes.push({
          id: item.getAttribute("id"),
          nodeId: item.getAttribute("node-id"),
          pid: item.getAttribute("pid") ? item.getAttribute("pid") : null,
          childid: item.getAttribute("child-id")
            ? JSON.parse(item.getAttribute("child-id"))
            : null,
          x: parseInt(item.style.left, 10),
          y: parseInt(item.style.top, 10),
          name: $(item)
            .children(".text-box")
            .text(),
          line: item.getAttribute("line"),
          type: item.getAttribute("type"),
          passDataId: item.getAttribute("passDataId")
            ? item.getAttribute("passDataId")
            : null,
          noPassDataId: item.getAttribute("noPassDataId")
            ? item.getAttribute("noPassDataId")
            : null,
          ablineId: item.getAttribute("abline-id")
            ? item.getAttribute("abline-id")
            : null,
          abpid: item.getAttribute("abpid") ? item.getAttribute("abpid") : null,
          abEleId: item.getAttribute("ab-ele-id")
            ? item.getAttribute("ab-ele-id")
            : null,
          branchId: item.getAttribute("branch-id")
            ? item.getAttribute("branch-id")
            : null
        });
      }

      // for (var idx = 0; idx < nodes_lin.length; idx++) {
      //   const item = nodes_lin[ idx ]
      //   json.nodes.push({
      //     id: item.getAttribute('id'),
      //     nodeId: item.getAttribute('node-id'),
      //     pid: item.getAttribute('pid') ? item.getAttribute('pid') : null,
      //     childid: item.getAttribute('child-id')
      //       ? JSON.parse(item.getAttribute('child-id'))
      //       : null,
      //     x: parseInt(item.style.left, 10),
      //     y: parseInt(item.style.top, 10),
      //     name: $(item).children('.text-box').text(),
      //     line: item.getAttribute('line'),
      //     type: item.getAttribute('type')
      //   })
      // }

      // 最终以JSON数据显示到页面上
      this.output = json;

      return this.output;
    },
    importNodes(nodeData) {
      const json = nodeData;
      for (var idx in json.nodes) {
        const item = json.nodes[idx];

        // 通过节点id找到左侧相对于的节点数据
        const data = { ...this.node.object[item.nodeId] };
        data.name = item.name;
        let connector = [];
        this.lineList.map(val => {
          if (val.type == item.line) {
            connector = val.line
          }
        })
        // 将节点添加到 jsplumb 实例上
        this.createNode(item.id, data, item.x, item.y, connector)
      }

      if (json.connections) {
        this.CopyConnections = json.connections
      }

      const __that = this;
      // 将所有连接线添加到 jsplumb 实例上
      for (var idx in json.connections) {
        const item = json.connections[idx];
        this.instance.connect({
          uuids: [item.sourceId, item.targetId]
        })
      }
    },
    onInput(e) {
      // 这个方法仅供参考, 目地是让 div 这种不支持 v-model 的容器能把输入值传递给vue
      this.input = e.target.innerText;
    },
    // 左侧节点开始拖拽事件
    onDragStart(event, item) {
      // 记录拖拽时鼠标在节点的哪个位置
      this.offset.x = event.offsetX;
      this.offset.y = event.offsetY;

      // 同时把此节点的相关数据写入事件信息中, 方便后续获取
      event.dataTransfer.setData("text/plain", JSON.stringify(item));
    },
    // 左侧节点被拖放到 jsplumb 上面时的事件
    onDrop(event) {
      // 获取被拖拽到 jsplumb 上面的节点相关数据
      const data = event.dataTransfer.getData("text/plain");

      if (data) {
        this.current = JSON.parse(data);
      }

      // 此处计算节点被拖放到 jsplumb 实例的哪个座标
      const x = event.offsetX - this.offset.x;
      const y = event.offsetY - this.offset.y;

      // 随机产生一个id, 用于页面获取元素时使用, 不涉及到数据
      const id =
        "node_" +
        Math.random()
          .toString(36)
          .substr(2);

      // 创建节点
      this.createNode(id, this.current, x, y, this.connector);
      //拖拽释放后打开侧边
      this.openProperties(document.getElementById(id));

      this.nowAddEvent = true;
    },
    openProperties(event) {
      this.hide();
      let id = null;
      this.copyElementEvent = event;
      id = event.getAttribute("node-id");
      this.eventId = event.getAttribute("id");
      // 回显已经设置好的的数据
      // 清除上一步数据,此处很重要
      this.eventShowData = null;
      if (id * 1 < 20) {
        // 事件图形回显值
        this.sendNdes.map(val => {
          if (this.eventId == val.node) {
            // /描述\标题回显
            this.$set(val.trigger, "id", val.id);
            this.$set(val.trigger, "flowTitle", this.sendData.title);
            this.$set(val.trigger, "remark", this.sendData.remark);
            this.eventShowData = { ...val.trigger };
          }
        });
      } else if (id * 1 > 19 && id * 1 < 30) {
        //动作
        if (this.ActionData[this.eventId]) {
          this.eventShowData = this.ActionData[this.eventId];
        }
      } else if (id * 1 == 32) {
        //A/B测试
        let labelArr = $("." + this.eventId);
        let abtextData = [];
        for (var i = 0; i < labelArr.length; i++) {
          let item = labelArr[i];
          let optiom = {
            id: $(item).attr("labId"),
            lineId: $(item).attr("id"),
            label: $(item).text(),
            value: null
          };
          abtextData.push(optiom);
        }

        if (this.abtextData[this.eventId]) {
          let list = this.abtextData[this.eventId];
          for (var j = 0; j < abtextData.length; j++) {
            for (var k = 0; k < list.length; k++) {
              if (abtextData[j].id == list[k].id) {
                abtextData[j].value = list[k].value;
              }
            }
          }
        }

        this.eventShowData = {
          abtextData: abtextData
        };
      } else if (id * 1 == 31) {
        //分支
        let labelArr = $("." + this.eventId);
        let branchData = [];
        for (var i = 0; i < labelArr.length; i++) {
          let item = labelArr[i];
          let optiom = {
            id: $(item).attr("labId"),
            lineId: $(item).attr("id"),
            label: $(item).text(),
            conditions: [],
            nextId: $(item)
              .attr("labId")
              .split("@")[1]
          };
          optiom.selecItemtList = [];
          branchData.push(optiom);
        }
        if (this.branchData[this.eventId]) {
          let list = this.branchData[this.eventId];
          for (var j = 0; j < branchData.length; j++) {
            for (var k = 0; k < list.length; k++) {
              if (branchData[j].id == list[k].id) {
                branchData[j].conditions = list[k].conditions;
              }
            }
          }
        }

        this.eventShowData = {
          branchData: branchData
        };
      } else if (id * 1 == 30) {
        //属性判断
        if (this.attributeData[this.eventId]) {
          this.eventShowData = this.attributeData[this.eventId];
        }
      }
      this.clickItem = { ...this.node.object[id] };

      var _that = this;
      setTimeout(function() {
        _that.show();
      }, 100);
    },
    createNode(id, data, x, y, connector) {
      this.hide();
      // 此处使用 d3js, 避免使用 jquery
      let pid = null;
      if (id == "node_h6fumt7up55") {
        pid = "0";
      }
      let html;
      if (data.type == 3) {
        // 菱形处理逻辑
        html = `
          <div 
            style="position:absolute;top:${y}px;left:${x}px;"
            class="${data.classesDeo}"
            id="${id}"
            node-id="${data.id}"
            line="${connector[0]}"
            type="${data.type}"
          >
           <div  class="lingxing"></div>
            <div title="${data.name.trim()}" class="lingxing-text text-box">
              ${data.name}
            </div>
          </div>
        `;
      } else if (data.type == 1 || data.type == 2) {
        if (data.id == 10) {
          //开始
          html = `
          <div 
            style="position:absolute;top:${y}px;left:${x}px;"
            class="${data.classesDeo}"
            id="${id}"
            pid="${pid}"
            node-id="${data.id}"
            line="${connector[0]}"
            type="${data.type}"
          >
           <div class="ele-icon-start">
            <i class="${data.icon}" />
           </div>
            <div title="${data.name.trim()}" class="ele-right-start text-box">
              ${data.name}
           </div>
          </div>
        `;
        } else {
          //其他
          html = `
          <div 
            style="position:absolute;top:${y}px;left:${x}px;"
            class="${data.classesDeo}"
            id="${id}"
            pid="${pid}"
            node-id="${data.id}"
            line="${connector[0]}"
            type="${data.type}"
          >
           <div class="ele-icon">
            <i class="${data.icon}" />
           </div>
           <div title="${data.name.trim()}" class="ele-right text-box">
               ${data.name}
           </div>
          </div>
         `;
        }
      }

      $("#flow").append(html);

      // 获取刚刚创建的节点元素
      const node = $("#" + id);
      // 双击事件
      // node.ondblclick = this.openPropertiesClick;
      let that = this;
      node.dblclick(function() {
        that.openProperties(document.getElementById(id));
      });

      // 使 jsplumb 上面创建的节点可以被拖拽, 且仅限在 jsplumb 实例区域拖拽
      this.instance.draggable(node, { containment: "parent" });

      // 连节点定义, 此处为最全的清单
      const ports = ["Top", "Bottom", "Left", "Right"];

      // 为添加到 jsplumb 上的节点添加连节点
      for (let i = 0; i < data.endpoints.length; i++) {
        const obj = {
          // 连节点的ID信息, 主要是载入回来时需要用两个连接点的UUID来重新连接他们
          uuid: node.attr("id") + "-" + ports[i],
          // 连节点的样式定义
          paintStyle: { radius: 5, stroke: "#CCC", fill: "transparent" },
          // 定义连节点的方向
          anchor: data.endpoints[i].dir,
          // 最大可以连多少个连接线, -1 为不限
          maxConnections: data.endpoints[i].limit,
          // 是否可以从这个连接点连接到其他连节点
          isSource: data.endpoints[i].source,
          // 是否可以被其他连接点连接
          isTarget: data.endpoints[i].target,
          // 线形
          connector: connector
        };

        this.instance.addEndpoint(node, obj);
      }
    },
    saveData() {
      // /保存数据
      const saveData = this.exportNodes();
      this.saveNodesIdObj = {};
      let eventEleList = []; //事件元素 type = 1
      let actionEleList = []; //动作元素 type = 2
      let attributeEleList = []; //属性判断
      let branchEleList = []; //分支
      let abtextEleList = []; //abText

      let have_attitube = []; ///属性判断下的元素
      let have_branch = []; ///分支下的元素
      saveData.nodes.map(val => {
        if (val.type == "1") {
          eventEleList.push(val);
        }
        if (val.type == "2") {
          actionEleList.push(val);
        }
        if (val.nodeId == "30") {
          attributeEleList.push(val);
        }
        if (val.nodeId == "31") {
          branchEleList.push(val);
        }
        if (val.nodeId == "32") {
          abtextEleList.push(val);
        }

        if (val.passDataId || val.noPassDataId) {
          //筛出属性判断下的元素
          have_attitube.push(val);
        }

        if (val.branchId) {
          //筛出分支下的元素
          have_branch.push(val);
        }
      });

      ///分支数据（包含分支下的事件和动作数据的收集，不包含分支下属性判断数据的收集）
      let branchData = {};
      branchEleList.map(ite => {
        ite.branchData = [];
        let branchlis = this.branchData[ite.id];
        branchlis.map(val => {
          let option = {
            filter: {
              conditions: val.conditions,
              description: val.description,
              name: val.label
            },
            passData: {
              operations: [],
              nextId: null,
              branchData: []
            }
          };

          have_branch.map(val => {
            if (ite.id == val.branchId) {
              if (val.type == "1") {
                option.passData.nextId = val.id;
              }
              if (val.type == "2") {
                option.passData.operations.push(this.ActionData[val.id]);
              }
            }
          });
          ite.branchData.push(option);
        });
        branchData[ite.id] = ite.branchData;
      });

      ///属性判断数据（包含属性判断下的事件和动作数据的收集，不包含属性判断下分支数据的收集）
      let attributeData = {};
      attributeEleList.map(ite => {
        let attributelis = this.attributeData[ite.id];
        ite.attitubeData = {
          filter: {
            conditions: attributelis.conditions,
            description: attributelis.description,
            name: attributelis.name
          },
          passData: {
            operations: [],
            nextId: null,
            branchData: []
          },
          noPassData: {
            operations: [],
            nextId: null,
            branchData: []
          }
        };
        have_attitube.map(val => {
          if (ite.id == val.passDataId) {
            if (val.type == "1") {
              ite.attitubeData.passData.nextId = val.id;
            }
            if (val.type == "2") {
              ite.attitubeData.passData.operations.push(
                this.ActionData[val.id]
              );
            }
          }
          if (ite.id == val.noPassDataId) {
            if (val.type == "1") {
              ite.attitubeData.noPassData.nextId = val.id;
            }
            if (val.type == "2") {
              ite.attitubeData.noPassData.operations.push(
                this.ActionData[val.id]
              );
            }
          }
        });
        attributeData[ite.id] = ite.attitubeData;
      });

      // 分支下的属性判断数据的收集
      branchEleList.map(ite => {
        have_branch.map(val => {
          if (ite.id == val.branchId) {
            if (val.type == "3") {
              // 只要有属性判数据,同时把属性判断数据加上
              ite.branchData.push(attributeData[val.id]);
            }
          }
        });
      });

      //属性判断下的分支数据的收集
      attributeEleList.map(ite => {
        have_attitube.map(val => {
          if (ite.id == val.passData) {
            if (val.type == "3") {
              // 只要有属性判数据，则不会有nextId,同时把属性判断数据加上
              ite.attitubeData.passData.nextId = null;
              ite.attitubeData.passData.branchData = branchData[val.id];
            }
          }
          if (ite.id == val.noPassDataId) {
            if (val.type == "3") {
              // 只要有属性判数据，则不会有nextId,同时把属性判断数据加上
              ite.attitubeData.noPassData.nextId = null;
              ite.attitubeData.noPassData.branchData = branchData[val.id];
            }
          }
        });
      });

      ///动作数据
      let ActionData = {};
      actionEleList.map(va => {
        let actionlis = this.ActionData[va.id];
        if (actionlis) {
          let option = {
            mode: actionlis.mode,
            operationItems: actionlis.operationItems,
            runAt: actionlis.runAt,
            extraOperation: actionlis.extraOperation
          };

          if (va.abpid) {
            ActionData[va.abpid] = option;
          } else {
            ActionData[va.pid] = option;
          }
        }
      });

      ///abTest数据
      let have_abEleId = [];
      let no_abEleId = [];
      abtextEleList.map(va => {
        if (va.abEleId) {
          have_abEleId.push(va);
        }
        if (!va.abEleId) {
          no_abEleId.push(va);
        }
        va.abtest = {};
        va.ac_operations = [];
        eventEleList.map(va_1 => {
          if (va_1.abEleId == va.id) {
            // 事件：收集nextId和proportion
            let opt = {
              nextId: va_1.id,
              proportion: null,
              operations: [],
              items: []
            };
            this.abtextData[va.id].map(it => {
              if (va_1.ablineId == it.id) {
                opt.proportion = it.value;
                let indx = it.id.split("@")[1];
                va.abtest[indx] = opt;
              }
            });
          }
        });
        actionEleList.map(va_2 => {
          if (va_2.abEleId == va.id) {
            // 动作：收集operations和proportion
            let opt_v2 = {
              nextId: null,
              proportion: null,
              operations: [],
              items: []
            };
            this.abtextData[va.id].map(it => {
              if (va_2.ablineId == it.id) {
                opt_v2.proportion = it.value;
                va.ac_operations.push(this.ActionData[va_2.id]);
                opt_v2.operations = va.ac_operations;
                let indx = it.id.split("@")[1];
                if (va.abtest[indx]) {
                  if (va.abtest[indx].nextId) {
                    opt_v2.nextId = va.abtest[indx].nextId;
                  }
                }
                va.abtest[indx] = opt_v2;
              }
            });
          }
        });

        abtextEleList.map(va_3 => {
          if (va_3.abEleId == va.id) {
            // abtest：收集operations
            let opt_v3 = {
              nextId: null,
              proportion: null,
              operations: [],
              items: []
            };
            this.abtextData[va.id].map(it => {
              if (va_3.ablineId == it.id) {
                opt_v3.proportion = it.value;
                let indx = it.id.split("@")[1];
                va.abtest[indx] = opt_v3;
              }
            });
          }
        });
      });
      ///如果存在abEleId  说明是abtest下的abtest,需要将数据放到对应的abtest的items中
      have_abEleId.map(val => {
        have_abEleId.map(val_1 => {
          if (val.id == val_1.pid) {
            //val是父abtest  val_1是子abtest
            let ind = val_1.ablineId.split("@")[1];
            val.abtest[ind].items = Object.values(val_1.abtest);
          }
        });
      });
      ///如果不存在abEleId  说明是元素下的abtest,需要将数据放到对应的元素下
      no_abEleId.map(val => {
        have_abEleId.map(val_1 => {
          if (val.id == val_1.pid) {
            //val是父abtest  val_1是子abtest
            let ind = val_1.ablineId.split("@")[1];
            val.abtest[ind].items = Object.values(val_1.abtest);
          }
        });
      });


      this.sendNdes.map(val => {
        val.branchData = [];
        if (ActionData[val.node]) {
          //如果存在动作数据，则把数据添加上去
          val.operations.push(ActionData[val.node]);
        }
        eventEleList.map(res => {
          if (val.node == res.id) {
            if (res.abpid) {
              ///设置pid
              val.pnode = res.abpid;
            } else {
              val.pnode = res.pid;
            }
          }
        });

        //把属性数据添加上去
        attributeEleList.map(res => {
          if (val.node == res.pid) {
            val.branchData.push(res.attitubeData);
          }
        });
        //把分支数据添加上去
        branchEleList.map(res => {
          if (val.node == res.pid) {
            val.branchData = res.branchData;
          }
        });

        //将数据放到对应的元素下的abTestData中
        no_abEleId.map(item => {
          if (item.pid == val.node) {
            val.abTestData = Object.values(item.abtest);
          }
        });
      });

      console.log(this.sendNdes);
      return;

      ///将动作的数据存到视图的数据里,以备回显数据时使用
      saveData.ActionData = this.ActionData;
      //将A/B测试数据保存
      saveData.abtextData = this.abtextData;
      //将分支数据保存
      saveData.branchData = this.branchData;
      //将属性判断数据保存
      saveData.attributeData = this.attributeData;
      //将abtest据保存
      saveData.abtextData = this.abtextData;

      this.$confirm("保存后数据不能再修改, 是否保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.sendData.data.data = JSON.stringify(saveData);
          this.sendData.data.nodes = this.sendNdes;
          this.sendData.loading = true;

          this.sendData.id = this.$route.query.id;
          addFlowSave(this.sendData).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success"
              });
              // this.$router.push({
              //   name: "marketing-Automated-list"
              // });
            }
          });
        })
        .catch(() => {});
    },
    saveStoreData() {
      let saveData = this.exportNodes();

      ///将动作的数据存到视图的数据里,以备回显数据时使用
      saveData.ActionData = this.ActionData;
      //将A/B测试数据保存
      saveData.abtextData = this.abtextData;
      //将分支数据保存
      saveData.branchData = this.branchData;
      //将属性判断数据保存
      saveData.attributeData = this.attributeData;
      //将abtest据保存
      saveData.abtextData = this.abtextData;

      this.sendData.data.data = JSON.stringify(saveData);
      this.sendData.data.nodes = this.sendNdes;
      this.sendData.loading = true;
      this.sendData.id = this.$route.query.id;
      saveAutomateStore(this.sendData).then(res => {
        if (res.code == 0) {
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          });
        }
      });
    },
    clearData() {
      // 重置数据
      this.$confirm("此操作将删除之前保存数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const saveData = this.exportNodes();
          if (saveData) {
            const nodes = saveData.nodes;
            for (let i = 0; i < nodes.length; i++) {
              const dome = document.getElementById(nodes[i].id);
              // 删除元素
              this.instance.remove(dome);
            }
            this.$notify({
              title: "成功",
              message: "重置成功",
              type: "success"
            });
          }
          // /清除已创建的触发器数据
          this.sendNdes = [];
          // /重置一个开始流程
          this.initNodes();
        })
        .catch(() => {
          // this.$notify.error({
          //   title: '错误',
          //   message: '重置失败'
          // });
        });
    },
    getText() {
      let str;
      if (this.clickItem.id == 0) {
        str = "任意操作";
      } else if (this.clickItem.id == 1) {
        str = "关注";
      } else if (this.clickItem.id == 3) {
        str = "点击菜单";
      } else if (this.clickItem.id == 4) {
        str = "发送消息";
      } else if (this.clickItem.id == 6) {
        str = "会员开卡";
      } else if (this.clickItem.id == 7) {
        str = "订单状态变更";
      }
      return str;
    },
    setText(val) {
      let ele = this.getText();
      let showEleText;
      if (val.operation.operationItems[0].type == 1) {
        showEleText =
          ele +
          "(回复信息):" +
          val.operation.operationItems[0].value[0].text.trim();
      } else {
        showEleText =
          ele +
          "(回复图文):" +
          val.operation.operationItems[0].value[0].wechatMaterialNewsItemList[0].title.trim();
      }
      if (
        $("#" + this.eventId)
          .children(".text-box")
          .text()
      ) {
        $("#" + this.eventId)
          .children(".text-box")
          .text(showEleText.trim());
      } else {
        let html = `<div class="ele-right text-box">
             ${showEleText}
            </div>`;
        $("#" + this.eventId).append(html);
      }
      this.instance.setSuspendDrawing(false, true); // 此方法重绘
    },
    setActionText(val) {
      ///动作
      // console.log(val)
      let showEleText;
      let ele = "";
      if (this.clickItem.id == 20) {
        let str = "微信消息";
        let type = val.operationItems[0].type;
        if (type == 1) {
          showEleText =
            ele + "(推送信息):" + val.operationItems[0].value[0].text.trim();
        } else if (type == 2) {
          showEleText =
            ele +
            "(推送图片):" +
            this.$fileUrl() +
            val.operationItems[0].value[0].localUrl.trim();
        } else if (type == 5) {
          showEleText =
            ele +
            "(推送高级图文):" +
            val.operationItems[0].value[0].advancedNewsItemList[0].title.trim();
        } else if (type == 6) {
          showEleText =
            ele +
            "(推送图文):" +
            val.operationItems[0].value[0].wechatMaterialNewsItemList[0].title.trim();
        } else if (type == 9) {
          showEleText =
            ele +
            "(推送小程序):" +
            val.operationItems[0].value[0].pagePath.trim();
        }
      } else if (this.clickItem.id == 21) {
        //短信
        let str = "短信消息(推送短信):";
        showEleText = str + val.showEleText.trim();
      } else if (this.clickItem.id == 22) {
        //模版消息
        let str = "模板消息(推送消息):";
        showEleText = str + val.showEleText.trim();
      } else if (this.clickItem.id == 23) {
        //打标签
        let str = "打标签:";
        showEleText = str + val.showEleText.join("、");
      }

      if (
        $("#" + this.eventId)
          .children(".text-box")
          .text()
      ) {
        $("#" + this.eventId)
          .children(".text-box")
          .text(showEleText.trim());

        $("#" + this.eventId)
          .children(".text-box")
          .attr("title", showEleText.trim());
      } else {
        let html = `<div title="${showEleText.trim()}" class="ele-right text-box">
            ${showEleText}
            </div>`;
        $("#" + this.eventId).append(html);
      }

      this.instance.setSuspendDrawing(false, true); // 此方法重绘
    },
    eventData(val) {
      console.log(val);
      this.setText(val);

      let option = {
        id: this.eventId, //当前节点id
        last: false, //是否为最后一个节点
        operations: [],
        trigger: val,
        pid: null, //上节点id
        quote: false, //是否为引用触发器
        triggerId: null, ///触发器id
        linkedTriggerId: null
      };

      if (this.sendNdes.length == 0) {
        this.sendNdes.push(option);
      } else {
        let status = false;
        this.sendNdes.map((item, index) => {
          // /相同则修改数据,
          if (item.node == this.eventId) {
            status = true;
            this.sendNdes[index] = option;
          }
        });
        // 不同则添加数据
        if (!status) {
          this.sendNdes.push(option);
        }
      }
      this.hide();
      // console.log(this.sendNdes);
    },
    formGetData(val) {
      console.log(val);
      this.setActionText(val);
      val.id = this.eventId;
      this.ActionData[this.eventId] = val;
      this.hide();
    },
    branchGetData(val) {
      console.log(val);
      val.map(item => {
        $("#" + item.lineId).text(item.label);
      });
      this.branchData[this.eventId] = val;
      this.hide();
    },
    abtextGetData(val) {
      console.log(val);
      val.map(item => {
        $("#" + item.lineId).text(item.label);
      });
      this.abtextData[this.eventId] = val;
      this.hide();
    },
    attributeGetData(val) {
      console.log(val);
      this.attributeData[this.eventId] = val;
      this.hide();
    }
  }
}
</script>

<style>
@import "./css/draw-style.scss";
</style>
<style scoped>
@import "./css/draw-scoped.scss";
</style>
