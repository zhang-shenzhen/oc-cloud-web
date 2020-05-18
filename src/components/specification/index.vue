<template>
  <div>
    <el-row>
      <div class="SKU-centent">
        <div class="SKU-specs">
          <div class="specs-sty"
               v-for="(item,index) in specs"
               :key="index">
            <!-- 规格名称 -->
            <div class="specs-left">
              <el-tooltip class="item"
                          v-if="item.attributeName"
                          effect="dark"
                          :content="item.attributeName"
                          placement="top-start">
                <el-tag class="tag-title"
                        type="success">
                  <div class="tag-hidden">{{item.attributeName}}</div>
                </el-tag>
              </el-tooltip>

              <div class="tag-change"
                   v-if="item.attributeName">
                <i style="margin:0 10px;cursor: pointer;"
                   class="el-icon-edit-outline tag-edit"
                   @click="editSpec(item,index)" />
                <i style="cursor: pointer"
                   v-if="!item.dynamicTags.length"
                   class="el-icon-circle-close tag-del"
                   @click="delSpec(item,index)"></i>
              </div>

              <el-input class="input-new-tag"
                        :ref="'saveTagInput'+index"
                        v-if="item.inputTagGroup"
                        v-model="inputValue"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(index,1)"
                        @blur="handleInputConfirm(index,1)">
              </el-input>
              <div>
                <el-button v-if="item.attributeName.length == 0 && !item.inputTagGroup"
                           class="button-new-tag"
                           size="small"
                           @click="showInput(index,1)">+ New Specs</el-button>
              </div>

            </div>
            <!-- 规格详情 -->
            <div class="specs-right">
              <el-tooltip class="item"
                          :key="ind"
                          v-for="(tag,ind) in item.dynamicTags"
                          effect="dark"
                          :content="tag"
                          placement="top-start">
                <el-tag closable
                        :disable-transitions="false"
                        @close="handleClose(tag,index,ind)">
                  <div class="tag-hidden"
                       style="float:left">{{tag}}</div>
                </el-tag>
              </el-tooltip>

              <el-input class="input-new-tag"
                        :ref="'saveTagInput1'+index"
                        v-if="item.inputVisible"
                        v-model="inputValue"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(index,2)"
                        @blur="handleInputConfirm(index,2)">
              </el-input>
              <el-button v-else
                         class="button-new-tag"
                         size="small"
                         @click="showInput(index,2)">+ New Specs</el-button>
            </div>
          </div>
        </div>
        <el-button class="add-specs"
                   size="mini"
                   type="primary"
                   v-if="!specsIsShow"
                   @click="addSpecs">添加规格</el-button>
        <!-- 只有你创建子规格且不能为空的时候才会创建出规格列表 -->
        <div class="SKU-list"
             v-if="goodsSpecification">
          <el-table :data="tableData[0].list"
                    max-height="350"
                    style="width: 100%">
            <el-table-column v-for="(item,index) in tableData[0].nameTab"
                             :key="index"
                             fixed
                             :label="item">
              <template slot-scope="scope">
                {{ scope.row.list[index].split(":")[1]}}
              </template>
            </el-table-column>
            <el-table-column label="商品图片"
                             width="100">
              <template slot-scope="scope">
                <!-- <div class="img_show"
                     v-if="scope.row.listObj.photoList">
                  <div class="img_show_del"
                       @click="delImg(1,1)">
                    <i class="el-icon-delete"></i>
                  </div>
                  <img style="width:100%;height:100%;"
                       :src="$fileUrl() + scope.row.listObj.photoList" />
                </div> -->
                <div class="img_show_table"
                     v-if="scope.row.listObj.photoList">
                  <div class="img_show_del_table"
                       @click="delImg(scope.$index,4)">
                    <i class="el-icon-delete"></i>
                  </div>
                  <img style="width:80px;height:80px;"
                       :src="$fileUrl() + scope.row.listObj.photoList" />
                </div>
                <div v-if="!scope.row.listObj.photoList">
                  <el-button type="primary"
                             @click="clickuloadImg(scope.$index,1)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="唯一编号(SKU)"
                             width="200">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容"
                          v-model="scope.row.listObj.skuNum"
                          @blur="handleInputblur"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="库存"
                             width="130">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容"
                          v-model="scope.row.listObj.total"
                          @blur="handleInputblur"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单价"
                             width="130">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容"
                          v-model="scope.row.listObj.price"
                          @blur="handleInputblur"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="原价"
                             width="130">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容"
                          v-model="scope.row.listObj.const"
                          @blur="handleInputblur"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="重量"
                             width="130">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容"
                          v-model="scope.row.listObj.weightStr"
                          @blur="handleInputblur"></el-input>
              </template>
              <el-table-column label="是否预售"
                               width="120">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.listObj.advanceSale"
                             active-color="#13ce66"
                             inactive-color="#ff4949">
                  </el-switch>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="门店库存"
                             width="130">
              <template slot-scope="scope">
                <el-button size="small"
                           @click="editStore(scope.row,scope.$index)">添加门店库存</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-row>
    <editorImage :cid="1"
                 ref="muchild"
                 urltype="default"
                 type="default-1"
                 @successCBK="imageSuccessCBK" />
    <el-dialog title="门店库存"
               :visible.sync="dialogFormVisible">
      <div class="dialog-sty">
        <div style="width:50%"
             v-for="(item,index) in storesListData"
             :key="index">
          <el-form size="small">
            <el-form-item :label="item.storeName"
                          label-width="120px">
              <el-input v-model="item.stock"
                        autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="storeSure()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ListStores } from "@/api/commodity/goods";
