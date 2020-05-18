<template>
  <d2-container class="page">
    <h3 class="list-title">编辑领券</h3>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             size="mini"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="活动时间"
                    required>
        <el-date-picker v-model="ruleForm.date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关联卡券"
                    prop="region">
        <el-cascader v-model="ruleForm.region"
                     :options="cardTicket"
                     @change="handleChange"></el-cascader>
        <!-- <el-select v-model="ruleForm.region"
                   placeholder="请选择卡券">
          <el-option label="代金券"
                     value="CASH"></el-option>
          <el-option label="优惠券"
                     value="GENERAL_COUPON"></el-option>
          <el-option label="折扣券"
                     value="DISCOUNT"></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="排序值">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="上架"
                    prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import { cardInquire } from '@/api/marketing/coupon'
export default {
  components: {},
  data () {
    return {
      ruleForm: {
        region: '',
        date: '',
        delivery: false,
      },
      rules: {
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ]
      },
      cardTicket: []
    }
  },
  computed: {},
  created () {
    console.log(this.$route.query, '路由')
    this.couponCard();
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    couponCard () {
      let cardList = [{
        value: 'CASH',
        label: '代金券'
      }, {
        value: 'GENERAL_COUPON',
        label: '优惠券'
      }, {
        value: 'DISCOUNT',
        label: '折扣券'
      }]
      cardList.map((res, index) => {
        setTimeout(() => {
          cardInquire({
            page: 1,
            size: 2000,
            cardType: res.value
          }).then(item => {
            if (item.code == 0) {
              let data = item.data.couponList;
              if (data.length != 0) {
                data.map(itm => {
                  itm.label = itm.title;
                  itm.value = itm.id;
                })
                res.children = data;
              }
            }
          })
        }, 500)
      })
      this.cardTicket = cardList;
    },
    handleChange (val) {
      console.log(val, '显示你选中的是哪个')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          alert('submit!', this.ruleForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

