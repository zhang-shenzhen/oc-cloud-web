<template>
  <div class="labelInfo">
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      style="width: 500px;"
      size="mini"
      status-icon
      :rules="rules"
    >
      <el-form-item label="标签名称" prop="tagName">
        <el-input v-model="form.tagName" maxlength="10" show-word-limit />
      </el-form-item>
      <!-- <div class="redTxt">不得超过6个汉字或12个字符</div> -->
      <el-form-item label="所属标签组" prop="labelGroup">
        <el-select
          v-model="form.tagGroupId"
          style="width: 100%;"
          placeholder="请填选择所属标签组"
          @change="
            label => {
              form.tagGroupName = GroupListIds[form.tagGroupId].tagGroupName
            }
          "
        >
          <el-option
            v-for="(itm, idx) in GroupList"
            :key="idx"
            :label="itm.tagGroupName"
            :value="itm.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input v-model="form.remark" type="textarea" :rows="4" />
      </el-form-item>
      <!-- <div class="redTxt">不得超过20个汉字或40个字符</div> -->
      <el-form-item label="标签类型" prop="tagType">
        <el-radio-group v-model="form.tagType">
          <el-radio v-if="projectName == 'product'" :label="1"
            >自有标签</el-radio
          >
          <el-radio :label="2">微信标签</el-radio>
          <el-radio :label="3">菜单标签</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="筛选条件">
        <el-button type="primary" @click="() => { dialogTableVisible = true }">添加</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitLabel('form')"
          >保存</el-button
        >
        <el-button size="mini" @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      style="min-width:720px;"
      title="添加条件"
      :visible.sync="dialogTableVisible"
    >
      <el-row>
        <el-col :span="2" style="margin-top:10px;"
          >{{ $t('member.filter.screeningConditions') }}：</el-col
        >
        <el-col :span="22" class="showHide">
          <filter-com
            v-if="conditions.length > 0"
            :childid="conditions"
            @getFilter="getCheckValue"
          />
        </el-col>
      </el-row>

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
    </el-dialog>
  </div>
</template>

<script>
import {
  labelInfo,
  addLabel,
  labelGroupList,
  updateLabel
} from '@/api/member/member'
import {
  surbanajurong_labelInfo,
  surbanajurong_addLabel,
  surbanajurong_labelGroupList,
  surbanajurong_updateLabel
} from '@/api/surbanajurong/wechat/member'
import FilterCom from '@/components/filter'
export default {
  components: {
    'filter-com': FilterCom
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
      rules: {
        tagName: [{ required: true, message: '请填标签名称', trigger: 'blur' }],
        tagType: [
          { required: true, message: '请选择标签类型', trigger: 'change' }
        ]
      },
      form: {
        id: null,
        tagName: '',
        tagType: null,
        remark: '',
        tagGroupId: null,
        tagGroupName: null
      },
      GroupList: [],
      GroupListIds: {},
      conditions: [],
      dialogTableVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log('标签名', this.$route.query)

    if (localStorage.getItem('projectName')) {
      const projectName = localStorage.getItem('projectName')
      this.projectName = projectName
      if (projectName == 'surbanajurong') {
        this.API = {
          labelInfo: surbanajurong_labelInfo,
          addLabel: surbanajurong_addLabel,
          labelGroupList: surbanajurong_labelGroupList,
          updateLabel: surbanajurong_updateLabel
        }
      } else {
        this.API = {
          labelInfo: labelInfo,
          addLabel: addLabel,
          labelGroupList: labelGroupList,
          updateLabel: updateLabel
        }
      }
    }

    if (this.$route.query.v) {
      this._initLabelInfo()
      this.getLabelInfo()
    }
    this.conditions = [
      {
        entrys: [],
        type: 2
      }
    ]
    this.getLabelGroupList()

    console.log('this.conditions', this.conditions)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getLabelGroupList(page) {
      const params = {
        size: 9999,
        page: 1,
        channelTypeId: 1,
        companyId: 1
      }
      this.API.labelGroupList(params).then(res => {
        console.log('标签组列表', res)
        this.GroupList = res.data
        this.GroupListIds = res.GroupIdList
        if (this.$route.query.v) {
          console.log()
        }
      })
    },
    getCheckValue(e) {
      console.log('getCheckValue获取筛选条件', e)
    },
    _initLabelInfo() {
      this.form = this.$route.query.v
      console.log('this.form', this.form)
    },
    /**
     * @description 会员列表数据
     */
    getLabelInfo() {
      const params = {
        id: this.$route.query.v.id,
        channelTypeId: 1,
        companyId: 1
      }
      this.API.labelInfo(params).then(res => {
        console.log('标签详情', res)
        if (res.menuTag == 1 && res.tagType == 2) res.tagType = 3
        this.form = res
      })
    },
    submitLabel(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const params = {
            channelId: 1,
            channelTypeId: 1,
            companyId: 1,
            createFilterDTO: null,
            queryMemberDTOList: null,
            tagDTO: { ...this.form }
          }
          params.tagDTO.filterId = null
          params.tagDTO.menuTag = 2
          if (params.tagDTO.tagType == 3) {
            params.tagDTO.menuTag = 1
            params.tagDTO.tagType = 2
          }
          if (!params.tagDTO.tagType) {
            return this.$notify.error({
              title: '错误',
              message: '请选择标签类型'
            })
          }
          console.log('提交操作', params)
          if (this.$route.query.OTP === 1) {
            this.API.addLabel(params).then(res => {
              this.$router.go(-1)
            })
          } else {
            this.API.updateLabel(params.tagDTO).then(res => {
              this.$router.go(-1)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
.labelInfo {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  margin: 10px;

  position: relative;
  margin-left: 40px;
  .el-timeline-item__timestamp.is-top {
    position: relative !important;
    left: -100px;
  }
}
</style>
<style lang="scss">
.labelInfo {
  .el-dialog {
    min-width: 1080px;
  }
}
</style>
