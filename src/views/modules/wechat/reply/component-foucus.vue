<template>
  <div>
    <!-- <h3 class="list-title">{{ $t('wechat.reply.newReplies') }}</h3> -->
    <div class="caozuo">
      <el-button
        type="primary"
        size="mini"
        v-if="$Buttonpermissions('surbanajurong.wechat.reply.foucus-reply[add]')"
        @click="newsFoucus(2)"
      >{{ $t('wechat.reply.newReplies') }}</el-button>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" fixed size="mini" max-height="500">
          <el-table-column :label="$t('wechat.menu.number')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.reply.responseDescription')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('schedule.status')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.enabled? $t('wechat.reply.enable'):$t('wechat.reply.prohibit') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('oss.type')">
            <template slot-scope="scope">
              <span
                style="margin-left: 10px"
              >{{ typeList[scope.row.operation.operationItems[0].type] }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('oss.createDate')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('schedule.remark')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('member.filter.operation')" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                 v-if="$Buttonpermissions('surbanajurong.wechat.reply.foucus-reply[update]')"
                @click="handleEdit(scope.row.id,2)"
              >{{ $t('member.filter.edit') }}</el-button>
              <el-button
                size="mini"
                type="text"
                 v-if="$Buttonpermissions('surbanajurong.wechat.reply.foucus-reply[update]')"
                @click="handleEnabled(scope.row.enabled,scope.row.id)"
              >{{ scope.row.enabled ? $t('wechat.reply.prohibit'):$t('wechat.reply.enable') }}</el-button>
              <el-button
                size="mini"
                type="text"
                style="color:#F56C6C"
                v-if="$Buttonpermissions('surbanajurong.wechat.reply.foucus-reply[del]')"
                @click="handleDelete(scope.row.id)"
              >{{ $t('member.filter.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 页数 -->
    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :title="$t('prompt.title')" :visible.sync="dialogVisible" width="30%">
      <span>{{ $t('confirm') }} {{ $t('delete') }}?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="sure()">{{ $t('confirm') }}</el-button>
        <el-button size="mini" @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  FocusReplyData,
  DelReply,
  EnablingMessage,
  DisableMessage
} from "@/api/wechat/reply";

import {
  surbanajurong_FocusReplyData,
  surbanajurong_DelReply,
  surbanajurong_disableFocus,
  surbanajurong_enableDFocus,
  surbanajurong_deleteFocus
} from "@/api/surbanajurong/wechat/reply";

export default {
  props: {
    projectName: {
      type: String,
      default: "product"
    }
  },
  name: "FoucusReply",
  components: {},
  data() {
    return {
      API: {},
      currentPage: 1,
      total: 0,
      tableData: [],
      delId: "",
      handleId: "",
      dialogVisible: false,
      typeList: [
        "",
        "文本",
        "图片",
        "视频",
        "语音",
        "外链图文",
        "图文",
        "音乐",
        "卡券",
        "小程序",
        "标签"
      ]
    };
  },
  computed: {},
  created() {
    if (this.projectName == "product") {
      this.API = {
        FocusReplyData:FocusReplyData,
        DelReply:DelReply,
        EnablingMessage:EnablingMessage,
        DisableMessage:DisableMessage
      };
    } else if (this.projectName == "surbanajurong") {
      this.API = {
        FocusReplyData:surbanajurong_FocusReplyData,
        DelReply:surbanajurong_deleteFocus,
        EnablingMessage:surbanajurong_enableDFocus,
        DisableMessage:surbanajurong_disableFocus
      };
    }
    this.focusIn(1);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    newsFoucus(id) {
      this.$router.push({
        name: "wechat-reply-default",
        query: { id: id ,projectName:this.projectName}
      });
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    format(shijianchuo) {
      // shijianchuo是整数，否则要parseInt转换
      const time = new Date(shijianchuo);
      const y = time.getFullYear();
      const m = time.getMonth() + 1;
      const d = time.getDate();
      return y + "-" + this.add0(m) + "-" + this.add0(d);
    },

    focusIn(e) {
      const obj = {
        page: e,
        size: 10
      };
      this.API.FocusReplyData(obj).then(res => {
        console.log("关注后回复列表参数", res);
        if (res.code == 0) {
          res.data.data.map(res => {
            res.createTime = this.format(res.createTime);
          });
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    handleCurrentChange(e) {
      this.focusIn(e);
    },
    handleEdit(id, title) {
      // 编辑
      this.$router.push({
        name: "wechat-reply-defaultEdit",
        query: { id: id, title: title,projectName:this.projectName}
      });
    },
     handleEnabled(enabled, id) {
      // 启用or禁用
      console.log(enabled, id);
      if (enabled) {
        // 为 true 的时候说明现在的状态是 启用 ,这时候要调取 禁用 接口
        this.enablingDisable_1(id);
      } else {
        this.enablingDisable(id);
      }
    },
    enablingDisable(id) {
      this.API.EnablingMessage(id).then(res => {
        if (res.code === 0) {
          console.log("启用or禁用", res);
          this.open("成功", "操作成功", "success");
          this.focusIn(1);
        }
      });
    },
    enablingDisable_1(id) {
      this.API.DisableMessage(id).then(res => {
        if (res.code === 0) {
          console.log("启用or禁用", res);
          this.open("成功", "操作成功", "success");
          this.focusIn(1);
        }
      });
    },
    handleDelete(id) {
      // 删除
      this.delId = id;
      console.log(id);
      this.dialogVisible = true; // 弹框
    },
    sure() {
      // 点击删除弹框按钮
      this.API.DelReply(this.delId).then(res => {
        if (res.code == 0) {
          this.focusIn(1);
          this.dialogVisible = false; // 弹框
          this.open("成功", "删除成功", "success");
        }
        console.log("删除", res);
      });
    },
    open(title, message, type) {
      // 通知弹框
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.page {
  .el-table .cell .v-name:hover {
    background: #888 !important;
  }
}
</style>
