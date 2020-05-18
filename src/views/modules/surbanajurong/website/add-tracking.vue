<template>
  <d2-container class="page">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-position="left"
      label-width="120px"
      style="width:1000px;"
    >
      <el-form-item :label="$t('website.addTracking.tabel1')" prop="title">
        <el-input
          v-model="ruleForm.title"
          size="small"
          :disabled="type == 'look'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>

      <el-form-item :label="$t('website.addTracking.tabel2')" prop="content">
        <Tinymce id="tinymce" v-model="ruleForm.content" :height="200" />
      </el-form-item>

      <el-form-item>
        <el-button
          v-if="type != 'look'"
          size="mini"
          type="primary"
          @click="submitForm('ruleForm')"
          >{{ type == 'add' ? this.$t('add') : this.$t('update') }}</el-button
        >
        <el-button size="mini" @click="$router.go(-1)">{{
          $t('back')
        }}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import {
  addTracking,
  trackingDetail,
  updateTracking,
} from '@/api/surbanajurong/website'

export default {
  name: 'AddTracking',
  components: { Tinymce },
  data() {
    return {
      type: null,
      ruleForm: {
        content: null,
        title: null,
      },
      rules: {
        title: [
          {
            required: true,
            message: this.$t('website.addTracking.rule1'),
            trigger: 'blur',
          },
        ],
        content: [
          {
            required: true,
            message: this.$t('website.addTracking.rule2'),
            trigger: 'change',
          },
        ],
      },
    }
  },
  computed: {},
  created() {
    if (this.$route.query.id) {
      this.getDetail(this.$route.query.id)
    }
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getDetail(id) {
      trackingDetail({ id: id }).then((res) => {
        if (res.code == 0) {
          this.ruleForm = res.data
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('上传formName', valid, this.ruleForm)
          this.ruleForm.content = this.ruleForm.content.replace(
            /..\/storage\//g,
            this.$fileUrl()
          )
          if (this.type == 'update') {
            updateTracking(this.ruleForm).then((res) => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('success'),
                  message: this.$t('op_success'),
                  type: 'success',
                })
                this.$router.go(-1)
              }
            })
          } else {
            addTracking(this.ruleForm).then((res) => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('success'),
                  message: this.$t('op_success'),
                  type: 'success',
                })
                this.$router.go(-1)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
.img-upload {
  width: 150px;
  position: relative;
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
</style>
