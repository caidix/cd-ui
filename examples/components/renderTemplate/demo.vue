<template>
  <div>
    <MyRender :render="render" />
  </div>
</template>
<script>
import MyRender from "./my-render";
export default {
  components: {
    MyRender
  },
  data() {
    return {
      render: h => {
        return h("div", {
          style: {
            color: "red"
          }
        }, '自定义内容');
      }
    };
  }
};
</script>