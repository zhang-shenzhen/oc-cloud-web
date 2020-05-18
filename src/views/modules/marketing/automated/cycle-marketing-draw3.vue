<template>
  <div id="draw-contant" class="draw-contant">
    <div class="home">
      <div class="main-panel">
        <div id="nodes" class="nodes">
          <p class="title">自动化营销</p>

          <div class="nav">事件</div>
          <!-- @dragstart 开始拖放事件 -->
          <div v-if="node.list.length > 0">
            <div
              v-for="(item, index) in node.list5"
              :key="index"
              class="node-box"
            >
              <div
                :class="item.classes"
                :draggable="!islook"
                @dragstart="onDragStart($event, item)"
              >
                <i :class="item.icon" />
              </div>
              <div class="node-title" :title="item.name">{{ item.name }}</div>
            </div>
            <div style="clear:both" />
          </div>

          <div class="nav">动作</div>
          <!-- @dragstart 开始拖放事件 -->
          <div v-if="node.list1.length > 0">
            <div
              v-for="(item, index) in node.list1"
              :key="index"
              class="node-box"
            >
              <div
                :class="item.classes"
                :draggable="!islook"
                @dragstart="onDragStart($event, item)"
              >
                <i :class="item.icon" />
              </div>
              <div class="node-title" :title="item.name">{{ item.name }}</div>
            </div>
            <div style="clear:both" />
          </div>

          <div class="nav">属性判断</div>
          <!-- @dragstart 开始拖放事件 -->
          <div v-if="node.list2.length > 0">
            <div
              v-for="(item, index) in node.list2"
              :key="index"
              class="node-box-one"
            >
              <div
                :class="item.classes"
                :draggable="!islook"
                @dragstart="onDragStart($event, item)"
              >
                <i :class="item.icon" />
              </div>
              <div class="node-title" :title="item.name">{{ item.name }}</div>
            </div>
            <div style="clear:both" />
          </div>

          <div class="nav">流程控制</div>
          <!-- @dragstart 开始拖放事件 -->
          <div v-if="node.list3.length > 0">
            <div
              v-for="(item, index) in node.list3"
              :key="index"
              class="node-box-one"
            >
              <div
                :class="item.classes"
                :draggable="!islook"
                @dragstart="onDragStart($event, item)"
              >
                <i :class="item.icon" />
              </div>
              <div class="node-title" :title="item.name">{{ item.name }}</div>
            </div>
            <div style="clear:both" />
          </div>

          <div class="nav">条件控制</div>
          <!-- @dragstart 开始拖放事件 -->
          <div v-if="node.list4.length > 0">
            <div
              v-for="(item, index) in node.list4"
              :key="index"
              class="node-box"
            >
              <div
                :class="item.classes"
                :draggable="!islook"
                @dragstart="onDragStart($event, item)"
              >
                <i :class="item.icon" />
              </div>
              <div class="node-title" :title="item.name">{{ item.name }}</div>
            </div>
            <div style="clear:both" />
          </div>
        </div>

        <div id="main" class="main">
          <div class="btn-box">
            <el-button
              size="mini"
              :disabled="islook"
              class="save-btn"
              type="primary"
              @click="saveData"
              >保存流程</el-button
            >
            <el-button
              size="mini"
              :disabled="islook"
              class="clear-btn"
              @click="clearData"
              >重置流程</el-button
            >
            <el-button
              size="mini"
              :disabled="islook"
              class="clear-btn"
              @click="saveStoreData"
              >保存到草稿箱</el-button
            >
            <el-button size="mini" class="clear-btn" @click="toggle">{{
              sidebarOpen ? '收起侧栏' : '展开侧栏'
            }}</el-button>
          </div>
          <!-- @dragover.prevent 非常关键, 不加这个不会触发 drop 事件 -->
          <!-- @drop 拖放事件 -->
          <div class="flow-box">
            <div id="flow" @drop="onDrop($event)" @dragover.prevent />
          </div>
        </div>
      </div>

      <el-dialog :title="clickItem.name" :visible.sync="isShow">
        <!-- 元素属性 -->
        <div v-if="clickItem.id != 10" class="toolsDiv-nav">元素属性</div>
        <div class="toolsDiv-btn">
          <el-button
            v-if="clickItem.id != 10"
            size="small"
            type="primary"
            :disabled="islook"
            @click="updateText"
            >修改文本</el-button
          >
          <!-- ///开始元素不可删除 -->
          <el-button
            v-if="clickItem.id != 10"
            size="small"
            type="primary"
            :disabled="islook"
            @click="deleteElement"
            >删除元素</el-button
          >
        </div>

        <!-- 业务逻辑(结束和菱形没业务逻辑，只允许修改元素名和删除元素) -->
        <div v-if="clickItem.id < 30" class="toolsDiv-nav">业务逻辑</div>
        <!-- 元素 -->
        <!-- 卡券到期提醒 -->
        <couponExpiration
          v-if="clickItem.id == 100"
          :show-data="eventShowData"
          :type="'draw'"
          :action="islook ? 'look' : ''"
          @gteData="eventDataCouponExpiration"
          @claer="hide"
        />

        <cycle
          v-if="clickItem.id == 10"
          :show-data="eventShowData"
          :type="'draw'"
          :action="islook ? 'look' : ''"
          @sendValue="StarteventData"
          @claer="hide"
        />

        <!-- 微信信息-->
        <wechatFrom
          v-if="clickItem.id == 20"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="formGetData"
          @claer="hide"
        />
        <!-- 短信信息 -->
        <noteFrom
          v-if="clickItem.id == 21"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="formGetData"
          @claer="hide"
        />
        <!-- 模板消息 -->
        <templateFrom
          v-if="clickItem.id == 22"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="formGetData"
          @claer="hide"
        />
        <!-- 打标签 -->
        <tagFrom
          v-if="clickItem.id == 23"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="formGetData"
          @claer="hide"
        />
        <!-- 打自有标签 -->
        <tagZYFrom
          v-if="clickItem.id == 27"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="formGetData"
          @claer="hide"
        />
        <!-- 会员修改 -->
        <memberUpdateFrom
          v-if="clickItem.id == 24"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="formGetData"
          @claer="hide"
        />

        <!-- 发卡券 -->
        <couponFrom
          v-if="clickItem.id == 25"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="formGetData"
          @claer="hide"
        />
        <!-- 会员建组 -->
        <memberGroup
          v-if="clickItem.id == 33"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="memGroupGetData"
          @claer="hide"
        />
        <!-- 发积分 -->
        <integralFrom
          v-if="clickItem.id == 26"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="formGetData"
          @claer="hide"
        />

        <!-- A/B 测试 -->
        <abtextFrom
          v-if="clickItem.id == 32"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="abtextGetData"
          @claer="hide"
        />

        <!-- 分支 -->
        <branchFrom
          v-if="clickItem.id == 31"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="branchGetData"
          @claer="hide"
        />

        <!-- 属性判断 -->
        <attributeFrom
          v-if="clickItem.id == 30"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="attributeGetData"
          @claer="hide"
        />
      </el-dialog>

      <el-dialog title="修改标签名" :visible.sync="dialogVisible" width="30%">
        <el-input
          v-model="labelValue"
          size="small"
          placeholder="请输入标签名"
          clearable
        />
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false"
            >取 消</el-button
          >
          <el-button size="small" type="primary" @click="setLabelName"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog title="修改元素文本" :visible.sync="dialogText" width="30%">
        <el-input
          v-model="textValue"
          size="small"
          placeholder="请输入"
          clearable
        />
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogText = false">取 消</el-button>
          <el-button size="small" type="primary" @click="saveTextValue"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { jsPlumb } from 'jsplumb'
