<template>
  <div class="allTags">
    <div class="search-box">
      <div class="search-box-left">
        <el-input v-model="searchName" clearable size="mini" />
        <el-button
          type="primary"
          size="mini"
          class="search-box-left-btn"
          @click="getLabelList(1)"
        >搜索</el-button>
      </div>
      <div class="search-box-right">
        <span class="search-box-right-title">标签类型:</span>
        <el-radio-group v-model="labelSearch">
          <el-radio :label="null">不限</el-radio>
          <el-tooltip
            v-if="projectName == 'product'"
            class="item"
            effect="dark"
            content="系统标签分类，不会同步到微信公众平台标签，数量不限，通常用于SCRM系统内建立用户标签画像使用"
            placement="top-start"
          >
            <el-radio :label="1">自有标签</el-radio>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="限量100，微信群发必须为此类标签"
            placement="top-start"
          >
            <el-radio :label="2">微信标签</el-radio>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="管理用户个性化菜单"
            placement="top-start"
          >
            <el-radio :label="3">菜单标签</el-radio>
          </el-tooltip>
        </el-radio-group>
      </div>
    </div>
    <div class="tab-head-btn">
      <div class="tab-head-btn-l">
        <el-button
          v-if="$Buttonpermissions('surbanajurong.wechat.label.allabel[add]')"
          size="mini"
          type="primary"
          @click="addData"
        >{{ $t('member.memList.addLabel') }}</el-button>
        <!-- <el-button
          v-if="
            $Buttonpermissions('surbanajurong.wechat.label.allabel[import]') &&
              LMBshowType
          "
          size="mini"
          type="primary"
          @click="1"
          >导入标签</el-button
        > -->
        <el-button
          v-if="$Buttonpermissions('surbanajurong.wechat.label.allabel[del]')"
          size="mini"
          type="danger"
          @click="delLabelIds"
        >删除</el-button>
      </div>
    </div>
    <!-- tabMob -->
    <table-mob
      ref="table_mob"
      :table-data="tableData"
      :table-config="tableConfig"
      :tabs-on-c-list="f_tabsOnCList"
      :tabs-slots="f_tabsSlots"
      @_selectionChange="getTabSelList"
    >
      <template v-slot:tagType="tagType">
        <span v-if="tagType.tagType.tagType == 1">自有标签</span>
        <span v-if="tagType.tagType.tagType == 2">微信标签</span>
        <span v-if="tagType.tagType.tagType == 3">菜单标签</span>
      </template>

      <template v-slot:tagName="tagName">
        <div
          :class="{
            labelBack: true,
            R: tagName.tagName.tagType == 3,
            G: tagName.tagName.tagType == 2,
            B: tagName.tagName.tagType == 1
          }"
          @click="setLabelList(tagName.tagName)"
        >
          <span style="max-width:130px;">{{ tagName.tagName.tagName }}</span>
        </div>
      </template>

      <template v-slot:operating="operating">
        <el-button
          v-if="
            $Buttonpermissions('surbanajurong.wechat.label.allabel[update]')
          "
          type="text"
          size="mini"
          @click="updateThis(operating.operating)"
        >编辑</el-button>
        <el-button
          v-if="$Buttonpermissions('surbanajurong.wechat.label.allabel[del]')"
          type="text"
          size="mini"
          @click="delThis(operating.operating)"
        >删除</el-button>
      </template>
    </table-mob>
    <div class="sunTag">标签总数:{{ total }}</div>
    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// import tableMob from '@/components/GPMob/tableMob'
import allLabeConfig from '@/tableConfigs/member/allLabeConfig'
// import FilterCom from '@/components/filter'
import { labelList, delLabel, delLabels } from '@/api/member/member'
import {
  surbanajurong_labelList,
  surbanajurong_delLabel,
  surbanajurong_delLabels
} from '@/api/surbanajurong/wechat/member'

