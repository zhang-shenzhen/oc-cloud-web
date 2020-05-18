<template>
  <d2-container class="page">
    <div class="rereuser-sys">
      <div class="title">会员卡设置</div>
      <div class="list-title">
        <div>基本信息</div>
        <div>会员卡预览</div>
      </div>
      <div>
        <div style="display:flex;">
          <el-form
            ref="form"
            :model="forms[cardIndex]"
            label-width="120px"
            style="width:500px"
          >
            <el-form-item label="品牌logo">
              <div class="img-upload">
                <img
                  v-if="logo"
                  style="width:100%;height:100%;"
                  :src="$fileUrl() + logo"
                />
                <div v-if="!logo" class="upload-box">
                  <i class="el-icon-plus logoIcon" />
                </div>
                <editorImage
                  type="custom"
                  :cid="0"
                  @successCBK="imageSuccessCBK"
                />
              </div>
            </el-form-item>
            <el-form-item label="品牌名称">
              <el-input v-model="name" size="mini" placeholder="品牌名称" />
            </el-form-item>
            <el-form-item label="卡片设计">
              <span>会员卡设计图:建议尺寸：1000px*600px</span>
              <div class="img-upload" style>
                <img
                  v-if="forms[cardIndex].backgroundImage != null"
                  style="width:100%;height:100%"
                  :src="$fileUrl() + forms[cardIndex].backgroundImage"
                />
                <div
                  v-if="forms[cardIndex].backgroundImage == null"
                  class="upload-box"
                >
                  <i class="el-icon-plus logoIcon" />
                </div>
                <editorImage
                  type="custom"
                  :cid="1"
                  @successCBK="imageSuccessCBK"
                />
              </div>
            </el-form-item>
            <el-form-item label="卡有效期">
              <el-radio-group v-model="forms[cardIndex].termType">
                <el-radio :label="1">永久有效</el-radio>
                <el-radio :label="2">指定日期</el-radio>
                <el-radio :label="3">固定长度</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="forms[cardIndex].termType == 2"
              style="margin-bottom:10px;"
            >
              <el-date-picker
                v-model="forms[cardIndex].times1"
                size="mini"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item v-if="forms[cardIndex].termType == 3">
              <el-input
                v-model="forms[cardIndex].termExpireDay"
                size="mini"
                placeholder="请输入有效年数"
              />
            </el-form-item>
            <el-form-item label="特权说明">
              <el-input
                v-model="forms[cardIndex].privilege"
                style="400px;"
                size="mini"
                placeholder="特权说明"
                type="textarea"
              />
            </el-form-item>
            <el-form-item label="使用须知" style="margin-top:20px;">
              <el-input
                v-model="forms[cardIndex].description"
                style="400px;"
                size="mini"
                placeholder="使用须知"
                type="textarea"
              />
            </el-form-item>
            <el-form-item label="获取途径">
              <el-radio-group v-model="forms[cardIndex].getType">
                <el-radio :label="1">注册</el-radio>
                <el-radio :label="2">总消费</el-radio>
                <el-radio :label="3">总积分</el-radio>
                <el-radio :label="4">充值金额</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="forms[cardIndex].getType == '2'">
              <el-input
                v-model="forms[cardIndex].minTotalMoney"
                style="width:150px"
                placeholder="最低消费"
                size="mini"
              />-
              <el-input
                v-model="forms[cardIndex].maxTotalMoney"
                style="width:150px"
                placeholder="最高消费"
                size="mini"
              />
            </el-form-item>
            <el-form-item v-if="forms[cardIndex].getType == '3'">
              <el-input
                v-model="forms[cardIndex].minTotalPoint"
                style="width:150px"
                placeholder="最低积分"
                size="mini"
              />-
              <el-input
                v-model="forms[cardIndex].maxTotalPoint"
                style="width:150px"
                placeholder="最高积分"
                size="mini"
              />
            </el-form-item>
            <el-form-item v-if="forms[cardIndex].getType == '4'">
              <el-input
                v-model="forms[cardIndex].minTotalDeposit"
                style="width:150px"
                placeholder="最低总充值"
                size="mini"
              />-
              <el-input
                v-model="forms[cardIndex].maxTotalDeposit"
                style="width:150px"
                placeholder="最高总充值"
                size="mini"
              />
            </el-form-item>

            <el-form-item label="积分比例" style="margin-top:20px;">
              <el-input
                v-model="forms[cardIndex].getPointMoney"
                style="width:150px"
                placeholder="金额"
                size="mini"
              />-
              <el-input
                v-model="forms[cardIndex].getPoint"
                style="width:150px"
                placeholder="积分"
                size="mini"
              />
            </el-form-item>
            <el-form-item label="积分有效期">
              <el-radio-group v-model="forms[cardIndex].pointTimeType">
                <el-radio :label="1">永久有效</el-radio>
                <el-radio :label="2">指定日期</el-radio>
                <el-radio :label="3">固定长度</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="forms[cardIndex].pointTimeType == 2">
              <el-date-picker
                v-model="forms[cardIndex].times"
                size="mini"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item v-if="forms[cardIndex].pointTimeType == 3">
              <el-input
                v-model="forms[cardIndex].pointExpireDay"
                size="mini"
                placeholder="积分有效期"
              />
            </el-form-item>
            <el-form-item label="会员卡等级">
              <el-input
                v-model="forms[cardIndex].levelName"
                size="mini"
                placeholder="会员卡等级"
              />
            </el-form-item>
          </el-form>
          <div class="rightBox">
            <div class="phoneBox">
              <div
                v-for="(item, index) in forms"
                :key="index"
                class="cardView"
                :style="{
                  border: cardIndex == index ? '2px solid #333' : 'none',
                }"
                @click="
                  () => {
                    cardIndex = index
                  }
                "
              >
                <img
                  :src="$fileUrl() + item.backgroundImage"
                  class="cardView-backgroundImage"
                  alt
                />
                <div class="cardView-top">
                  <div class="cardView-top-head">
                    <img
                      style="width:100%;height:100%;"
                      :src="$fileUrl() + logo"
                      alt
                    />
                  </div>
                  <div class="cardView-top-name">{{ name }}</div>
                  <div class="cardView-top-logo">
                    <img
                      style="width:100%;height:100%;"
                      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569405241381&di=77df45ced04d0d07656e50eb03b2ecd2&imgtype=0&src=http%3A%2F%2Fimg3.cache.netease.com%2Fgame%2F2013%2F11%2F26%2F20131126143638f53f4.png"
                      alt
                    />
                  </div>
                </div>
                <div class="cardView-bottom">
                  <div class="cardView-bottom-Ctype cardView-bottom-Cid">
                    {{ item.levelName }}
                  </div>
                  <div class="cardView-bottom-Cid">
                    会员卡号：1071 1928 2819
                  </div>
                </div>
              </div>
              <div class="upload-box" @click="addCard">
                <i class="el-icon-plus logoIcon" />
              </div>
            </div>
          </div>
        </div>
        <!-- <div v-if="false" class="list-title">会员卡等级</div>
        <div v-if="false" style="background:rgba(242, 242, 242, 1);">
          <el-form :model="form" label-width="80px">
            <el-form-item label="等级名称">
              <el-input style="width:300px" v-model="forms[cardIndex].name" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="卡片设计">
              <span>会员卡设计图:建议尺寸：1000px*600px</span>
              <div class="img-upload">
                <img
                  v-if="forms[cardIndex].prizePic != null"
                  style="width:100%;"
                  :src="$fileUrl()+forms[cardIndex].prizePic"
                />
                <div v-if="forms[cardIndex].prizePic == null" class="upload-box">
                  <i class="el-icon-plus logoIcon" />
                </div>
                <editorImage

                  type="custom"
                  :cid="2"
                  @successCBK="imageSuccessCBK"
                />
              </div>
            </el-form-item>
            <el-form-item label="卡有效期">
              <el-radio-group v-model="forms[cardIndex].termType">
                <el-radio label="1">永久有效</el-radio>
                <el-radio label="2">指定日期</el-radio>
                <el-radio label="3">固定长度</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item style="margin-bottom:10px;" v-if="forms[cardIndex].termType==1">
              <el-date-picker
                size="mini"
                v-model="forms[cardIndex].times1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item style="margin-bottom:10px;" v-if="forms[cardIndex].termType==3">
              <el-input v-model="forms[cardIndex].termExpireDay" size="mini" placeholder="卡有效期"></el-input>
            </el-form-item>
            <el-form-item label="特权说明">
              <el-input
                style="400px;"
                size="mini"
                placeholder="特权说明"
                type="textarea"
                v-model="forms[cardIndex].privilege"
              ></el-input>
            </el-form-item>
            <el-form-item label="使用须知" style="margin-top:20px;">
              <el-input
                style="400px;"
                size="mini"
                placeholder="使用须知"
                type="textarea"
                v-model="forms[cardIndex].desc"
              ></el-input>
            </el-form-item>
            <el-form-item label="获取途径">
              <el-radio-group v-model="forms[cardIndex].resource">
                <el-radio label="注册"></el-radio>
                <el-radio label="总消费"></el-radio>
                <el-radio label="总积分"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="forms[cardIndex].resource=='总消费'">
              <el-input style="width:150px" v-model="forms[cardIndex].name" size="mini"></el-input>-
              <el-input style="width:150px" v-model="forms[cardIndex].name" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="积分比例" style="margin-top:20px;">
              <el-input
                style="width:150px"
                v-model="forms[cardIndex].getPointMoney"
                placeholder="消费金额"
                size="mini"
              ></el-input>-
              <el-input
                style="width:150px"
                v-model="forms[cardIndex].getPoint"
                placeholder="积分"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="积分有效期" label-width="120px;">
              <el-radio-group v-model="forms[cardIndex].pointTimeType">
                <el-radio :label="1">永久有效</el-radio>
                <el-radio :label="2">指定日期</el-radio>
                <el-radio :label="3">固定长度</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="forms[cardIndex].times=='指定日期'">
              <el-date-picker
                size="mini"
                v-model="forms[cardIndex].value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="onSubmit">立即创建</el-button>
              <el-button size="mini" @click="$router.go(-1)">取消</el-button>
            </el-form-item>
          </el-form>
        </div> -->
      </div>
      <div class="buts" style="text-align: center;margin-top:50px;">
        <el-button size="mini" type="primary" @click="onSubmit">{{
          integralType ? '立即保存' : '立即创建'
        }}</el-button>
        <el-button size="mini" @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
  </d2-container>
