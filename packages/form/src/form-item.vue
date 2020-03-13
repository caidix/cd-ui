<template>
  <div :class="classes">
    <label v-if="label" :class="prefixCls+'__label'" :for="labelFor" :style="labelStyle">{{ label }}</label>
    <div :class="prefixCls+'__content'" :style="contentStyle">
      <slot></slot>
      <div
        v-if="validateState === 'error' && showMessage && FormInstance.showMessage"
        class="cd-form-item__error"
      >{{validateMessage}}</div>
    </div>
  </div>
</template>
<script>
import Emitter from "@/mixins/emitter";
import AsyncValidator from "async-validator";
const prefixCls = "cd-form-item";
export default {
  name: "cd-form-item",
  mixins: [Emitter],
  inject: ["FormInstance"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    },
    labelFor: String,
    labelWidth: {
      type: Number
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    rules: {
      type: [Object, Array]
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      isRequired: false, // 是否为必填
      validateState: "", // 校验状态
      validateMessage: "" // 校验不通过时的提示消息
    };
  },
  computed: {
    fieldValue() {
      return this.FormInstance.model[this.prop];
    },
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-required`]: this.required || this.isRequired
        }
      ];
    },
    labelStyle() {
      let style = {};
      let labelWidth =
        this.labelWidth === 0 || this.labelWidth
          ? this.labelWidth
          : this.FormInstance.labelWidth;
      if (labelWidth || labelWidth === 0) {
        style.width = `${labelWidth}px`;
      }
      return style;
    },
    contentStyle() {
      let style = {};
      let labelWidth =
        this.labelWidth === 0 || this.labelWidth
          ? this.labelWidth
          : this.FormInstance.labelWidth;
      if (labelWidth || labelWidth === 0) {
        style.marginLeft = `${labelWidth}px`;
      }
      return style;
    }
  },
  mounted() {
    // 如果没有传入 prop，则无需校验，也就无需缓存
    if (this.prop) {
      this.dispatch("cd-form", "on-form-item-add", this);
      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch("cd-form", "on-form-item-remove", this);
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        rules.every(rule => {
          this.isRequired = rule.required;
        });
      } else if (this.required) {
        this.isRequired = this.required;
      }
      this.$off("on-form-change", this.onFieldChange);
      this.$off("on-form-blur", this.onFieldBlur);
      this.$on("on-form-change", this.onFieldChange);
      this.$on("on-form-blur", this.onFieldBlur);
    },
    getRules() {
      let formRules = this.FormInstance.rules;
      const selfRule = this.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || selfRule || []);
    },
    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    // 重置数据
    resetField() {
      this.validateState = "";
      this.validateMessage = "";

      this.FormInstance.model[this.prop] = this.initialValue;
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = function() {}) {
      // 获取校验规则->规则写法遵从async-validator
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }
      this.validateState = "validating";

      // 调用validator库
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};
      model[this.prop] = this.fieldValue;
      // 校验，校验通过值为空
      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        callback(this.validateMessage);
        console.log(this.validateMessage);
      });
    },
    /**
     * 它们只传入了第一个参数 trigger，callback 并未传入，因此也不会触发回调，
     * 而这个回调主要是给 Form 用的,这里只是表单组件触发事件时，对当前 FormItem 做校验。
     */
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    }
  }
};
</script>