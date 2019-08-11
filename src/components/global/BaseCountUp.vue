<template>
  <div class="count-up">
    <slot name="left"></slot>
    <span class="prefix" v-if="!$slots.left && prefix">{{prefix}}</span>
    <span :style="contentStyle" class="count-content" :id="countToId"></span>
    <span  class="count-to-unit-text">{{animatedText}}</span>
    <!-- v-if="simplify" -->
    <span class="suffix" v-if="!$slots.right && suffix">{{suffix}}</span>
    <slot name="right"></slot>
  </div>
</template>
<script>
export default {
  name: 'cc-count-to',
  props: {
    /**
     * @description 起始值，即动画开始前显示的数值
     */
    start: {
      type: Number,
      default: 0
    },
    /**
     * @description 结束值，即动画结束后显示的数值
     */
    end: {
      type: Number,
      required: true
    },
    /**
     * @description 小数位
     */
    decimals: {
      type: Number,
      default: 0
    },
    /**
     * @description 小数分隔符号
     */
    decimal: {
      type: String,
      default: ','
    },
    /**
     * @description 动画持续的时间，单位是秒
     */
    duration: {
      type: Number,
      default: 2
    },
    /**
     * @description 动画延迟开始的时间，单位是秒
     */
    delay: {
      type: Number,
      default: 0
    },
    /**
     * @description 是否使用easing动画效果
     */
    uneasing: {
      type: Boolean,
      default: true
    },
    /**
     * @description 是否使用分组，分组后每三位会用一个符号分隔
     */
    usegroup: {
      type: Boolean,
      default: false
    },
    /**
     * @description 用于分组的符号
     */
    separator: {
      type: String,
      default: ','
    },
    /**
     * @description 是否简化显示，设为true后会使用unit单位来做相关省略
     */
    simplify: {
      type: Boolean,
      default: false
    },
    /**
     * @description 自定义单位，如[3, 'K+'], [6, 'M+']即大于3位数小于6位数的用k+来做省略
     *              1000即显示为1K+
    */
    unit: {
      type: Array,
      default () {
        return [[3, 'K+'], [6, 'M+'], [9, 'B+']];
      }
    },
    /**
     * @description 前缀字符
     */
    prefix: {
      type: String,
      default: ''
    },
    /**
     * @description 后缀字符
     */
    suffix: {
      type: String,
      default: ''
    },
    /**
     * @description 文字内容的样式
     */
    contentStyle: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      countToId: `count-to-${this._uid}`,
      instance: null,
      unitText: 0,
      endVal: 0
    };
  },
  computed: {
    animatedText() {
      return this.unitText.toFixed(0);
    }
  },
  mounted () {
    this.tweenUpdate();
    this.$tween.countUp(this, { unitText: this.end }, 1000);
  },

  methods: {
    tweenUpdate() {
      requestAnimationFrame(this.tweenUpdate);
      this.$tweener.update();
    },
  },
  
};
</script>
<style lang="scss" scoped>
.count-to {
  display: inline-block;
}
</style>