<!--<template>
  <h-edit-gird ref="editGrid"
    style="border-left:1px solid #dce1e7;"
    :columns="columns"
    :data="gridData"
    :showEditInput=true
    size="small"
    height=260
    stripe>
  </h-edit-gird>
</template>

<script>
const prefixCls = 'v-hello';
export default {
  name: 'Hello',
  data(){
    return {
      columns: [
        {
          title: '基准利率类型',
          key: 'basisRateType',
          render: (h, params) => {
            if (params.row.basisRateType) {
              const { basisRateType } = params.row;
              const { dictList } = this;
              const dictObj = dictList.basisRateTypeDict.filter(
                item => item.value === basisRateType,
              );
              return h('span', dictObj[0].caption);
            }
            return h('span', '');
          },
        },
        {
          type: 'money',
          title: '年利率',
          key: 'yearRate',
          suffixNum: 6,
        },
        {
          type: 'money',
          title: '月利率',
          key: 'monthRate',
          suffixNum: 6,
        },
        {
          title: '调整日期',
          type: 'date',
          key: 'adjustDate',
          hiddenCol: true,
        },
        {
          title: '币种',
          key: 'currencyNo',
          hiddenCol: true,
        },
        {
          title: '基准利率分类',
          key: 'baseRateTypeClass',
          hiddenCol: true,
        },
      ],
      gridData:[{basisRateType:'1',yearRate:1}],
    }
  },
  created () {
    this.msg = 'bye!'
  },
  computed:{
    helloclass(){
      return `${prefixCls}-hello`
    }
  }

}
</script>
-->























<!--<template>
<div>
    <Button @click="change"></Button>
    <h-table height="300" border :columns="columns2" :data="data3" notSetWidth @on-right-click="rightClick" @on-row-dblclick="dblclick"></h-table>
    <input id="keyword"  @change="change" placeholder="input your keyword" />
    <div id="msg-list"></div>
</div>
</template>
<script>
    export default {
        data () {
            return {
                columns2: [
                    {
                        title: '姓名1111111111',
                        key: 'name',
                        sortable:true,
                        // width: 100,
                    },
                    {
                        title: '年龄111111111111111111111111111',
                        key: 'age',
                        // width: 100
                    },
                    {
                        title: '省份111111111111111111',
                        key: 'province',
                        sortable:true,
                        // width: 100
                    },
                    {
                        title: '市区11111111111111',
                        key: 'city',
                        // width: 100
                    },
                    {
                        title: '地址11111111',
                        key: 'address',
                        // width: 200
                    },
                    {
                        title: '邮编111111111111111111111111',
                        key: 'zip',
                        // width: 100
                    },
                    {
                        title:"111111111111111111111111111111111",
                        key:'city',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                data3:[]
            }
        },
        methods:{
            change(){
                this.$set(this.columns2[5],'fixed','left')
                // this.columns2.push({
                //     title:"111111111111111111111111111111111",
                //     key:'city',
                //     fixed:'left',
                // })
            },
            rightClick(e){
                console.log(e)
            },
            dblclick(){
                console.log('dbl')
            }
        },
        mounted(){
            setTimeout(()=>{
                 this.data3 = [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居11111111111111111',
                        province: '北京市',
                        city: '朝阳区',
                        zip: 100000
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗',
                        province: '北京市',
                        city: '海淀区',
                        zip: 100000
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        province: '上海市',
                        city: '浦东新区',
                        zip: 100000
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道',
                        province: '广东',
                        city: '南山区',
                        zip: 100000
                    },
                                        {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        province: '北京市',
                        city: '朝阳区',
                        zip: 100000
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗',
                        province: '北京市',
                        city: '海淀区',
                        zip: 100000
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        province: '上海市',
                        city: '浦东新区',
                        zip: 100000
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道',
                        province: '广东',
                        city: '南山区',
                        zip: 100000
                    }
                ]
        
            },1000)
        }
    }
</script>
-->
<!--<template>
<div>
    <h-table height="300" border :columns="columns2" :data="data4" fixedAutoHeight></h-table>
    <button @click="ttt">gengxinshuju</button>
</div>
</template>
<script>
    export default {
        data () {
            return {
                columns2: [
                    {
                        title: '姓名',
                        key: 'name',
                        width: 100,
                        fixed: 'left'
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        width: 100
                    },
                    {
                        title: '省份',
                        key: 'province',
                        width: 100
                    },
                    {
                        title: '市区',
                        key: 'city',
                        width: 100
                    },
                    {
                        title: '地址',
                        key: 'address',
                        // minwidth: 100
                    },
                    {
                        title: '邮编',
                        key: 'zip'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                data4: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        province: '北京市',
                        city: '朝阳区',
                        zip: 100000
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗',
                        province: '北京市',
                        city: '海淀区',
                        zip: 100000
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        province: '上海市',
                        city: '浦东新区',
                        zip: 100000
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道',
                        province: '广东',
                        city: '南山区',
                        zip: 100000
                    },
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        province: '北京市',
                        city: '朝阳区',
                        zip: 100000
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗',
                        province: '北京市',
                        city: '海淀区',
                        zip: 100000
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        province: '上海市',
                        city: '浦东新区',
                        zip: 100000
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道',
                        province: '广东',
                        city: '南山区',
                        zip: 100000
                    }
                ]
            }
        },methods:{
        ttt(){
         this.data4=[
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        province: '北京市',
                        city: '朝阳区',
                        zip: 100000
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗',
                        province: '北京市',
                        city: '海淀区',
                        zip: 100000
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        province: '上海市',
                        city: '浦东新区',
                        zip: 100000
                    }
                ];
        }
        }
    }
