<template>
  <d2-container class="page">
    <el-form label-position="left"
             size="mini"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item :label="$t('distri.butor1')">
        <el-col :span="8">
          <el-input v-model="ruleForm.nickname"
                    style="width:40%"
                    clearable />
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('distri.butor2')">
        <el-col :span="8">
          <el-input v-model="ruleForm.minUsed"
                    style="width:40%"
                    :placeholder="$t('distri.x2')"
                    clearable />
          {{ $t('distri.butor3') }}
          <el-input v-model="ruleForm.maxUsed"
                    style="width:40%"
                    :placeholder="$t('distri.x1')"
                    clearable />
        </el-col>
      </el-form-item>

      <el-form-item :label="$t('distri.butor4')">
        <el-col :span="8">
          <el-input v-model="ruleForm.minTotal"
                    style="width:40%"
                    :placeholder="$t('distri.x2')"
                    clearable />
          {{ $t('distri.butor3') }}
          <el-input v-model="ruleForm.maxTotal"
                    style="width:40%"
                    :placeholder="$t('distri.x1')"
                    clearable />
        </el-col>
      </el-form-item>

      <el-form-item :label="$t('distri.butor5')">
        <el-col :span="16">
          <el-input v-model="ruleForm.phoneNumber"
                    style="width:20%;margin-right:20px"
                    clearable />
          <el-button type="primary"
                     @click="search()">{{ $t('distri.butor8') }}</el-button>
          <el-button type="primary"
                     @click="clear()">{{ $t('distri.butor6') }}</el-button>
          <el-button type="primary"
                     @click="daochu()">{{ $t('distri.butor7') }}</el-button>
        </el-col>
      </el-form-item>
    </el-form>

    <el-table :data="selectLogisticelist"
              style="width: 100%">
      <el-table-column :label="$t('distri.butor20')">
        <template slot-scope="scope"> {{ scope.row.commissionInfo ? scope.row.commissionInfo[0].realName:'' }} </template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor21')">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor22')">
        <template slot-scope="scope">{{ scope.row.commissionChildCount }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor23')">
        <template slot-scope="scope">{{ scope.row.memberBrandId }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor24')">
        <template slot-scope="scope">{{ scope.row.commissionInfo ? scope.row.commissionInfo[0].bankName:'' }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor25')">
        <template slot-scope="scope">{{ scope.row.commissionInfo ? scope.row.commissionInfo[0].account:'' }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor26')">
        <template slot-scope="scope">{{ scope.row.commissionInfo ? scope.row.commissionInfo[0].idCard:'' }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor27')">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 4">{{ $t('distri.x4') }}</span><span v-if="scope.row.status != 4">{{ $t('distri.x5') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor28')">
        <template slot-scope="scope">{{ scope.row.iSCSI }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor4')">
        <template slot-scope="scope">{{ scope.row.noMention }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor2')">
        <template slot-scope="scope">{{ scope.row.commissionUsedMoney }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor5')">
        <template slot-scope="scope">{{ scope.row.phoneNumber }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor29')">
        <template slot-scope="scope">{{ scope.row.recommendCommissionName }}</template>
      </el-table-column>

      <el-table-column :label="$t('distri.butor30')">
        <template slot-scope="scope">{{ scope.row.commissionNumber }}</template>
      </el-table-column>

      <el-table-column :label="$t('handle')">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1"
                     size="mini"
                     type="text"
                     @click="shenhe(scope.row)">{{ $t('distri.butor10') }}</el-button>
          <el-button size="mini"
                     type="text"
                     @click="gosearch(scope.row.memberBrandId,1)">{{ $t('distri.butor11') }}</el-button>
          <el-button size="mini"
                     type="text"
                     @click="gosearch(scope.row.memberBrandId,2)">{{ $t('distri.butor12') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>

    <!-- 审核 -->
    <el-dialog :title="$t('distri.x6')"
               :visible.sync="dialogVisible_kai"
               width="30%">
      <div>
        <el-form label-position="left"
                 size="mini"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item :label="$t('distri.x7')">
            <el-col :span="8">
              <el-input v-model="enterpriseName"
                        clearable />
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('distri.x8')">
            <div class="img-upload">
              <img v-if="backgroundUrl != null"
                   style="width:100%;"
                   :src="$fileUrl() + backgroundUrl">
              <div v-if="backgroundUrl == null"
                   class="upload-box">
                <i class="el-icon-plus logoIcon" />
              </div>
              <editorImage type="custom"
                           @successCBK="imageSuccessCBK" />
            </div>
            <div style="clear:both" />
          </el-form-item>

        </el-form>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button size="mini"
                   @click="dialogVisible_kai = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="tongguo()">{{ $t('distri.x9') }}</el-button>
      </span>
    </el-dialog>

  </d2-container>
</template>
<script>
import {
  cookieGet
} from '@/common/cookie'
import configUrl from '@/api/configUrl'
import editorImage from '@/components/Tinymce/components/editorImage'
import { commissionlist } from '@/api/distribution/distribution'
import { mapState } from "vuex";
export default {
  name: 'Distributor',
  components: { editorImage },
  data () {
    return {
      dialogVisible_kai: false,
      ruleForm: {
        nickname: '',
        phoneNumber: '',
        minTotal: '',
        maxTotal: '',
        minUsed: '',
        maxUsed: ''
      },
      selectLogisticelist: [],
      keyword: null,
      total: 0,
      currentPage: 1,
      enterpriseName: '',
      backgroundUrl: null,
      memberBrandId: '',
      ChannelId: ''
    }
  },
  computed: {
     ...mapState("d2admin/user", ["info"])
  },
  created () {
    // this.ChannelId = JSON.parse(cookieGet('Httpheader')).ChannelId
    // console.log(this.ChannelId, 'ChannelId===ChannelId')
    this.commissionlistInterface(1)
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    search () {
      this.commissionlistInterface(1)
    },
    clear () {
      this.ruleForm = {
        nickname: '',
        phoneNumber: '',
        minTotal: '',
        maxTotal: '',
        minUsed: '',
        maxUsed: ''
      }
      this.commissionlistInterface(1)
    },
    daochu () {
      window.open(configUrl.ajax_url + 'member/commission/export?channelId=' + this.info.ChannelId)
    },
    shenhe (item) {
      this.memberBrandId == item.memberBrandId
      this.dialogVisible_kai = true
    },
    handleCurrentChange (e) {
      this.commissionlistInterface(e)
    },
    // 分销商查询
    commissionlistInterface (page) {
      let url = 'page=' + page + '&size=10&channelId=' + this.info.ChannelId
      if (this.ruleForm.nickname) {
        url += '&nickname=' + this.ruleForm.nickname
      }
      if (this.ruleForm.minUsed && this.ruleForm.maxUsed) {
        if (this.ruleForm.minUsed - this.ruleForm.maxUsed >= 0) {
          this.$message.error(this.$t('distri.x3'))
          return
        } else {
          url += '&minUsed=' + this.ruleForm.minUsed
          url += '&maxUsed=' + this.ruleForm.maxUsed
        }
      }
      if (this.ruleForm.minUsed && !this.ruleForm.maxUsed) {
        url += '&minUsed=' + this.ruleForm.minUsed
      }
      if (!this.ruleForm.minUsed && this.ruleForm.maxUsed) {
        url += '&maxUsed=' + this.ruleForm.maxUsed
      }

      if (this.ruleForm.minTotal && this.ruleForm.maxTotal) {
        if (this.ruleForm.minTotal - this.ruleForm.maxTotal >= 0) {
          this.$message.error(this.$t('distri.x3'))
          return
        } else {
          url += '&minTotal=' + this.ruleForm.minTotal
          url += '&maxTotal=' + this.ruleForm.maxTotal
        }
      }

      if (this.ruleForm.minTotal && !this.ruleForm.maxTotal) {
        url += '&minTotal=' + this.ruleForm.minTotal
      }
      if (!this.ruleForm.minTotal && this.ruleForm.maxTotal) {
        url += '&maxTotal=' + this.ruleForm.maxTotal
      }

      if (this.ruleForm.phoneNumber) {
        url += '&phoneNumber=' + this.ruleForm.phoneNumber
      }
      this.selectLogisticelist = []
      commissionlist(url).then(res => {
        if (res.code === 0 && res.data) {
          this.total = res.data.count
          if (res.data.list && res.data.list.length > 0) {
            res.data.list.forEach((item) => {
              if (item.commissionInfo) {
                item.commissionInfo = JSON.parse(item.commissionInfo)
              }
            })
            this.selectLogisticelist = res.data.list
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 通过审核
    tongguo () {
      if (!this.enterpriseName) {
        this.$message.error(this.$t('distri.x10'))
        return
      }
      this.selectLogisticelist.forEach((item) => {
        if (item.memberBrandId == this.memberBrandId) {
          item.status == 0
        }
      })
      this.dialogVisible_kai = false
    },
    imageSuccessCBK (e) {
      this.backgroundUrl = e[0].url[0].url
    },
    gosearch (id, type) {
      this.$router.push({
        name: 'distribution.distributor.search',
        query: {
          id: id,
          type: type
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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

