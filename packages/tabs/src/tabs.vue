
<template>
  <div class="cd-tabs">
    <div class="cd-tabs__header" ref="tabHeader">
      <div
        class="cd-tabs__nav"
        :class="{
          'is-active': currentValue === item.name && !item.disabled,
          'is-disabled': item.disabled
        }"
        v-for="(item, index) in panes"
        :key="index"
        @click.stop="changeTabs(item.name)"
      >{{item.label||item.name}}</div>
      <div class="cd-tabs__line" :style="lineStyle"></div>
    </div>
    <div class="cd-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "cd-tabs",
  props: {
    value: {},
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      panes: [],
      currentValue: this.value,
      lineStyle: {}
    };
  },
  watch: {
    $slots() {
      this.getPanes();
    },
    value(val) {
      this.currentValue = val;
    },
    currentValue() {
      this.$nextTick(() => this.activeNav());
    }
  },
  mounted() {
    this.getPanes();
  },
  methods: {
    getPanes() {
      const defaultSlot = this.$slots.default;
      this.panes = defaultSlot
        .filter(
          ({ componentInstance }) =>
            componentInstance &&
            componentInstance.$options.name === "cd-tab-pane"
        )
        .map(({ componentInstance }) => {
          return componentInstance;
        });
      this.$nextTick(() => this.activeNav());
    },
    changeTabs(name) {
      this.currentValue = name;
      this.$emit("tab-change", name);
    },
    activeNav() {
      const activeTab = this.$el.querySelector(".is-active");
      if (!activeTab) return;
      const tabHeader = this.$refs.tabHeader;
      const activeTabBounding = activeTab.getBoundingClientRect();
      const navScrollBounding = tabHeader.getBoundingClientRect();
      console.log(activeTabBounding, navScrollBounding);
      let style = {};
      style.width = activeTabBounding.width + "px";
      style.transform = `translateX(${activeTabBounding.left -
        navScrollBounding.left}px)`;
      // style.left = activeTabBounding.left - navScrollBounding.left + "px";
      this.$nextTick(() => {
        this.lineStyle = { ...style };
      });
    }
  }
};
</script>