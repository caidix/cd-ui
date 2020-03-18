<template>
  <label class="cd-radio">
    <span
      :class="['cd-radio__input', {
      'is-checked': currentValue,
      'is-disabled': disabled
    }]"
    >
      <span class="cd-radio__inner"></span>
      <input type="radio" @change="change" :disabled="disabled" :checked="currentValue" />
    </span>
    <span class="cd-radio__label">
      <span v-if="!$slots.default&&label">{{label}}</span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
import { findComponentUpward } from "@/utils/assist";
import Emitter from "@/mixins/emitter";
export default {
  name: "cd-radio",
  mixins: [Emitter],
  props: {
    value: {
      //只在单独使用时有效。可以使用 v-model 双向绑定数据
      type: [String, Number, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      // 只在使用组的时候有效
      type: [String, Number]
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateValue();
      } else {
        throw "Value should be TrueValue or FalseValue";
      }
    }
  },
  data() {
    return {
      currentValue: this.value,
      group: false,
      parent: null
    };
  },
  mounted() {
    this.parent = findComponentUpward(this, "cd-radio-group");
    if (this.parent) {
      this.group = true;
    }
    if (this.group) {
      this.parent.updateValue();
    } else {
      this.updateValue();
    }
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return;
      }
      let checked = event.target.checked;
      this.currentValue = checked;
      const value = checked ? this.trueValue : this.falseValue;
      this.$emit("input", value);
      if (this.group) {
        if (this.label !== undefined) {
          this.parent.change(this.label);
        }
      } else {
        this.$emit("on-change", value);
        this.dispatch("cd-form-item", "on-form-change", value);
      }
    },
    updateValue() {
      this.currentValue = this.value === this.trueValue;
    }
  }
};
</script>