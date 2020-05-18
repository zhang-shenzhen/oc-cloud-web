<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :model="ruleForm"
                 :rules="rules"
                 size="mini"
                 ref="ruleForm"
                 label-width="180px"
                 class="demo-ruleForm">
          <el-form-item class="form-sty"
                        :label="$t('commodity.sort.systematic')"
                        prop="categoryName">
            <el-input v-model="ruleForm.categoryName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="跳转参数"
                        v-if="cut == 2">
            <el-input v-model="ruleForm.categoryDescribe"></el-input> -->
          <!-- </el-form-item> -->
          <el-form-item class="form-sty"
                        :label="$t('commodity.sort.forder')">
            <el-input v-model="ruleForm.sort"
                      type="number"></el-input>
          </el-form-item>
          <el-form-item class="form-sty"
                        v-if="cut == '1' || type == '3' "
                        :label="unionTitle">
            <el-input v-model="ruleForm.unionCode"></el-input>
          </el-form-item>
          <el-form-item class="form-sty"
                        :label="$t('commodity.sort.images')"
                        prop="coverImg"
                        v-if="type == '0' || type == '3' ">
            <el-alert class="alert-sty"
                      size="mini"
                      :title="imagesTitle"
                      type="info"
                      :closable="false">
            </el-alert>
            <!-- 图片显示 -->
            <div v-if="ruleForm.coverImg.url">
              <div class="img_show">
                <div class="img_show_del"
                     @click="delImg(-1,1)">
                  <i class="el-icon-delete"></i>
                </div>
                <img style="width:100%;height:100%;"
                     :src="$fileUrl() + ruleForm.coverImg.url" />
              </div>
              <el-input style="width:160px"
                        placeholder="请输入链接值"
                        v-model="ruleForm.coverImg.sort"
                        clearable>
              </el-input>
            </div>

            <!-- 上传图片 -->
            <div v-if="!ruleForm.coverImg.url">
              <div class="upload_img"
                   @click="clickuloadImg(999,999)">
                <i class="el-icon-plus logoIcon" />
              </div>
            </div>
          </el-form-item>
          <el-form-item :label="$t('commodity.sort.banner')"
                        prop="imgUrl"
                        v-if="type == '0' || type == '1'">
            <el-alert class="alert-sty form-sty"
                      size="mini"
                      :title="bannerTitle"
                      type="info"
                      :closable="false">
            </el-alert>
            <div class="orderImg_box">
              <div style="display:flex;flex-wrap:wrap;margin-bottom:10px;"
                   v-if="ruleForm.imgUrl.length != 0">
                <div v-for="(item,index) in ruleForm.imgUrl"
                     :key="index">
                  <div class="img_show">
                    <div class="img_show_del"
                         @click="delImg(index,2)">
                      <i class="el-icon-delete"></i>
                    </div>
                    <img style="width:100%;height:100%;"
                         :src="$fileUrl() + item.url" />
                  </div>
                  <el-input class="img_show_input"
                            placeholder="请输入链接值"
                            v-model="item.sort"
                            clearable>
                  </el-input>
                </div>
              </div>
              <div class="img_upload"
                   v-if="ruleForm.imgUrl">
                <div class="upload_img"
                     @click="clickuloadImg(888,888)">
                  <i class="el-icon-plus logoIcon" />
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">{{$t('member.filter.keep')}}</el-button>
            <el-button @click="resetForm()">{{$t('cancel')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <editorImage ref="muchild"
                 :quanTity="quanTity"
                 urltype="default"
                 type="default-1"
                 @successCBK="imageSuccessCBK" />
  </div>
</template>
<script>
import { AddCategory, ClassificationDetails, EditCommodity } from '../../api/commodity/goods'
import editorImage from '../Tinymce/components/editorImage'
export default {
  name: 'SortEdit',
  components: { editorImage },
  props: {
    type: { // 你要屏蔽那个参数
      default: '0' //默认传过来的id为0，
    },
    routerId: {
      default: '0' //默认传过来的id为0, 小于0 为新增 大于等于0为编辑
    },
    routerType: {
      default: '1' // 默认传过的的是第0层，
    },
    cut: {
      default: '1' // 默认传过的的是第1层，
    }
  },
  data () {
    return {
      imagesTitle: '',
      bannerTitle: '',
      indexImg: 0,
      img: {
        url: './image/logo@2x.png',
        sort: ''
      },
      unionTitle: '编码',
      quanTity: 1,
      ruleForm: {
        id: 0,
        loading: true,
        parentId: 0, // 上级分类id，无上级分类则传0
        categoryName: '', // 分类名称
        categoryNickName: '', // 分类别名昵称
        categoryDescribe: '', // 分类的描述介绍
        sort: '', // 分类的排序，同级分类排序使用
        unionCode: '',
        coverImg: {},
        imgUrl: [],
        type: '' // 分类的类型，自定义使用
      },
      rules: {
        categoryName: [
          { required: true, message: this.$t('commodity.sort.pleaseClassification'), trigger: 'blur' },
        ],
        coverImg: [
          { required: true, message: this.$t('commodity.sort.pleaseImages'), trigger: 'change' }
        ],
        imgUrl: [
          { type: 'array', required: true, message: this.$t('commodity.sort.pleaseBanner'), trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  created () {
    /**
     * this.type
     * ==0 两个上传都显示
     * ==1 只显示banner上传
     * ==2 都不显示
     * ==3 只显示分类上传
     * this.routerId
     *  < 0 为新增
     *  >=0 为编辑
     * this.routerType  层级
     * ==0 一级
     * 有上级时传上级id
     * cut
     * ==1 普通
     * ==2 秒杀
     * ==1 品牌分类
     */
    console.log(this.type, this.cut, '父子组件')
    if (this.type == 1) {
      this.ruleForm.coverImg = this.img;
    }
    if (this.type == 3) {
      this.ruleForm.imgUrl = [{
        url: './image/logo@2x.png',
        sort: ''
      }]
    }
    if (this.routerId >= 0) {
      this.classificationDetailsInterface(this.routerId);
    }
    if (this.cut == 1) {
      this.unionTitle = '分类编码'
    } else if (this.cut == 3) {
      this.unionTitle = '品牌编码'
    }
    if (this.cut == 2) {
      this.imagesTitle = "建议上传图片宽度:240像素;高度:240像素";
      this.bannerTitle = "建议上传图片宽度:990像素;高度:500像素";
    } else {
      this.imagesTitle = "建议上传图片宽度:125像素;高度:125像素";
      this.bannerTitle = "建议上传图片宽度:600像素;高度:180像素";
    }
    this.ruleForm.type = this.cut;
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    classificationDetailsInterface (id) {
      // 查询分类详情接口
      ClassificationDetails({ id: id }).then(res => {
        if (res.code == 0) {
          let data = res.data;
          this.ruleForm = {
            id: data.id,
            loading: true,
            parentId: data.parentId,
            categoryName: data.categoryName,
            categoryNickName: data.categoryNickName,
            categoryDescribe: data.categoryDescribe,
            sort: data.sort,
            unionCode: data.unionCode,
            coverImg: {},
            imgUrl: [],
            type: ''
          }
          if (data.imgUrl) {
            this.judeImg(data.imgUrl);
          } else {
            this.ruleForm.coverImg = this.img;
            this.ruleForm.imgUrl = ['./image/logo@2x.png']
          }
        }
      })
    },
    // 判断图片回显
    judeImg (imgUrl) {
      let imgData = JSON.parse(imgUrl);
      if (this.type == 0) { // 两种上传都有;
        this.ruleForm.coverImg = imgData[imgData.length - 1];
        this.ruleForm.imgUrl = imgData.slice(0, imgData.length - 1)
      }
      if (this.type == 1) { // 只上传banner图
        this.ruleForm.coverImg = this.img;
        this.ruleForm.imgUrl = imgData;
      }
      if (this.type == 3) {
        this.ruleForm.coverImg = imgData[0];
        this.ruleForm.imgUrl = [{
          url: './image/logo@2x.png',
          sort: '',
        }]
      }

    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let option = JSON.parse(JSON.stringify(this.ruleForm))
          this.judge(option)
        } else {
          return false;
        }
      });
    },
    judge (option) {
      if (this.type == 0) { // 都上传
        option.imgUrl.push(option.coverImg);
        option.imgUrl = JSON.stringify(option.imgUrl);
      }
      if (this.type == 1) { // 只有banner;
        option.imgUrl = JSON.stringify(option.imgUrl);
      }
      if (this.type == 2) { // 都不上传
        option.imgUrl = [].join(",")
      }
      if (this.type == 3) { // 分类上传
        option.imgUrl = [];
        option.imgUrl.push(option.coverImg);
        option.imgUrl = JSON.stringify(option.imgUrl)
      }
      delete option.coverImg
      let uri;
      if (this.routerId < 0) { // 0为新增
        delete option.id
        option.parentId = this.routerType
        uri = AddCategory;
      } else {
        option.parentId = this.routerType
        uri = EditCommodity;
      }
      this.sortInterface(option, uri)
    },

    // 接口
    sortInterface (option, uri) {
      uri(option).then(res => {
        if (res.code == 0) {
          this.resetForm();
        }
      })
    },

    resetForm () {
      // 点击返回上一级
      this.$router.go(-1);//返回上一层
    },
    clickuloadImg (index, e) {
      // 点击上传图片显示弹框
      this.indexImg = index;
      if (e == 999) {
        this.quanTity = 1;
      } else {
        this.quanTity = 19
      }
      this.$refs.muchild.showModel(); // 显示上传图片弹框
    },
    imageSuccessCBK (e) {
      // 点击上传图片
      console.log(e, '上传图片')

      if (this.indexImg == 999) {
        this.ruleForm.coverImg = {
          url: e[0].url[0].url,
          sort: ''
        };
      } else if (this.indexImg == 888) {
        e.map(res => {
          this.ruleForm.imgUrl.push({
            url: res.url[0].url,
            sort: ''
          })
        })
      }
    },
    delImg (e, num) {
      // 点击删除图片
      if (num == 1) {
        this.ruleForm.coverImg = {};
      } else if (num == 2) {
        this.ruleForm.imgUrl.splice(e, 1)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.form-sty {
  width: 50%;
}
.el-form-item {
  .orderImg_box {
    display: flex;
    flex-wrap: wrap;
  }
  .img_show {
    width: 150px;
    height: 100px;
    display: flex;
    margin-right: 10px;
    margin-bottom: 10px;
    .img_show_del {
      width: 150px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      position: absolute;
      z-index: 9;
      display: none;
    }
  }
  .img_show_input {
    width: 160px;
    box-sizing: border-box;
    padding-right: 10px;
    margin-bottom: 10px;
  }
  .img_show:hover .img_show_del {
    background-color: rgba(0, 0, 0, 0.3);
    display: block;
    color: #f56c6c;
    cursor: pointer;
  }
  .upload_img {
    width: 100px;
    height: 100px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    .logoIcon {
      font-size: 40px;
      color: #dddddd;
      margin: 30px;
    }
  }
}
.alert-sty {
  margin-bottom: 10px;
}
.el-alert {
  padding: 0;
}
</style>

