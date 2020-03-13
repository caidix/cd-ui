<template>
  <div>
    <input
      class="cd-input"
      type="text"
      :readonly="readonly"
      :disabled="disabled"
      :value="currentValue"
      @click="handleClick"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
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
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
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
      this.dispatch("cd-form-item", "on-form-blur", this.currentValue);
    },
    handleClick(evt) {
      this.$emit("click", evt);
    },
    handleChange(evt) {
      this.$emit("change", evt.target.value);
    },
    handleFocus(evt) {
      this.$emit("focus", evt);
    }
  }
};
</script>