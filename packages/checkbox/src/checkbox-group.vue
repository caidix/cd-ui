/**
  表单元素的最重要的点就是理解v-model语法糖的作用。
  1.v-model的实际含义：
    v-bind:value="parentValue"
    v-on:input="parentValue = arguments[0]"
  2.制定v-model:
      model: {
        prop: 'checked',
        event: 'change'
      },
      props: {
        checked: Boolean,
        // this allows using the `value` prop for a different purpose
        value: String
      }
  3.解释
    model 属性值里的两个key其实就是 v-model 这个语法糖所代表的 prop 和 event，
    分别表示 该表单元素的值 和 改变元素值时触发的事件， 在 input 中，
    这两个值是value 和 input(默认值)，在 checkbox 中表示 checked 和 change。
  4.流程
    监听传入的值---》将传入的值分发给子组件---》子组件修改触发事件---》通知父组件
                                                                    |
                                                                    |
    触发update将修改后的值再次分发给子组件《---传入元素修改，被监听《---触发事件修改传入的值
 */
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import Emitter from "@/mixins/emitter";
import { findComponentsDownward } from "@/utils/assist";
export default {
  name: "cd-checkbox-group",
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    value() {
      this.updateModel(true);
    }
  },
  data() {
    return {
      childrens: [],
      currentValue: this.value
    };
  },
  mounted() {
    this.updateModel(true);
  },
  methods: {
    updateModel(update) {
      this.childrens = findComponentsDownward(this, "cd-checkbox");
      if (this.childrens.length) {
        const { value } = this;
        this.childrens.forEach(child => {
          child.model = value;
          if (update) {
            child.currentValue = value.indexOf(child.label) > -1;
            child.group = true;
          }
        });
      }
    },
    change(data) {
      this.currentValue = data;
      this.$emit("input", data);
      // 在这里触发传入value的改变，并watch value，将发生改变后的结果又再次分发给子组件的model中
      this.$emit("on-change", data);
      this.dispatch("cd-form-item", "on-form-change", data);
    }
  }
};
</script>