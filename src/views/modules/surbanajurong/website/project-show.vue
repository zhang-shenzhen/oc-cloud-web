<template>
  <d2-container class="page">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="num" :label="$t('website.project.tabel1')"></el-table-column>
      <el-table-column prop="name" :label="$t('website.project.tabel2')"></el-table-column>
      <!-- <el-table-column prop="title" :label="$t('website.project.tabel3')"></el-table-column> -->
      <el-table-column :label="$t('website.project.tabel4')">
        <template
          slot-scope="scope"
        >{{scope.row.type == 1 ? $t('website.project.tabel7') : $t('website.project.tabel8')}}</template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('website.project.tabel6')">
        <template slot-scope="scope">
          <el-button @click.native.prevent="look(scope.row)" type="text" size="small">{{$t('look')}}</el-button>
          <el-button
            v-if="$Buttonpermissions('surbanajurong.website.project-show[update]')"
            @click.native.prevent="update(scope.row)"
            type="text"
            size="small"
          >{{$t('update')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>
<script>
import { projectList } from "@/api/surbanajurong/website";
export default {
  name: "project-show",
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
    this.getProject();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    look(item) {
      this.$router.push({
        name: "surbanajurong-website-add-project",
        query: {
          id: item.id,
          type: "look"
        }
      });
    },
    update(item) {
      this.$router.push({
        name: "surbanajurong-website-add-project",
        query: {
          id: item.id
        }
      });
    },
    getProject() {
      projectList({}).then(res => {
        if (res.code == 0) {
          if (res.data) {
            res.data.map((val, index) => {
              val.num = index + 1;
              this.tableData.push(val);
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

