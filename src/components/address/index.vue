<template>
  <div>
    <el-cascader
      v-model="setAaddvalue"
      :props="propsData"
      :options="options"
      :size="size"
      clearable
      style="width:100%"
      @change="handleChangeONe"
    >
      <template slot-scope="{ node, data }">
        <span
          style="width:100%;height:100%;display:block;"
          @click="checkData(data)"
          >{{ data.label }}</span
        >
      </template>
    </el-cascader>
  </div>
</template>

<script>
// const id = 0
import { Getcity } from '../../api/common'
export default {
  name: 'Address',
  props: {
    addvalue: {
      type: Array,
      default: []
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data() {
    return {
      setAaddvalue: [],
      saveOBj: {},
      options: [],
      propsData: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          let id = 1
          if (node.level > 0) {
            id = node.value
          }
          Getcity({}, id).then(res => {
            if (res.code === 0) {
              if (res.data && res.data.length > 0) {
                const nodes = []
                res.data.map(res => {
                  const option = {}
                  option.value = res.id
                  option.label = res.addressName
                  option.leaf = level >= 2
                  nodes.push(option)
                })
                resolve(nodes)
              }
            }
          })
        }
      }
    }
  },
  computed: {},
  created() {
    this.$set(this, 'setAaddvalue', this.addvalue)
    if (this.addvalue.length > 0) {
      this.GetcityListOne(1)
      console.log('setAaddvalue', this.addvalue)
    }
  },
  beforeDestroy() {},
  methods: {
    // GetcityList(id){
    //    Getcity({},id).then(res =>{
    //      if(res.code  == 0){
    //         if(res.data && res.data.length > 0){
    //           this.setData(res);
    //         }
    //      }
    //    })
    // },
    GetcityListOne(id) {
      Getcity({}, id).then(res => {
        if (res.code === 0) {
          if (res.data && res.data.length > 0) {
            this.setData(res)
            this.GetcityListTwo(this.addvalue[0])
          }
        }
      })
    },
    GetcityListTwo(id) {
      Getcity({}, id).then(res => {
        if (res.code === 0) {
          if (res.data && res.data.length > 0) {
            this.setData(res)
            this.GetcityListThree(this.addvalue[1])
          }
        }
      })
    },
    GetcityListThree(id) {
      Getcity({}, id).then(res => {
        if (res.code === 0) {
          if (res.data && res.data.length > 0) {
            this.setData(res)
          }
        }
      })
    },
    setData(res) {
      if (res.data[0].addressType === 1) {
        res.data.map(val => {
          const option = val
          option.label = val.addressName
          option.value = val.id
          option.children = []
          this.options.push(option)
        })
      }

      if (res.data[0].addressType === 2) {
        this.options.map(val => {
          if (val.id === res.data[0].parentId) {
            this.saveOBj = {}
            val.children = []
            res.data.map(item => {
              const option1 = item
              option1.label = item.addressName
              option1.value = item.id
              option1.children = []
              this.saveOBj[item.id] = option1
              val.children.push(option1)
            })
          }
        })
      }

      if (res.data[0].addressType === 3) {
        res.data.map(item => {
          const option1 = item
          option1.label = item.addressName
          option1.value = item.id
          option1.leaf = true
          this.saveOBj[item.parentId].children.push(option1)
        })
      }
    },
    // handleChange(val){
    //    if(val.length == 1){
    //     this.GetcityList(val[0])
    //    }
    //    if(val.length == 2){
    //     this.GetcityList(val[1])
    //    }
    //    console.log(val)
    //   //  this.GetcityList(val.id)
    //    this.$emit('getValue',val);
    // },
    handleChangeONe(e) {
      const array = []
      e.map(res => {
        array.push({
          label: this.saveOBj[res],
          id: res
        })
      })
      this.$emit('getValue', array)
    },
    checkData(val) {
      this.saveOBj[val.value] = val.label
    },
    showData(addvalue) {
      this.setAaddvalue = addvalue
      if (addvalue.length > 0) {
        this.GetcityListOne(1)
      }
    }
  }
}
</script>

<style lang="scss"></style>
