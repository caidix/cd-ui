<template>
  <div>
    <cd-button
      type="success"
      :loading="loading"
      icon="on"
      :icon-position="'right'"
      plain
      to="http://www.baidu.com"
      @click="handleClick"
    >button</cd-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    handleClick() {
      this.loading = true;
      console.log("ok");
    }
  }
};
</script>