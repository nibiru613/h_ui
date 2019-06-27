<template>
  <div v-if="!hidden" :class="clazz">
    <div :class="[prefixCls + '-group-prepend']" v-if="prepend"><slot name="prepend"></slot></div>
    <input
      :class="classes"
      :disabled="disabled"
      :readonly="!editable||readonly"
      :placeholder="localePlaceholder"
      :value="inputValue"
      :maxlength="maxlength"
      @blur="blurValue"
      @input="valChange"
      @change="valChange"
      @focus="focusValue($event)"
      ref="input">
    <transition name="label-fade">
      <div v-show="tipShow" :class="tipzz">{{bigNum}}</div>
    </transition>
    <div :class="[prefixCls + '-group-append']" v-if="append"><slot name="append"></slot></div>
  </div>
</template>
<script>
import {oneOf,formatnumber} from '../../util/tools'
import Emitter from '../../mixins/emitter';
import Locale from '../../mixins/locale';

Number.prototype.toFixedSelf = function (n) {
  if (n > 20 || n < 0) {
      throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }
  const number = this;
  if (isNaN(number) || number >= Math.pow(10, 21)) {
      return number.toString();
  }
  if (typeof (n) == 'undefined' || n == 0) {
      return (Math.round(number)).toString();
  }
  let result = number.toString();
  const arr = result.split('.');
  // 整数的情况
  if (arr.length < 2) {
      result += '.';
      for (let i = 0; i < n; i += 1) {
          result += '0';
      }
      return result;
  }
  const integer = arr[0];
  const decimal = arr[1];
  if (decimal.length == n) {
      return result;
  }
  if (decimal.length < n) {
      for (let i = 0; i < n - decimal.length; i += 1) {
          result += '0';
      }
      return result;
  }
  result = integer + '.' + decimal.substr(0, n);
  const last = decimal.substr(n, 1);

  // 四舍五入，转换为整数再处理，避免浮点数精度的损失
  if (parseInt(last, 10) >= 5) {
      const x = Math.pow(10, n);
      result = (Math.round((parseFloat(result) * x)) + 1) / x;
      result = result.toFixedSelf(n);
  }
  return result;
};
const prefixCls = 'h-typefield';
export default {
  name: 'Typefield',
  data(){
    return {
      prefixCls:prefixCls,
      focused: false,
      havefocused: false,
      inputValue: '',
      checked:false,
      tipShow:false,
      bigNum:null,
      currentValue: String(this.value),
      prepend: true,
      append: true,
      viewValue:''
    }
  },
  mixins: [ Emitter,Locale ],
  props: {
    type: {
      validator (value){
        return oneOf(value,['money','cardNo'])
      },
      default:'money'
    },
    value: {
      required: false,
      default:''
    },
    disabled: {
      type:Boolean,
      default:false
    },
    readonly: {
      type:Boolean,
      default:false
    },
    editable: {
      type:Boolean,
      default:true
    },
    placeholder: String,
    hidden: Boolean,
    isround:Boolean,
    integerNum: {
      type: [Number,String],
      default: 13
    },
    suffixNum:{
      type: [Number,String],
      default: 2
    },
    bigTips:Boolean,
    position:String,
    divided: {//是否添加分隔符
      type: Boolean,
      default: false,
    },
    immeDivided: {//是否添加分隔符
      type: Boolean,
      default: false,
    },
    algin:{//金额组件内部显示
      type:String,
      default:'left',
    },
    notFillin:{//格式化金额时，当小数点少于指定位数是否需要补0
      type: Boolean,
      default: false,
    },
    notFormat:{//不对数据进行格式化,输入什么是什么
      type: Boolean,
      default: false,
    },
    setNull:{
      type: Boolean,//设置空值为0
      default: false,
    },
    maxlength:{
      type:[String,Number],
      default:null,
    },
    cardFormat:{
      type: Boolean,
      default: true,
    },
    focusAllSelect:{
      type: Boolean,
      default: false,
    },
    // 非负数
    nonNegative: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    clazz () {
      return [
        `${prefixCls}`,
        {
          'input-field-focused': this.focused,
          'input-field-active': this.inputValue || this.placeholder || (this.$refs.input && this.$refs.input.value),
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-readonly`]: this.readonly,
          [`${prefixCls}-editable`]: !this.editable,
          [`${prefixCls}-group`]: this.prepend || this.append,
          [`${prefixCls}-group-with-prepend`]: this.prepend,
          [`${prefixCls}-group-with-append`]: this.append,
        }
      ]
    },
    tipzz () {
      return `${prefixCls}-tip`;
    },
    classes () {
      return `${prefixCls}-${this.algin}`;
    },
    localePlaceholder () {
      if (this.setNull) {
        return '';
      }
      if (this.placeholder === undefined) {
          return this.t('i.typefield.placeholder');
      } else {
          return this.placeholder;
      }
    },
  },
  watch: {
    value(val) {
      if(val!=null||val!=undefined){
        this.initValue(String(val));
      }
    },
    inputValue(val){
      this.viewValue=this.changeTipsVal(val)
    }
  },
  mounted () {
    this.prepend = this.$slots.prepend !== undefined;
    this.append = this.$slots.append !== undefined;
    if(this.value !=null||this.value!=undefined){
      this.initValue(String(this.value));
    }
  },
  methods:{
    // keyup,focus,blur
    blurValue (e) {
      this.havefocused = false;
      if (this.type=='money') {
        this.tipShow=false;
      }
      let val = this.inputValue?this.inputValue.trim():this.inputValue;
      if (val && val!="") {
        val = this.notFormat?e.target.value:this.formatNum(e.target.value.trim().replace(/,/g,''));
        if ((this.divided || this.immeDivided) && this.type=="money") {
          this.inputValue = this.divideNum(val);
        }else{
          this.inputValue = val;
        }
        e.target.value = this.inputValue;
      }else{
        if (this.setNull && this.type=="money") {
          val = this.setNullStr()
          e.target.value = val;
        }
      }
      // this.$refs.input.blur();
      this.$emit('input', this.cardFormatValue(val));
      this.$emit('on-blur',e)
      this.dispatch('FormItem', 'on-form-blur', val)
    },
    cardFormatValue(val){
      if(!this.cardFormat&&this.type=='cardNo'){
        val = val.replace(/\s+/g,"");
      }
      return val;
    },
    blur () {
      this.havefocused = false;
      this.$refs.input.blur();
      // this.$emit('on-blur')
      this.$emit('input', this.cardFormatValue(this.inputValue));
      this.dispatch('FormItem', 'on-form-blur', this.inputValue)
    },
    focusValue (e) {
      if (this.readonly||this.disabled) return false;
      this.focused = true;
      this.havefocused = true;
      if (this.type=="money") {
        if (this.setNull && Number(this.inputValue.trim())==0) {
          this.currentValue= '';
          this.inputValue='';
          e.target.value='';
        }else{
          if (this.notFillin&&this.inputValue&&!this.immeDivided&&!this.divided) {
            this.inputValue = String(parseFloat(this.inputValue));
          }
          if(!this.immeDivided){
            this.currentValue = this.inputValue?this.inputValue.trim().replace(/,/g, ""):this.inputValue;
          }else{
            this.currentValue = this.inputValue;
          }
          this.inputValue = this.currentValue;
        }
      }
      if (this.type == "cardNo") {
        this.inputValue = this.inputValue?String(this.inputValue).replace(/\s+/g,""):'';
      }
      this.bigShow(this.type,this.bigTips,this.inputValue)
      if(this.focusAllSelect && this.type==='money'){
        this.$nextTick(()=>{
          this.$refs.input.select();
        })
      }
      this.$emit('on-focus',e)
    },
    focus(){
      this.$refs.input.focus()
    },
    valChange (event) {
      let value = event.target.value.trim().replace(/,/g,'');
      // if (event.type == 'input' && value.match(/^\-?\.?$|\.$/)) return; // prevent fire early if decimal. If no more input the change event will fire later
      // if (event.type == 'change' && Number(value) == this.currentValue) return; // already fired change for input event
      if (this.nonNegative) {
        value = value.replace(/-/, '')
        event.target.value = value
      }

      if (!isNaN(value) || value === '-') {
        this.currentValue = value;
      } else {
        event.target.value = this.currentValue;
        value = this.currentValue;
      }
      if(!this.immeDivided){
        this.inputValue = value;
      }else{
        this.inputValue = this.divideNum(value);
      }
      this.bigShow(this.type,value);
      this.$emit('input', value);
      this.$emit('on-keyup', value);
      this.dispatch('FormItem', 'on-form-change', value);
    },
    divideNum(num){
      let revalue="";
      let array=String(num).split(".");
      let pointStr = array[1]?'.'+array[1]:''
      array[0] = array[0].replace(/-/g, "")
      if(array[0].length>3){
        while(array[0].length>3){
          revalue=","+array[0].substring(array[0].length-3,array[0].length)+revalue;
          array[0]=array[0].substring(0,array[0].length-3);
        }
      }
      return num>=0?array[0]+revalue+pointStr:'-'+array[0]+revalue+pointStr;
    },
    changeTipsVal (value){
      value  = String(value).replace(/[^0-9\.-]/g,"");
      var firstChar = value.substring(0,1);
      value = this.cutNum(value,this.integerNum);
      if(value.split(".")[1] && value.split(".")[1].length > 2){
        var isround = this.isround;
        if(isround&&isround==true){
          value = parseFloat(value).toFixedSelf(this.suffixNum);
        }else{
          var suf = value.split(".")[1].substr(0,this.suffixNum);
          value = value.split(".")[0]+"."+suf;
        }
      }
      return this.numtochinese(value + "",this.suffixNum);
    },
    // 转换科学技术法为数值---Number(val)会在小数点7位后以科学计数法返回，影响格式化
    changeRexNum (val) {
      let e = String(val)
      let rex = /^([0-9])\.?([0-9]*)e-([0-9])/
      if (!rex.test(e)) return val
      let numArr = e.match(rex)
      let n = Number('' + numArr[1] + (numArr[2] || ''))
      let num = '0.' + String(Math.pow(10, Number(numArr[3]) - 1)).substr(1) + n
      return num.replace(/0*$/, '') // 防止可能出现0.0001540000000的情况
    },
    // 修正val的小数位，val 为输入值，n为格式化位数【不用Number中的toFixed是因为超过7位小数Number会转换成科学计数法，格式化会报错，因此需要手动转换】
    toFixed (val, n) {
      if (n > 20 || n < 0) {
          throw new RangeError('toFixed() digits argument must be between 0 and 20');
      }
      // const number = this;
      if (isNaN(val) || val >= Math.pow(10, 21)) {
          return val.toString();
      }
      if (typeof (n) == 'undefined' || n == 0) {
          return (Math.round(val)).toString();
      }
      let result = val.toString();
      const arr = result.split('.');
      // 整数的情况
      if (arr.length < 2) {
          result += '.';
          for (let i = 0; i < n; i += 1) {
              result += '0';
          }
          return result;
      }
      const integer = arr[0];
      const decimal = arr[1];
      if (decimal.length == n) {
          return result;
      }
      if (decimal.length < n) {
          for (let i = 0; i < n - decimal.length; i += 1) {
              result += '0';
          }
          return result;
      }
      result = integer + '.' + decimal.substr(0, n);
      const last = decimal.substr(n, 1);

      // 四舍五入，转换为整数再处理，避免浮点数精度的损失
      if (parseInt(last, 10) >= 5) {
          const x = Math.pow(10, n);
          result = (Math.round((parseFloat(result) * x)) + 1) / x;
          result = result.toFixed(n);
      }
      return result;
    },
    formatNum (value){
      value = value.trim().replace(/,/g, "");
      var suffixNum = this.suffixNum;
      var integerNum = this.integerNum;
      value  = value.replace(/[^0-9\.-]/g,"")||'';
      var firstChar = value.substring(0,1)||'';
      if(this.type == "cardNo"){
        value=value.replace("-", "").replace(".", "")
        if(value!=null&&value!=""){
          if(value.indexOf(".")!=-1){
            value = value.split(".")[0];
          }
          value = value? value.match(/\d{1,4}/g).join("  "):"";
        }
      }
      if (this.type == "money") {
        if (firstChar=='-') {
          value = value.substring(1)||'';
        }
        var valArr = value.split(".");
        var intLength = valArr.length>0?valArr[0].length:value;
        if (integerNum<16 || intLength<16) {
          value=value.replace("-", "")
          value = this.cutNum(value,this.integerNum);
          if (value=='') return;
          if (this.isround) {
            // 7位小数Number会转成科学计数法
            // value = Number(value).toFixedSelf(suffixNum);
            let result = this.changeRexNum(Number(value))
            value = this.toFixed(result, suffixNum);
          }else {
            value = this.fillZero(value,Number(suffixNum))
          }
          value = this.setNum(value,suffixNum,integerNum)
          if (firstChar=='-') {
            value = '-'+value;
          }
          if (value.substring(value.length-1,value.length)=='.') {
            value = value.substring(0,value.length-1);
          }
        }else{
          value = this.setBigData(value,valArr);
          if (firstChar=='-') {
            value = '-'+value;
          }
        }
      }

      if (this.nonNegative) {
        value = value.replace(/-/, '')
      }

      return value
    },
    setBigData(value,arr){
      let curInt,curSuffix,val1,val2;
      let isCarry=false;
      if(arr.length>0){
        curInt = arr[0].substr(0,this.integerNum);
        curSuffix = arr[1];
      }else{
        curInt = value;
      }
      val1 = curInt.slice(0,8);
      val2 = curInt.slice(8);
      let curVal2 =curSuffix?val2+'.'+curSuffix:val2;
      if(this.isround){
        curVal2 = Number(curVal2).toFixedSelf(this.suffixNum);
      }else{
        curVal2 = this.fillZero(curVal2,Number(this.suffixNum))
        if(this.suffixNum>0){
          var arrNum=curVal2.split(".");
          curVal2 = arrNum[0]+'.'+arrNum[1].substring(0,this.suffixNum);
        }
      }
      let arr2 = curVal2.split('.');
      if((arr2.length>0 && arr2[0].length>val2.length)||(arr2.length==0&&curVal2.length>val2.length)){
        isCarry = true;
        curVal2 = curVal2.slice(1);
      }
      val1 = isCarry?Number(val1)+1:val1;
      value = val1+curVal2;
      return value;
    },
    numtochinese (Num,suffixNumber) {
      for (var i = Num.length - 1; i >= 0; i--) {
        Num = Num.replace(",", "")// 替换tomoney()中的“,”
        Num = Num.replace(" ", "")// 替换tomoney()中的空格
      }
      Num = Num.replace("￥", "")// 替换掉可能出现的￥字符
      if (isNaN(Num)) {
        // 验证输入的字符是否为数字
        // alert("请检查小写金额是否正确");
        return;
      }
      // ---字符处理完毕，开始转换，转换采用前后两部分分别转换---//
      var part = String(Num).split(".");
      var newchar = "";
      // 小数点前进行转化
      for (i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 17) {
        //   alert("");
          return "位数过大，无法计算";
        }// 若数量超过拾亿单位，提示
        var tmpnewchar = ""
        var perchar = part[0].charAt(i);
        switch (perchar) {
        case "0":
          tmpnewchar = "零" + tmpnewchar;
          break;
        case "1":
          tmpnewchar = "壹" + tmpnewchar;
          break;
        case "2":
          tmpnewchar = "贰" + tmpnewchar;
          break;
        case "3":
          tmpnewchar = "叁" + tmpnewchar;
          break;
        case "4":
          tmpnewchar = "肆" + tmpnewchar;
          break;
        case "5":
          tmpnewchar = "伍" + tmpnewchar;
          break;
        case "6":
          tmpnewchar = "陆" + tmpnewchar;
          break;
        case "7":
          tmpnewchar = "柒" + tmpnewchar;
          break;
        case "8":
          tmpnewchar = "捌" + tmpnewchar;
          break;
        case "9":
          tmpnewchar = "玖" + tmpnewchar;
          break;
        }
        switch (part[0].length - i - 1) {
        case 0:
          tmpnewchar = tmpnewchar + "元";
          break;
        case 1:
          if (perchar != 0)
            tmpnewchar = tmpnewchar + "拾";
          break;
        case 2:
          if (perchar != 0)
            tmpnewchar = tmpnewchar + "佰";
          break;
        case 3:
          if (perchar != 0)
            tmpnewchar = tmpnewchar + "仟";
          break;
        case 4:
          tmpnewchar = tmpnewchar + "万";
          break;
        case 5:
          if (perchar != 0)
            tmpnewchar = tmpnewchar + "拾";
          break;
        case 6:
          if (perchar != 0)
            tmpnewchar = tmpnewchar + "佰";
          break;
        case 7:
          if (perchar != 0)
            tmpnewchar = tmpnewchar + "仟";
          break;
        case 8:
          tmpnewchar = tmpnewchar + "亿";
          break;
        case 9:
          if (perchar != 0)
          tmpnewchar = tmpnewchar + "拾";
          break;
        case 10:
          if (perchar != 0)
          tmpnewchar = tmpnewchar + "百";
          break;
        case 11:
          if (perchar != 0)
          tmpnewchar = tmpnewchar + "仟";
          break;
        case 12:
          tmpnewchar = tmpnewchar + "兆";
          break;
        case 13:
          if (perchar != 0)
          tmpnewchar = tmpnewchar + "拾";
          break;
        case 14:
          if (perchar != 0)
          tmpnewchar = tmpnewchar + "百";
          break;
        case 15:
          if (perchar != 0)
          tmpnewchar = tmpnewchar + "仟";
          break;
        case 16:
          if (perchar != 0)
          tmpnewchar = tmpnewchar + "京";
          break;
        case 17:
          tmpnewchar = tmpnewchar + "拾";
          break;
        }
        newchar = tmpnewchar + newchar;
      }
      // 小数点之后进行转化
      if (Num.indexOf(".") != -1) {
        if (part[1].length > 2) {
          //alert("小数点之后只能保留两位,系统将自动截段");
          var tempNum = parseFloat(Num);
          Num = tempNum.toFixedSelf(suffixNumber);
          part = String(Num).split(".");
        }
        for (i = 0; i < part[1].length; i++) {
          tmpnewchar = ""
          perchar = part[1].charAt(i)
          switch (perchar) {
          case "0":
            tmpnewchar = "零" + tmpnewchar;
            break;
          case "1":
            tmpnewchar = "壹" + tmpnewchar;
            break;
          case "2":
            tmpnewchar = "贰" + tmpnewchar;
            break;
          case "3":
            tmpnewchar = "叁" + tmpnewchar;
            break;
          case "4":
            tmpnewchar = "肆" + tmpnewchar;
            break;
          case "5":
            tmpnewchar = "伍" + tmpnewchar;
            break;
          case "6":
            tmpnewchar = "陆" + tmpnewchar;
            break;
          case "7":
            tmpnewchar = "柒" + tmpnewchar;
            break;
          case "8":
            tmpnewchar = "捌" + tmpnewchar;
            break;
          case "9":
            tmpnewchar = "玖" + tmpnewchar;
            break;
          }
          if (i == 0)
            tmpnewchar = tmpnewchar + "角";
          if (i == 1)
            tmpnewchar = tmpnewchar + "分";
          newchar = newchar + tmpnewchar;
        }
      }
      //替换所有无用汉字
      while (newchar.search("零零") != -1)
        newchar = newchar.replace("零零", "零");
        newchar = newchar.replace("零亿", "亿");
        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("零万", "万");
        newchar = newchar.replace("零元", "元");
        newchar = newchar.replace("零角", "");
        newchar = newchar.replace("零分", "");

        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("兆亿", "兆");
        newchar = newchar.replace("零兆", "兆");
        newchar = newchar.replace("京兆", "京");

      if (newchar.charAt(newchar.length - 1) == "元"
          || newchar.charAt(newchar.length - 1) == "角")
        newchar = newchar + "整";

      var digit = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
      var _i = 0
      while(newchar.length > 0){
        if(digit.indexOf(newchar[0]) < 0){
          newchar = newchar.substr(1);
        }else{
          break;
        }
      }

      var firstChar = Num.substring(0,1);
      if(firstChar=="-"){
        newchar = "负"+newchar;
      }

      var lastChar=newchar.charAt(newchar.length-1);
      if("零" == lastChar){
        newchar=newchar.substring(0,newchar.length-1);
        newchar=newchar+"整";
      }

      if(parseFloat(Num)==0){
        newchar="零元整";
      }
      return newchar;
    },
    fillZero(number, bitNum) {
      /// 小数位不够，用0补足位数
      var f_x = parseFloat(number);
      if (isNaN(f_x)) {
        return ;
      }
      var s_x = number.toString();
      var pos_decimal = s_x.indexOf('.');
      if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
      }
      while (s_x.length <= pos_decimal + bitNum && !this.notFillin) {
          s_x += '0';
      }
      if (bitNum==0) {
        s_x = s_x.slice(0,pos_decimal);
      }
      return s_x;
    },
    cutNum(value,integerNum){
      var arrNum=value.split(".");
      if(arrNum.length>0){
        var integerNumber=arrNum[0].substr(0,this.integerNum);
        if(arrNum.length>1){
          value=integerNumber+"."+arrNum[1]
        }else{
          value=integerNumber
        }
      }
      return value;
    },
    setNum(value,suffixNum,integerNum){
      if (isNaN(value)) return ;
      if (suffixNum>0) {
        var arrNum=value.split(".");
        var integerNumber = arrNum[0].substring(0,integerNum);
        value = Number(integerNumber)+'.'+arrNum[1].substring(0,suffixNum);
      }else{
        value = Number(value)+'';
      }
      return value
    },
    bigShow(type,value){
      if (type=='money'&&value) {
        if (this.bigTips) {
          this.bigNum = this.changeTipsVal(value);
          this.tipShow = Boolean(this.bigNum);
        }
      }else{
        this.tipShow = false
      }
    },
    setNullStr(){
      let str = this.suffixNum === 0 ? '0' : '0.';
      for (var i = this.suffixNum - 1; i >= 0; i--) {
        str +='0';
      }
      return str;
    },
    initValue(val){
      let formatVal;
      if ((!val || Number(val) == 0) && this.setNull && this.type=='money' && !this.focused) {
        this.inputValue=this.setNullStr();
        formatVal = this.inputValue;
      } else {
        // 失焦的时候才格式化，避免不能增删小数位的问题
        formatVal = this.notFormat || this.havefocused || !val ? val : this.formatNum(val.replace(/,/g, ''));
        if (formatVal && this.divided && this.type=='money' && !this.havefocused) {
          this.inputValue = this.divideNum(formatVal);
        } else if (this.immeDivided && formatVal && this.type=='money'){
          this.inputValue = this.divideNum(formatVal);
        } else {
          this.inputValue = formatVal;
        }
      }
      // 失焦的时候才更新v-model绑定值，避免不能输入的问题
      !this.havefocused && this.$emit('input', this.cardFormatValue(formatVal));
    }
  }
}
</script>
