<template>
  <form :class="classes" :autocomplete="autocomplete">
    <slot></slot>
  </form>
</template>

<script>
const prefixCls = "cd-form";
export default {
  name: "cd-form",
  props: {
    model: {
      type: Object
    },
    rules: Object,
    inline: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: Number
    },
    labelPosition: {
      validator(value) {
        return ["left", "right", "top"].find(item => item === value) || "right";
      },
      default: "right"
    },
    autocomplete: {
      validator(value) {
        return ["on", "off"].find(item => item === value) || "off";
      },
      default: "off"
    },
    hideRequiredMark: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      FormInstance: this
    };
  },
  data() {
    return {
      fields: [],
      showMessage: {
        type: Boolean,
        default: true
      }
    };
  },
  created() {
    this.$on("on-form-item-add", field => {
      if (field) this.fields.push(field);
    });
    this.$on("on-form-item-remove", field => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}--label-${this.labelPosition}`,
        {
          [`${prefixCls}--inline`]: this.inline,
          [`${prefixCls}--hide-required`]: this.hideRequiredMark
        }
      ];
    }
  },
  methods: {
    resetFields() {
      if (!this.model) {
        console.warn("[FormWarn]model is required for resetFields to work.");
        return;
      }
      this.fields.forEach(field => {
        field.resetField();
      });
    },
    // 校验全部数据，支持Promise
    validate(callback) {
      if (!this.model) {
        console.warn("[FormWarn]model is required for validate to work!");
        return;
      }
      return new Promise((resolve, reject) => {
        let valid = true;
        let count = 0;
        this.fields.forEach(field => {
          field.validate("", errors => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
              // all finish
              valid ? resolve(valid) : reject(valid);
              if (typeof callback === "function") {
                callback(valid);
              }
            }
          });
        });
      });
    }
  }
};
</script>