<template>
  <el-table
    size="mini"
    :data="list"
    v-bind="table"
  >
    <el-table-column
      prop="title"
      align="center"
    />
    <el-table-column
      width="120"
    >
      <div
        slot-scope="scope"
        class="theme-preview"
        :style="{
          backgroundImage: `url(${$baseUrl}${scope.row.preview})`
        }"
      />
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      width="200"
    >
      <template slot-scope="scope">
        <el-button
          v-if="activeName === scope.row.name"
          type="success"
          icon="el-icon-check"
          round
        >
          {{ $t('theme.list.buttonActive') }}
        </el-button>
        <el-button
          v-else
          round
          @click="handleSelectTheme(scope.row.name)"
        >
          {{ $t('theme.list.button') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'D2ThemeList',
  data() {
    return {
      table: {
        showHeader: false,
        border: true
      }
    }
  },
  computed: {
    ...mapState('d2admin/theme', [
      'list',
      'activeName'
    ])
  },
  methods: {
    ...mapActions('d2admin/theme', [
      'set'
    ]),
    handleSelectTheme(name) {
      this.set(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-preview {
  height: 50px;
  width: 100px;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
</style>
