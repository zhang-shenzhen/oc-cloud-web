<template>
  <d2-container class="page">
    <div class="rereuser-sys">
      <div class="title">会员注册</div>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="会员注册">
            <el-switch v-model="form.registerOpen" />
          </el-form-item>
          <el-form-item label="会员卡片">
            <el-radio-group v-model="form.backgroundType">
              <el-radio :label="1">背景色</el-radio>
              <el-radio :label="2">背景图</el-radio>
            </el-radio-group>
            <div v-if="form.backgroundType == 2">
              会员卡设计图：建议尺寸：1000px*600px
            </div>
            <div
              v-if="form.backgroundType == 2"
              class="img-upload"
              style="width: 100px !important;
              position: relative !important;
              margin-bottom: 10px !important;
              text-align: center !important;
              border-radius: 2px !important;
              border: 1px solid #e9e9e9 !important;height:100px;"
            >
              <img
                v-if="form.backgroundUrl != null"
                style="width:100%;"
                :src="$fileUrl() + form.backgroundUrl"
              />
              <div v-if="form.backgroundUrl == null" class="upload-box">
                <i class="el-icon-plus logoIcon" />
              </div>
              <editorImage
                type="custom"
                :cid="0"
                @successCBK="imageSuccessCBK"
              />
            </div>
          </el-form-item>
          <el-form-item
            v-if="form.backgroundType == 1 || form.centerColor"
            label="颜色"
          >
            <el-input
              v-model="form.centerColor"
              style="width:130px;"
              size="mini"
              placeholder="背景色"
            />
          </el-form-item>
          <!-- centerColor -->
          <el-form-item label="注册字段">
            <el-table :data="tableData" size="mini" style="width: 100%">
              <el-table-column fixed prop="name" label="字段名称" width="100">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.name"
                    style="400px;"
                    size="mini"
                    placeholder="字段名称"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="enable" label="是否启用" width="90">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.enable" />
                </template>
              </el-table-column>
              <el-table-column prop="field" label="字段类型" width="90">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.field"
                    size="mini"
                    placeholder="字段类型"
                  >
                    <el-option label="文本类型" value="文本类型" />
                    <el-option label="数字类型" value="数字类型" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="required" label="是否必填" width="90">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.required" />
                </template>
              </el-table-column>
              <el-table-column prop="isR3" label="会员注册填写" width="100">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isR3" />
                </template>
              </el-table-column>
              <el-table-column prop="showInData" label="资料页显示" width="90">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.showInData" />
                </template>
              </el-table-column>
              <el-table-column prop="showInCard" label="会员卡显示" width="90">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.showInCard" />
                </template>
              </el-table-column>
              <el-table-column prop="sort" label="排序" width="90">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.sort"
                    style="400px;"
                    size="mini"
                    placeholder="排序"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="sort" label="操作" width="90">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="delThis(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-button
              size="mini"
              type="primary"
              @click="
                () => {
                  tableData.push({
                    name: '',
                    enable: true,
                    field: null,
                    required: false,
                    isR3: false,
                    showInData: false,
                    showInCard: false,
                    sort: tableData.length + 1,
                    id: new Date().getTime() + '' + (tableData.length - 1 + '')
                  })
                }
              "
              >添加</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="addMemberRegisterConfigPost"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </d2-container>
</template>

<script>
import {
  memberRegisterConfig,
  memberRegisterConfigPost
} from '@/api/member/memLogin'
import editorImage from '@/components/Tinymce/components/editorImage'
import configUrl from '@/api/configUrl'
export default {
  components: { editorImage },
  data() {
    return {
      form: {
        backgroundType: null, // 会员注册背景设计（1 logo 2颜色）
        centerBackgroundType: null, // 会员中心背景设计（1 logo 2 颜色）
        centerColor: null, // 会员中心颜色
        centerFunction: null, // 会员中心功能列表
        centerLogo: null, // 会员中心logo
        channelId: null, //
        color: null, // 注册颜色
        createUser: null, // // 修改人id
        getCardOpen: null, // 是否开启领卡
        id: null, //
        logo: null, // 会员注册页面logo
        registerFields: null, // 注册字段（json)
        registerOpen: null, // 是否开启注册
        updateUser: null, // 创建人id
        verifyTplId: null, // 验证码短信模板id
        backgroundUrl: ''
      },
      tableData: [
        {
          name: '姓名',
          enable: true,
          field: null,
          required: false,
          isR3: false,
          showInData: false,
          showInCard: false,
          sort: 1,
          id: 0
        },
        {
          name: '手机号',
          enable: true,
          field: null,
          required: false,
          isR3: false,
          showInData: false,
          showInCard: false,
          sort: 2,
          id: 1
        }
      ]
    }
  },
  computed: {},
  created() {
    this.getMemberRegisterConfig()
    // this._initTab();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    delThis(v) {
      console.log(v)
      this.tableData.map((d, idx) => {
        if (d.id == v.id) this.tableData.splice(idx, 1)
      })
    },
    getMemberRegisterConfig() {
      memberRegisterConfig().then(res => {
        console.log('获取当前公众号下的注册配置', res.data)
        res.data.centerFunction = JSON.parse(res.data.centerFunction)
        this.tableData = JSON.parse(res.data.registerFields)

        this.$set(this, 'form', res.data)
      })
    },
    addMemberRegisterConfigPost() {
      const params = { ...this.form }
      params.registerFields = [...this.tableData]
      params.updateUser = '0201'
      console.log('params', params)
      memberRegisterConfigPost(params).then(res => {
        if (res.code == 0) {
          this.$message('保存成功')
        }
      })
    },
    subData() {},
    onSubmit() {
      console.log('submit!')
    },
    imageSuccessCBK(e) {
      console.log('上传图片', e, e[0].url)
      this.$set(this.form, 'backgroundUrl', e[0].url[0].url)
      // 上传图片
      this.form.backgroundUrl = e[0].url[0].url
    }
  }
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
  }
}
</style>
<style lang="scss">
.rereuser-sys {
  .img-upload {
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
