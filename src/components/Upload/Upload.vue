<template>
  <div :class="wrapCls">
    <div :class="wrapperCls">
      <div
        :class="classes"
        @click="handleClick"
        @drop.prevent="onDrop"
        @dragover.prevent="dragOver = true"
        @dragleave.prevent="dragOver = false">
        <form ref="form">
          <input
          ref="input"
          type="file"
          :class="[prefixCls + '-input']"
          @change="handleChange"
          :multiple="multiple"
          :accept="accept">
        </form>
        <!-- 手动配置 -->
        <slot v-if="selfConfig" name="chooseFile"></slot>
        <slot v-else></slot>
      </div>
      <slot name="tip"></slot>
      <div  v-if="selfConfig" @click="handlePostFile" :class="postBtnCls">
        <slot name="postFile" ></slot>
      </div>    
      <div  v-if="selfConfig && $slots.cancleFile" @click="handleCancleFile" :class="cancleBtncls">
        <slot name="cancleFile" @click="handleCancleFile"></slot>
      </div>
      <div  v-if="selfConfig " @click="handleFileList" :class="listBtnCls">
        <slot name="showList"></slot>
      </div>
    </div>

    <upload-list
      v-if = "showUploadList && !showUploadedList"
      :files = "fileList"
      @on-file-remove = "handleRemove"
      @on-file-click = "handleListClick"
      @on-file-preview = "handlePreview"
      ref="postFileList">
        <slot name="uploadlist"></slot> 
    </upload-list>

    <!-- 已上传列表 -->
    <div v-if = "selfConfig && showUploadList && showUploadedList"
         :class="[prefixCls + '-uploaded-wrap']">
      <div :class="[prefixCls + '-uploaded-title']">
        <span>
          已上传文件列表
        </span>
         <Icon
          name="close"
          :class="[prefixCls + '-uploaded-close']"
          @click.native ="handleDelAll"></Icon>
        <Icon
          name="smallscreen"
          :class="[prefixCls + '-uploaded-close']"
          @click.native ="handleCloseList"></Icon>
      </div>
      <div>
        <upload-list  
          :files = "uploadedFileList"
          showUploaded = "showLi"
          @on-file-click = "handleListClick"
          @on-file-remove = "handleUploadedRemove"
          @on-file-preview = "handlePreview">
        <span>
           <slot name="uploadlist"></slot> 
        </span>          
      </upload-list>
        <!-- 其中showUploadList,用于控制是否显示列表，showUploaded用于控制是否显示已上传列表，当显示已上传列表时，isShow失效 -->
      </div>
    </div>
  </div>
</template>
<script>
import Icon from '../Icon/Icon.vue';
import UploadList from './Upload-list.vue';
import ajax from './ajax.js';
import { oneOf } from '../../util/tools.js';
import Emitter from '../../mixins/emitter';

const prefixCls = 'h-upload';

