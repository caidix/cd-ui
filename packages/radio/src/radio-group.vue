<template>
  <div class="cd-radio-group" :class="{'is-vertical': vertical}">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from "@/mixins/emitter";
import { findComponentsDownward } from "@/utils/assist";
export default {
  name: "cd-radio-group",
  mixins: [Emitter],
  props: {
    value: {
      type: [Number, String],
      default: ""
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      childrens: [],
      currentValue: this.value
    };
  },
  watch: {
    value(val) {
      if (val !== this.currentValue) {
        this.currentValue = val;
        this.updateValue();
      }
    }
  },
  mounted() {
    this.updateValue();
  },
  methods: {
    updateValue() {
      this.childrens = findComponentsDownward(this, "cd-radio");
      this.childrens.forEach(child => {
        child.currentValue = child.label === this.currentValue;
        child.group = true;
      });
    },
    change(data) {
      this.currentValue = data;
      this.updateValue();
      this.$emit("input", data);
      this.$emit("on-change", data);
      this.dispatch("cd-form-item", "on-form-change", data);
    }
  }
};
</script>