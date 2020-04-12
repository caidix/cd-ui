<template>
  <div
    class="cd-input"
    :class="[
      {
        'cd-input--suffix': clearable
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <input
      class="cd-input__inner"
      :class="[
        {
          'is-disabled': disabled
        }
      ]"
      :type="inputType"
      v-bind="$attrs"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :value="currentValue"
      @click="handleClick"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <span v-if="showSuffix()" class="cd-input__suffix-inner cd-input__suffix">
      <i
        v-if="showClear"
        @mousedown.prevent
        @click="handleClear"
        class="cd-input__icon icon-cd-error-circle-outline cd-input__clear"
      ></i>
      <i
        v-if="showPasswordIcon"
        @mousedown.prevent
        @click="handleShowPassword"
        class="cd-input__icon icon-cd-eye cd-input__eye"
      ></i>
    </span>
  </div>
</template>

<script>
import Emitter from "@/mixins/emitter.js";
export default {
  name: "cd-input",
  mixins: [Emitter],
  props: {
    placeholder: {
      type:String,
      default: '请输入'
    },
    value: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default:'text'
    }
    
  },
  data() {
    return {
      currentValue: this.value,
      focused: false,
      hovering: false,
      showPsdEye: this.showPassword
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    }
  },
  computed: {
    showClear() {
      return (
        this.currentValue && this.clearable && (this.focused || this.hovering) && !this.showPassword
      );
    },
    showPasswordIcon() {
      return this.type === 'password' && this.showPassword;
    },
    inputType() {
      let type = this.type;
      if (type ==='password' && this.showPassword && this.showPsdEye) type = 'text';
      return type 
    }
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.currentValue = value;
      this.$emit("input", value);
      this.dispatch("cd-form-item", "on-form-change", value);
    },
    handleBlur() {
      this.focused = false;
      this.dispatch("cd-form-item", "on-form-blur", this.currentValue);
    },
    handleClick(evt) {
      this.$emit("click", evt);
    },
    handleChange(evt) {
      this.$emit("change", evt.target.value);
    },
    handleFocus(evt) {
      this.focused = true;
      this.$emit("focus", evt);
    },
    showSuffix() {
      return this.clearable || (this.showPassword && this.type === 'password');
    },
    handleClear() {
      this.$emit("input", "");
      this.$emit("change", "");
    },
    handleShowPassword() {
      this.showPsdEye = !this.showPsdEye;
    }
  }
};
</script>