export default {
  name: 'Upload',
  mixins: [ Emitter ],
  components: { UploadList , Icon},
  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default () {
        return {};
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    },
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    showUploadList: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      validator (value) {
        return oneOf(value, ['select', 'drag']);
      },
      default: 'select'
    },
    format: {
      type: Array,
      default () {
        return [];
      }
    },
    accept: {
      type: String
    },
    maxSize: {
      type: Number
    },
    beforeUpload: Function,
    onProgress: {
      type: Function,
      default () {
        return {};
      }
    },
    onSuccess: {
      type: Function,
      default () {
        return {};
      }
    },
    onError: {
      type: Function,
      default () {
        return {};
      }
    },
    // 文件移除前钩子函数
    beforeRemove: {
      type: Function,
      default: () => true
    },
    onRemove: {
      type: Function,
      default () {
        return {};
      }
    },
    onPreview: {
      type: Function,
      default () {
        return {};
      }
    },
    onExceededSize: {
      type: Function,
      default () {
        return {};
      }
    },
    onFormatError: {
      type: Function,
      default () {
        return {};
      }
    },
    defaultFileList: {
      type: Array,
      default() {
        return [];
      }
    },
    // 自定义上传成功函数
    onSelfSuccess: {
      type: Function,
      default () {
        return {};
      }
    },
    selfConfig: {
      type: Boolean,
      default: false
    },
    uploadAll: { // selfConfig下使用
      type: Boolean,
      default: false
    },
    /* 多选文件时，合并触发before-upload、on-format-error、on-exceeded-size等钩子 */
    mergeHook: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      dragOver: false,
      fileList: [],
      tempIndex: 1,
      selfUploadStatus: '',
      xhr:'',
      uploadedFileList: [], // 已上传列表
      showUploadedList: false, // 是否显示已上传列表
      selfConfPostList: [], //手动上传时，保存真正的文件列表
      fileNoneStatus: '',// 全部上传时的待上传文件selfConfPostList清空时的状态 success/error/clear（成功/失败/清除后清空）
      isFirstChoose: true, //是否第一次选择文件
      uploadAllAutoList: [], //uploadAll时，自动上传的list
      viewValue:[],
    };
  },
  computed: {
    wrapCls () {
      return [
          `${prefixCls}`
        ]
    },
    wrapperCls () {
      return [
          {
            [`${prefixCls}-self`]: this.selfConfig
          }
        ]
    },
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-select`]: this.type === 'select',
          [`${prefixCls}-drag`]: this.type === 'drag',
          [`${prefixCls}-dragOver`]: this.type === 'drag' && this.dragOver
        }
      ];
    },
    postBtnCls () {
      return [
        `${prefixCls}`,
        `${prefixCls}-postBtn`,
      ];
    },
    cancleBtncls () {
      return [
        `${prefixCls}`,
        `${prefixCls}-cancleBtn`,
      ];
    },
    listBtnCls () {
      return [
        `${prefixCls}`,
        `${prefixCls}-listBtn`,
      ];
    },
    // 已上传列表长度，用于判定是否禁用该按钮
    uploadedFileListLength () {
      return this.uploadedFileList.length
    }
  },
  methods: {
    handlePostFile () {
      if(this.showUploadedList) this.showUploadedList = false
      if (this.uploadAll) {
        // 全部上传或者全部取消
        this.startPost(this.selfConfPostList)
      } else {
        this.selfConfPostList.forEach((file, index) => {
          // 过滤已上传的
          const _file = this.getFile(file);
          if(_file.status !== 'finished'){
            this.startPost(file)
          } else {
            this.selfConfPostList.splice(index, 1) // 删除已上传
          }
        })
      }
    },
    // 取消上传
    handleCancleFile () { 
      if(this.xhr) this.xhr.abort()
      this.xhr =''
      this.fileList = this.fileList.filter((file, index) => {
        if(file.status === "finished") {
          return file
        }
      })
      
    },
    handleFileList () {
      this.showUploadedList = true
    },
    handleCloseList () {
      this.showUploadedList = false
    },
    handleDelAll () {
      this.uploadedFileList = []
      this.fileList = this.fileList.filter((file, index) => {
        if(file.status !== "finished") {
          return file
        }
      })
    },
    handleClick () {
      this.$refs.input.click();
    },
    handleChange (e) {
      const files = e.target.files;

      if (!files) {
          return;
      }
      this.uploadFiles(files);
      e.target.value = '';
      this.$refs.form.reset();
    },
    onDrop (e) {
      this.dragOver = false;
      this.uploadFiles(e.dataTransfer.files);
    },
    uploadFiles (files) {
      this.uploadAllAutoList = [];
      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) postFiles = postFiles.slice(0, 1);

      if (postFiles.length === 0) return;
      // 全部上传(非自定义)
      if (this.mergeHook) {
        this.upload(postFiles);
      } else {
        postFiles.forEach(file => {
          this.upload(file);
        });
      }
      if (this.uploadAll && !this.selfConfig && this.uploadAllAutoList.length > 0) {
        this.startPost(this.uploadAllAutoList)
      }
    },
    /**
     * @param file 文件或文件列表 v1.0.43
     */
    upload (file) {
      if (!this.beforeUpload) {
          return this.post(file);
      }
      const before = this.beforeUpload(file);
      if (before && before.then) {
        before.then(processedFile => {
          if (Object.prototype.toString.call(processedFile) === '[object File]') {
            this.post(processedFile);
          } else {
            this.post(file);
          }
        }, () => {
          // this.$emit('cancel', file);
        });
      } else if (before !== false) {
        this.post(file);
      } else {
        // this.$emit('cancel', file);
      }
    },
    /**
     * @param file 文件或文件列表 v1.0.43
     */
    post (file) {
      const post = (fileItem) => {
        this.handleStart(fileItem);
        // 手动控制，校验完文件显示待上传列表
        if(this.selfConfig) {
          if (this.selfConfPostList.length > 0) this.isFirstChoose = false
          if(this.showUploadedList) this.showUploadedList = false
          if(fileItem.status === "finished") {
            fileItem.isShow = false
            return 
          }
          return 
        } else if (this.uploadAll) {
          this.uploadAllAutoList.push(fileItem)
        } else {
          this.startPost(fileItem)
        }
      }
      let valid;
      let invalidType;
      let invalidFile;
      // 当开启mergeHook属性时file为数组
      if (Array.isArray(file)) {
        // 只要有一个文件检查失败就无法完成提交
        valid = file.every(item => {
          let result = this.checkFile(item);
          if (!result[0]) {
            invalidFile = item;
            invalidType = result[1];
          }
          return result[0];
        })
      } else {
        let result = this.checkFile(file);
        valid = result[0];
        if (!valid) {
          invalidType = result[1];
          invalidFile = file;
        }
      }
      switch(invalidType) {
        case "format":
          this.onFormatError(invalidFile, this.fileList);
          break;
        case "size":
          this.onExceededSize(invalidFile, this.fileList);
          break;
      }
      if (valid) {
        if (Array.isArray(file)) {
          file.forEach(item => post(item));
        } else {
          post(file);
        }
      }
    },
    // 开始上传文件
    startPost (file) {
      let formData = new FormData();
      formData.append(this.name, file);
      this.xhr = ajax({
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: file,
        uploadAll: this.uploadAll && file instanceof Array,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.handleProgress(e, file);
        },
        onSuccess: res => {
            this.handleSuccess(res, file);
        },
        onError: (err, response) => {
            this.handleError(err, response, file);
        }
      });
    },
    handleStart (file) {
      file.uid = Date.now() + this.tempIndex++;
      const _file = {
        status: 'uploading',
        name: file.name,
        size: file.size,
        percentage: 0,
        uid: file.uid,
        showProgress: true,
        isShow: true
      };
      this.fileList.push(_file);
      if (this.selfConfig) this.selfConfPostList.push(file)
    },
    getFile (file) {
      const fileList = this.fileList;
      let target;
      fileList.every(item => {
        target = file.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    handleRemovePostFile (file) {
      const fileList = this.selfConfPostList;
      fileList.splice(fileList.indexOf(file), 1);
      
    },
    handleProgress (e, file) {
      if (file instanceof Array) {
        file.forEach(item => {
          let _file = this.getFile(item);
          this.onProgress(e, _file, this.fileList);
          _file.percentage = e.percent || 0;
        })
      } else {
        const _file = this.getFile(file);
        this.onProgress(e, _file, this.fileList);
        _file.percentage = e.percent || 0;
      }
    },
    handleSuccessFile (res, file) {
      const _file = this.getFile(file)
      if (_file) {
        _file.status = 'finished';
        _file.response = res;

        this.dispatch('FormItem', 'on-form-change', _file);
        this.onSuccess(res, _file, this.fileList);
        
        setTimeout(() => {
          _file.showProgress = false;
        }, 1000);
        if(this.selfConfig && this.$slots.showList) {
          if (!this.uploadAll) this.handleRemovePostFile(_file) // 删除待上传列表中的文件
          _file.isShow = false
          this.uploadedFileList.push(_file)
        }
      }
    },
    handleSuccess (res, file) {
      // 全部上传的情况
       if (file instanceof Array) {
        file.forEach(item => {
          this.handleSuccessFile(res, item)
        })
        // 自定义上传成功函数
        this.onSelfSuccess(res, file)
        this.fileNoneStatus = 'success'
        this.isFirstChoose = true
        this.selfConfPostList = []
      } else {
        this.handleSuccessFile(res, file)
      }
    },
    handleError (err, response, file) {
      if (file instanceof Array) { // 全部上传不成功时返回一个错误消息，全部删除
        file.forEach((item, index) => {
          let _file = this.getFile(item);
          _file.status = 'fail';
          this.onError(err, response, file);
        })
        this.fileList = []
        this.fileNoneStatus = 'error'
        this.isFirstChoose = true        
        this.selfConfPostList = []
      } else {
        const _file = this.getFile(file);
        const fileList = this.fileList;

        _file.status = 'fail';

        fileList.splice(fileList.indexOf(_file), 1);
        this.handleRemovePostFile(file)
        this.onError(err, response, file);
      }
    },
    /**
     * 从文件列表移除文件
     * 
     * @param file 需要移除的文件对象
     */
    removeFile(file) {
      const fileList = this.fileList;
      fileList.splice(fileList.indexOf(file), 1);
      if (this.selfConfPostList.length > 0) {
        this.selfConfPostList = this.selfConfPostList.filter(item => item.uid != file.uid)
        if (this.selfConfPostList.length == 0) {
          this.isFirstChoose = true
          this.fileNoneStatus = 'clear'
        }
      }
    },
    handleRemove(file) {
      if (!this.beforeRemove(file, this.fileList)) return;
      this.removeFile(file);
      this.onRemove(file, this.fileList);
    },
    handleUploadedRemove(file) {
      const uploadedList = this.uploadedFileList;
      if (!this.beforeRemove(file, this.fileList)) return;
      uploadedList.splice(uploadedList.indexOf(file), 1);
      this.removeFile(file);
      this.onRemove(file, uploadedList);
    },
    handlePreview(file) {
      if (file.status === 'finished') {
        this.onPreview(file);
      }
    },
    handleListClick (file) {
      this.$emit('on-file-click', file)
    },
    clearFiles() {
      this.fileList = []
      this.fileNoneStatus = 'clear'
      this.isFirstChoose = true      
      this.selfConfPostList = []
    },
    /**
     * 检查文件格式、大小等
     * 
     * @param file File对象
     * @return Array 第一个元素为检查结果，第二个元素为检查失败的类型
     */
    checkFile(file) {
      // check format
      if (this.format.length) {
        const _file_format = file.name.split('.').pop().toLocaleLowerCase();
        const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format);
        if (!checked) {
          return [false, 'format'];
        }
      }

      // check maxSize
      if (this.maxSize) {
        if (file.size > this.maxSize * 1024) {
          return [false, 'size'];
        }
      }
      return [true];
    }
  },
  watch: {
    uploadedFileListLength() {
      let el = this.$slots.showList[0].elm
      if(this.uploadedFileListLength > 0 && el && el.getAttribute('disabled')==='disabled'){
        el.removeAttribute('disabled')
      }  else if (this.uploadedFileListLength == 0 && el) {
        this.showUploadedList = false
        el.setAttribute('disabled', 'disabled')
      }
    },
    defaultFileList: {
      immediate: true,
      handler(fileList) {
        this.fileList = fileList.map(item => {
          item.status = 'finished';
          item.percentage = 100;
          item.uid = Date.now() + this.tempIndex++;
          return item;
        });
        // 手动上传时，更新列表
        if (this.selfConfig) {
          this.uploadedFileList = fileList.map(item => {
          item.status = 'finished';
          item.percentage = 100;
          item.uid = Date.now() + this.tempIndex++;
          return item;
          });
        }
      }
    },
    isFirstChoose (newVal, oldVal) {
      if (this.selfConfig && this.uploadAll) { // 在手动一键上传所有时监听
          if (!newVal && oldVal && this.selfConfPostList.length > 0) {
            this.$emit('on-goto-add', true) // true表示继续添加--理财销售5.0
          } else if (newVal && !oldVal && this.selfConfPostList.length == 0){
            this.$emit('on-file-none', this.fileNoneStatus) //待上传文件数组为空时返回状态--理财销售5.0
          }
        }
    },
    fileList(val){
      this.viewValue = val
    }
  },
  mounted () {
    // 禁用已上传列表按钮
    if(this.uploadedFileList.length === 0 && this.$slots.showList) {
      this.$slots.showList[0].elm.setAttribute('disabled', 'disabled')
    }
  }
};
</script>
