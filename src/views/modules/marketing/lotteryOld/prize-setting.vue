<template>
  <div class="page-member-list">
    <div class="prizeSettingBackground">
      <div v-for="(item, index) in form.prizes" :key="index" class="prize">
        <div class="prize-title">
          <div>奖品 {{ index + 1 }}</div>
          <div @click="delPrize(index)">删除</div>
        </div>
        <el-divider />
        <div>
          <el-form
            :model="item"
            :rules="rules"
            class="prizeSettingBackground-el-form"
            size="mini"
          >
            <div class="el-form-l">
              <el-form-item label="奖品名称" prop="name" style="display:flex;">
                <el-input v-model="item.name" />
              </el-form-item>
              <div class="redTxts">不得超过7个汉字</div>
              <el-form-item label="奖品类型" prop="type">
                <el-radio
                  v-model="item.type"
                  style="margin-top:12px;"
                  :label="1"
                  >卡券</el-radio
                >
                <el-radio
                  v-model="item.type"
                  style="margin-top:12px;"
                  :label="2"
                  >积分</el-radio
                >
                <el-radio
                  v-model="item.type"
                  style="margin-top:12px;"
                  :label="3"
                  >无</el-radio
                >
              </el-form-item>
              <el-form-item v-if="item.type == 1" label="选择卡券">
                <el-button type="primary" size="mini" @click="cardSet(index)">
                  <span v-if="form.prizes[index].target.name"
                    >{{ form.prizes[index].target.name }}
                  </span>
                  <span v-else>选择</span>
                </el-button>
                <i v-if="form.prizes[index].target.name"
                  >{{ form.prizes[index].target.quantity }}张</i
                >
              </el-form-item>
              <el-form-item v-if="item.type == 2" label="设置积分">
                <el-input
                  v-model="item.target.integral"
                  size="mini"
                  type="input"
                />
              </el-form-item>
              <el-form-item label="奖品数量" style="display:flex;">
                <el-input
                  v-if="item.type != 3"
                  v-model="item.stock"
                  type="input"
                />
                <span v-else>
                  无限
                </span>
              </el-form-item>
            </div>
            <el-divider
              v-if="item.type != 3"
              direction="vertical"
              style="height:200px;"
            />
            <div v-if="item.type != 3" class="el-form-r">
              <div class="el-form-r-label">奖品图片:</div>
              <div class="img-upload">
                <img
                  v-if="item.prizePic"
                  style="width:100%;"
                  :src="$fileUrl() + item.prizePic"
                />
                <div v-if="!item.prizePic" class="upload-box">
                  <i class="el-icon-plus logoIcon" />
                </div>
                <editorImage
                  urltype="material"
                  type="custom"
                  direction="shu"
                  :cid="index"
                  @successCBK="imageSuccessCBK"
                />
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <el-button type="primary" size="mini" @click="addPrizes"
        >+ 新增奖品</el-button
      >
      <span style="margin-left: 50px;">奖品最多设置8个</span>
      <div v-if="dialogCarsListVisible" class="driver-Info">
        <el-dialog
          title="卡券列表"
          :visible.sync="dialogCarsListVisible"
          witdh="70%"
        >
          <el-table :data="tableData" size="mini" style="width: 100%">
            <el-table-column prop="name" label="选择" width="60">
              <template slot-scope="scope">
                <div>
                  <el-radio v-model="cardSeting" :label="scope.row"
                    ><span>{{ scope.row.name }}</span></el-radio
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column label="卡券ID" prop="id" width="100" />
            <el-table-column label="券名" prop="title" width="160" />
            <el-table-column label="有效期" prop="endTimestamp" width="300">
              <template slot-scope="scope">
                <div>
                  <span>{{ scope.row.beginTimestamp }}</span> 至
                  <span>{{ scope.row.endTimestamp }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="总量" prop="quantity" width="60" />
          </el-table>
          <div class="pagination" style="margin-top:20px;">
            <el-pagination
              background
              :current-page="currentPage"
              layout="total, prev, pager, next, jumper"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </div>
          <div class="footer" style="text-align: center;margin-top: 20px;">
            <el-button size="mini" type="primary" @click="clickBut(true)"
              >确 定</el-button
            >
            <el-button size="mini" @click="cancel(index)">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import editorImage from '@/components/Tinymce/components/editorImage'
import { CardList } from '@/api/marketing/lottery'
export default {
  name: 'PrizeSetting',
  components: {
    editorImage
  },
  props: {
    datas: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      form: [
        {
          activityId: null,
          id: null,
          name: null,
          prizePic: null,
          serNum: null,
          stock: null,
          type: null,
          winningTips: null,
          target: {
            code: null,
            couponId: null,
            integral: null,
            name: null
          }
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入奖品名称', trigger: 'blur' },
          { min: 1, max: 7, message: '不得超过7个汉字', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选奖品类型', trigger: 'change' }]
      },
      // 卡券相关
      tableData: [],
      total: 0,
      page: 1,
      currentPage: 1,
      dialogCarsListVisible: false,
      itemCardSetIng: null, // 当前使用 卡券选中的奖品项
      cardSeting: null // 当前使用的卡券
    }
  },
  computed: {},
  created() {
    console.log('数据源', this.datas)
    console.log('抽奖数据源this.$store.state', this.$store.state.luckyData)
    this['form'] = this.$store.state.luckyData
    this.getCardList(1)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 增加奖品列表
    addPrizes() {
      if (this.form.prizes.length >= 8) return
      const itm = {
        serNum: 0,
        name: '',
        prizePic: '',
        winningTips: '',
        type: null,
        target: {
          couponId: null,
          name: '',
          integral: null
        },
        stock: null
      }
      console.log('this.form', this.form)
      this.form.prizes.push(itm)
    },
    // 删除当前
    delPrize(idx) {
      this.form.prizes.splice(idx, 1)
    },
    // 上传图片的回调方法
    imageSuccessCBK(arr) {
      const _this = this
      console.log('上传图片的回调方法', arr)
      this.$set(this.form.prizes[arr.cid], 'prizePic', arr[0].url.localUrl)
    },
    // click
    // 分页获取数据
    handleCurrentChange(e) {
      this.getCardList(e)
    },
    /**
     *  卡券列表
     */
    getCardList(page) {
      const params = {
        size: 10,
        page: page
      }
      CardList(params).then(res => {
        console.log('卡券列表', res)
        this.currentPage = page
        this.tableData = res.couponList
        this.total = res.count
      })
    },
    // 选择卡券
    cardSet(index) {
      this.dialogCarsListVisible = true
      this.itemCardSetIng = index
    },
    // 确定卡券
    clickBut(type) {
      console.log('cardSeting', this.cardSeting, this.itemCardSetIng)
      console.log('this.form.prizes', this.form.prizes)
      const cardSeting = this.cardSeting
      this.$set(this.form.prizes[this.itemCardSetIng], 'target', {
        code: cardSeting.code,
        couponId: cardSeting.id,
        integral: 0,
        name: cardSeting.title,
        quantity: cardSeting.quantity
      })
      // this.form.prizes[this.itemCardSetIng].target =
      console.log('this.form.prizes', this.form.prizes)
      this.cardSeting = null
      this.dialogCarsListVisible = false
    },
    cancel(index) {
      this.dialogCarsListVisible = false
      this.itemCardSetIng = null
      this.cardSeting = null
      this.$store.state.luckyData = {} // 初始化掉 上传的商品
    }
  }
}
</script>

<style lang="scss" scope>
.prizeSettingBackground {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  margin: 10px;
  min-width: 1080px;

  .redTxts {
    padding-left: 150px;
    line-height: 30px;
    font-size: 12px;
    color: #afaeae;
    margin-top: -10px;
    margin-bottom: 20px;
  }
  .prize {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 30px;
    min-width: 1080px;
    max-width: 1080px;
    .prize-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: -20px;
      line-height: 40px;
      padding: 0 20px;
    }
  }
}
</style>
<style lang="scss">
.prizeSettingBackground {
  .prize {
    .el-form-item__label {
      // width: 100% !important;
      color: #000;
      text-align: left;
      min-width: 150px;
    }
    .prizeSettingBackground-el-form {
      display: flex;
      padding-left: 30px;
      .el-form-l {
        flex: 1;
        .el-input {
          width: 300px;
        }
      }
      .el-form-r {
        flex: 1;
        display: flex;
        .el-form-r-label {
          width: 150px;
        }
      }
      .el-divider--vertical {
        height: 200px;
        position: relative;
        left: -30px;
      }
    }
    .img-upload {
      width: 100px;
      position: relative;
      margin-bottom: 10px;
    }
    .upload-box {
      width: 100px;
      height: 100px;
      border: 1px dashed #dddddd;
      cursor: pointer;
    }
    .logoIcon {
      font-size: 40px;
      color: #dddddd;
      margin: 30px;
    }
  }
}
</style>
