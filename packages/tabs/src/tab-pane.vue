<template>
  <div class="cd-tab-pane" v-show="show">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "cd-tab-pane",
  props: {
    name: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      parent: ""
    };
  },
  mounted() {
    if (this.$parent) {
      this.parent = this.$parent;
    }
  },
  computed: {
    show: {
      get() {
        if (this.parent) {
          return this.parent.currentValue === this.name;
        }
        return false;
      },
      set() {
        this.parent = this.$parent || "";
      }
    }
  }
};
</script>