<template>
  <d2-container class="page">
    <el-form
      label-position="left"
      :model="dataObj"
      label-width="80px"
    >
      <el-form-item label="编号">
        <el-row>
          <el-col :span="24">
            <div class="text-item">
              {{ dataObj.templateCode }}
            </div>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="标题">
        <el-row>
          <el-col :span="24">
            <div class="text-item">
              {{ dataObj.title }}
            </div>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="行业">
        <el-row>
          <el-col :span="24">
            <div class="text-item">
              {{ dataObj.mainIndustry }}-{{ dataObj.secondIndustry }}
            </div>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="详细内容">
        <el-row>
          <el-col :span="20">
            <div class="info">
              <div
                v-for="(val,index) in dataObj.content"
                :key="index"
                class="text-item"
              >
                {{ val.key }}{{ val.key ? ':' : '' }}{{ val.value }}</div>
            </div>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="内容提示">
        <el-row>
          <el-col :span="20">
            <div class="info1">
              <div
                v-for="(val,index) in dataObj.example_1"
                :key="index"
                class="text-item"
              >
                {{ val }}
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form-item>

    </el-form>
  </d2-container>
</template>
<script>
import { templatesDetails } from '@/api/wechat/templateMessage'

export default {
  name: 'TemplateDetails',
  components: {},
  data() {
    return {
      dataObj: {}
    }
  },
  computed: {},
  created() {
    this.getDeatails()
  },
  mounted() {

  },
  beforeDestroy() { },
  methods: {
    getDeatails() {
      templatesDetails({ id: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          this.dataObj = res.data
          this.dataObj.example_1 = this.dataObj.example.replace(/\r/ig, '<br>').split('<br>')
          console.log(this.dataObj.example_1)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.info {
  width: 100%;
  border: 1px solid #dee5e7;
  background: #edf1f2;
  border-radius: 3px;
}
.info1 {
  width: 100%;
  border: 1px solid #dee5e7;
  background: #edf1f2;
  border-radius: 3px;
  padding: 10px;
}
.text-item {
  width: 100%;
  color: #333333;
  text-indent: 15px;
}
.el-form-item {
  margin-bottom: 20px;
}
</style>

