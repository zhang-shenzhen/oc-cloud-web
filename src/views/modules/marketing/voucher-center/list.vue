<template>
  <d2-container class="page">
    <h3 class="list-title">领券中心</h3>
    <el-form :model="ruleForm"
             label-position="left"
             size="mini"
             ref="ruleForm"
             label-width="120px"
             class="demo-ruleForm">
      <el-form-item label="商户图片">
        <el-alert size="mini"
                  style="width:30%;margin-bottom:10px;"
                  title="请上传宽750px高180px图片"
                  type="info"
                  :closable="false">
        </el-alert>
        <el-col :span="10">
          <div class="img_show"
               v-if="ruleForm.imgUrl">
            <div class="img_show_del"
                 @click="delImg()">
              <i class="el-icon-delete"></i>
            </div>
            <img style="width:100%;height:100%;"
                 :src="$fileUrl() + ruleForm.imgUrl" />
          </div>
          <div v-if="!ruleForm.imgUrl">
            <div class="upload_img"
                 @click="clickuloadImg()">
              <i class="el-icon-plus logoIcon" />
            </div>
          </div>
        </el-col>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="primary"
                 size="mini"
                 @click="handleEdit(-10)">添加</el-button>
    </el-row>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column label="活动展示图">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动时间">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="关联卡券">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="排序">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="链接">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="text"
                     style="color:#F56C6C"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>
    <editorImage ref="muchild"
                 urltype="default"
                 type="default-1"
                 @successCBK="imageSuccessCBK" />
  </d2-container>
</template>
<script>
import editorImage from '@/components/Tinymce/components/editorImage'
export default {
  components: { editorImage },
  data () {
    return {
      ruleForm: {
        imgUrl: '',
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage: 1,
      total: 0,
    }
  },
  computed: {},
  created () {

  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    handleEdit (id) {
      this.$router.push({
        name: 'marketing-voucher-center-add-center', // 路径
        query: { id: id } // 参数
      })
    },
    clickuloadImg () {
      this.$refs.muchild.showModel(); // 显示上传图片弹框
    },
    imageSuccessCBK (e) {
      // 点击上传图片
      this.ruleForm.imgUrl = e[0].url[0].url;
      console.log(e, this.ruleForm, '图片=====')
    },
    delImg () {
      // 点击删除图片
      this.ruleForm.imgUrl = '';
    },
    handleDelete (index, row) {
      console.log(index, row);
      this.$confirm("确定删除此条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // GoodsDel({
          //   id: row.id
          // }).then(res => {
          //   if (res.code == 0) {
          //     this.$notify({
          //       title: this.$t("schedule.statusLog1"),
          //       message: this.$t("commodity.sort.delete"),
          //       type: "success"
          //     });
          //     this.itemListInterface(1);
          //   } else {
          //     this.$notify({
          //       title: this.$t("member.filter.warning"),
          //       message: res.message,
          //       type: "warning"
          //     });
          //   }
          // });
        })
        .catch(() => { });
    },
    handleCurrentChange (e) {
      // 点击分页
      // this.itemListInterface(e);
    },
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  .img_show {
    width: 150px;
    height: 100px;
    display: flex;
    margin-right: 10px;
    .img_show_del {
      width: 150px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      position: absolute;
      z-index: 9;
      display: none;
    }
  }
  .img_show:hover .img_show_del {
    background-color: rgba(0, 0, 0, 0.3);
    display: block;
    color: #f56c6c;
    cursor: pointer;
  }
  .upload_img {
    width: 100px;
    height: 100px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    .logoIcon {
      font-size: 40px;
      color: #dddddd;
      margin: 30px;
    }
  }
}
</style>