</script>

</script>
-->
<!--<template>
<div>
    <h-form ref="formValidate" :model="formValidate" cols="2" :label-width="80">
        <h-form-item label="input" prop="name">
            <h-input v-model="formValidate.name" placeholder="请输入姓名" class="curItemClass" data-index="0"></h-input>
        </h-form-item>
        <h-form-item label="typefield" prop="mail">
            <h-typefield v-model="formValidate.mail" placeholder="请输入邮箱" class="curItemClass" data-index="2"></h-typefield >
        </h-form-item>
        <h-form-item label="select" prop="city">
            <h-select v-model="formValidate.city"  multiple placeholder="请选择所在地" class="curItemClass" data-index="1">
                <h-option value="beijing">北京市</h-option>
                <h-option value="shanghai">上海市</h-option>
                <h-option value="shenzhen">深圳市</h-option>
            </h-select>
        </h-form-item>
        <h-form-item label="simpleSelect" prop="city">
            <h-simple-select v-model="formValidate.city" multiple placeholder="请选择所在地" class="curItemClass" data-index="4">
                <h-select-block :data="bigData"></h-select-block>
            </h-simple-select>
        </h-form-item>
        <h-form-item prop="date" label="data">
            <h-date-picker type="date" placeholder="选择日期" v-model="formValidate.date" class="curItemClass" data-index="5"></h-date-picker>
        </h-form-item>
        <h-form-item prop="time" label="time">
            <h-time-picker type="time" placeholder="选择时间" v-model="formValidate.time" class="curItemClass" data-index="6"></h-time-picker>
        </h-form-item>
        <h-form-item label="radio" prop="gender">
            <h-radio-group v-model="formValidate.gender">
                <h-radio label="male" class="curItemClass" data-index="7">男</h-radio>
                <h-radio label="female" class="curItemClass" data-index="8">女</h-radio>
            </h-radio-group>
        </h-form-item>
        <h-form-item label="checkbox" prop="interest">
            <h-checkbox-group v-model="formValidate.interest">
                <h-checkbox label="吃饭" class="curItemClass" data-index="9"></h-checkbox>
                <h-checkbox label="睡觉" class="curItemClass" data-index="10"></h-checkbox>
                <h-checkbox label="跑步" class="curItemClass" data-index="11"></h-checkbox>
                <h-checkbox label="看电影" class="curItemClass" data-index="12"></h-checkbox>
            </h-checkbox-group>
        </h-form-item>
        <h-form-item>
            <h-button type="primary" canFocus @click="handleSubmit('formValidate')" class="curItemClass" data-index="1">提交</h-button>
            <h-button type="ghost"  canFocus  @click="handleReset('formValidate')" style="margin-left: 8px" class="curItemClass" data-index="1">重置</h-button>
        </h-form-item>
    </h-form>
</div>
</template>
<script>
import { enterHandler1 } from "../../src/util/tools.js";
export default {
  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
        city: [],
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      bigData: [
        { value: "value1", label: "label1" },
        { value: "value2", label: "label2" },
        { value: "value3", label: "label3" },
        { value: "value4", label: "label4" },
        { value: "value5", label: "label5" },
        { value: "value6", label: "label6" }
      ]
    };
  },
  methods: {
    handleSubmit(name) {
    //   this.$refs[name].validate(valid => {
    //     if (valid) {
    //       this.$Message.success("提交成功!");
    //     } else {
    //       this.$Message.error("表单验证失败!");
    //     }
    //   });
    },
    handleReset(name) {
    //   this.$refs[name].resetFields();
    }
  },
  mounted() {
    window.isO45 = true;
    document.addEventListener("keyup", event => {
      enterHandler1(this.$refs.formValidate, event);
    });
  }
};
</script>
-->
<!--<template>
<div>
        <h-table border :columns="columns4" :data="data1" rowSelect @on-select="selectOne" @on-select-all="selectAll" @on-selection-change="selectChange" @on-select-cancel="selectCancel"></h-table>
</div>
</template>
<script>
    export default {
        data () {
            return {
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ]
            }
        },
