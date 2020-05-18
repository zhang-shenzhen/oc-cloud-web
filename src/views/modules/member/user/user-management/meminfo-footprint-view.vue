<template>
  <div class="memInfoCardView">
    <div class="memInfo-r-bottom">
      <div>
        <el-table :data="tableData" size="mini" style="width: 100%">
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="浏览时间"
            prop="lookTime"
          />
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="浏览商品"
            prop="product"
            width="300"
          >
            <template slot-scope="scope">
              <div style="display:flex;" @click="setScope(scope.row)">
                <img
                  style="display:block;width:120px; margin-right:20px;"
                  :src="require(`@img/icon/${scope.row.icon}`)"
                  alt=""
                />
                <div style="text-align:left;line-height:30px;">
                  <div>{{ scope.row.name }}</div>
                  <div>数量:{{ scope.row.sum }}</div>
                  <div>尺码:{{ scope.row.size }}</div>
                  <div>金额:{{ scope.row.payNum }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="浏览次数"
            prop="lookSum"
          />
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="浏览时长(min)"
            prop="lookSumTime"
          />
        </el-table>
        <div class="pagination" style="margin-top:20px;">
          <el-pagination
            background
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showType: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableData: [
        {
          name: 'LOEWE卫衣',
          sum: '1',
          size: 'M',
          icon: 'wy.jpg',
          orderNum: '$200',
          payNum: '$100',
          address: '今冬 18530870777',
          PType: '快递',
          OType: '预售',
          type: '已完成',
          orderCode: 'SUN8887771',
          lookTime: '2020.1.16 12:33:22',
          lookSum: 12,
          lookSumTime: 120,
        },
        {
          name: 'Gucci女包',
          sum: '1',
          size: 'M',
          icon: 'package2.jpeg',
          orderNum: '$600',
          payNum: '$300',
          address: '今冬 18530870777',
          PType: '快递',
          OType: '预售',
          type: '已完成',
          orderCode: 'SUN8887771',
          lookTime: '2020.1.16 12:33:22',
          lookSum: 12,
          lookSumTime: 120,
        },
        {
          name: '女包',
          sum: '1',
          size: 'M',
          icon: 'package1.jpg',
          orderNum: '$400',
          payNum: '$200',
          address: '今冬 18530870777',
          PType: '快递',
          OType: '预售',
          type: '已完成',
          orderCode: 'SUN8887771',
          lookTime: '2020.1.16 12:33:22',
          lookSum: 12,
          lookSumTime: 120,
        },
      ],
      currentPage: 1,
      total: 3,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    setScope(scpoe) {
      console.log('setScope', scpoe)
    },
    handleCurrentChange() {},
    /**
     * @description 会员列表数据
     */
    _upSV(type) {
      console.log('_upSV', type)
      this._showType = false
      this.$emit('_upSV', { type: type, SVData: this.form })
    },
  },
}
</script>

<style lang="scss" scope>
.jf {
  text-align: center;
  display: flex;
  justify-content: space-around;
  font-family: 'PingFangTC-Semibold', 'PingFang TC Semibold', 'PingFang TC';
  font-weight: 650;
  font-style: normal;
  font-size: 16px;
}
</style>
