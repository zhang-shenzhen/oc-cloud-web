<template>
  <d2-container class="page">
    <el-row class="_data">
      <div class="data_sty">
        <el-date-picker
          size="mini"
          v-model="timeDate"
          class="sty_time"
          type="daterange"
          clearable
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="selectTime"
        />
      </div>
      <el-table :data="tableData" style="width: 100%" size="mini">
        <el-table-column label="文章标题">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <span>{{ scope.row.refDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="送达人数"
          width="80"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sendCount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="阅读人数"
          width="80"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.intPageReadUser }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="阅读率"
          width="80"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.intPageReadPercent }}</span>
          </template>
        </el-table-column>
        <el-table-column label="原文页阅读人数">
          <template slot-scope="scope">
            <span>{{ scope.row.oriPageReadUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="原文页阅读率">
          <template slot-scope="scope">
            <span>{{ scope.row.oriPageReadPercent }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分享人数"
          width="80"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.shareUser }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分享率"
          width="80"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sharePercent }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收藏人数"
          width="80"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.addToFavUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收藏率">
          <template slot-scope="scope">
            <span>{{ scope.row.addToFavPercent }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetails(scope.row.msgId,scope.row.sendCount,scope.row.totalCount)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 页数 -->
      <div class="pagination">
        <el-pagination
          background
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
  </d2-container>
</template>
<script>
import { GraphicData } from '@/api/dataCenter/fansList'
export default {
  name: 'ImageGraphic',
  components: {},
  data() {
    return {
      timeDate: '',
      currentPage: 1,
      total: 0,
      tableData: []
    };
  },
  computed: {},
  created() {
    this.showTime()
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    showTime() {
      // 页面显示时间
      const time = new Date() - 7 * 24 * 60 * 60 * 1000
      const start = this.$formatDate(new Date(time), 'yyyy-MM-dd')
      const end = this.$formatDate(new Date(), 'yyyy-MM-dd')
      this.timeDate = [start, end]
      this.graphicDataInterface(start, end, 1)
    },
    selectTime() {
      // 选择时间
      if (this.timeDate) {
        this.graphicDataInterface(this.timeDate[ 0 ], this.timeDate[ 1 ], 1)
      }
    },
    graphicDataInterface(str, end, e) {
      // 图文数据列表数据
      const obj = {
        beginTime: str,
        endTime: end,
        pageSize: 10,
        pageNum: e
      }
      GraphicData(obj).then(res => {
        if (res.code == 0) {
          console.log('图文数据列表数据', res)
          if (res.data.data.length > 0) {
            res.data.intPageReadPercent = 0;
            res.data.oriPageReadPercent = 0;
            res.data.sharePercent = 0;
            res.data.addToFavPercent = 0;
            res.data.data.map(item => {
              res.data.intPageReadPercent += item.intPageReadUser;
              res.data.oriPageReadPercent += item.oriPageReadUser;
              res.data.sharePercent += item.shareUser;
              res.data.addToFavPercent += item.addToFavUser;
            });
            this.tableData = res.data.data;
            if (res.data.data.length == this.tableData.length) {
              this.tableData.map((item, index) => {
                if (!item.intPageReadUser) {
                  item.intPageReadPercent = "0.00%";
                } else if (item.intPageReadUser) {
                  item.intPageReadPercent =
                    (
                      (item.intPageReadUser / res.data.intPageReadPercent) *
                      100
                    ).toFixed(2) + "%";
                }
                if (!item.oriPageReadPercent) {
                  item.oriPageReadPercent = "0.00%";
                } else if (item.oriPageReadPercent) {
                  item.oriPageReadPercent =
                    (
                      (item.oriPageReadUser / res.data.oriPageReadPercent) *
                      100
                    ).toFixed(2) + "%";
                }
                if (!item.shareUser) {
                  item.sharePercent = "0.00%";
                } else if (item.shareUser) {
                  item.sharePercent =
                    ((item.shareUser / res.data.sharePercent) * 100).toFixed(
                      2
                    ) + "%";
                }
                if (!item.addToFavUser) {
                  item.addToFavPercent = "0.00%";
                } else if (item.addToFavUser) {
                  item.addToFavPercent =
                    (
                      (item.addToFavUser / res.data.addToFavPercent) *
                      100
                    ).toFixed(2) + "%";
                }
              });
            }
          } else {
            this.tableData = []
          }
          this.total = res.data.total
        }
      })
    },
    handleCurrentChange(e) {
      // 分页
      this.graphicDataInterface(this.timeDate[ 0 ], this.timeDate[ 1 ], e)
    },
    handleDetails(id, send, total) {
      // 详情
      console.log(id, send, total)
      this.$router.push({
        name: 'dataCenter-imageText-imageDetails',
        query: { id: id, send: send, total: total }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
._data {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;
  .data_sty {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>

