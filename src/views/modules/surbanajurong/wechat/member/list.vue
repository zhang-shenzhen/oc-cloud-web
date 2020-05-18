<template>
  <d2-container class="page">
    <div class="caozuo">
      <!-- <el-button size="mini" type="primary" @click="searchData()">{{$t('sj_member.btn')}}</el-button> -->
      <el-button size="mini" type="primary" @click="searchData()">{{$t('screen')}}</el-button>
      <el-button
        v-if="$Buttonpermissions('surbanajurong.wechat.member.list[exprot-member]')"
        size="mini"
        type="primary"
        @click="exportMember()"
      >{{$t('export')}}</el-button>
    </div>
    <el-table
      tooltip-effect="dark"
      :highlight-current-row="true"
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="num" :label="$t('sj_member.tab1')">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.headImgUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" :label="$t('sj_member.tab2')"></el-table-column>
      <el-table-column prop="sexStr" :label="$t('sj_member.tab3')"></el-table-column>
      <el-table-column prop="area" :label="$t('sj_member.tab4')"></el-table-column>
      <el-table-column prop="phoneNumber" :label="$t('sj_member.tab5')"></el-table-column>
      <el-table-column prop="tagList" :label="$t('sj_member.tab6')"></el-table-column>
      <el-table-column prop="subscribeTime" :label="$t('sj_member.tab7')"></el-table-column>

      <el-table-column fixed="right" :label="$t('sj_member.tab8')">
        <template slot-scope="scope">
          <el-button @click.native.prevent="look(scope.row)" type="text" size="small">{{$t('look')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-drawer
      :title="$t('screen')"
      :visible.sync="drawer"
      :direction="'rtl'"
      :before-close="handleClose"
    >
      <div class="sea-div" :style="{height:windowheight - 130 +'px'}">
        <el-form :model="ruleForm" ref="Form" label-position="left" label-width="120px">
          <el-form-item :label="$t('sj_member.tab2')">
            <el-input
              size="small"
              type="text"
              :placeholder="$t('pla1')"
              v-model="ruleForm.nickname"
            ></el-input>
          </el-form-item>

          <el-form-item :label="$t('sj_member.tab3')">
            <el-radio-group size="small" :placeholder="$t('pla2')" v-model="ruleForm.sex">
              <el-radio :label="1">{{$t('sj_member.lab4')}}</el-radio>
              <el-radio :label="2">{{$t('sj_member.lab5')}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('sj_member.tab9')">
            <el-radio-group size="small" :placeholder="$t('pla2')" v-model="ruleForm.subscribe">
              <el-radio :label="1">{{$t('sj_member.lab2')}}</el-radio>
              <el-radio :label="0">{{$t('sj_member.lab3')}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('sj_member.tab4')">
            <el-cascader
              size="small"
              style="width:100%;"
              filterable
              v-model="ruleForm.area"
              :options="cityList"
            ></el-cascader>
          </el-form-item>

          <el-form-item style="margin-top:10px">
            <el-button size="mini" type="primary" @click="ScreenData">{{$t('screen')}}</el-button>
            <el-button size="mini" @click="resetData">{{$t('reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </d2-container>
</template>
<script>
import { List, exportMember } from "@/api/surbanajurong/wechat/member";
import configUrl from "@/api/configUrl";
import cityList from "./Data";
export default {
  components: {},
  data() {
    return {
      tableData: [{ tilte: "111" }],
      currentPage: 1,
      total: 0,
      drawer: false,
      ruleForm: {
        nickname: null,
        sex: null,
        subscribe: null,
        area: null
      },
      windowheight: 0,
      addressValue: [],
      cityList: cityList
    };
  },
  computed: {},
  created() {
    this.getlist(1);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    init() {
      this.ruleForm = {
        nickname: null,
        sex: null,
        subscribe: null,
        area: null
      };
      this.getlist(1);
      this.windowheight = document.body.clientHeight;
    },
    getlist(page) {
      this.tableData = [];
      let data = {
        page: page,
        size: 10
      };

      let loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.6)"
      });
      if (!this.$isNull(this.ruleForm.nickname)) {
        data.nickname = this.ruleForm.nickname;
      }

      if (!this.$isNull(this.ruleForm.sex)) {
        data.sex = this.ruleForm.sex;
      }

      if (!this.$isNull(this.ruleForm.subscribe)) {
        data.subscribe = this.ruleForm.subscribe;
      }

      if (!this.$isNull(this.ruleForm.area)) {
        data.province = this.ruleForm.area[0];
        data.city = this.ruleForm.area[1];
      }

      List(data).then(res => {
        if (res.code == 0) {
          loading.close();
          if (res.data.data) {
            res.data.data.map((val, index) => {
              val.sexStr = val.sex == 1 ? "男" : val.sex == 2 ? "女" : "未知";
              val.area = val.country + val.province + val.city;
              val.subscribeTime = this.$formatDate(
                new Date(val.subscribeTime),
                "yyyy-MM-dd hh:mm:ss"
              );
              if (val.tagList) {
                let list = [];
                val.tagList.map(re => {
                  list.push(re.name);
                });
                val.tagList = list.join("、");
              }
              this.tableData.push(val);
            });
          }
          this.handleClose();
          this.currentPage = page;
          this.total = res.data.total;
        }
      });
    },
    look(item) {
      this.$router.push({
        name: "surbanajurong-wechat-member-member-detail",
        query: {
          unionid: item.unionid
        }
      });
    },
    handleCurrentChange(e) {
      this.getlist(e);
    },
    searchData() {
      this.drawer = true;
    },
    ScreenData() {
      console.log(this.ruleForm);
      this.getlist(1);
    },
    handleClose() {
      this.drawer = false;
    },
    resetData() {
      this.init();
      this.handleClose();
    },
    getCheckValue(e) {
      console.log(e);
      this.ruleForm.area = e;
    },
    handleSelectionChange() {},
    exportMember() {
      let url = configUrl.webUrl + "/api/surbanajurong/wechat/user/export";
      if (!this.$isNull(this.ruleForm.nickname)) {
        url += "?nickname=" + this.ruleForm.nickname;
      }

      if (!this.$isNull(this.ruleForm.sex)) {
        if (url.indexOf("?") > -1) {
          url += "&sex=" + this.ruleForm.sex;
        } else {
          url += "?sex=" + this.ruleForm.sex;
        }
      }

      if (!this.$isNull(this.ruleForm.subscribe)) {
        if (url.indexOf("?") > -1) {
          url += "&subscribe=" + this.ruleForm.subscribe;
        } else {
          url += "?subscribe=" + this.ruleForm.subscribe;
        }
      }
      window.open(url);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}
.sea-div {
  width: 90%;
  margin: 0 auto;
  // height: 300px;
  overflow-y: auto;
}
</style>

