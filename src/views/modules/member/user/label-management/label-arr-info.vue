<template>
  <d2-container class="page">
    <div class="labelAllInfo">
      <div class="userTotal">编辑标签组</div>
      <el-form size="mini">
        <el-form-item label="标签组名称">
          <el-input v-model="form.tagGroupName" placeholder="标签名称" maxlength="50" />
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="子标签">
          <div>
            <span
              v-for="(itm, idx) in labelArrInfoSetLabels"
              :key="idx"
              :class="{
                labelBack: true,
                R: itm.tagType == 3,
                G: itm.tagType == 2,
                B: itm.tagType == 1
              }"
              >{{ itm.tagName }}</span
            >
          </div>
          <div>
            <el-button
              style="margin-left:100px;margin-top: 18px;"
              type="primary"
              @click="
                () => {
                  dialogTableVisible = true
                  setLabels = [...labelArrInfoSetLabels]
                  setLabelIds = [...labelArrInfoSetLabelIds]
                }
              "
              >+</el-button
            >
          </div>
        </el-form-item>

        <el-button type="primary" size="mini" @click="addLableArr"
          >保存</el-button
        >
        <el-button size="mini" @click="$router.go(-1)">取消</el-button>
      </el-form>

      <el-dialog
        style="min-width:720px;"
        title="添加条件"
        :visible.sync="dialogTableVisible"
      >
        <div>
          <table-mob
            ref="table_mob"
            :table-data="tableData"
            :table-config="tableConfig"
            :tabs-on-c-list="f_tabsOnCList"
            :tabs-slots="f_tabsSlots"
            size="mini"
          >
            <template v-slot:operating="operating">
              <el-button
                key="change"
                type="text"
                size="mini"
                @click="addThis(operating.operating)"
                >添加</el-button
              >
              <el-button
                key="del"
                type="text"
                size="mini"
                @click="moveThis(operating.operating)"
                >移除</el-button
              >
            </template>
          </table-mob>
          <div class="pagination">
            <el-pagination
              background
              :current-page="currentPage"
              layout="total, prev, pager, next, jumper"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </div>
          <div class="setLabelsBox">
            <div class="setLabelsBoxTitle">已选标签</div>
            <div>
              <span
                v-for="(itm, idx) in setLabels"
                :key="idx"
                :class="{
                  labelBack: true,
                  R: itm.tagType == 3,
                  G: itm.tagType == 2,
                  B: itm.tagType == 1
                }"
              >
                {{ itm.tagName }}
                <i class="el-icon-delete" @click="moveThis(itm)" />
              </span>
            </div>
          </div>
          <div style="margin-top:20px;">
            <el-button
              type="primary"
              size="mini"
              @click="
                () => {
                  labelArrInfoSetLabels = [...setLabels]
                  dialogTableVisible = false
                  labelArrInfoSetLabelIds = [...setLabelIds]
                }
              "
              >保存</el-button
            >
            <el-button size="mini" @click="dialogTableVisible = false"
              >取消</el-button
            >
          </div>
        </div>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import tableMob from '@/components/GPMob/tableMob'
import allLabeInArrConfig from '@/tableConfigs/member/allLabeInArrConfig'
import {
  labelList,
  addLabelGroup,
  getLabelGroupInfo,
  updateLabelGroup
} from '@/api/member/member'
import {
  surbanajurong_labelList,
  surbanajurong_addLabelGroup,
  surbanajurong_getLabelGroupInfo,
  surbanajurong_updateLabelGroup
} from '@/api/surbanajurong/wechat/member'

