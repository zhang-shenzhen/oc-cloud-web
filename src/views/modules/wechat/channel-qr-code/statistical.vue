<template>
  <d2-container class="page">
    <h3 class="list-title">渠道二维码统计</h3>
    <el-row :gutter="20" style="margin-bottom:20px;">
      <el-col :span="24">
        <el-date-picker
          v-model="dataTime"
          style="float:right;"
          type="daterange"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @blur="timeblur"
        />
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="refDate" label="日期" />
      <el-table-column prop="scanCount" label="扫描次数" />
      <el-table-column prop="subscribeCount" label="关注次数" />
    </el-table>
  </d2-container>
</template>
<script>
import { Statistics } from "@/api/wechat/channelQrCode";
import { surbanajurong_Statistics } from "@/api/surbanajurong/wechat/channelQrCode";

export default {
  name: "WechatChannelQrCodeStatistical",
  components: {},
  data() {
    return {
      API:{},
      tableData: [],
      dataTime: null
    };
  },
  computed: {},
  created() {
    if (this.$route.query.projectName == "product") {
      this.API = {
        Statistics:Statistics
      };
    } else if (this.$route.query.projectName == "surbanajurong") {
      this.API = {
        Statistics:surbanajurong_Statistics
      };
    }
    this.getData();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getData() {
      const data = {
        qrCodeId: this.$route.query.id
      };
      if (!this.$isNull(this.dataTime)) {
        data.beginTime = this.$formatDate(
          new Date(this.dataTime[0]),
          "yyyy-MM-dd"
        );
        data.endTime = this.$formatDate(
          new Date(this.dataTime[1]),
          "yyyy-MM-dd"
        );
      }
      this.tableData = [];
      this.API.Statistics(data).then(res => {
        if (res.code == 0) {
          this.tableData = res.data;
        }
      });
    },
    timeblur() {
      this.getData();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

