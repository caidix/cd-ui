
/**
  若单独使用,则使用currentValue参与checkbox的控制,currentValue在这里的最大作用就是初始化时
  根据用户是否传入信息并判断是否选中。并watch监听v-model传入的数据，value变化时currentValue
  响应变化，从而变化复选框选值。
  若多个复选框组用，必须存放在checkbox-group内，v-model绑定的数据为选定的数组[xx]，数组内的值
  由group得来，在group的updateModel中，将数组的地址传递给了checkbox子组件的model，每当勾选发
  生改变时，两者都会发生改变。
 */
<template>
  <label class="cd-checkbox">
    <span
      :class="['cd-checkbox__input', {
        'is-indeterminate': indeterminate,
        'is-checked': currentValue,
        'is-disabled':disabled
      }]"
    >
      <span class="cd-checkbox__inner"></span>
      <input
        class="cd-checkbox__original"
        v-if="group"
        type="checkbox"
        :value="label"
        v-model="model"
        :disabled="disabled"
        @change="change"
      />
      <input
        v-else
        class="cd-checkbox__original"
        type="checkbox"
        :checked="currentValue"
        :disabled="disabled"
        @change="change"
      />
    </span>
    <span class="cd-checkbox__label">
      <span v-if="!$slots.default&&label">{{label}}</span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
// const preclx = "cd-checkbox";
import Emitter from "@/mixins/emitter";
import { findComponentUpward } from "@/utils/assist";
export default {
  name: "cd-checkbox",
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      //只在组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中
      type: [String, Number, Boolean]
    },
    value: {
      //只在单独使用时有效。可以使用 v-model 双向绑定数据
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    indeterminate: {
      //indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw "Value should be TrueValue or FalseValue";
      }
    }
  },
  data() {
    return {
      model: [],
      currentValue: this.value, // 代表了是否选中 true or false
      group: false,
      parent: null
    };
  },
  mounted() {
    this.parent = findComponentUpward(this, "cd-checkbox-group");
    if (this.parent) {
      this.group = true;
    }
    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return false;
      }
      const checked = event.target.checked;
      this.currentValue = checked;
      const value = checked ? this.trueValue : this.falseValue;
      this.$emit("input", value);
      // 用于单独使用时，v-model的语法糖其实就是v-bind:value和 v-on:input
      // 这里调用input事件实现语法糖。
      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit("on-change", value);
        this.dispatch("cd-form-item", "on-form-change", value);
      }
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    }
  }
};
</script>