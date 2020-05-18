<template>
  <div>
    <div class="userTotal">{{ $t('member.HmemList.h5users') }} ：{{ total }}</div>
    <div class="tab-head-btn">
      <!-- tabMob -->
      <table-mob
        ref="table_mob"
        :table-data="tableData"
        :table-config="tableConfig"
        :tabs-slots="f_tabsSlots"
      >
        <template v-slot:nickName="nickName">
          <div style="height:40px;">
            <img class="head" :src="nickName.nickName.headPortraitUrl" alt>
            <span style="    margin-top: -30px;display: block;">{{ nickName.nickName.nickName }}</span>
          </div>
        <!-- <el-button key="change" type="text" size="mini" @click="integralThis('change')">编辑</el-button> -->
        </template>
        <template v-slot:tagInfo="tagInfo">
          <div>
            <span v-for="(itm,idx) in tagInfo.tagInfo.tagInfo" :key="idx">{{ itm.tagName + ' ' }}</span>
          </div>
        </template>
        <template v-slot:operating>
          <el-button key="change" type="text" size="mini" @click="integralThis('change')">编辑</el-button>
          <el-button key="look" type="text" size="mini" @click="integralThis('look')">查看</el-button>
          <el-button key="del" size="mini" type="text" @click="integralThis('del')">删除</el-button>
        </template>
      </table-mob>
    </div>
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

import memTableConfig from '@/tableConfigs/member/memTableConfig'

import {
  getMessageList,
  tagDetail,
  getMessageListCount,
  memberLog
} from '@/api/member/member'

export default {
  name: 'MemberList',
  props: {
    projectName: {
      type: String,
      default: 'product'
    }
  },
  data() {
    return {
      tableData: [],
      tableConfig: {},
      total: 0,
      currentPage: 1,
      page: 1,
      showTypes: {
        searchType: false, // searchView的 状态
        addLabelType: false, //
        importType: 0
      },
      f_tabsSlots: {
        nickName: 'nickName',
        operating: 'operating',
        tagInfo: 'tagInfo'
      }, // 插槽
      tags: [],
      setItems: []
    }
  },
  computed: {},
  created() {
    this.getMemberList(1)
    this._initTab()
  },
  mounted() {
    console.log('table_mob', this.$refs)
  },
  beforeDestroy() {},
  methods: {
    _initTab() {
      // 对 memTableConfig 配置文件 进行 增加id处理;
      memTableConfig.tabHeadConfig.map((d, idx) => {
        d.id = idx + 1
      })
      this.tableConfig = memTableConfig
    },
    /**
     * @description 会员列表数据
     */
    getMemberList(page) {
      const params = {
        size: 10,
        page: page,
        registered: 2
      }
      Object.assign(params, this.filters)
      getMessageListCount(params).then(res => {
        console.log('会员列表总量', res)
        this.total = res.data
      })
      getMessageList(params).then(res => {
        console.log('会员列表', res)
        this.tableData = res.data.data
        console.log('this.tableData', this.tableData)
      })
    },
    handleCurrentChange(e, type) {
      console.log('分页', e)
      if (type == 'import') {
      } else {
        this.getMemberList(e)
      }
    }
  }
}
</script>

<style lang="scss" scope>
.userTotal {
  font-size: 16px;
  color: #000;
  margin-bottom: 20px;
}
.tab-head-btn {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.v-name {
  color: #409eff;
  cursor: pointer;
}
.head {
  display: inline-block;
  width: 40px;
  margin: 0 10px;
  position: relative;
  display: block;
  white-space: nowrap;
  border-radius: 500px;
}
</style>
<style lang="scss" >
.el-table th {
  color: #000 !important;
  // background: #f7f6f2 !important;
  text-align: center !important;
}
.el-table td {
  text-align: center !important;
}
</style>
