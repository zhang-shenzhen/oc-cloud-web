<template>
  <div class="searchView">
    <el-dialog
      :title="$t('member.memList.filter.filterMem')"
      :visible.sync="_showType"
      :width="'30%'"
      close-on-click-modal
      :center="true"
      :show-close="false"
      style="margin-bottom:0;"
    >
      <form-mob
        :form-mob-list="formMob"
        :recover-type="formRecoverType"
        :filter-form="filterForm.filterForm"
        @_recoverFormData="recoverFormData"
      >
        <template v-slot:nickName>
          <el-row :gutter="20">
            <el-col style="display:flex;">
              <el-dropdown
                split-button
                size="mini"
                type="primary"
                @command="handleCommand"
              >
                {{
                  dropdowns[0].isSet
                    ? dropdowns[0].name
                    : dropdowns[1].isSet
                    ? dropdowns[1].name
                    : dropdowns[2].isSet
                    ? dropdowns[2].name
                    : ''
                }}
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(itm, idx) in dropdowns"
                    :key="idx"
                    :command="itm.idx"
                    >{{ itm.name }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
              <el-input
                v-model="form.nickName"
                style="flex:1"
                :placeholder="'请输入昵称、手机号、id'"
                size="mini"
                clearable
              />
            </el-col>
          </el-row>
        </template>
        <template v-slot:label>
          <el-form-item label="标签" :label-width="formLabelWidth">
            <el-cascader
              v-model="form.label.value"
              :options="tags"
              :props="{ expandTrigger: 'hover' }"
              size="mini"
              style="width:280px;"
              @change="getTag"
            /> </el-form-item
        ></template>
        <template v-if="!LMBshowType" v-slot:address>
          <el-form-item label="地区" :label-width="formLabelWidth">
            <address-mob
              :addvalue="form.addressValue"
              @getValue="form_getAddressMobValue"
            />
          </el-form-item>
        </template>

        <template v-slot:integral>
          <el-form-item
            v-if="!LMBshowType"
            label="积分值"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.pointsStartString"
              style="width:40%"
              autocomplete="off"
              size="mini"
            />
            至
            <el-input
              v-model="form.pointsEndString"
              style="width:40%"
              autocomplete="off"
              size="mini"
            />
          </el-form-item>
        </template>
        <template v-if="!LMBshowType" v-slot:birthday>
          <el-form-item label="年龄区间" :label-width="formLabelWidth">
            <el-input
              v-model="form.ageStart"
              style="width:40%"
              autocomplete="off"
              size="mini"
            />
            至
            <el-input
              v-model="form.ageEnd"
              style="width:40%"
              autocomplete="off"
              size="mini"
            />
          </el-form-item>
        </template>
        <template v-slot:userStickiness>
          <el-form-item label="用户粘性" :label-width="formLabelWidth">
            <el-input
              v-model="form.viscosityScoreMin"
              style="width:40%"
              autocomplete="off"
              size="mini"
            />
            至
            <el-input
              v-model="form.viscosityScoreMax"
              style="width:40%"
              autocomplete="off"
              size="mini"
            />
          </el-form-item>
        </template>
        <template v-slot:userValue>
          <el-form-item label="用户价值" :label-width="formLabelWidth">
            <el-input
              v-model="form.valueScoreMin"
              style="width:40%"
              autocomplete="off"
              size="mini"
            />
            至
            <el-input
              v-model="form.valueScoreMax"
              style="width:40%"
              autocomplete="off"
              size="mini"
            />
          </el-form-item>
        </template>
      </form-mob>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="_upSV(1)">重置筛选</el-button>
        <el-button type="primary" size="mini" @click="_upSV(2)"
          >应用筛选</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import formMob from '@/components/GPMob/formMob' // 该组件导入地址
import addressMob from '@/components/address/index' // 该组件导入地址

export default {
  name: 'FilterView',
  components: {
    'form-mob': formMob,
    'address-mob': addressMob,
  },
  props: {
    showType: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
      default: function() {
        return [{ l: '标签1', v: '1' }, { l: '标签2', v: '2' }]
      },
    },
    filterForm: {
      type: Object,
      default: function() {
        return {}
      },
    },
  },
  data() {
    return {
      dropdowns: [
        { idx: 0, name: '昵称', isSet: true },
        { idx: 1, name: '手机号', isSet: false },
        { idx: 2, name: 'ID', isSet: false },
      ],
      formMob: [
        {
          // 表单模板
          // 名称
          type: 'slot', // el 类型
          key: 'nickName', // form对应的key
        },
        {
          // 标签
          type: 'slot', // el 类型
          key: 'label', // form对应的key
        },
        {
          // 关注来源
          type: 'radio',
          key: 'subscribeString',
          option: [
            { l: '微信关注', v: '1' },
            { l: '系统注册', v: '2' },
            { l: '全部', v: '3' },
          ],
        },
        {
          // 性别
          type: 'radio-group',
          key: 'sexString',
          option: [
            { l: '全部', v: 'all' },
            { l: '男', v: 'man' },
            { l: '女', v: 'woman' },
          ],
        },
        {
          // 地区
          type: 'slot',
          key: 'address',
        },
        {
          // 关注时间
          type: 'time~yy-mm-dd',
          key: 'setingTime',
        },
        {
          // 注册时间
          type: 'time~yy-mm-dd',
          key: 'registeredTime',
        },
        {
          // 积分值
          type: 'slot',
          key: 'integral',
        },
        {
          // 生日
          type: 'slot',
          key: 'birthday',
        },
        // {
        //   // 会员等级
        //   type: 'select',
        //   key: 'memberLv',
        //   option: [
        //     { l: '1级', v: '1' },
        //     { l: '2级', v: '2' },
        //     { l: '3级', v: '3' }
        //   ]
        // }
      ],
      form: {
        name: '',
        nickName: null,
        memberCardNumber: null,
        phoneNumber: null,
        region: '',
        label: {},
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        // 用户粘性
        viscosityScoreMin: null,
        viscosityScoreMax: null,
        // 会员价值
        valueScoreMin: null,
        valueScoreMax: null,
        ageStart: null,
        ageEnd: null,
        //
        addressValue: [], // 省市区ID放置处
      },
      formRecoverType: false, // formMob 回收数据的状态
      formLabelWidth: '120px',
      ishowType: false,
      upSVType: 0,
      _showType: true,
    }
  },
  computed: {},
  watch: {},
  created() {
    this._showType = this.showType
    this.$set(this.formMob[1], 'option', this.tags)
    // 回显处理
    console.log('filterForm', this.filterForm)
    this.callShow()
    console.log('LMBshowType', this.LMBshowType)
    if (!this.LMBshowType) {
      ;[
        {
          // 表单模板
          // 名称
          type: 'slot', // el 类型
          key: 'nickName', // form对应的key
        },
        {
          // 标签
          type: 'slot', // el 类型
          key: 'label', // form对应的key
        },
        {
          // 性别
          type: 'radio-group',
          key: 'sexString',
          option: [
            { l: '全部', v: 'all' },
            { l: '男', v: 'man' },
            { l: '女', v: 'woman' },
          ],
        },
        {
          // 注册时间
          type: 'time~yy-mm-dd',
          key: 'registeredTime',
        },
        {
          // 生日
          type: 'slot',
          key: 'birthday',
        },
      ]
    }
    // this.formMob = workFormMob(this.formMob,'member.memList.filter.')
  },
  mounted() {
    var vModal = document.getElementsByClassName('el-dialog__wrapper')[1]
    var dialog = document.getElementsByClassName('el-dialog')[1]
    var that = this
    vModal.addEventListener(
      'click',
      function() {
        that._upSV(2)
        event.stopPropagation()
      },
      false
    )
    dialog.addEventListener(
      'click',
      function() {
        event.stopPropagation()
      },
      false
    )
  },
  beforeDestroy() {},
  methods: {
    callShow() {
      if (Object.keys(this.filterForm).length > 0) {
        this.$set(this, 'form', this.filterForm.form)
        if (this.filterForm.form.provinceIdString) {
          const addressValue = [
            this.filterForm.form.provinceIdString,
            this.filterForm.form.cityIdString,
            this.filterForm.form.districtIdStrings,
          ]
          !addressValue[2] ? (addressValue.length = 2) : null
          !addressValue[1] ? (addressValue.length = 1) : null
          !addressValue[0] ? (addressValue.length = 0) : null

          this.$set(this.form, 'addressValue', [...addressValue])
          console.log('回显addressValue', this.form.addressValue)
        }
      }
      if (this.form.memberCardNumber) {
        this.form.nickName = this.form.memberCardNumber
        this.handleCommand(2)
      }
      if (this.form.phoneNumber) {
        this.form.nickName = this.form.phoneNumber
        this.handleCommand(1)
      }
      this.form.nickName = this.form.nickName
    },
    handleCommand(command) {
      console.log('command', command)
      this.dropdowns.forEach((d) => {
        d.isSet = false
      })
      this.dropdowns[command].isSet = true
    },
    /**
     * @description 会员列表数据
     */
    _upSV(type) {
      if (type == 1) {
        this.$emit('_upSV', {
          SVData: {},
          filterForm: {},
        })
      }
      this._upSVType = type
      this.formRecoverType = true
    },
    // 回收子form的数据
    recoverFormData(e) {
      const filterForm = JSON.parse(JSON.stringify(e))
      console.log({ ...filterForm })
      e.sexString = e.sexString == 'man' ? 1 : e.sexString == 'woman' ? 2 : 3
      e.tagListString = this.form.label.label
      e.keyWord = e.name
      // 关注时间
      e.attentionTimeStartLong = null
      e.attentionTimeEndLong = null
      if (e.setingTime) {
        if (e.setingTime[0].getTime) {
          e.attentionTimeStartLong = e.setingTime[0].getTime()
        } else {
          e.attentionTimeStartLong = new Date(e.setingTime[0]).getTime()
        }

        if (e.setingTime[1].getTime) {
          e.attentionTimeEndLong = e.setingTime[1].getTime()
        } else {
          e.attentionTimeEndLong = new Date(e.setingTime[1]).getTime()
        }
      }

      // 注册时间
      e.registerTimeStartLong = e.registeredTime
        ? e.registeredTime[0].getTime()
        : null
      e.registerTimeEndLong = e.registeredTime
        ? e.registeredTime[1].getTime()
        : null
      // 生日
      e.birthdayBegin = e.birthday ? e.birthday[0].getTime() : null
      e.birthdayEnd = e.birthday ? e.birthday[1].getTime() : null
      //
      console.log('[1].isSet', this.dropdowns[1].isSet)
      console.log('[2].isSet', this.dropdowns[2].isSet)
      if (this.dropdowns[1].isSet) {
        this.form.phoneNumber = this.form.nickName
        this.form.nickName = null
        this.form.memberCardNumber = null
      } else if (this.dropdowns[2].isSet) {
        this.form.memberCardNumber = this.form.nickName
        this.form.nickName = null
        this.form.phoneNumber = null
      } else if (this.dropdowns[0].isSet) {
        this.form.phoneNumber = null
        this.form.memberCardNumber = null
      }
      Object.assign(e, this.form)
      this.$emit('_upSV', {
        type: this.upSVType,
        SVData: e,
        filterForm: {
          filterForm: filterForm,
          form: this.form,
        },
      })
    },
    // form表单 地址回收
    form_getAddressMobValue(e) {
      this.form.provinceIdString = e[0].id
      this.form.cityIdString = e[1] ? e[1].id : null
      // 第三条并不参与数据筛选
      this.form.districtIdStrings = e[2] ? e[2].id : null
    },
    getTag(e) {
      this.tags.forEach((d) => {
        if (d.value == e[0]) {
          d.children.forEach((dd) => {
            if (dd.value == e[1]) {
              this.$set(this.form.label, 'label', dd.label)
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scope>
.tabBackground {
  background: #fff;
  .tab-head-btn {
    display: flex;
    justify-content: space-between;
  }
}
</style>
<style lang="scss">
.searchView {
  .el-dialog__wrapper {
    .el-dialog {
      margin-top: 0 !important;
      left: 100%;
      margin-left: -30%;
      min-height: 100%;
      //  height: 100%;
    }
  }

  .el_fomr_label {
    line-height: 60px;
    font-size: 16px;
  }
  .el-form-item {
    .el-form-item__label {
      width: 100% !important;
      color: #000;
      text-align: left;
    }
    .el-form-item__content {
      margin-left: 0 !important;
      .el-select {
        width: 100%;
      }
      .el-radio-group {
        width: 100%;
      }
    }
  }
}
</style>
