webpackJsonp([69],{688:function(t,s,e){var r=e(0)(e(765),e(891),null,null);t.exports=r.exports},765:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={methods:{close:function(){console.log("你关闭了当前alert")}}}},891:function(t,s,e){"use strict";t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("h1",[t._v("Alert组件")]),t._v(" "),e("h2",[t._v("静态地呈现一些警告信息，可手动关闭")]),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),e("h1",[t._v("基础用法")]),t._v(" "),e("h-alert",[t._v("消息提示文案")]),t._v(" "),e("h-alert",{attrs:{type:"success"}},[t._v("成功提示文案")]),t._v(" "),e("h-alert",{attrs:{type:"warning"}},[t._v("警告提示文案")]),t._v(" "),e("h-alert",{attrs:{type:"error"}},[t._v("错误提示文案")]),t._v(" "),e("h1",[t._v('自定义 slot="desc" 描述内容。')]),t._v(" "),e("h-alert",[t._v("\n    消息提示文案\n    "),e("template",{slot:"desc"},[t._v("消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案")])],2),t._v(" "),e("h-alert",{attrs:{type:"success"}},[t._v("\n    成功提示文案\n    "),e("span",{attrs:{slot:"desc"},slot:"desc"},[t._v("成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案")])]),t._v(" "),e("h-alert",{attrs:{type:"warning"}},[t._v("\n    警告提示文案\n    "),e("template",{slot:"desc"},[t._v("\n        警告的提示描述文案警告的提示描述文案警告的提示描述文案\n    ")])],2),t._v(" "),e("h-alert",{attrs:{type:"error"}},[t._v("\n    错误提示文案\n    "),e("span",{attrs:{slot:"desc"},slot:"desc"},[t._v("\n      自定义错误描述文案。"),e("h-icon",{attrs:{name:"delete",size:"14"}})],1)]),t._v(" "),e("h1",[t._v("带图标的h-alert")]),t._v(" "),e("h-alert",{attrs:{"show-icon":""}},[t._v("消息提示文案")]),t._v(" "),e("h-alert",{attrs:{type:"success","show-icon":""}},[t._v("成功提示文案")]),t._v(" "),e("h-alert",{attrs:{type:"warning","show-icon":""}},[t._v("警告提示文案")]),t._v(" "),e("h-alert",{attrs:{type:"error","show-icon":""}},[t._v("错误提示文案")]),t._v(" "),e("h-alert",{attrs:{"show-icon":""}},[t._v("\n      消息提示文案\n      "),e("template",{slot:"desc"},[t._v("消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案")])],2),t._v(" "),e("h-alert",{attrs:{type:"success","show-icon":""}},[t._v("\n      成功提示文案\n      "),e("span",{attrs:{slot:"desc"},slot:"desc"},[t._v("成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案")])]),t._v(" "),e("h-alert",{attrs:{type:"warning","show-icon":""}},[t._v("\n      警告提示文案\n      "),e("template",{slot:"desc"},[t._v("\n          警告的提示描述文案警告的提示描述文案警告的提示描述文案\n      ")])],2),t._v(" "),e("h-alert",{attrs:{type:"error","show-icon":""}},[t._v("\n      错误提示文案\n      "),e("span",{attrs:{slot:"desc"},slot:"desc"},[t._v("\n          自定义错误描述文案。\n      ")])]),t._v(" "),e("h-alert",{attrs:{"show-icon":""}},[t._v("\n      自定义图标\n      "),e("h-icon",{attrs:{slot:"icon",name:"remind"},slot:"icon"}),t._v(" "),e("template",{slot:"desc"},[t._v("自定义图标文案自定义图标文案自定义图标文案自定义图标文案自定义图标文案")])],2),t._v(" "),e("h1",[t._v("h-alert可关闭")]),t._v(" "),e("h-alert",{attrs:{closable:""}},[t._v("消息提示文案")]),t._v(" "),e("h-alert",{attrs:{type:"success","show-icon":"",closable:""},on:{"on-close":t.close}},[t._v("\n    成功提示文案\n    "),e("span",{attrs:{slot:"desc"},slot:"desc"},[t._v("成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案")])]),t._v(" "),e("h-alert",{attrs:{type:"warning",closable:""}},[t._v("\n    自定义关闭内容\n    "),e("span",{attrs:{slot:"close"},slot:"close"},[t._v("不再提示")])])],1)},staticRenderFns:[]}}});