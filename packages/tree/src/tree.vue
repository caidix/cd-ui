<template>
  <div>
    <tree-node
      v-for="(item, index) in stateTree"
      :key="index"
      :data="item"
      :show-checkbox="showCheckbox"
      :children-key="childrenKey"
    ></tree-node>
    <div v-if="!stateTree.length"></div>
  </div>
</template>

<script>
import TreeNode from "./node";
export default {
  name: "cd-tree",
  components: {
    TreeNode
  },
  provide() {
    return { TreeInstance: this };
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    localeEmptyText: {
      type: String,
      default: "暂无数据"
    },
    render: {
      type: Function
    },
    childrenKey: {
      type: String,
      default: "children"
    }
  },
  data() {
    return {
      stateTree: this.data,
      flatState: []
    };
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.stateTree = this.data;
        this.flatState = this.compileFlatState();
        this.rebuildTree();
      }
    }
  },
  methods: {
    compileFlatState() {
      // so we have always a relation parent/children of each node
      let keyCounter = 0;
      let childrenKey = this.childrenKey; // 自定义子节点key
      const flatTree = []; // 将所有的节点扁平化
      function flattenChildren(node, parent) {
        node.nodeKey = keyCounter++; // 为每一个节点定义独一的key值
        flatTree[node.nodeKey] = { node: node, nodeKey: node.nodeKey };
        if (typeof parent != "undefined") {
          flatTree[node.nodeKey].parent = parent.nodeKey;
          flatTree[parent.nodeKey][childrenKey].push(node.nodeKey);
        }

        if (node[childrenKey]) {
          flatTree[node.nodeKey][childrenKey] = [];
          node[childrenKey].forEach(child => flattenChildren(child, node));
        }
      }
      this.stateTree.forEach(rootNode => {
        flattenChildren(rootNode);
      });
      return flatTree;
    },
    updateTreeUp(nodeKey) {
      const parentKey = this.flatState[nodeKey].parent;
      if (typeof parentKey == "undefined" || this.checkStrictly) return;

      const node = this.flatState[nodeKey].node;
      const parent = this.flatState[parentKey].node;
      if (
        node.checked == parent.checked &&
        node.indeterminate == parent.indeterminate
      )
        return; // no need to update upwards

      if (node.checked == true) {
        this.$set(
          parent,
          "checked",
          parent[this.childrenKey].every(node => node.checked)
        );
        this.$set(parent, "indeterminate", !parent.checked);
      } else {
        this.$set(parent, "checked", false);
        this.$set(
          parent,
          "indeterminate",
          parent[this.childrenKey].some(
            node => node.checked || node.indeterminate
          )
        );
      }
      this.updateTreeUp(parentKey);
    },
    rebuildTree() {
      // only called when `data` prop changes
      const checkedNodes = this.getCheckedNodes();
      checkedNodes.forEach(node => {
        this.updateTreeDown(node, { checked: true });
        // propagate upwards
        const parentKey = this.flatState[node.nodeKey].parent;
        if (!parentKey && parentKey !== 0) return;
        const parent = this.flatState[parentKey].node;
        const childHasCheckSetter =
          typeof node.checked != "undefined" && node.checked;
        if (childHasCheckSetter && parent.checked != node.checked) {
          this.updateTreeUp(node.nodeKey); // update tree upwards
        }
      });
    },

    getSelectedNodes() {
      /* public API */
      return this.flatState
        .filter(obj => obj.node.selected)
        .map(obj => obj.node);
    },
    getCheckedNodes() {
      /* public API */
      return this.flatState
        .filter(obj => obj.node.checked)
        .map(obj => obj.node);
    },
    getCheckedAndIndeterminateNodes() {
      /* public API */
      return this.flatState
        .filter(obj => obj.node.checked || obj.node.indeterminate)
        .map(obj => obj.node);
    },
    updateTreeDown(node, changes = {}) {
      if (this.checkStrictly) return;

      for (let key in changes) {
        this.$set(node, key, changes[key]);
      }
      if (node[this.childrenKey]) {
        node[this.childrenKey].forEach(child => {
          this.updateTreeDown(child, changes);
        });
      }
    },
    handleSelect(nodeKey) {
      if (!this.flatState[nodeKey]) return;
      const node = this.flatState[nodeKey].node;
      if (!this.multiple) {
        // reset previously selected node
        const currentSelectedKey = this.flatState.findIndex(
          obj => obj.node.selected
        );
        if (currentSelectedKey >= 0 && currentSelectedKey !== nodeKey)
          this.$set(this.flatState[currentSelectedKey].node, "selected", false);
      }
      this.$set(node, "selected", !node.selected);

      this.$emit("on-select-change", node, this.getSelectedNodes());
    },
    handleCheck({ checked, nodeKey }) {
      if (!this.flatState[nodeKey]) return;
      const node = this.flatState[nodeKey].node;
      this.$set(node, "checked", checked);
      this.$set(node, "indeterminate", false);

      this.updateTreeUp(nodeKey); // propagate up
      this.updateTreeDown(node, { checked, indeterminate: false }); // reset `indeterminate` when going down

      this.$emit("on-check-change", node, this.getCheckedNodes());
    }
  },
  created() {
    this.rebuildTree();
    this.flatState = this.compileFlatState();
  },
  mounted() {
    this.$on("on-check", this.handleCheck);
    this.$on("on-select", this.handleSelect);
  }
};
</script>