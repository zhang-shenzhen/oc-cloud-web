<template>
  <d2-container class="page">
    <h3 class="list-title">自定义事件</h3>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin:20px 0px;">
  <!-- <el-form-item label="分组">
    <el-select v-model="formInline.region" placeholder="活动区域" size="mini">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item> -->
  <el-form-item label=" ">
    <el-input v-model="formInline.user" placeholder="搜索自动化营销" size="mini"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary"  size="mini" @click="search">查询</el-button>
  </el-form-item>
</el-form>
 <!-- <el-button type="primary" @click="onSubmit" size="mini" style="margin:20px 0;">新建自定义事件</el-button> -->
 <!-- 表格 -->
 <div style="padding-bottom:20px;">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{
    'background-color': 'rgba(242, 242, 242, 1)',
}"
      >
       <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->
        <el-table-column prop="name" label="名称" ></el-table-column>
        <el-table-column prop="id" label="事件ID"></el-table-column>
        <el-table-column prop="updateTime" label="时间"></el-table-column>
        <!-- <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
            <el-pagination
              background
              :current-page="currentPage"
              layout="total, prev, pager, next, jumper"
              :total="total"
              @current-change="handleCurrentChange"
            />
      </div>
      <!-- <div>
          <el-dialog
  title="自定义事件"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose" center>
  <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
  <el-form-item label="事件名称">
    <el-input v-model="sizeForm.name"></el-input>
  </el-form-item>
  <el-form-item label="事件ID">
    <el-input v-model="sizeForm.ID"></el-input>
  </el-form-item>
  </el-form>

  <span>
    <el-button @click="remove" size="mini">取 消</el-button>
    <el-button type="primary" @click="deterMine" size="mini">确 定</el-button>
  </span>
</el-dialog>

      </div> -->
    </div>
  </d2-container>
</template>
<script>
import {intelligentlist,addintelligentlist} from "@/api/automation/automation"
export default {
  name: "",
  data() {
    return {
      formInline: {
        user: '',
          region: ''
      },
      sizeForm:{
          name:'',
          ID:null,
      },
      multipleSelection: [],
      tableData:[],
      total:0,
      currentPage:1,
      dialogVisible:false,
    };
  },
  methods:{
      handleClose(done){
          this.sizeForm.name=null;
           this.sizeForm.ID=null;
          done()
      },
      onSubmit() {
       this.dialogVisible=true
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(val){
           this.getData(val,this.formInline.user)

      },
      //获取列表数据
      getData(page,name){
          let  url=''
          if(name==""){
               url ='?page=' + page + '&size=10'

          }else{
              url = '?page=' + page + '&size=10&name='+name
          }
        //   const url = '?page=' + page + '&size=10&name='+name
          intelligentlist(url).then(res=>{
              console.log(res)
              if(res.code==0){
                  if(res.data.data!=null){
                      this.tableData=res.data.data
                      this.tableData.forEach(res=>{
                          res.updateTime=this.timestampToTime(res.updateTime)
                      })
                      this.page=res.data.page
                      this.total=res.data.total
                  }else{
                      this.tableData=[];
                      this.page=1;
                       this.total=0



                  }
                
              }
             
          })

      },
      //查询
      search(){
          this.getData(1,this.formInline.user)
      },
      //弹窗确定
      deterMine(){
          addintelligentlist().then(res=>{

          })
           this.sizeForm.name=null;
           this.sizeForm.ID=null;
           this.dialogVisible=false;

      },
      //弹窗取消
      remove(){
          
          this.sizeForm.name=null;
           this.sizeForm.ID=null;
           this.dialogVisible=false;

      },
      timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      console.log(2, Y);
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
  created(){
      this.getData(1,"")
  }
};
</script>
<style lang="scss" scoped>
</style>