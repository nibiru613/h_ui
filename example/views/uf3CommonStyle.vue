<template>
    <div>
        <h1 class='uf-header'>统一样式规范HUI组件demo</h1>
        <h3 class='uf-title'>按钮</h3>
        <h-button type="info" disabled>信息按钮</h-button>
        <h-button type="success">成功按钮</h-button>
        <h-button type="warning">警告按钮</h-button>
        <h-button type="error">错误按钮</h-button>
        <h-button type="danger">错误按钮</h-button>
        <h3 class='uf-title'>输入框</h3>
        <h-row>
            <h-form :model="inputItem" cols="3">
                <h-form-item required label="正常">
                    <h-input v-model="inputItem.input1" placeholder="请输入..." style="width: 300px"></h-input>
                </h-form-item>
                <h-form-item label="禁用">
                    <h-input placeholder="disabled" style="width: 300px" disabled></h-input>
                </h-form-item>
                <h-form-item label="只读">
                    <h-input value="" placeholder="readonly" style="width: 300px" readonly></h-input>
                </h-form-item>
                <h-form-item label="正常">
                    <h-input type="textarea" :rows="3" placeholder="请输入..."></h-input>
                </h-form-item>
                <h-form-item label="禁用">
                    <h-input type="textarea" :rows="3" placeholder="请输入..." disabled></h-input>
                </h-form-item>
                <h-form-item label="只读">
                    <h-input type="textarea" :rows="3" placeholder="请输入..." readonly></h-input>
                </h-form-item>
            </h-form>
        </h-row>
        <h3 class='uf-title'>数字输入框</h3>
        <h-row>
            <h-form :model="inputItem" cols="3">
                <h-form-item required label="正常">
                    <h-input-number :max="10" :min="1" :step="1" v-model="inputItem.input2" style="width: 300px"></h-input-number>
                </h-form-item>
                <h-form-item label="禁用">
                    <h-input-number :max="10" :min="1" :step="1" v-model="inputItem.input2" disabled style="width: 300px"></h-input-number>
                </h-form-item>
                <h-form-item label="只读">
                    <h-input-number :max="10" :min="1" :step="1" v-model="inputItem.input2" readonly style="width: 300px"></h-input-number>
                </h-form-item>
                <h-form-item label="带小数">
                    <h-input-number :max="10" :min="1" :step="1" v-model="inputItem.input3" style="width: 300px"></h-input-number>
                </h-form-item>
                <h-form-item label="四位小数">
                    <h-input-number :max="30" :min="1" :step="1" v-model="inputItem.input4" style="width: 300px"></h-input-number>
                </h-form-item>
                <h-form-item label="append">
                    <h-input-number :step="1" v-model="inputItem.input4" style="width: 300px">
                        <span slot="append">份</span>
                    </h-input-number>
                </h-form-item>
            </h-form>
        </h-row>
        <h3 class='uf-title'>金额输入框</h3>
        <h-row>
            <h-form :model="inputItem" cols="3" :rules="ruleInline">
                <h-form-item prop="text1" label="正常">
                    <h-typefield suffixNum="2" type="money" v-model="inputItem.text1" bigTips style="width: 300px">
                        <span slot="append">元</span>
                    </h-typefield>
                </h-form-item>
                <h-form-item label="禁用">
                    <h-typefield suffixNum="2" type="money" bigTips disabled style="width: 300px"></h-typefield>
                </h-form-item>
                <h-form-item label="只读">
                    <h-typefield suffixNum="2" type="money" bigTips readonly style="width: 300px"></h-typefield>
                </h-form-item>
                <h-form-item label="append">
                    <h-typefield type="money" bigTips style="width: 300px">
                        <span slot="append">元</span>
                    </h-typefield>
                </h-form-item>
            </h-form>
        </h-row>
        <h3 class='uf-title'>单选</h3>
        <div>没有readonly属性</div>
        <h-row>
            <h-form :model="inputItem" cols="3">
                <h-form-item required label="正常">
                    <h-radio v-model="inputItem.single">Radio1</h-radio>
                </h-form-item>
                <h-form-item label="禁用">
                    <h-radio v-model="inputItem.single1" disabled>Radio2</h-radio>
                </h-form-item>
                <h-form-item label="radiogroup">
                    <h-radio-group v-model="inputItem.single3">
                        <h-radio label="北京"></h-radio>
                        <h-radio label="上海"></h-radio>
                        <h-radio label="深圳"></h-radio>
                        <h-radio label="杭州"></h-radio>
                    </h-radio-group>
                </h-form-item>
            </h-form>
        </h-row>
        <h3 class='uf-title'>多选</h3>
        <div>没有readonly属性</div>
        <h-row>
            <h-form :model="inputItem" cols="3">
                <h-form-item required label="正常">
                    <h-checkbox-group v-model="inputItem.checkbox">
                        <h-checkbox label="香蕉"></h-checkbox>
                        <h-checkbox label="苹果"></h-checkbox>
                        <h-checkbox label="西瓜"></h-checkbox>
                    </h-checkbox-group>
                </h-form-item>
                <h-form-item label="禁用">
                    <h-checkbox-group v-model="inputItem.checkbox1">
                        <h-checkbox label="香蕉" disabled></h-checkbox>
                        <h-checkbox label="苹果" disabled></h-checkbox>
                        <h-checkbox label="西瓜" disabled></h-checkbox>
                    </h-checkbox-group>
                </h-form-item>
            </h-form>
        </h-row>
        <h3 class='uf-title'>开关</h3>
        <h-switch>
            <span slot="open">开</span>
            <span slot="close">关</span>
        </h-switch>
        <div>disabled</div>
        <h-switch :disabled="disabled" v-model="open">
            <span slot="open">开</span>
            <span slot="close">关</span>
        </h-switch>
        <h3 class='uf-title'>select下拉选择器</h3>
        <div>没有readonly状态</div>
        <h-row>
            <h-form :model="inputItem" cols="3">
                <h-form-item label="正常">
                    <h-select v-model="inputItem.select1">
                        <h-option v-for="(item, index) in inputItem.uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
                    </h-select>
                </h-form-item>
                <h-form-item label="禁用">
                    <h-select v-model="inputItem.select1" disabled>
                        <h-option v-for="(item, index) in inputItem.uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
                    </h-select>
                </h-form-item>
                <h-form-item label="多选">
                    <h-select v-model="inputItem.select2" multiple>
                        <h-option v-for="(item, index) in inputItem.uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
                    </h-select>
                </h-form-item>
            </h-form>
        </h-row>
        <h3 class='uf-title'>datepicker日期选择器</h3>
        <h-row>
            <h-form :model="inputItem" cols="2">
                <h-form-item label="正常">
                    <h-date-picker value="20190305" format="yyyyMMdd" type="date" placement="bottom-start" placeholder="选择日期" style="width: 300px"></h-date-picker>
                </h-form-item>
                <h-form-item label="只读">
                    <h-date-picker value="20190307" format="yyyyMMdd" type="date" placement="bottom-end" style="width: 300px" readonly></h-date-picker>
                </h-form-item>
                <h-form-item label="禁用">
                    <h-date-picker :value="inputItem.date1" format="yyyyMMdd" type="date" placement="bottom" style="width: 300px" disabled></h-date-picker>
                </h-form-item>
                <h-form-item label="范围">
                    <h-date-picker :value="inputItem.daterg" format="yyyyMMdd" type="daterange" placement="bottom-start" style="width: 300px"></h-date-picker>
                </h-form-item>
                <h-form-item label="月份">
                    <h-date-picker type="month" placeholder="选择月" style="width: 300px"></h-date-picker>
                </h-form-item>
                <h-form-item label="日期时间">
                    <h-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期和时间" style="width: 300px"></h-date-picker>
                </h-form-item>
            </h-form>
        </h-row>
        <h3 class='uf-title'>timepicker时间选择器</h3>
        <h-row>
            <h-form :model="inputItem" cols="3">
                <h-form-item label="正常">
                    <h-time-picker :value="inputItem.time1" placeholder="选择时间" style="width: 200px"></h-time-picker>
                </h-form-item>
                <h-form-item label="只读">
                    <h-date-picker :value="inputItem.time1" placeholder="选择时间" style="width: 200px" readonly></h-date-picker>
                </h-form-item>
                <h-form-item label="禁用">
                    <h-date-picker :value="inputItem.time2" placeholder="选择时间" style="width: 200px" disabled></h-date-picker>
                </h-form-item>
                <h-form-item label="范围">
                    <h-time-picker type="timerange" placement="bottom-start" placeholder="选择时间" style="width: 200px"></h-time-picker>
                </h-form-item>
            </h-form>
        </h-row>
        <h3 class='uf-title'>transfer穿梭框</h3>
        <h-row>
            <h-transfer :data="trans1" :target-keys="targetKeys1" :render-format="render1" @on-change="handleChange1"></h-transfer>
        </h-row>
        <h3 class='uf-title'>upload附件上传</h3>
        <h-row>
            <h-upload action="//jsonplaceholder.typicode.com/posts/">
                <h-button type="ghost" icon="ios-cloud-upload-outline">上传文件</h-button>
            </h-upload>
        </h-row>
        <div>手动上传</div>
        <h-row>
            <h-upload action="//jsonplaceholder.typicode.com/posts/" selfConfig show-upload-list>
                <h-button type="ghost" icon="ios-cloud-upload-outline" slot="chooseFile">选择要上传文件的文件</h-button>
                <h-button type="ghost" icon="ios-cloud-upload-outline" slot="postFile">开始上传</h-button>
                <h-button type="ghost" icon="ios-cloud-upload-outline" slot="cancleFile">取消</h-button>
                <h-button type="ghost" icon="ios-cloud-upload-outline" slot="showList" ref="showList">已上传列表</h-button>
            </h-upload>
        </h-row>
        <h3 class='uf-title'>poptip 文字提示</h3>
        <h-row>
            <h-poptip trigger="hover" title="提示标题" content="提示内容">
                <h-button>hover 激活</h-button>
            </h-poptip>
            <h-poptip title="提示标题" content="提示内容">
                <h-button>click 激活</h-button>
            </h-poptip>
        </h-row>
        <h3 class='uf-title'>tabs 标签页</h3>
        <h-row style="height:230px">
            <h-tabs>
                <h-tab-pane label="标签一">标签一的内容</h-tab-pane>
                <h-tab-pane label="标签二">标签二的内容</h-tab-pane>
                <h-tab-pane label="标签三">标签三的内容</h-tab-pane>
            </h-tabs>
        </h-row>
        <h-row style="height:230px">
            <h-tabs type="card">
                <h-tab-pane label="标签一">标签一的内容</h-tab-pane>
                <h-tab-pane label="标签二">标签二的内容</h-tab-pane>
                <h-tab-pane label="标签三">标签三的内容</h-tab-pane>
            </h-tabs>
        </h-row>
        <h3 class='uf-title'>分页</h3>
        <h-row>
            <div>
                <h-page :total="100" show-sizer show-elevator show-total></h-page>
            </div>
        </h-row>
        <h3 class='uf-title'>steps 步骤条</h3>
        <h-row>
            <h-steps :current="1" status="process">
                <h-step title="已完成" content="需求评审"></h-step>
                <h-step title="进行中" content="需求开发"></h-step>
                <h-step title="待进行" content="需求测试"></h-step>
                <h-step title="待进行" content="版本发布"></h-step>
            </h-steps>
        </h-row>
        <h-row style="margin-top:30px">
            <h-steps :current="1">
                <h-step title="注册" icon="person-add"></h-step>
                <h-step title="上传头像" icon="camera"></h-step>
                <h-step title="验证邮箱" icon="email"></h-step>
            </h-steps>
        </h-row>
        <h3 class='uf-title'>tree 树</h3>
        <h-row style="margin-top:30px">
            <h-tree :data="treedata" show-checkbox></h-tree>
        </h-row>
        <h3 class='uf-title'>badage 徽章</h3>
        <h-row style="margin-top:30px">
            <h-badge count="100" overflow-count="99" class-name="custom-name">
                <h-icon name="mail" size="40"></h-icon>
            </h-badge>
        </h-row>
        <h3 class='uf-title'>表格</h3>
        <div>
            <h-table height="300" border :columns="columns1" :data="tabledata1" show-header>
                <span slot="header">表格标题</span>
                <span slot="footer">bottom</span>
            </h-table>
        </div>
        <div>表格多选</div>
        <div>
            <h-table border :columns="columns2" :data="data2"></h-table>
        </div>
        <h3 class='uf-title'>分组表格</h3>
        <h3 class='uf-title'>collapse 折叠面板</h3>
        <h-row style="margin-top:30px">
            <h-collapse v-model="value2" accordion>
                <h-panel name="1">
                    史蒂夫·乔布斯
                    <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                </h-panel>
                <h-panel name="2">
                    斯蒂夫·盖瑞·沃兹尼亚克
                    <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
                </h-panel>
                <h-panel name="3">
                    乔纳森·伊夫
                    <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
                </h-panel>
            </h-collapse>
        </h-row>
        <h3 class='uf-title'>alert 警告提示</h3>
        <h-row style="margin-top:30px">
            <h-alert type="success" show-icon closable>
                成功提示文案
                <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
            </h-alert>
            <h-alert type="warning" show-icon closable>
                警告提示文案
                <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
            </h-alert>
            <h-alert type="error" show-icon closable>
                错误提示文案
                <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
            </h-alert>
            <h-alert show-icon closable>
                信息提示文案
                <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
            </h-alert>
        </h-row>
        <h3 class='uf-title'>notice 消息提醒</h3>
        <h-row>
            <h-button @click="info(false)" type="primary">消息</h-button>
            <h-button @click="success(false)" type="success">成功</h-button>
            <h-button @click="warning(false)" type="warning">警告</h-button>
            <h-button @click="error(false)" type="error">错误</h-button>
        </h-row>
        <h3 class='uf-title'>tooltip 文字提示</h3>
        <h-row>
            <h-tooltip content="Top Left 文字提示" placement="top-start">
                <h-button>上左</h-button>
            </h-tooltip>
            <h-tooltip content="Top Center 文字提示" placement="top">
                <h-button>上边</h-button>
            </h-tooltip>
            <h-tooltip content="Top Right 文字提示" placement="top-end">
                <h-button>上右</h-button>
            </h-tooltip>
        </h-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            input1: "",
            open: true,
            disabled: true,
            value2: [1],
            inputItem: {
                input1: "123",
                input2: 3,
                input3: 1.02,
                input4: 1.0012,
                single: true,
                single1: false,
                single2: false,
                single3: "北京",
                checkbox: ["香蕉"],
                checkbox1: ["苹果"],
                select1: "1",
                select2: [],
                text1: "123",
                date1: "2019-05-07",
                daterg: ["2019-01-01", "2019-02-15"],
                time1: "10:25:46",
                time2: "20:48:13",
                time3: ["09:41:00", "12:00:00"],
                uList: [
                    { id: "1", name: "中国" },
                    { id: "2", name: "美国" },
                    { id: "3", name: "韩国" },
                    { id: "4", name: "日本" },
                    { id: "5", name: "新加坡" },
                    { id: "6", name: "泰国" }
                ]
            },
            ruleInline: {
                text1: [
                    { required: true, message: '请填输入金额', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            },
            trans1: this.getMockData(),
            targetKeys1: this.getTargetKeys(),
            columns1: [
                {
                    title: "产品名称",
                    key: "name",
                    width: 100
                },
                {
                    title: "客户ID",
                    key: "id",
                    width: 100
                },
                {
                    title: "交易类别",
                    key: "type"
                },
                {
                    title: "股票代码",
                    key: "code",
                    width: 100
                },
                {
                    title: "单价",
                    key: "price"
                },
                {
                    title: "交易日期",
                    key: "date"
                },
                {
                    title: "描述",
                    key: "detail",
                    width: 200
                },
                {
                    title: "合约代码",
                    key: "tradeno"
                },
                {
                    title: "操作",
                    key: "action",
                    width: 140,
                    fixed: "right",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    style: {
                                        'color': "#029AFD",
                                        'margin-right': '30px'
                                    }
                                },
                                "查看"
                            ),
                            h(
                                "a",
                                {
                                    style: {
                                        color: "#029AFD"
                                    }
                                },
                                "编辑"
                            )
                        ]);
                    }
                }
            ],
            tabledata1: [
                {
                    name: "hundsun",
                    id: "0101254",
                    type: "股票",
                    code: "600570",
                    price: "88.88",
                    date: "2019-05-09",
                    detail: "HUI描述信息详情页面",
                    tradeno: "ST4512DFD",
                    zip: 100000
                },
                {
                    name: "hundsun",
                    id: "0101254",
                    type: "股票",
                    code: "600570",
                    price: "88.88",
                    date: "2019-05-09",
                    detail: "HUI描述信息详情页面",
                    tradeno: "ST4512DFD",
                    zip: 100000
                },
                {
                    name: "hundsun",
                    id: "0101254",
                    type: "股票",
                    code: "600570",
                    price: "88.88",
                    date: "2019-05-09",
                    detail: "HUI描述信息详情页面",
                    tradeno: "ST4512DFD",
                    zip: 100000
                },
                {
                    name: "hundsun",
                    id: "0101254",
                    type: "股票",
                    code: "600570",
                    price: "88.88",
                    date: "2019-05-09",
                    detail: "HUI描述信息详情页面",
                    tradeno: "ST4512DFD",
                    zip: 100000
                },
                {
                    name: "hundsun",
                    id: "0101254",
                    type: "股票",
                    code: "600570",
                    price: "88.88",
                    date: "2019-05-09",
                    detail: "HUI描述信息详情页面",
                    tradeno: "ST4512DFD",
                    zip: 100000
                },
                {
                    name: "hundsun",
                    id: "0101254",
                    type: "股票",
                    code: "600570",
                    price: "88.88",
                    date: "2019-05-09",
                    detail: "HUI描述信息详情页面",
                    tradeno: "ST4512DFD",
                    zip: 100000
                },
                {
                    name: "hundsun",
                    id: "0101254",
                    type: "股票",
                    code: "600570",
                    price: "88.88",
                    date: "2019-05-09",
                    detail: "HUI描述信息详情页面",
                    tradeno: "ST4512DFD",
                    zip: 100000
                },
                {
                    name: "hundsun",
                    id: "0101254",
                    type: "股票",
                    code: "600570",
                    price: "88.88",
                    date: "2019-05-09",
                    detail: "HUI描述信息详情页面",
                    tradeno: "ST4512DFD",
                    zip: 100000
                }
            ],
            columns2: [
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
            data2: [
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
            ],
            treedata: [{
                expand: true,
                checked: true,
                title: 'parent 1',
                children: [{
                    title: 'parent 1-0',
                    expand: true,
                    disabled: true,
                    children: [{
                        expand: true,
                        checked: true,
                        disabled: true,
                        title: 'leaf',
                        disableCheckbox: true
                    }, {
                        title: 'leaf',
                    }]
                }, {
                    title: 'parent 1-1',
                    expand: true,
                    checked: true,
                    children: [{
                        title: '<span style="color: red">leaf</span>',
                    }, {
                        title: 'leaf2',
                    }]
                }]
            }]
        };
    },
    methods: {
        testClick (val) { },
        getMockData () {
            let mockData = [];
            for (let i = 1; i <= 20; i++) {
                mockData.push({
                    key: i.toString(),
                    label: "内容" + i,
                    description: "内容" + i + "的描述信息",
                    disabled: Math.random() * 3 < 1
                });
            }
            return mockData;
        },
        getTargetKeys () {
            return this.getMockData()
                .filter(() => Math.random() * 2 > 1)
                .map(item => item.key);
        },
        render1 (item) {
            return item.label;
        },
        handleChange1 (newTargetKeys, direction, moveKeys) {
            this.targetKeys1 = newTargetKeys;
        },
        info (nodesc) {
            this.$hNotice.info({
                title: '这是通知标题',
                desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
            });
        },
        success (nodesc) {
            this.$hNotice.success({
                title: '这是通知标题',
                desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
            });
        },
        warning (nodesc) {
            this.$hNotice.warning({
                title: '这是通知标题',
                desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
            });
        },
        error (nodesc) {
            this.$hNotice.error({
                title: '这是通知标题',
                desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
            });
        }
    }
};
</script>
<style>
.uf-header {
  color: #333;
  text-align: center;
}
.uf-title {
  color: #585e6a;
  font-size: 16px;
  margin: 15px;
}
</style>