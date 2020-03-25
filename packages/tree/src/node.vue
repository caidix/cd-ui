<template>
  <ul class="tree-ul cd-tree-node">
    <li class="tree-li">
      <span class="tree-expand" @click="handleExpand">
        <span v-if="data.children && data.children.length && !data.expand">+</span>
        <span v-if="data.children && data.children.length && data.expand">-</span>
      </span>
      <check-box v-if="showCheckbox" :value="data.checked" @input="handleCheck"></check-box>
      <span @click="handleSelect">{{ data.title }}</span>
      <template v-if="data.expand">
        <cd-tree-node
          v-for="(item, index) in data.children"
          :key="index"
          :data="item"
          :show-checkbox="showCheckbox"
        ></cd-tree-node>
      </template>
    </li>
  </ul>
</template>

<script>
import CheckBox from "../../checkbox/src/checkbox";
export default {
  name: "cd-tree-node",
  components: {
    CheckBox
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    childrenKey: {
      type: String,
      default: "children"
    }
  },
  inject: ["TreeInstance"],
  watch: {
    "data.children": {
      handler(data) {
        if (data) {
          const checkedAll = !data.some(item => !item.checked);
          this.$set(this.data, "checked", checkedAll);
        }
      },
      deep: true
    }
  },
  methods: {
    handleExpand() {
      this.$set(this.data, "expand", !this.data.expand);
      if (this.TreeInstance) {
        this.TreeInstance.emitEvent("on-toggle-expand", this.data);
      }
    },
    handleCheck() {
      // this.updateTreeDown(this.data, checked);
      if (this.TreeInstance) {
        if (this.data.disabled) return;
        const changes = {
          checked: !this.data.checked,
          nodeKey: this.data.nodeKey
        };
        this.TreeInstance.$emit("on-check", changes);
      }
    },
    handleSelect() {
      if (this.data.disabled) return;
      if (this.TreeInstance.showCheckbox) {
        this.handleCheck();
      } else {
        this.TreeInstance.$emit("on-select", this.data.nodeKey);
      }
    },
    updateTreeDown(data, checked) {
      this.$set(data, "checked", checked);
      if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.updateTreeDown(item, checked);
        });
      }
    }
  }
};
</script>
<style>
.tree-ul,
.tree-li {
  list-style: none;
  padding-left: 10px;
}
.tree-expand {
  cursor: pointer;
}
</style>