import * as d3 from 'd3'
import nodeData from './nodeData'
import eventFrom from './draw-from/event-from'
import wechatFrom from './draw-from/wechat-from'
import noteFrom from './draw-from/note-from'
import templateFrom from './draw-from/template-from'
import tagFrom from './draw-from/tag-from'
import branchFrom from './draw-from/branchFrom'
import tagZYFrom from './draw-from/tag-ZYfrom' // 动作 -- 打ZY标签
import attributeFrom from './draw-from/attributeFrom'
import abtextFrom from './draw-from/abtextFrom'
import memberUpdateFrom from './draw-from/memberUpdateFrom'
import couponFrom from './draw-from/couponFrom'
import integralFrom from './draw-from/integralFrom'
import cycle from './draw-from/cycle'
import couponExpiration from './draw-from/coupon-expiration'
import memberGroup from './draw-from/memberGroup' // 会员建组

import {
  addFlowSave,
  FlowDetails,
  saveAutomateStore,
} from '@/api/marketing/automated'
import { setTimeout } from 'timers'

export default {
  name: 'MarketingAutomatedDraw',
  components: {
    eventFrom,
    wechatFrom,
    noteFrom,
    templateFrom,
    tagFrom,
    branchFrom,
    attributeFrom,
    abtextFrom,
    memberUpdateFrom,
    couponFrom,
    cycle,
    couponExpiration,
    integralFrom,
    tagZYFrom,
    memberGroup,
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
      input: '',
      // 线形
      connector: ['Flowchart', { curviness: 50 }],

      // 导出JSON变量
      output: '',
      // 左侧的测试节点数据
      node: nodeData,

      form: {
        name: '',
        region: '',
        resource: '',
      },
      StartData: null,
      sidebarOpen: true,
      isShow: false,
      lineList: nodeData.lineList,
      dialogVisible: false,
      labelValue: '',
      copyLabelEvent: null,
      updateType: '',
      dialogText: false,
      textValue: '',
      copyElementEvent: null, // 双击时暂时存储节点的event对象
      CopyConnections: [],
      nowAddEvent: false, // /添加元素此字段改为true
      clickItem: {},
      eventId: null,
      eventShowData: null,
      marketingObj: null,
      sendData: {
        data: {
          data: null, // 流程图数据
          nodes: [], // /nodes结束
          allNode: [],
        },
        id: null,
        remark: null, // 备注
        title: null, // 自动化营销标题
      },
      sendNdes: [], // 暂存node数据
      ActionData: {}, // 判断条件的数据
      saveNodesIdObj: {},
      abtextData: {},
      attributeData: {}, // 属性判断数据保存
      branchData: {},
      memGroupData: {}, // 会员建组数据保存
      eventpidObject: {}, // 存储收集过来的有层级结构关系的图形数据
      eventTitleStore: {}, // 暂存标签名的对象
      allNodeSave: [],
      islook: false,
      StarteventDataObj: null,
    }
  },
  created() {
    if (this.$route.query.islook) {
      this.islook = true
    }
  },
  mounted() {
    this.createInstance()
    this.sendData.data.nodes = []
    this.getDetails(this.$route.query.id)
  },
  methods: {
    getDetails(id) {
      FlowDetails({
        id: id,
      }).then((res) => {
        if (res.code == 0) {
          this.StartData = res.data
          this.StarteventDataObj = {
            tagId: res.data.tagId,
            startTime: res.data.startTime,
            timeParam: JSON.parse(res.data.timeParam),
            title: res.data.title,
            remark: res.data.remark,
          }
          this.sendData.title = res.data.title
          this.sendData.remark = res.data.remark
          const nodedata = JSON.parse(res.data.data)
          if (!this.$isNull(nodedata.nodes)) {
            nodedata.nodes.map((res) => {
              res.branchData = null
              res.abTestData = null
              res.operations = []
            })
            this.sendNdes = nodedata.nodes
          }
          console.log(nodedata)

          if (!this.$isNull(nodedata.marketing)) {
            this.marketingObj = JSON.parse(nodedata.marketing)
          }

          if (!this.$isNull(nodedata.data)) {
            // 回显流程图
            const flowData = JSON.parse(nodedata.data)
            this.importNodes(flowData)
            // 回显判断条件对应的数据
            if (!this.$isNull(flowData.ActionData)) {
              this.ActionData = flowData.ActionData
            }

            if (!this.$isNull(flowData.abtextData)) {
              // A/B 数据回显
              this.abtextData = flowData.abtextData
            }

            if (!this.$isNull(flowData.branchData)) {
              // 分支数据回显
              this.branchData = flowData.branchData
            }
            if (!this.$isNull(flowData.memGroupData)) {
              // 会员建组数据回显
              this.memGroupData = flowData.memGroupData
            }
            if (!this.$isNull(flowData.attributeData)) {
              // 属性数据回显
              this.attributeData = flowData.attributeData
            }

            if (!this.$isNull(flowData.abtextData)) {
              // abtest数据回显
              this.abtextData = flowData.abtextData
            }
          } else {
            // /初始化开始
            this.initNodes()
          }
        }
      })
    },
    LineCheck(data) {
      // 线形选择
      this.lineList.map((val) => {
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
      $('#' + this.eventId)
        .children('.text-box')
        .text(this.textValue.trim())
      this.eventTitleStore[this.eventId] = this.textValue.trim()
      this.instance.setSuspendDrawing(false, true) // 此方法重绘
      this.dialogText = false
    },
    deleteElement() {
      // 移除元素
      this.hide()
      this.instance.remove(this.copyElementEvent)
      // console.log(this.copyElementEvent.id)
      // /删除触发器数据
      this.sendNdes.map((item, index) => {
        if (item.node == this.copyElementEvent.id) {
          this.sendNdes.splice(index, 1)
        }
      })

      // 删除abtext数据
      if (this.abtextData[this.copyElementEvent.id]) {
        this.abtextData[this.copyElementEvent.id] = null
      }

      // 删除分支数据
      if (this.branchData[this.copyElementEvent.id]) {
        this.branchData[this.copyElementEvent.id] = null
      }
      // 删除会员建组数据
      if (this.memGroupData[this.copyElementEvent.id]) {
        this.memGroupData[this.copyElementEvent.id] = null
      }
      // 删除属性数据
      if (this.attributeData[this.copyElementEvent.id]) {
        this.attributeData[this.copyElementEvent.id] = null
      }

      if ((this.copyElementEvent.id = 100)) {
        this.marketingObj = null
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
        id: 'node_h6fumt7up55',
        line: 'Straight',
        name: '开始',
        nodeId: '10',
        x: 350,
        y: 30,
      }
      // 通过节点id找到左侧相对于的节点数据
      const data = { ...this.node.object[json.nodeId] }
      data.name = json.name
      let connector = []
      this.lineList.map((val) => {
        if (val.type == json.line) {
          connector = val.line
        }
      })
      // 将节点添加到 jsplumb 实例上
      this.createNode(json.id, data, json.x, json.y, connector)
    },
    hide() {
      this.clickItem = {}
      this.isShow = false
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
      const connector = this.connector
      // 配置拖拽元素的参数
      const dragOptions = {
        cursor: 'pointer',
        zIndex: 2000,
      }
      // 连接点的样式
      const paintStyle = {
        stroke: '#Fa9c00',
        lineWidth: 3,
      }
      // 重叠样式
      const overlays = [
        [
          'PlainArrow',
          {
            location: 1,
            width: 12,
            length: 12,
          },
        ],
      ]
      // 锚点样式
      const endpoint = [
        'Dot',
        {
          radius: 5,
        },
      ]
      // 锚点的css样式声明
      const endpointStyle = {
        fill: '#567567',
      }
      // 鼠标经过样式
      const endpointHoverStyle = {
        fill: '#7073EB',
      }
      // 鼠标经过线的样式
      const hoverPaintStyle = {
        stroke: '#7073EB',
      }

      const __this = this

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
                  __this.labelValue = ''
                  __this.copyLabelEvent = this
                  __this.dialogVisible = true
                },
              },
            },
          ],
        ],
      })
      var _this = this
      this.instance.bind('click', function(conn, originalEvent) {
        if (originalEvent.path[0].getAttribute('id') == null) {
          // /删除线条,此处判断是表示点击箭头才删除线条,点击文字则为修改标签名
          _this.instance.deleteConnection(conn)
          // 移除pid
          $('#' + conn.targetId).removeAttr('pid')
          $('#' + conn.targetId).removeAttr('nopassdataid')
          $('#' + conn.targetId).removeAttr('passdataid')
          $('#' + conn.targetId).removeAttr('branch-id')
          $('#' + conn.targetId).removeAttr('ab-ele-id')

          // 删除线条,触发删除上下级关系数据
          const targetDom = d3.select('#' + conn.sourceId)
          if (targetDom.attr('child-id')) {
            const arr = JSON.parse(targetDom.attr('child-id'))
            arr.map((res, index) => {
              if (res == conn.targetId) {
                arr.splice(index, 1)
                targetDom.attr('child-id', JSON.stringify(arr))
              }
            })
          }
          // /删除之前保存标签名字
          const labelEleId = conn.sourceId + conn.targetId
          _this.CopyConnections.map((val, index) => {
            if (val.labelEleId == labelEleId) {
              _this.CopyConnections.splice(index, 1)
            }
          })

          console.log(this.sendNdes)
        }
      })

      this.instance.bind('connection', function(info) {
        // /连完成后事件
        var connection = info.connection
        const target = d3.select('#' + info.targetId)
        const targetDom = d3.select('#' + info.sourceId)

        // 分支只能连事件
        if (targetDom.attr('node-id') == 31) {
          if (target.attr('type') == 2) {
            _this.instance.deleteConnection(info.connection)
            _this.$notify.error({
              title: '错误',
              message: '分支不能连动作',
            })
            return
          }
        }

        // 属性判断||会员建组只能连动作
        if (
          targetDom.attr('node-id') == 30 ||
          targetDom.attr('node-id') == 33
        ) {
          if (target.attr('type') == 1) {
            _this.instance.deleteConnection(info.connection)
            _this.$notify.error({
              title: '错误',
              message: '属性判断与会员建组不能连事件',
            })
            return
          }
        }
        // /A/B测试只能连动作或事件
        if (targetDom.attr('node-id') == 32) {
          if (
            target.attr('node-id') == 30 ||
            target.attr('node-id') == 31 ||
            targetDom.attr('node-id') == 33
          ) {
            _this.instance.deleteConnection(info.connection)
            _this.$notify.error({
              title: '错误',
              message: 'A/B测试不能连接属性判断、会员建组或分支',
            })
            return
          }
        }

        if (targetDom.attr('node-id') == '30') {
          // 属性判断元素左边设置为'是'右边设置为'否'
          const sourceEndpointType = info.sourceEndpoint.anchor.type
          if (sourceEndpointType == 'Left') {
            connection.getOverlay('label').setLabel('是')
            target.attr('passDataId', info.sourceId)
          } else if (sourceEndpointType == 'Right') {
            connection.getOverlay('label').setLabel('否')
            target.attr('noPassDataId', info.sourceId)
          }
          target.attr('pid', info.sourceId)
        } else if (targetDom.attr('node-id') == '33') {
          // 会员建组元素左边设置为'是'右边设置为'否'
          const sourceEndpointType = info.sourceEndpoint.anchor.type
          if (sourceEndpointType == 'Left') {
            connection.getOverlay('label').setLabel('是')
            target.attr('passDataId', info.sourceId)
          } else if (sourceEndpointType == 'Right') {
            connection.getOverlay('label').setLabel('否')
            target.attr('noPassDataId', info.sourceId)
          }
          target.attr('pid', info.sourceId)
          // console.log('connection-target-node-left', target.attr('node-id'))
          // console.log('connection-target-node-right', target.attr('node-id'))
        } else if (targetDom.attr('node-id') == '31') {
          // 分支
          target.attr('branch-id', info.sourceId)
          target.attr('pid', info.sourceId)
          target.attr('brach-ele-id', info.sourceId + '@' + info.targetId)

          if (targetDom.attr('passDataId')) {
            target.attr('passDataId', targetDom.attr('passDataId'))
          }
          if (targetDom.attr('noPassDataId')) {
            target.attr('noPassDataId', targetDom.attr('noPassDataId'))
          }
        } else if (targetDom.attr('node-id') == '32') {
          target.attr('pid', info.sourceId)
          target.attr('ab-ele-id', info.sourceId)
          target.attr('abline-id', info.sourceId + '@' + info.targetId)
        } else {
          target.attr('pid', info.sourceId)
        }

        const labelID = connection.getOverlay('label').getElement().id
        $('#' + labelID).addClass(info.sourceId)
        $('#' + labelID).attr('labId', info.sourceId + '@' + info.targetId)

        // 记录自己的下级
        if (targetDom.attr('child-id')) {
          const arr = JSON.parse(targetDom.attr('child-id'))
          arr.push(info.targetId)
          targetDom.attr('child-id', JSON.stringify(arr))
        } else {
          const arr = []
          arr.push(info.targetId)
          targetDom.attr('child-id', JSON.stringify(arr))
        }

        if (!_this.nowAddEvent) {
          // 回显时
          const id = info.sourceId + info.targetId
          _this.CopyConnections.map((val) => {
            if (val.labelEleId == id) {
              connection.getOverlay('label').setLabel(val.labelName)
            }
          })
          if (
            targetDom.attr('node-id') != '30' &&
            targetDom.attr('node-id') != '33'
          ) {
            connection.getOverlay('label').setLabel('是')
          }
        }
      })
    },
    setLabel() {
      this.hide()
      this.dialogVisible = true
    },
    exportNodes() {
      const json = { nodes: [], connections: [] }

      // 获取当前 jsplumb 实例上存在的所有连接线
      const connections = this.instance.getConnections()
      for (var idx in connections) {
        const item = connections[idx]
        const sourceId = item.endpoints.map((res) => res._jsPlumb.uuid)[0]
        const targetId = item.endpoints.map((res) => res._jsPlumb.uuid)[1]
        json.connections.push({
          sourceId: sourceId,
          targetId: targetId,
          labelEleId:
            item.endpoints[0].anchor.elementId +
            item.endpoints[1].anchor.elementId,
          yes: $('#' + targetId).attr('yes'),
        })
      }

      // // 获取当前 jsplumb 实例上的所有标签数据
      const Label = jsPlumb.getSelector('#flow .a-Label')
      for (var idx = 0; idx < Label.length; idx++) {
        const item = Label[idx]
        json.connections[idx].labelName = item.innerText
      }

      // 获取当前 jsplumb 实例上的所有节点数据
      const nodes = jsPlumb.getSelector('#flow .node-deo')
      const nodes_start = jsPlumb.getSelector('#flow .node-deo-start')
      const nodes_lin = jsPlumb.getSelector('#flow .node-item-lin')
      const nodesCount = []
      for (var idx = 0; idx < nodes.length; idx++) {
        nodesCount.push(nodes[idx])
      }
      for (var idx = 0; idx < nodes_start.length; idx++) {
        nodesCount.push(nodes_start[idx])
      }
      for (var idx = 0; idx < nodes_lin.length; idx++) {
        nodesCount.push(nodes_lin[idx])
      }

      for (var idx = 0; idx < nodesCount.length; idx++) {
        const item = nodesCount[idx]
        json.nodes.push({
          id: item.getAttribute('id'),
          nodeId: item.getAttribute('node-id'),
          pid: item.getAttribute('pid') ? item.getAttribute('pid') : null,
          childid: item.getAttribute('child-id')
            ? JSON.parse(item.getAttribute('child-id'))
            : null,
          x: parseInt(item.style.left, 10),
          y: parseInt(item.style.top, 10),
          name: $(item)
            .children('.text-box')
            .text()
            .trim(),
          line: item.getAttribute('line'),
          type: item.getAttribute('type'),
          passDataId: item.getAttribute('passDataId')
            ? item.getAttribute('passDataId')
            : null,
          noPassDataId: item.getAttribute('noPassDataId')
            ? item.getAttribute('noPassDataId')
            : null,
          ablineId: item.getAttribute('abline-id')
            ? item.getAttribute('abline-id')
            : null,
          abpid: item.getAttribute('abpid') ? item.getAttribute('abpid') : null,
          abEleId: item.getAttribute('ab-ele-id')
            ? item.getAttribute('ab-ele-id')
            : null,
          branchId: item.getAttribute('branch-id')
            ? item.getAttribute('branch-id')
            : null,
          brachEleId: item.getAttribute('brach-ele-id')
            ? item.getAttribute('brach-ele-id')
            : null,
        })
      }
      // 最终以JSON数据显示到页面上
      this.output = json
      return this.output
    },
    importNodes(nodeData) {
      const json = nodeData
      for (var idx in json.nodes) {
        const item = json.nodes[idx]

        // 通过节点id找到左侧相对于的节点数据
        const data = { ...this.node.object[item.nodeId] }
        data.name = item.name
        let connector = []
        this.lineList.map((val) => {
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

      const __that = this
      // 将所有连接线添加到 jsplumb 实例上
      for (var idx in json.connections) {
        const item = json.connections[idx]
        this.instance.connect({
          uuids: [item.sourceId, item.targetId],
        })
      }
    },
    onInput(e) {
      // 这个方法仅供参考, 目地是让 div 这种不支持 v-model 的容器能把输入值传递给vue
      this.input = e.target.innerText
    },
    // 左侧节点开始拖拽事件
    onDragStart(event, item) {
      // 记录拖拽时鼠标在节点的哪个位置
      this.offset.x = event.offsetX
      this.offset.y = event.offsetY

      // 同时把此节点的相关数据写入事件信息中, 方便后续获取
      event.dataTransfer.setData('text/plain', JSON.stringify(item))
    },
    // 左侧节点被拖放到 jsplumb 上面时的事件
    onDrop(event) {
      // 获取被拖拽到 jsplumb 上面的节点相关数据
      const data = event.dataTransfer.getData('text/plain')

      if (data) {
        this.current = JSON.parse(data)
      }

      // 此处计算节点被拖放到 jsplumb 实例的哪个座标
      const x = event.offsetX - this.offset.x
      const y = event.offsetY - this.offset.y

      // 随机产生一个id, 用于页面获取元素时使用, 不涉及到数据
      const id =
        'node_' +
        Math.random()
          .toString(36)
          .substr(2)

      // 卡券到期提醒
      if (this.current.id == 100) {
        if (this.marketingObj) {
          this.$notify.error({
            title: '错误',
            message: '卡券到期提醒事件只能添加一次，请删除后再添加',
          })
          return
        }
      }
      // 创建节点
      this.createNode(id, this.current, x, y, this.connector)
      // 拖拽释放后打开侧边
      this.openProperties(document.getElementById(id))

      this.nowAddEvent = true
    },
    openProperties(event) {
      if (!event) {
        return
      }
      this.hide()
      let id = null
      this.copyElementEvent = event
      id = event.getAttribute('node-id')
      this.eventId = event.getAttribute('id')
      // 回显已经设置好的的数据
      // 清除上一步数据,此处很重要
      this.eventShowData = null
      if (id * 1 == 10) {
        this.eventShowData = { ...this.StarteventDataObj }
      } else if (id * 1 == 100) {
        // 卡券到期提醒
        if (this.marketingObj) {
          this.eventShowData = { ...this.marketingObj }
        }
      } else if (id * 1 > 19 && id * 1 < 30) {
        // 动作
        if (this.ActionData[this.eventId]) {
          this.eventShowData = this.ActionData[this.eventId]
        }
      } else if (id * 1 == 33) {
        // 会员建组
        if (this.memGroupData[this.eventId]) {
          this.eventShowData = this.memGroupData[this.eventId]
        }
      } else if (id * 1 == 32) {
        // A/B测试
        const labelArr = $('.' + this.eventId)
        const abtextData = []
        for (var i = 0; i < labelArr.length; i++) {
          const item = labelArr[i]
          const optiom = {
            id: $(item).attr('labId'),
            lineId: $(item).attr('id'),
            label: $(item).text(),
            value: null,
          }
          abtextData.push(optiom)
        }

        if (this.abtextData[this.eventId]) {
          const list = this.abtextData[this.eventId]
          for (var j = 0; j < abtextData.length; j++) {
            for (var k = 0; k < list.length; k++) {
              if (abtextData[j].id == list[k].id) {
                abtextData[j].value = list[k].value
              }
            }
          }
        }

        this.eventShowData = {
          abtextData: abtextData,
        }
      } else if (id * 1 == 31) {
        // 分支
        const labelArr = $('.' + this.eventId)
        const branchData = []
        for (var i = 0; i < labelArr.length; i++) {
          const item = labelArr[i]
          const optiom = {
            id: $(item).attr('labId'),
            lineId: $(item).attr('id'),
            label: $(item).text(),
            conditions: [],
            nextNode: $(item)
              .attr('labId')
              .split('@')[1],
          }
          optiom.selecItemtList = []
          branchData.push(optiom)
        }
        if (this.branchData[this.eventId]) {
          const list = this.branchData[this.eventId]
          for (var j = 0; j < branchData.length; j++) {
            for (var k = 0; k < list.length; k++) {
              if (branchData[j].id == list[k].id) {
                branchData[j].conditions = list[k].conditions
              }
            }
          }
        }

        this.eventShowData = {
          branchData: branchData,
        }
      } else if (id * 1 == 30) {
        // 属性判断
        if (this.attributeData[this.eventId]) {
          this.eventShowData = this.attributeData[this.eventId]
        }
      }
      this.clickItem = { ...this.node.object[id] }

      if (this.eventTitleStore[this.eventId]) {
        this.clickItem.name = this.eventTitleStore[this.eventId]
      }
      console.log(this.eventShowData)
      var _that = this
      setTimeout(function() {
        _that.show()
      }, 100)
    },
    createNode(id, data, x, y, connector) {
      this.hide()
      // 此处使用 d3js, 避免使用 jquery
      let pid = null
      if (id == 'node_h6fumt7up55') {
        pid = '0'
      }
      let html
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
        `
      } else if (data.type == 1 || data.type == 2 || data.type == 10) {
        if (data.id == 10) {
          // 开始
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
        `
        } else {
          // 其他
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
         `
        }
      }
      this.eventTitleStore[id] = data.name.trim()

      $('#flow').append(html)

      // 获取刚刚创建的节点元素
      const node = $('#' + id)
      // 双击事件
      // node.ondblclick = this.openPropertiesClick;
      const that = this
      node.dblclick(function() {
        that.openProperties(document.getElementById(id))
      })

      // 使 jsplumb 上面创建的节点可以被拖拽, 且仅限在 jsplumb 实例区域拖拽
      this.instance.draggable(node, { containment: 'parent' })

      // 连节点定义, 此处为最全的清单
      const ports = ['Top', 'Bottom', 'Left', 'Right']
      // 为添加到 jsplumb 上的节点添加连节点
      for (let i = 0; i < data.endpoints.length; i++) {
        const obj = {
          // 连节点的ID信息, 主要是载入回来时需要用两个连接点的UUID来重新连接他们
          uuid: node.attr('id') + '-' + ports[i],
          // 连节点的样式定义
          paintStyle: { radius: 5, stroke: '#CCC', fill: 'transparent' },
          // 定义连节点的方向
          anchor: data.endpoints[i].dir,
          // 最大可以连多少个连接线, -1 为不限
          maxConnections: data.endpoints[i].limit,
          // 是否可以从这个连接点连接到其他连节点
          isSource: data.endpoints[i].source,
          // 是否可以被其他连接点连接
          isTarget: data.endpoints[i].target,
          // 线形
          connector: connector,
        }

        this.instance.addEndpoint(node, obj)
      }
    },
    getparent(nodesList, item, list) {
      for (let i = 0; i < nodesList.length; i++) {
        const res = nodesList[i]
        if (res.id == item.pid) {
          if (res.type == '1') {
            list.push(res)
            return list
          }
          list.push(res)
          this.getparent(nodesList, res, list)
        }
      }
      return list
    },
    collectData(type) {
      // 1代表保存数据，2代表存草稿箱
      // 保存数据
      const saveData = this.exportNodes()
      this.saveNodesIdObj = {}
      saveData.nodes.map((val) => {
        if (val.childid == null || (val.type == '1' && val.pid != '0')) {
          const list = this.getparent(saveData.nodes, val, [])
          list.unshift(val)
          this.eventpidObject[val.id] = list.reverse()
        }
      })

      saveData.nodes.map((val) => {
        if (this.eventpidObject[val.id]) {
          const list = this.eventpidObject[val.id]
          const pid = list[0].id
          list.map((item, index) => {
            if (item.pid != '0' && index > 0) {
              // 不改变首尾的pid,因为存在交叉情况
              item.pid = pid
            }
          })
        }
      })

      const list = Object.values(this.eventpidObject)

      let event = null
      let next_pid = null
      let event_next = null
      let stu = false
      list.map((res) => {
        stu = false
        res.map((item, index) => {
          if (stu) {
            // 分支
            if (event_next.brachEleId != null) {
              item.brachEleId = event_next.brachEleId
            }
            if (event_next.branchId != null) {
              item.branchId = event_next.branchId
            }

            // abtext
            if (event_next.ablineId != null) {
              item.ablineId = event_next.ablineId
            }
            if (event_next.abEleId != null) {
              item.abEleId = event_next.abEleId
            }

            // 属性相关
            if (event_next.noPassDataId != null) {
              item.noPassDataId = event_next.noPassDataId
            }
            if (event_next.passDataId != null) {
              item.passDataId = event_next.passDataId
            }
            if (!next_pid) {
              item.pid = event.id
            } else {
              item.pid = next_pid
            }
            event = null
          }
          if (
            item.nodeId == '32' ||
            item.nodeId == '30' ||
            item.nodeId == '31' ||
            item.nodeId == '33'
          ) {
            // 如果是属性、分支，先去判断下一个是什么类型
            stu = true
            event = item
            if (res[index + 1]) {
              next_pid = item.id
              event_next = res[index + 1]
            }
          }
        })
      })

      const allEvent = []
      list.map((res) => {
        allEvent.push(...res)
      })

      // 去重
      const NewAllEvent = Array.from(new Set(allEvent))
      this.allNodeSave = []
      const eventEleList = [] // 事件元素 type = 1
      const actionEleList = [] // 动作元素 type = 2
      const attributeEleList = [] // 属性判断
      const branchEleList = [] // 分支
      const memGroupEleList = [] // 会员建组
      const abtextEleList = [] // abText
      const have_attitube = [] // /属性判断下的元素
      const have_branch = [] // /分支下的元素

      const eventNodeSavePid = []

      console.log('NewAllEvent', NewAllEvent)
      NewAllEvent.map((val) => {
        if (!val.childid) {
          val.last = true
        } else {
          val.last = false
        }
        if (val.type == '1') {
          const option = { ...val }
          option.last = true
          eventEleList.push(option)
          this.allNodeSave.push(val.id)
          if (eventNodeSavePid.indexOf(val.pid) == -1) {
            eventNodeSavePid.push(val.pid)
          }
        }
        if (val.type == '2') {
          actionEleList.push({ ...val })
          this.allNodeSave.push(val.id)
        }

        if (val.nodeId == '30') {
          attributeEleList.push({ ...val })
        }
        if (val.nodeId == '33') {
          memGroupEleList.push({ ...val })
        }
        if (val.nodeId == '31') {
          branchEleList.push({ ...val })
        }
        if (val.nodeId == '32') {
          abtextEleList.push({ ...val })
        }
      })

      // 找出事件里的最后节点，即事件里的对象的id在所有的事件pid集合中可以找到即认为不是最后事件节点
      eventNodeSavePid.map((val) => {
        eventEleList.map((item) => {
          if (val == item.id) {
            item.last = false
          }
        })
      })

      if (type == 1) {
        let sttus = false
        abtextEleList.map((res) => {
          if (
            this.abtextData[res.id] == undefined ||
            this.abtextData[res.id] == null
          ) {
            sttus = true
          }
        })

        if (sttus) {
          this.$notify.error({
            title: '错误',
            message: '有A/B测试节点未设置规则',
          })
          return '有A/B测试节点未设置规则'
        }
      }

      // 收集abtext下的元素(事件-nextNode、动作)
      abtextEleList.map((res) => {
        res.abtest = {}
        // 动作
        actionEleList.map((val) => {
          if (res.id == val.pid) {
            const opt = {
              nextNode: null,
              proportion: null,
              operations: [],
              items: [],
              branchData: [],
            }
            this.abtextData[res.id].map((it) => {
              if (val.ablineId == it.id) {
                opt.proportion = it.value
                // 收集operations
                actionEleList.map((aa) => {
                  if (aa.ablineId == it.id) {
                    const option = this.ActionData[aa.id]
                    option.last = aa.last
                    opt.operations.push(option)
                  }
                })
                // 收集nextNode
                eventEleList.map((bb) => {
                  if (bb.pid == res.id) {
                    if (bb.ablineId == it.id) {
                      opt.nextNode = bb.id
                    }
                  }
                })
                const indx = it.id.split('@')[1]
                res.abtest[indx] = opt
              }
            })
          }
        })
      })
      /**
       * 收集会员建组 data
       */
      memGroupEleList.map((res) => {
        const memGroupData = this.memGroupData[res.id]
        if (memGroupData) {
          res.attitubeData = {
            filter: {
              conditions: memGroupData.conditions,
              description: memGroupData.description,
              name: memGroupData.name,
            },
            passData: {
              operations: [],
              nextNode: null,
              branchData: [],
            },
            noPassData: {
              operations: [],
              nextNode: null,
              branchData: [],
            },
          }
          // 动作
          actionEleList.map((val) => {
            if (res.id == val.pid) {
              if (res.id == val.passDataId) {
                const option = this.ActionData[val.id]
                option.last = val.last
                res.attitubeData.passData.operations.push(option)
              }
              if (res.id == val.noPassDataId) {
                const option = this.ActionData[val.id]
                option.last = val.last
                res.attitubeData.noPassData.operations.push(option)
              }
            }
          })
          // 事件
          eventEleList.map((event) => {
            if (res.id == event.pid) {
              if (res.id == event.passDataId) {
                res.attitubeData.passData.nextNode = event.id
              }
              if (res.id == event.noPassDataId) {
                res.attitubeData.passData.nextNode = event.id
              }
            }
          })
        }
      })
      // console.log('actionEleList',actionEleList,this.ActionData)
      // 收集属性判断下的元素(事件——nextNode、动作)
      attributeEleList.map((res) => {
        const attributelis = this.attributeData[res.id]
        if (attributelis) {
          res.attitubeData = {
            filter: {
              conditions: attributelis.conditions,
              description: attributelis.description,
              name: attributelis.name,
            },
            passData: {
              operations: [],
              nextNode: null,
              branchData: [],
            },
            noPassData: {
              operations: [],
              nextNode: null,
              branchData: [],
            },
          }
          // 动作
          actionEleList.map((val) => {
            if (res.id == val.pid) {
              if (res.id == val.passDataId) {
                const option = this.ActionData[val.id]
                option.last = val.last
                res.attitubeData.passData.operations.push(option)
              }
              if (res.id == val.noPassDataId) {
                const option = this.ActionData[val.id]
                option.last = val.last
                res.attitubeData.noPassData.operations.push(option)
              }
            }
          })
          // 事件
          eventEleList.map((event) => {
            if (res.id == event.pid) {
              if (res.id == event.passDataId) {
                res.attitubeData.passData.nextNode = event.id
              }
              if (res.id == event.noPassDataId) {
                res.attitubeData.passData.nextNode = event.id
              }
            }
          })
        }
      })

      // 收集分支下的数据(事件-nextNode，分支不能直连动作)
      branchEleList.map((res) => {
        res.branchData = {}
        const branchlis = this.branchData[res.id]
        if (branchlis) {
          branchlis.map((val) => {
            const option = {
              filter: {
                conditions: val.conditions,
                description: val.description,
                name: val.label,
              },
              passData: {
                operations: [],
                nextNode: null,
                branchData: [],
              },
            }
            eventEleList.map((event) => {
              if (res.id == event.pid) {
                if (val.id == event.brachEleId) {
                  option.passData.nextNode = event.id
                }
              }
            })
            res.branchData[val.id] = option
          })
        }
      })

      /* -------------------*/
      // 收集abtext下的abtext、属性判断、会员建组元素
      abtextEleList.map((res) => {
        abtextEleList.map((val) => {
          if (res.id == val.pid) {
            const ind = val.ablineId.split('@')[1]
            res.abtest[ind].items = Object.values(val.abtest)
          }
        })
        attributeEleList.map((val_1) => {
          if (res.id == val_1.pid) {
            const ind = val_1.ablineId.split('@')[1]
            res.abtest[ind].branchData.push(val_1.attitubeData)
          }
        })
        memGroupEleList.map((val_1) => {
          if (res.id == val_1.pid) {
            const ind = val_1.ablineId.split('@')[1]
            res.abtest[ind].branchData.push(val_1.attitubeData)
          }
        })
      })

      // 收集属性判断下的abtext、分支元素、属性判断
      attributeEleList.map((res) => {
        abtextEleList.map((val) => {
          if (res.id == val.pid) {
            if (val.passDataId != null) {
              res.attitubeData.passData.abTestData = Object.values(val.abtest)
            }
            if (val.noPassDataId != null) {
              res.attitubeData.noPassData.abTestData = Object.values(val.abtest)
            }
          }
        })
        branchEleList.map((val_1) => {
          if (res.id == val_1.pid) {
            if (val_1.passDataId != null) {
              res.attitubeData.passData.branchData = Object.values(
                val_1.branchData
              )
            }
            if (val_1.noPassDataId != null) {
              res.attitubeData.noPassData.branchData = Object.values(
                val_1.branchData
              )
            }
          }
        })

        attributeEleList.map((val_2) => {
          if (val_2.passDataId != null) {
            if (res.id == val_2.passDataId) {
              res.attitubeData.passData.branchData.push(val_2.attitubeData)
            }
          }
          if (val_2.noPassDataId != null) {
            if (res.id == val_2.noPassDataId) {
              res.attitubeData.noPassData.branchData.push(val_2.attitubeData)
            }
          }
        })
      })
      // 收集会员建组下的abtext、分支元素、属性判断
      memGroupEleList.map((res) => {
        abtextEleList.map((val) => {
          if (res.id == val.pid) {
            if (val.passDataId != null) {
              res.attitubeData.passData.abTestData = Object.values(val.abtest)
            }
            if (val.noPassDataId != null) {
              res.attitubeData.noPassData.abTestData = Object.values(val.abtest)
            }
          }
        })
        branchEleList.map((val_1) => {
          if (res.id == val_1.pid) {
            if (val_1.passDataId != null) {
              res.attitubeData.passData.branchData = Object.values(
                val_1.branchData
              )
            }
            if (val_1.noPassDataId != null) {
              res.attitubeData.noPassData.branchData = Object.values(
                val_1.branchData
              )
            }
          }
        })

        memGroupEleList.map((val_2) => {
          if (val_2.passDataId != null) {
            if (res.id == val_2.passDataId) {
              res.attitubeData.passData.branchData.push(val_2.attitubeData)
            }
          }
          if (val_2.noPassDataId != null) {
            if (res.id == val_2.noPassDataId) {
              res.attitubeData.noPassData.branchData.push(val_2.attitubeData)
            }
          }
        })
      })
      // 收集分支下abtext、属性判断元素
      branchEleList.map((res) => {
        abtextEleList.map((val) => {
          if (res.id == val.pid) {
            res.branchData[val.brachEleId].passData.branchData = Object.values(
              val.abtest
            )
          }
        })
        attributeEleList.map((val_1) => {
          if (res.id == val_1.pid) {
            res.branchData[val_1.brachEleId].passData.branchData.push(
              val_1.attitubeData
            )
          }
        })
      })
      // 收集分支下abtext、会员建组元素
      branchEleList.map((res) => {
        abtextEleList.map((val) => {
          if (res.id == val.pid) {
            res.branchData[val.brachEleId].passData.branchData = Object.values(
              val.abtest
            )
          }
        })
        memGroupEleList.map((val_1) => {
          if (res.id == val_1.pid) {
            res.branchData[val_1.brachEleId].passData.branchData.push(
              val_1.attitubeData
            )
          }
        })
      })
      // 添加数据
      this.sendNdes.map((val) => {
        val.branchData = []
        val.abTestData = []
        val.operations = []
        // 属性数据添加上去
        attributeEleList.map((item) => {
          if (item.passDataId == null && item.noPassDataId == null) {
            if (item.pid == val.node) {
              val.branchData.push(item.attitubeData)
            }
          }
        })
        // abtext数据添加上去
        abtextEleList.map((item_1) => {
          if (item_1.pid == val.node) {
            val.abTestData = Object.values(item_1.abtest)
          }
        })
        // 分支数据添加上去
        branchEleList.map((item_2) => {
          if (item_2.pid == val.node) {
            val.branchData = Object.values(item_2.branchData)
          }
        })
        // 动作数据添加上去
        actionEleList.map((item_3) => {
          if (item_3.pid == val.node) {
            const option = this.ActionData[item_3.id]
            option.last = item_3.last
            val.operations.push(option)
          }
        })
        // 会员建组数据添加上去
        memGroupEleList.map((item) => {
          if (item.passDataId == null && item.noPassDataId == null) {
            if (item.pid == val.node) {
              val.branchData.push(item.attitubeData)
            }
          }
        })
        // 事件
        eventEleList.map((item_4) => {
          if (val.node == item_4.id) {
            val.last = item_4.last
            val.pnode = item_4.pid
          }
        })
      })

      console.log(this.sendNdes)

      // /将动作的数据存到视图的数据里,以备回显数据时使用
      saveData.ActionData = this.ActionData
      // 将A/B测试数据保存
      saveData.abtextData = this.abtextData
      // 将分支数据保存
      saveData.branchData = this.branchData
      // 将属性判断数据保存
      saveData.attributeData = this.attributeData
      // 将abtest据保存
      saveData.abtextData = this.abtextData
      // 将会员建组据保存
      saveData.memGroupData = this.memGroupData
      return saveData
    },
    saveData() {
      const saveData = this.collectData(1)

      if (typeof this.collectData(1) == 'string') {
        this.$notify.error({
          title: '错误',
          message: saveData,
        })
        return
      }

      this.$confirm('保存后数据不能再修改, 是否保存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.sendData.data.data = JSON.stringify(saveData)
          this.sendData.data.nodes = this.sendNdes
          this.sendData.data.allNode = this.allNodeSave
          this.sendData.loading = true
          this.sendData.type = 3
          this.sendData.id = this.$route.query.id
          this.sendData.title = this.StarteventDataObj.title
          this.sendData.remark = this.StarteventDataObj.remark
          this.sendData.tagId = this.StarteventDataObj.tagId
          this.sendData.startTime = this.StarteventDataObj.startTime
          this.sendData.timeParam = this.StarteventDataObj.timeParam

          if (this.marketingObj) {
            this.sendData.data.marketing = JSON.stringify(this.marketingObj)
          }
          console.log(this.sendData)
          addFlowSave(this.sendData).then((res) => {
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
              })
              this.$router.push({
                name: 'marketing-automated-list',
              })
            }
          })
        })
        .catch(() => {})
    },
    saveStoreData() {
      const saveData = this.exportNodes()
      const sendNdes = this.collectData(2)
      // /将动作的数据存到视图的数据里,以备回显数据时使用
      saveData.ActionData = this.ActionData
      // 将A/B测试数据保存
      saveData.abtextData = this.abtextData
      // 将分支数据保存
      saveData.branchData = this.branchData
      // 将属性判断数据保存
      saveData.attributeData = this.attributeData
      // 将abtest据保存
      saveData.abtextData = this.abtextData
      // 将会员建组据保存
      saveData.memGroupData = this.memGroupData

      this.sendData.data.data = JSON.stringify(saveData)
      this.sendData.data.nodes = this.sendNdes
      this.sendData.loading = true
      this.sendData.id = this.$route.query.id
      this.sendData.title = this.StarteventDataObj.title
      this.sendData.remark = this.StarteventDataObj.remark
      this.sendData.tagId = this.StarteventDataObj.tagId
      this.sendData.startTime = this.StarteventDataObj.startTime
      this.sendData.timeParam = this.StarteventDataObj.timeParam
      if (this.marketingObj) {
        this.sendData.data.marketing = JSON.stringify(this.marketingObj)
      }
      saveAutomateStore(this.sendData).then((res) => {
        if (res.code == 0) {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
          })

          this.$router.push({
            name: 'marketing-automated-list',
          })
        }
      })
    },
    clearData() {
      // 重置数据
      this.$confirm('此操作将删除之前保存数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const saveData = this.exportNodes()
          if (saveData) {
            const nodes = saveData.nodes
            for (let i = 0; i < nodes.length; i++) {
              const dome = document.getElementById(nodes[i].id)
              // 删除元素
              this.instance.remove(dome)
            }
            this.$notify({
              title: '成功',
              message: '重置成功',
              type: 'success',
            })
          }
          // /清除已创建的触发器数据,并初始化开始节点
          this.sendNdes = [
            {
              last: false,
              node: 'node_h6fumt7up55',
              pnode: '0',
              quote: false,
              filter: null,
              trigger: {
                name: '触发器__',
                type: 3,
                event: { data: [{ mode: 11, value: '' }], type: 1 },
                enabled: true,
                purpose: null,
                enableAt: null,
                filterId: null,
                operation: {
                  mode: 2,
                  runAt: null,
                  extraOperation: { type: 10, value: [] },
                  operationItems: [
                    {
                      type: 1,
                      value: [
                        {
                          id: '',
                          des: '',
                          text: '',
                          point: '',
                          localUrl: '',
                          wechatMaterialNewsItemList: '',
                        },
                      ],
                    },
                  ],
                },
                description: '',
              },
              triggerId: null,
              abTestData: null,
              branchData: null,
              operations: [],
              linkedTriggerId: null,
            },
          ]
          // /重置一个开始流程
          this.initNodes()
        })
        .catch(() => {
          // this.$notify.error({
          //   title: '错误',
          //   message: '重置失败'
          // });
        })
    },
    getText() {
      let str
      if (this.clickItem.id == 0) {
        str = '任意操作'
      } else if (this.clickItem.id == 1) {
        str = '关注'
      } else if (this.clickItem.id == 3) {
        str = '点击菜单'
      } else if (this.clickItem.id == 4) {
        str = '发送消息'
      } else if (this.clickItem.id == 6) {
        str = '会员开卡'
      } else if (this.clickItem.id == 7) {
        str = '订单状态变更'
      } else if (this.clickItem.id == 10) {
        str = '开始'
      }
      return str
    },
    setText(val) {
      const ele = this.getText()
      let showEleText
      if (val.event.type == 1) {
        if (val.event.data[0].mode == 11) {
          showEleText = ele + '(任意关注)'
        }
        if (val.event.data[0].mode == 1) {
          showEleText = ele + '(指定二维码关注)'
        }
      } else if (val.event.type == 3) {
        if (val.event.data[0].mode == 11) {
          showEleText = ele + '(点击任意菜单)'
        }
        if (val.event.data[0].mode == 1) {
          showEleText = ele + '(点击指定菜单)'
        }
      } else if (val.event.type == 4) {
        if (val.event.data[0].mode == 11) {
          showEleText = ele + '(任意消息)'
        }
        if (val.event.data[0].mode == 1) {
          showEleText = ele + '(指定消息关键字)'
        }
      } else {
        showEleText = ele
      }

      if (
        $('#' + this.eventId)
          .children('.text-box')
          .text()
      ) {
        $('#' + this.eventId)
          .children('.text-box')
          .text(showEleText)
      } else {
        const html = `<div class="ele-right text-box">
             ${showEleText}
            </div>`
        $('#' + this.eventId).append(html)
      }
      this.instance.setSuspendDrawing(false, true) // 此方法重绘
    },
    setActionText(val) {
      // /动作
      // console.log(val)
      let showEleText
      const ele = ''
      if (this.clickItem.id == 20) {
        const str = '微信消息'
        const type = val.operationItems[0].type
        if (type == 1) {
          showEleText =
            ele + '(推送信息):' + val.operationItems[0].value[0].text
        } else if (type == 2) {
          showEleText =
            ele +
            '(推送图片):' +
            this.$fileUrl() +
            val.operationItems[0].value[0].localUrl
        } else if (type == 5) {
          showEleText =
            ele +
            '(推送高级图文):' +
            val.operationItems[0].value[0].advancedNewsItemList[0].title
        } else if (type == 6) {
          showEleText =
            ele +
            '(推送图文):' +
            val.operationItems[0].value[0].wechatMaterialNewsItemList[0].title
        } else if (type == 9) {
          showEleText =
            ele + '(推送小程序):' + val.operationItems[0].value[0].pagePath
        }
      } else if (this.clickItem.id == 21) {
        // 短信
        const str = '短信消息(推送短信):'
        if (val.showEleText) {
          showEleText = str + val.showEleText.trim()
        }
      } else if (this.clickItem.id == 22) {
        // 模版消息
        const str = '模板消息(推送消息):'
        if (val.showEleText) {
          showEleText = str + val.showEleText.trim()
        }
      } else if (this.clickItem.id == 23) {
        // 打标签
        const str = '打标签:'
        if (val.showEleText) {
          showEleText = str + val.showEleText.join('、')
        }
      } else if (this.clickItem.id == 24) {
        // 修改会员信息
        const str = '修改会员信息:'
        if (val.showEleText) {
          showEleText = str + val.showEleText
        }
      } else if (this.clickItem.id == 25) {
        // 发送卡券
        const str = '发送卡券:'
        if (val.showEleText) {
          showEleText = str + val.showEleText
        }
      } else if (this.clickItem.id == 26) {
        // 发积分
        const str = '发积分:'
        if (val.showEleText) {
          showEleText = str + val.showEleText
        }
      }

      if (
        $('#' + this.eventId)
          .children('.text-box')
          .text()
      ) {
        $('#' + this.eventId)
          .children('.text-box')
          .text(showEleText)
      } else {
        const html = `<div title="${showEleText}" class="ele-right text-box">
            ${showEleText}
            </div>`
        $('#' + this.eventId).append(html)
      }

      this.instance.setSuspendDrawing(false, true) // 此方法重绘
    },
    eventDataCouponExpiration(val) {
      console.log(val)
      if (val.couponId) {
        this.marketingObj = { ...val }
      }
      this.hide()
    },
    eventData(val) {
      console.log(val)
      // let have = false;
      // this.sendNdes.map(re => {
      //   if (val.name == re.trigger.name) {
      //     if (val.node != re.trigger.id) {
      //       have = true;
      //     }
      //   }
      // });

      // if (have) {
      //   this.$notify.error({
      //     title: "错误",
      //     message: "该触发器名称已存在,请重新设置"
      //   });
      //   return;
      // }

      this.setText(val)
      val.name = '自动化营销_' + this.$route.query.id
      const option = {
        node: this.eventId, // 当前节点id
        last: false, // 是否为最后一个节点
        operations: [],
        trigger: val,
        pnode: null, // 上节点id
        quote: false, // 是否为引用触发器
        triggerId: null, // /触发器id
        linkedTriggerId: null,
      }

      if (this.sendNdes.length == 0) {
        this.sendNdes.push(option)
      } else {
        let status = false
        this.sendNdes.map((item, index) => {
          // /相同则修改数据,
          if (item.node == this.eventId) {
            status = true
            this.sendNdes[index] = option
          }
        })
        // 不同则添加数据
        if (!status) {
          this.sendNdes.push(option)
        }
      }
      this.hide()
      // console.log(this.sendNdes);
    },
    StarteventData(val) {
      console.log(val)
      this.StarteventDataObj = { ...val }
      this.hide()
    },
    formGetData(val) {
      console.log(val)
      this.setActionText(val)
      val.node = this.eventId
      this.ActionData[this.eventId] = val
      this.hide()
    },
    branchGetData(val) {
      console.log(val)
      val.map((item) => {
        $('#' + item.lineId).text(item.label)
      })
      this.branchData[this.eventId] = val
      this.hide()
    },
    memGroupGetData(val) {
      console.log('draw-会员建组', val)
      this.memGroupData[this.eventId] = val
      this.hide()
    },
    abtextGetData(val) {
      console.log(val)
      val.map((item) => {
        $('#' + item.lineId).text(item.label)
      })
      this.abtextData[this.eventId] = val
      this.hide()
    },
    attributeGetData(val) {
      console.log(val)
      this.attributeData[this.eventId] = val
      this.hide()
    },
    toggle() {
      if (this.sidebarOpen) {
        $('#nodes').hide()
        this.sidebarOpen = false
        $('#main').css('width', '100%')
      } else {
        $('#nodes').show()
        this.sidebarOpen = true
        $('#main').css('width', 'calc(100% - 240px)')
      }
    },
  },
}
</script>

<style>
@import './css/draw-style.scss';
</style>
<style scoped>
@import './css/draw-scoped.scss';
</style>
