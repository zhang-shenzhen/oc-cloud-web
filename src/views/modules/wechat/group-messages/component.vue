<template>
  <div>
    <!-- <h3 class="list-title">{{ $t('wechat.groupMessages.groupMessage') }}</h3> -->
    <div class="caozuo">
      <el-button type="primary"
                 size="mini"
                 @click="newsMessage()">{{ $t('wechat.groupMessages.newsGroupMessage') }}</el-button>
    </div>
    <el-row>
      <div class="search-sty">
        <div style="margin-right:10px;display:flex;">
          <div class="label">{{ $t('wechat.groupMessages.messageType') }}:</div>
          <el-select v-model="searchInfo.msgType"
                     clearable
                     size="mini"
                     :placeholder="$t('oss.qcloudRegionTips')">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
        </div>
        <div style="display:flex">
          <div class="label">{{ $t('logLogin.status') }}:</div>
          <el-select v-model="searchInfo.sendStatus"
                     clearable
                     size="mini"
                     :placeholder="$t('oss.qcloudRegionTips')">
            <el-option v-for="item in status"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="search-sty1">
        <div style="width:60px;"
             class="label">{{ $t('mail.createDate') }}:</div>
        <el-date-picker v-model="times"
                        size="mini"
                        type="daterange"
                        :range-separator="$t('datePicker.range')"
                        value-format="yyyy-MM-dd"
                        :start-placeholder="$t('datePicker.start')"
                        :end-placeholder="$t('datePicker.end')" />
        <el-button type="primary"
                   size="mini"
                   style="margin-left:10px;"
                   @click="confirmDate()">{{ $t('query') }}</el-button>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData"
                  fixed
                  size="mini"
                  style="width: 100%"
                  max-height="500">
          <el-table-column :label="$t('wechat.groupMessages.serialNumber')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.groupMessages.messageType')">
            <template slot-scope="scope">
              <span v-if="scope.row.msgType == 'text'"
                    style="margin-left: 10px">文字</span>
              <span v-if="scope.row.msgType == 'image'"
                    style="margin-left: 10px">图片</span>
              <span v-if="scope.row.msgType == 'mpnews'"
                    style="margin-left: 10px">图文</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('news.content')">
            <template slot-scope="scope">
              <span v-if="scope.row.msgType == 'text'"
                    style="margin-left: 10px">{{ scope.row.msgInfo }}</span>
              <span v-if="scope.row.msgType == 'image'"
                    style="margin-left: 10px">
                <img style="width:100px;"
                     :src="$fileUrl() + scope.row.msgInfo" />
              </span>
              <span v-if="scope.row.msgType == 'mpnews'"
                    style="margin-left: 10px">
                <img style="width:100px;"
                     :src="$fileUrl() + scope.row.msgThumbInfo.localThumbUrl" />
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('mail.createDate')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sendTimeString }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('schedule.status')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sendStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('member.filter.operation')"
                           fixed="right">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="text"
                         @click="editMessage(scope.row.id)">{{$t('update')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>
  </div>
</template>
<script>
import { GroupMessage } from "@/api/wechat/groupMessage";
import { surbanajurong_GroupMessage } from "@/api/surbanajurong/wechat/material";
import { mapState } from "vuex";
export default {
  props: {
    projectName: {
      type: String,
      default: "product"
    }
  },
  name: "GroupPage",
  components: {},
  data () {
    return {
      API: {},
      tableData: [],
      currentPage: 1,
      total: 0,
      // 图文 图片↓
      options: [
        {
          value: "text",
          label: this.$t("wechat.groupMessages.text")
        },
        {
          value: "image",
          label: this.$t("process.diagramResourceName")
        },
        {
          value: "mpnews",
          label: this.$t("wechat.groupMessages.mpnews")
        }
      ],
      // 已发送 未发送↓
      status: [
        {
          value: this.$t("wechat.groupMessages.unsent"),
          label: this.$t("wechat.groupMessages.unsent")
        },
        {
          value: this.$t("wechat.groupMessages.sent"),
          label: this.$t("wechat.groupMessages.sent")
        },
        {
          value: this.$t("wechat.groupMessages.sendSuccessfully"),
          label: this.$t("wechat.groupMessages.sendSuccessfully")
        },
        {
          value: this.$t("wechat.groupMessages.failureNotice"),
          label: this.$t("wechat.groupMessages.failureNotice")
        },
        {
          value: this.$t("wechat.groupMessages.editOut"),
          label: this.$t("wechat.groupMessages.editOut")
        }
      ],
      searchInfo: {
        msgType: "",
        sendStatus: "",
        sendTimeBefore: "" /** 开始时间 */,
        sendTimeAfter: ""
      },
      times: []
    };
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    if (this.projectName == "product") {
      this.API = {
        GroupMessage: GroupMessage
      };
    } else if (this.projectName == "surbanajurong") {
      this.API = {
        GroupMessage: surbanajurong_GroupMessage
      };
    }
    this.groupMessageInterface(1);
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    newsMessage () {
      this.$router.push({
        name: "wechat-add-group-message",
        query: {
          projectName: this.projectName
        }
      });
    },
    editMessage (list) {
      this.$router.push({
        name: "wechat-edit-group-message",
        query: { id: list, projectName: this.projectName }
      });
    },
    confirmDate () {
      // 查询按钮
      if (this.times) {
        this.searchInfo.sendTimeBefore = this.times[0] ? this.times[0] : "";
        this.searchInfo.sendTimeAfter = this.times[1]
          ? this.times[1] + " " + "23:59:59"
          : "";
      } else {
        this.searchInfo.sendTimeBefore = ''
        this.searchInfo.sendTimeAfter = ''
      }
      console.log(this.searchInfo, this.times, this.info);
      this.groupMessageInterface(1);
    },
    groupMessageInterface (num) {
      console.log(this.info.ChannelId);
      const obj = {
        page: num,
        pageSize: 10,
        wechatId: this.info.ChannelId
      };
      if (!this.$isNull(this.searchInfo.msgType)) {
        obj.msgType = this.searchInfo.msgType;
      }

      if (!this.$isNull(this.searchInfo.sendStatus)) {
        obj.sendStatus = this.searchInfo.sendStatus;
      }

      if (!this.$isNull(this.searchInfo.sendTimeBefore)) {
        obj.sendTimeBefore = this.searchInfo.sendTimeBefore;
      }

      if (!this.$isNull(this.searchInfo.sendTimeAfter)) {
        obj.sendTimeAfter = this.searchInfo.sendTimeAfter;
      }
      console.log(obj);
      this.API.GroupMessage(obj).then(res => {
        if (res.code == 0) {
          console.log("群发消息列表参数", res);
          this.tableData = res.data.data;
          this.currentPage = res.data.page;
          this.total = res.data.total;
        }
      });
    },
    handleCurrentChange (e) {
      this.groupMessageInterface(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-row,
.el-col {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.search-sty {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}
.search-sty1 {
  width: 100%;
  display: flex;
}
.label {
  line-height: 30px;
  // float: left;
  margin-right: 10px;
}
</style>