import editorImage from "@/components/Tinymce/components/editorImage";
import { cookieGet } from "@/common/cookie";
export default {
  name: '',
  components: { editorImage },
  props: {
    specObj: {}
  },
  data () {
    return {
      dialogFormVisible: false,
      specsStatus: 1,
      goodsSpecification: false,
      isShowInput: false,
      inputValue: '',
      specs: [{
        inputTagGroup: false,
        inputVisible: false,
        attributeName: '',
        dynamicTags: []
      }],
      specsIsShow: false,
      specsOption: [],
      tableObj: {},
      tableData: [{
        list: [],
        nameTab: []
      }],
      indexImg: '',
      listObj: {
        "photoList": '', // 商品图片
        "skuNum": '', // 唯一编号
        "total": '', // 库存
        "price": '', // 单价
        "const": '', // 原价
        "weightStr": '', // 重量
        "advanceSale": false, // 是否预售
        "skuStoreStockList": [] // 库存
      },
      // stortList: [],
      storesListData: [],
      storeOriginal: [],
      specNum: 0,
    }
  },
  computed: {},
  watch: {
    specObj (v) {
      console.log('你进来吧......', v)
    }
  },
  created () {
    const channelId = JSON.parse(cookieGet("Httpheader")).ChannelId;
    this.ListStoresInterface(channelId);
    console.log(this.specObj, '也不知道你可不可以拿到')
    if (this.specObj.type) {
      this.tableData = this.specObj.tableData;
      this.specs = this.specObj.specs;
      this.goodsSpecification = true;
      this.specs.length == 2 ? this.specsIsShow = true : this.specsIsShow = false; // 规定只能创建两个规格
    }
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {

    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleInputblur () {
      let objSpec = {
        'tableData': this.tableData,
        'specs': this.specs
      }
      this.$emit('specificationsObj', objSpec)
    },
    imageSuccessCBK (e) {
      console.log(e, e[0].url[0].url, this.indexImg, this.tableData[0].list, 'eee===eee')
      this.tableData[0].list[this.indexImg].listObj.photoList = e[0].url[0].url;
      let objSpec = {
        'tableData': this.tableData,
        'specs': this.specs
      }
      this.$emit('specificationsObj', objSpec)
    },

    delImg (e, num) { // 点击图片删除
      // 点击删除图片
      this.tableData[0].list[e].listObj.photoList = '';
      let objSpec = {
        'tableData': this.tableData,
        'specs': this.specs
      }
      this.$emit('specificationsObj', objSpec)
    },

    clickuloadImg (index, e) { // 点击上传图片按钮
      this.indexImg = index;
      this.$refs.muchild.showModel(); // 显示上传图片弹框
    },

    showInput (index, i) {
      // 点击添加标签
      let gv;
      if (i == 2 && !this.specs[index].attributeName) {
        this.open2('请先添加父规格');
        return;
      }
      if (i == 1) {
        this.specs[index].inputTagGroup = true;
        gv = 'saveTagInput' + index;
      } else {
        this.specs[index].inputVisible = true;
        gv = 'saveTagInput1' + index;
      }
      this.$nextTick(_ => {
        this.$refs[gv][0].$refs.input.focus();
      });
      console.log(index, i, this.specs, '显示出来你点击的那个====')
    },
    /**
     * index为第index个规格
     * i 
     * ==1为点击的是父级
     * ==2位点击的是子级
     */
    handleInputConfirm (index, i) {
      // input输入内容失焦
      let inputValue = this.inputValue.replace(/\s*/g, ""); // 输入的值不能有空格，不能有: ,
      if (inputValue && i == 1) { // 规格(创建规格或者修改规格名称的时候进入)
        this.specs[index].attributeName = inputValue
        this.specs.length == 2 ? this.specsIsShow = true : this.specsIsShow = false; // 规定只能创建两个规格
        this.judgeSpecs(index);
      } else if (!inputValue && i == 1 && this.isShowInput) {
        // 点击修改规格按钮之后如果你没有输入任何字段，那么失焦之后还显示原来的字段
        this.specs[index].attributeName = this.specsOption[index].attributeName;
      } else if (inputValue && i == 2) { // 创建子规格 每次创建子规格的时候就先保存一下原先生成的规格列表数据因为逻辑是每次创建子规格的时候都重新生成的规格列表
        sessionStorage.setItem('specsTableData', JSON.stringify(this.tableData))
        this.specsStatus = 1;
        this.specs[index].dynamicTags.push(inputValue);
        this.specfunction();
        this.goodsSpecification = true;
      }
      i == 1 ? this.specs[index].inputTagGroup = false : this.specs[index].inputVisible = false;
      this.inputValue = '';
      console.log(this.specs, this.specsOption, '这个是我的初始数据')
      this.isShowInput = false; // 判断你是不是点击的修改规格按钮
    },
    // 判断是修改规格名称还是创建规格
    judgeSpecs (index) { // 有子规格的时候才算是修改规格名称不然不处理参数
      if (this.specs[index].dynamicTags.length) {
        console.log('你修改名称的时候进入')
        this.specsStatus = 2;
        this.specfunction();
      }
    },
    addSpecs () {
      // 点击新增规格
      let num = 0;
      if (this.specs.length != 0) {
        this.specs.map(res => {
          if (!res.attributeName || res.dynamicTags.length == 0) {
            num += 1;
          }
        })
      }
      if (num > 0) {
        this.open2('规格不能为空');
        return;
      }
      this.specs.push({
        inputTagGroup: false,
        inputVisible: false,
        attributeName: '',
        dynamicTags: []
      })
    },
    editSpec (item, i) {
      // 点击修改规格
      console.log('你点击了修改规格按钮')
      this.isShowInput = true; // 判断你是不是点击的修改规格按钮
      this.specsOption = JSON.parse(JSON.stringify(this.specs))
      console.log(item, i, '修改规格====')
      this.specs[i].attributeName = '';
      this.specs[i].inputTagGroup = true;
      let gv = 'saveTagInput' + i;
      this.$nextTick(_ => {
        this.$refs[gv][0].$refs.input.focus();
      });

    },
    delSpec (item, i) {
      // 点击删除规格(父级)
      let specNum = this.specs.length;
      console.log(item, i, '删除规格===')
      this.$confirm("确定删除此条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log('点击删除')
          if (specNum == 1) {
            this.specs = [];
            this.specs = [{
              inputTagGroup: false,
              inputVisible: false,
              attributeName: '',
              dynamicTags: []
            }]
          } else {
            this.specs.splice(i, 1);
          }
          this.specs.length == 2 ? this.specsIsShow = true : this.specsIsShow = false; // 规定只能创建两个规格
        })
        .catch(() => {
          console.log('点击取消')
        });
    },

    handleClose (tag, index, ind) { // 点击删除子规格
      console.log(tag, index, ind, '点击删除子规格')
      this.specs[index].dynamicTags.splice(ind, 1);
      if (this.specs[index].dynamicTags.length) { // 某条规格下有子规格的时候
        this.specsStatus = 3;
      } else { // 没有子规格的时候全部重新生成不用回显
        this.specsStatus = 4;
        this.goodsSpecification = false;
      }
      this.specfunction();
    },

    // 处理规格函数
    specfunction () {
      let arrayData = JSON.parse(JSON.stringify(this.specs));
      if (!arrayData.length) { return }
      let descartData = [];
      arrayData.map(res => {
        if (res.dynamicTags.length) {
          let arrayList = [];
          res.dynamicTags.map(item => {
            arrayList.push(res.attributeName + ':' + item)
          })
          descartData.push(arrayList)
        }
      })
      // 在这判断1.创建了子规格,2.只是修改了规格名称,3.你点击了删除子规格
      console.log('你是怎么进啦的', this.specsStatus)
      this.generatinglistdata(descartData)
      console.log(descartData, '处理参数')
    },
    // 修改规格名称的时候 
    modifySpecificationName (data) {

    },
    // 生成列表数据
    generatinglistdata (data) {
      let list = this.descartes(data)
      this.headerIsShow();
      let listData = [];
      let tableList = JSON.parse(JSON.stringify(this.tableData[0].list));
      let optionObj = {}
      let obj = {}
      // 生成列表的时候你要先判断是不是有已经填入的数据
      list.map((res, index) => {
        let option = null
        if (typeof res == 'string') {
          res = res.split(' ')
        }
        option = JSON.parse(JSON.stringify(res))
        if (this.specsStatus == 1 || this.specsStatus == 3 || this.specsStatus == 4) { // 创建的时候
          optionObj = { ...this.listObj }; // 创建的时候给他赋值(都是空的)
        } else if (this.specsStatus == 2) { // 修改规格名称的时候
          optionObj = tableList[index].listObj
        }
        listData.push({
          list: res,
          jude: option.join(' '), // 这个是我用来判断的字段(修改规格名称或者删除子规格的时候用)
          listObj: optionObj,
        })
        if ((list.length - 1) == index && tableList.length && (this.specsStatus == 1 || this.specsStatus == 3)) { // 新增子规格的时候需要把原先没有修改过的规格参数不能变
          console.log(listData, tableList, 'tableList====------')
          listData.map((item, inp) => {
            tableList.map((initem, ind) => {
              if (item.jude == initem.jude) {
                item.listObj = initem.listObj
              }
            })
          })
        }
      })
      this.tableData[0].list = listData;
      console.log(list, listData, this.tableData, obj, '处理=========')
      // this.groupFormatData(obj, this.tableObj);
      let objSpec = {
        'tableData': this.tableData,
        'specs': this.specs
      }
      this.$emit('specificationsObj', objSpec)
    },

    // 处理成数据组格式
    // groupFormatData (obj, obj1) {
    //   let listData = [];
    //   for (let i in obj) {
    //     console.log(obj[i], '这些都是')
    //     listData.push(obj[i])
    //   }
    //   this.tableObj = { ...obj }
    //   this.tableData[0].list = listData;
    //   console.log(this.tableObj, obj, this.tableData, '----------处理')
    // },


    // 列表表头显示
    headerIsShow () {
      let TabData = JSON.parse(JSON.stringify(this.specs));
      console.log(TabData, 'TabData===TabData')
      let nameTab = [];
      TabData.map(item => {
        if (item.dynamicTags.length) {
          nameTab.push(item.attributeName)
        }
      })
      this.tableData[0].nameTab = nameTab;
    },

    // 门店列表接口
    ListStoresInterface (channelId) {
      let that = this;
      that.storeOriginal = [];
      that.storesListData = [];
      ListStores({
        page: 1,
        size: 120,
        wechatId: channelId
      }).then(res => {
        if (res.code == 0) {
          let stortList = res.data.data;
          stortList.map(res => {
            that.storeOriginal.push({
              storeId: res.id,
              storeName: res.name,
              stock: ""
            });
          });
          that.storesListData = JSON.parse(JSON.stringify(that.storeOriginal));
          console.log(that.storesListData, 'storesListData=============')
        }
      });
    },

    editStore (item, index) {
      // 点击添加门店库存按钮
      console.log(item, index, this.tableData, '门店库存按钮')
      this.specNum = index; // 记录是第几个商品  
      this.dialogFormVisible = true;
      this.storesListData = JSON.parse(JSON.stringify(this.storeOriginal));
      if (item.listObj.skuStoreStockList || item.listObj.skuStoreStockList.length != 0) {
        this.storesListData.map(res => {
          // 每次点击显示弹框的时候,如果这条数据已经有过添加了,那么你就把数值赋给它
          item.listObj.skuStoreStockList.map(itm => {
            if (res.storeId == itm.storeId && itm.stock) {
              res.stock = itm.stock;
            }
          });
        });
      }
    },
    storeSure () {
      // 点击门店弹框确认按钮
      let storeData = [];
      let storeList = JSON.parse(JSON.stringify(this.storesListData));
      storeList.map(res => {
        if (res.stock) {
          storeData.push(res);
        }
      });
      this.tableData[0].list[this.specNum].listObj.skuStoreStockList = storeData;
      this.dialogFormVisible = false;
      let objSpec = {
        'tableData': this.tableData,
        'specs': this.specs
      }
      this.$emit('specificationsObj', objSpec)
    },

    // 笛卡尔生成SKU 格式↓
    // arrayList = [['黑色', '白色', '蓝色'], ['1.2KG', '2.0KG', '3.0KG'], ['128G', '356G', '1T']]
    descartes (array) {
      if (array.length < 2) return array[0] || []; // 如果array的长度小于2 则取第一项 如果第一项没有值 则取[]
      return [].reduce.call(array, function (col, set) {
        var res = [];
        col.forEach(c => {
          set.forEach(s => {
            var t = [].concat(Array.isArray(c) ? c : [c]);
            t.push(s);
            res.push(t);
          })
        });
        return res;
      })
    },


    open2 (mes) {
      this.$notify({
        title: '警告',
        message: mes,
        type: 'warning'
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.SKU-centent {
  width: 100%;
  border: 1px solid #999;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  max-height: 500px;
  .SKU-specs {
    .specs-sty {
      display: flex;
      border: 1px solid #999;
      margin-top: -1px;
      .specs-left {
        width: 20%;
        box-sizing: border-box;
        padding: 10px 10px 0 10px;
        text-align: center;
        margin-right: 10px;
        background-color: #f9f9f9;
        display: flex;
        align-items: center;
        justify-content: center;
        .item {
          margin-bottom: 10px;
        }
        .tag-change {
          font-size: 16px;
          margin-bottom: 10px;
          .tag-edit:hover,
          .tag-del:hover {
            color: #f56c6c;
          }
        }
      }
      .specs-right {
        width: 80%;
        box-sizing: border-box;
        padding: 10px 10px 0 10px;
        .item {
          margin-bottom: 10px;
        }
      }
    }
  }
}
.add-specs {
  margin: 10px 0;
}
.el-tag .tag-hidden {
  max-width: 140px;
  overflow: hidden;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  margin-bottom: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  margin-bottom: 10px;
  vertical-align: bottom;
}

.orderImg_box {
  display: flex;
  margin-top: 12px;
}
.img_show_table {
  width: 80px;
  height: 80px;
  display: flex;
  margin-right: 10px;
  margin-bottom: 10px;
  .img_show_del_table {
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    position: absolute;
    z-index: 9;
    display: none;
  }
}
.img_show_table:hover .img_show_del_table {
  background-color: rgba(0, 0, 0, 0.3);
  display: block;
  color: #f56c6c;
  cursor: pointer;
}
.img_show {
  width: 100px;
  height: 100px;
  display: flex;
  margin-right: 10px;
  .img_show_del {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    position: absolute;
    z-index: 9;
    display: none;
  }
}
.img_show:hover .img_show_del {
  background-color: rgba(0, 0, 0, 0.3);
  display: block;
  color: #f56c6c;
  cursor: pointer;
}
// .upload_img {
//   width: 100px;
//   height: 100px;
//   border: 1px dashed #ccc;
//   border-radius: 5px;
//   margin-bottom: 10px;
//   cursor: pointer;
//   .logoIcon {
//     font-size: 40px;
//     color: #dddddd;
//     margin: 30px;
//   }
// }
.dialog-sty {
  display: flex;
  flex-wrap: wrap;
}
</style>

