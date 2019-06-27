<template>
  <div class="ceshi-demo">
    <h1>SimpleSelect组件</h1>
    <p>选择器支持单选、多选、搜索，以及键盘快捷操作。</p>
    <h1>selectBlock测试用例</h1>
    {{value2}}
    <h-simple-select ref="ceshi"
                     label-in-value
                     autoPlacement
                     filterable
                     showBottom
                     specialIndex
                     multiple
                     hideMult
                     isSelectFilter
                     placeholder="123"
                     showTotalNum
                     v-model="value2"
                     @on-change="change"
                     widthAdaption>
      <div slot="header">
        <h-button @click="selectAll(true)">全选</h-button>
        <h-button @click="selectAll(false)">全不选</h-button>
        <h-button @click="selectTop(true)">已选置顶</h-button>
        <h-button @click="selectTop(false)">已选不置顶</h-button>
      </div>
      <h-select-block :data="bigData"
                      @on-scroll="select"></h-select-block>
    </h-simple-select>
    <h-button @on-click="loaddata">加载数据</h-button>
    <h-button @on-click="changValue(true)">选择数据</h-button>
    <h-button @on-click="changValue(false)">选择数据1</h-button>
    <h-simple-select autoPlacement
                     specialIndex
                     isArrow="false"
                     isSelectFilter
                     checkToHead
                     placeholder="123"
                     transfer
                     v-model="value1"
                     widthAdaption>
      <h-select-block :data="bigData"
                      @on-scroll="select"></h-select-block>
    </h-simple-select>
    <h1>--------- HUI_V1.0.31_20190321 TS:201903110539 ---------</h1>
    <h-simple-select autoPlacement
                     filterable
                     isArrow="false"
                     placeholder="123"
                     style="width:200px"
                     transfer
                     :loading="loading1"
                     loadingText="拼命加载中..."
                     v-model="v20190321.value"
                     remote
                     :remote-method="remoteMethod"
                     widthAdaption>
      <h-select-block :data="remoteData"></h-select-block>
      <!-- <h-select-block :data="v20190321.options2"></h-select-block> -->
    </h-simple-select>
    {{v20190321.value}}
    <h-simple-select filterable
                     isArrow="false"
                     placeholder="123"
                     showBottom
                     multiple
                     style="width:200px"
                     transfer
                     v-model="v20190321.value2"
                     remote
                     :remote-method="remoteMethod"
                     widthAdaption>
      <h-select-block ref="block" :data="remoteData"></h-select-block>
      <!-- <h-select-block :data="v20190321.options2"></h-select-block> -->
    </h-simple-select>
    {{v20190321.value2}}
    <h-button @click="changValue2">选中二三项</h-button>
    <h-button @click="changeData">已选置顶</h-button>

    <h1>远程搜索</h1>
    <h-simple-select width="200"
                     v-model="valueRemote1"
                     filterable
                     remote
                     :remote-method="remoteMethod"
                     :loading="loading1"
                     loadingText="拼命加载中..."
                     ref="block">
      <h-select-block :data="remoteData"></h-select-block>
      <div slot="header">我是header</div>
      <div slot="footer">
        <h-button @click="changeData">已选置顶</h-button>
      </div>
    </h-simple-select>
    <h-simple-select
      v-model="valueRemote"
      filterable
      show-bottom
      remote
      multiple
      :remote-method="remoteMethod">
      <h-select-block :data="remoteData" ref="block1"></h-select-block>
      <div slot="header">我是header</div>
      <div slot="footer">
        <h-button @click="changeData">已选置顶</h-button>
      </div>
    </h-simple-select>
    <!-- <h1>测试</h1>
    <h-simple-select filterable
                     v-model="ceshi1"
                     transfer
                     widthAdaption>
      <h-select-block :data="ceshiData"></h-select-block>
    </h-simple-select> -->
    <br><br><br><br><br><br><br><br><br><br><br><br><br>
  </div>
