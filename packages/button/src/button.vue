<template>
  <div class="cd-button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "cd-button",
  props: {
    type: String
  }
};
</script>

<style scoped>
.cd-button {
  display: inline-block;
  padding: 3px 6px;
  background: #000;
  color: #fff;
}
</style>
