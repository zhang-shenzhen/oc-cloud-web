<template>
  <d2-container class="page">
    <h3
      class="list-title"
      style="margin-top:-10px;"
    >积分规则设置</h3>
    <div class="flex" style="justify-content: flex-start;">
      <p style="margin-right:20px;">积分规则基准数</p>
      <el-input v-model="number" type="number" placeholder="请输入内容" min="0" />
    </div>
    <el-form class="list">
      <div class="flex list-item">
        <div class="flex" style="width:100%">
          <p>本人注册成为会员，本人获得</p>
          <div class="item-right">
            <div class="flex">
              <el-input v-model="number" type="number" disabled />
              <span>*</span>
              <el-input v-model="form[0].integral" type="number" min="0" />
              <span>=</span>
              <el-input :value="number*form[0].integral" type="number" disabled />
              <span>分</span>
            </div>
            <p>此设置为注册人首次注册成为会员后赠送的积分，与推荐人无关</p>
          </div>
        </div>
      </div>

      <div class="flex list-item">
        <div class="flex" style="width:100%">
          <p>会员完善资料，本人获得</p>
          <div class="item-right">
            <div class="flex">
              <el-input v-model="number" type="number" disabled />
              <span>*</span>
              <el-input v-model="form[1].integral" type="number" min="0" />
              <span>=</span>
              <el-input :value="number*form[1].integral" type="number" disabled />
              <span>分</span>
            </div>
            <p>此设置为会员完善资料获得积分</p>
          </div>
        </div>
      </div>
      <el-form-item style="margin-top:30px;text-align:center">
        <el-button size="mini" @click="getBack">{{ $t('cancel') }}</el-button>
        <el-button size="mini" type="primary" @click="onSubmit">{{ $t('confirm') }}</el-button>
      </el-form-item>
    </el-form>

  </d2-container>
</template>

<script>
import { pointRuleList, pointRuleSet } from '@/api/member/member'
export default {
  data() {
    return {
      number: '',
      form: [{
        id: 1,
        multiple: 1,
        integral: 0,
        type: 1
      }, {
        id: 2,
        multiple: 1,
        integral: 0,
        type: 2
      }]
    }
  },
  computed: {},
  created() {
    pointRuleList().then(res => {
      console.log(res)
      this.form = res.data
      this.number = this.form[0].multiple
    })
  },
  methods: {
    getBack() {
      this.$router.push({
        name: 'marketing-coupon-list'
      })
    },
    onSubmit() {
      this.form[0].multiple = parseInt(this.number)
      this.form[0].integral = parseInt(this.form[0].integral)
      this.form[1].multiple = parseInt(this.number)
      this.form[1].integral = parseInt(this.form[1].integral)
      var list = {
        list: this.form
      }
      pointRuleSet(list).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.$router.push({
            name: 'index'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  padding:20px 50px;
}
.flex{
  display: flex;
  justify-content: space-between;
  align-content: center;
}
p,div,span{
  font-size: 14px;
  color:#58666e;
  line-height: 20px;
}
.el-form-item__content{
  width:100% !important;
}
.el-input{
  width:100px !important;
  padding:0 4px !important;
  margin:0 !important;
}
.item-right{
  span{
    margin:0 10px;
    line-height: 40px;
  }
}
</style>