</template>
<script>
let bigData = []
for (let i = -1; i < 160; i++) {
  let obj = {}
  obj.value = i + ''
  if(i==0){
    obj.disabled = true
  }
  // obj.value = 'value' + i
  obj.label = 'lab' + i
  obj.label1 = 'lab12'
  obj.label2 = 'lab13'
  obj.label3 = 'lab14'
  bigData.push(obj)
}
export default {
  data() {
    return {
      loading1: false,
      showCol:['label1','label2','label3'],
      matchCol: ['name', 'age'],
      bigData: [],
      value: '',
      value1: [],
      value2: ['2'],
      v20190321: {
        options: [
          {
            value: '1',
            label: '1'
          },
          {
            value: '11',
            label: '11'
          },
          {
            value: '112',
            label: '112'
          },
          {
            value: '2',
            label: '2'
          },
          {
            value: '3',
            label: '3'
          }
        ],
        options2: [
          { value: '1', label: '中国' },
          { value: '2', label: '美国' },
          { value: '3', label: '韩国1' },
          { value: '4', label: '韩国2' },
          { value: '5', label: '韩国3' },
          { value: '6', label: '韩国4' },
          { value: '7', label: '韩国5' },
          { value: '8', label: '韩国6' },
          { value: '9', label: '韩国7' },
          { value: '10', label: '韩国8' },
          { value: '11', label: '韩国9' },
          { value: '12', label: '韩国10' },
          { value: '13', label: '韩国11' },
          { value: '14', label: '韩国12' },
          { value: '15', label: '韩国13' }
        ],
        value: '',
        value2: ['1', '2']
      },
      remoteData: [],
      valueRemote: [],
      valueRemote1: '',
      ceshi1: '',
      ceshiData: []
    }
  },
  methods: {
    selectAll(status){
      this.$refs.ceshi.toggleSelect(status)
    },
    selectTop(status){
      this.$refs.ceshi.selectedTop(status)
    },
    changValue(stae) {
      this.value2 =stae? ['2', '3','4','5']:['3','4']
    },
    changValue2() {
      this.v20190321.value2 = ['2', '3']
    },
    loaddata() {
      this.bigData = bigData
    },
    changeValue() {
      this.value = 'value1'
    },
    testClick(val) {
      if (val) {
        this.$refs.test.focus()
      } else {
        this.$refs.test.blur()
      }
    },
    ceshi() {
      this.model1 = []
      this.model2 = ''
    },
    change(e) {
      console.log(e)
    },
    select(e, b) {
      console.log(e)
      console.log(b)
    },
    allSelect(e) {
      console.log(e)
    },
    selsetChange(e) {
      console.log(e)
    },
    remoteMethod(query) {
      clearTimeout(this.timer)
      if (query !== '') {
        this.loading1 = true
        this.timer = setTimeout(() => {
          this.loading1 = false
          this.remoteData = bigData.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          )
        }, 2000)
      } else {
        this.loading1 = false;
        this.remoteData = bigData
      }
    },
    changeData() {
      this.$refs.block.selectedTop()
      this.$refs.block1.selectedTop()
    }
  },
  mounted() {
    // 远程搜索赋初始值
    // this.remoteMethod('')

    setTimeout(() => {
      this.value = 'value0'
      this.value1 = ['value0']
    }, 1000)
    this.ceshiData = [
      { label: 'GSLC-12(CW)', value: 'GSLC-12' },
      { label: 'GSLC-13(CW)', value: 'GSLC-13' },
      { label: 'GSLC-14(CW)', value: 'GSLC-14' },
      { label: 'GSLC-15(CW)', value: 'GSLC-15' },
      { label: 'GSLC-01(CW)', value: 'GSLC-01' },
      { label: 'GSLC-02(CW)', value: 'GSLC-02' },
      { label: 'GSLC-03(CW)', value: 'GSLC-03' },
      { label: 'GSLC-04(CW)', value: 'GSLC-04' },
      { label: 'GSLC-05(CW)', value: 'GSLC-05' },
      { label: 'GSLC-06(CW)', value: 'GSLC-06' },
      { label: 'GSLC-07(CW)', value: 'GSLC-07' },
      { label: 'GSLC-08(CW)', value: 'GSLC-08' },
      { label: 'GSLC-09(CW)', value: 'GSLC-09' },
      { label: 'GSLC-10(CW)', value: 'GSLC-10' },
      { label: 'GSLC-11(CW)', value: 'GSLC-11' },
      { label: 'JZLC-01(CW)', value: 'JZLC-01' },
      { label: 'JZLC-02(CW)', value: 'JZLC-02' },
      { label: 'JZLC-03(CW)', value: 'JZLC-03' },
      { label: 'JZLC-04(CW)', value: 'JZLC-04' },
      { label: 'JZLC-05(CW)', value: 'JZLC-05' },
      { label: 'JZLC-06(CW)', value: 'JZLC-06' },
      { label: 'JZLC-07(CW)', value: 'JZLC-07' },
      { label: 'JZLC-08(CW)', value: 'JZLC-08' },
      { label: 'JZLC-09(CW)', value: 'JZLC-09' },
      { label: 'JZLC-10(CW)', value: 'JZLC-10' },
      { label: 'JZLC-11(CW)', value: 'JZLC-11' }
    ]
  },
  watch: {
    // v20190321: {
    //   deep: true,
    //   handler: function(val) {
    //     console.log(val)
    //   }
    // }
  }
}
</script>
<style>
.ceshi-demo {
  /* width: 200px;
    height: 160px;
    overflow: auto; */
}
p {
  font-size: 18px;
}
</style>
