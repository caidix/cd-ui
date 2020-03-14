<template>
  <div>
    <cd-button type="success" disabled icon="on" :icon-position="'right'" plain @click="handleClick">button</cd-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log("ok");
    }
  }
};
</script>