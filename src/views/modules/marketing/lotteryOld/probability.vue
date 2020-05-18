<template>
  <div>
    <el-table :data="tableData" style="width: 100%" size="mini">
      <el-table-column prop="prizeCode" label="奖品编号" width="180" />
      <el-table-column prop="name" label="奖品名称" width="80" />
      <el-table-column prop="type" label="奖品类型" width="80">
        <template slot-scope="scope">
          <div>
            <span v-if="scope.row.type == 1">卡券</span>
            <span v-if="scope.row.type == 2">积分</span>
            <span v-if="scope.row.type == 3">无</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="prize" label="奖品内容" width="80" />
      <el-table-column prop="probability" label="概率" width="280">
        <template slot-scope="scope">
          <div>
            <el-input
              v-model.number="scope.row.probability"
              size="mini"
              @input="inputProbability"
            />
            <span style="margin-left:20px;">%</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div
      :style="{ 'font-size': '12px', color: color100, 'margin-top': '10px' }"
    >
      <div>概率和需为100%</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Probability',
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    index: {
      type: Number,
      default: null
    },
    type: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      color100: 'red'
    }
  },
  computed: {
    // sunProbability(){
    // },
  },
  watch: {
    type(nv, ov) {
      // console.log('typeChange',nv)
      if (nv) {
        this.color100 = '#afaeae'
      } else {
        this.color100 = 'red'
      }
    }
  },
  created() {
    this.inputProbability()
    console.log('概率分布tableData', this.tableData)
    this.tableData.map((d, idx) => {
      d.prizeCode = '奖品' + (idx + 1)
    })
  },
  methods: {
    inputProbability() {
      console.log('inputProbability', this.type)
      let sunProbability = 0
      this.tableData.map(d => {
        sunProbability += d.probability
      })
      if (sunProbability == 100) {
        console.log('sunProbability == 100')
        this.$emit('_type', { index: this.index, type: true })
      } else {
        this.$emit('_type', { index: this.index, type: false })
      }
    }
  }
}
</script>
