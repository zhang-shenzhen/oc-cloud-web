<template>
  <d2-container class="page">
    <h3 class="list-title">筛选会员列表</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="用户昵称" width="160">
        <template slot-scope="scope">
          <div class="memberHead">
            <img style="width:50px;height:50px;border-radius:50%;" :src="scope.row.headPortraitUrl" />
            <div class="memberNickName">{{ scope.row.nickName }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" width="120">
        <template slot-scope="scope">{{ scope.row.birthday }}</template>
      </el-table-column>
      <el-table-column label="手机号" width="130">
        <template slot-scope="scope">{{ scope.row.phoneNumber }}</template>
      </el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="scope">{{ scope.row.age }}</template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">{{ sexType[scope.row.sex] }}</template>
      </el-table-column>
      <el-table-column label="地区" width="180">
        <template
          slot-scope="scope"
        >{{ scope.row.countryName }}{{ scope.row.provinceName }}{{ scope.row.cityName }}{{ scope.row.districtName }}</template>
      </el-table-column>
      <el-table-column label="语言">
        <template slot-scope="scope">{{ scope.row.languageName }}</template>
      </el-table-column>
      <el-table-column label="会员卡号" width="180">
        <template slot-scope="scope">{{ scope.row.memberCardNumber }}</template>
      </el-table-column>
      <el-table-column label="是否为会员" width="100">
        <template slot-scope="scope">{{ memberType[scope.row.memberOrNot] }}</template>
      </el-table-column>
      <el-table-column label="会员积分">
        <template slot-scope="scope">{{ scope.row.memberPoints }}</template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column label="注册时间">
        <template slot-scope="scope">{{ scope.row.registerTime }}</template>
      </el-table-column>
      <el-table-column label="手机号归属地">
        <template slot-scope="scope">{{ scope.row.placeOfOwnership }}</template>
      </el-table-column>
      <el-table-column label="手机号归属地">
        <template slot-scope="scope">{{ scope.row.placeOfOwnership }}</template>
      </el-table-column>
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
  </d2-container>
</template>
<script>
import { AccountInfo } from '@/api/member/filter'
import memberobj from './Data'
export default {
  name: '',
  components: {},
  data () {
    return {
      pageShow: true,
      Filteroption: [],
      filterObj: {},
      conditions: [],
      tableData: [],
      // returnCount: true, // 点击分页查询的时候不传此参数(影响效率)
      currentPage: 1,
      total: null,
      sexType: {
        '0': '不明',
        '1': '男',
        '2': '女',
        '3': '不明',
      },
      automatic: 1,
      memberType: {
        '1': '是',
        '2': '否',
      }
    }
  },
  computed: {},
  created () {
    this.Filteroption = JSON.parse(JSON.stringify(memberobj))
    this.filterObj = JSON.parse(sessionStorage.getItem('filterObj'))
    this.automatic = this.$route.query.automatic; // ==3为静态
    let options = [];
    // 人数为统计中和0的时候不调取接口↓
    if (this.filterObj.memberCount == '统计中' || this.filterObj.memberCount == 0) { return; }
    if (this.automatic == 3) {
      options = [{
        mode: 2,
        name: "memberFilterIds",
        value: this.$route.query.id
      }]
      this.conditions = [{
        conditionEntries: options
      }]
      this.AccountInfoInterface(1);
    } else {
      this.init(this.filterObj)
    }

  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    init (option) {
      this.conditions = [];
      let arrayList = [];
      option.conditions.map(res => {
        res.entrys.map(item => {
          if (this.Filteroption.name.indexOf(item.name) != -1) {
            let index = this.Filteroption.name.indexOf(item.name);
            item.name = this.Filteroption.title[index];
          }
        })
        arrayList.push({
          conditionEntries: res.entrys
        })
      })
      this.currentPage = 1;
      this.conditions = arrayList;
      this.AccountInfoInterface(1);
    },
    // 会员查询列表接口
    AccountInfoInterface (e) {
      this.tableData = [];
      let option = {
        conditions: this.conditions,
        page: e,
        size: 10,
      }
      AccountInfo(option).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            res.data.data.map(item => {
              item.birthday = this.$formatDate(new Date(item.birthday), 'yyyy-MM-dd')
              item.registerTime = this.$formatDate(new Date(item.registerTime), 'yyyy-MM-dd')
            })
          }
          this.pageShow = true;
          this.tableData = res.data.data; // 参数
          this.total = this.filterObj.memberCount; // 页数
        }
        this.currentPage = res.data.page; // 页数
      })
    },
    handleCurrentChange (e) {
      this.AccountInfoInterface(e);
    }
  }
}
</script>
<style lang="scss" scoped>
.memberHead {
  width: 160px;
  display: flex;
  align-items: center;
}
.memberNickName {
  margin-left: 20px;
}
</style>

