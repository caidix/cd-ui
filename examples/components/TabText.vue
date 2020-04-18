<template>
  <div>
    <cd-tabs v-model="value">
      <cd-tab-pane name="1" label="haha">1111111111111</cd-tab-pane>
      <cd-tab-pane name="2" disabled label="xxxxx">2222222222222</cd-tab-pane>
      <cd-tab-pane name="3" label="wwwww">333333333333</cd-tab-pane>
    </cd-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "2"
    };
  }
};
</script>