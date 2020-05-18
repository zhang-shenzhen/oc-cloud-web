<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('wechat.reply.newMenuGroup') }}</h3>
    <el-row>
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
        <!-- <div class="bg-purple-dark">
          <div class="one-level">
            <div v-for="(item,index) in menuContent.button"
                 :key="index"
                 class="level two-level">
              <div class="two-level-title"
                   @click="oneLevel(index)">{{ item.name }}</div>
              <div v-if="menu.menuIndex == index"
                   class="two-level-wrap">
                <div class="level two-level-add"
                     @click="addTwoMenuTitle(index)">+</div>
                <div v-for="(itm,ind) in item.sub_button"
                     :key="ind"
                     class="level two-level-title"
                     @click="subMenu(index,ind)">{{ itm.name }}</div>
              </div>
            </div>
            <div v-if="menuContent.button.length!=3"
                 class="level"
                 @click="addOneMenu()">+</div>
          </div>
        </div> -->
      </el-col>
      <el-col :span="10"
              :offset="1">
        <div class="menu-group-name">
          <div style="float: left">{{ menu.menuTitle }}</div>
          <div @click="deleteMenu()">{{$t('delete')}}</div>
        </div>
        <el-alert v-if="!menu.isOneLevelNoSub && !menu.isSubMenu"
                  :title="$t('wechat.menu.des9')"
                  type="info"
                  :closable="false" />
        <div>
          <el-col v-if="!menu.isSubMenu"
                  :span="24">
            <div class="menu-centent">
              <div class="pull-left"
                   style="line-height: 30px;">{{$t('wechat.menu.des10')}}</div>
              <el-input v-model="menuContent.button[menu.menuIndex].name"
                        style="width:60%; margin-bottom: 20px;"
                        :placeholder="$t('pla1')"
                        size="small"
                        clearable />
            </div>
            <div v-if="menu.isOneLevelNoSub">
              <div v-for="(item,index) in ReplyList"
                   :key="index">
                <Reply :function-list="['文本','图片','图文','链接','小程序']"
                       :item-id="item.id"
                       :show-data="item.showData"
                       @getObj="getValue" />
              </div>
            </div>
            <div class="menu-dis"
                 v-if="!menu.isOneLevelNoSub">
              <div v-if="menuContent.button[menu.menuIndex].triggerOperationItem.type == 1">
                文本：{{menuContent.button[menu.menuIndex].triggerOperationItem.value[0].text}}
              </div>
              <div v-if="menuContent.button[menu.menuIndex].triggerOperationItem.type == 2 || menuContent.button[menu.menuIndex].triggerOperationItem.type == 5 || menuContent.button[menu.menuIndex].triggerOperationItem.type == 6">
                <img style="width:200px;height:200px;"
                     :src="$fileUrl() + menuContent.button[menu.menuIndex].triggerOperationItem.value[0].echoImg" />
              </div>
              <div v-if="menuContent.button[menu.menuIndex].type == 'view'">
                链接： {{menuContent.button[menu.menuIndex].url}}
              </div>
              <div v-if="menuContent.button[menu.menuIndex].type == 'miniprogram'">
                <div>
                  <span class="small-span">pagePath:</span>
                  {{menuContent.button[menu.menuIndex].pagepath}}</div>
                <div style="margin:10px 0;">
                  <span class="small-span">appId:</span>
                  {{menuContent.button[menu.menuIndex].appid}}</div>
                <div>
                  <span class="small-span">URL:</span>
                  {{menuContent.button[menu.menuIndex].url}}</div>
              </div>
            </div>
          </el-col>
          <el-col v-if="menu.isSubMenu"
                  :span="24">
            <div class="pull-left"
                 style="margin-top:10px;">{{$t('wechat.menu.des11')}}</div>
            <el-input v-model="menuContent.button[menu.menuIndex].sub_button[menu.subMenuIndex].name"
                      style="width:60%;margin-bottom: 20px;"
                      :placeholder="$t('pla1')"
                      clearable
                      size="small" />
            <div v-for="(item,index) in ReplyList"
                 :key="index">
              <Reply :function-list="['文本','图片','图文','链接','小程序']"
                     :item-id="item.id"
                     :show-data="item.showData"
                     @getObj="getValue" />
            </div>
          </el-col>
          <el-col :span="24"
                  style="margin-top:20px;" />
        </div>
        <el-button size="mini"
                   type="primary"
                   @click="keepVersion">{{$t('wechat.menu.btn3')}}</el-button>
        <el-button size="mini"
                   @click="getBack">{{$t('wechat.menu.btn4')}}</el-button>
      </el-col>
    </el-row>
    <el-dialog :title="$t('wechat.menu.des12')"
               width="40%"
               :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item v-if="menu.individuation"
                      :label-width="formLabelWidth">
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
        <el-form-item :label-width="formLabelWidth">
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
  name: "menuAdd",
  components: { Reply },

  data () {
    return {
      API: {},
      menu: {
        menuTitle: "",
        individuation: "",
        isSubMenu: false,
        isOneLevelNoSub: true,
        name: "",
        menuShow: true, // 用来判断你现在点击的是几级菜单(一级true 二级false)
        menuIndex: 0 /** 用来记录你点击的是第几个菜单 */,
        subMenuIndex: -1 /** ==-1时说明你点击的是一级菜单 */,
        number: 0
      },
      menuContent: {
        menuGroupId: null /** f放置id */,
        individuation: true /** 放置传来的individuation值 */,
        enable: false /** 放置传来的enable值 */,
        button: [
          {
            type: "click",
            name: "新建菜单",
            url: "",
            appid: "",
            pagepath: "",
            // wechatMaterialNewsItemList: [],
            triggerOperationItem: { type: 1, value: [{ text: "" }] },
            sub_button: []
          }
        ] /** 你创建的菜单 */,
        matchrule: {
          tag_id: null,
          tagId: null,
          tagName: null
        },
        wechatMenuVersion: {
          remark: "",
          versionNumber: ""
        }
      },
      ReplyList: [
        {
          id: 1,
          getVal: {},
          showData: {}
        }
      ],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      tagList: [] /** 标签参数 */
    };
  },
  computed: {},
  created () {
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

    console.log("123456543", this.$route.query);
    // 获取路由跳转的参数↓
    this.menu.menuTitle = this.$route.query.title;
    this.menu.individuation = this.$route.query.individuation;
    this.menuContent.menuGroupId = this.$route.query.id;
    this.menuContent.individuation = this.$route.query.individuation;

    if (this.$route.query.currentVersionId) {
      this.menuDetailInterface(this.$route.query.currentVersionId);
    }

    this.tagNoPageInterface();
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    menuDetailInterface (id) {
      // 获取详情 接口
      console.log(id, "idididididididid");
      this.API.MenuDetail({ id: id }).then(res => {
        if (res.code == 0) {
          console.log("获取详情", res);
          const echo = res.data;
          this.menuContent.menuGroupId = echo.menuGroupId;
          this.menuContent.enable = echo.enable;
          this.menuContent.wechatMenuVersion = {
            remark: echo.remark,
            versionNumber: echo.versionNumber
          };
          if (echo.wechatMenuList) {
            let list = [];
            list = this.showData(echo.wechatMenuList, list, 1);
            this.menuContent.button = list;
            console.log(this.menuContent.button, '-===回显')
            this.menuContent.button[this.menu.menuIndex].sub_button.length == 0
              ? (this.menu.isOneLevelNoSub = true)
              : (this.menu.isOneLevelNoSub = false);
          }
        }
      });
    },
    showData (wechatMenuList, list, type) {
      wechatMenuList.map((val, index) => {
        let option = {
          type: "click",
          name: val.name,
          url: "",
          appid: "",
          pagepath: "",
          // wechatMaterialNewsItemList: [],
          triggerOperationItem: { type: 1, value: [{ text: "" }] },
          sub_button: []
        };
        if (val.operation) {
          if (val.operation.operationItems) {
            option.triggerOperationItem = val.operation.operationItems[0]
          }
        }
        if (type == 1) {
          list.push(option)
        } else {
          list.sub_button.push(option);
        }
        if (val.subMenuList && val.subMenuList.length > 0) {
          this.showData(val.subMenuList, list[index], 2)
        }
      });
      return list;
    },
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
    getTag (e) {
      // 选择标签
      this.tagList.map(res => {
        if (this.menuContent.matchrule.tagId == res.tagId) {
          this.menuContent.matchrule.tag_id = res.id;
          this.menuContent.matchrule.tagId = res.tagId;
          this.menuContent.matchrule.tagName = res.name;
        }
      });
    },
    deleteMenu () {
      // 删除菜单
      console.log(this.menu.menuIndex);
      console.log(this.menuContent.button, this.menu.menuIndex);
      /** ==-1时删除的是父级菜单↓ */
      if (this.menu.subMenuIndex == -1) {
        this.menuContent.button.splice(this.menu.menuIndex, 1);
        if (this.menu.menuIndex <= 0) {
          this.addOneMenu(); /** 当它为最后一个的时候就新增一个 */
        } else {
          // 当你删除一级菜单的时候 <= 0 时只用来选中效果
          this.oneLevel(
            this.menu.menuIndex - 1
          ); /** 你删除了一个一级菜单后有一个选中效果 */
        }
      } else {
        this.menuContent.button[this.menu.menuIndex].sub_button.splice(
          this.menu.subMenuIndex,
          1
        );
        /** 当发现你已经把子菜单全部删除完了之后↓ */
        if (this.menu.subMenuIndex <= 0) {
          this.oneLevel(this.menu.menuIndex);
        } else {
          this.subMenu(this.menu.menuIndex, this.menu.subMenuIndex - 1);
        }
      }
    },
    addOneMenu () {
      // 新建一级菜单
      this.ReplyList = [
        {
          id: 1,
          getVal: {},
          showData: {}
        }
      ];
      this.menu.menuShow = true; // 点击新增一级菜单时为true(默认选中状态)
      /** 为false的时候右边栏显示的是父菜单参数 */
      this.menu.isSubMenu = false;
      const menu_item = {
        // 每次点击新增一级菜单的时候增加的内容↓
        type: "click",
        name: "新建菜单",
        url: "",
        appid: "",
        pagepath: "",
        // wechatMaterialNewsItemList: [],
        triggerOperationItem: { type: 1, value: [{ text: "" }] },
        sub_button: []
      };
      this.menuContent.button.push(menu_item);
      /** 你点击新增的时候只显示你新增的那条数据显示 ↓*/
      this.menu.menuIndex = this.menuContent.button.length - 1;
      console.log(this.menu.menuIndex);
      this.menu.subMenuIndex = -1;
      this.menuContent.button[this.menu.menuIndex].sub_button.length == 0
        ? (this.menu.isOneLevelNoSub = true)
        : (this.menu.isOneLevelNoSub = false);
    },
    addTwoMenuTitle (i) {
      // 新建二级菜单
      this.menu.menuShow = false; // 点击新增子菜单的时候为false;
      this.ReplyList = [{
        id: 1,
        getVal: {},
        showData: {}
      }];
      /** 为true的时候右边栏显示的是子菜单参数 */
      this.menu.isSubMenu = true;
      if (this.menuContent.button[i].sub_button.length > 4) {
        // 最多创建5个二级菜单
        return;
      }
      // 每次点击新增二级菜单的时候增加的内容↓
      const menu_item = {
        type: "click",
        name: "子菜单",
        url: "",
        appid: "",
        pagepath: "",
        // wechatMaterialNewsItemList: [],
        triggerOperationItem: { type: 1, value: [{ text: "" }] }
      };
      this.menuContent.button[i].sub_button.push(menu_item);
      /** 你每次点击一次新增焦点就落入你新增的这个参数上面↓*/
      this.menu.subMenuIndex = this.menuContent.button[i].sub_button.length - 1;
    },
    oneLevel (i) {
      // 你点击的是哪个一级菜单
      /** 为false的时候右边栏显示的是父菜单参数 */
      this.menu.isSubMenu = false;
      this.menu.menuShow = true; // 点击一级菜单的时候为true
      this.menu.menuIndex = i;
      this.menu.subMenuIndex = -1;
      /** 当父级下有子菜单的时候只显示名称 */
      this.menuContent.button[i].sub_button.length == 0
        ? (this.menu.isOneLevelNoSub = true)
        : (this.menu.isOneLevelNoSub = false);
      console.log("你点击了第", i, "个");
      this.echoMenu(this.menuContent.button[i]);
      // /**回显问题 */
      console.log("回显", this.menuContent.button[i]);
    },
    echoMenu (obj) {
      this.ReplyList = [];
      const showData = {
        type: 1,
        value: [
          {
            id: "",
            url: "",
            text: "",
            title: "",
            appId: "",
            pagePath: "",
            localUrl: ""
          }
        ]
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
      const option = {
        id: 1,
        getVal: {},
        showData: showData
      };
      this.ReplyList.push(option);
    },

    subMenu (i, num) {
      // 你点击的是哪个二级菜单
      /** 为true的时候显示子菜单数据 */
      this.menu.isSubMenu = true;
      this.menu.menuShow = false;
      console.log("你点击了第", i, "个的第", num, "个子菜单");
      this.menu.menuIndex = i;
      this.menu.subMenuIndex = num;
      this.echoMenu(this.menuContent.button[i].sub_button[num]);
      console.log('我用来回显的数据', this.menuContent.button[i].sub_button[num])
    },

    getValue (e) {
      // 2==图片 6==图文 5==高级图文   this.menu.subMenuIndex = -1 时你点击的是一级菜单
      console.log(e);
      // 置空↓
      if (this.menu.subMenuIndex == -1) {
        this.menuContent.button[this.menu.menuIndex].triggerOperationItem = {
          type: 1,
          value: [{ text: "" }]
        };
        this.menuContent.button[this.menu.menuIndex].url = "";
        this.menuContent.button[this.menu.menuIndex].appid = "";
        this.menuContent.button[this.menu.menuIndex].pagepath = "";
      }
      this.judgeAssignment(e);

      console.log(
        "你点击了第",
        this.menu.menuIndex,
        "个的第",
        this.menu.subMenuIndex,
        "个子菜单"
      );
    },
    judgeAssignment (obj) {
      // 判断赋值
      console.log(obj,this.menu.menuIndex,this.menu.subMenuIndex, "objobjobjobj");
      if (obj.action == "文本") {
        if (this.menu.subMenuIndex == -1) {
          this.menuContent.button[this.menu.menuIndex].triggerOperationItem = {
            type: 1,
            value: [{ text: obj.info }]
          };
        } else {
          this.menuContent.button[this.menu.menuIndex].sub_button[
            this.menu.subMenuIndex
          ].triggerOperationItem = { type: 1, value: [{ text: obj.info }] };
        }
      }
      if (obj.action == "图片") {
        if (this.menu.subMenuIndex == -1) {
          this.menuContent.button[this.menu.menuIndex].triggerOperationItem = {
            type: 2,
            value: [{ image: obj.id, echoImg: obj.localUrl }]
          };
        } else {
          this.menuContent.button[this.menu.menuIndex].sub_button[
            this.menu.subMenuIndex
          ].triggerOperationItem = {
            type: 2,
            value: [{ image: obj.id, echoImg: obj.localUrl }]
          };
        }
      }
      if (obj.action == "图文") {
        // obj.number == 1为图文上传 obj.number == 2为高级图文上传
        if (obj.number == 1 && this.menu.subMenuIndex == -1) {
          this.menuContent.button[this.menu.menuIndex].triggerOperationItem = {
            type: 6,
            value: [
              {
                news: obj.id,
                echoImg: obj.wechatMaterialNewsItemList[0].localThumbUrl
              }
            ]
          };
        } else if (obj.number == 1 && this.menu.subMenuIndex != -1) {
          this.menuContent.button[this.menu.menuIndex].sub_button[
            this.menu.subMenuIndex
          ].triggerOperationItem = {
            type: 6,
            value: [
              {
                news: obj.id,
                echoImg: obj.wechatMaterialNewsItemList[0].localThumbUrl
              }
            ]
          };
        }
        if (obj.number == 2 && this.menu.subMenuIndex == -1) {
          this.menuContent.button[this.menu.menuIndex].triggerOperationItem = {
            type: 5,
            value: [
              {
                news: obj.id,
                echoImg: obj.advancedNewsItemList[0].picUrl
              }
            ]
          };
        } else if (obj.number == 2 && this.menu.subMenuIndex != -1) {
          this.menuContent.button[this.menu.menuIndex].sub_button[
            this.menu.subMenuIndex
          ].triggerOperationItem = {
            type: 5,
            value: [
              {
                news: obj.id,
                echoImg: obj.advancedNewsItemList[0].picUrl
              }
            ]
          };
        }
      }
      if (obj.action == "链接") {
        if (this.menu.subMenuIndex == -1) {
          this.menuContent.button[this.menu.menuIndex].type = "view";
          this.menuContent.button[this.menu.menuIndex].url = obj.url;
          this.menuContent.button[
            this.menu.menuIndex
          ].triggerOperationItem = {};
        } else {
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
      }
      if (obj.action == "小程序") {
        // console.log("小程序");
        if (this.menu.subMenuIndex == -1) {
          this.menuContent.button[this.menu.menuIndex].type = "miniprogram";
          this.menuContent.button[this.menu.menuIndex].url = obj.url;
          this.menuContent.button[this.menu.menuIndex].appid = obj.appId;
          this.menuContent.button[this.menu.menuIndex].pagepath = obj.title;
          this.menuContent.button[
            this.menu.menuIndex
          ].triggerOperationItem = {};
        } else {
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
      }
    },

    keepVersion () {
      // 保存并设置版本号
      this.dialogFormVisible = true;
    },
    getBack () {
      // 返回
      this.$router.go(-1);
    },
    keepRelease () {
      //  保存并发布
      this.menuContent.enable = true;
      this.API.MenuRelease(this.menuContent).then(res => {
        if (res.code == 0) {
          console.log("保存并发布", res);
          this.open("成功", "创建成功", "success");
          this.dialogFormVisible = false;
          this.getBack();
        }
      });
    },
    addMenu () {
      // 仅保存 接口
      this.menuContent.enable = false;
      this.API.AddMenuUsb(this.menuContent).then(res => {
        if (res.code == 0) {
          this.open("成功", "创建成功", "success");
          this.dialogFormVisible = false;
          console.log("创建菜单", res);
          this.getBack();
        }
      });
    },
    open (title, message, type) {
      // 通知框
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.list-title {
  margin-top: 0;
}
// .bg-purple-dark {
//   height: 580px;
//   width: 100%;
//   font-size: 18px;
//   overflow: hidden;
//   border: 1px solid #ccc;
//   display: flex;
//   align-items: flex-end;
// }
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
.menu-dis {
  font-size: 18px;
}
// .one-level {
//   width: 100%;
//   height: 40px;
//   text-align: center;
//   line-height: 40px;
//   display: flex;
//   justify-content: space-around;
// }
// .two-level-title {
//   width: 100%;
//   // height: 40px;
//   text-align: center;
//   line-height: 40px;
// }
// .level {
//   width: 100%;
//   margin-bottom: -1px;
//   margin-left: -1px;
//   border: 1px solid #ccc;
//   cursor: pointer;
// }
// .two-level {
//   display: flex;
//   flex-direction: column-reverse;
// }
// .two-level-wrap {
//   display: flex;
//   flex-direction: column-reverse;
// }

.pull-left {
  float: left;
}
.pull-right {
  float: right;
}
.menu-group-name {
  overflow: hidden;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.menu-group-name > div:nth-child(2) {
  float: right;
  color: #23b7e5;
  cursor: pointer;
}
.demo-input-suffix {
  margin: 18px 0;
}
.el-col-offset-3 {
  margin-left: 0;
}
</style>
