<template>
  <d2-container class="page">
    <h3 class="list-title"
        style="margin-top:-10px;">{{$t('edit')+ $t('brand.CheckIn') }}</h3>
    <el-form ref="ruleForm"
             label-position="left"
             :model="ruleForm"
             :rules="rules"
             size="mini"
             label-width="180px"
             class="demo-ruleForm">
      <el-form-item label="标题"
                    prop="title">
        <el-col :span="18">
          <el-input v-model="ruleForm.title"
                    clearable />
        </el-col>
      </el-form-item>
      <el-form-item label="Title"
                    prop="titleEn"
                    v-if="productType">
        <el-col :span="18">
          <el-input v-model="ruleForm.titleEn"
                    clearable />
        </el-col>
      </el-form-item>
      <el-form-item label="签到说明"
                    prop="description">
        <el-col :span="18">
          <Tinymce id="tinymce"
                   v-model="ruleForm.description"
                   :quan-tity="30"
                   :height="220" />
        </el-col>
      </el-form-item>
      <el-form-item label="Check in Desc"
                    prop="descriptionEn">
        <el-col :span="18">
          <Tinymce id="tinymce2"
                   v-model="ruleForm.descriptionEn"
                   :quan-tity="60"
                   :height="220" />
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('brand.getIntegral')"
                    prop="num">
        <el-col :span="10">
          <el-input v-model="ruleForm.num"
                    type="number"
                    min="0"
                    :placeholder="$t('p')+$t('integral')+'('+$t('PositiveInteger')+')'"
                    clearable />
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('brand.CheckInTime')"
                    prop="date">
        <el-col :span="10">
          <el-date-picker v-model="ruleForm.date"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          :range-separator="$t('datePicker.range')"
                          :start-placeholder="$t('datePicker.start')"
                          :end-placeholder="$t('datePicker.end')" />
        </el-col>
      </el-form-item>
      <!-- <el-form-item :label="$t('brand.ContinuousSignInReward')">
        <el-col :span="10">
          <el-checkbox v-model="subInfo.openContinuousAttendance" @change="isreward">{{$t('open')}}</el-checkbox>
        </el-col>
      </el-form-item> -->
      <el-form-item v-if="subInfo.openContinuousAttendance">
        <el-col :span="13">
          <div v-for="(item,index) in subInfo.continuousAttendanceAward"
               :key="index"
               class="box">
            <div class="inbox_sty">
              <span>{{$t('brand.ContinuousSignIn')+':'}}</span>
              <el-radio-group v-model="item.type"
                              class="radio_sty"
                              @change="empty(index,1)">
                <el-radio :label="1">{{$t('card')}}</el-radio>
                <el-radio :label="2">{{$t('integral')}}</el-radio>
              </el-radio-group>
              <el-button size="mini"
                         style="color:#F56C6C;float: right;"
                         type="text"
                         @click="deleteSign(index,1)">{{$t('delete')}}</el-button>
            </div>
            <div class="inbox_sty">
              <span>{{$t('brand.ContinuousSignIn')+':'}}</span>
              <el-input v-model="item.limitNum"
                        :placeholder="$t('p')"
                        style="width:50%;margin:0 10px;"
                        type="number"
                        min="0"
                        clearable />
              <span>{{$t('d')}}</span>
            </div>
            <div v-if="item.type == 1"
                 class="inbox_sty">
              <span>{{$t('set')+$t('card')}}：</span>
              <el-button v-if="!item.awardObject.couponName"
                         size="mini"
                         style="margin:0 10px;"
                         type="primary"
                         @click="chooseCard(index,1)">{{$t('set')+$t('card')}}</el-button>
              <el-tag v-if="item.awardObject.couponName"
                      style="margin:0 10px;"
                      closable
                      @close="handleClose(1)">{{ item.awardObject.couponName }}</el-tag>
            </div>
            <div v-if="item.type == 1"
                 class="inbox_sty">
              <span>{{$t('q')}}：</span>
              <el-input v-model="item.awardObject.quantity"
                        placeholder="请输入"
                        style="width:50%;margin:0 10px;"
                        type="number"
                        min="0"
                        clearable />
            </div>
            <div v-if="item.type == 2"
                 class="inbox_sty">
              <span>{{$t('reward')+$t('integral')}}:</span>
              <el-input v-model="item.awardObject.num"
                        placeholder="请输入"
                        style="width:50%;margin:0 10px;"
                        type="number"
                        min="0"
                        clearable />
              <span>{{$t('integral')}}</span>
            </div>
          </div>
          <el-button type="primary"
                     size="mini"
                     @click="addNewPrize(1)">{{$t('add')}}</el-button>
        </el-col>
      </el-form-item>

      <!-- 累计签到奖励： -->

      <el-form-item :label="$t('brand.CumulativeSignInReward')">
        <el-col :span="10">
          <el-checkbox v-model="subInfo.openCumulativeAttendance"
                       @change="iscumulative">{{$t('open')}}</el-checkbox>
        </el-col>
      </el-form-item>
      <el-form-item v-if="subInfo.openCumulativeAttendance">
        <el-col :span="13">
          <div v-for="(item,index) in subInfo.cumulativeAttendanceAward"
               :key="index"
               class="box">
            <div class="inbox_sty">
              <span>{{$t('reward')+(index+1) }}:</span>
              <el-radio-group v-model="item.type"
                              class="radio_sty"
                              @change="empty(index,2)">
                <el-radio :label="1">{{$t('card')}}</el-radio>
                <el-radio :label="2">{{$t('integral')}}</el-radio>
              </el-radio-group>
              <el-button size="mini"
                         style="color:#F56C6C;float: right;"
                         type="text"
                         @click="deleteSign(index,2)">{{$t('delete')}}</el-button>
            </div>
            <div class="inbox_sty">
              <span>{{$t('brand.CumulativeSignIn')+':'}}</span>
              <el-input v-model="item.limitNum"
                        :placeholder="$t('p')"
                        style="width:50%;margin:0 10px;"
                        type="number"
                        min="0"
                        clearable />
              <span>{{$t('d')}}</span>
            </div>
            <div v-if="item.type == 1"
                 class="inbox_sty">
              <span>{{$t('set')+$t('card')}}：</span>
              <el-button v-if="!item.awardObject.couponName"
                         size="mini"
                         style="margin:0 10px;"
                         type="primary"
                         @click="chooseCard(index,2)">{{$t('set')+$t('card')}}</el-button>
              <el-tag v-if="item.awardObject.couponName"
                      style="margin:0 10px;"
                      closable
                      @close="handleClose(2)">{{ item.awardObject.couponName }}</el-tag>
            </div>
            <div v-if="item.type == 1"
                 class="inbox_sty">
              <span>{{$t('q')}}：</span>
              <el-input v-model="item.awardObject.quantity"
                        placeholder="请输入"
                        style="width:50%;margin:0 10px;"
                        type="number"
                        min="0"
                        clearable />
            </div>
            <div v-if="item.type == 2"
                 class="inbox_sty">
              <span>{{$t('reward')+$t('integral')}}:</span>
              <el-input v-model="item.awardObject.num"
                        placeholder="请输入"
                        style="width:50%;margin:0 10px;"
                        type="number"
                        min="0"
                        clearable />
              <span>{{$t('integral')}}</span>
            </div>
          </div>
          <el-button type="primary"
                     size="mini"
                     @click="addNewPrize(2)">{{$t('add')}}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('brand.BackgroundPicture')">
        <el-col :span="18">
          <editorImage v-if="!subInfo.backgroundUrl"
                       urltype="default"
                       type="default"
                       @successCBK="imageSuccessCBK" />
          <el-image v-if="subInfo.backgroundUrl"
                    style="width: 250px;"
                    :src="$fileUrl() + subInfo.backgroundUrl" />
          <i v-if="subInfo.backgroundUrl"
             class="el-icon-close"
             style="color:red;font-size:18px;font-weight:900;cursor:pointer;"
             @click="deletePageImg" />
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">{{$t('confirm')}}</el-button>
        <el-button @click="resetForm()">{{$t('cancel')}}</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="卡券列表"
               width="70%"
               :visible.sync="dialogFormVisible">
      <el-table :data="couponList"
                size="mini"
                max-height="500"
                highlight-current-row
                style="width: 100%"
                @current-change="handleCurrentChange">
        <el-table-column :label="$t('choose')">
          <template slot-scope="scope">
            <el-radio v-model="radioNumber"
                      :label="scope.row.id">{{$t('set')}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column :label="$t('card')+'ID'">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('card')+'Name'">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('card')+$t('validityPeriod')">
          <template slot-scope="scope">
            <span v-if="scope.row.beginTimestamp"
                  style="margin-left: 10px">{{ scope.row.beginTimestamp }}至{{ scope.row.endTimestamp }}</span>
            <span v-if="!scope.row.beginTimestamp"
                  style="margin-left: 10px">
              领取后
              <span v-if="scope.row.fixedBeginTerm">{{ scope.row.fixedBeginTerm }}</span>
              <span v-if="!scope.row.fixedBeginTerm">当</span>
              天生效,有效天数{{ scope.row.fixedTerm }}天
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('q')">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页数 -->
      <div class="pagination">
        <el-pagination background
                       :current-page="currentPage"
                       layout="total, prev, pager, next, jumper"
                       :total="total"
                       @current-change="handleCurrentChange1" />
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   type="primary"
                   @click="confirmCard">{{$t('confirm')}}</el-button>
        <el-button size="mini"
                   @click="dialogFormVisible = false">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
import { CardList, editActivities, CheckDetails } from "@/api/marketing/signin";
import editorImage from "@/components/Tinymce/components/editorImage";
import Tinymce from "@/components/Tinymce";
import { formatDate } from "@/utils/index";
export default {
  components: { Tinymce, editorImage },
  data () {
    return {
      days: [],
      radioNumber: "" /** 你选中了哪一个卡券的id */,
      currentPage: 1,
      total: 0,
      card: {
        index: 0 /** 用来记录你点击的是哪一个的卡券按钮(连续签到) */,
        id: null,
        title: "",
        number: "",
        text: {}
      },
      couponList: [],
      dialogFormVisible: false,
      tageCode: "卡券标签",
      ruleForm: {
        title: "",
        description: "",
        date: "",
        num: "",
        titleEn: null,
        descriptionEn: null,
      },
      rules: {
        title: [{ required: true, message: "标题不能为空!", trigger: "blur" }],
        titleEn: [{ required: true, message: "The title cannot be empty!", trigger: "blur" }],
        description: [
          { required: true, message: "签到说明不能为空!", trigger: "blur" }
        ],
        descriptionEn: [
          { required: true, message: "The check-in note cannot be empty!", trigger: "blur" }
        ],
        date: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        num: [{ required: true, message: "积分是必填!", trigger: "blur" }]
      },
      // 提交信息
      subInfo: {
        id: null,
        loading: true,
        url: "",
        title: null, // 标题
        description: null, // 说明
        beginTime: null,
        endTime: null,
        backgroundUrl: null,
        attendanceAward: [
          {
            // 每天签到奖励
            category: 1, // 1每天签到奖励 2连续签到奖励 3累计签到奖励
            type: 2,
            awardObject: {
              num: null
            }
          }
        ],
        openCumulativeAttendance: false, // 是否累计签到
        openContinuousAttendance: false, // 是否连续签到
        continuousAttendanceAward: [], // 连续签到
        cumulativeAttendanceAward: [] // 累计签到
        /**
         * 连续签到 continuousAttendanceAward
         * 累计签到 cumulativeAttendanceAward
         * category 1每天签到奖励 2连续签到奖励 3累计签到奖励
         * type 1卡券 2积分 3其他
         *  */
      },
      // 连续签到 奖励
      prize: {
        category: 2,
        type: null,
        limitNum: null, // 奖励限制天数
        awardObject: {
          // 卡券
          id: null,
          couponName: null,
          quantity: null,
          // 积分
          num: null
        }
      },
      // 累计签到奖励
      cumulativprize: {
        category: 3,
        type: null,
        limitNum: null, // 奖励限制天数
        awardObject: {
          // 卡券
          id: null,
          couponName: null,
          quantity: null,
          // 积分
          num: null
        }
      },
      rewardnumber: ["一", "二", "三", "四", "五", "六", "七", "八"]
    };
  },
  computed: {},
  created () {
    this.cardListInterface(1);
    console.log("11111111ddddddd", this.$route.query);
    this.checkDetailsInterface(this.$route.query.id);
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    checkDetailsInterface (id) {
      // 详情接口
      CheckDetails({ loading: true }, id).then(res => {
        if (res.code == 0) {
          console.log("详情接口", res);
          if (res.data) {
            res.data.continuousAttendanceAward.map(res => {
              if (res.awardObject == null) {
                res.awardObject = { num: null };
              }
              if (res.awardObject != null && res.awardObject.id) {
                res.awardObject.num = null;
              }
            });
            res.data.cumulativeAttendanceAward.map(res => {
              if (res.awardObject == null) {
                res.awardObject = { num: null };
              }
              if (res.awardObject != null && res.awardObject.id) {
                res.awardObject.num = null;
              }
            });

            this.ruleForm.title = res.data.title;
            this.ruleForm.description = res.data.description;
            this.ruleForm.date = [
              formatDate(new Date(res.data.beginTime), "yyyy-MM-dd")
              ,
              formatDate(new Date(res.data.createTime), "yyyy-MM-dd")
            ];
            console.log('res.data', res.data)
            res.data.attendanceAward[0] = res.data.attendanceAward[0] ? res.data.attendanceAward[0] : {
              awardObject: {
                num: null,
              }
            }
            this.ruleForm.num = res.data.attendanceAward[0].awardObject.num || null;
            console.log('this.ruleForm', this.ruleForm);
            this.subInfo = res.data;
            this.subInfo.openContinuousAttendance =
              res.data.openContinuousAttendance;
            this.subInfo.openCumulativeAttendance =
              res.data.openCumulativeAttendance;
            this.subInfo.backgroundUrl = res.data.backgroundUrl;
            this.subInfo.url = res.data.url;
            this.subInfo.id = res.data.id;
            this.subInfo.international = res.data.international ? JSON.parse(res.data.international) : {
              title: null,
              description: null,
            }
            this.ruleForm.titleEn = this.subInfo.international.title
            this.ruleForm.descriptionEn = this.subInfo.international.description
          }
        }
      });
    },

    cardListInterface (e) {
      // 获取卡券列表接口
      const cardData = {
        page: e,
        pageSize: 10,
        titleOrId: "",
        cardType: null
      };
      CardList(cardData).then(res => {
        if (res.code == 0) {
          if (res.data.couponList) {
            console.log("获取卡券列表接口", res);
            res.data.couponList.map(res => {
              res.beginTimestamp = formatDate(
                new Date(res.beginTimestamp * 1000),
                "yyyy-MM-dd"
              );
              res.endTimestamp = formatDate(
                new Date(res.endTimestamp * 1000),
                "yyyy-MM-dd"
              );
            });
            this.couponList = res.data.couponList;
          } else {
            this.couponList = [];
          }
          this.total = res.data.count;
        }
      });
    },
    handleCurrentChange1 (e) {
      this.cardListInterface(e);
    },
    isreward () {
      // 点击连续签到开启按钮
      if (this.subInfo.openContinuousAttendance) {
        console.log("为真", this.subInfo.openContinuousAttendance);
        this.subInfo.continuousAttendanceAward.push(
          JSON.parse(JSON.stringify(this.prize))
        );
      } else {
        console.log("为假", this.subInfo.openContinuousAttendance);
        this.subInfo.continuousAttendanceAward = [];
      }
    },
    iscumulative () {
      // 累计签到
      if (this.subInfo.openCumulativeAttendance) {
        this.subInfo.cumulativeAttendanceAward.push(
          JSON.parse(JSON.stringify(this.cumulativprize))
        );
      } else {
        this.subInfo.cumulativeAttendanceAward = [];
      }
    },
    empty (index, i) {
      // 单选框 卡券 积分(连续签到)
      if (i == 1) {
        this.subInfo.continuousAttendanceAward[index].awardObject.num = "";
        this.subInfo.continuousAttendanceAward[index].awardObject.quantity = "";
        this.subInfo.continuousAttendanceAward[index].awardObject.id = "";
        this.subInfo.continuousAttendanceAward[index].awardObject.couponName =
          "";
      } else {
        this.subInfo.cumulativeAttendanceAward[index].awardObject.num = "";
        this.subInfo.cumulativeAttendanceAward[index].awardObject.quantity = "";
        this.subInfo.cumulativeAttendanceAward[index].awardObject.id = "";
        this.subInfo.cumulativeAttendanceAward[index].awardObject.couponName =
          "";
      }
    },
    chooseCard (index, i) {
      // 点击显示卡券弹框
      this.radioNumber = "";
      this.dialogFormVisible = true;
      this.card.index = index;
      this.card.number = i;
      if (i == 1) {
        this.subInfo.continuousAttendanceAward[index].awardObject.id = "";
        this.subInfo.continuousAttendanceAward[index].awardObject.couponName =
          "";
      } else {
        this.subInfo.cumulativeAttendanceAward[index].awardObject.id = "";
        this.subInfo.cumulativeAttendanceAward[index].awardObject.couponName =
          "";
      }
    },
    handleCurrentChange (e) {
      console.log("你选中的那个卡券", e);
      this.radioNumber = e.id;
      this.card.text = e;
    },
    confirmCard () {
      // 选择完卡券点击确认按钮
      this.dialogFormVisible = false;
      if (this.card.number == 1) {
        this.subInfo.continuousAttendanceAward[
          this.card.index
        ].awardObject.id = this.card.text.id;
        this.subInfo.continuousAttendanceAward[
          this.card.index
        ].awardObject.couponName = this.card.text.title;
      } else {
        this.subInfo.cumulativeAttendanceAward[
          this.card.index
        ].awardObject.id = this.card.text.id;
        this.subInfo.cumulativeAttendanceAward[
          this.card.index
        ].awardObject.couponName = this.card.text.title;
      }
    },
    handleClose (i) {
      console.log("点击删除卡券");
      if (i == 1) {
        this.subInfo.continuousAttendanceAward[this.card.index].awardObject.id =
          "";
        this.subInfo.continuousAttendanceAward[
          this.card.index
        ].awardObject.couponName = "";
      } else {
        this.subInfo.cumulativeAttendanceAward[this.card.index].awardObject.id =
          "";
        this.subInfo.cumulativeAttendanceAward[
          this.card.index
        ].awardObject.couponName = "";
      }
    },
    addNewPrize (i) {
      // 新增一组奖励(连续签到)
      if (i == 1) {
        if (this.subInfo.continuousAttendanceAward.length < 8) {
          this.subInfo.continuousAttendanceAward.push(
            JSON.parse(JSON.stringify(this.prize))
          );
          this.subInfo.openContinuousAttendance = true;
        } else {
          this.open("警告", "连续签到最多为8组!", "warning");
        }
      } else {
        if (this.subInfo.cumulativeAttendanceAward.length < 8) {
          this.subInfo.cumulativeAttendanceAward.push(
            JSON.parse(JSON.stringify(this.cumulativprize))
          );
          this.subInfo.openCumulativeAttendance = true;
        } else {
          this.open("警告", "连续签到最多为8组!", "warning");
        }
      }
    },
    deleteSign (index, i) {
      // 删除某一组连续签到
      if (this.subInfo.continuousAttendanceAward.length == 1) {
        this.subInfo.openContinuousAttendance = false;
      }
      if (this.subInfo.cumulativeAttendanceAward.length == 1) {
        this.subInfo.openCumulativeAttendance = false;
      }
      if (i == 1) {
        this.subInfo.continuousAttendanceAward.splice(index, 1);
      } else {
        this.subInfo.cumulativeAttendanceAward.splice(index, 1);
      }
    },
    imageSuccessCBK (e) {
      // 上传图片
      this.subInfo.backgroundUrl = e[0].url[0].url;
    },
    deletePageImg () {
      this.subInfo.backgroundUrl = "";
    },
    // 签到天数识别是否重复
    isRepeat (arr) {
      const hash = {};
      for (const i in arr) {
        if (hash[arr[i]]) {
          return true;
        }
        hash[arr[i]] = true;
      }
      return false;
    },
    delectSubData (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].awardObject.num != null) {
          /** 有积分的话就没有卡券信息 */
          delete arr[i].awardObject.id;
          delete arr[i].awardObject.couponName;
          delete arr[i].awardObject.quantity;
        } else if (arr[i].awardObject.id != null) {
          /** 有卡券信息，就删除积分 */
          delete arr[i].awardObject.num;
        }
      }
    },
    submitForm (formName) {
      let that = this;
      this.subInfo.url = this.$CheckGate();
      this.subInfo.title = this.ruleForm.title;
      this.subInfo.description = this.ruleForm.description;
      this.subInfo.beginTime = this.ruleForm.date[0] + ' 00:00:01';
      this.subInfo.endTime = this.ruleForm.date[1] + ' 23:59:59';
      this.subInfo.attendanceAward[0].awardObject.num = this.ruleForm.num;
      this.days = [];

      for (let i = 0; i < this.subInfo.continuousAttendanceAward.length; i++) {
        this.days.push(this.subInfo.continuousAttendanceAward[i].limitNum);
        if (this.subInfo.continuousAttendanceAward[i].limitNum <= 0) {
          this.open("警告", "签到天数不能小于等于0!", "warning");
          return;
        }
        if (
          this.subInfo.continuousAttendanceAward[i].awardObject.quantity &&
          this.subInfo.continuousAttendanceAward[i].awardObject.quantity <= 0
        ) {
          this.open("警告", "卡券数量不能小于等于0!", "warning");
          return;
        }
        if (
          this.subInfo.continuousAttendanceAward[i].awardObject.num &&
          this.subInfo.continuousAttendanceAward[i].awardObject.num <= 0
        ) {
          this.open("警告", "积分值不能小于0!", "warning");
          return;
        }
      }

      for (let i = 0; i < this.subInfo.cumulativeAttendanceAward.length; i++) {
        this.days.push(this.subInfo.cumulativeAttendanceAward[i].limitNum);
        if (this.subInfo.cumulativeAttendanceAward[i].limitNum <= 0) {
          this.open("警告", "签到天数不能小于等于0!", "warning");
          return;
        }
        if (
          this.subInfo.cumulativeAttendanceAward[i].awardObject.quantity &&
          this.subInfo.cumulativeAttendanceAward[i].awardObject.quantity <= 0
        ) {
          this.open("警告", "卡券数量不能小于等于0!", "warning");
          return;
        }
        if (
          this.subInfo.cumulativeAttendanceAward[i].awardObject.num &&
          this.subInfo.cumulativeAttendanceAward[i].awardObject.num <= 0
        ) {
          this.open("警告", "积分值不能小于0!", "warning");
          return;
        }
      }
      if (this.isRepeat(this.days)) {
        this.open("警告", "签到天数不能相同!", "warning");
        return;
      }

      if (this.subInfo.openContinuousAttendance == true) {
        this.delectSubData(this.subInfo.continuousAttendanceAward);
      }
      if (this.subInfo.openCumulativeAttendance == true) {
        this.delectSubData(this.subInfo.cumulativeAttendanceAward);
      }
      return data();
      function data () {
        console.log("715,this", that);
        return that.$refs[formName].validate(valid => {
          if (valid) {
            that.createActivitiesInterface(that.subInfo);
          } else {
            return false;
          }
        });
      }
    },

    createActivitiesInterface (obj) {
      // 编辑活动接口
      console.log('international', obj)
      obj.international.title = this.ruleForm.titleEn
      obj.international.description = this.ruleForm.descriptionEn
      obj.international = JSON.stringify(obj.international)
      editActivities(obj).then(res => {
        if (res.code == 0) {
          console.log("编辑活动接口", res);
          this.open("成功", "编辑成功!", "success");
          this.resetForm();
        } else {
          this.$notify.error({
            title: '错误',
            message: '请检查当前活动是否是开启状态'
          })
        }
      });
    },

    resetForm () {
      this.$router.go(-1);
    },
    open (title, message, type) {
      // 通知框
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
.box {
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  .radio_sty {
    margin: 0 10%;
  }
  .inbox_sty {
    margin-bottom: 20px;
  }
  .icon_sty {
    font-size: 18px;
    color: red;
    font-weight: 800;
    cursor: pointer;
  }
}
</style>
