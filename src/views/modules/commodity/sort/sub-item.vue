<template>
  <d2-container class="page">
    <h3 class="list-title">{{$t('commodity.sort.addSubitem')}}</h3>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="180px"
             class="demo-ruleForm">
      <el-form-item :label="$t('commodity.sort.systematic')"
                    prop="categoryName">
        <el-input class="wid_inp"
                  size="mini"
                  v-model="ruleForm.categoryName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('commodity.sort.forder')">
        <el-input class="wid_inp"
                  size="mini"
                  v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   size="mini"
                   @click="submitForm('ruleForm')">{{$t('member.filter.keep')}}</el-button>
        <el-button size="mini"
                   @click="resetForm()">{{$t('cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import { AddCategory, ClassificationDetails, EditCommodity } from '@/api/commodity/goods'
export default {
  components: {},
  data () {
    return {
      query: {},
      ruleForm: {
        id: 0,
        loading: true,
        parentId: 0, // 上级分类id，无上级分类则传0
        categoryName: '', // 分类名称
        categoryNickName: '', // 分类别名昵称
        categoryDescribe: '', // 分类的描述介绍
        sort: '', // 分类的排序，同级分类排序使用
        imgUrl: '', // 分类的图片
        type: '' // 分类的类型，自定义使用
      },
      rules: {
        categoryName: [
          { required: true, message: this.$t('commodity.sort.pleaseClassification'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  created () {
    // 为2的时候是添加为1的时候是编辑
    console.log('路由跳转获取的参数', this.$route.query)
    let that = this;
    that.query = that.$route.query;
    that.ruleForm.parentId = that.query.id
    if (that.query.type == '2') {
      // 新增
    } else {
      // 编辑
      that.classificationDetailsInterface(that.query.id);
    }
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {

    // 查询分类详情接口
    classificationDetailsInterface (id) {
      ClassificationDetails({
        id: id
      }).then(res => {
        console.log('回显参数====', res)
        if (res.code == 0) {
          let data = res.data;
          console.log('成功');
          this.ruleForm = {
            id: data.id,
            loading: true,
            parentId: data.parentId,
            categoryName: data.categoryName,
            categoryNickName: data.categoryNickName,
            categoryDescribe: data.categoryDescribe,
            sort: data.sort,
            imgUrl: '',
            type: ''
          }
          console.log(this.ruleForm, data, '========-----=======')
        }
      })
    },


    submitForm (formName) {
      let uri;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.query.type == '2') {
            // 新增
            delete this.ruleForm.id
            uri = AddCategory;
          } else {
            // 编辑
            uri = EditCommodity;
          }
          this.sortInterface(this.ruleForm, uri);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 分类接口
    sortInterface (data, uri) {
      uri(data).then(res => {
        console.log('新增商品子分类接口====', res)
        if (res.code == 0) {
          console.log('成功');
          this.resetForm();
        }
      })
    },
    resetForm () {
      // 点击返回上一级
      this.$router.go(-1);//返回上一层
    },
  }
}
</script>
<style lang="scss" scoped>
.wid_inp {
  width: 50%;
  margin-bottom: 10px;
}
</style>

