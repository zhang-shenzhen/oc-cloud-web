<template>
  <d2-container class="page">
    <div class="caozuo">
      <el-button  v-if="$Buttonpermissions('surbanajurong.website.company-logo[add]')" type="primary" size="mini" @click="addTracking">{{$t('add')}}</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="num" :label="$t('website.logo.tabel1')"></el-table-column>
      <el-table-column prop="name" :label="$t('website.logo.tabel2')"></el-table-column>
      <el-table-column :label="$t('website.logo.tabel3')">
        <template slot-scope="scope">
          <img style="width:50px;height:50px;" :src="$fileUrl() + scope.row.logo" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('website.logo.tabel4')">
        <template
          slot-scope="scope"
        >{{$formatDate(new Date(scope.row.updateTime), "yyyy-MM-dd hh:mm:ss")}}</template>
      </el-table-column>

      <el-table-column fixed="right" :label="$t('website.logo.tabel5')">
        <template slot-scope="scope">
          <el-button @click.native.prevent="look(scope.row)" type="text" size="small">{{$t('look')}}</el-button>
          <el-button
           v-if="$Buttonpermissions('surbanajurong.website.company-logo[update]')" 
            @click.native.prevent="update(scope.row)"
            type="text"
            size="small"
          >{{$t('update')}}</el-button>
          <el-button
            v-if="$Buttonpermissions('surbanajurong.website.company-logo[del]')" 
            @click.native.prevent="del(scope.row)"
            type="text"
            size="small"
            style="color:#f56c6c;"
          >{{$t('delete')}}</el-button>
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
  </d2-container>
</template>
<script>
import { companyLogoList, companyLogoDel } from "@/api/surbanajurong/website";
export default {
  name: "company-logo",
  components: {},
  data() {
    return {
      currentPage: 1,
      total: 0,
      tableData: []
    };
  },
  computed: {},
  created() {
    this.projectList(1);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    addTracking() {
      this.$router.push({
        name: "surbanajurong-website-add-company-logo"
      });
    },
    projectList(page) {
      this.tableData = [];
      companyLogoList({
        page: page,
        size: 10
      }).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            res.data.data.map((val, index) => {
              val.num = index + 1;
              this.tableData.push(val);
            });
          }
          this.currentPage = page;
          this.total = res.data.total;
        }
      });
    },
    look(item) {
      this.$router.push({
        name: "surbanajurong-website-add-company-logo",
        query: {
          id: item.id,
          type: "look"
        }
      });
    },
    update(item) {
      this.$router.push({
        name: "surbanajurong-website-add-company-logo",
        query: {
          id: item.id,
          type: "update"
        }
      });
    },
    del(item) {
      this.$confirm(this.$t("op_Click"), this.$t("reminder"), {
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        type: "warning"
      }).then(() => {
        companyLogoDel({ id: item.id }).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: this.$t("success"),
              message: this.$t("op_success"),
              type: "success"
            });
            this.projectList(1);
          }
        });
      });
    },
    handleCurrentChange(e) {
      this.projectList(e);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

