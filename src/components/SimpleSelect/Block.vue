<template>
  <div ref="block"
       @scroll="handleBodyScroll"
       :class="blockCls">
    <div v-if="showHeader.length"
         :class="`${prefixCls}-item-header`">
      <span v-for="(item, index) in showHeader"
            :key="index"
            class="item-header"
            :style="styleArr[index]">
        {{item.title ? item.title : item}}
      </span>
    </div>
    <div :class="[prefixCls+'-phantom']"
         :style="phantomStl"></div>
    <ul :class="[prefixCls+'block-content']"
        ref="content">
      <li v-for="(item,inx) in visibleData"
          :key="inx"
          v-show="!item.hidden"
          :class="classes(item)"
          @click.stop="select(item)"
          @mouseout.stop="blur">

        <slot><span :style="showCol.length ? styleArr[0] : ''"
                :class="showCol.length ? 'itemcol' : ''"
                :title="showCol.length || hideMult ? showLabel(item) : ''">
            <checkbox v-show="multiple&&!hideMult"
                      size="large"
                      :value="item.selected"
                      @click.native.stop="handleclick"
                      :disabled="item.disabled"
                      @on-change="checkChange($event,item)"></checkbox>
            {{showLabel(item)}}
          </span></slot>
        <span class="itemcol"
              v-for="(col, index) in showCol"
              :key="col"
              :style="styleArr[index + 1]"
              :title="item[col]">{{item[col]}}</span>
      </li>
      <!-- <li v-if="showEmpty" :class="[prefixCls+'-empty']">{{localeNoMatch}}</li> -->
    </ul>
    <div v-if="showEmpty && !loading"
         :class="[prefixCls+'-empty']">{{localeNoMatch}}</div>
    <!-- 用于撑开高度 -->
    <div v-show="loading && visibleData.length === 0" :class="[prefixCls+'-loading-placeholder']">&nbsp;</div>
  </div>
</template>
<script>
import Emitter from '../../mixins/emitter'
import Locale from '../../mixins/locale'
import Checkbox from '../Checkbox/Checkbox.vue'
import {
  // hasClass,
  deepCopy,
  getBarBottom,
  getScrollBarSize
} from '../../util/tools'
const prefixCls = 'h-select-block'