export default {
  components: {
    'table-mob': tableMob
  },
  props: {
    showType: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      projectName: 'product',
      API: {},
      form: {
        tagGroupName: '',
        description: ''
      },
      labelArrInfoSetLabels: [],
      labelArrInfoSetLabelIds: [],
      setLabels: [],
      setLabelIds: [],
      dialogTableVisible: false,
      total: 0,
      page: 1,
      id: null,
      currentPage: 1,
      tableData: [],
      tableConfig: {},
      f_tabsOnCList: [], // 该tab的事件集合  @ k:key; mT:methodsType
      f_tabsSlots: { operating: 'operating' } // 插槽
    }
  },
  computed: {},
  watch: {},
  created() {
    if (localStorage.getItem('projectName')) {
      const projectName = localStorage.getItem('projectName')
      this.projectName = projectName
      if (projectName == 'surbanajurong') {
        this.API = {
          labelList: surbanajurong_labelList,
          addLabelGroup: surbanajurong_addLabelGroup,
          getLabelGroupInfo: surbanajurong_getLabelGroupInfo,
          updateLabelGroup: surbanajurong_updateLabelGroup
        }
      } else {
        this.API = {
          labelList: labelList,
          addLabelGroup: addLabelGroup,
          getLabelGroupInfo: getLabelGroupInfo,
          updateLabelGroup: updateLabelGroup
        }
      }
    }

    this.getLabelList(1)
    this._initTab()
    if (this.$route.query.OTP == 2) {
      this.getLabelGroupInfos(this.$route.query.LGId)
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    _initTab() {
      this.tableConfig = allLabeInArrConfig
    },
    // 获取标签组详情
    getLabelGroupInfos(id) {
      const params = {
        id: id
      }
      this.API.getLabelGroupInfo(params).then(res => {
        console.log('获取标签组详情', res)
        res.tagList.map(d => {
          this.labelArrInfoSetLabelIds.push(d.id)
        })
        this.labelArrInfoSetLabels = res.tagList
        this.form.tagGroupName = res.tagGroupName
        this.form.description = res.description
        this.id = id
      })
    },
    /**
     * @description 标签列表
     */
    getLabelList(page) {
      const params = {
        size: 10,
        page: page,
        channelTypeId: 1,
        companyId: 1
      }
      this.API.labelList(params).then(res => {
        console.log('标签1', res)
        this.currentPage = page
        this.tableData = res.data
        this.total = res.total
      })
    },
    // 分页获取数据
    handleCurrentChange(e) {
      this.getLabelList(e)
    },
    addThis(label) {
      if (this.setLabelIds.indexOf(label.id) > -1) return
      this.setLabelIds.push(label.id)
      this.setLabels.push(label)
    },
    moveThis(label) {
      const idx = this.setLabelIds.indexOf(label.id)
      if (idx > -1) {
        this.setLabelIds.splice(idx, 1)
        this.setLabels.splice(idx, 1)
      } else {
        return
      }
    },
    // 保存 标签组
    addLableArr() {
      const params = {
        channelId: 1,
        channelTypeId: 1,
        companyId: 1,
        createTime: new Date(),
        deleted: 0,
        description: this.form.description,
        id: this.id,
        mutex: 0,
        source: 0,
        tagGroupName: this.form.tagGroupName,
        tagIdList: this.labelArrInfoSetLabelIds,
        updateTime: new Date()
      }
      if (this.$route.query.OTP == 1) {
        this.API.addLabelGroup(params).then(res => {
          this.$router.go(-1)
        })
      } else {
        this.API.updateLabelGroup(params).then(res => {
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>

<style lang="scss" scope>
.labelBack {
  padding: 3px;
  color: #fff;
  border-radius: 4px;
  margin: 2px 5px;
  display: inline-block;
  cursor: pointer;
  min-width: 60px;
  max-width: 60px;
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
.labelAllInfo {
  // padding: 20px;
  // background: #fff;
  // border-radius: 10px;
  // margin: 10px;

  position: relative;
  margin-left: 40px;
  .el-timeline-item__timestamp.is-top {
    position: relative !important;
    left: -100px;
  }
  .setLabelsBox {
    height: 200px;
    padding: 30px;
    margin-top: 20px;
    border: 1px solid #dcdfe6;
    position: relative;
    .setLabelsBoxTitle {
      width: 80px;
      text-align: center;
      position: absolute;
      top: -10px;
      background: #fff;
      font-size: 20px;
      padding: 0 10px;
    }
  }
  .labelBack {
    padding: 3px;
    color: #fff;
    border-radius: 4px;
    margin: 2px 5px;
    display: inline-block;
    cursor: pointer;
    line-height: 20px;
    min-width: 70px;
    text-align: center;
  }
}
</style>
<style lang="scss">
.labelAllInfo {
  .userTotal {
    font-size: 16px;
    color: #000;
    margin-bottom: 20px;
  }
  .redTxt {
    padding-left: 100px;
    line-height: 30px;
    font-size: 14px;
    color: red;
    margin-top: -20px;
    margin-bottom: 20px;
  }

  .el_fomr_label {
    line-height: 60px;
    font-size: 16px;
  }
  .el-form-item {
    .el-form-item__label {
      // width: 100% !important;
      color: #000;
      text-align: left;
      width: 100px;
    }
    .el-form-item__content {
      margin-left: 0 !important;
      .el-textarea {
        width: 300px;
      }
      .el-input {
        width: 300px;
      }
      .el-select {
        width: 300px;
      }
      .el-radio-group {
        // width:200px;
      }
      label {
        // width: 50%;
        // display: block;
      }
    }
  }
}
</style>
