<template>
  <d2-container class="mod-sys__dept">
    <el-form
      :inline="true"
      size="mini"
    >
      <!-- :model="dataForm" -->
      <el-form-item>
        <!-- v-if="$hasPermission('sys:dept:save')" -->
        <el-button
          type="primary"
          @click="isAddOrEdit()"
        >{{ $t('add') }}</el-button>
      </el-form-item>
    </el-form>

    <el-tree
      :data="dataList"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
    />
    <!-- 弹窗, 新增 / 修改 -->
    <el-dialog
      :visible.sync="addOrUpdateVisible"
      :title="!dataForm.id ? $t('add') : $t('update')"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="dataRule"
        label-width="120px"
        size="mini"
        @keyup.enter.native="dataFormSubmitHandle()"
      >
        <el-form-item
          prop="name"
          :label="$t('dept.name')"
        >
          <el-input
            v-model="dataForm.name"
            :placeholder="$t('dept.name')"
          />
        </el-form-item>
        <el-form-item
          required
          :label="$t('dept.parentName')"
          class="dept-list"
        >
          <el-popover
            ref="deptListPopover"
            v-model="deptListVisible"
            placement="bottom-start"
            trigger="click"
          >
            <el-tree
              ref="deptListTree"
              :data="dataList"
              :props="defaultProps"
              node-key="id"
              :highlight-current="true"
              :expand-on-click-node="false"
              accordion
              @current-change="deptListTreeCurrentChangeHandle"
            />
          </el-popover>
          <el-input
            v-model="dataForm.parentName"
            v-popover:deptListPopover
            :readonly="true"
            :placeholder="$t('dept.parentName')"
          >
            <i
              v-if="$store.state.d2admin.user.info.superAdmin === 1 && dataForm.parentId !== 0"
              slot="suffix"
              class="el-icon-circle-close el-input__icon"
              @click.stop="deptListTreeSetDefaultHandle()"
            />
          </el-input>
        </el-form-item>
        <el-form-item
          prop="sort"
          :label="$t('dept.sort')"
        >
          <el-input-number
            v-model="dataForm.sort"
            controls-position="right"
            :min="0"
            :label="$t('dept.sort')"
          />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button
          size="mini"
          @click="addOrUpdateVisible = false"
        >{{ $t('cancel') }}</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="addOrEdit()"
        >{{ $t('confirm') }}</el-button>
      </template>
    </el-dialog>
  </d2-container>
</template>

<script>
import { list, add, edit, details, del } from '@/api/permission'
export default {
  components: {
  },
  data() {
    return {
      dataForm: {
        id: null,
        name: '',
        parentId: '',
        parentName: '',
        sort: 0
      },
      deptList: [],
      deptListVisible: false,
      dataList: null,
      dataListLoading: true,
      addOrUpdateVisible: false,
      defaultProps: {
        children: 'childList',
        label: 'name',
        parentName: 'parentName'
      }
    }
  },
  computed: {
    dataRule() {
      return {
        name: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() { 
      list().then(res => {
        console.log('部门权限列表', res)
        this.dataList = res.data
        this.dataListLoading = false
      })
    },
    isAddOrEdit(data) {
      if (data) {
        // edit
        console.log('edit', this.$refs.deptListTree)
        this.getDetails(data)
      } else {
        // add
        console.log('add')
        this.addOrUpdateVisible = true
        this.dataForm = {}
      }
    },
    getDetails(data) {
      details(data.id).then(res => {
        console.log('详情', res)
        this.dataForm = res.data
        console.log('dataForm', this.dataForm)
        if (this.dataForm.parentId == 0) {
          return this.deptListTreeSetDefaultHandle()
        }
        this.deptListTreeCurrentChangeHandle(data)
      })
      this.addOrUpdateVisible = true
    },
    // 上级部门树, 设置默认值
    deptListTreeSetDefaultHandle() {
      this.dataForm.parentId = '0'
      this.dataForm.parentName = '一级部门'
    },
    // 上级部门树, 选中
    deptListTreeCurrentChangeHandle(data) {
      console.log('上级部门树, 选中', data)
      this.dataForm.parentId = data.id
      this.dataForm.parentName = data.name
      this.deptListVisible = false
    },
    addOrEdit() {
      this.$refs[ 'dataForm' ].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.dataForm.id) {
          // edit
          console.log('edit', this.dataForm)
          this.edit()
        } else {
          // add
          console.log('add', this.dataForm)
          this.add()
        }
      })
    },
    add() {
      add(this.dataForm).then(res => {
        console.log('添加部门权限', res)
        if (res.code == 0) {
          this.addOrUpdateVisible = false
          this.getList()
        }
      })
    },
    edit() {
      edit(this.dataForm).then(res => {
        console.log('编辑部门权限', res)
        if (res.code == 0) {
          this.addOrUpdateVisible = false
          this.getList()
        }
      })
    },
    remove(data) {
      del({
        id: data.id,
        deleted: true
      }).then(res => {
        if (res.code == 0) {
          this.getList()
        }
      })
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;' >
          <span>
            <span>{data.name}</span>
          </span>
          <span>
            <span>{data.parentName}</span>
          </span>
          <span>
            <span>{data.sort}</span>
          </span>
          <span>
            <el-button style='font-size: 12px;' type='text' on-click={() => this.isAddOrEdit(data)}>编辑</el-button>
            <el-button style='font-size: 12px;' type='text' on-click={() => this.remove(data)}>删除</el-button>
          </span>
        </span>)
    }

  }
}
</script>
