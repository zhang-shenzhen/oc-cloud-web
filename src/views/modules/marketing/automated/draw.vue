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
              v-for="(item, index) in node.list"
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
              @click="saveData(1)"
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
        <div class="toolsDiv_contant">
          <!-- 元素属性 -->
          <div class="toolsDiv-nav">元素属性</div>
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
          <eventFrom
            v-if="clickItem.id < 20 && clickItem.id != 10"
            :show-data="eventShowData"
            :event-type="clickItem.id"
            :action="islook ? 'look' : ''"
            @sendValue="eventData"
            @claer="hide"
          />

          <!-- 开始元素 -->
          <eventFrom
            v-if="clickItem.id == 10"
            :show-data="eventShowData"
            :event-type="clickItem.id"
            :type="'draw'"
            :action="islook ? 'look' : ''"
            @sendValue="eventData"
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

          <!-- 属性判断 -->
          <attributeFrom
            v-if="clickItem.id == 30"
            :show-data="eventShowData"
            :action="islook ? 'look' : ''"
            @gteData="attributeGetData"
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
        </div>
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
import marketingDraw from '@/mixins/marketing-draw.js' // 混入

import {
  addFlowSave, // 添加流程数据
  FlowDetails, // 通过id查询流程数据
  saveAutomateStore, // 保存到草稿箱
} from '@/api/marketing/automated'
import { setTimeout } from 'timers'

export default {
  name: 'MarketingAutomatedDraw',
  mixins: [marketingDraw],
}
</script>

<style>
@import './css/draw-style.scss';
</style>
<style scoped>
@import './css/draw-scoped.scss';
</style>
