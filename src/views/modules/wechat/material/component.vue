<template>
  <d2-container class="page">
    <!-- <h3 class="list-title">{{ $t('wechat.material.management') }}</h3> -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!-- 图文消息 -->
      <el-tab-pane :label="$t('material.tab1')" name="first">
        <div v-if="activeName == 'first'" class="box">
          <imageText :projectName="projectName" />
        </div>
      </el-tab-pane>
      <!-- 高级图文 -->
      <el-tab-pane :label="$t('material.tab2')" name="second">
        <div v-if="activeName == 'second'" class="box">
          <advancedImageText :projectName="projectName" />
        </div>
      </el-tab-pane>
      <!-- 图片 -->
      <el-tab-pane :label="$t('material.tab3')" name="third">
        <div v-if="activeName == 'third'" class="box">
          <imagePic :projectName="projectName" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </d2-container>
</template>
<script>
import imageText from "./image-text";
import advancedImageText from "./advanced-image-text";
import imagePic from "./image-pic";

export default {
  name: "Material",
  components: { imageText, advancedImageText, imagePic },
  props: {
    type: {
      type: String,
      default: "0"
    },
    projectName:{
       type: String,
       default: "product"
    }
  },
  data() {
    return {
      activeName: "first"
    };
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    init() {
      if (this.type == "0") {
        if (!this.$isNull(localStorage.getItem("imagesText_activeName"))) {
          this.activeName = localStorage.getItem("imagesText_activeName");
        }
      }else if (this.type == "1") {
        this.activeName = 'first'
      }else if (this.type == "2") {
        this.activeName = 'second'
      }else if (this.type == "3") {
        this.activeName = 'third'
      }
    },
    handleClick(e) {
      if (this.type == "0") {
        localStorage.setItem("imagesText_activeName", this.activeName);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  margin-top: 10px;
}
</style>

