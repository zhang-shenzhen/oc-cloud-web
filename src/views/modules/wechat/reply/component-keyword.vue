<template>
  <div>
    <div class="caozuo">
      <el-button
        type="primary"
        size="mini"
        v-if="$Buttonpermissions('surbanajurong.wechat.reply.keywords-reply[add]')"
        @click="defaultAdd(-99,1)"
      >{{ $t('wechat.reply.newReplies') }}</el-button>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" max-height="500" size="mini" align="center">
          <el-table-column :label="$t('wechat.menu.number')" fixed width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.reply.ruleName')">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('schedule.status')" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.enabled? $t('wechat.reply.enable'):$t('wechat.reply.prohibit') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.reply.keyword')">
            <template slot-scope="scope">
              <span v-for="(item,index) in scope.row.event.data" :key="index">
                {{ item.value }}
                ({{ item.mode==1 ? '全匹配':'半匹配' }})
                {{ index + 1 != scope.row.event.data.length ? '、': '' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.reply.numbeReplies')">
            <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.reply.ContentReply')">
            <template slot-scope="scope">
              <span>{{ typeList[scope.row.operation.operationItems[0].type] }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.reply.waysReply')">
            <template slot-scope="scope">
              <span>{{ scope.row.operation.mode == 1?'随机回复':'回复全部' }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('member.filter.operation')" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                v-if="$Buttonpermissions('surbanajurong.wechat.reply.keywords-reply[update]')"
                @click="defaultAdd(scope.row.id,2)"
              >{{ $t('edit') }}</el-button>
              <el-button
                size="mini"
                type="text"
                v-if="$Buttonpermissions('surbanajurong.wechat.reply.keywords-reply[update]')"
                @click="editReplyStaus(scope.row.enabled,scope.row.id)"
              >{{ scope.row.enabled ? $t('wechat.reply.prohibit'):$t('wechat.reply.enable') }}</el-button>
              <el-button
                size="mini"
                type="text"
                style="color:red;"
                v-if="$Buttonpermissions('surbanajurong.wechat.reply.keywords-reply[del]')"
                @click="handleDelete(scope.row.id)"
              >{{ $t('delete') }}</el-button>
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

    <!-- 弹框 -->
    <el-dialog :title="$t('prompt.title')" :visible.sync="dialogVisible" width="30%">
      <span>{{ $t('confirm') }} {{ $t('delete') }}?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure()">{{ $t('confirm') }}</el-button>
        <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  KeyWordReplyData,
  DelReply,
  EnablingMessage,
  DisableMessage
} from "@/api/wechat/reply";

import {
  surbanajurong_KeyWordReplyData,
  surbanajurong_deleteKeyWord,
  surbanajurong_enableKeyWord,
  surbanajurong_disableKeyWord
} from "@/api/surbanajurong/wechat/reply";

export default {
  props: {
    projectName: {
      type: String,
      default: "product"
    }
  },
  name: "KeywordReply",
  components: {},
  data() {
    return {
      API: {},
      currentPage: 1,
      total: 0,
      dialogVisible: false, // 弹框
      delId: "",
      tableData: [],
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
        KeyWordReplyData: KeyWordReplyData,
        DelReply: DelReply,
        EnablingMessage: EnablingMessage,
        DisableMessage: DisableMessage
      };
    } else if (this.projectName == "surbanajurong") {
      this.API = {
        KeyWordReplyData: surbanajurong_KeyWordReplyData,
        DelReply: surbanajurong_deleteKeyWord,
        EnablingMessage: surbanajurong_enableKeyWord,
        DisableMessage: surbanajurong_disableKeyWord
      };
    }
    this.keyWordReplyInterface(1);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    defaultAdd(id, title) {
      // 点击新建/编辑 路由传参
      this.$router.push({
        name: "wechat-reply-keywordEdit", // 路径
        query: { id: id, title: title, projectName: this.projectName } // 参数
      });
    },
    keyWordReplyInterface(e) {
      // 关键字回复接口
      const obj = {
        page: e,
        size: 10
      };
      this.API.KeyWordReplyData(obj).then(res => {
        if (res.code == 0) {
          console.log("关键字回复", res);
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    handleCurrentChange(e) {
      this.keyWordReplyInterface(e);
    },
    handleDelete(id) {
      // 删除
      this.delId = id;
      this.dialogVisible = true;
    },
    sure() {
      // 确认删除
      this.API.DelReply(this.delId).then(res => {
        if (res.code == 0) {
          this.keyWordReplyInterface(1);
          this.dialogVisible = false; // 弹框
          this.open();
        }
        console.log("删除", res);
      });
    },
    editReplyStaus(enabled, id) {
      // 禁用false/启用true
      console.log(enabled, id);
      if (enabled) {
        // 禁用DisableMessage
        this.disableMessage(id);
      } else {
        this.enablingMessage(id);
      }
    },
    disableMessage(id) {
      this.API.DisableMessage(id).then(res => {
        if (res.code == 0) {
          console.log("禁用", res);
          this.open();
          this.keyWordReplyInterface(1);
        }
      });
    },
    enablingMessage(id) {
      this.API.EnablingMessage(id).then(res => {
        if (res.code == 0) {
          console.log("启用", res);
          this.open();
          this.keyWordReplyInterface(1);
        }
      });
    },
    open() {
      // 通知弹框
      this.$notify({
        title: this.$t("schedule.statusLog1"),
        message: this.$t("prompt.success"),
        type: "success"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

