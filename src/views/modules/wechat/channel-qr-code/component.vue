<template>
  <div>
    <!-- <h3 class="list-title">渠道二维码</h3> -->
    <el-row :gutter="20" style="margin-bottom:20px;">
      <el-col :span="24">
        <el-button
          style="float:left;"
          type="primary"
          size="small"
          @click="addcode"
          v-if="$Buttonpermissions('surbanajurong.wechat.qrcode.list[add]')"
        >{{$t('add')}}</el-button>
      </el-col>
    </el-row>

    <tableMobCopy
      ref="table_mob_one"
      :table-data="TemplateList"
      :table-config="tableConfig"
      @sendData="getTemplateData"
    />

    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage_t"
        layout="total, prev, pager, next, jumper"
        :total="total_t"
        @current-change="handleCurrentChange_t"
      />
    </div>
  </div>
</template>
<script>
import tableMobCopy from "@/components/GPMob/tableMobCopy";
import channelQrCodeTableConfig from "@/tableConfigs/wechat/channelQrCodeTableConfig";
import { QrcodeList, enabled } from "@/api/wechat/channelQrCode";
import {
  surbanajurong_QrcodeList,
  surbanajurong_enabled
} from "@/api/surbanajurong/wechat/channelQrCode";

export default {
  props: {
    projectName: {
      type: String,
      default: "product"
    }
  },
  name: "channelQrCode",
  components: { tableMobCopy },
  data() {
    return {
      API: {},
      tableConfig: null,
      TemplateList: [],
      currentPage_t: 1,
      total_t: 0,
      copyItem: null
    };
  },
  computed: {},
  created() {
    if (this.projectName == "product") {
      this.API = {
        QrcodeList: QrcodeList,
        enabled: enabled
      };
    } else if (this.projectName == "surbanajurong") {
      this.API = {
        QrcodeList: surbanajurong_QrcodeList,
        enabled: surbanajurong_enabled
      };
    }

    this.tableConfig = channelQrCodeTableConfig;

    this.tableConfig.operating.map(val => {
      val.show = false;
      //编辑
      if (val.name == "edit") {
        if (
          this.$Buttonpermissions("surbanajurong.wechat.qrcode.list[update]")
        ) {
          val.show = true;
        }
      }

      //上传
      if (val.name == "download") {
        val.show = true;
      }
      //统计
      if (val.name == "statistical") {
        if (
          this.$Buttonpermissions(
            "surbanajurong.wechat.qrcode.list[statistics]"
          )
        ) {
          val.show = true;
        }
      }
    });

    this.getTemplateList(1);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    addcode() {
      this.$router.push({
        name: "wechat-channelQrCode-addCode",
        query: {
          projectName: this.projectName
        }
      });
    },
    getTemplateList(page) {
      const sendData = {
        page: page,
        size: 10
      };
      this.API.QrcodeList(sendData).then(res => {
        this.TemplateList = [];
        if (res.code == 0) {
          this.total_t = res.data.total;
          this.currentPage_t = page;
          if (res.data.data) {
            res.data.data.map((val, index) => {
              if (page > 1) {
                val.number = page * 10 - 10 + (index + 1);
              } else {
                val.number = index + 1;
              }
              val.codeType = val.permanently ? "永久二维码" : "临时二维码";
              val.createTime = this.$formatDate(
                new Date(val.createTime),
                "yyyy-MM-dd hh:mm:ss"
              );
              val.expireTime = val.expireTime
                ? this.$formatDate(
                    new Date(val.expireTime),
                    "yyyy-MM-dd hh:mm:ss"
                  )
                : null;
            })
            this.TemplateList = res.data.data;
          }
        }
      });
    },
    handleCurrentChange_t(e) {
      this.getTemplateList(e);
    },
    getTemplateData(val) {
      //  console.log(val)
      this.copyItem = val.click_data;
      if (val.click_event.btn == "编辑") {
        this.$router.push({
          name: "wechat-channelQrCode-addCode",
          query: {
            id: this.copyItem.id,
            projectName: this.projectName
          }
        });
      }

      if (val.click_event.btn == "下载") {
        window.open(
          "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" +
            this.copyItem.ticket
        );
      }

      if (val.click_event.btn == "统计") {
        this.$router.push({
          name: "wechat-channelQrCode-statistical",
          query: {
            id: this.copyItem.id,
            projectName: this.projectName
          }
        });
      }

      if (val.click_event.btn == "状态") {
        const msg = this.copyItem.enabled
          ? "禁用二维码后二维码触发会失效,是否继续"
          : "启用二维码后二维码触发会生效,是否继续";
        this.$confirm(msg, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
          .then(() => {
            this.API.enabled({
              id: this.copyItem.id,
              enabled: !this.copyItem.enabled,
              triggerIds: this.copyItem.triggerIds
            }).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: "成功",
                  message: "操作成功",
                  type: "success"
                });

                this.TemplateList.map((val, index) => {
                  if (val.id == this.copyItem.id) {
                    this.$set(val, "enabled", !this.copyItem.enabled);
                  }
                });
              }
            });
          })
          .catch(() => {});
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>