</template>

<script>
import editorImage from '@/components/Tinymce/components/editorImage'
import configUrl from '@/api/configUrl'
import { formatDate } from '@/utils/index'
import { getCard, postCard } from '@/api/member/member'
export default {
  components: { editorImage },
  data() {
    return {
      forms: [
        {
          name: '',
          couponId: '', // 会员卡id
          detail: null, // 兑换说明
          times: [], // 积分有效期时间
          times1: [], // 卡有效期时间
          pointBeginTime: null, // 积分有效期 指定开始日期
          pointEndTime: null, // 积分有效期 指定结束日期
          pointExpireDay: null, // 积分有效期固定长度
          backgroundImage: null, // 背景图
          logo: null,
          description: '', // 使用须知
          getType: null, // 获取途径
          pointTimeType: null, // 积分有效期  1永久有效 2指定日期 3固定长度
          termExpireDay: null, // 会员卡有效期 固定长度 （天数）
          termBeginTime: null, // 会员卡有效期 指定日期开始时间
          termEndTime: null, // 会员卡有效期 指定日期结束时间
          termType: null, // 会员卡有效期类型 1永久有效 2指定日期 3固定长度
          privilege: null, // 特权说明
          levelName: '', // 会员卡等级
          getPointMoney: null, // 获取积分 消费金额
          getPoint: null, // 获取积分 获取的积分数
          level: 0,
          maxTotalPoint: null, // 最高总积分
          maxTotalDeposit: null, // 最高总充值
          maxTotalMoney: null, // 最高总消费
          minTotalDeposit: null, // 最低总充值
          minTotalMoney: null, // 最低总消费
          minTotalPoint: null, // 最低总积分
        },
      ], // 卡列表
      logo: null,
      name: null,
      integralType: false, // 是否为编辑态
      cardIndex: 0, // 当前选中卡下表
    }
  },
  computed: {},
  created() {
    if (Object.keys(this.$route.query).length) {
      this.integralType = true
      console.log('this.$route.query', this.$route.query)
      const ds = []
      for (const i in this.$route.query) {
        const d = this.$route.query[i]
        console.log('d', d)
        d.times =
          d.pointTimeType == 2
            ? [new Date(d.pointBeginTime), new Date(d.pointEndTime)]
            : []
        d.times1 =
          d.termType == 2
            ? [new Date(d.termBeginTime), new Date(d.termEndTime)]
            : []
        ds.push(d)
      }
      this.forms = [...ds]
      this.logo = ds[0].logo
      this.name = ds[0].name
      console.log('this.forms', this.forms)
      // this.form = d;
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    _initTab() {
      this.tableConfig = logManagement
    },
    // 导出订单
    excleOrders() {
      window.open(configUrl.ajax_url + 'upm/order/excle/make')
    },
    /**
     *  LOG列表
     */
    getSelectLog(page) {
      const params = {
        size: 10,
        page: page,
      }
      Object.assign(params, this.form)
      selectLog(params).then((res) => {
        console.log('LOG列表', res)
        this.currentPage = page
        this.tableData = res.list
        this.total = res.count
      })
    },
    // 初始化参数
    initParams(forms) {
      console.log('forms', forms)
      forms.map((p, idx) => {
        if (p.pointTimeType == 2) {
          p.pointBeginTime = formatDate(p.times[0], 'yyyy-MM-dd hh:mm:ss')
          p.pointEndTime = formatDate(p.times[1], 'yyyy-MM-dd hh:mm:ss')
        }
        if (p.termType == 2) {
          p.termBeginTime = formatDate(p.times1[0], 'yyyy-MM-dd hh:mm:ss')
          p.termEndTime = formatDate(p.times1[1], 'yyyy-MM-dd hh:mm:ss')
        }
        p.leve = idx + 1
        p.logo = this.logo
        p.name = this.name
      })

      return forms
    },
    // 分页获取数据
    handleCurrentChange(e) {
      this.getSelectLog(e)
    },
    onSubmit() {
      const params = this.initParams(this.forms)
      console.log('params', params)
      // 判断当前是否为编辑状态
      if (!this.integralType) {
        postCard(params).then((res) => {
          if (res.code == 0) this.$router.go(-1)
        })
      } else {
        postCard(params).then((res) => {
          if (res.code == 0) this.$router.go(-1)
        })
      }
    },
    imageSuccessCBK(e) {
      // 上传图片
      console.log('图片回显', e)
      const url = e[0].url[0].url
      const cardIndex = this.cardIndex
      if (e.cid == 0) this.logo = url
      if (e.cid == 1) this.forms[cardIndex].backgroundImage = url
    },
    addCard() {
      this.cardIndex = this.forms.length
      const levelNum = JSON.parse(JSON.stringify(this.forms.length))
      this.forms.push({
        name: null,
        couponId: '', // 会员卡id
        detail: null, // 兑换说明
        times: [], // 积分有效期时间
        times1: [], // 卡有效期时间
        pointBeginTime: null, // 积分有效期 指定开始日期
        pointEndTime: null, // 积分有效期 指定结束日期
        pointExpireDay: null, // 积分有效期固定长度
        backgroundImage: null, // 背景图
        logo: null,
        description: '', // 使用须知
        getType: null, // 获取途径
        pointTimeType: null, // 积分有效期  1永久有效 2指定日期 3固定长度
        termExpireDay: null, // 会员卡有效期 固定长度 （天数）
        termBeginTime: null, // 会员卡有效期 指定日期开始时间
        termEndTime: null, // 会员卡有效期 指定日期结束时间
        termType: null, // 有效期类型 1永久有效 2指定日期 3固定长度
        privilege: null, // 特权说明
        levelName: '', // 会员卡等级
        level: levelNum, // 会员卡等级
        maxTotalPoint: null, // 最高总积分
        maxTotalDeposit: null, // 最高总充值
        maxTotalMoney: null, // 最高总消费
        minTotalDeposit: null, // 最低总充值
        minTotalMoney: null, // 最低总消费
        minTotalPoint: null, // 最低总积分
      })
    },
  },
}
</script>

<style lang="scss" scope>
.rereuser-sys {
  .title {
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
    font-weight: 650;
    font-style: normal;
    font-size: 18px;
    text-align: left;
  }
  .list-title {
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.447058823529412);
    line-height: 22px;
    display: flex;
    div {
      flex: 1;
      text-align: center;
    }
  }
  .phoneBox {
    margin-left: 50px;
    width: 374px;
    height: 615px;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #999;
    overflow-y: auto;
    text-align: center;
    .cardView {
      margin: 20px 37px;
      width: 300px;
      height: 170px;
      border: 1px solid rgba(228, 228, 228, 1);
      border-radius: 9px;
      position: relative;
      background: #777;
      overflow: hidden;
      div {
        position: relative;
      }
      .cardView-backgroundImage {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .cardView-top {
        display: flex;
        z-index: 2;
        margin: 10px;
        width: 100%;
        line-height: 34px;
        .cardView-top-head {
          width: 34px;
          height: 34px;
          border-radius: 17px;
          overflow: hidden;
          border: 1px solid #999;
          margin-left: 10px;
        }
        .cardView-top-logo {
          width: 34px;
          height: 34px;
          overflow: hidden;
          left: 240px;
          position: absolute;
        }
        .cardView-top-name {
          font-family: 'PingFangSC-Regular', 'PingFang SC';
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          text-align: left;
          margin-left: 20px;
        }
      }
      .cardView-bottom {
        margin: 10px;
        margin-top: 65px;
        z-index: 2;
        margin-left: 20px;
        .cardView-bottom-Ctype {
          margin-bottom: 10px;
        }
        .cardView-bottom-Cid {
          font-size: 14px;
          text-align: left;
          font-family: 'PingFangSC-Regular', 'PingFang SC';
          font-weight: 400;
          font-style: normal;
          color: #000;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.rereuser-sys {
  .img-upload {
    border: 1px solid #e9e9e9 !important;
    height: 100px;
    width: 100px !important;
    position: relative !important;
    margin-bottom: 10px !important;
    text-align: center !important;
    border-radius: 2px !important;
    .upload-box {
      width: 100px !important;
      height: 100px !important;
      border: 1px dashed #dddddd !important;
      cursor: pointer !important;
      line-height: 100px;
    }
  }

  .logoIcon {
    font-size: 40px !important;
    color: #dddddd !important;
    margin: 30px !important;
  }
}
</style>
