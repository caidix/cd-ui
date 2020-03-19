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
    >跳转到百度</cd-button>
    <cd-button type="warning" @click="handleWarning">警告</cd-button>
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
    },
    handleWarning() {
      this.$cdmessage({
        message: "向天再借五百年",
        duration: 8000
      });
    }
  }
};
</script>