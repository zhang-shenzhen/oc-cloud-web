<template>
  <div>
    <div
      v-if="importType == 1"
      style="display:flex;justify-content: space-between;"
    >
      <div>
        <upfile
          urltype="material"
          type="custom"
          :cid="1"
          :fUrl="'https://v2.ocheng.me/api/member/operat/import'"
          @upfileSuccess="subfile"
        />
      </div>
      <el-button
        class="btn"
        size="mini"
        type="primary"
        style="height:32px;"
        @click="
          donwload({
            row: { fileUrl: 'M00/03/59/CgICAlvGnO2AIBnnAAASAIoloow047.xls' }
          })
        "
        >模版下载</el-button
      >
    </div>
    <div v-if="importType == 2" style="display:flex;">
      <el-input
        placeholder="请输入导出任务名"
        style="100px;"
        size="mini"
        v-model="importFileName"
      ></el-input>
      <el-button size="mini" type="primary" @click="() => {}"
        >导出数据</el-button
      >
      <el-button
        v-if="importType == 2"
        class="btn"
        size="mini"
        type="text"
        @click="
          () => {
            reImportKey = !reImportKey
            oldcheckedCities = checkedCities
          }
        "
        >修改导出字段</el-button
      >
      <el-dialog
        title="修改导出的字段"
        :visible.sync="reImportKey"
        append-to-body
      >
        <div>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="city in cities"
              :label="city.key"
              :key="city.key"
              >{{ city.name }}</el-checkbox
            >
          </el-checkbox-group>
          <span slot="footer" class="dialog-footer">
            <el-button
              size="mini"
              @click="
                () => {
                  reImportKey = !reImportKey
                  checkedCities = oldcheckedCities
                }
              "
              >取 消</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="reImportKey = !reImportKey"
              >确 定</el-button
            >
          </span>
        </div>
      </el-dialog>
    </div>

    <div style="margin-top:30px;">
      {{ importType == 1 ? '导入历史' : '导出历史' }}
    </div>
    <el-table
      :data="importList"
      size="mini"
      style="width: 100%"
      v-if="importType == 1"
    >
      <el-table-column
        fixed
        prop="name"
        label="编号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="enable"
        label="任务名"
        width="90"
      ></el-table-column>
      <el-table-column
        prop="field"
        label="导出数量"
        width="90"
      ></el-table-column>
      <el-table-column
        prop="required"
        label="操作时间"
        width="90"
      ></el-table-column>
      <el-table-column prop="sort" label="操作" width="90">
        <template slot-scope="scope">
          <el-button size="mini" @click="1" type="primary">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="importList"
      size="mini"
      style="width: 100%"
      v-if="importType == 2"
    >
      <el-table-column
        fixed
        prop="id"
        label="编号"
        width="70"
      ></el-table-column>
      <el-table-column
        prop="fileName"
        label="任务名"
        width="100"
      ></el-table-column>
      <el-table-column prop="num" label="导出数量" width="90"></el-table-column>
      <el-table-column
        prop="createTime"
        label="操作时间"
        width="120"
      ></el-table-column>
      <el-table-column prop="sort" label="完成状态" width="90">
        <template slot-scope="scope">
          <el-button size="mini" @click="donwload(scope)" type="primary"
            >下载</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        :current-page="importCurrentPage"
        layout="total, prev, pager, next, jumper"
        :total="importTotal"
        @current-change="handleCurrentChange(importCurrentPage)"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancel">取 消</el-button>
      <el-button size="mini" type="primary" @click="success">确 定</el-button>
    </span>
  </div>
</template>

<script>
import editorImage from '@/components/Tinymce/components/editorImage'
import upfile from '@/components/Tinymce/components/upfile'

import { memberLog } from '@/api/member/member'
import configUrl from '@/api/configUrl'
export default {
  name: 'memberUpfile',
  components: {
    editorImage,
    upfile
  },
  props: {
    importType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      importCurrentPage: 1, //导入导出的 页码
      importTotal: 0, //导入导出的数据总量
      importFileName: '', //导出文件名
      reImportKey: false, //修改导出字段的弹窗type
      importList: [], //导入导出列表的数据源
      cities: [
        {
          key: 'ndisplayName',
          val: 1,
          name: '姓名'
        },
        {
          key: 'ndistrictName',
          val: 1,
          name: '区'
        },
        {
          key: 'nemail',
          val: 1,
          name: '邮箱'
        },
        {
          key: 'nextraInfo',
          val: 1,
          name: '是否微信关注'
        },
        {
          key: 'nmemberCardNumbe',
          val: 1,
          name: '会员卡号'
        },
        {
          key: 'nmemberId',
          val: 1,
          name: '会员ID'
        },
        {
          key: 'nmemberOrNot',
          val: 1,
          name: '是否系统注册'
        },
        {
          key: 'nmemberPoints',
          val: 1,
          name: '会员积分'
        },
        {
          key: 'nnickName',
          val: 1,
          name: '昵称'
        },
        {
          key: 'nphoneNumber',
          val: 1,
          name: '手机号'
        },
        {
          key: 'nsex',
          val: 1,
          name: '性别'
        },
        {
          key: 'ntagList',
          val: 1,
          name: '标签'
        },
        {
          key: 'nvalueScore',
          val: 1,
          name: ''
        },
        {
          key: 'nviscosityScore',
          val: 1,
          name: '会员价值'
        }
        // 是否系统注册: "是否系统注册",
      ],
      fileName: '233',
      nbirthday: '2019-11-14',

      isIndeterminate: false, //是否全选
      checkAll: false,
      checkedCities: [],
      oldcheckedCities: []
    }
  },
  computed: {},
  created() {
    console.log('importType', this.importType)
    this.getMemberLog()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleCurrentChange(e) {
      console.log('e', e)
      console.log('importCurrentPage', this.importCurrentPage)
      this.importCurrentPage = e
      this.getMemberLog()
    },
    //导出或导出数据的历史列表
    getMemberLog() {
      let params = {
        page: this.importCurrentPage,
        size: 5,
        fileType: this.importType
      }
      memberLog(params).then(res => {
        console.log('getMemberLog  ' + this.importType, res)
        this.importList = res.data
        this.importTotal = res.total
      })
    },
    // 上传文件的回调方法
    subfile(e) {
      const _this = this
      console.log('上传成功', e)
      // this.$set(this.form.prizes[arr.cid], 'prizePic', arr[0].url.localUrl)
    },
    //取消
    cancel() {
      this.$emit('cancel', {
        importType: this.importType,
        type: false
      })
    },
    //成功
    success() {
      this.$emit('success', {
        importType: this.importType,
        type: true
      })
    },
    //导出的下载
    donwload(e) {
      if (typeof e == 'string') return window.open(e)
      console.log(e.row.fileUrl)
      window.open(configUrl.showFile + e.row.fileUrl)
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities.map(d => d.key) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
      console.log(this.checkedCities)
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
<style lang="scss">
.el-table th {
  color: #000 !important;
  // background: #f7f6f2 !important;
  text-align: center !important;
}
.el-table td {
  text-align: center !important;
}
</style>
