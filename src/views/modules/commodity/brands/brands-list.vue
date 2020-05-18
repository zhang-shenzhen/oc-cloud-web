<template>
  <d2-container class="page">
    <h3 class="list-title">品牌分类</h3>
    <el-row>
      <el-col :span="6"
              :xs="24">
        <span>分类名称:</span>
        <el-input class="box_form"
                  v-model="ruleForm.categoryName"
                  size="mini"
                  clearable
                  placeholder="商品名称"></el-input>
      </el-col>
      <el-col :span="6"
              :xs="24">
        <el-button type="primary"
                   size="mini"
                   @click="submitForm()">{{$t('query')}}</el-button>
      </el-col>
    </el-row>
    <div class="caozuo"
         style="margin:10px 0;">
      <el-button type="primary"
                 size="mini"
                 @click="clickClassify('-9','1','0','3')">{{$t('commodity.sort.addclass')}}</el-button>
    </div>
    <el-table :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              max-height="500"
              :tree-props="{children: 'productCategoryList', hasChildren: 'hasChildren'}">
      <el-table-column prop="categoryName"
                       :label="$t('commodity.sort.systematic')">
      </el-table-column>
      <el-table-column :label="$t('menu.sort')">
        <template slot-scope="scope">
          <p v-if="scope.row.son == 2 || scope.row.son == 3">{{scope.row.sort}}</p>
        </template>
      </el-table-column>
      <el-table-column label="分类ID">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('model.createTime')">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('handle')">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="clickEdit(scope.row)">{{$t('edit')}}</el-button>
          <el-button size="mini"
                     type="text"
                     style="color:#F56C6C"
                     @click="clickDel(scope.row)">{{$t('delete')}}</el-button>
          <el-button v-if="scope.row.son == 1"
                     size="mini"
                     type="text"
                     @click="clickSub(scope.row,'2')">{{$t('commodity.sort.additive')}}</el-button>
          <el-button v-if="scope.row.son == 2"
                     size="mini"
                     type="text"
                     @click="clickSub(scope.row,'3')">{{$t('commodity.sort.additive1')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <!-- <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="size"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" /> -->
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="size"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
  </d2-container>
</template>
<script>
import { ItemCategoryList, Del } from '@/api/commodity/goods'
export default {
  components: {},
  data () {
    return {
      // 父项里面添加一个son=true
      tableData: [],
      currentPage: 1, // 第几页
      total: 0, // 总条数
      size: 10, // 每页条数
      num: 0,
      ruleForm: {
        categoryName: ''
      }
    }
  },
  computed: {},
  created () {
    // 商品分类列表接口
    this.itemCategoryListInterface(this.currentPage);
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    clickClassify (id, e, level, cut) {
      this.$router.push({
        name: 'commodity-sort-sort-add', // 路径
        query: {
          id: id, // id <0 新增 >= 0 编辑
          type: e, // 谁显示谁屏蔽(看组件说明)
          level: level, // 层级
          cut: cut
        } // 参数
      })
    },
    // 点击编辑
    clickEdit (e) {
      /***
       * son= 0为编辑一级分类
       * son= 1为编辑二级分类
       * son= 2为编辑三级分类
       */
      let level;
      let type;
      let cut;
      if (e.son == 1) {
        level = 0;
        type = 1;
        cut = 3;
      } else if (e.son == 2) {
        level = e.parentId;
        type = 2;
        cut = 3;
      } else if (e.son == 3) {
        level = e.parentId;
        type = 3;
        cut = 3;
      }
      this.$router.push({
        name: 'commodity-sort-sort-add', // 路径
        query: {
          id: e.id,
          type: type,
          level: level,
          cut: cut
        }
      })
    },
    clickSub (e, type) {
      // 点击添加子分项
      this.$router.push({
        name: 'commodity-sort-sort-add', // 路径
        query: {
          id: -9,
          type: type,
          level: e.id,
          cut: 3,
        }
      })
    },
    /**
     * 注释：↓
     * son=treu的时候为父项
     */
    clickDel (e) {
      this.$confirm("确定删除此条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Del({
            check: 1,
            id: e.id,
            type: 3,
          }).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: this.$t('schedule.statusLog1'),
                message: this.$t('commodity.sort.delete'),
                type: "success"
              });
              this.itemCategoryListInterface(1)
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
    },
    handleSizeChange (e) {
      console.log(e, '点击每页页数')
      this.size = e;
      this.itemCategoryListInterface(1);
    },
    handleCurrentChange (e) {
      // 点击分页
      this.itemCategoryListInterface(e);
    },
    submitForm () {
      // 点击查询分类名称
      console.log('你点击了')
      this.itemCategoryListInterface(1)
    },
    itemCategoryListInterface (page) {
      // 商品分类列表接口
      ItemCategoryList({
        parentId: 0,
        type: 3,
        page: page,
        size: this.size,
        categoryName: this.ruleForm.categoryName
      }).then(res => {
        if (res.code == 0) {
          let data = res.data;
          console.log(data.data,'data===data')
          if (data.data) {
            this.echoList(data.data, 0)
          } else {
            this.tableData = [];
          }
          this.currentPage = res.data.page;
          this.total = res.data.total;
        } else {
          this.total = 0;
          this.currentPage = 1;
          this.tableData = [];
        }
      })
    },

    echoList (data, num) {
      if (!data) { return }
      var num = num + 1;
      data.forEach(item => {
        item.son = num;
        item.createTime = this.processTime(item.createTime);
        if (item.productCategoryList && item.productCategoryList.length > 0) {
          this.echoList(item.productCategoryList, num)
        } else {
          delete item.productCategoryList
        }
      });
      this.tableData = data;
    },

    // 处理时间
    processTime (time) {
      return time = this.$formatDate(
        new Date(time),
        "yyyy-MM-dd hh:mm:ss"
      );
    }

  }
}
</script>
<style lang="scss" scoped>
.box_form {
  margin-left: 10px;
  width: 200px;
}
</style>

