<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      defaultList: [
        {
          id: 1001,
          attrSeleted: ["大陆版", "港版"]
        },
        {
          id: 1002,
          attrSeleted: ["红", "白"]
        },
        {
          id: 1003,
          attrSeleted: ["32G", "64G"]
        }
      ]
    };
  },
  methods: {
    filtersList() {
      let newlist = [];
      let length = this.defaultList.length;
      function mapList(item) {
        
      }
    }
  }
};
</script>