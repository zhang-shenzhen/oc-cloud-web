<template>
  <div class="tagGroup">
    <div class="search-box">
      <div class="search-box-left">
        <el-input v-model="searchName" clearable size="mini" />
        <el-button
          type="primary"
          size="mini"
          class="search-box-left-btn"
          @click="getLabelGroupList(1)"
          >搜索</el-button
        >
      </div>
      <div class="search-box-right">
        <div>
          <span
            v-if="projectName == 'product'"
            style="color: rgb(0, 153, 255); margin-left: 25px;"
            >蓝色为自有标签</span
          >
          <span style="color: rgb(51, 204, 153); margin-left: 25px;"
            >绿色为微信标签</span
          >
          <span style="color: #f05050; margin-left: 25px;">红色为菜单标签</span>
        </div>
      </div>
    </div>

    <div class="tab-head-btn">
      <div class="tab-head-btn-l">
        <el-button
          v-if="$Buttonpermissions('surbanajurong.wechat.label.groupabel[add]')"
          type="primary"
          size="mini"
          class="search-box-btn"
          @click="addLabelArr"
          >添加标签组</el-button
        >
        <el-button
          v-if="$Buttonpermissions('surbanajurong.wechat.label.groupabel[del]')"
          type="danger"
          size="mini"
          class="search-box-btn"
          @click="delGroups"
          >删除</el-button
        >
      </div>
    </div>
    <!-- tabMob -->
    <table-mob
      v-if="false"
      ref="table_mob"
      :table-data="tableData"
      :table-config="tableConfig"
      :tabs-on-c-list="f_tabsOnCList"
      :tabs-slots="f_tabsSlots"
      @_selectionChange="getTabSelList"
      @_list="tabEvns"
    >
      <template v-slot:list="list">
        <div :style="{ height: list.list.showMorry ? '100%' : '34px' }">
          <span
            v-if="list.list.list.length > 3"
            style="position: absolute; right: 0; "
            @click="showMorry(list.list, !list.list.showMorry)"
            >{{ list.list.showMorry ? '隐藏' : '展示' }}</span
          >
          <div
            v-for="(itm, idx) in list.list.list"
            :key="idx"
            :class="{
              labelBack: true,
              R: itm.tagType == 3,
              G: itm.tagType == 2,
              B: itm.tagType == 1,
            }"
            @click="setLabelList(itm)"
          >
            <el-tooltip
              effect="dark"
              :content="itm.tagName + ''"
              placement="top-start"
            >
              <span>{{ itm.tagName }}</span>
            </el-tooltip>
          </div>
        </div>
      </template>

      <template v-slot:operating2="operating2">
        <el-button
          v-if="
            $Buttonpermissions('surbanajurong.wechat.label.groupabel[update]')
          "
          type="text"
          size="mini"
          @click="updateThis(operating2.operating2)"
          >编辑</el-button
        >
        <el-button
          v-if="$Buttonpermissions('surbanajurong.wechat.label.groupabel[del]')"
          type="text"
          size="mini"
          @click="delThis(operating2.operating2)"
          >删除</el-button
        >
      </template>
    </table-mob>

    <el-table
      ref="multipleTable"
      class="userTab"
      size="mini"
      tooltip-effect="dark"
      :data="labeltableData"
      highlight-current-row
      row-key="id"
      style="width: 100%;"
      max-height="500"
      height="500px"
      @selection-change="getTabSelList"
    >
      <el-table-column type="selection" width="55" show-overflow-tooltip />
      <el-table-column fixed prop="tagGroupName" label="标签组名" width="200" />
      <el-table-column prop="description" label="表述" width="100" />
      <el-table-column prop="list" label="标签" width="300">
        <template slot-scope="scope">
          <div :style="{ height: scope.row.showMorry ? '100%' : '34px' }">
            <span
              v-if="scope.row.list.length > 3"
              style="position: absolute; right: -20px;top:25%;z-index: 999;"
              @click="changeShowMorry(scope)"
              >{{ scope.row.showMorry ? '隐藏' : '展示' }}</span
            >
            <div
              v-for="(itm, idx) in scope.row.list"
              :key="idx"
              :class="{
                labelBack: true,
                R: itm.tagType == 3,
                G: itm.tagType == 2,
                B: itm.tagType == 1,
              }"
              @click="setLabelList(itm)"
            >
              <el-tooltip
                effect="dark"
                :content="itm.tagName + ''"
                placement="top-start"
              >
                <span>{{ itm.tagName }}</span>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="listLength" label="标签数" width="150" />
      <el-table-column prop="updateTime" label="更新时间" width="300" />
      <el-table-column prop="zip" label="邮编" width="120" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="
              $Buttonpermissions('surbanajurong.wechat.label.groupabel[update]')
            "
            type="text"
            size="mini"
            @click="updateThis(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="
              $Buttonpermissions('surbanajurong.wechat.label.groupabel[del]')
            "
            type="text"
            size="mini"
            @click="delThis(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

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
import labelArrConfig from '@/tableConfigs/member/labelArrConfig'
import {
  labelGroupList,
  delLabelGroup,
  delLabelGroups,
} from '@/api/member/member'
import {
  surbanajurong_labelGroupList,
  surbanajurong_delLabelGroup,
  surbanajurong_delLabelGroups,
} from '@/api/surbanajurong/wechat/member'

