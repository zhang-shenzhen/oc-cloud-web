<template>
  <div class="formMob">
    <el-form :model="formMobForm">
      <div v-for="(item, index) in formMobList" :key="index">
        <!-- input -->
        <el-form-item
          v-if="item.type == 'input'"
          :label="$t(item.label)"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formMobForm[item.key]"
            :placeholder="$t(item.placeholder)"
            autocomplete="off"
            size="mini"
          />
        </el-form-item>
        <!-- select -->
        <el-form-item
          v-if="item.type == 'select'"
          :label="$t(item.label)"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="formMobForm[item.key]"
            :placeholder="$t(item.placeholder)"
            size="mini"
          >
            <el-option
              v-for="(itm, idx) in item.option"
              :key="idx"
              :label="itm.l"
              :value="itm.v"
            />
          </el-select>
        </el-form-item>
        <!-- radio -->
        <el-form-item
          v-if="item.type == 'radio'"
          :label="$t(item.label)"
          :label-width="formLabelWidth"
        >
          <el-radio
            v-for="(itm, idx) in item.option"
            :key="idx"
            v-model="formMobForm[item.key]"
            :label="itm.v"
            size="mini"
            >{{ itm.l }}</el-radio
          >
        </el-form-item>
        <!-- radio-group -->
        <el-form-item
          v-if="item.type == 'radio-group'"
          :label="$t(item.label)"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="formMobForm[item.key]" size="mini">
            <el-radio-button
              v-for="(itm, idx) in item.option"
              :key="idx"
              :label="itm.v"
              >{{ itm.l }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <!-- time~hh-MM-ss -->
        <el-form-item
          v-if="item.type == 'time~yy-mm-dd'"
          :label="$t(item.label)"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="formMobForm[item.key]"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          />
        </el-form-item>
        <slot v-if="item.type == 'slot'" :name="item.key" />
      </div>
    </el-form>
  </div>
</template>

<script>
/**
 * formMob:
 *
 * 组件介绍：通用表单模板
 * 当前版本：v1.2.0
 * 版本新增：支持了 slot 插槽 组件；
 * 版本优化：优化了国际化数据的处理，丢弃了之前通用性较差的 处理方式；
 * 组件依赖：import {workFormMob,formMobStr} from '@/utils/index'
 *          workFormMob : 对表单字段的 label , placeholder 进行国际化处理;
 *
 * 详细文档 参阅 ./README.md -> formMob
 *
 *
 */
import { workFormMob } from '@/utils/index'
// import formMob from '@/components/GPMob/formMob' //该组件导入地址
export default {
  name: 'FormMob',
  props: {
    // form结构
    formMobList: {
      type: Array,
      default() {
        return []
      },
    },
    // form回收状态
    recoverType: {
      type: Boolean,
      default: false,
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
      formMobForm: {},
      formLabelWidth: '120px',
    }
  },
  computed: {},
  watch: {
    formMobForm(nv, ov) {
      console.log(ov, nv)
    },
    // 监听recoverType何时回收;
    recoverType(nv, ov) {
      console.log('监听recoverType何时回收', ov, nv)
      if (nv) {
        this._returnFormData()
      }
    },
  },
  created() {
    // formMobList 国际化 Str 处理;
    this.formMobList = workFormMob(
      this.formMobList,
      'label',
      'member.memList.filter.'
    )
    this.formMobList = workFormMob(
      this.formMobList,
      'placeholder',
      'member.memList.filter.'
    )
    this._initForm()

    // console.log('this.formMobList', this.formMobList)
    // console.log('this.formMobForm', this.formMobForm)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 初始化form
    _initForm() {
      const f = {}
      console.log('this.filterForm', this.filterForm)
      this.formMobList.map((d) => {
        f[d.key] = this.filterForm[d.key] || null
      })
      this.formMobForm = f
    },
    // 把表单数据返回至父级;
    _returnFormData() {
      const f = this.formMobForm
      console.log('把表单数据返回至父级 _returnFormData', f)
      this.$emit('_recoverFormData', f)
    },
  },
}
</script>

<style lang="scss">
.el-form-item {
  margin: 0;
}
</style>
