<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('wechat.reply.newMenuGroup') }}</h3>
    <el-row>
      <!-- 左侧 -->
      <el-col :span="8"
              :offset="3">
        <div class="menu-wrap">
          <div class="app-menu">
            <div class="sub-menu-list-wrap"></div>
            <div class="menu-list-wrap">
              <div class="one-level"
                   :class="{levelWidth : menuContent.button.length>1}"
                   v-for="(item,i) in  menuContent.button"
                   :key="i">
                <div class="two-level-wrap"
                     v-if="menu.menuIndex == i">
                  <div class="two-level-title"
                        :class="{menuSty : (subIndex== menu.subMenuIndex) && !menu.menuShow}"
                       v-for="(towLevel,subIndex) in item.sub_button"
                       :key="subIndex"
                       @click="subMenu(i,subIndex)">{{towLevel.name}}</div>
                  <div class="two-level-add"
                        v-if="item.sub_button.length != 5"
                       @click="addTwoMenuTitle(i)">+</div>
                </div>
                <div class="one-level-title"
                     :class="{menuSty : (i == menu.menuIndex) && menu.menuShow}"
                     @click="oneLevel(i)">{{item.name}}</div>
              </div>
              <div class="one-level-add"
                   :class="{levelWidth : menuContent.button.length>1}"
                   v-if="menuContent.button.length!=3"
                   @click="addOneMenu()">+</div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="10"
              :offset="1">
        <div class="right-flex">
          <div>
            <!-- 显示这个菜单组的名称↓ -->
            <div class="menu-group-name">
              <div>{{ menu.menuTitle }}</div>
              <div></div>
            </div>
            <el-alert v-if="menu.isSubMenu"
                      :title="$t('wechat.menu.des9')"
                      type="info"
                      :closable="false" />
            <div class="menu-centent">
              <div class="centent-input"
                   v-if="menu.menuShow">
                <div class="input-input">
                  <div class="input-title">菜单名称:</div>
                  <el-input :placeholder="$t('pla1')"
                            v-model="menuContent.button[menu.menuIndex].name"
                            size="small"
                            clearable />
                </div>
                <el-button type="text"
                           style="color:#F56C6C"
                           @click="deleteMenu()">{{$t('delete')}}</el-button>
              </div>
              <div class="content-submenu"
                   v-if="!menu.menuShow">
                <div class="input-input">
                  <div class="input-title">子菜单名称:</div>
                  <el-input :placeholder="$t('pla1')"
                            v-model="menuContent.button[menu.menuIndex].sub_button[menu.subMenuIndex].name"
                            size="small"
                            clearable />
                </div>
                <el-button type="text"
                           style="color:#F56C6C"
                           @click="deleteMenu()">{{$t('delete')}}</el-button>
              </div>
              <div class="menu-Reply"
                   v-if="!menu.isSubMenu">
                <div class=""
                     v-for="(item,index) in ReplyList"
                     :key="index">
                  <Reply :function-list="['文本','图片','图文','链接','小程序']"
                         :item-id="item.id"
                         :show-data="item.showData"
                         @getObj="getValue" />
                </div>
              </div>
            </div>
            <div class="menu-echo"
                 v-if="menu.isSubMenu">
              <div class="echo">
                <div v-if="menuContent.button[menu.menuIndex].triggerOperationItem.type == 1">
                  {{menuContent.button[menu.menuIndex].triggerOperationItem.value[0].text}}
                </div>
                <div v-if="menuContent.button[menu.menuIndex].triggerOperationItem.type == 2 || menuContent.button[menu.menuIndex].triggerOperationItem.type == 5 || menuContent.button[menu.menuIndex].triggerOperationItem.type == 6">
                  <img style="width:200px;height:200px;"
                       :src="$fileUrl() + menuContent.button[menu.menuIndex].triggerOperationItem.value[0].echoImg" />
                </div>
                <div v-if="menuContent.button[menu.menuIndex].type == 'view'">
                  链接： {{menuContent.button[menu.menuIndex].url}}
                </div>
                <div v-if="menuContent.button[menu.menuIndex].type == 'miniprogram'">
                  <div>pagePath:{{menuContent.button[menu.menuIndex].pagepath}}</div>
                  <div>appId:{{menuContent.button[menu.menuIndex].appid}}</div>
                  <div>URL:{{menuContent.button[menu.menuIndex].url}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="menu-btn">
            <el-button size="mini"
                       type="primary"
                       @click="keepVersion">{{$t('wechat.menu.btn3')}}</el-button>
            <el-button size="mini"
                       @click="getBack">{{$t('wechat.menu.btn4')}}</el-button>
          </div>
        </div>

      </el-col>
    </el-row>
    <el-dialog :title="$t('wechat.menu.des12')"
               width="40%"
               :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item v-if="menu.individuation"
                      label-width="120px">
          <el-select v-model="menuContent.matchrule.tagId"
                     style="width:76%"
                     size="small"
                     clearable
                     :placeholder="$t('pla2')"
                     @change="getTag($event)">
            <el-option v-for="item in tagList"
                       :key="item.tagId"
                       :label="item.name"
                       :value="item.tagId" />
          </el-select>
        </el-form-item>
        <el-form-item style="margin:20px 0 20px 120px">
          <el-input v-model="menuContent.wechatMenuVersion.remark"
                    :placeholder="$t('wechat.menu.tab6')"
                    autocomplete="off"
                    clearable
                    size="small"
                    style="width:76%" />
        </el-form-item>
        <el-form-item label-width="120px">
          <el-input v-model="menuContent.wechatMenuVersion.versionNumber"
                    :placeholder="$t('wechat.menu.des13')"
                    autocomplete="off"
                    clearable
                    size="small"
                    style="width:76%" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   type="primary"
                   @click="keepRelease">{{$t('wechat.menu.btn5')}}</el-button>
        <el-button size="mini"
                   @click="addMenu">{{$t('wechat.menu.btn6')}}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
import Reply from "@/components/reply";
import {
  TagNoPage,
  AddMenuUsb,
  MenuRelease,
  MenuDetail
} from "@/api/wechat/menus";
import {
  surbanajurong_TagNoPage,
  surbanajurong_AddMenuUsb,
  surbanajurong_MenuRelease,
  surbanajurong_MenuDetail
} from "@/api/surbanajurong/wechat/menus";
export default {
  components: { Reply },
  data () {
    return {
      API: {},
      dialogFormVisible: false,
      menu: { // 此对象里面的参数为判断所用
        menuTitle: '菜单组', // 放置菜单组的名称(路由带过来的)
        isSubMenu: false, // 判断它是否创建了子菜单(子菜单为true)
        menuIndex: 0, // 记录点击的是第几个一级菜单
        subMenuIndex: 0, // 记录点击的是第几个子菜单
        menuShow: true, // 用来判断你现在点击的是几级菜单(一级true 二级false)
        individuation: "",
      },
      menuContent: { // 给后台传过去的对象
        menuGroupId: null,
        individuation: true,
        enable: false,
        button: [],
        matchrule: {
          tag_id: null,
          tagId: null,
          tagName: null
        },
        wechatMenuVersion: {
          remark: '',
          versionNumber: ''
        }
      },
      menu_item: { // 新增一级菜单的初始值(刚进页面的时候只一个)
        type: 'click',
        name: '新建菜单',
        triggerOperationItem: {
          type: 1,
          value: [{ text: "" }]
        },
        sub_button: []
      },
      ReplyList: [{
        id: 1,
        getVal: {},
        showData: {}
      }],
      tagList: [] /** 标签参数 */
    }
  },
  computed: {},
  created () {
    this.menuContent.button.push(this.menu_item);
    if (this.$route.query.projectName == "product") {
      this.API = {
        TagNoPage: TagNoPage,
        AddMenuUsb: AddMenuUsb,
        MenuRelease: MenuRelease,
        MenuDetail: MenuDetail
      };
    } else if (this.$route.query.projectName == "surbanajurong") {
      this.API = {
        TagNoPage: surbanajurong_TagNoPage,
        AddMenuUsb: surbanajurong_AddMenuUsb,
        MenuRelease: surbanajurong_MenuRelease,
        MenuDetail: surbanajurong_MenuDetail
      };
    }
    // 路由跳转过来后带来的菜单组名称
    this.menu.menuTitle = this.$route.query.title;
    this.menu.individuation = this.$route.query.individuation;
    this.menuContent.menuGroupId = this.$route.query.id;
    this.menuContent.individuation = this.$route.query.individuation;
    // if (this.$route.query.currentVersionId) {
    //   this.menuDetailInterface(this.$route.query.currentVersionId);
    // }
    this.tagNoPageInterface();
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    tagNoPageInterface () {
      // 获取标签接口
      this.API.TagNoPage({
        menuTag: true
      }).then(res => {
        if (res.code == 0) {
          console.log("标签", res);
          this.tagList = res.data;
        }
      });
    },
    addOneMenu () {
      // 点击新增一级菜单
      let menu_item = { 'type': 'click', 'name': '新建菜单', "triggerOperationItem": { "type": 1, "value": [{ "text": "" }] }, 'sub_button': [] };
      this.menuContent.button.push(menu_item); // 每次点击新增一级菜单的时候就添加一个 (不大于3个)
      // 记录现在是第几个是选中状态↓(仅限一级菜单)
      this.menu.menuIndex = this.menuContent.button.length - 1;
      this.menu.menuShow = true; // 点击新增一级菜单时为true(默认选中状态)
      console.log(this.menuContent.button, '新增一级菜单内容=====')
      // 你每次点击新增一级菜单的时候文本框里的内容清空↓
      this.ReplyList = [{
        id: 1,
        getVal: {},
        showData: {}
      }];
      // false时为下方没有子菜单
      this.menu.isSubMenu = false;
    },
    subMenu (i, type) {
      // 你点击第
      console.log(i, type, '点击==点击')
      this.menu.subMenuIndex = type; // 选中你点击的第i个下面的第type个子菜单
      this.menu.menuShow = false;
      this.menu.isSubMenu = false;
      this.echoMenu(this.menuContent.button[i].sub_button[type]);
    },
    addTwoMenuTitle (i) {
      // 点击新增子菜单
      if (this.menuContent.button[i].sub_button.length > 4) { // 每组子菜单最多为5个
        return;
      }
      let menu_item = { 'type': 'click', 'name': '子菜单', "triggerOperationItem": { "type": 1, "value": [{ "text": "" }] } };
      this.menuContent.button[i].sub_button.push(menu_item); // 往第i个一级菜单里面的sub_button数组里新增一个对象
      // 记录点击的是第i个子菜单↓
      this.menu.subMenuIndex = this.menuContent.button[i].sub_button.length - 1;
      this.menu.menuShow = false; // 点击新增子菜单的时候为false;
      this.ReplyList = [{
        id: 1,
        getVal: {},
        showData: {}
      }];
      this.menu.isSubMenu = false;
    },
    oneLevel (i) { // 你点击了第i个一级菜单
      console.log(i, '你点击一级菜单====')
      // 记录你点击第i个一级菜单,同时
      this.menu.menuIndex = i;
      this.menu.subMenuIndex = 0; // 每次点击一级菜单的时候子菜单默认选择第0个;
      this.menu.menuShow = true; // 点击一级菜单的时候为true
      // false时为下方没有子菜单↓
      this.menuContent.button[i].sub_button.length == 0 ? this.menu.isSubMenu = false : this.menu.isSubMenu = true
      // 当你点击一级菜单的时候清空文本框内容↓
      this.ReplyList = [{
        id: 1,
        getVal: {},
        showData: {}
      }];
      this.echoMenu(this.menuContent.button[i])
    },
    echoMenu (option) {
      console.log(option, '======点击了第i个的所有参数')
      let obj = JSON.parse(JSON.stringify(option))
      this.ReplyList = [];
      const showData = {
        type: 1,
        value: [{
          id: "",
          url: "",
          text: "",
          title: "",
          appId: "",
          pagePath: "",
          localUrl: ""
        }]
      };
      if (obj.triggerOperationItem.type == 1) {
        showData.value[0].text = obj.triggerOperationItem.value[0].text;
      }
      if (obj.triggerOperationItem.type == 2) {
        showData.type = obj.triggerOperationItem.type;
        showData.value[0].id = obj.triggerOperationItem.value[0].image;
        showData.value[0].localUrl = obj.triggerOperationItem.value[0].echoImg;
      }
      if (
        obj.triggerOperationItem.type == 6 ||
        obj.triggerOperationItem.type == 5
      ) {
        showData.type = obj.triggerOperationItem.type;
        showData.number = obj.triggerOperationItem.type;
        showData.value[0].id = obj.triggerOperationItem.value[0].news;
        showData.value[0].localUrl = obj.triggerOperationItem.value[0].echoImg;
        showData.value[0].wechatMaterialNewsItemList = [
          {
            localThumbUrl: obj.triggerOperationItem.value[0].echoImg
          }
        ];
      }
      if (obj.type == "view") {
        showData.type = 8;
        showData.value[0].url = obj.url;
      }
      if (obj.type == "miniprogram") {
        showData.type = 9;
        showData.value[0].pagePath = obj.url;
        showData.value[0].title = obj.pagepath;
        showData.value[0].appId = obj.appid;
        showData.value[0].localUrl = "";
        showData.value[0].mediaId = "";
        showData.value[0].id = "";
      }
      const options = {
        id: 1,
        getVal: {},
        showData: showData
      };
      this.ReplyList.push(options);
    },
    getValue (e) {
      // 2==图片 6==图文 5==高级图文
      //  this.menu.menuShow true 为一级标签 false 为二级标签
      console.log(e, this.menu.menuShow, "你点击了第",
        this.menu.menuIndex,
        "个的第",
        this.menu.subMenuIndex,
        "个子菜单")
      if (this.menu.menuShow) {
        this.menuContent.button[this.menu.menuIndex].triggerOperationItem = {
          type: 1,
          value: [{ text: "" }]
        };
        this.menuContent.button[this.menu.menuIndex].url = "";
        this.menuContent.button[this.menu.menuIndex].appid = "";
        this.menuContent.button[this.menu.menuIndex].pagepath = "";
      } else {
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].type = "";
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].url = "";
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].appid = "";
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].pagepath = "";
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].triggerOperationItem = {};
      }
      this.judgeAssignment(e);
    },
    judgeAssignment (obj) {
      if (obj.action == '文本' && this.menu.menuShow) {
        this.menuContent.button[this.menu.menuIndex].triggerOperationItem = {
          type: 1,
          value: [{ text: obj.info }]
        };
      } else if (obj.action == '文本' && !this.menu.menuShow) {
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].triggerOperationItem = { type: 1, value: [{ text: obj.info }] };
      }
      if (obj.action == '图片' && this.menu.menuShow) {
        this.menuContent.button[this.menu.menuIndex].triggerOperationItem = {
          type: 2,
          value: [{ image: obj.id, echoImg: obj.localUrl }]
        };
      } else if (obj.action == '图片' && !this.menu.menuShow) {
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].triggerOperationItem = {
            type: 2,
            value: [{ image: obj.id, echoImg: obj.localUrl }]
          };
      }
      if (obj.action == '图文' && this.menu.menuShow) {
        let num = obj.number; // ==1 为图文 type=6; ==2时为高级图文type=5
        this.menuContent.button[this.menu.menuIndex].triggerOperationItem = {
          type: num == 1 ? 6 : 5,
          value: [{
            news: obj.id,
            echoImg: obj.wechatMaterialNewsItemList[0].localThumbUrl
          }]
        };
      } else if (obj.action == '图文' && !this.menu.menuShow) {
        let num = obj.number;
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].triggerOperationItem = {
            type: num == 1 ? 6 : 5,
            value: [{
              news: obj.id,
              echoImg: obj.wechatMaterialNewsItemList[0].localThumbUrl
            }]
          };
      }
      if (obj.action == "链接" && this.menu.menuShow) {
        this.menuContent.button[this.menu.menuIndex].type = "view";
        this.menuContent.button[this.menu.menuIndex].url = obj.url;
        this.menuContent.button[
          this.menu.menuIndex
        ].triggerOperationItem = {};
      } else if (obj.action == "链接" && !this.menu.menuShow) {
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].type = "view";
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].url = obj.url;
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].triggerOperationItem = {};
      }
      if (obj.action == "小程序" && this.menu.menuShow) {
        this.menuContent.button[this.menu.menuIndex].type = "miniprogram";
        this.menuContent.button[this.menu.menuIndex].url = obj.url;
        this.menuContent.button[this.menu.menuIndex].appid = obj.appId;
        this.menuContent.button[this.menu.menuIndex].pagepath = obj.title;
        this.menuContent.button[
          this.menu.menuIndex
        ].triggerOperationItem = {};
      } else if (obj.action == "小程序" && !this.menu.menuShow) {
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].type = "miniprogram";
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].url = obj.url;
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].appid = obj.appId;
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].pagepath = obj.title;
        this.menuContent.button[this.menu.menuIndex].sub_button[
          this.menu.subMenuIndex
        ].triggerOperationItem = {};
      }
      console.log(this.menuContent.button, '填写的====')
    },
    keepVersion () {
      // 点击保存并设置版本号
      console.log(this.menuContent.button, '点击保存======')
      this.dialogFormVisible = true;
    },
    getBack () {
      // 点击返回
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-wrap {
  overflow: hidden;
  font-size: 18px;
  .app-menu {
    border: 1px solid #ccc;
    padding: 0;
    .sub-menu-list-wrap {
      height: 580px;
      position: relative;
    }
    .menu-list-wrap {
      margin-left: -1px;
      .one-level {
        width: 50%;
        text-align: center;
        float: left;
        position: relative;
        .two-level-wrap {
          width: 100%;
          position: absolute;
          bottom: 50px;
          left: 0;
          .two-level-title {
            width: 100%;
            height: 40px;
            line-height: 40px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-bottom: 0;
          }
          .two-level-add {
            width: 100%;
            height: 40px;
            line-height: 40px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-bottom: 0;
          }
        }
        .one-level-title {
          width: 100%;
          height: 50px;
          line-height: 50px;
          box-sizing: border-box;
          border: 1px solid #ccc;
        }
      }
      .one-level-add {
        width: 50%;
        height: 50px;
        line-height: 50px;
        float: left;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #ccc;
      }
      .levelWidth {
        width: 33.33333333333%;
      }
    }
  }
}
.menuSty {
  background-color: #409eff;
  color: #fff;
}
.menu-group-name {
  overflow: hidden;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
.menu-centent {
  .centent-input,
  .content-submenu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    .input-input {
      display: flex;
      align-items: center;
      width: 70%;
      .input-title {
        width: 20%;
      }
    }
  }
  .menu-Reply {
    margin-top: 10px;
  }
}
.right-flex {
  width: 100%;
  height: 630px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

