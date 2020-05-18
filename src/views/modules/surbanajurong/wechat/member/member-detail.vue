<template>
  <d2-container class="page">
    <div class="contant">
      <div class="left">
        <div class="info-div1">
          <el-divider content-position="left">{{$t('sj_member.tie')}}</el-divider>
          <div class="c-info">
            <div class="left">
              <el-avatar style="margin-top:10px;" :size="80" :src="userInfo.headImgUrl"></el-avatar>
            </div>
            <div class="right">
              <div class="text">
                <i class="iconfont iconkehu icon"></i>
                <span>{{userInfo.nickname}}</span>
              </div>
              <div class="text">
                <i class="iconfont iconage icon"></i>
                <span>{{userInfo.sex == 1 ? '男' : '女'}}</span>
              </div>
              <div class="text">
                <i class="iconfont iconmobilenumber icon"></i>
                <span>{{userInfo.phoneNumber}}</span>
              </div>
            </div>
            <div style="clear:both"></div>
          </div>
        </div>
        <!-- 微信数据 -->
        <div class="info-div1">
          <el-divider content-position="left">{{$t('sj_member.tie1')}}</el-divider>
          <div class="c-info">
            <div class="right-1">
              <div class="text">
                <span>
                  <span>UnionID:</span>
                  <span style="margin-left:5px;">{{userInfo.unionid}}</span>
                </span>
              </div>
              <div class="text">
                <span>
                  <span>NickName:</span>
                  <span style="margin-left:5px;">{{userInfo.nickname}}</span>
                </span>
              </div>
              <div class="text">
                <span>
                  <span>Sex:</span>
                  <span
                    style="margin-left:5px;"
                  >{{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女' : '未知'}}</span>
                </span>
              </div>
              <div class="text">
                <span>
                  <span>Address:</span>
                  <span
                    style="margin-left:5px;"
                  >{{userInfo.country}}{{userInfo.province}}{{userInfo.city}}</span>
                </span>
              </div>
            </div>
            <div style="clear:both"></div>
          </div>
        </div>

        <!-- 微信数据 -->
        <div class="info-div1">
          <el-divider content-position="left">{{$t('sj_member.tie2')}}</el-divider>
          <div class="c-info">
            <div class="right-1">
              <!-- <el-tag
                style="margin:0px 10px 10px 0;"
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >{{tag.name}}</el-tag>-->
              <el-tag
                style="margin:0px 10px 10px 0;"
                :key="tag"
                v-for="tag in dynamicTags"
                :disable-transitions="false"
              >{{tag.name}}</el-tag>
            </div>
            <div style="clear:both"></div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="info-div1">
          <el-divider content-position="left">{{$t('sj_member.tie3')}}</el-divider>
          <div class="c-info">
            <!-- <el-date-picker
              v-model="time"
              style="margin-left:40px;"
              size="small"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button
              style="margin-left:15px;"
              @click="getTimeLine(1)"
              type="primary"
              size="small"
            >{{$t('search')}}</el-button> -->

            <div class="time-line">
              <el-timeline>
                <el-timeline-item
                  v-for="(val,index) in timeLine"
                  :key="index"
                  :timestamp="val.time"
                  placement="top"
                >
                  <el-card>
                    <h4>{{showStr(val.event)}}</h4>
                    <p style="width:100%;">{{val.info}}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
            <div class="pagination">
              <el-pagination
                background
                :current-page="currentPage"
                layout="total, prev, pager, next, jumper"
                :total="total"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
  </d2-container>
</template>

<script>
import { details, timeLine } from "@/api/surbanajurong/wechat/member";
export default {
  components: {},
  data() {
    return {
      dynamicTags: [],
      time: null,
      userInfo: {},
      timeLine: [],
      total: 0,
      currentPage: 1,
      openId: 1111
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getDetail(this.$route.query.unionid);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    showStr(str) {
      let s = "";
      if (str == "subscribe") {
        s = "关注";
      } else if (str == "unsubscribe") {
        s = "取消关注";
      } else {
        s = str;
      }
      return s;
    },
    getDetail(id) {
      details({ unionid: id }).then(res => {
        if (res.code == 0) {
          this.userInfo = res.data;
          if (res.data.tagList) {
            this.dynamicTags = res.data.tagList;
          }
          if (res.data.wechatOpenid) {
            this.openId = res.data.wechatOpenid;
            // this.getTimeLine(1);
          }
        }
      });
    },
    getTimeLine(page) {
      this.timeLine = []
      let data = {
        openId: this.openId,
        size: 10,
        page: 1
      };
      timeLine(data).then(res => {
        if (res.code == 0) {
          if (res.data) {
            if (res.data.data) {
              res.data.data.map(val => {
                val.time = this.$formatDate(
                  new Date(val.createTime),
                  "yyyy-MM-dd hh:mm:ss"
                );
                this.timeLine.push(val);
              });
            }
            this.total = res.data.total;
            this.currentPage = page;
          }
        }
      });
    },
    handleCurrentChange(e) {
      this.getTimeLine(e);
    },
    handleClose() {}
  }
};
</script>

<style lang="scss" scope>
.contant {
  width: 100%;
  .left {
    width: 350px;
    float: left;
    .info-div1 {
      width: 100%;
      border-bottom: 1px solid #dcdfe6;
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      margin-bottom: 10px;
      .c-info {
        width: 90%;
        margin: 0 auto 20px auto;
        .left {
          width: 100px;
          float: left;
        }
        .right {
          width: calc(100% - 100px);
          float: left;
          padding: 5px;
          box-sizing: border-box;
          .text {
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #999;
            .icon {
              margin-right: 10px;
              color: #ff7f00;
            }
          }
        }
        .right-1 {
          width: 100%;
          float: left;
          padding: 5px;
          box-sizing: border-box;
          .text {
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
          }
        }
      }
    }
  }
  .right {
    width: calc(100% - 380px);
    float: right;
    .info-div1 {
      width: 100%;
      border-bottom: 1px solid #dcdfe6;
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      margin-bottom: 10px;
      .c-info {
        width: 100%;
        margin: 0 0 20px 0;
        .time-line {
          width: 100%;
          margin-top: 20px;
          max-height: 400px;
          overflow-y: auto;
          box-sizing: border-box;
          padding-right: 30px;
        }
      }
    }
  }
}
</style>