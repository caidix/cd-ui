<template>
  <button
    class="cd-button"
    @click="handleClick"
    :disabled="buttonDisabled"
    :type="nativeType"
    :class="[
    type ? 'cd-button--' + type : '',
    {'is-circle': circle},
    {'is-plain': plain},
    {'is-round': round},
    {'is-disabled': disabled},
    {'is-loading': loading},
  ]"
  >
    <i :class="getIcon" v-if="icon"></i>
    <i class="icon-cd-icon-spinner" v-if="loading"></i>
    <!-- $slots.default用来访问被插槽分发的内容，没有就不渲染 -->
    <span class="cd-button--content" v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
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
    disabled: Boolean,
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
        classList.push(`icon-cd-icon-${this.icon}`);
        if (this.iconPosition && this.iconPosition === "right") {
          classList.push("cd-button__icon-order");
        }
      }
      return classList;
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

