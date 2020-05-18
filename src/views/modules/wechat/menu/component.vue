<template>
  <div>
    <div class="caozuo">
      <el-button type="primary"
                 size="mini"
                 v-if="$Buttonpermissions('surbanajurong.wechat.menu.list[add-group]')"
                 @click="addMenu(-99)">{{ $t('wechat.reply.newMenuGroup') }}</el-button>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData"
                  size="mini"
                  fixed
                  style="width: 100%"
                  max-height="500">
          <el-table-column :label="$t('wechat.menu.tab1')"
                           width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.menu.tab2')">
            <template slot-scope="scope">
              <div class="row-item">
                <span class="span"
                      :class="{active:!scope.row.individuation}">{{ scope.row.title }}</span>
                <i v-if="$Buttonpermissions('surbanajurong.wechat.menu.list[update-group]')"
                   class="el-icon-edit icon_sty"
                   @click="showHidden(scope.row.title,scope.row.id)" />
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.menu.tab3')">
            <template slot-scope="scope">
              <span>{{ menuStatus[scope.row.status] }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.menu.tab4')"
                           width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.currentVersionNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.menu.tab5')">
            <template slot-scope="scope">
              <span>{{ scope.row.currentVersionTime }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.menu.tab6')">
            <template slot-scope="scope">
              <span>{{ scope.row.currentVersionRemark }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.menu.tab7')">
            <template slot-scope="scope">
              <span>{{ scope.row.menuTagName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.menu.tab8')"
                           fixed="right">
            <template slot-scope="scope">
              <el-switch v-if="$Buttonpermissions('surbanajurong.wechat.menu.list[status]')  && scope.row.individuation && scope.row.status !=1"
                         v-model="scope.row.showHidden"
                         size="mini"
                         active-color="#13ce66"
                         inactive-color="#ff4949"
                         @change="setMenuStatus(scope.row.status,scope.row.id,scope.row.currentVersionId)" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('wechat.menu.tab9')"
                           fixed="right">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="text"
                         v-if="$Buttonpermissions('surbanajurong.wechat.menu.list[update]')"
                         @click="handleEdit(scope.row.currentVersionId,scope.row.id,scope.row.title,scope.row.individuation)">{{$t('update')}}</el-button>
              <el-button size="mini"
                         type="text"
                         v-if="$Buttonpermissions('surbanajurong.wechat.menu.list[update]')"
                         @click="versionOpen(scope.row.id,scope.row.title,scope.row.individuation)">{{$t('wechat.menu.btn1')}}</el-button>
              <el-button size="mini"
                         type="text"
                         v-if="$Buttonpermissions('surbanajurong.wechat.menu.list[release]')"
                         @click="releaseMenuGroup(scope.row.id,scope.row.title,scope.row.individuation)">{{$t('wechat.menu.btn2')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 页数 -->
    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>
    <!-- 修改菜单组名弹框 -->
    <el-dialog :title="popout.name"
               width="30%"
               :visible.sync="dialogFormVisible">
      <!-- 菜单组名称： -->
      <el-col :span="6"
              style="line-height: 28px;">{{$t('wechat.menu.des')}}</el-col>
      <el-col :span="18"
              style="margin-bottom: 20px;">
        <el-input v-model="popout.title"
                  :placeholder="$t('pla1')"
                  size="mini"
                  clearable />
      </el-col>

      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   type="primary"
                   @click="addEdit">{{$t('confirm')}}</el-button>
        <el-button size="mini"
                   @click="dialogFormVisible = false">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
    <!-- 版本管理弹框 -->
    <el-dialog :title="operation.name"
               width="55%"
               :visible.sync="dialogTableVisible">
      <el-table :data="versionList"
                size="mini"
                fixed
                style="width: 100%"
                max-height="300">
        <el-table-column :label="$t('wechat.menu.tab1')">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.versionNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wechat.menu.tab5')">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wechat.menu.tab6')">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wechat.menu.tab9')"
                         fixed="right">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="viewMenu(scope.row.id)">{{$t('look')}}</el-button>
            <el-button size="mini"
                       type="text"
                       @click="editMenu(scope.row.id,scope.row.individuation)">{{$t('update')}}</el-button>
            <el-button size="mini"
                       type="text"
                       style="color:#F56C6C"
                       v-if="$Buttonpermissions('surbanajurong.wechat.menu.list[del]')"
                       @click="deleteMenuVersion(scope.row.id,scope.row.enable)">{{$t('delete')}}</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wechat.menu.tab8')"
                         fixed="right">
          <template slot-scope="scope">
            <!-- 已使用 -->
            <span v-if="scope.row.enable"
                  style="color:#409EFF">{{$t('wechat.menu.des1')}}</span>
            <el-radio v-if="!scope.row.enable"
                      v-model="version.showRadio"
                      size="mini"
                      :label="scope.row.id"
                      @change="chooseVersion(scope.row.id)">{{$t('wechat.menu.des2')}}</el-radio>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页数 -->
      <div class="pagination">
        <el-pagination background
                       :current-page="currentPage1"
                       layout="total, prev, pager, next, jumper"
                       :total="total1"
                       @current-change="handleCurrentChange1" />
      </div>
      <el-button size="mini"
                 type="primary"
                 @click="createMenu">{{$t('wechat.menu.des3')}}</el-button>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   type="primary"
                   @click="changeVersion">{{$t('confirm')}}</el-button>
        <el-button size="mini"
                   @click="dialogTableVisible = false">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>

    <!-- 版本管理弹框里的弹框 -->
    <el-dialog :title="$t('tip')"
               :visible.sync="centerDialogVisible"
               width="20%"
               center>
      <span>{{$t('wechat.menu.des4')}}</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="mini"
                   type="primary"
                   @click="confirmRelease">{{$t('confirm')}}</el-button>
        <el-button size="mini"
                   @click="centerDialogVisible = false">{{$t('cancel')}}</el-button>
      </span>
    </el-dialog>
    <!-- 发布弹框 -->
    <el-dialog :title="operation.name"
               width="55%"
               :visible.sync="releaseBounced">
      <el-table :data="versionList"
                size="mini"
                fixed
                style="width: 100%"
                max-height="300">
        <el-table-column :label="$t('wechat.menu.tab10')">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.versionNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wechat.menu.tab5')">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wechat.menu.tab6')">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wechat.menu.tab9')"
                         fixed="right">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="viewMenu(scope.row.id)">{{$t('look')}}</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wechat.menu.tab8')"
                         fixed="right">
          <template slot-scope="scope">
            <span v-if="scope.row.enable"
                  style="color:#409EFF">{{$t('wechat.menu.des1')}}</span>
            <el-radio v-if="!scope.row.enable"
                      v-model="version.showRadio"
                      size="mini"
                      :label="scope.row.id"
                      @change="chooseVersion(scope.row.id)">{{$t('wechat.menu.des2')}}</el-radio>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页数 -->
      <div class="pagination">
        <el-pagination background
                       :current-page="currentPage1"
                       layout="total, prev, pager, next, jumper"
                       :total="total1"
                       @current-change="handleCurrentChange1" />
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   type="primary"
                   @click="confirmRelease">{{$t('confirm')}}</el-button>
        <el-button size="mini"
                   @click="releaseBounced = false">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
    <!-- 修改菜单状态弹框 -->
    <el-dialog :visible.sync="modifyMenuStatusPopup"
               :before-close="cancelMenuStatus"
               width="25%"
               center>
      <div v-if="operation.isMenuGroupNo"
           class="tage_cent">
        {{$t('wechat.menu.des5')}}
        <br /> {{$t('wechat.menu.des6')}}
      </div>
      <div v-if="!operation.isMenuGroupNo"
           class="tage_cent">
        {{$t('wechat.menu.des7')}}
        <br /> {{$t('wechat.menu.des8')}}
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button size="mini"
                   type="primary"
                   @click="setMenuGroupStatus">{{$t('confirm')}}</el-button>
        <el-button size="mini"
                   @click="cancelMenuStatus">{{$t('cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 产品
import {
  GetMenuList,
  UpdateTitle,
  MenuVersion,
  GroupRelease,
  DeleteVersion,
  ChangeStatus,
  AddTitle
} from "@/api/wechat/menus";

// 盛裕
import {
  surbanajurong_GetMenuList,
  surbanajurong_UpdateTitle,
  surbanajurong_MenuVersion,
  surbanajurong_GroupRelease,
  surbanajurong_DeleteVersion,
  surbanajurong_ChangeStatus,
  surbanajurong_AddTitle
} from "@/api/surbanajurong/wechat/menus";

import dayjs from "dayjs";
export default {
  name: "MenuList",
  components: {},
  props: {
    type: {
      type: String,
      default: "product"
    },
    projectName: {
      type: String,
      default: "product"
    }
  },
  data () {
    return {
      API: {},
      currentPage: 1,
      total: 0,
      currentPage1: 1,
      total1: 0,
      tableData: [],
      versionList: [],
      menuStatus: ["", "编辑中", "启用", "未启用"],
      dialogFormVisible: false /** 修改菜单组名称弹框 */,
      dialogTableVisible: false /** 版本管理弹框 */,
      centerDialogVisible: false /** 版本管理弹框里的弹框 */,
      releaseBounced: false /** 发布弹框 */,
      modifyMenuStatusPopup: false /** 修改菜单状态弹框 */,
      popout: {
        /** 菜单组名称弹框参数 */
        number: "",
        name: "",
        title: "",
        id: null
      },
      operation: {
        /** 操作参数 */
        name: "",
        id: null,
        title: "",
        status: null,
        individuation: "",
        currentVersionId: "",
        isMenuGroupNo: null
      },
      version: {
        /** 版本里的参数 */
        showRadio: -1,
        id: null
      }
    };
  },
  computed: {},
  created () {
    if (this.projectName == "product") {
      this.API = {
        GetMenuList: GetMenuList,
        UpdateTitle: UpdateTitle,
        MenuVersion: MenuVersion,
        GroupRelease: GroupRelease,
        DeleteVersion: DeleteVersion,
        ChangeStatus: ChangeStatus,
        AddTitle: AddTitle
      };
    } else if (this.projectName == "surbanajurong") {
      this.API = {
        GetMenuList: surbanajurong_GetMenuList,
        UpdateTitle: surbanajurong_UpdateTitle,
        MenuVersion: surbanajurong_MenuVersion,
        GroupRelease: surbanajurong_GroupRelease,
        DeleteVersion: surbanajurong_DeleteVersion,
        ChangeStatus: surbanajurong_ChangeStatus,
        AddTitle: surbanajurong_AddTitle
      };
    }
    this.menuList(1);
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    /**
   *  1.自定义菜单最多3个一级菜单，每一个一级菜单最多5个二级菜单
      2.以及菜单最多4个汉字，二级菜单最多7个汉字
      3.一级菜单在已经设置子菜单的情况下，仅可以设置菜单名称；一级菜单在未设置子菜单的情况下，可以设置菜单内容
   */
    addMenu (number) {
      // 新增菜单组
      this.popout.title = "";
      this.popout.number = number;
      this.dialogFormVisible = true;
      this.popout.name = "创建菜单组";
    },
    menuList (num) {
      // 菜单组列表
      this.API.GetMenuList({
        page: num,
        size: 10
      }).then(res => {
        if (res.code === 0) {
          console.log("菜单组列表", res);
          if (res.data.data) {
            res.data.data.map(res => {
              res.status == 2? (res.showHidden = true) : (res.showHidden = false);
              if (res.currentVersionTime) {
                res.currentVersionTime = `${dayjs(res.currentVersionTime).format( "YYYY-MM-DD")}`;
              }
            });
          }
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    handleCurrentChange (e) {
      console.log("分页", e);
      this.menuList(e);
    },

    showHidden (title, id) {
      // 菜单组名称弹框
      this.popout.number = 9;
      this.dialogFormVisible = true;
      this.popout.name = "修改菜单组名称";
      this.popout.title = title;
      this.popout.id = id;
    },
    addEdit () {
      if (this.popout.number == -99) {
        this.addTitleInterface();
      } else {
        this.updateTitleInterface();
      }
    },
    updateTitleInterface () {
      // 提交修改菜单组名称
      const obj = {
        title: this.popout.title,
        id: this.popout.id
      };
      this.API.UpdateTitle(obj).then(res => {
        if (res.code == 0) {
          this.dialogFormVisible = false;
          console.log("提交修改菜单组名称", res);
          this.open("成功", "修改成功", "success");
          this.menuList(1);
        }
      });
    },

    addTitleInterface () {
      // 创建菜单组
      const obj = {
        title: this.popout.title,
        individuation: true
      };
      this.API.AddTitle(obj).then(res => {
        if (res.code == 0) {
          console.log("创建菜单组", res);
          this.dialogFormVisible = false;
          this.$router.push({
            name: "wechat-menu-menu-add",
            query: {
              id: res.data.id,
              title: res.data.title,
              isOrNo: true,
              individuation: true,
              projectName: this.projectName
            }
          });
        }
      });
    },

    handleEdit (currentVersionId, id, title, individuation) { // 编辑(edit页面)
      // 编辑  currentVersionId = null 时为不可编辑状态

      this.operation.id = id;
      this.operation.title = title;
      this.operation.individuation = individuation;
      this.operation.currentVersionId = currentVersionId;
      if (!currentVersionId) {
        this.open("警告", "当前版本未发布,请去版本管理编辑", "warning");
        return;
      }
      this.$router.push({
        name: "wechat-menu-menu-edit",
        query: {
          id: id /** 自身id */,
          title: title /** 名字 */,
          currentVersionId: currentVersionId, // 判断你是否有条件跳转参数
          individuation: individuation,
          isOrNo: true,
          projectName: this.projectName
        }
      });
    },

    menuVersionInterface (page) {
      // 版本管理弹框列表数据
      const obj = {
        page: page,
        size: 10,
        menuGroupId: this.operation.id
      };
      this.API.MenuVersion(obj).then(res => {
        if (res.code == 0) {
          console.log("版本管理弹框列表数据", res);
          if (res.data.data) {
            this.versionList = res.data.data;
            this.versionList.map(res => {
              res.createTime = `${dayjs(res.createTime).format(
                "YYYY-MM-DD HH:mm:ss"
              )}`;
            });
          }
          this.total1 = res.data.total;
        }
      });
    },
    handleCurrentChange1 (e) {
      this.menuVersionInterface(e);
    },

    versionOpen (id, title, individuation) {
      // 版本管理
      this.versionList = [];
      this.version.showRadio = -1;
      this.dialogTableVisible = true; /** 显示弹框 */
      this.operation.name = "版本管理-“" + title + "”";
      this.operation.id = id;
      this.operation.title = title;
      this.operation.individuation = individuation;
      this.menuVersionInterface(1);
    },
    createMenu () { // 创建版本(add页面)
      // 从菜单列表中创建菜单
      this.$router.push({
        name: "wechat-menu-menu-add",
        query: {
          id: this.operation.id,
          title: this.operation.title,
          individuation: this.operation.individuation,
          projectName: this.projectName
        }
      });
    },
    changeVersion () {
      // 版本管理弹框确定
      if (this.version.showRadio == -1) {
        this.open("警告", "请选择版本", "warning");
        return;
      }
      this.centerDialogVisible = true; /** 版本管理弹框里的弹框显示 */
    },
    releaseMenuGroup (id, title, individuation) {
      // 发布
      this.versionList = [];
      this.version.showRadio = -1;
      this.releaseBounced = true;
      this.operation.id = id;
      this.operation.individuation = individuation;
      this.operation.name = "发布-“" + title + "”";
      this.menuVersionInterface(1);
    },
    chooseVersion (id) {
      // 你准备选择使用那个版本
      this.version.id = id;
    },

    confirmRelease () {
      // 版本管理弹框里的弹框确定(确认发布)or 发布
      if (this.version.showRadio == -1) {
        this.open("警告", "请选择版本", "warning");
        return;
      }
      const obj = {
        id: this.version.id,
        menuGroupId: this.operation.id, // 父id
        enable: true
      };
      this.API.GroupRelease(obj).then(res => {
        if (res.code == 0) {
          this.open("成功", "修改成功", "success");
          this.dialogTableVisible = false;
          this.centerDialogVisible = false;
          this.releaseBounced = false;
          console.log("确认发布", res);
          this.menuList(1);
        }
      });
    },
    viewMenu (id) { // 点击查看(edit页面)
      // 查看
      this.$router.push({
        name: "wechat-menu-menu-edit",
        query: {
          id: this.operation.id,
          title: this.operation.title,
          currentVersionId: id,
          individuation: this.operation.individuation,
          isOrNo: false,
          projectName: this.projectName
        }
      });
    },

    editMenu (id) { // 修改按钮(edit页面)
      // 编辑菜单内容 id,父级id true individuation
      this.$router.push({
        name: "wechat-menu-menu-edit",
        query: {
          id: this.operation.id,
          title: this.operation.title,
          currentVersionId: id,
          individuation: this.operation.individuation,
          isOrNo: true,
          projectName: this.projectName
        }
      });
    },
    deleteMenuVersion (id, enable) {
      // 删除菜单组中的版本菜单
      const data =
        "?id=" + id + "&menuGroupId=" + this.operation.id + "&enable=" + enable;

      this.$confirm("确定此操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.API.DeleteVersion(data).then(res => {
            if (res.code == 0) {
              console.log("删除菜单组中的版本菜单", res);
              this.open("成功", "删除成功", "success");
              this.menuVersionInterface(1);
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              });
            }
          });
          // ReviseLedgerRecord({ id: row.id, status: 3 }).then(res => {
          //   if (res.code == 0) {
          //     this.$notify({
          //       title: '成功',
          //       message: '收款成功',
          //       type: 'success'
          //     });
          //     this.ledgerRecordInterface(1);
          //   } else {
          //     this.$notify.error({
          //       title: '错误',
          //       message: res.message
          //     });
          //   }
          // });
        })
        .catch(() => { });


    },

    setMenuStatus (status, id, currentVersionId) {
      // 修改菜单状态
      console.log("修改菜单状态f", status, id, currentVersionId);
      this.operation.id = id;
      this.operation.status = status;
      this.operation.currentVersionId = currentVersionId;
      this.modifyMenuStatusPopup = true; /** 修改菜单弹框显示 */
      this.tableData.map(res => {
        if (res.id == id) {
          if (status == 2) {
            this.operation.isMenuGroupNo = true;
            this.operation.status = 3;
            res.status = 2;
          }
          if (status == 3) {
            this.operation.isMenuGroupNo = false;
            this.operation.status = 2;
            res.status = 3;
          }
        }
      });
    },
    cancelMenuStatus () {
      // 点击修改菜单弹框里的取消
      this.modifyMenuStatusPopup = false;
      this.tableData.map(res => {
        if (res.id == this.operation.id) {
          res.showHidden = !res.showHidden;
        }
      });
    },
    setMenuGroupStatus () {
      // 点击修改菜单弹框里的确定
      this.changeStatusInterface();
    },
    changeStatusInterface () {
      // x修改菜单组状态
      const obj = {
        status: this.operation.status,
        id: this.operation.id,
        currentVersionId: this.operation.currentVersionId
      };
      this.API.ChangeStatus(obj).then(res => {
        if (res.code == 0) {
          console.log("x修改菜单组状态", res);
          this.open("成功", "修改成功", "success");
          this.menuList(1);
          this.modifyMenuStatusPopup = false;
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
.el-row {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.icon_sty {
  font-size: 16px;
  float: right;
  display: none;
}
.active {
  color: red;
}
.row-item:hover .icon_sty {
  display: block;
  cursor: pointer;
}
.el-dialog__body {
  text-align: center;
  padding: 20px 20px !important;
}
.tage_cent {
  text-align: center;
}
</style>