export default {
  name: 'AllAbel',
  components: {},
  props: {
    type: {
      type: String,
      default: 'product'
    }
  },
  data() {
    return {
      projectName: 'product',
      API: {},
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      total: 0,
      page: 1,
      currentPage: 1,
      tableData: [],
      tableConfig: {},
      tabSelList: [],
      tabSelIdList: [],
      searchName: '',
      dialogTableVisible: false,
      f_tabsOnCList: [{ k: 'operating', mT: 'click' }], // 该tab的事件集合  @ k:key; mT:methodsType
      f_tabsSlots: {
        operating: 'operating',
        tagName: 'tagName',
        tagType: 'tagType'
      }, // 插槽
      labelSearch: null // label筛选
    }
  },
  computed: {},
  watch: {
    labelSearch: function(n, o) {
      console.log(n, o)
      this.getLabelList(1)
    }
  },
  created() {
    if (localStorage.getItem('projectName')) {
      const projectName = localStorage.getItem('projectName')
      this.projectName = projectName
      if (projectName == 'surbanajurong') {
        this.API = {
          labelList: surbanajurong_labelList,
          delLabel: surbanajurong_delLabel,
          delLabels: surbanajurong_delLabels
        }
      } else {
        this.API = {
          labelList: labelList,
          delLabel: delLabel,
          delLabels: delLabels
        }
      }
    }
    this.getLabelList(1)
    this._initTab()
  },
  mounted() {
    console.log('table_mob', this.$refs)
  },
  beforeDestroy() {},
  methods: {
    _initTab() {
      this.tableConfig = allLabeConfig
    },
    /**
     * @description 标签列表
     */
    getLabelList(page) {
      const params = {
        size: 10,
        page: page,
        channelTypeId: 1,
        companyId: 1,
        name: this.searchName,
        type: this.labelSearch
      }
      this.API.labelList(params).then(res => {
        console.log('标签1', res)
        this.currentPage = page
        this.tableData = res.data
        this.total = res.total
      })
    },
    setLabelList(tagName) {
      console.log(tagName, 'tagName')
    },

    /**
     * onCname Tbs事件代理 中的具体代理事件；
     * //挂在在每个 tab-v 上的事件;
     * @item 当前选中值的 背景参数
     * @v 当前值的 值
     */
    getTabSelList(v) {
      console.log('getTabSelList', v)
      this.tabSelList = v
      const tabSelIdList = []
      v.map(d => {
        tabSelIdList.push(d.id)
      })
      this.tabSelIdList = tabSelIdList
    },
    addData() {
      this.$router.push({
        name: 'label-info',
        query: { OTP: 1, projectName: this.projectName }
      })
    },
    // 编辑
    updateThis(label) {
      this.$router.push({
        name: 'label-info',
        query: { v: label, OTP: 2, projectName: this.projectName }
      })
    },
    // 删除
    delThis(label) {
      this.$confirmDel('此操作将永久删除选中标签, 是否继续?', () => {
        this.API.delLabel({ id: label.id }).then(res => {
          this.handleCurrentChange(this.currentPage)
        })
      })
    },
    // 批量删除
    delLabelIds() {
      if (this.tabSelList.length == 0) return
      this.$confirmDel('此操作将永久删除选中标签, 是否继续?', () => {
        const params = {
          idList: this.tabSelIdList
        }
        this.API.delLabels(params).then(res => {
          this.handleCurrentChange(this.currentPage)
        })
      })
    },
    // 分页获取数据
    handleCurrentChange(e) {
      this.getLabelList(e)
    }
  }
}
</script>

<style lang="scss" scope>
.allTags {
  .userTotal {
    font-size: 16px;
    color: #000;
    margin-bottom: 20px;
  }
  .labelBack {
    background: #3c9;
    padding: 3px;
    color: #fff;
    border-radius: 4px;
    margin: 2px 5px;
    display: inline-block;
    cursor: pointer;
    min-width: 140px;
    max-width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-left: 5px;
    padding-right: 5px;
    text-align: center;
  }
  .R {
    background: #f05050;
  }
  .G {
    background: rgb(51, 204, 153);
  }
  .B {
    background: rgb(0, 153, 255);
  }
  .search-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .search-box-left {
      display: flex;
      .search-box-left-btn {
        text-align: center;
        height: 30px;
        color: #fff;
        border: none;
      }
    }
    .search-box-right {
      line-height: 28px;
      .search-box-right-title {
        margin-right: 20px;
        color: #606266;
      }
    }
  }

  .tab-head-btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .v-name {
    color: #409eff;
    cursor: pointer;
  }
  .sunTag {
    line-height: 60px;
    font-size: 15px;
  }
}
</style>
<style lang="scss">
.el-table th {
  color: #000 !important;
  // background: #f7f6f2 !important;
  text-align: center !important;
}
.el-table td {
  text-align: center !important;
  .v-label {
    background: rgb(51, 204, 153);
    color: #fff;
    padding: 5px;
  }
}
</style>