methods: {
        selectOne(selection,row) {
              //  console.log("选中一条");
              //  console.log(selection);
              //  console.log(row);
               },
        selectCancel(selection,row) {
              //  console.log("取消一条");
              //  console.log(selection);
              //  console.log(row);
               },
        selectAll(selection) {
              //  console.log("全选");
              //  console.log(selection);
               },
        selectChange(selection) {
              //  console.log("CHANGE事件");
              //  console.log(selection);
               }
        }
    }
</script>
-->
<!--<template>
<div>
 <h-button type="primary" @click="ttt">Toggle</h-button>
    <h-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" closeRuleChangeValidate>
        <h-form-item label="姓名" prop="name">
            <h-input v-model="formValidate.name" placeholder="请输入姓名"></h-input>
        </h-form-item>
        <h-form-item label="邮箱" prop="mail">
            <h-input v-model="formValidate.mail" placeholder="请输入邮箱"></h-input>
        </h-form-item> 
        <h-form-item label="城市" prop="city">
            <h-select v-model="formValidate.city" placeholder="请选择所在地">
                <h-option value="beijing">北京市</h-option>
                <h-option value="shanghai">上海市</h-option>
                <h-option value="shenzhen">深圳市</h-option>
            </h-select>
        </h-form-item>
        <h-form-item label="选择日期">
            <h-row>
                <h-col span="11">
                    <h-form-item prop="date">
                        <h-date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></h-date-picker>
                    </h-form-item>
                </h-col>
                <h-col span="2" style="text-align: center">-</h-col>
                <h-col span="11">
                    <h-form-item prop="time">
                        <h-time-picker type="time" placeholder="选择时间" v-model="formValidate.time"></h-time-picker>
                    </h-form-item>
                </h-col>
            </h-row>
        </h-form-item>
        <h-form-item label="性别" prop="gender">
            <h-radio-group v-model="formValidate.gender">
                <h-radio label="male">男</h-radio>
                <h-radio label="female">女</h-radio>
            </h-radio-group>
        </h-form-item>
        <h-form-item label="爱好" prop="interest">
            <h-checkbox-group v-model="formValidate.interest">
                <h-checkbox label="吃饭"></h-checkbox>
                <h-checkbox label="睡觉"></h-checkbox>
                <h-checkbox label="跑步"></h-checkbox>
                <h-checkbox label="看电影"></h-checkbox>
            </h-checkbox-group>
        </h-form-item>
        <h-form-item label="介绍" prop="desc">
            <h-input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></h-input>
        </h-form-item>
        <h-form-item>
            <h-button type="primary" @click="handleSubmit('formValidate')">提交</h-button>
            <h-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</h-button>
        </h-form-item>
    </h-form>
</div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate111: {
                    name: [
                        { required: false, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: false, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: false, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: false, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: false, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: false, message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: false, message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: false, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
            }
        },
        {
          type: "selection",
          align: "center",
          key: "select",
          width: 200,
          fixed: "left"
        },
        {
          title: "年龄",
          key: "tradeDate",
          width: 200
        },
        {
          title: "地址",
          width: 200,
          key: "securityCode",
          fixed: "right"
        },
        {
          title: "地址1",
          key: "securityName",
          width: 220
        }
      ],
      columns2: [
        {
          type: "index",
          align: "center",
          width: 200,
          fixed: "left"
        },
        {
          type: "selection",
          align: "center",
          key: "select",
          width: 200,
          fixed: "left"
        },
        {
          title: "年龄",
          key: "tradeDate",
          width: 200
        },
        {
          title: "地址",
          width: 200,
          key: "securityCode",
          fixed: "right"
        },
        {
          title: "地址1",
          key: "securityName",
          width: 200
        }
      ],
      columns3: [
        {
          type: "index",
          align: "center",
          width: 200,
          fixed: "left"
        },
        {
          type: "selection",
          align: "center",
          key: "select",
          width: 200,
          fixed: "left"
        },
        {
          title: "年龄",
          key: "tradeDate",
          width: 200
        },
        {
          title: "地址",
          width: 200,
          key: "securityCode",
          fixed: "right"
        },
        {
          title: "地址1",
          key: "securityName",
          width: 170
        }
      ],
      columns4: [
        {
          type: "index",
          align: "center",
          width: 200,
          fixed: "left"
        },
        {
          type: "selection",
          align: "center",
          key: "select",
          width: 200,
          fixed: "left"
        },
        {
          title: "年龄",
          key: "tradeDate",
          width: 200,
          fixed: "right"
        },
        {
          title: "地址",
          // width: 200,
          key: "securityCode"
        },
        {
          title: "地址1",
          key: "securityName",
          // width: 178
        }
      ],
      data1: tData.slice(0, 50),
      data2: tData.slice(0, 5),
      data3: []
    };
  },
  methods: {}
};
</script>