export default {
  name: 'Arrlabel',
  components: {},
  props: {
    type: {
      type: String,
      default: 'product',
    },
  },
  data() {
    return {
      projectName: 'product',
      API: {},
      form: {
        name: '',
        resource: '',
      },
      total: 0,
      page: 1,
      currentPage: 1,
      tableData: [],
      tableConfig: {},
      f_tabsOnCList: [{ k: 'sex', mT: 'mouseover' }], // 该tab的事件集合  @ k:key; mT:methodsType
      f_tabsSlots: { operating2: 'operating2', list: 'list' }, // 插槽
      tabSelList: [],
      tabSelIdList: [],
      searchName: null,
      labelSearch: null, // label筛选
      showMorrys: [],
      labeltableData: [],
    }
  },
  computed: {},
  watch: {
    labelSearch: function(n, o) {
      this.getLabelGroupList(1)
    },
  },
  created() {
    if (localStorage.getItem('projectName')) {
      const projectName = localStorage.getItem('projectName')
      this.projectName = projectName
      if (projectName == 'surbanajurong') {
        this.API = {
          labelGroupList: surbanajurong_labelGroupList,
          delLabelGroup: surbanajurong_delLabelGroup,
          delLabelGroups: surbanajurong_delLabelGroups,
        }
      } else {
        this.API = {
          labelGroupList: labelGroupList,
          delLabelGroup: delLabelGroup,
          delLabelGroups: delLabelGroups,
        }
      }
    }
    this.getLabelGroupList(1)
    this._initTab()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    listScope(e) {
      console.log('listScope', e)
    },
    showMorry(list, type, scope) {
      list.showMorry = type
      this.$set(this.tableData[idx], 'type', type)
      this.tableData.forEach((d, idx) => {
        if (d.id == list.id) this.$set(this.tableData[idx], 'showMorry', type)
      })
      this.$nextTick(function() {
        this.tableData.forEach((d, idx) => {
          if (d.id == list.id) this.$set(this.tableData[idx], 'showMorry', type)
        })
        this.$forceUpdate()
        console.log('$nextTick')
      })
    },
    changeShowMorry(scope) {
      console.log('scope', scope)
      const labeltableDataCP = JSON.parse(JSON.stringify(this.labeltableData))
      console.log('labeltableDataCP', labeltableDataCP)
      labeltableDataCP[scope.$index].showMorry = !scope.row.showMorry
      this.$set(this, 'labeltableData', labeltableDataCP)
      console.log('this.labeltableData', this.labeltableData)
    },
    _initTab() {
      this.tableConfig = labelArrConfig
    },
    /**
     * @description 会员列表数据
     */
    getLabelGroupList(page) {
      const params = {
        size: 10,
        page: page,
        channelTypeId: 1,
        companyId: 1,
        name: this.searchName,
        type: this.labelSearch,
      }
      this.API.labelGroupList(params).then((res) => {
        // console.log('标签组列表', res)

        this.currentPage = page
        this.tableData = res.data
        this.tableData.forEach((d, idx) => {
          d.idx = idx
          d.showMorry = false
        })
        this.labeltableData = JSON.parse(JSON.stringify(this.tableData))
        console.log(JSON.stringify(this.tableData))
        this.total = res.total
      })
    },
    /**
     * setIngV Tbs事件代理
     * //挂在在每个 tab-v 上的事件;
     * @k 当前选中值的 背景参数
     * @v 当前值的 值
     */
    tabEvns(k, v) {
      this['onC' + k](v) // 动态调用当前列表中的方法;
    },
    // null
    onCoperating2() {},
    // 添加标签组
    addLabelArr() {
      this.$router.push({
        name: 'member-user-userManagement-labelArrInfo',
        query: { OTP: 1, projectName: this.projectName },
      })
    },
    // 批量删除标签组
    delGroups() {
      if (this.tabSelList.length === 0) return
      console.log('this.tabSelIdList', this.tabSelIdList)
      this.$confirm('此操作将永久删除选中标签组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const params = {
            idList: this.tabSelIdList,
          }
          this.API.delLabelGroups(params).then((res) => {
            this.handleCurrentChange(this.currentPage)
          })
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //
    getTabSelList(v) {
      this.tabSelList = v
      const tabSelIdList = []
      v.map((d) => {
        tabSelIdList.push(d.id)
      })
      this.tabSelIdList = tabSelIdList
    },
    updateThis(v) {
      this.$router.push({
        name: 'label-arr-info',
        query: { OTP: 2, LGId: v.id, projectName: this.projectName },
      })
    },
    // 删除单个标签组
    delThis(v) {
      this.API.delLabelGroup({ id: v.id }).then((res) => {
        this.$confirm('此操作将永久删除该标签组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.handleCurrentChange(this.currentPage)
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      })
    },
    // 分页获取数据
    handleCurrentChange(e) {
      this.getLabelGroupList(e)
    },
    //
    setLabelList(label) {},
  },
}
</script>

<style lang="scss" scope>
.v-list {
  white-space: initial !important;
  display: block;
}
.tagGroup {
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
    min-width: 60px;
    max-width: 60px;
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
        // background: #66b1ff;
        // margin-left: -5px;
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
}
</style>
<style lang="scss">
.tagGroup {
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
  .cell {
    // text-align: left;
  }
}
</style>
