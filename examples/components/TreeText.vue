<template>
  <div>
    <h3>实战 7：树形控件 —— Tree</h3>

    <cd-tree
      :data="data"
      @on-toggle-expand="handleToggleExpand"
      @on-check-change="handleCheckChange"
      @on-select-change="handleCheckChange"
    ></cd-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleToggleExpand(data) {
      console.log(data);
    },
    handleCheckChange(data, dat2a) {
      console.log(data, dat2a);
    }
  }
};
</script>