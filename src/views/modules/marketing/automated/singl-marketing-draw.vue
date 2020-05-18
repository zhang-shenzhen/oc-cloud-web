<template>
  <div id="draw-contant" class="draw-contant">
    <div class="home">
      <div class="main-panel">
        <div id="nodes" class="nodes">
          <p class="title">自动化营销</p>

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
              @click="saveData(2)"
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
        <singl
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
        <!-- 会员建组 -->
        <memberGroup
          v-if="clickItem.id == 33"
          :show-data="eventShowData"
          :action="islook ? 'look' : ''"
          @gteData="memGroupGetData"
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
import singl from './draw-from/singl'
import marketingDraw from '@/mixins/marketing-draw.js' // 混入
import {
  FlowDetails, // 通过id查询流程数据
} from '@/api/marketing/automated'
export default {
  name: 'MarketingAutomatedDraw',
  components: {
    singl,
  },
  mixins: [marketingDraw],
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    StarteventData(val) {
      this.StarteventDataObj = { ...val }
      this.hide()
    },
    openProperties(event) {
      this.hide()
      let id = null
      this.copyElementEvent = event
      id = event.getAttribute('node-id')
      this.eventId = event.getAttribute('id')
      console.log('openProperties-id', id)
      // 回显已经设置好的的数据
      // 清除上一步数据,此处很重要
      this.eventShowData = null
      // console.log(" this.sendNdes", JSON.stringify(this.sendNdes[0]));
      if (id * 1 == 10) {
        this.eventShowData = { ...this.StarteventDataObj }
      } else if (id * 1 > 19 && id * 1 < 30) {
        // 动作
        if (this.ActionData[this.eventId]) {
          this.eventShowData = this.ActionData[this.eventId]
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
      } else if (id * 1 == 33) {
        // 会员建组
        if (this.memGroupData[this.eventId]) {
          this.eventShowData = this.memGroupData[this.eventId]
        }
      }
      this.clickItem = { ...this.node.object[id] }

      if (this.eventTitleStore[this.eventId]) {
        this.clickItem.name = this.eventTitleStore[this.eventId]
      }

      var _that = this
      setTimeout(function() {
        _that.show()
      }, 100)
    },

    getDetails(id) {
      FlowDetails({
        id: id,
      }).then((res) => {
        if (res.code == 0) {
          console.log('单词营销私有-FlowDetails-res.data', res.data)
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
          console.log('单词营销私有-FlowDetails-this.sendData', this.sendData)
        }
      })
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
