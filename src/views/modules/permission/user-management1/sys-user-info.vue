<template>
  <div class="sys-user-info">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" size="mini" />
      </el-form-item>
      <el-form-item label="所属部门">
        <!-- <el-cascader size="mini" :options="options" :show-all-levels="false">

        </el-cascader> -->
        <el-select v-model="value" size="mini" placeholder="请选择">
          <el-option
            :label="1"
            :value="1"
          >
            <el-tree
              :data="data"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick"
            />
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwdword" size="mini" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.repwdword" size="mini" />
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.name" size="mini" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.resource" size="mini">
          <el-radio label="男" />
          <el-radio label="女" />
          <el-radio label="保密" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.name" size="mini" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.name" size="mini" />
      </el-form-item>
      <el-form-item label="角色配置">
        <el-select v-model="form.region" size="mini" placeholder="请选择活动区域">
          <el-option label="1" value="shanghai" />
          <el-option label="2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.resource" size="mini">
          <el-radio label="停用" />
          <el-radio label="正常" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="onSubmit">确定</el-button>
        <el-button size="mini">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import orderConfig from '@/tableConfigs/UPM-PM/UPMorder/orderConfig'
import { oneDriver } from '@/api/UPM-api/EmployingManagement'
import { userWeCheatInfo } from '@/api/member/member'
export default {
  components: {
  },
  props: {
    driverInfoData: {
    // 司机ID
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      value: null,
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }]
        }
      ],
      form: {
        name: null,
        pwdword: null,
        repwdword: null,
        resource: null,
        region: null,
        resource: null
      },
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {
    onSubmit() {

    },
    handleNodeClick(data) {
      console.log(data)
      this.value = data.label
    }
  }

}
</script>

<style lang="scss" scope>

</style>
<style lang="scss" >
.sys-user-info{
  .el-select-dropdown__wrap{
    li{
      height: 100% !important;
    }
  }
}
.el-select-dropdown{
  // background: #eded !important;
  li{
    height: 100% !important;
  }
}
</style>
