<template>
  <div>
    <el-row>
      <el-button type="primary"
                 size="mini"
                 @click="handleEdit(-10)">{{btnName}}</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column :label="titleName">
          <template slot-scope="scope">{{ scope.row.imgName }}</template>
        </el-table-column>
        <el-table-column :label="$t('menu.sort')">
          <template slot-scope="scope">{{ scope.row.sortNum }}</template>
        </el-table-column>
        <el-table-column :label="$t('skip')">
          <template slot-scope="scope">{{ scope.row.url }}</template>
        </el-table-column>
        <el-table-column :label="$t('member.filter.startTime')">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column :label="$t('handle')">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleEdit(scope.row.id)">{{$t('edit')}}</el-button>
            <el-button size="mini"
                       type="text"
                       style="color:#F56C6C"
                       @click="handleDelete(scope.$index, scope.row)">{{$t('delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

  </div>
</template>
<script>
import { MallHomeList, DeleteList } from '@/api/homePage/homeInt'
export default {
  components: {},
  props: {
    imgType: {
      default: 0,
    }
  },
  data () {
    return {
      titleName: this.$t('menu.name'),
      btnName: this.$t('member.filter.edit'),
      url: '',
      tableData: []
    }
  },
  computed: {},
  created () {
    if (this.imgType == 1) {
      this.titleName = this.$t('home.banner.name');
      this.btnName = this.$t('home.banner.addBanner');
      this.url = 'home-page-banner-edit-banner';
    }
    if (this.imgType == 3) {
      this.titleName = '热门分类名称';
      this.btnName = '添加热门分类';
      this.url = 'home-page-adsense-edit';
    }
    if (this.imgType == 2) {
      this.titleName = this.$t('home.vip.name');
      this.btnName = this.$t('home.vip.addExclusive');
      this.url = 'home-page-new-people-edit-vip';
    }
    if (this.imgType == 4) {
      this.titleName = '品牌名称';
      this.btnName = '新增热门品牌';
      this.url = 'home-page-hot-brands-brands-edit';
    }
    if (this.imgType == 5) {
      this.titleName = '名称';
      this.btnName = '新增种草社区';
      this.url = 'home-page-hot-brands-brands-edit';
    }
    if (this.imgType != 0) {
      this.homeListInterface(this.imgType);
    }
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    // 首页列表接口
    homeListInterface (imgType) {
      MallHomeList({
        imgType: imgType
      }).then(res => {
        if (res.code == 0) {
          res.data.map(item => {
            item.createTime = this.$formatDate(new Date(item.createTime), 'yyyy-MM-dd hh:mm:ss')
          })
          this.tableData = res.data;
        }
      }).catch(() => { })
    },
    handleEdit (id) {
      // 点击添加/编辑首页轮播图
      this.$router.push({
        name: this.url, // 路径
        query: { id: id, type: this.imgType } // 参数
      })
    },
    handleDelete (index, row) {
      // 点击删除
      this.$confirm("确定删除此条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log(index, row, row.id);
        DeleteList({
          id: row.id,
        }).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: this.$t('schedule.statusLog1'),
              message: this.$t('commodity.sort.delete'),
              type: "success"
            });
            this.homeListInterface(this.imgType);
          } else {
            this.$notify({
              title: this.$t('member.filter.warning'),
              message: res.message,
              type: 'warning'
            });
          }
        });
      })
        .catch(() => { });
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

