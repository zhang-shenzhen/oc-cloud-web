<template>
  <div class="tableMob">
    <el-table
      ref="multipleTable"
      class="userTab"
      highlight-current-row
      :data="tableData"
      tooltip-effect="dark"
      :style="{'width':tableConfig.style.width}"
      :height="tableConfig.style.height"
      size="mini"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="tableConfig.status.isAllSet"
        type="selection"
        width="55"
      />
      <el-table-column
        v-for="(item,index) in tableConfig.tabHeadConfig"
        :key="index"
        :label="item['cn-name']"
        :sortable="item['method'].indexOf('1')>-1"
        :width="item.width"
      >
        <template slot-scope="scope">
          <span :class="'v-'+item['key']">
            <slot v-if="item.key != 'operating' && item.key != 'quantity' && item.key != 'enabled'">
              <template>
                {{ scope.row[item['key']] }}
              </template>
            </slot>

            <slot v-if="item.key == 'operating'">
              <template>
                <el-button
                  v-for="(val,index) in tableConfig.operating"
                  :key="index"
                  :style="val.style"
                  type="text"
                  size="mini"
                  @click="integralThis(scope.row,val)"
                >{{ $t(val.name) }}</el-button>
              </template>
            </slot>

            <slot v-if="item.key == 'quantity'">
              <template>
                <span>{{ scope.row.quantity }}</span>
                <i
                  style="margin-left:10px;cursor: pointer;"
                  class="el-icon-edit-outline"
                  @click="integralThis(scope.row, {name: 'quantity',btn: '库存'})"
                />
              </template>
            </slot>

            <!-- ///渠道二维码   门店管理列表 公用-->
            <slot v-if="item.key == 'enabled'">
              <template>
                <span @click="integralThis(scope.row, {name: 'enabled',btn: '状态'})">
                  <el-switch
                    :value="scope.row.enabled"
                    active-color="#13ce66"
                    inactive-color="#cccccc"
                  />
                </span>
              </template>
            </slot>

          </span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
/**
 * tableMob:
 *
 * 组件介绍：通用表格模板
 * 当前版本：v1.1.1
 * 版本新增：支持动态生成表头；动态生成表间数据；动态匹配添加单击事件；
 * 版本优化：优化了 对参数集 中  的 tabsOnCList 的结构要求，丢弃了之前通用性较差的 实现方式；
 * 组件依赖：import  memTableConfig  from '@/tableConfigs/memTableConfig'
 *          tableConfigs : 表头静态配置文件；
 *          mock.js->new member().MemberList() :表格所需数据结构
 *
 * 详细文档 参阅 ./README.md -> tableMob
 *
 *
 */
// import { workFormMob, formMobStr } from '@/utils/index'
// import { send } from 'q'
// import formMob from '@/components/GPMob/formMob' //该组件导入地址
export default {
  name: 'FormMob',
  props: {
    // tableData 表格依赖数据
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    // tableConfig 表格依赖配置文件
    tableConfig: {
      type: Object,
      default() {
        return {
          tabHeadConfig: [],
          style: {
            // width: '100%'
          }
        }
      }
    }
    // //注入事件集合 tabsOnCList:[{k:'name',mT:'click'},],//该tab的事件集合 @ k:key; mT:methodsType
    // tabsOnCList: {
    //   type: Array,
    //   default: []
    // },
    // s_tabsSlots ,插槽集合 注入插槽集合 使 tabMob 更具扩展性；
  },
  data() {
    return {
      formMobForm: {},
      // formLabelWidth: '120px',
      MO: null, // methods Object  ,因为将 数组 转换成 对象后可以 更简练的提取到 对应key的方法;
      ensKeys: [], // 简易事件队列 ，只存储 事件的 key
      deBug: true
    }
  },
  computed: {},
  watch: {
    // formMobForm(nv, ov) {
    //   console.log(ov, nv);
    // },
    // //监听recoverType何时回收;
    // recoverType(nv, ov) {
    //   console.log("监听recoverType何时回收", ov, nv);
    //   if (nv) {
    //     this._returnFormData();
    //   }
    // }
  },
  created() {
    // this.tabsOnCList = this.tabsOnCList.length==0?this.tabsOnCList:[]
    // console.log('对 事件集 进行管理；', this.tabsOnCList)
    // 对 事件集 进行管理；
    // this._initTabsOnCList();

  },
  mounted() {
    // if (this.deBug) {
    //   this._deBug();
    // }
  },
  beforeDestroy() { },
  methods: {
    integralThis(data, val) {
      const click = {
        click_event: val,
        click_data: data
      }
      this.$emit('sendData', click)
    },
    // _deBug() {
    //   console.log("_deBug___________ run");
    //   console.log("tableData", this.tableData);
    //   console.log("tabsSlots", this.tabsSlots);
    //   console.log("tableConfig", { ...this.tableConfig });
    //   console.log("tabsOnCList", { ...this.tabsOnCList });
    //   console.log("_deBug___________ end");
    // },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    // //_selectionChange
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('_selectionChange', val)
    }
    // /**
    //  * _initTabsOnCList 初始化事件队列
    //  * //挂在在每个 tab-v 上的事件;
    //  * @d.k 对应的key
    //  * @d.mt 对应的 事件关键字
    //  */
    // _initTabsOnCList() {
    //   let ens = this.tabsOnCList;
    //   let THS = this.tableConfig.tabHeadConfig; //tabHeaders
    //   let _MO = {}; //methods Object  ,因为将 数组 转换成 对象后可以 更简练的提取到 对应key的方法;
    //   let _ensKeys = []; //简易事件队列 ，只存储 事件的 key
    //   THS.map((d, idx) => {
    //     _MO[d.key] = null;
    //     ens.map(dd => {
    //       if (dd.k == d.key) {
    //         _MO[dd.k] = dd.mT;
    //         _ensKeys.push(dd.k);
    //       }
    //     });
    //     // _MO[d.k][d.mT] = function(){}
    //   });
    //   console.log("初始化事件队列 _MO", { ..._MO });
    //   this.MO = _MO;
    //   this.ensKeys = _ensKeys;
    // },
    // /**
    //  * setIngV Tbs事件代理
    //  * //挂在在每个 tab-v 上的事件;
    //  * @item 当前选中值的 背景参数
    //  * @v 当前值的 值
    //  */
    // _tabEvns(item, v) {
    //   // console.log('setIngV',item,v)
    //   let ens = this.ensKeys; //当前tabens 所支持的事件集
    //   console.log(ens, item.key);
    //   if (ens.indexOf(item["key"]) == -1) return; //不支持则return;
    //   this.$emit("_" + item["key"], item["key"], v);
    //   return;
    //   //以下为示例 其父级组件应该做的事情 onCn-1.1.x
    //   this["onC" + item["key"]](item, v); //动态调用当前列表中的方法;
    // },
    // /**
    //  * onCname Tbs事件代理 中的具体代理事件；
    //  * //挂在在每个 tab-v 上的事件;
    //  * @item 当前选中值的 背景参数
    //  * @v 当前值的 值
    //  */
    // //以下为示例 其父级组件应该做的事情 onCn-1.1.y
    // onCname(item, v) {
    //   console.log("onCname", item, v);
    // }
  }
}
</script>

<style lang="scss" scope>
</style>