export default {
  name: 'Block',
  componentName: 'select-block',
  mixins: [Emitter, Locale],
  components: { Checkbox },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    itemHeight: {
      type: [Number, String],
      default: 30
    },
    // 显示多列
    showCol: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 显示多列的表头，表头高度默认 30，宽度默认 100
    showHeader: {
      type: Array,
      default: () => []
    }
    // disabled: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      prefixCls: prefixCls,
      multiple: false,
      hideMult: false,
      visibleData: [],
      visibleCount: 20,
      cloneData: [],
      lastScollTop: 0,
      showEmpty: false,
      showBottom: false,
      focusIndex: 0
    }
  },
  computed: {
    phantomStl() {
      let style = {}
      let curData = this.cloneData.filter(col => {
        return !col.hidden
      })

      let height = curData.length * 30
      if (this.offset && height < 210) {
        height += 30
      }
      style.height = height + 'px'
      return style
    },
    blockCls() {
      return [
        `${prefixCls}-drop`,
        {
          [`${prefixCls}-multiple`]: this.multiple,
          [`${prefixCls}-show-bottom`]: this.showBottom,
          [`${prefixCls}-hideMult`]: this.hideMult && this.multiple
        }
      ]
    },
    localeNoMatch() {
      return this.t('i.select.noMatch')
    },
    itemClasses() {
      return ''
    },
    offset() {
      if (this.showHeader.length) return 30
      return 0
    },
    loading() {
      return this.$parent.$parent.loading;
    }
  },
  methods: {
    classes(item) {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-disabled`]: item.disabled || false,
          [`${prefixCls}-selected`]: item.selected || false,
          [`${prefixCls}-focus`]: item.focus || false
        }
      ]
    },
    showLabel(item) {
      return item.label ? item.label : item.value
    },
    select(item) {
      if (item.disabled) {
        return false
      }
      if (this.multiple) {
        this.$parent.$parent.selectBlockMultiple(item.value)
      } else {
        this.$parent.$parent.selectBlockSingle(item.value)
      }
    },
    checkChange(val, item) {
      this.$parent.$parent.selectBlockMultiple(item.value)
    },
    blur() {
      this.isFocus = false
    },
    queryChange(val) {
      const parsedQuery = val.replace(
        /(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g,
        '\\$1'
      )
      let status = true

      this.cloneData.forEach(col => {
        let targetLabel = col.label
        // 如果存在多列，则匹配目标为多列所有列
        if (this.showCol.length) {
          targetLabel = targetLabel + ' ' + this.getTargetLabel(col).join(' ')
        }

        let hidden = !new RegExp(parsedQuery, 'i').test(targetLabel)
        this.$set(col, 'hidden', hidden)

        if (status && !hidden) {
          status = false
        }
      })

      this.dispatch('SimpleSelect', 'on-options-visible-change', { data: this.cloneData })

      this.showEmpty = status
      if (val) {
        this.dispatch('Drop', 'on-update-popper')
      }
      this.$nextTick(() => {
        if (val) {
          this.updateVisibleData(0)
        } else {
          this.updateVisibleData()
        }
        this.$refs.block.scrollTop = 0
      })
    },
    handleclick() {},
    handleBodyScroll(event) {
      this.lastScollTop = event.target.scrollTop
      this.updateVisibleData(event.target.scrollTop)
      let num = getBarBottom(event.target, getScrollBarSize())
      this.$emit('on-scroll', num, this.lastScollTop)
      // 修复滚动后出现 x 滚动条问题
      if (this.$parent.widthAdaption) {
        this.$parent.setWidthAdaption()
      }
    },
    updateVisibleData(scrollTop) {
      let itemHeight = Number(this.itemHeight)
      scrollTop = scrollTop == undefined ? this.lastScollTop : scrollTop
      this.start = Math.floor(scrollTop / itemHeight)
      let i = 0
      let j = this.start
      // 如果存在表头，添加初始偏移量
      let offset = 0
      if (this.start > 0) offset = -this.offset

      while (i < this.visibleCount) {
        if (!this.cloneData[j]) {
          i = this.visibleCount
          j = this.cloneData.length
        } else {
          if (!this.cloneData[j].hidden) {
            i++
          }
          j++
        }
      }
      this.end = j
      this.visibleData = this.cloneData
        .filter(item => !item.hidden)
        .slice(this.start, this.end)
      this.$refs.content.style.transform = `translate3d(0, ${this.start *
        itemHeight +
        offset}px, 0)`
    },
    selectedTop(status) {
      if(status){
        this.cloneData.sort((a, b) => {
          if (a.selected && !b.selected) {
            return -1
          } else {
            return 0
          }
        })
      }else{
        this.cloneData.sort((a, b) => {
          return a._index<b._index?-1:0
        })
      }
      this.$refs.block.scrollTop = 0
      this.updateVisibleData(0)
      this.$parent.$parent.updateOptions()
    },
    /**
     * @description showHeader / showCol = true 时计算宽度
     */
    calcStyle(w) {
      this.calcStyle.cache || (this.calcStyle.cache = {})

      if (this.calcStyle.cache[w]) return this.calcStyle.cache[w]

      if (!this.showCol.length && !this.showHeader.length) {
        this.calcStyle.cache[w] = ''
        return this.calcStyle.cache[w]
      }

      let width = 'auto'
      if (w) {
        width = w + 'px'
      } else {
        width = '100px'
      }

      this.calcStyle.cache[w] = { width }
      return this.calcStyle.cache[w]
    },
    /**
     * @description 从 cloneData>item 中获取多列的 label 数组
     */
    getTargetLabel(option) {
      let target = []
      this.showCol.forEach(col => {
        target.push(option[col])
      })

      return target
    }
  },
  created() {
    // showHeader / showCol 生成样式数组
    if (this.showHeader.length) {
      this.styleArr = this.showHeader.map(item => this.calcStyle(item.width))
    } else if (this.showCol.length) {
      this.styleArr = []
      for(let i = 0; i < this.showCol.length + 1; i++) {
        this.styleArr.push(this.calcStyle(''))
      }
    }
  },
  mounted() {
    var str = this.$el.innerText
    this.searchLabel = str
      .replace('false', '')
      .replace('true', '')
      .trim()
    // this.searchLabel =str.slice(Number(str.indexOf('</label>')+9));
    this.dispatch('SimpleSelect', 'append')
    this.$on('on-select-close', () => {
      this.isFocus = false
    })
    this.$on('on-query-change', val => {
      this.queryChange(val)
    })
    this.$on('on-select-top', (status) => {
      this.selectedTop(status)
    })

    // v20190321
    this.$on('on-focus-index-change', index => {
      this.cloneData
        .filter(item => !item.hidden)
        .forEach((item, i) => {
          item.focus = false
          if (i === index) {
            item.focus = true
          }
        })
    })
    this.multiple = this.$parent.$parent.multiple
    this.showBottom = this.$parent.$parent.showBottom
    this.hideMult = this.$parent.$parent.hideMult
    this.cloneData = deepCopy(this.data)
    // v20190321 添加focus
    this.cloneData.forEach((item,i) => {
      item._index = i
      this.$set(item, 'focus', false)
    })
    this.$nextTick(() => {
      this.visibleCount = Math.ceil(210 / Number(this.itemHeight)) + 1
      this.updateVisibleData()
    })
  },
  watch: {
    data: {
      deep: true,
      handler: function(val) {
        if (val.length == 0) {
          this.showEmpty = true
        } else {
          this.showEmpty = false
        }
        this.$nextTick(() => {
          this.cloneData = deepCopy(this.data)
          this.cloneData.forEach((item,i) => {
            item._index = i
            this.$set(item, 'focus', false)
          })
          this.$parent.$parent.updateOptions(true)
          this.updateVisibleData()
        })
      }
    },
    cloneData: {
      deep: true,
      handler: function() {
        // this.$nextTick(()=>{
        //   this.updateVisibleData();
        // })
      }
    }
  },
  destroyed() {
    this.dispatch('Select', 'remove')
  }
}
</script>
