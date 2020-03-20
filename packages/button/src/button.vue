<template>
  <component
    :is="elementType"
    class="cd-button"
    @click="handleClick"
    :disabled="buttonDisabled"
    :type="nativeType"
    :href="to"
    :target="to && target"
    :class="[
    type ? 'cd-button--' + type : '',
    {'is-circle': circle},
    {'is-plain': plain},
    {'is-round': round},
    {'is-disabled': disabled},
    {'is-loading': loading},
  ]"
  >
    <i :class="getIcon" v-if="icon && !loading"></i>
    <i class="icon-cd-spinner" v-if="loading"></i>
    <!-- $slots.default用来访问被插槽分发的内容，没有就不渲染 -->
    <span class="cd-button--content" v-if="$slots.default">
      <slot></slot>
    </span>
  </component>
</template>

<script>
export default {
  name: "cd-button",
  props: {
    type: String,
    icon: String,
    iconPosition: String,
    plain: Boolean,
    circle: Boolean,
    round: Boolean,
    to: String,
    disabled: Boolean,
    target: String,
    loading: {
      type: Boolean,
      default: false
    },
    nativeType: String
  },
  mounted() {},
  computed: {
    getIcon() {
      let classList = [];
      if (this.icon) {
        classList.push(`icon-cd-${this.icon}`);
        if (this.iconPosition && this.iconPosition === "right") {
          classList.push("cd-button__icon-order");
        }
      }
      return classList;
    },
    elementType() {
      return this.to ? "a" : "button";
    },
    buttonDisabled() {
      return this.disabled || this.loading;
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>

