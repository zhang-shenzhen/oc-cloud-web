<template>
  <el-table-column
    :prop="prop"
    v-bind="$attrs"
  >
    <template slot-scope="scope">
      <span
        :style="{ 'padding-left': ((scope.row._level || 0) * 10) + 'px' }"
        @click.prevent="toggleHandle(scope.$index, scope.row)"
      >
        <i style="visibility:visible" />
        {{ scope.row[prop] }}
      </span>
    </template>
  </el-table-column>
</template>

<script>
import { isArray } from 'lodash/isArray'
export default {
  name: 'TableTreeColumn',
  props: {
    prop: {
      type: String
    },
    treeKey: {
      type: String,
      default: 'id'
    },
    parentKey: {
      type: String,
      default: 'parentId'
    },
    childKey: {
      type: String,
      default: 'childList'
    }
  },
  methods: {
    hasChild(row) {
      return (isArray(row[ this.childKey ]) && row[ this.childKey ].length >= 1) || false
    },
    // 切换处理
    toggleHandle(index, row) {
      console.log('111', row)
      if (!this.hasChild(row.childList)) {
        return false
      }
      var data = this.$parent.store.states.data.slice(0)
      data[ index ]._expanded = !data[ index ]._expanded
      if (data[ index ]._expanded) {
        row[ this.childKey ].forEach(item => {
          item._level = (row._level || 0) + 1
          item._expanded = false
        })
        data = data.splice(0, index + 1).concat(row[ this.childKey ]).concat(data)
      } else {
        data = this.removeChildNode(data, row[ this.treeKey ])
      }
      this.$parent.store.commit('setData', data)
      this.$nextTick(() => {
        this.$parent.doLayout()
      })
    },
    // 移除子节点
    removeChildNode(data, pid) {
      var pids = isArray(pid) ? pid : [pid]
      if (pid.length <= 0) {
        return data
      }
      var ids = []
      for (var i = 0; i < data.length; i++) {
        if (pids.indexOf(data[ i ][ this.parentKey ]) !== -1 && pids.indexOf(data[ i ][ this.treeKey ]) === -1) {
          ids.push(data.splice(i, 1)[ 0 ][ this.treeKey ])
          i--
        }
      }
      return this.removeChildNode(data, ids)
    }
  }
}
</script>
