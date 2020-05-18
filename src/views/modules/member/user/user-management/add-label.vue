<template>
  <div class="addLabel">
    <el-dialog
      :title="'打标签'"
      :visible.sync="_showType"
      :width="'80%'"
      close-on-click-modal
      :center="true"
      :show-close="false"
    >
      <div v-if="LMBshowType" class="s_flex">
        <div style="flex:2">菜单标签</div>
        <div style="flex:7">
          <div v-for="(item, index) in tags" :key="index" class="s_flex_item">
            <div style="flex:1">{{ item.tagGroupName }}</div>
            <el-radio
              v-for="(itm, idx) in item.menuTagList"
              :key="idx"
              v-model="radioIsSet"
              style="flex:1"
              :label="itm.id"
              >{{ itm.tagName }}</el-radio
            >
          </div>
        </div>
      </div>
      <el-divider v-if="LMBshowType" />
      <div class="s_flex">
        <div style="flex:2">非菜单标签</div>
        <div style="flex:7">
          <div v-for="(item, index) in tags" :key="index" class="s_flex_item">
            <div style="flex:1">{{ item.tagGroupName }}</div>
            <div style="flex:1">
              <el-checkbox
                v-for="(itm, idx) in item.unMenuTagList"
                :key="idx"
                v-model="itm.isSet"
                >{{ itm.tagName }}</el-checkbox
              >
            </div>
          </div>
        </div>
      </div>
      <el-divider />
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="_upSV(1)">确定</el-button>
        <el-button size="mini" @click="_upSV(2)">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { allsignLabel, alladdTags } from '@/api/member/member'
export default {
  components: {},
  props: {
    showType: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Array,
      default: function() {
        return []
      }
    },
    setItems: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      _showType: false,
      menuTag: null,
      radioIsSet: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this._showType = this.showType
    console.log('show')
    const tagscp = JSON.parse(JSON.stringify(this.tags))
    tagscp.forEach((d, idx) => {
      d.menuTagList.forEach((dd, index) => {
        dd.isSet = false
      })
      d.unMenuTagList.forEach((dd, index) => {
        dd.isSet = false
      })
    })
    this.$set(this, 'tags', tagscp)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 单选框
    radioChange(itm) {
      const that = this
      this.tags.forEach((d, idx) => {
        d.menuTagList.forEach((dd, index) => {
          if (itm.id == dd.id) {
            that.$set(that.tags[idx].menuTagList[index], 'isSet', true)
          } else {
            that.$set(that.tags[idx].menuTagList[index], 'isSet', false)
          }
        })
      })
    },
    /**
     * @description 提交数据
     */
    _upSV(type) {
      if (type == 1) {
        this.putAllsignLabel()
      } else {
        this.$emit('_upAddLabel', { type: type })
      }
    },
    // 打标签
    putAllsignLabel() {
      const setTags = []
      console.log('this.tags', this.tags)
      this.tags.map((d, idx) => {
        d.unMenuTagList.map(dd => {
          if (dd.isSet) setTags.push(dd.id)
        })
      })
      this.radioIsSet ? setTags.push(this.radioIsSet) : null
      const params = {
        channelFansIds: this.setItems.map(d => d.id),
        tagIds: setTags
      }
      return alladdTags(params).then(res => {
        console.log('打标签', res)
        if (res.code == 0) {
          this.$emit('_upAddLabel', { type: 1 })
          this._showType = false
          return true
        } else {
          // this.$emit("_upAddLabel", { type: type, });
          return false
        }
      })
    },
    setTag(t, v) {
      console.log(t, v)
    }
  }
}
</script>

<style lang="scss" scope>
.addLabel {
  .s_flex {
    display: flex;
    // border-bottom: 1px solid #888;
    padding: 20px;
    .s_flex_item {
      display: flex;
      flex: 7;
    }
  }
}
</style>
<style lang="scss">
.addLabel {
  .el-dialog__wrapper {
    .el-dialog {
    }
  }

  .el_fomr_label {
    line-height: 60px;
    font-size: 16px;
  }
  .el-form-item {
    .el-form-item__label {
      width: 100% !important;
      color: #000;
      text-align: left;
    }
    .el-form-item__content {
      margin-left: 0 !important;
      .el-select {
        width: 100%;
      }
      .el-radio-group {
        width: 100%;
      }
      label {
        // width: 50%;
        // display: block;
      }
    }
  }
}
</style>
