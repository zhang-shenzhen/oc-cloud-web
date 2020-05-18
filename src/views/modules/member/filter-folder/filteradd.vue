<template>
  <d2-container class="page">
    <el-row>
      <el-form :model="ruleForm"
               :rules="rules"
               size="mini"
               ref="ruleForm"
               label-position="left"
               label-width="120px"
               class="demo-ruleForm">
        <el-form-item label="姓名"
                      prop="name">
          <el-col :span="4">
            <el-input v-model="ruleForm.name"
                      clearable />
          </el-col>
          <!-- 编辑时显示的创建时间和最后更新时间 -->
          <el-col v-if="filterList.title == 2"
                  :span="8"
                  :offset="1">
            <div>
              <span class="time_sty">{{ $t("member.filter.startTime") }}:</span> {{ ruleForm.createTime }} </div>
            <div>
              <span class="time_sty">{{ $t("member.filter.endTime") }}:</span>{{ ruleForm.updateTime }}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="会员建组类型"
                      prop="automatic">
          <el-col :span="10">
            <el-radio-group v-model="ruleForm.automatic"
                            :disabled="filterList.title == 2">
              <el-radio :label="2">动态建组</el-radio>
              <el-radio :label="3">静态建组</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="筛选条件"
                      prop="filter">
          <el-col :span="20"
                  class="showHide">
            <FilterCompont :childid="conditions"
                           @getFilter="getCheckValue" />
          </el-col>
        </el-form-item>
        <el-form-item label="人数"
                      v-if="filterList.title == 2">
          <el-col :span="15">
            <span style="margin-right: 10px">{{ruleForm.memberCount}}</span>
            <el-button type="text"
                       v-if="ruleForm.automatic == 2"
                       :icon="buttonIcon"
                       :disabled="isdisabled"
                       @click="Refresh">刷 新</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">返 回</el-button>
        </el-form-item>
      </el-form>
    </el-row>

  </d2-container>
</template>
<script>
import FilterCompont from '@/components/filter/filter-edit'
import { FilterAdd, FilterEcho, FilterEdit, NumberData } from '@/api/member/filter'
export default {
  name: 'Filteradd',
  components: { FilterCompont },
  data () {
    return {
      filter: '',
      filterList: {},
      conditions: [],
      ruleForm: {
        id: null,
        name: '',
        automatic: '',
        filter: null,
        createTime: null,
        updateTime: null,
        memberCount: null,
      },
      rules: {
        name: [{ required: true, message: '请输入会员建组名称', trigger: 'blur' }],
        automatic: [{ required: true, message: '请选择会员建组类型', trigger: 'blur' }],
      },
      isdisabled: false,
      buttonIcon: 'el-icon-refresh',
    }
  },
  computed: {},
  created () {
    // 接收跳转时的参数 this.$route.query
    this.filterList = this.$route.query
    if (this.filterList.title == 2 && this.filterList.id != -99) { // 编辑
      this.echoData()
      this.filter = this.$t('member.filter.editfilter')
    }
    if (this.filterList.id == -99) { // 新增
      this.filter = this.$t('member.filter.addfilter')
      this.conditions = [{
        entrys: [],
        type: 2,
      }]
    }
  },
  mounted () { },
  beforeDestroy () { },
  methods: {

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.preservation();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      // this.$refs[formName].resetFields();
      this.$router.go(-1);//返回上一层
    },
    Refresh () {
      // 点击刷新按钮
      this.$set(this, "buttonIcon", 'el-icon-loading');
      this.isdisabled = true;
      const id = this.filterList.id;
      NumberData({}, id).then(res => {
        this.isdisabled = false;
        this.$set(this, "buttonIcon", 'el-icon-refresh');
        if (res.code == 0) {
          this.$set(this.ruleForm, "memberCount", res.data);
          this.$notifyFrame('刷新成功', true);
        } else {
          this.$notifyFrame(res.message, false);
        }
      }).catch(() => { this.isdisabled = false; })
    },

    echoData () {
      const id = this.filterList.id
      FilterEcho({}, id).then(res => {
        if (res.code == 0) {
          this.echoCond(res.data.conditions);
          this.ruleForm = {
            id: res.data.id,
            name: res.data.name,
            automatic: res.data.automatic,
            filter: '1', // 只用来判断创建的时候不能为空即可传输的时候不用此参数
            createTime: this.$formatDate(new Date(res.data.createTime), "yyyy-MM-dd hh:mm:ss"),
            updateTime: this.$formatDate(new Date(res.data.updateTime), "yyyy-MM-dd hh:mm:ss"),
            memberCount: res.data.memberCount,
          }
        }
      })
    },
    echoCond (data) {
      data.map(res => {
        // res.entrys.map(item => {
        //   if (item.name == 'orderAmount' || item.name == 'orderAmountAvg' || item.name == 'depositAmount') {
        //     item.value = (item.value / 100).toFixed(2)
        //   }
        // })
      })
      this.conditions = data;
      console.log(this.conditions, 'dddd')
    },

    getCheckValue (data) {
      // 调用插件获取的值
      this.conditions = []
      data.map(res => {
        let entrys = [];
        res.entrys.map(item => {
          let option = {};
          option.name = item.transfer1; // 放置父级姓名(英文)
          option.mode = item.transfer2; // 放置子级id
          option.value = item.transfer3 // 
          entrys.push(option)
        })
        this.conditions.push({
          entrys: entrys,
          type: 2
        })
      })
      if (data) {
        this.ruleForm.filter = '1'
      } else {
        this.ruleForm.filter = null;
      }
      console.log(this.conditions, '这个是选定好的参数');
    },
    preservation () {
      // 点击保存
      let optionArray = [];
      optionArray = JSON.parse(JSON.stringify(this.conditions))
      // optionArray.map(res => {
      //   res.entrys.map(item => {
      //     if (item.name == 'orderAmount' || item.name == 'orderAmountAvg' || item.name == 'depositAmount') {
      //       item.value = item.value * 100
      //     }
      //   })
      // })
      if (this.filterList.id != -99) {
        // 编辑
        this.editInterface(optionArray)
      } else {
        // 新增
        this.filterAddInterface(optionArray)
      }
    },

    filterAddInterface (optionArray) {
      // 筛选器新增接口
      const obj = {
        conditions: optionArray,
        description: '',
        automatic: this.ruleForm.automatic,
        name: this.ruleForm.name
      }
      FilterAdd(obj).then(res => {
        if (res.code == 0) {
          this.$router.go(-1);//返回上一层
        } else {
          this.$notifyFrame(res.message, false);
        }

      })
    },

    editInterface (optionArray) {
      // 编辑页面
      const obj = {
        conditions: optionArray,
        id: this.ruleForm.id,
        description: '',
        automatic: this.ruleForm.automatic,
        name: this.ruleForm.name
      }
      console.log(obj, '编辑接口传入参数')
      FilterEdit(obj).then(res => {
        if (res.code == 0) {
          this.$router.go(-1);//返回上一层
        } else {
          this.$notifyFrame(res.message, false);
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.showHide {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 11px;
}
.time_sty {
  font-size: 18px;
  font-weight: 700;
}
</style>

