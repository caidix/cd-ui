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
      :class="[{
       'is-disabled':disabled
      }]"
      type="text"
      v-bind="$attrs"
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
    </span>
  </div>
</template>


<script>
import Emitter from "@/mixins/emitter.js";
export default {
  name: "cd-input",
  mixins: [Emitter],
  props: {
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
    }
  },
  data() {
    return {
      currentValue: this.value,
      focused: false,
      hovering: false
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
        this.currentValue && this.clearable && (this.focused || this.hovering)
      );
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
      return this.clearable;
    },
    handleClear() {
      this.$emit("input", "");
      this.$emit("change", "");
    }
  }
};
</script>